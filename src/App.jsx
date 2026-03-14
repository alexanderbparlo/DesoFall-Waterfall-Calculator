import { useState, useMemo } from "react";

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500&display=swap');
`;

const styles = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  
  :root {
    --bg: #0d1117;
    --surface: #161b22;
    --surface2: #1c2230;
    --border: #2a3441;
    --gold: #c9a84c;
    --gold-dim: #8a6d2e;
    --gold-glow: rgba(201,168,76,0.12);
    --text: #e6edf3;
    --muted: #8b949e;
    --green: #3fb950;
    --red: #f85149;
    --blue: #58a6ff;
    --accent: #79c0ff;
  }

  body { background: var(--bg); color: var(--text); font-family: 'DM Sans', sans-serif; }

  .app { min-height: 100vh; display: flex; flex-direction: column; }

  /* Header */
  .header {
    border-bottom: 1px solid var(--border);
    padding: 20px 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--surface);
    position: sticky; top: 0; z-index: 100;
  }
  .header-left { display: flex; align-items: center; gap: 16px; }
  .logo-mark {
    width: 36px; height: 36px;
    border: 1.5px solid var(--gold);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Playfair Display', serif;
    color: var(--gold); font-size: 16px; font-weight: 700;
  }
  .header-title {
    font-family: 'Playfair Display', serif;
    font-size: 18px; color: var(--text); letter-spacing: 0.02em;
  }
  .header-sub { font-size: 11px; color: var(--muted); font-family: 'DM Mono', monospace; letter-spacing: 0.08em; text-transform: uppercase; margin-top: 1px; }
  .status-badge {
    font-family: 'DM Mono', monospace; font-size: 10px;
    padding: 4px 10px; border: 1px solid var(--gold-dim);
    color: var(--gold); letter-spacing: 0.1em; text-transform: uppercase;
  }

  /* Main layout */
  .main { display: grid; grid-template-columns: 380px 1fr; flex: 1; }

  /* Sidebar */
  .sidebar { 
    border-right: 1px solid var(--border); 
    background: var(--surface);
    overflow-y: auto;
    max-height: calc(100vh - 65px);
    position: sticky; top: 65px;
  }
  .sidebar-section { border-bottom: 1px solid var(--border); padding: 20px 24px; }
  .section-label {
    font-family: 'DM Mono', monospace; font-size: 10px;
    letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--gold); margin-bottom: 16px;
    display: flex; align-items: center; gap: 8px;
  }
  .section-label::after { content: ''; flex: 1; height: 1px; background: var(--gold-dim); opacity: 0.4; }

  .field { margin-bottom: 14px; }
  .field:last-child { margin-bottom: 0; }
  .field label { display: block; font-size: 11px; color: var(--muted); margin-bottom: 5px; font-family: 'DM Mono', monospace; letter-spacing: 0.04em; }
  .field input, .field select, .field textarea {
    width: 100%; background: var(--bg);
    border: 1px solid var(--border); color: var(--text);
    padding: 8px 12px; font-family: 'DM Mono', monospace; font-size: 13px;
    outline: none; transition: border-color 0.15s;
    appearance: none;
  }
  .field input:focus, .field select:focus { border-color: var(--gold-dim); }
  .field textarea { resize: vertical; min-height: 80px; font-size: 12px; line-height: 1.5; }
  .field select { cursor: pointer; }

  .field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .field-row3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; }

  .input-with-suffix { position: relative; }
  .input-with-suffix input { padding-right: 32px; }
  .suffix {
    position: absolute; right: 10px; top: 50%; transform: translateY(-50%);
    font-family: 'DM Mono', monospace; font-size: 11px; color: var(--muted);
  }

  .calc-btn {
    width: 100%; padding: 12px;
    background: var(--gold); color: #0d1117;
    font-family: 'DM Mono', monospace; font-size: 12px;
    letter-spacing: 0.1em; text-transform: uppercase;
    border: none; cursor: pointer;
    font-weight: 500; transition: opacity 0.15s;
    margin-top: 4px;
  }
  .calc-btn:hover { opacity: 0.88; }

  /* Content area */
  .content { padding: 32px 40px; overflow-y: auto; }

  .content-header { margin-bottom: 28px; }
  .content-title { font-family: 'Playfair Display', serif; font-size: 26px; color: var(--text); }
  .content-meta { font-family: 'DM Mono', monospace; font-size: 11px; color: var(--muted); margin-top: 4px; letter-spacing: 0.04em; }

  /* KPI strip */
  .kpi-strip { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--border); margin-bottom: 28px; border: 1px solid var(--border); }
  .kpi-card { background: var(--surface); padding: 18px 20px; }
  .kpi-label { font-family: 'DM Mono', monospace; font-size: 10px; color: var(--muted); letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 8px; }
  .kpi-value { font-family: 'DM Mono', monospace; font-size: 22px; color: var(--text); font-weight: 500; }
  .kpi-value.gold { color: var(--gold); }
  .kpi-value.green { color: var(--green); }
  .kpi-sub { font-family: 'DM Mono', monospace; font-size: 10px; color: var(--muted); margin-top: 4px; }

  /* Waterfall table */
  .table-wrap { border: 1px solid var(--border); margin-bottom: 28px; }
  .table-header-row {
    background: var(--surface2);
    padding: 12px 20px;
    display: flex; align-items: center; justify-content: space-between;
    border-bottom: 1px solid var(--border);
  }
  .table-title { font-family: 'DM Mono', monospace; font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--gold); }

  table { width: 100%; border-collapse: collapse; }
  thead tr { background: var(--surface2); }
  thead th {
    text-align: right; padding: 10px 16px;
    font-family: 'DM Mono', monospace; font-size: 10px;
    letter-spacing: 0.08em; text-transform: uppercase;
    color: var(--muted); border-bottom: 1px solid var(--border);
    font-weight: 400;
  }
  thead th:first-child { text-align: left; }

  tbody tr { border-bottom: 1px solid rgba(42,52,65,0.6); transition: background 0.1s; }
  tbody tr:hover { background: rgba(201,168,76,0.04); }
  tbody tr:last-child { border-bottom: none; }
  tbody td {
    padding: 12px 16px; font-family: 'DM Mono', monospace; font-size: 13px;
    text-align: right; color: var(--text);
  }
  tbody td:first-child { text-align: left; color: var(--muted); font-size: 12px; }
  tbody td.label-cell { color: var(--text); font-size: 13px; }

  .tier-label { font-size: 10px; color: var(--muted); letter-spacing: 0.04em; margin-top: 2px; }
  .amount-cell { color: var(--text); }
  .zero-cell { color: var(--border); }
  .gold-cell { color: var(--gold); }
  .green-cell { color: var(--green); }
  .muted-cell { color: var(--muted); }

  .total-row td { 
    border-top: 1px solid var(--gold-dim);
    color: var(--gold); font-weight: 500; 
    background: var(--gold-glow);
  }
  .total-row td:first-child { color: var(--gold); }

  /* Waterfall visual */
  .waterfall-viz { border: 1px solid var(--border); margin-bottom: 28px; }
  .viz-bars { padding: 24px 20px; display: flex; gap: 2px; align-items: flex-end; height: 180px; }
  .viz-bar-wrap { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 6px; }
  .viz-bar {
    width: 100%; border-radius: 0;
    transition: all 0.4s cubic-bezier(.22,.68,0,1.2);
    position: relative; min-height: 4px;
  }
  .viz-bar-label { font-family: 'DM Mono', monospace; font-size: 9px; color: var(--muted); text-align: center; text-transform: uppercase; letter-spacing: 0.06em; }
  .viz-bar-amt { font-family: 'DM Mono', monospace; font-size: 10px; color: var(--muted); text-align: center; }

  /* Clawback / provision section */
  .provision-panel { border: 1px solid var(--border); padding: 20px; margin-bottom: 28px; background: var(--surface); }
  .provision-title { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--gold); margin-bottom: 12px; }
  .provision-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .provision-item label { font-family: 'DM Mono', monospace; font-size: 10px; color: var(--muted); display: block; margin-bottom: 4px; }
  .provision-item .val { font-family: 'DM Mono', monospace; font-size: 14px; color: var(--text); }
  .provision-item .val.warn { color: var(--red); }
  .provision-item .val.ok { color: var(--green); }

  /* LPA ingest panel */
  .lpa-panel { background: var(--surface2); border: 1px dashed var(--gold-dim); padding: 16px; margin-bottom: 14px; }
  .lpa-panel-title { font-family: 'DM Mono', monospace; font-size: 10px; color: var(--gold); letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 8px; }
  .lpa-panel p { font-size: 12px; color: var(--muted); line-height: 1.6; }

  /* Placeholder state */
  .empty-state { 
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    padding: 80px 40px; text-align: center;
    border: 1px dashed var(--border);
  }
  .empty-icon { font-size: 40px; margin-bottom: 16px; opacity: 0.3; }
  .empty-title { font-family: 'Playfair Display', serif; font-size: 20px; color: var(--muted); margin-bottom: 8px; }
  .empty-sub { font-size: 13px; color: var(--border); font-family: 'DM Mono', monospace; }

  /* Notes */
  .notes-box { border: 1px solid var(--border); padding: 16px 20px; background: var(--surface); }
  .notes-title { font-family: 'DM Mono', monospace; font-size: 10px; color: var(--muted); letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 8px; }
  .note { font-family: 'DM Mono', monospace; font-size: 11px; color: var(--muted); margin-bottom: 4px; display: flex; gap: 8px; }
  .note::before { content: '—'; color: var(--gold-dim); flex-shrink: 0; }

  .separator { height: 1px; background: var(--border); margin: 24px 0; }

  select option { background: #1c2230; }

  /* Mobile tab switcher */
  .mobile-tabs { display: none; }

  /* Responsive breakpoints */
  @media (max-width: 768px) {
    .header { padding: 14px 16px; }
    .header-sub { display: none; }
    .status-badge { display: none; }

    .main { display: block; }

    .mobile-tabs {
      display: flex;
      border-bottom: 1px solid var(--border);
      background: var(--surface);
      position: sticky; top: 57px; z-index: 99;
    }
    .mobile-tab {
      flex: 1; padding: 12px;
      font-family: 'DM Mono', monospace; font-size: 11px;
      letter-spacing: 0.08em; text-transform: uppercase;
      color: var(--muted); background: none; border: none;
      cursor: pointer; border-bottom: 2px solid transparent;
      transition: color 0.15s, border-color 0.15s;
    }
    .mobile-tab.active { color: var(--gold); border-bottom-color: var(--gold); }

    .sidebar {
      position: static;
      max-height: none;
      border-right: none;
      display: none;
    }
    .sidebar.mobile-visible { display: block; }

    .content { padding: 20px 16px; display: none; }
    .content.mobile-visible { display: block; }

    .sidebar-section { padding: 16px; }

    .kpi-strip { grid-template-columns: 1fr 1fr; }
    .kpi-value { font-size: 18px; }

    .content-title { font-size: 20px; }

    /* Scrollable tables on mobile */
    .table-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; }
    table { min-width: 520px; }

    .table-wrap.wide table { min-width: 680px; }

    .provision-grid { grid-template-columns: 1fr; }

    .field input, .field select, .field textarea {
      font-size: 16px;
      padding: 10px 12px;
    }
    .field-row { grid-template-columns: 1fr 1fr; }

    .viz-bars { height: 140px; }
    .viz-bar-label { font-size: 8px; }
    .viz-bar-amt { font-size: 9px; }

    .empty-state { padding: 40px 20px; }

    .calc-btn { padding: 14px; font-size: 13px; }
  }
`;

