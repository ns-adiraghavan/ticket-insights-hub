import { useEffect, useState } from "react";
import WowTab from "./components/WowTab";
import SummaryTab from "./components/SummaryTab";
import BifurcationTab from "./components/BifurcationTab";
import EodTab from "./components/EodTab";
import Login from "./components/Login";

type TabKey = "wow" | "summary" | "bifurcation" | "eod";

export default function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [tab, setTab] = useState<TabKey>("wow");
  const [wowData, setWowData] = useState<any>(null);
  const [summaryData, setSummaryData] = useState<any>(null);
  const [bifurcationData, setBifurcationData] = useState<any>(null);
  const [eodData, setEodData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/wow.json").then((r) => r.json()),
      fetch("/summary.json").then((r) => r.json()),
      fetch("/bifurcation.json").then((r) => r.json()),
      fetch("/eod.json").then((r) => r.json()),
    ]).then(([wow, summary, bif, eod]) => {
      setWowData(wow);
      setSummaryData(summary);
      setBifurcationData(bif);
      setEodData(eod);
      setLoading(false);
    });
  }, []);

  const tabs: { key: TabKey; label: string }[] = [
    { key: "wow", label: "WoW Dashboard" },
    { key: "summary", label: "Monthly Summary" },
    { key: "bifurcation", label: "TAT Bifurcation" },
    { key: "eod", label: "Day View" },
  ];

  if (!signedIn) {
    return <Login onSignIn={() => setSignedIn(true)} />;
  }

  return (
    <div
      style={{
        fontFamily: "'DM Sans', sans-serif",
        background: "#F8FAFC",
        minHeight: "100vh",
        color: "#1E293B",
      }}
    >
      <header
        style={{
          height: 56,
          background: "#1e3a5f",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <img
            src="/netscribes-logo-white.png"
            alt="Netscribes"
            style={{ maxHeight: 28 }}
          />
          <h1 style={{ fontSize: 15, fontWeight: 500, margin: 0, color: "#fff" }}>
            UCW Ticket Quality &amp; TAT Dashboard
          </h1>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span
            style={{
              background: "#e8f0fb",
              color: "#1e3a5f",
              padding: "3px 10px",
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 500,
            }}
          >
            May 2026
          </span>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.75)" }}>
            Netscribes × TataCliq
          </div>
        </div>
      </header>

      <nav
        style={{
          background: "#fff",
          borderBottom: "1px solid #E2E8F0",
          display: "flex",
          padding: "0 24px",
        }}
      >
        {tabs.map((t) => {
          const active = tab === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              style={{
                padding: "14px 20px",
                background: "transparent",
                border: "none",
                borderBottom: active ? "2px solid #0EA5E9" : "2px solid transparent",
                color: active ? "#1A3C5E" : "#64748B",
                fontWeight: active ? 600 : 500,
                fontSize: 14,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              {t.label}
            </button>
          );
        })}
      </nav>

      <main style={{ padding: 24 }}>
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: 400,
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                border: "4px solid #E2E8F0",
                borderTopColor: "#0EA5E9",
                borderRadius: "50%",
                animation: "spin 0.8s linear infinite",
              }}
            />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        ) : (
          <>
            {tab === "wow" && <WowTab data={wowData} />}
            {tab === "summary" && <SummaryTab data={summaryData} />}
            {tab === "bifurcation" && <BifurcationTab data={bifurcationData} />}
            {tab === "eod" && <EodTab data={eodData} />}
          </>
        )}
      </main>
    </div>
  );
}
