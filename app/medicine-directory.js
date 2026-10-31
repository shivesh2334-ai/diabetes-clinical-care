"use client";
import { useState } from "react";
import { MEDICINE_CLASSES, PHARMACOLOGICAL_CLASSES } from "./medicines";

const normalize = text => text.toLowerCase().replace(/[-/]/g, "").replace(/[^a-z0-9. ]/g, " ");
const classNames = Object.fromEntries(PHARMACOLOGICAL_CLASSES.map(group => [group.id,group.name]));
export function matchesMedicine(m, query) {
  const words = normalize(query).trim().split(/\s+/).filter(Boolean);
  const haystack = normalize([m.className, m.componentClasses, m.kind, m.generic, m.strength, m.brand, m.company].join(" "));
  return words.every(word => haystack.includes(word));
}
const belongsToClass = (group, classId) => classId === "all" || group.classIds.includes(classId);

export default function MedicineDirectory({ query = "" }) {
  const [classId, setClassId] = useState("all");
  const [kind, setKind] = useState("all");
  const [combinationId, setCombinationId] = useState("all");
  const combinations = MEDICINE_CLASSES.filter(group => group.kind === "combination" && belongsToClass(group,classId));
  const selected = MEDICINE_CLASSES.filter(group =>
    belongsToClass(group,classId) &&
    (kind === "all" || group.kind === kind) &&
    (combinationId === "all" || group.id === combinationId));
  const groups = selected.map(group => ({
    ...group,
    medicines: group.medicines.filter(m => matchesMedicine({
      ...m,className:group.name,kind:group.kind,componentClasses:group.classIds.map(id=>classNames[id]).join(" "),
    },query)),
  })).filter(group => group.medicines.length || (!query.trim() && group.medicines.length === 0 && group.limited));
  const count = groups.reduce((total,group) => total + group.medicines.length,0);
  const allCombinations = MEDICINE_CLASSES.filter(group => group.kind === "combination");
  const fullCount = allCombinations.filter(group => group.medicines.length >= 5).length;
  const money = new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:2});
  return <section aria-label="Indian medicine brands">
    <div className="card res">
      <h2>Indian medicine brands & costs</h2>
      <p>Single-ingredient medicines, dual and triple fixed-dose combinations, and insulin combinations. At least five product examples are listed in each of {fullCount} combination groups; groups with fewer verified options are clearly marked. Different strengths of one brand are not used to fill a five-brand list.</p>
      <p><strong>Price check: 31 October 2026.</strong> Source snapshots in INR; MRP and listed retail/unit prices are labelled separately. Price and availability vary by pack, batch, location and pharmacy. Pack prices do not imply monthly treatment costs.</p>
      <p><strong>Company information:</strong> source-listed marketer or brand company; the actual manufacturer is shown only where explicitly verified, otherwise check the dispensed pack.</p>
      <p>Ingredient strengths follow the order of the generic names. FDCs are not instructions to combine separate medicines. Different molecules, release forms, insulin ratios, concentrations and devices are not automatically interchangeable.</p>
      <label htmlFor="medicine-kind">Medicine type</label>
      <select id="medicine-kind" value={kind} onChange={e=>{setKind(e.target.value);setCombinationId("all");}}>
        <option value="all">All medicines</option>
        <option value="single">Single-ingredient medicines</option>
        <option value="combination">Combination medicines only</option>
      </select>
      <label htmlFor="medicine-class">Filter medicine class</label>
      <select id="medicine-class" value={classId} onChange={e=>{setClassId(e.target.value);setCombinationId("all");}}>
        <option value="all">All medicine classes</option>
        {PHARMACOLOGICAL_CLASSES.map(group=><option value={group.id} key={group.id}>{group.name}</option>)}
      </select>
      {kind !== "single" && <><label htmlFor="medicine-combination">Filter exact combination group</label>
        <select id="medicine-combination" value={combinationId} onChange={e=>{setCombinationId(e.target.value);if(e.target.value !== "all")setKind("combination");}}>
          <option value="all">All combination groups</option>
          {combinations.map(group=><option value={group.id} key={group.id}>{group.name} ({group.medicines.length} entries)</option>)}
        </select></>}
      <p aria-live="polite">{count} medicine {count === 1 ? "entry" : "entries"}{query.trim() ? " matching your search" : ""} in {groups.length} groups.</p>
    </div>
    {!groups.length && <p role="status">No medicine matches. Try a generic name, brand, class or company, or select all medicine types and classes.</p>}
    {groups.map(group=><article className="card" key={group.id}>
      <h3>{group.name} <small>({group.medicines.length} {query.trim() ? "matching " : ""}entries)</small></h3>
      <p><strong>{group.kind === "combination" ? "Combination medicine" : "Single-ingredient medicine"}</strong>
        {group.kind === "combination" && group.limited && " · Fewer than five verified brand options"}</p>
      <p>{group.note}</p>
      {!!group.medicines.length && <div className="medicine-table-wrap" tabIndex={0} role="region" aria-label={group.name + " brand comparison"}>
        <table className="medicine-table">
          <caption>{group.name}: brand, composition, company and price. Each entry includes its source-check date.</caption>
          <thead><tr><th scope="col">Brand / product</th><th scope="col">Generic / formulation</th><th scope="col">Company details</th><th scope="col">Indicative cost</th><th scope="col">Source / listing</th></tr></thead>
          <tbody>{group.medicines.map(m=><tr key={m.brand}>
            <th scope="row">{m.brand}</th>
            <td>{m.generic}<br/><small>{m.strength}</small></td>
            <td>{m.company}<br/><small>{m.companyRole}</small><br/><small>{m.manufacturer ? "Manufacturer: " + m.manufacturer : "Manufacturer: verify on pack"}</small>
              {m.manufacturerSource && <><br/><a href={m.manufacturerSource} target="_blank" rel="noopener noreferrer">Manufacturer reference</a></>}</td>
            <td><strong>{money.format(m.price)}</strong><br/>{m.unit}<br/><small>{m.priceType}</small></td>
            <td><a href={m.source} target="_blank" rel="noopener noreferrer">Price reference<span className="sr-only"> for {m.brand}</span></a><br/><small>{m.availability}</small><br/><small>Checked {m.checkedOn}</small></td>
          </tr>)}</tbody>
        </table>
      </div>}
    </article>)}
  </section>;
}

