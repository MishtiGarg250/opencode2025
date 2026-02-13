import type { RowObj } from 'views/admin/dataTables/components/ColumnsTable';

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const OPENCODE_CSV_URL = `${BASE_PATH}/constants/OPENCODE_Participants.csv`;

function parseCsvLine(line: string): string[] {
  const fields: string[] = [];
  let current = '';
  let insideQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];

    if (char === '"') {
      if (insideQuotes && line[i + 1] === '"') {
        current += '"';
        i += 1;
      } else {
        insideQuotes = !insideQuotes;
      }
      continue;
    }

    if (char === ',' && !insideQuotes) {
      fields.push(current.trim());
      current = '';
      continue;
    }

    current += char;
  }

  fields.push(current.trim());
  return fields;
}

export async function fetchOpencodeLeaderboardFromCsv(): Promise<RowObj[]> {
  const response = await fetch(OPENCODE_CSV_URL, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`Failed to fetch CSV data: ${response.statusText}`);
  }

  const csvText = await response.text();
  const lines = csvText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length <= 1) {
    return [];
  }

  const headers = parseCsvLine(lines[0]).map((h) => h.trim().toLowerCase());
  const nameIdx = headers.indexOf('name');
  const githubIdx = headers.indexOf('github id');
  const rankIdx = headers.indexOf('rank');
  const pointsIdx = headers.indexOf('points');
  const prsIdx = headers.indexOf('prmerged');

  return lines.slice(1).map((line, index) => {
    const fields = parseCsvLine(line);
    const name = nameIdx >= 0 ? fields[nameIdx] ?? '' : '';
    const githubId = githubIdx >= 0 ? fields[githubIdx] ?? '' : '';
    const rankValue = rankIdx >= 0 ? fields[rankIdx] ?? '' : '';
    const pointsValue = pointsIdx >= 0 ? fields[pointsIdx] ?? '' : '';
    const prsValue = prsIdx >= 0 ? fields[prsIdx] ?? '' : '';

    const rank = Number.parseInt(rankValue, 10);
    const position = Number.isFinite(rank) ? rank : index + 1;
    const githubid = githubId.trim();
    const points = Number.parseInt(pointsValue, 10);
    const prmerged = Number.parseInt(prsValue, 10);

    return {
      position: String(position),
      name: name.trim(),
      prmerged: Number.isFinite(prmerged) ? prmerged : 0,
      githubid,
      points: Number.isFinite(points) ? points : 0,
      avatarUrl: `https://avatars.githubusercontent.com/${githubid}`,
      prDetailsURL: '',
    };
  });
}
