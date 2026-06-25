export interface ShowEvent {
  data: string;
  artista: string;
  horario: string;
  entradaMasculina: string;
  entradaFeminina: string;
  promocao: string;
  foto: string;
  link: string;
  dateObj: Date | null;
}

const SHEET_ID = "1gNLHgWbtjqRNm8cQKFxKU3foRRqrlm9mfaWh7BxTO0c";
export const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`;

// Minimal CSV parser supporting quoted fields with commas and "" escapes.
function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { cur += '"'; i++; }
        else inQuotes = false;
      } else cur += c;
    } else {
      if (c === '"') inQuotes = true;
      else if (c === ",") { row.push(cur); cur = ""; }
      else if (c === "\n") { row.push(cur); rows.push(row); row = []; cur = ""; }
      else if (c === "\r") { /* skip */ }
      else cur += c;
    }
  }
  if (cur.length || row.length) { row.push(cur); rows.push(row); }
  return rows.filter(r => r.some(cell => cell.trim() !== ""));
}

function parseDate(d: string): Date | null {
  const m = d.trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!m) return null;
  const [, dd, mm, yyyy] = m;
  return new Date(Number(yyyy), Number(mm) - 1, Number(dd));
}

export async function fetchEvents(): Promise<ShowEvent[]> {
  const res = await fetch(CSV_URL);
  if (!res.ok) throw new Error("Falha ao carregar a programação");
  const text = await res.text();
  const rows = parseCSV(text);
  if (rows.length <= 1) return [];
  const [, ...data] = rows;
  const events: ShowEvent[] = data.map(r => ({
    data: r[0] ?? "",
    artista: r[1] ?? "",
    horario: r[2] ?? "",
    entradaMasculina: r[3] ?? "",
    entradaFeminina: r[4] ?? "",
    promocao: r[5] ?? "",
    foto: r[6] ?? "",
    link: r[7] ?? "",
    dateObj: parseDate(r[0] ?? ""),
  }));

  // Show upcoming events (today onwards), fallback to all if none
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcoming = events
    .filter(e => e.dateObj && e.dateObj >= today)
    .sort((a, b) => (a.dateObj!.getTime() - b.dateObj!.getTime()));
  return upcoming.length ? upcoming : events;
}

export function formatDatePt(d: Date | null, fallback: string): string {
  if (!d) return fallback;
  const days = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"];
  const months = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];
  return `${days[d.getDay()]} • ${String(d.getDate()).padStart(2, "0")} ${months[d.getMonth()]}`;
}
