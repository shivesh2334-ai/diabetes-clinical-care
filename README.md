# Diabetes in Clinical Care
Next.js app (Harrison Ch.403-406). Tabs: Knowledge Base, Assessment, Pathophysiology, Investigations, Treatment, Complications, Prevention, Complication Dx & Tx. Content lives in `app/data.js`.

## Run
npm install && npm run dev

## GitHub + Vercel
git init && git add . && git commit -m "Diabetes clinical care app"
gh repo create diabetes-clinical-care --public --source=. --push
Then in Vercel: Add New > Project > import the repo > Deploy (framework auto-detected as Next.js).

## Learning features
2026 Updates, Case Studies and Quiz tabs; extra pathophysiology cards (HAAF, DKA vs HHS, tissue damage, incretin axis) live in app/learn.js.

## Indian medicine brands and prices

The Indian Medicines tab contains 66 representative glucose-lowering medicine and insulin brand entries: five examples in each of 13 established classes, one verified tirzepatide brand, and an explicit unverified-market-entry note for pramlintide. These are brand examples, not necessarily five distinct molecules or a popularity ranking. Complication-treatment medicines are outside this glucose-lowering formulary.

Data is maintained in `app/medicines.js`; the searchable, class-filtered table is in `app/medicine-directory.js`. Global search accepts generic names, brands, classes and companies, and treatment cards link to the directory.

Each entry includes composition/strength, formulation, company role, price, exact price unit or pack, price type, source URL, listing availability and check date (31 October 2026). MRP, listed retail prices and substitute unit prices are distinguished; these are dated snapshots, not a live price feed. Company fields identify source-listed marketers/brand companies, not independently confirmed manufacturing sites. Inspect the dispensed pack for the actual manufacturer. Source links can point to a parent product's substitute-comparison list. Local stock must be checked even when a listing exists.

Different molecules, IR/XR forms, insulin concentrations and delivery devices must not be treated as automatically interchangeable. Pack prices do not represent monthly treatment costs.

Validation: Next.js production/static-export build; medicine-data completeness/per-class counts; hydrated production-UI interactions in JSDOM (navigation, filters, brand/company search, no-result states, treatment links, limited-choice classes and source-link attributes). Browser-based mobile layout checks could not run because the browser binary download failed in the execution environment.

