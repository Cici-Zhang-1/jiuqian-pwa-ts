if(!self.define){let e,i={};const s=(s,n)=>(s=new URL(s+".js",n).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(n,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let c={};const t=e=>s(e,o),d={module:{uri:o},exports:c,require:t};i[o]=Promise.all(n.map((e=>d[e]||t(e)))).then((e=>(r(...e),c)))}}define(["./workbox-3625d7b0"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/AboutView.4d995ba2.css",revision:null},{url:"assets/AboutView.bb382d63.js",revision:null},{url:"assets/F7.b1572d8f.js",revision:null},{url:"assets/index.4144d5d4.js",revision:null},{url:"assets/index.b40ca666.css",revision:null},{url:"index.html",revision:"5828d40798e9417788905969659aefad"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"favicon.ico",revision:"4006c49be8c3d9b7cbd692aab2179417"},{url:"apple-touch-icon.png",revision:"520e23c5af169f6ec0b93a3b67bc062c"},{url:"android-chrome-192x192.png",revision:"7705413a7fe767e56041c4fac819b8b3"},{url:"android-chrome-512x512.png",revision:"e9ce091836d5d3632dae647b66e52cb5"},{url:"manifest.webmanifest",revision:"c1f1aada28a195c74a1db0a4d13fa54c"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
