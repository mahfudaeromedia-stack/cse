'use strict';
const fs=require('fs'),path=require('path'),assert=require('assert'),vm=require('vm');
const root=path.resolve(__dirname,'..');const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const html=read('app.html'),login=read('login.html'),registry=read('assets/clean-page-registry.js');
assert(html.includes('assets/portal.css'),'Portal canonical CSS missing');
assert(!html.includes('clean-shell.css')&&!html.includes('global-ui-canonical.css'),'Multiple portal CSS owners');
for(const file of ['assets/portal-shell.js','assets/firebase-config.js','assets/firebase-client.js','assets/auth.js','assets/clean-page-registry.js','assets/clean-route-adapter.js'])assert(html.includes(file),`Missing bootstrap: ${file}`);
for(const file of ['assets/firebase-config.js','assets/firebase-client.js','assets/auth.js'])assert(login.includes(file),`Missing login bootstrap: ${file}`);
assert(registry.includes('dashboardRoot'),'Dashboard missing');
assert(registry.includes('interactiveMap'),'Airport map missing');
assert(fs.existsSync(path.join(root,'netlify.toml')),'Netlify configuration missing');
for(const file of ['assets/tesseract.min.js','assets/tesseract-core-simd-lstm.wasm','assets/garuda_operational_map.svg','assets/xlsx.full.min.js'])assert(fs.existsSync(path.join(root,file)),`Missing critical asset ${file}`);
const files=[];function walk(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){const f=path.join(dir,entry.name);if(entry.isDirectory()){if(!['node_modules','.git'].includes(entry.name))walk(f);}else files.push(f)}}walk(root);
let checked=0;
for(const file of files.filter(f=>f.endsWith('.js')&&!f.endsWith('.min.js'))){const rel=path.relative(root,file);try{new vm.Script(fs.readFileSync(file,'utf8'),{filename:rel});checked++}catch(e){if(/\bimport\b|\bexport\b/.test(fs.readFileSync(file,'utf8'))){continue}throw e}}
const css=read('assets/portal.css');assert(!/!\s*important\b/i.test(css),'!important in canonical stylesheet');
assert(css.includes('--ui-navy'),'Shared design tokens missing');
for(const s of ['.btn','.modal-backdrop','.side','.top'])assert(css.includes(s),`Critical style missing ${s}`);
const missing=[];
for(const file of [path.join(root,'app.html'),path.join(root,'login.html')]){const s=fs.readFileSync(file,'utf8');for(const match of s.matchAll(/(?:src|href)=["'](assets\/[a-zA-Z0-9_-]+\.(?:js|css))(?:\?[^"']*)?["']/g)){if(!fs.existsSync(path.join(root,match[1])))missing.push(path.relative(root,file)+' => '+match[1])}}
assert(!missing.length,'Missing referenced assets: '+missing.slice(0,15).join('; '));
console.log(`CANONICAL_BASELINE_REGRESSION_PASS | ${checked} JavaScript syntax checks | ${files.length} files scanned | bootstrap, routes, tokens, assets verified`);
