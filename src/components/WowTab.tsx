import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import KpiCard from "./KpiCard";
import DataTable, { Column } from "./DataTable";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function fmtDate(iso: string) {
  const d = new Date(iso);
  return `${String(d.getUTCDate()).padStart(2, "0")}-${MONTHS[d.getUTCMonth()]}`;
}

interface Week {
  week_number: number;
  week_start: string;
  week_end: string;
  tickets: number;
  adhoc_skus: number;
  e2e_options: number;
  avg_tat: number;
  e2e_tickets: number;
  adhoc_tickets: number;
  closed_tickets: number;
  open_tickets: number;
  wow_pct: number | null;
  cumulative_tickets: number;
}

function fmtNum(n: number) {
  return n.toLocaleString();
}

function fmtWow(v: number | null) {
  if (v === null || v === undefined) return <span style={{ color: "#94A3B8" }}>—</span>;
  const sign = v > 0 ? "+" : "";
  return (
    <span style={{ color: v >= 0 ? "#22C55E" : "#EF4444", fontWeight: 600 }}>
      {sign}
      {v.toFixed(1)}%
    </span>
  );
}

export default function WowTab({ data }: { data: any }) {
  const k = data.kpis;
  const weeks: Week[] = data.weeks;

  const last = weeks[weeks.length - 1];
  const prev = weeks[weeks.length - 2];
  const wow = (key: keyof Week): number | null => {
    if (!last || !prev) return null;
    const a = Number(last[key]);
    const b = Number(prev[key]);
    if (!isFinite(a) || !isFinite(b) || b === 0) return null;
    return ((a - b) / b) * 100;
  };

  const chartData = weeks.map((w) => ({
    name: `W${w.week_number} ${fmtDate(w.week_start)}–${fmtDate(w.week_end).replace(/^\d{2}-/, "")}`,
    Tickets: w.tickets,
    "Avg TAT": w.avg_tat,
    Cumulative: w.cumulative_tickets,
  }));

  const columns: Column<Week>[] = [
    { header: "Week", render: (w) => `W${w.week_number}` },
    { header: "Week Start", render: (w) => fmtDate(w.week_start) },
    { header: "Week End", render: (w) => fmtDate(w.week_end) },
    { header: "Tickets", align: "right", render: (w) => fmtNum(w.tickets) },
    { header: "Ad-hoc SKUs", align: "right", render: (w) => fmtNum(w.adhoc_skus) },
    { header: "E2E Options", align: "right", render: (w) => fmtNum(w.e2e_options) },
    { header: "Avg TAT", align: "right", title: "Weighted avg: sum(TAT × ticket volume) / sum(ticket volume)", render: (w) => w.avg_tat.toFixed(2) },
    { header: "E2E", align: "right", render: (w) => fmtNum(w.e2e_tickets) },
    { header: "Ad-hoc", align: "right", render: (w) => fmtNum(w.adhoc_tickets) },
    { header: "Closed", align: "right", render: (w) => fmtNum(w.closed_tickets) },
    { header: "Open", align: "right", render: (w) => fmtNum(w.open_tickets) },
    { header: "WoW%", align: "right", render: (w) => fmtWow(w.wow_pct) },
    { header: "Cumulative", align: "right", render: (w) => fmtNum(w.cumulative_tickets) },
  ];

  const footer = (
    <tr style={{ background: "#f0f4f8", fontWeight: 500 }}>
      <td style={tdFoot} colSpan={3}>Total</td>
      <td style={{ ...tdFoot, textAlign: "right" }}>{fmtNum(k.total_tickets)}</td>
      <td style={{ ...tdFoot, textAlign: "right" }}>{fmtNum(k.adhoc_skus)}</td>
      <td style={{ ...tdFoot, textAlign: "right" }}>{fmtNum(k.e2e_options)}</td>
      <td style={{ ...tdFoot, textAlign: "right" }}>—</td>
      <td style={{ ...tdFoot, textAlign: "right" }}>{fmtNum(k.e2e_tickets)}</td>
      <td style={{ ...tdFoot, textAlign: "right" }}>{fmtNum(k.adhoc_tickets)}</td>
      <td style={{ ...tdFoot, textAlign: "right" }}>{fmtNum(k.closed_tickets)}</td>
      <td style={{ ...tdFoot, textAlign: "right" }}>{fmtNum(k.open_tickets)}</td>
      <td style={{ ...tdFoot, textAlign: "right" }}>—</td>
      <td style={{ ...tdFoot, textAlign: "right" }}>{fmtNum(k.total_tickets)}</td>
    </tr>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {(() => null)()}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 12 }}>
        <KpiCard label="Total Tickets" value={fmtNum(k.total_tickets)} wowPct={wow("tickets")} />
        <KpiCard label="Ad-hoc SKUs" value={fmtNum(k.adhoc_skus)} wowPct={wow("adhoc_skus")} />
        <KpiCard label="E2E Options" value={fmtNum(k.e2e_options)} wowPct={wow("e2e_options")} />
        <KpiCard label="Avg TAT (weighted)" value={`${k.avg_tat} days`} wowPct={wow("avg_tat")} />
        <KpiCard label="E2E Tickets" value={fmtNum(k.e2e_tickets)} wowPct={wow("e2e_tickets")} />
        <KpiCard label="Ad-hoc Tickets" value={fmtNum(k.adhoc_tickets)} wowPct={wow("adhoc_tickets")} />
      </div>

      <div
        style={{
          background: "#fff",
          border: "1px solid #E2E8F0",
          borderRadius: 8,
          padding: 16,
          boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
        }}
      >
        <div style={{ fontSize: 14, fontWeight: 600, color: "#1A3C5E", marginBottom: 12 }}>
          Tickets &amp; Avg TAT by Week
        </div>
        <div style={{ width: "100%", height: 280 }}>
          <ResponsiveContainer>
            <ComposedChart data={chartData} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
              <CartesianGrid stroke="#F1F5F9" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#64748B" }} />
              <YAxis yAxisId="left" tick={{ fontSize: 11, fill: "#64748B" }} />
              <YAxis yAxisId="right" orientation="right" domain={[0, 8]} tick={{ fontSize: 11, fill: "#64748B" }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar yAxisId="left" dataKey="Tickets" fill="#0EA5E9" radius={[4, 4, 0, 0]} />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="Avg TAT"
                stroke="#F59E0B"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      <DataTable columns={columns} rows={weeks} footer={footer} />
      <div style={{ fontSize: 12, color: "#94A3B8", marginTop: 8 }}>
        * W18 includes tickets from 27 Apr – 03 May. W19 WoW% is calculated against this partial baseline.
      </div>
    </div>
  );
}

const tdFoot: React.CSSProperties = {
  padding: "10px 12px",
  color: "#1e3a5f",
  borderTop: "1px solid #d0d8e8",
  fontSize: 13,
  fontWeight: 500,
};
