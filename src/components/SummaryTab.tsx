import DataTable, { Column } from "./DataTable";

function fmtNum(n: number | null | undefined) {
  if (n === null || n === undefined) return "—";
  return n.toLocaleString();
}

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 14, fontWeight: 600, color: "#1A3C5E", marginBottom: 10 }}>
      {children}
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: "inline-block",
        background: "#EFF6FF",
        color: "#1A3C5E",
        border: "1px solid #BFDBFE",
        borderRadius: 6,
        padding: "6px 12px",
        fontSize: 12,
        fontWeight: 500,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

export default function SummaryTab({ data }: { data: any }) {
  const b = data.banner;
  const insights = data.tat_insights;

  const priorityCols: Column<any>[] = [
    { header: "Priority", render: (r) => r.priority },
    { header: "Count", align: "right", render: (r) => fmtNum(r.count) },
    { header: "% of Total", align: "right", render: (r) => `${r.pct_of_total.toFixed(2)}%` },
    { header: "Avg TAT", align: "right", render: (r) => r.avg_tat.toFixed(2) },
    { header: "Closure Rate", align: "right", render: (r) => `${r.closure_rate.toFixed(2)}%` },
  ];

  const statusCols: Column<any>[] = [
    { header: "Status", render: (r) => r.status },
    { header: "Count", align: "right", render: (r) => fmtNum(r.count) },
    { header: "% of Total", align: "right", render: (r) => `${r.pct_of_total.toFixed(2)}%` },
    { header: "Avg TAT", align: "right", render: (r) => r.avg_tat.toFixed(2) },
    { header: "Avg Volume", align: "right", render: (r) => r.avg_volume.toFixed(2) },
  ];

  const listingCols: Column<any>[] = [
    { header: "Type", render: (r) => r.listing_type_group },
    { header: "Tickets", align: "right", render: (r) => fmtNum(r.tickets) },
    { header: "Ad-hoc SKUs", align: "right", render: (r) => fmtNum(r.adhoc_skus) },
    { header: "E2E Options", align: "right", render: (r) => fmtNum(r.e2e_options) },
    { header: "Avg TAT", align: "right", render: (r) => r.avg_tat.toFixed(2) },
  ];

  const categoryCols: Column<any>[] = [
    { header: "Category", render: (r) => r.l1_category },
    { header: "Tickets", align: "right", render: (r) => fmtNum(r.tickets) },
    { header: "Ad-hoc SKUs", align: "right", render: (r) => fmtNum(r.adhoc_skus) },
    { header: "E2E Options", align: "right", render: (r) => fmtNum(r.e2e_options) },
    { header: "Avg TAT", align: "right", render: (r) => r.avg_tat.toFixed(2) },
    { header: "Closure %", align: "right", render: (r) => `${r.closure_rate.toFixed(2)}%` },
  ];

  const platformCols: Column<any>[] = [
    { header: "Platform", render: (r) => r.platform },
    { header: "Tickets", align: "right", render: (r) => fmtNum(r.tickets) },
    { header: "Ad-hoc SKUs", align: "right", render: (r) => fmtNum(r.adhoc_skus) },
    { header: "E2E Options", align: "right", render: (r) => fmtNum(r.e2e_options) },
    { header: "Avg TAT", align: "right", render: (r) => r.avg_tat.toFixed(2) },
  ];

  const brandCols: Column<any>[] = [
    { header: "Brand", render: (r) => r.brand_name },
    { header: "Tickets", align: "right", render: (r) => fmtNum(r.tickets) },
    { header: "Ad-hoc SKUs", align: "right", render: (r) => fmtNum(r.adhoc_skus) },
    { header: "E2E Options", align: "right", render: (r) => fmtNum(r.e2e_options) },
    { header: "Avg TAT", align: "right", render: (r) => r.avg_tat.toFixed(2) },
    { header: "Closure %", align: "right", render: (r) => `${r.closure_rate.toFixed(2)}%` },
  ];

  const statBox = (label: string, value: string | number) => (
    <div
      style={{
        background: "#F8FAFC",
        border: "1px solid #E2E8F0",
        borderRadius: 6,
        padding: "10px 12px",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: 10, color: "#64748B", textTransform: "uppercase", letterSpacing: 0.4 }}>
        {label}
      </div>
      <div style={{ fontSize: 18, fontWeight: 700, color: "#1A3C5E", marginTop: 4 }}>{value}</div>
    </div>
  );

  const healthBadge = (color: string, text: string) => (
    <div
      style={{
        background: `${color}15`,
        border: `1px solid ${color}55`,
        color,
        padding: "8px 12px",
        borderRadius: 6,
        fontSize: 12,
        fontWeight: 600,
      }}
    >
      {text}
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div
        style={{
          display: "flex",
          gap: 8,
          overflowX: "auto",
          paddingBottom: 4,
        }}
      >
        <Pill>Peak Week: W{b.peak_week} ({b.peak_week_tickets} tickets)</Pill>
        <Pill>Closure Rate: {b.closure_rate}%</Pill>
        <Pill>Total Tickets: {b.total_tickets}</Pill>
        <Pill>Avg TAT: {b.avg_tat} days</Pill>
        <Pill>Top Category: {b.top_category}</Pill>
        <Pill>Top Assignee: {b.top_assignee}</Pill>
        <Pill>Total SKUs processed: {b.total_skus.toLocaleString()}</Pill>
        <Pill>{b.e2e_vs_adhoc}</Pill>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div>
          <SectionHeader>Priority Breakdown</SectionHeader>
          <DataTable columns={priorityCols} rows={data.priority} />
        </div>
        <div>
          <SectionHeader>Status Breakdown</SectionHeader>
          <DataTable columns={statusCols} rows={data.status} />
        </div>
        <div>
          <SectionHeader>Listing Type</SectionHeader>
          <DataTable columns={listingCols} rows={data.listing_type} />
        </div>
        <div>
          <SectionHeader>Category L1</SectionHeader>
          <DataTable columns={categoryCols} rows={data.category} />
        </div>
        <div>
          <SectionHeader>Platform</SectionHeader>
          <DataTable columns={platformCols} rows={data.platform} />
        </div>
        <div>
          <SectionHeader>TAT Insights</SectionHeader>
          <div
            style={{
              background: "#fff",
              border: "1px solid #E2E8F0",
              borderRadius: 8,
              padding: 16,
              boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
              {statBox("Overall Avg", insights.overall_avg)}
              {statBox("Min", insights.min_tat)}
              {statBox("Max", insights.max_tat)}
              {statBox("Median", insights.median_tat)}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {healthBadge(
                "#22C55E",
                `${insights.green_count} tickets (${insights.pct_0_5}%) within 5 days`
              )}
              {healthBadge(
                "#F59E0B",
                `${insights.amber_count} tickets (${insights.pct_5_15}%) within 5–15 days`
              )}
              {healthBadge(
                "#EF4444",
                `${insights.red_count} tickets (${insights.pct_15_plus}%) 15+ days`
              )}
            </div>
          </div>
        </div>
      </div>

      <div>
        <SectionHeader>Top Brands by Ticket Volume</SectionHeader>
        <DataTable columns={brandCols} rows={data.top_brands} />
      </div>
    </div>
  );
}
