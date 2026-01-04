// Daily Oracle PWA Service Worker v1
const CACHE='daily-oracle-v1';
const URLS=['/','/index.html','/manifest.json'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(URLS)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.map(n=>n!==CACHE?caches.delete(n):null))));return self.clients.claim();});
self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{if(!res||res.status!==200||res.type!=='basic')return res;const rc=res.clone();caches.open(CACHE).then(c=>c.put(e.request,rc));return res;})));});