function fmt(n, decimals = 0) {
  if (n === null || n === undefined || isNaN(n)) return "—";
  return "$" + n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}
function fmtPct(n) {
  if (n === null || isNaN(n)) return "—";
  return n.toFixed(2) + "x";
}
function fmtMult(n) {
  if (n === null || isNaN(n)) return "—";
  return n.toFixed(2) + "x";
}

function calcWaterfall(params) {
  const {
    investedCapital,
    totalProceeds,
    holdYears,
    managementFeeRate,
    carryRate,
    hurdleRate,
    gpCatchupRate,
    catchupType,
    clawbackEnabled,
    preferredReturnCompounding,
    gpCommit,
    distributionOrder,
    lpCount,
  } = params;

  const ic = investedCapital;
  const proceeds = totalProceeds;

  // Management fee (informational, not deducted from waterfall in simplified model)
  const annualMgmtFee = ic * (managementFeeRate / 100);
  const totalMgmtFees = annualMgmtFee * holdYears;

  // GP / LP split
  const gpPct = gpCommit / 100;
  const lpPct = 1 - gpPct;

  // LP invested capital
  const lpIC = ic * lpPct;
  const gpIC = ic * gpPct;

  // Preferred return calculation
  let prefReturn;
  if (preferredReturnCompounding === "compound") {
    prefReturn = lpIC * (Math.pow(1 + hurdleRate / 100, holdYears) - 1);
  } else {
    prefReturn = lpIC * (hurdleRate / 100) * holdYears;
  }

  let remaining = proceeds;
  const tiers = [];

  // Tier 1: Return of Capital
  const roc = Math.min(remaining, ic);
  remaining -= roc;
  const lpROC = roc * lpPct;
  const gpROC = roc * gpPct;
  tiers.push({ label: "Return of Capital", tier: "ROC", lpAmt: lpROC, gpAmt: gpROC, total: roc, note: "Pro-rata by commitment" });

  if (remaining <= 0) {
    return { tiers, remaining: 0, moic: proceeds / ic, irr: calcIRR(ic, proceeds, holdYears), annualMgmtFee, totalMgmtFees, prefReturn, gpIC, lpIC, clawback: 0 };
  }

  // Tier 2: Preferred Return (to LPs)
  const prefPaid = Math.min(remaining, prefReturn);
  remaining -= prefPaid;
  tiers.push({ label: "Preferred Return", tier: "PREF", lpAmt: prefPaid, gpAmt: 0, total: prefPaid, note: `${hurdleRate}% ${preferredReturnCompounding} over ${holdYears}yrs` });

  let gpCatchupPaid = 0;
  if (remaining > 0 && gpCatchupRate > 0) {
    // Tier 3: GP Catch-Up
    // GP catch-up: GP receives until they've gotten carry% of total profits
    const totalProfit = proceeds - ic;
    const lpProfit = prefPaid; // what LP has received above ROC
    const targetGPProfit = (totalProfit * (carryRate / 100));
    const catchupNeeded = Math.max(0, targetGPProfit - gpROC);

    if (catchupType === "full") {
      gpCatchupPaid = Math.min(remaining, catchupNeeded);
    } else {
      // Partial catch-up at specified rate
      const catchupPool = Math.min(remaining, remaining); // all remaining until target
      gpCatchupPaid = Math.min(remaining, catchupNeeded);
    }
    remaining -= gpCatchupPaid;
    if (gpCatchupPaid > 0) {
      tiers.push({ label: "GP Catch-Up", tier: "CATCHUP", lpAmt: 0, gpAmt: gpCatchupPaid, total: gpCatchupPaid, note: `${catchupType === "full" ? "100%" : gpCatchupRate + "%"} to GP until ${carryRate}% carry achieved` });
    }
  }

  // Tier 4: Carried Interest split
  let carryLP = 0, carryGP = 0;
  if (remaining > 0) {
    const lpShare = 1 - (carryRate / 100);
    carryLP = remaining * lpShare;
    carryGP = remaining * (carryRate / 100);
    tiers.push({ label: "Carried Interest Split", tier: "CARRY", lpAmt: carryLP, gpAmt: carryGP, total: remaining, note: `${100 - carryRate}% LP / ${carryRate}% GP carry` });
    remaining = 0;
  }

  // Clawback: if GP received more carry than they should have
  const totalGPReceived = gpROC + gpCatchupPaid + carryGP;
  const totalLPReceived = lpROC + prefPaid + carryLP;
  const totalProfit = Math.max(0, proceeds - ic);
  const expectedGPCarry = totalProfit * (carryRate / 100);
  const clawback = clawbackEnabled ? Math.max(0, totalGPReceived - gpIC - expectedGPCarry) : 0;

  const moic = proceeds / ic;
  const irr = calcIRR(ic, proceeds, holdYears);

  return { tiers, remaining: 0, moic, irr, annualMgmtFee, totalMgmtFees, prefReturn, gpIC, lpIC, clawback, totalLPReceived, totalGPReceived };
}

