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

const genTenMinSlots = (dayIso: string) => {
  // dayIso expected as YYYY-MM-DD
  const slots: string[] = [];
  const dayStart = new Date(`${dayIso}T00:00:00`);
  for (let mins = 0; mins < 24 * 60; mins += 60) {
    const d = new Date(dayStart.getTime() + mins * 60 * 1000);
    slots.push(d.toISOString());
  }
  return slots;
};

const pivotParticipants = (participants: ParticipantSeries[], startDate: string, endDate: string, mode: 'daily' | 'tenMin' = 'daily') => {
  const dates = mode === 'daily' ? genDates(startDate, endDate) : genTenMinSlots(startDate);
  const map = participants.map((p) => {
    // build a map for quick lookup. For tenMin mode, we match by nearest slot using timestamp.
    if (mode === 'daily') {
      const dmap = new Map(p.data.map((d) => [d.date, d.points]));
      const rowPoints = dates.map((date) => (dmap.has(date) ? dmap.get(date)! : null));
      for (let i = 0; i < rowPoints.length; i++) {
        if (rowPoints[i] === null) rowPoints[i] = i === 0 ? 0 : rowPoints[i - 1];
      }
      return { participantId: p.participantId, name: p.name, pointsByDate: rowPoints as number[] };
    }

    // tenMin mode: map timestamps into slots
    const slotTimes = dates.map((s) => new Date(s).getTime());
    const slotMap = new Map<number, number>();
    for (const d of p.data) {
      const ts = new Date(d.date).getTime();
      // find first slot that is >= timestamp
      let idx = slotTimes.findIndex((t) => ts <= t);
      if (idx === -1) idx = slotTimes.length - 1;
      if (ts < slotTimes[0]) idx = 0;
      slotMap.set(idx, d.points);
    }

    const rowPoints = dates.map((_, idx) => (slotMap.has(idx) ? slotMap.get(idx)! : null));
    for (let i = 0; i < rowPoints.length; i++) {
      if (rowPoints[i] === null) rowPoints[i] = i === 0 ? 0 : rowPoints[i - 1];
    }
    return { participantId: p.participantId, name: p.name, pointsByDate: rowPoints as number[] };
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
  const [selectedDay, setSelectedDay] = useState(endDate.slice(0, 10));
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['leaderboardProgress', eventName, topN],
    queryFn: () => fetchProgress(eventName)
  });

  const transformed = useMemo(() => {
    if (!data) return { chartData: [], participants: [] as {participantId:string,name:string}[], dates: [] as string[] };
    if (mode === 'daily') return pivotParticipants(data, startDate, endDate, 'daily');
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
    const dataPoints = transformed.chartData.map((row: any) => row[p.participantId] ?? 0);
    // per-point radius: show a larger marker at the startIndex
    const pointRadiusArr = dataPoints.map((_, idx) => (p.startIndex === idx ? 6 : 0));
    const pointStyleArr = dataPoints.map((_, idx) => (p.startIndex === idx ? 'triangle' : 'circle'));
    return {
      label: p.name,
      data: dataPoints,
      borderColor: COLORS[i % COLORS.length],
      backgroundColor: COLORS[i % COLORS.length],
      tension: 0,
      fill: false,
      pointRadius: pointRadiusArr,
      pointStyle: pointStyleArr,
      borderWidth: 2,
      spanGaps: true
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
          <button onClick={() => setMode('tenMin')} style={{ padding: '6px 10px', background: mode === 'tenMin' ? '#0369a1' : '#e5e7eb', color: mode === 'tenMin' ? '#fff' : '#111', border: 'none', borderRadius: 6 }}>Single Day (10m)</button>
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

