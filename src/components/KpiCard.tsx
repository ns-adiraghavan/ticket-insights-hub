interface Props {
  label: string;
  value: string | number;
  wowPct?: number | null;
}

export default function KpiCard({ label, value, wowPct }: Props) {
  const hasWow = wowPct !== undefined && wowPct !== null && isFinite(wowPct);
  const positive = hasWow && (wowPct as number) >= 0;
  const color = positive ? "#16A34A" : "#DC2626";
  const bg = positive ? "#DCFCE7" : "#FEE2E2";
  const arrow = positive ? "▲" : "▼";

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #E2E8F0",
        borderLeft: "3px solid #185FA5",
        borderRadius: 8,
        padding: "14px 16px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
        flex: 1,
        minWidth: 0,
      }}
    >
      <div
        style={{
          fontSize: 11,
          color: "#64748B",
          textTransform: "uppercase",
          letterSpacing: "0.04em",
          fontWeight: 500,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 24,
          fontWeight: 500,
          color: "#1e3a5f",
          marginTop: 6,
        }}
      >
        {value}
      </div>
      {hasWow && (
        <div
          style={{
            marginTop: 8,
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            background: bg,
            color,
            fontSize: 11,
            fontWeight: 600,
            padding: "2px 8px",
            borderRadius: 999,
          }}
          title="Week-over-week change (W22 vs W21)"
        >
          <span>{arrow}</span>
          <span>
            {positive ? "+" : ""}
            {(wowPct as number).toFixed(1)}%
          </span>
        </div>
      )}
    </div>
  );
}
