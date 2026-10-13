import fs from 'node:fs';import assert from 'node:assert/strict';
const css=fs.readFileSync(new URL('../assets/portal.css',import.meta.url),'utf8');
for(const cls of ['calendar-grid-v251','calendar-day-r2','project-summary-card-v2532','lounge-master-card-v237','lounge-master-code-v237','sa-hero','ge-dash-kpi','ge-sidebar-scroll','ge-sidebar-toggle','row-actions','airport-detail-item-v244','planning-domain-card'])assert.ok(css.includes('.'+cls),'Missing page style: '+cls);
assert.match(css,/\.side\{[^}]*display:flex;flex-direction:column;overflow:hidden/);
console.log('Page component CSS coverage: PASS');