function calcIRR(invested, returned, years) {
  if (years <= 0 || invested <= 0) return 0;
  return (Math.pow(returned / invested, 1 / years) - 1) * 100;
}

const TIER_COLORS = {
  ROC: "#3fb950",
  PREF: "#58a6ff",
  CATCHUP: "#c9a84c",
  CARRY: "#f78166",
};

export default function App() {
  const [lpaText, setLpaText] = useState("");
  const [params, setParams] = useState({
    investedCapital: 100000000,
    totalProceeds: 220000000,
    holdYears: 5,
    managementFeeRate: 2,
    carryRate: 20,
    hurdleRate: 8,
    gpCatchupRate: 100,
    catchupType: "full",
    clawbackEnabled: true,
    preferredReturnCompounding: "compound",
    gpCommit: 2,
    distributionOrder: "american",
    lpCount: 3,
  });
  const [calculated, setCalculated] = useState(null);
  const [lpaParseNote, setLpaParseNote] = useState("");
  const [mobileTab, setMobileTab] = useState("inputs");

  function set(key, val) {
    setParams(p => ({ ...p, [key]: val }));
  }

  function parseLPA() {
    const text = lpaText.toLowerCase();
    const updates = {};
    const notes = [];

    const mgmt = text.match(/(\d+(?:\.\d+)?)\s*%\s*(?:per\s*annum\s*)?management fee/);
    if (mgmt) { updates.managementFeeRate = parseFloat(mgmt[1]); notes.push(`Management fee: ${mgmt[1]}%`); }

    const carry = text.match(/(\d+(?:\.\d+)?)\s*%\s*(?:carried interest|carry|incentive allocation)/);
    if (carry) { updates.carryRate = parseFloat(carry[1]); notes.push(`Carry: ${carry[1]}%`); }

    const hurdle = text.match(/(\d+(?:\.\d+)?)\s*%\s*(?:preferred return|hurdle rate|hurdle)/);
    if (hurdle) { updates.hurdleRate = parseFloat(hurdle[1]); notes.push(`Hurdle: ${hurdle[1]}%`); }

    const compound = text.includes("compound") ? "compound" : text.includes("simple") ? "simple" : null;
    if (compound) { updates.preferredReturnCompounding = compound; notes.push(`Return: ${compound}`); }

    const catchup = text.includes("100% catch") || text.includes("full catch") ? "full" : text.includes("catch") ? "partial" : null;
    if (catchup) { updates.catchupType = catchup; notes.push(`Catch-up: ${catchup}`); }

    const claw = text.includes("clawback") || text.includes("claw-back");
    if (claw) { updates.clawbackEnabled = true; notes.push("Clawback: enabled"); }

    const european = text.includes("european") ? "european" : text.includes("american") ? "american" : null;
    if (european) { updates.distributionOrder = european; notes.push(`Waterfall: ${european}`); }

    const gpCommit = text.match(/gp\s+commit[^\d]*(\d+(?:\.\d+)?)\s*%/);
    if (gpCommit) { updates.gpCommit = parseFloat(gpCommit[1]); notes.push(`GP commit: ${gpCommit[1]}%`); }

    if (Object.keys(updates).length > 0) {
      setParams(p => ({ ...p, ...updates }));
      setLpaParseNote("Parsed: " + notes.join(" · "));
    } else {
      setLpaParseNote("No structured data detected. Enter LPA terms above or configure manually.");
    }
  }

  function calculate() {
    const result = calcWaterfall(params);
    setCalculated(result);
    setMobileTab("output");
  }

  const viz = useMemo(() => {
    if (!calculated) return null;
    const maxVal = Math.max(...calculated.tiers.map(t => t.total), 1);
    return calculated.tiers.map(t => ({
      ...t,
      heightPct: (t.total / maxVal) * 100,
    }));
  }, [calculated]);

  return (
    <>
      <style>{FONTS}{styles}</style>
      <div className="app">
        {/* Header */}
        <header className="header">
          <div className="header-left">
            <div className="logo-mark">D</div>
            <div>
              <div className="header-title">DesoFall</div>
              <div className="header-sub">Private Equity Distribution Engine</div>
            </div>
          </div>
          <div className="status-badge">DesoFall v1.0</div>
        </header>

        {/* Mobile tab switcher */}
        <div className="mobile-tabs">
          <button className={`mobile-tab ${mobileTab === "inputs" ? "active" : ""}`} onClick={() => setMobileTab("inputs")}>
            Configure
          </button>
          <button className={`mobile-tab ${mobileTab === "output" ? "active" : ""}`} onClick={() => { setMobileTab("output"); }}>
            Results
          </button>
        </div>

        <div className="main">
          {/* Sidebar */}
          <aside className={`sidebar ${mobileTab === "inputs" ? "mobile-visible" : ""}`}>
            {/* LPA Ingest */}
            <div className="sidebar-section">
              <div className="section-label">LPA Ingest</div>
              <div className="lpa-panel">
                <div className="lpa-panel-title">Paste LPA Language</div>
                <p>Paste relevant LPA clauses below. The parser will extract fee structures, hurdle rates, catch-up, and clawback provisions automatically.</p>
              </div>
              <div className="field">
                <label>LPA Text / Relevant Clauses</label>
                <textarea
                  value={lpaText}
                  onChange={e => setLpaText(e.target.value)}
                  placeholder="e.g. 'The General Partner shall be entitled to a 2% per annum management fee on committed capital... 20% carried interest... 8% preferred return compounding annually... 100% GP catch-up... clawback provision...'"
                />
              </div>
              <button className="calc-btn" style={{ background: "var(--surface2)", color: "var(--gold)", border: "1px solid var(--gold-dim)", marginBottom: 8 }} onClick={parseLPA}>
                Parse LPA →
              </button>
              {lpaParseNote && <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--green)", marginTop: 6, lineHeight: 1.6 }}>{lpaParseNote}</div>}
            </div>

            {/* Fund Structure */}
            <div className="sidebar-section">
              <div className="section-label">Fund Structure</div>
              <div className="field-row">
                <div className="field">
                  <label>Mgmt Fee %</label>
                  <div className="input-with-suffix">
                    <input type="number" value={params.managementFeeRate} onChange={e => set("managementFeeRate", +e.target.value)} step="0.5" />
                    <span className="suffix">%</span>
                  </div>
                </div>
                <div className="field">
                  <label>Carry %</label>
                  <div className="input-with-suffix">
                    <input type="number" value={params.carryRate} onChange={e => set("carryRate", +e.target.value)} step="1" />
                    <span className="suffix">%</span>
                  </div>
                </div>
              </div>
              <div className="field-row">
                <div className="field">
                  <label>Hurdle Rate %</label>
                  <div className="input-with-suffix">
                    <input type="number" value={params.hurdleRate} onChange={e => set("hurdleRate", +e.target.value)} step="0.5" />
                    <span className="suffix">%</span>
                  </div>
                </div>
                <div className="field">
                  <label>GP Commit %</label>
                  <div className="input-with-suffix">
                    <input type="number" value={params.gpCommit} onChange={e => set("gpCommit", +e.target.value)} step="0.5" />
                    <span className="suffix">%</span>
                  </div>
                </div>
              </div>
              <div className="field">
                <label>Preferred Return Compounding</label>
                <select value={params.preferredReturnCompounding} onChange={e => set("preferredReturnCompounding", e.target.value)}>
                  <option value="compound">Compound (Annual)</option>
                  <option value="simple">Simple</option>
                </select>
              </div>
              <div className="field">
                <label>Waterfall Structure</label>
                <select value={params.distributionOrder} onChange={e => set("distributionOrder", e.target.value)}>
                  <option value="american">American (Deal-by-Deal)</option>
                  <option value="european">European (Whole-Fund)</option>
                </select>
              </div>
            </div>

            {/* Catch-Up & Clawback */}
            <div className="sidebar-section">
              <div className="section-label">GP Catch-Up / Clawback</div>
              <div className="field-row">
                <div className="field">
                  <label>Catch-Up Type</label>
                  <select value={params.catchupType} onChange={e => set("catchupType", e.target.value)}>
                    <option value="full">Full (100%)</option>
                    <option value="partial">Partial</option>
                    <option value="none">No Catch-Up</option>
                  </select>
                </div>
                <div className="field">
                  <label>Catch-Up Rate %</label>
                  <div className="input-with-suffix">
                    <input type="number" value={params.gpCatchupRate} onChange={e => set("gpCatchupRate", +e.target.value)} step="5" disabled={params.catchupType !== "partial"} style={{ opacity: params.catchupType !== "partial" ? 0.4 : 1 }} />
                    <span className="suffix">%</span>
                  </div>
                </div>
              </div>
              <div className="field">
                <label>Clawback Provision</label>
                <select value={params.clawbackEnabled ? "yes" : "no"} onChange={e => set("clawbackEnabled", e.target.value === "yes")}>
                  <option value="yes">Enabled</option>
                  <option value="no">Disabled</option>
                </select>
              </div>
            </div>

            {/* Investment Data */}
            <div className="sidebar-section">
              <div className="section-label">Investment Data</div>
              <div className="field">
                <label>Total Invested Capital ($)</label>
                <input type="number" value={params.investedCapital} onChange={e => set("investedCapital", +e.target.value)} step={1000000} />
              </div>
              <div className="field">
                <label>Total Proceeds ($)</label>
                <input type="number" value={params.totalProceeds} onChange={e => set("totalProceeds", +e.target.value)} step={1000000} />
              </div>
              <div className="field-row">
                <div className="field">
                  <label>Hold Period (Yrs)</label>
                  <input type="number" value={params.holdYears} onChange={e => set("holdYears", +e.target.value)} step="1" />
                </div>
                <div className="field">
                  <label>LP Count</label>
                  <input type="number" value={params.lpCount} onChange={e => set("lpCount", Math.max(1, +e.target.value))} step="1" min="1" max="10" />
                </div>
              </div>
              <button className="calc-btn" onClick={calculate}>Run Waterfall →</button>
            </div>
          </aside>

          {/* Content */}
          <main className={`content ${mobileTab === "output" ? "mobile-visible" : ""}`}>
            {!calculated ? (
              <div className="empty-state">
                <div className="empty-icon">⬡</div>
                <div className="empty-title">Configure & Run Waterfall</div>
                <div className="empty-sub">Set fund parameters in the left panel, then click Run Waterfall →</div>
              </div>
            ) : (
              <>
                <div className="content-header">
                  <div className="content-title">Distribution Waterfall Output</div>
                  <div className="content-meta">
                    {fmt(params.investedCapital)} invested · {fmt(params.totalProceeds)} proceeds · {params.holdYears}yr hold · {params.distributionOrder === "american" ? "American" : "European"} waterfall
                  </div>
                </div>

                {/* KPIs */}
                <div className="kpi-strip">
                  <div className="kpi-card">
                    <div className="kpi-label">Gross MOIC</div>
                    <div className="kpi-value gold">{fmtMult(calculated.moic)}</div>
                    <div className="kpi-sub">Multiple on invested capital</div>
                  </div>
                  <div className="kpi-card">
                    <div className="kpi-label">Gross IRR</div>
                    <div className="kpi-value green">{calculated.irr.toFixed(1)}%</div>
                    <div className="kpi-sub">Internal rate of return</div>
                  </div>
                  <div className="kpi-card">
                    <div className="kpi-label">Total Profit</div>
                    <div className="kpi-value">{fmt(params.totalProceeds - params.investedCapital)}</div>
                    <div className="kpi-sub">Proceeds above cost</div>
                  </div>
                  <div className="kpi-card">
                    <div className="kpi-label">Total Mgmt Fees</div>
                    <div className="kpi-value" style={{ fontSize: 18 }}>{fmt(calculated.totalMgmtFees)}</div>
                    <div className="kpi-sub">{fmt(calculated.annualMgmtFee)}/yr × {params.holdYears}yrs</div>
                  </div>
                </div>

                {/* Waterfall Visualization */}
                <div className="waterfall-viz">
                  <div className="table-header-row">
                    <div className="table-title">Waterfall Distribution — Visual</div>
                  </div>
                  <div className="viz-bars">
                    {viz.map((t, i) => (
                      <div key={i} className="viz-bar-wrap">
                        <div className="viz-bar-label">{t.tier}</div>
                        <div
                          className="viz-bar"
                          style={{
                            height: `${Math.max(t.heightPct, 4)}%`,
                            background: TIER_COLORS[t.tier] || "#555",
                            opacity: 0.85,
                          }}
                        />
                        <div className="viz-bar-amt">{fmt(t.total / 1e6, 1)}M</div>
                      </div>
                    ))}
                    {/* LP total */}
                    <div className="viz-bar-wrap">
                      <div className="viz-bar-label">LP NET</div>
                      <div className="viz-bar" style={{ height: `${Math.max((calculated.totalLPReceived / Math.max(...calculated.tiers.map(t=>t.total))) * 100, 4)}%`, background: "#79c0ff", opacity: 0.7 }} />
                      <div className="viz-bar-amt">{fmt(calculated.totalLPReceived / 1e6, 1)}M</div>
                    </div>
                    <div className="viz-bar-wrap">
                      <div className="viz-bar-label">GP NET</div>
                      <div className="viz-bar" style={{ height: `${Math.max((calculated.totalGPReceived / Math.max(...calculated.tiers.map(t=>t.total))) * 100, 4)}%`, background: "#c9a84c", opacity: 0.7 }} />
                      <div className="viz-bar-amt">{fmt(calculated.totalGPReceived / 1e6, 1)}M</div>
                    </div>
                  </div>
                </div>

                {/* Main Waterfall Table */}
                <div className="table-wrap">
                  <div className="table-header-row">
                    <div className="table-title">Distribution Waterfall — Tier Detail</div>
                  </div>
                  <table>
                    <thead>
                      <tr>
                        <th style={{ width: "30%" }}>Distribution Tier</th>
                        <th>LP Share</th>
                        <th>GP Share</th>
                        <th>Tier Total</th>
                        <th>% of Proceeds</th>
                      </tr>
                    </thead>
                    <tbody>
                      {calculated.tiers.map((t, i) => (
                        <tr key={i}>
                          <td>
                            <div className="label-cell" style={{ color: TIER_COLORS[t.tier] || "var(--text)" }}>{t.label}</div>
                            <div className="tier-label">{t.note}</div>
                          </td>
                          <td className={t.lpAmt === 0 ? "zero-cell" : "amount-cell"}>{t.lpAmt === 0 ? "—" : fmt(t.lpAmt)}</td>
                          <td className={t.gpAmt === 0 ? "zero-cell" : "gold-cell"}>{t.gpAmt === 0 ? "—" : fmt(t.gpAmt)}</td>
                          <td className="amount-cell">{fmt(t.total)}</td>
                          <td className="muted-cell">{((t.total / params.totalProceeds) * 100).toFixed(1)}%</td>
                        </tr>
                      ))}
                      <tr className="total-row">
                        <td>Total Distributions</td>
                        <td>{fmt(calculated.totalLPReceived)}</td>
                        <td>{fmt(calculated.totalGPReceived)}</td>
                        <td>{fmt(params.totalProceeds)}</td>
                        <td>100.0%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* GP / LP Summary Table */}
                <div className="table-wrap wide">
                  <div className="table-header-row">
                    <div className="table-title">GP / LP Summary</div>
                  </div>
                  <table>
                    <thead>
                      <tr>
                        <th style={{ width: "20%" }}>Party</th>
                        <th>Capital In</th>
                        <th>ROC</th>
                        <th>Pref Return</th>
                        <th>Catch-Up / Carry</th>
                        <th>Total Out</th>
                        <th>Net Profit</th>
                        <th>MOIC</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><div className="label-cell" style={{ color: "var(--blue)" }}>LP Investors</div><div className="tier-label">{params.lpCount} limited partner{params.lpCount > 1 ? "s" : ""}</div></td>
                        <td>{fmt(calculated.lpIC)}</td>
                        <td className="green-cell">{fmt(calculated.tiers.find(t => t.tier === "ROC")?.lpAmt || 0)}</td>
                        <td className="amount-cell">{fmt(calculated.prefReturn)}</td>
                        <td className="amount-cell">{fmt(calculated.tiers.find(t => t.tier === "CARRY")?.lpAmt || 0)}</td>
                        <td className="amount-cell">{fmt(calculated.totalLPReceived)}</td>
                        <td className="green-cell">{fmt(calculated.totalLPReceived - calculated.lpIC)}</td>
                        <td className="gold-cell">{fmtMult(calculated.totalLPReceived / calculated.lpIC)}</td>
                      </tr>
                      <tr>
                        <td><div className="label-cell" style={{ color: "var(--gold)" }}>GP / Manager</div><div className="tier-label">General partner</div></td>
                        <td>{fmt(calculated.gpIC)}</td>
                        <td className="green-cell">{fmt(calculated.tiers.find(t => t.tier === "ROC")?.gpAmt || 0)}</td>
                        <td className="muted-cell">—</td>
                        <td className="gold-cell">{fmt((calculated.tiers.find(t => t.tier === "CATCHUP")?.gpAmt || 0) + (calculated.tiers.find(t => t.tier === "CARRY")?.gpAmt || 0))}</td>
                        <td className="amount-cell">{fmt(calculated.totalGPReceived)}</td>
                        <td className="green-cell">{fmt(calculated.totalGPReceived - calculated.gpIC)}</td>
                        <td className="gold-cell">{fmtMult(calculated.totalGPReceived / calculated.gpIC)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Clawback / Provisions */}
                {params.clawbackEnabled && (
                  <div className="provision-panel">
                    <div className="provision-title">Clawback & Provision Analysis</div>
                    <div className="provision-grid">
                      <div className="provision-item">
                        <label>Clawback Obligation</label>
                        <div className={`val ${calculated.clawback > 0 ? "warn" : "ok"}`}>
                          {calculated.clawback > 0 ? fmt(calculated.clawback) : "None — No clawback triggered"}
                        </div>
                      </div>
                      <div className="provision-item">
                        <label>Preferred Return (LP Total)</label>
                        <div className="val">{fmt(calculated.prefReturn)}</div>
                      </div>
                      <div className="provision-item">
                        <label>LP Net MOIC</label>
                        <div className="val">{fmtMult(calculated.totalLPReceived / calculated.lpIC)}</div>
                      </div>
                      <div className="provision-item">
                        <label>GP Net MOIC (on GP Commit)</label>
                        <div className="val">{fmtMult(calculated.totalGPReceived / calculated.gpIC)}</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Notes */}
                <div className="notes-box">
                  <div className="notes-title">Calculation Notes</div>
                  <div className="note">Waterfall structure: {params.distributionOrder === "american" ? "American (deal-by-deal) — carry calculated per investment before full return of capital to fund" : "European (whole-fund) — full return of all capital before carry begins"}</div>
                  <div className="note">Preferred return calculated on LP committed capital only ({fmt(calculated.lpIC)}) at {params.hurdleRate}% {params.preferredReturnCompounding} over {params.holdYears} years</div>
                  <div className="note">Management fees ({params.managementFeeRate}%/yr · {fmt(calculated.annualMgmtFee)}/yr) are informational; proceeds represent net after any fee offsets per LPA</div>
                  <div className="note">GP catch-up: {params.catchupType === "none" ? "No catch-up provision" : `${params.catchupType === "full" ? "100%" : params.gpCatchupRate + "%"} catch-up until GP has received ${params.carryRate}% of total profits`}</div>
                  {params.clawbackEnabled && <div className="note">Clawback provision active — GP subject to return of excess carry if LP hurdle not met on aggregate</div>}
                  <div className="note">All figures are pre-tax. LP distributions shown in aggregate across {params.lpCount} limited partner{params.lpCount > 1 ? "s" : ""}; pro-rata allocation by LP commitment percentage not modeled here</div>
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </>
  );
}
