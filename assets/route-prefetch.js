/* Prefetch route scripts after interaction. Never cache authenticated data or HTML. */
(()=>{'use strict';const seen=new Set();const warm=()=>{
 const pages=window.P40_CLEAN_PAGES||{};
 const routeKeys=Object.keys(pages);
 const prefetch=(key)=>{const def=pages[key];if(!def)return;for(const x of def.scripts||[]){const src=x.src;if(!src||seen.has(src)||!src.startsWith('assets/'))continue;seen.add(src);const l=document.createElement('link');l.rel='prefetch';l.as='script';l.href=src;document.head.appendChild(l)}};
 document.addEventListener('pointerover',e=>{const a=e.target.closest?.('.ge-nav-link[href]');if(!a)return;const u=new URL(a.href,location.href);const key=u.searchParams.get('page')||u.pathname.split('/').pop().replace(/\.html$/,'');if(routeKeys.includes(key))prefetch(key)},{passive:true});
 document.addEventListener('focusin',e=>{const a=e.target.closest?.('.ge-nav-link[href]');if(!a)return;const u=new URL(a.href,location.href);const key=u.searchParams.get('page')||u.pathname.split('/').pop().replace(/\.html$/,'');if(routeKeys.includes(key))prefetch(key)});
};if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',warm,{once:true});else warm();
})();
