# Ground Experience Portal — Canonical Baseline

This is a complete deploy package, reconstructed from the test branch reference. The active portal uses `assets/portal.css` as its sole application stylesheet; the checklist public-share route has an isolated `assets/checklist-share.css`. Historical runtime filenames were renamed to functional names, and references were migrated. The stylesheet preserves the reference cascade order to avoid unverified visual changes.

Run `npm test` and `npm run build` before deployment. See `BASELINE-AUDIT.json` for inventory.
