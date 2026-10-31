"use client";
import { useState } from "react";
import { CHECKED_ON, MEDICINE_CLASSES } from "./medicines";

export function matchesMedicine(m, query) {
  const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  const haystack = [m.className, m.generic, m.strength, m.brand, m.company].join(" ").toLowerCase();
  return words.every(word => haystack.includes(word));
}

export default function MedicineDirectory({ query = "" }) {
  const [classId, setClassId] = useState("all");
  const selected = MEDICINE_CLASSES.filter(group => classId === "all" || group.id === classId);
  const groups = selected.map(group => ({ ...group, medicines: group.medicines.filter(m => matchesMedicine({...m,className:group.name}, query)) }))
    .filter(group => group.medicines.length || (!query.trim() && group.id === "amylin"));
  const count = groups.reduce((total, group) => total + group.medicines.length, 0);
  const money = new Intl.NumberFormat("en-IN", {style:"currency",currency:"INR",maximumFractionDigits:2});
  return <section aria-label="Indian medicine brands">
    <div className="card res">
      <h2>Indian medicine brands & costs</h2>
      <p>Representative brands for glucose-lowering medicines and insulin, grouped by pharmacological class. Five brand examples per established class; limited-choice classes are explicitly marked. This is a reference list, not a sales or popularity ranking.</p>
      <p><strong>Price check: 31 October 2026.</strong> MRP and listed retail/unit prices are labelled separately. These are source snapshots in Indian rupees, not live quotes. Actual price and availability vary by pack, batch, location and pharmacy. No monthly treatment cost is implied.</p>
      <p><strong>Company information:</strong> the company shown is the source-listed marketer or brand company. The actual manufacturing site/company has not been independently verified; check “Manufactured by” on the dispensed pack.</p>
      <p>Different molecules, release forms, insulin concentrations and devices are not automatically interchangeable. Compare the stated strength and price unit before comparing costs.</p>
      <label htmlFor="medicine-class">Filter medicine class</label>
      <select id="medicine-class" value={classId} onChange={e => setClassId(e.target.value)}>
        <option value="all">All medicine classes</option>
        {MEDICINE_CLASSES.map(group => <option value={group.id} key={group.id}>{group.name}</option>)}
      </select>
      <p aria-live="polite">{count} brand {count === 1 ? "entry" : "entries"}{query.trim() ? " matching your search" : ""}.</p>
    </div>
    {!groups.length && <p role="status">No medicine matches. Try a generic name, brand, class or company, or select all classes.</p>}
    {groups.map(group => <article className="card" key={group.id}>
      <h3>{group.name} <small>({group.medicines.length} {query.trim() ? "matching " : ""}brands)</small></h3>
      <p>{group.note}</p>
      {!!group.medicines.length && <div className="medicine-table-wrap" tabIndex={0} role="region" aria-label={group.name + " brand comparison"}>
        <table className="medicine-table">
          <caption>{group.name}: brand, composition, company and price. Checked {CHECKED_ON}.</caption>
          <thead><tr><th scope="col">Brand</th><th scope="col">Generic / formulation</th><th scope="col">Company (marketer)</th><th scope="col">Indicative cost</th><th scope="col">Source / listing</th></tr></thead>
          <tbody>{group.medicines.map(m => <tr key={m.brand}>
            <th scope="row">{m.brand}</th>
            <td>{m.generic}<br/><small>{m.strength}</small></td>
            <td>{m.company}<br/><small>Manufacturer: verify on pack</small></td>
            <td><strong>{money.format(m.price)}</strong><br/>{m.unit}<br/><small>{m.priceType}</small></td>
            <td><a href={m.source} target="_blank" rel="noopener noreferrer">Price reference<span className="sr-only"> for {m.brand}</span></a><br/><small>{m.availability}</small></td>
          </tr>)}</tbody>
        </table>
      </div>}
    </article>)}
  </section>;
}

