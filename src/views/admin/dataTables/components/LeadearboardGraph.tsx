import React, { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip as ChartTooltip,
  Legend as ChartLegend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import RingLoader from 'react-spinners/RingLoader';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, ChartTooltip, ChartLegend, Filler);

type ParticipantSeries = {
  participantId: string;
  name: string;
  avatarUrl?: string | null;
  data: { date: string; points: number }[];
};

async function fetchProgress(eventName: string) {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/leaderboard/progress?eventName=${encodeURIComponent(eventName)}`;
  const r = await fetch(url);
  if (!r.ok) throw new Error('Failed to fetch leaderboard progress');
  const json = await r.json();
  console.log(json)
  if (json && Array.isArray(json.data)) return json.data as ParticipantSeries[];
  return json as ParticipantSeries[];
}

const genDates = (start: string, end: string) => {
  const res: string[] = [];
  let cur = new Date(start);
  const endD = new Date(end);
  while (cur <= endD) {
    res.push(cur.toISOString().slice(0, 10));
    cur.setDate(cur.getDate() + 1);
  }
  return res;
};

const parseYMD = (s: string) => {
  // accept YYYY-MM-DD
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
};

const formatYMD = (d: Date) => d.toISOString().slice(0, 10);

const addDays = (iso: string, days: number) => {
  const dt = parseYMD(iso);
  dt.setDate(dt.getDate() + days);
  return formatYMD(dt);
};

const genTenMinSlots = (dayIso: string) => {
  // dayIso expected as YYYY-MM-DD (use UTC day start to match backend ISO timestamps)
  const slots: string[] = [];
  const dayStart = new Date(`${dayIso}T00:00:00.000Z`);
  for (let mins = 0; mins < 24 * 60; mins += 15) {
    const d = new Date(dayStart.getTime() + mins * 60 * 1000);
    slots.push(d.toISOString());
  }
  return slots;
};

const pivotParticipants = (participants: ParticipantSeries[], startDate: string, endDate: string, mode: 'daily' | 'tenMin' = 'daily') => {
  const dates = mode === 'daily' ? genDates(startDate, endDate) : genTenMinSlots(startDate);
  const map = participants.map((p) => {
    if (mode === 'daily') {
      // Group entries by YYYY-MM-DD (UTC) and keep the latest positive points for that day
      const dmap = new Map<string, number>();
      for (const entry of p.data) {
        if (!entry || typeof entry.date !== 'string') continue;
        const ymd = new Date(entry.date).toISOString().slice(0, 10);
        if (entry.points > 0) dmap.set(ymd, entry.points);
      }
      const rowPoints = dates.map((date) => (dmap.has(date) ? dmap.get(date)! : null));
      return { participantId: p.participantId, name: p.name, pointsByDate: rowPoints as (number | null)[] };
    }

    // tenMin mode: assign timestamped entries into 10-minute UTC slots for the selected day
    const slotTimes = dates.map((s) => new Date(s).getTime());
    const slotMap = new Map<number, number>();
    const dayStartMs = slotTimes[0];
    const dayEndMs = dayStartMs + 24 * 60 * 60 * 1000;
    for (const entry of p.data) {
      if (!entry || entry.points <= 0) continue; // ignore zeros
      const ts = new Date(entry.date).getTime();
      if (ts < dayStartMs || ts >= dayEndMs) continue; // skip outside selected day
      const minutesSinceStart = Math.floor((ts - dayStartMs) / 60000);
      const idx = Math.floor(minutesSinceStart / 10);
      const clamped = Math.max(0, Math.min(idx, slotTimes.length - 1));
      // overwrite so the latest point for a slot wins
      slotMap.set(clamped, entry.points);
    }

    const rowPoints = dates.map((_, idx) => (slotMap.has(idx) ? slotMap.get(idx)! : null));
    return { participantId: p.participantId, name: p.name, pointsByDate: rowPoints as (number | null)[] };
  });

  return { chartData: dates.map((_, idx) => {
    const row: any = { day: `Day ${idx + 1}`, date: dates[idx] };
    for (const p of map) row[p.participantId] = p.pointsByDate[idx];
    return row;
  }), participants: map.map((p) => {
    // compute first non-zero index and its date
    const firstIdx = p.pointsByDate.findIndex((v) => typeof v === 'number' && v > 0);
    const startIndex = firstIdx === -1 ? null : firstIdx;
    const startDate = startIndex !== null ? dates[startIndex] : null;
    return { participantId: p.participantId, name: p.name, startIndex, startDate };
  }), dates };
};

const COLORS = [
  '#1f77b4','#ff7f0e','#2ca02c','#d62728','#9467bd','#8c564b','#e377c2','#7f7f7f','#bcbd22','#17becf',
  '#393b79','#637939','#8c6d31','#843c39','#7b4173'
];

export default function LeaderboardGraph({ eventName, topN = 10, startDate, endDate }:{
  eventName: string;
  topN?: number;
  startDate: string;
  endDate: string;
}) {
  const [mode, setMode] = useState<'daily' | 'tenMin'>('daily');
  const [selectedDay, setSelectedDay] = useState(new Date().toISOString().slice(0, 10));
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['leaderboardProgress', eventName, topN],
    queryFn: () => fetchProgress(eventName)
  });

  const transformed = useMemo(() => {
    if (!data) return { chartData: [], participants: [] as {participantId:string,name:string,startIndex:number|null,startDate:string|null}[], dates: [] as string[] };
    if (mode === 'daily') {
      // determine earliest date across all participant data
      const allDates: string[] = [];
      for (const p of data) for (const d of p.data) allDates.push(d.date.slice(0, 10));
      const earliest = allDates.length ? allDates.reduce((a, b) => (a < b ? a : b)) : startDate.slice(0, 10);
      const windowStart = earliest;
      const windowEnd = addDays(windowStart, 29); // 30 days including start
      return pivotParticipants(data, windowStart, windowEnd, 'daily');
    }

    return pivotParticipants(data, selectedDay, selectedDay, 'tenMin');
  }, [data, startDate, endDate, mode, selectedDay]);

  if (isLoading) return <div className="flex justify-center items-center h-64"><RingLoader color="#36d7b7" /></div>;
  if (isError) return <div>Error: {(error as Error).message}</div>;
  if (!transformed.dates.length) return <div>No data available</div>;

  const labels = transformed.dates.map((d, i) => {
    if (mode === 'daily') return `Day ${i + 1}`;
    // time label for ten-min slots
    try {
      return new Date(d).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return `T${i}`;
    }
  });

  const datasets = transformed.participants.map((p, i) => {
    // keep nulls for missing/zero points so Chart.js shows gaps
    const rawPoints: (number | null)[] = transformed.chartData.map((row: any) => (row[p.participantId] ?? null));

    // find first and last positive point
    const firstPos = rawPoints.findIndex((v) => v !== null && v > 0);
    const lastPos = rawPoints.length - 1 - rawPoints.slice().reverse().findIndex((v) => v !== null && v > 0);
    const hasPos = firstPos !== -1 && lastPos >= firstPos;

    // trim outside active range to avoid lines dropping to zero before/after
    const dataPoints = rawPoints.map((v, idx) => (hasPos && (idx < firstPos || idx > lastPos) ? null : v));

    // show marker only for real points; larger triangle at participant start
    const pointRadiusArr = dataPoints.map((val: number | null, idx: number) => (val !== null && val > 0 ? (p.startIndex === idx ? 6 : 3) : 0));
    const pointStyleArr = dataPoints.map((val: number | null, idx: number) => (p.startIndex === idx ? 'triangle' : 'circle'));

    return {
      label: p.name,
      data: dataPoints,
      borderColor: COLORS[i % COLORS.length],
      backgroundColor: COLORS[i % COLORS.length],
      tension: 0,
      fill: false,
      pointRadius: pointRadiusArr,
      pointStyle: pointStyleArr,
      pointHoverRadius: 6,
      borderWidth: 2,
      spanGaps: false
    } as any;
  });

  const chartData = { labels, datasets };

  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' as const },
      tooltip: {
        callbacks: {
          title: (items: any[]) => {
            const idx = items[0]?.dataIndex;
            const raw = transformed.dates[idx] ?? '';
            if (mode === 'daily') return raw;
            try {
              return new Date(raw).toLocaleString();
            } catch {
              return raw;
            }
          },
          label: (context: any) => `${context.dataset.label}: ${context.formattedValue}`
        }
      }
    },
    scales: {
      x: {
        title: { display: false },
      },
      y: {
        beginAtZero: true,
        ticks: { precision: 0 }
      }
    }
  };

  return (
    <div style={{ width: '100%', height: 480 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <div>
          <button onClick={() => setMode('daily')} style={{ marginRight: 8, padding: '6px 10px', background: mode === 'daily' ? '#0369a1' : '#e5e7eb', color: mode === 'daily' ? '#fff' : '#111', border: 'none', borderRadius: 6 }}>30 Days</button>
          <button onClick={() => setMode('tenMin')} style={{ padding: '6px 10px', background: mode === 'tenMin' ? '#0369a1' : '#e5e7eb', color: mode === 'tenMin' ? '#fff' : '#111', border: 'none', borderRadius: 6 }}>Single Day (60m)</button>
        </div>
        {mode === 'tenMin' && (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <label style={{ fontSize: 12 }}>Day:</label>
            <input type="date" value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)} />
          </div>
        )}
      </div>

      <div style={{ height: '420px' }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}

