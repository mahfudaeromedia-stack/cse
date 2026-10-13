/* Static assets only. Never cache HTML, API, authentication or Firestore responses. */
const CACHE='ge-static-20261013-3';
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil((async()=>{for(const k of await caches.keys())if(k.startsWith('ge-static-')&&k!==CACHE)await caches.delete(k);await self.clients.claim()})()));
self.addEventListener('fetch',event=>{
 const req=event.request;if(req.method!=='GET'||new URL(req.url).origin!==self.location.origin)return;
 const u=new URL(req.url);if(!u.pathname.startsWith('/assets/')||!(/\.(js|css|png|jpg|jpeg|svg|webp)$/i.test(u.pathname)))return;
 event.respondWith((async()=>{const c=await caches.open(CACHE),hit=await c.match(req);const refresh=fetch(req).then(async res=>{if(res.ok&&res.type==='basic')await c.put(req,res.clone());return res});if(hit){event.waitUntil(refresh.catch(()=>{}));return hit}return refresh})());
});
