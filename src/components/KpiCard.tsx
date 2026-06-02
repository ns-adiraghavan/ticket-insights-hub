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
    </div>
  );
}
