if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,c)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(s[r])return;let t={};const a=e=>i(e,r),o={module:{uri:r},exports:t,require:a};s[r]=Promise.all(n.map((e=>o[e]||a(e)))).then((e=>(c(...e),t)))}}define(["./workbox-7aceb332"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-Bqe-9WVY.css",revision:null},{url:"assets/index-DPYzIBBp.js",revision:null},{url:"index.html",revision:"d7952ad2dfaf162e7ad5348705f7676a"},{url:"registerSW.js",revision:"402b66900e731ca748771b6fc5e7a068"},{url:"vleapi.1.js",revision:"d106868f86bce7baf4fdca980de53806"},{url:"icons/512.png",revision:"55ea314c274bced0e3dee2bc82fadc76"},{url:"icons/sm.png",revision:"60a1f370cf1af01a56f76702a137c9d3"},{url:"manifest.webmanifest",revision:"662d5f7fc561b20fa08f3e7c733c1076"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"))),e.registerRoute((({request:e})=>"document"===e.destination),new e.NetworkFirst({cacheName:"html-cache",plugins:[]}),"GET"),e.registerRoute((({request:e})=>"script"===e.destination||"style"===e.destination),new e.StaleWhileRevalidate({cacheName:"assets-cache",plugins:[]}),"GET"),e.registerRoute((({request:e})=>"image"===e.destination),new e.CacheFirst({cacheName:"image-cache",plugins:[new e.ExpirationPlugin({maxEntries:50,maxAgeSeconds:2592e3})]}),"GET")}));
