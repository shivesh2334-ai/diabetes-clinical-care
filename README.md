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
