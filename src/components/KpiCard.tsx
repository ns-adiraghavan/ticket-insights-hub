interface Props {
  label: string;
  value: string | number;
}

export default function KpiCard({ label, value }: Props) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #E2E8F0",
        borderRadius: 8,
        padding: "14px 16px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
        flex: 1,
        minWidth: 0,
      }}
    >
      <div style={{ fontSize: 11, color: "#64748B", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 500 }}>
        {label}
      </div>
      <div style={{ fontSize: 22, fontWeight: 700, color: "#1A3C5E", marginTop: 6 }}>{value}</div>
    </div>
  );
}
