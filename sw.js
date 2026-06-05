const CACHE_NAME = "tbm-pwa-v30";

const HEAT_FIX = `<script>
window.calculateHeatIndex=function(){
  const t=parseFloat(document.getElementById('tempInput').value);
  const h=parseFloat(document.getElementById('humidityInput').value);
  const r=document.getElementById('heatResult');
  if(Number.isNaN(t)||Number.isNaN(h)){alert('Please enter both values.');return;}
  if(h<0||h>100){alert('Humidity must be between 0 and 100.');return;}
  const w=t*Math.atan(.151977*Math.sqrt(h+8.313659))+Math.atan(t+h)-Math.atan(h-1.67633)+.00391838*Math.pow(h,1.5)*Math.atan(.023101*h)-4.686035;
  const x=-.2442+.55399*w+.45535*t-.0022*Math.pow(w,2)+.00278*w*t+3;
  const v=Math.round(x*100)/100;
  let level='\\uD574\\uB2F9 \\uC5C6\\uC74C';
  if(v>=38){level='\\uC704\\uD5D8';}
  else if(v>=35){level='\\uACBD\\uACE0';}
  else if(v>=33){level='\\uC8FC\\uC758';}
  else if(v>=31){level='\\uAD00\\uC2EC';}
  r.style.display='block';
  r.innerHTML='<strong>\\uCCB4\\uAC10\\uC628\\uB3C4 '+v+'\\u2103</strong><br><span class="heat-level">'+level+'</span>';
};
</script>`;

self.addEventListener("install", event => {
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(key => caches.delete(key))))
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).then(async response => {
        const contentType = response.headers.get("content-type") || "";
        if (!contentType.includes("text/html")) return response;
        const html = await response.text();
        const headers = new Headers(response.headers);
        headers.delete("content-length");
        headers.delete("content-encoding");
        return new Response(html.replace("</body>", HEAT_FIX + "</body>"), {
          status: response.status,
          statusText: response.statusText,
          headers
        });
      })
    );
    return;
  }
  event.respondWith(fetch(event.request));
});