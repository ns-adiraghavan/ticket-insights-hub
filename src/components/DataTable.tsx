import { ReactNode } from "react";

export interface Column<T> {
  header: string;
  render: (row: T, idx: number) => ReactNode;
  align?: "left" | "right" | "center";
  width?: string | number;
}

interface Props<T> {
  columns: Column<T>[];
  rows: T[];
  footer?: ReactNode;
}

export default function DataTable<T>({ columns, rows, footer }: Props<T>) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #E2E8F0",
        borderRadius: 8,
        overflow: "hidden",
        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
      }}
    >
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr style={{ background: "#F1F5F9" }}>
              {columns.map((c, i) => (
                <th
                  key={i}
                  style={{
                    textAlign: c.align ?? "left",
                    padding: "10px 12px",
                    fontWeight: 600,
                    color: "#1A3C5E",
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: 0.4,
                    borderBottom: "1px solid #E2E8F0",
                    whiteSpace: "nowrap",
                    width: c.width,
                  }}
                >
                  {c.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr
                key={ri}
                style={{
                  background: ri % 2 === 0 ? "#FFFFFF" : "#FAFAFA",
                }}
              >
                {columns.map((c, ci) => (
                  <td
                    key={ci}
                    style={{
                      padding: "9px 12px",
                      textAlign: c.align ?? "left",
                      color: "#1E293B",
                      borderBottom: "1px solid #F1F5F9",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {c.render(row, ri)}
                  </td>
                ))}
              </tr>
            ))}
            {footer}
          </tbody>
        </table>
      </div>
    </div>
  );
}
