"use client";
import { useState } from "react";
import { SECTIONS } from "./data";

function Assess() {
  const [f, setF] = useState({ fpg: "", pg2: "", a1c: "", rnd: "", sym: "no", age: "", bmi: "", ketosis: "no", ab: "unknown", fam: "no" });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const n = (v) => (v === "" ? null : parseFloat(v));
  const fpg = n(f.fpg), pg2 = n(f.pg2), a1c = n(f.a1c), rnd = n(f.rnd);
  const dm = (fpg !== null && fpg >= 7.0) || (pg2 !== null && pg2 >= 11.1) || (a1c !== null && a1c >= 6.5) || (rnd !== null && rnd >= 11.1 && f.sym === "yes");
  const pre = !dm && ((fpg !== null && fpg >= 5.6) || (pg2 !== null && pg2 >= 7.8) || (a1c !== null && a1c >= 5.7));
  const any = fpg !== null || pg2 !== null || a1c !== null || rnd !== null;
  const bmi = n(f.bmi), age = n(f.age);
  let type = [];
  if (dm) {
    if (f.ab === "positive") type.push("Autoantibody positive: favors type 1 DM (or latent autoimmune diabetes of adults if older, non-obese, slow onset).");
    if (f.ketosis === "yes" && (bmi === null || bmi < 25)) type.push("Ketosis in a lean patient: favors type 1 DM; start insulin.");
    if (f.ketosis === "yes" && bmi !== null && bmi >= 25) type.push("Ketosis with obesity: consider ketosis-prone type 2 DM; check antibodies and C-peptide.");
    if (bmi !== null && bmi >= 25 && f.ab !== "positive") type.push("Obesity with insulin resistance features: favors type 2 DM.");
    if ((age !== null && age < 25 && f.fam === "yes" && f.ab !== "positive") || (age !== null && age < 25 && f.ketosis === "no" && bmi !== null && bmi < 25 && f.ab === "negative")) type.push("Young onset, family history, antibody negative: consider monogenic diabetes (MODY); consider genetic testing.");
    if (!type.length) type.push("Type unclear: obtain C-peptide with glucose and islet autoantibodies (GAD, IA-2, ZnT-8).");
  }
  return (<div>
    <div className="card"><h3>Glycemic assessment (mmol/L, HbA1c %)</h3>
      <label>Fasting plasma glucose (mmol/L)</label><input type="number" value={f.fpg} onChange={set("fpg")} />
      <label>2-h OGTT glucose (mmol/L)</label><input type="number" value={f.pg2} onChange={set("pg2")} />
      <label>HbA1c (%)</label><input type="number" value={f.a1c} onChange={set("a1c")} />
      <label>Random glucose (mmol/L)</label><input type="number" value={f.rnd} onChange={set("rnd")} />
      <label>Classic symptoms (polyuria, polydipsia, weight loss)?</label><select value={f.sym} onChange={set("sym")}><option value="no">No</option><option value="yes">Yes</option></select>
    </div>
    <div className="card"><h3>Type clues</h3>
      <label>Age (years)</label><input type="number" value={f.age} onChange={set("age")} />
      <label>BMI (kg/m2)</label><input type="number" value={f.bmi} onChange={set("bmi")} />
      <label>Ketosis / DKA at presentation?</label><select value={f.ketosis} onChange={set("ketosis")}><option value="no">No</option><option value="yes">Yes</option></select>
      <label>Islet autoantibodies</label><select value={f.ab} onChange={set("ab")}><option value="unknown">Not done</option><option value="positive">Positive</option><option value="negative">Negative</option></select>
      <label>Strong family history (autosomal dominant pattern)?</label><select value={f.fam} onChange={set("fam")}><option value="no">No</option><option value="yes">Yes</option></select>
    </div>
    {any && <div className={"card res" + (dm ? " warn" : "")}><h3>{dm ? "Meets diabetes criteria" : pre ? "Prediabetes range (IFG / IGT / HbA1c 5.7-6.4%)" : "Normal glucose tolerance on entered values"}</h3>
      <ul>{dm && <li>Confirm with repeat test on another day unless unequivocal hyperglycemia with acute decompensation.</li>}
        {type.map((t, i) => <li key={i}>{t}</li>)}
        {pre && <li>Lifestyle program, consider metformin if high risk, retest annually.</li>}
        {dm && <li>Next: baseline eye, foot, UACR/eGFR, lipids, BP; individualized HbA1c goal (usually below 7%).</li>}</ul></div>}
    <p style={{ fontSize: 12 }}>Decision support only; clinical judgement applies.</p>
  </div>);
}

export default function Home() {
  const tabs = Object.keys(SECTIONS);
  const [tab, setTab] = useState(tabs[0]);
  const [q, setQ] = useState("");
  const all = Object.entries(SECTIONS).flatMap(([s, items]) => items.map((it) => ({ s, it })));
  const hits = q.length > 1 ? all.filter(({ it }) => (it[0] + it[1]).toLowerCase().includes(q.toLowerCase())) : null;
  const Card = ({ it, tag }) => (<div className="card"><h3>{it[0]}</h3>{tag && <small>{tag}</small>}<ul>{it[1].split("|").map((p, i) => <li key={i}>{p}</li>)}</ul></div>);
  return (<>
    <header><h1>Diabetes in Clinical Care</h1><p>Based on Harrison's Principles, Ch.403-406 (Diagnosis, Management, Complications, Hypoglycemia)</p></header>
    <nav>{tabs.map((t) => <button key={t} className={t === tab && !hits ? "on" : ""} onClick={() => { setTab(t); setQ(""); }}>{t}</button>)}</nav>
    <main>
      <input placeholder="Search all topics (e.g. DKA, metformin, retinopathy)" value={q} onChange={(e) => setQ(e.target.value)} />
      {hits ? (hits.length ? hits.map((h, i) => <Card key={i} it={h.it} tag={h.s} />) : <p>No matches.</p>)
        : tab === "Assessment" ? <Assess /> : SECTIONS[tab].map((it, i) => <Card key={i} it={it} />)}
    </main>
    <footer>Educational reference for clinicians. Verify doses against current guidelines.</footer>
  </>);
}
