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

The Indian Medicines tab contains 219 product entries: 61 single-ingredient medicines and 158 fixed-dose/premixed combination products. Thirty combination groups contain at least five distinct product examples each. Five smaller groups have one to three verified entries, and two groups (tirzepatide FDCs and amylin FDCs) explicitly state that no adequately documented Indian combination was verified. Different strengths of the same brand are not used to inflate a five-brand count; insulin mixture ratios are labelled as distinct products. This is a reference catalogue, not a popularity ranking or an exhaustive list of every possible combination. Complication-treatment medicines are outside this glucose-lowering formulary.

Single-ingredient data and class mapping live in `app/medicines.js`; new combination records live in `app/combinations.js`. The directory (`app/medicine-directory.js`) filters by single/combination medicine, component pharmacological class, and exact ingredient combination. Class selection includes combinations containing that class. Global search accepts ingredients, brands, classes and companies, and treatment cards link to the directory.

Each entry includes composition/strength, formulation, company role, price, exact price unit or pack, price type, source URL, listing availability and check date (31 October 2026). MRP, listed retail prices and substitute unit prices are distinguished; these are dated snapshots, not a live price feed. Company fields distinguish source-listed marketers/brand companies from actual manufacturers. A manufacturer name and supporting source are shown only when explicitly verified (for example Soliqua); otherwise inspect the dispensed pack. Source links can point to a parent product's substitute-comparison list. Local stock must be checked even when a listing exists.

Different molecules, IR/XR forms, insulin concentrations and delivery devices must not be treated as automatically interchangeable. Pack prices do not represent monthly treatment costs.

Validation: Next.js production/static-export build; medicine-data completeness, distinct-product and combination-group counts; hydrated production-UI interactions in JSDOM (navigation, single/combination/class/exact-combination filters, ingredient/brand/company/class search, no-result states, treatment links, limited-choice and zero-FDC states, and source-link attributes). Browser-based mobile layout checks could not run because the browser binary download failed in the execution environment.

