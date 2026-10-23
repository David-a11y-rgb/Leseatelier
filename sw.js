const CACHE='leseatelier-shell-v6';
const FILES=['./','./index.html','./styles.css','./app.js','./manifest.webmanifest','./icon-192.png','./icon-512.png','./apple-touch-icon.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(names=>Promise.all(names.filter(name=>name!==CACHE&&name.startsWith('leseatelier-shell-')).map(name=>caches.delete(name)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{
  const request=event.request;if(request.method!=='GET')return;
  const url=new URL(request.url);if(url.origin!==location.origin)return;
  event.respondWith(fetch(request).then(response=>{if(response.ok){const copy=response.clone();caches.open(CACHE).then(c=>c.put(request,copy));}return response;}).catch(()=>caches.match(request).then(result=>result||caches.match('./index.html'))));
});
