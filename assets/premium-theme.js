/* rajivbuda.com — Premium theme behaviour + content fixes v1 */
(function(){
 var D=document,H=D.documentElement,RM=matchMedia('(prefers-reduced-motion: reduce)').matches,FINE=matchMedia('(hover:hover) and (pointer:fine)').matches;
 H.classList.add('pt'); if(!D.getElementById('root'))H.classList.add('pt-static');
 /* --- custom line icons (32 grid, 1.15 stroke, champagne) --- */
 var I={
  compass:'<circle cx="16" cy="16" r="12"/><circle class="d" cx="16" cy="16" r="8.5"/><path d="M20.5 11.5l-2.6 6.4-6.4 2.6 2.6-6.4z"/><circle class="f" cx="16" cy="16" r="1"/>',
  lens:'<circle cx="14" cy="14" r="8"/><path d="M20 20l7 7"/><path class="d" d="M10 14a4 4 0 0 1 4-4"/><path d="M14 4v2M4 14h2"/>',
  facet:'<path d="M16 3l10 9-10 17L6 12z"/><path class="d" d="M6 12h20M11 12l5 17 5-17M11 12l5-9 5 9"/>',
  orbit:'<circle cx="16" cy="16" r="3.2"/><ellipse cx="16" cy="16" rx="13" ry="5.5" transform="rotate(-24 16 16)"/><ellipse class="d" cx="16" cy="16" rx="13" ry="5.5" transform="rotate(36 16 16)"/><circle class="f" cx="27" cy="10.5" r="1.3"/>',
  spark:'<path d="M16 3c1 7 3 9 10 13-7 1-9 3-10 13-1-10-3-12-10-13 7-4 9-6 10-13z"/><path class="d" d="M26 4v4M24 6h4"/>',
  layers:'<path d="M16 5l12 6-12 6-12-6z"/><path d="M4 16l12 6 12-6"/><path class="d" d="M4 21l12 6 12-6"/>',
  rise:'<path d="M4 27h24"/><path d="M6 22l6-6 5 4 9-10"/><path d="M21 10h5v5"/><path class="d" d="M8 27v-3M14 27v-6M20 27v-4M26 27v-9"/>',
  vault:'<rect x="4" y="6" width="24" height="20" rx="2"/><circle cx="16" cy="16" r="5"/><path class="d" d="M16 11v-2M16 23v-2M11 16H9M23 16h-2"/><path d="M4 26v2M28 26v2"/>',
  shield:'<path d="M16 3l11 4v8c0 7-5 11-11 14C10 26 5 22 5 15V7z"/><path d="M11 16l3.5 3.5L21 13"/>',
  node:'<circle cx="16" cy="7" r="3"/><circle cx="7" cy="24" r="3"/><circle cx="25" cy="24" r="3"/><path d="M14.5 9.6L8.5 21.4M17.5 9.6l6 11.8M10 24h12"/><circle class="f" cx="16" cy="18" r="1.2"/>',
  chip:'<rect x="8" y="8" width="16" height="16" rx="2"/><rect class="d" x="12" y="12" width="8" height="8"/><path d="M12 4v4M16 4v4M20 4v4M12 24v4M16 24v4M20 24v4M4 12h4M4 16h4M4 20h4M24 12h4M24 16h4M24 20h4"/>',
  flow:'<rect x="3" y="5" width="9" height="7" rx="1.5"/><rect x="20" y="20" width="9" height="7" rx="1.5"/><path d="M12 8.5h6a4 4 0 0 1 4 4V20"/><path class="d" d="M3 23.5h11"/><circle class="f" cx="22" cy="16" r="1.2"/>',
  data:'<ellipse cx="16" cy="7" rx="10" ry="3.5"/><path d="M6 7v18c0 2 4.5 3.5 10 3.5s10-1.5 10-3.5V7"/><path class="d" d="M6 13c0 2 4.5 3.5 10 3.5S26 15 26 13M6 19c0 2 4.5 3.5 10 3.5S26 21 26 19"/>',
  cloud:'<path d="M9 24a6 6 0 0 1-.5-12A8 8 0 0 1 24 11a6.5 6.5 0 0 1 0 13z"/><circle class="d" cx="16" cy="18" r="3"/><path d="M16 13.5v1.5M16 21v1.5M11.5 18h1.5M19 18h1.5"/>',
  braces:'<path d="M11 5c-3 0-3 2-3 4v3c0 2-1 3-3 4 2 1 3 2 3 4v3c0 2 0 4 3 4M21 5c3 0 3 2 3 4v3c0 2 1 3 3 4-2 1-3 2-3 4v3c0 2 0 4-3 4"/><path class="d" d="M14 20l4-8"/>',
  signal:'<path d="M16 17v12"/><circle class="f" cx="16" cy="15" r="2"/><path d="M11 10a7 7 0 0 0 0 10M21 10a7 7 0 0 1 0 10"/><path class="d" d="M7 6a13 13 0 0 0 0 18M25 6a13 13 0 0 1 0 18"/>',
  people:'<circle cx="12" cy="11" r="4"/><path d="M4 26c0-4.5 3.5-8 8-8s8 3.5 8 8"/><circle class="d" cx="22" cy="10" r="3"/><path class="d" d="M21 17c4 0 7 3 7 7"/>',
  key:'<circle cx="10" cy="16" r="5.5"/><path d="M15.5 16H28M23 16v4M27 16v3"/><circle class="f" cx="10" cy="16" r="1.2"/>',
  crown:'<path d="M5 24l-1-13 7 5 5-9 5 9 7-5-1 13z"/><path class="d" d="M5 28h22"/>',
  quill:'<path d="M26 4C14 6 8 14 6 27c3-6 7-9 13-10-4 0-6-1-7-2 6-1 10-4 14-11z"/><path class="d" d="M6 27l8-9"/>',
  target:'<circle cx="16" cy="16" r="12"/><circle cx="16" cy="16" r="7"/><circle class="f" cx="16" cy="16" r="2"/><path class="d" d="M16 1v6M16 25v6M1 16h6M25 16h6"/>',
  hourglass:'<path d="M8 4h16M8 28h16M10 4c0 7 12 9 12 12s-12 5-12 12M22 4c0 7-12 9-12 12s12 5 12 12"/><path class="d" d="M13 25h6"/>',
  globe:'<circle cx="16" cy="16" r="12"/><ellipse class="d" cx="16" cy="16" rx="5" ry="12"/><path d="M4 16h24M6 10h20M6 22h20"/>',
  scan:'<path d="M4 10V5h5M23 5h5v5M28 22v5h-5M9 27H4v-5"/><path d="M8 16h16"/><circle class="d" cx="16" cy="16" r="5"/>',
  chat:'<path d="M5 7h22v14H14l-6 5v-5H5z"/><path class="d" d="M10 12h12M10 16h8"/>',
  tick:'<path d="M16 3l13 13-13 13L3 16z"/><path d="M11 16l3.5 3.5L21 13"/>',
  bolt:'<path d="M18 3L7 18h8l-2 11 12-16h-8z"/>',
  bridge:'<path d="M3 22h26M6 22V12M26 22V12M6 12c4 6 16 6 20 0"/><path class="d" d="M11 22v-6M16 22v-5M21 22v-6"/>'
 };
 function svg(n){return '<svg class="pt-ico" viewBox="0 0 32 32" aria-hidden="true">'+(I[n]||I.facet)+'</svg>'}
 var LU={'lucide-network':'node','lucide-sparkles':'spark','lucide-check':'tick','lucide-quote':'quill','lucide-brain-circuit':'chip','lucide-workflow':'flow','lucide-database':'data','lucide-shield-check':'shield','lucide-cloud-cog':'cloud','lucide-braces':'braces','lucide-radio-tower':'signal','lucide-layers3':'layers','lucide-users':'people','lucide-radio':'signal','lucide-scan-line':'scan'};
 function swapLucide(root){ [].forEach.call(root.querySelectorAll('svg.lucide:not([data-pt])'),function(s){
   s.setAttribute('data-pt','1'); if(s.closest('.map-core')){s.setAttribute('viewBox','0 0 32 32');s.innerHTML=I.facet;s.classList.add('pt-ico');return} for(var k in LU){ if(s.classList.contains(k)){ s.setAttribute('viewBox','0 0 32 32'); s.innerHTML=I[LU[k]]; s.classList.add('pt-ico'); break; } } }); }
 var GROUPS=[['.principle-card',['compass','chip','rise']],['.capability-card',['chip','braces','flow','data','shield','cloud']],
  ['.playbook-card',['key','compass','people','flow','crown','target']],['.recruiter-points>*',['bridge','layers','spark']],['.talk-list>*',['globe','facet','people']],['.card',['spark','facet','orbit','chat','vault','node','target','layers']],['.step',['data','bolt','chip','scan','tick']]];
 function badges(){ GROUPS.forEach(function(g){ [].forEach.call(D.querySelectorAll(g[0]),function(el,i){ if(el.querySelector(':scope>.pt-badge'))return;
   if(el.matches('.talk-list>*,.recruiter-points>*,.step'))return; var b=D.createElement('span');b.className='pt-badge';b.innerHTML=svg(g[1][i%g[1].length]);el.insertBefore(b,el.firstChild);});});
  [].forEach.call(D.querySelectorAll('.project-art'),function(a,i){ if(a.querySelector('.pt-art'))return; var ART=['spark','orbit','node','layers','scan','target']; var w=D.createElement('span');w.className='pt-art';w.innerHTML=svg(ART[i%6]);a.appendChild(w); });
  var PI=['vault','globe','rise','shield','target','people'];
  [].forEach.call(D.querySelectorAll('.proof-stat'),function(el,i){ if(el.querySelector('.pt-badge-sm'))return; var b=D.createElement('span');b.className='pt-badge-sm';b.innerHTML=svg(el.classList.contains('pt-feature')?'vault':PI[(i+1)%PI.length]);el.insertBefore(b,el.firstChild);}); }
 /* --- content fixes (mutate text nodes in place so React keeps ownership) --- */
 function walk(root,fn){var w=D.createTreeWalker(root,NodeFilter.SHOW_TEXT),n;while(n=w.nextNode())fn(n)}
 function fixText(){
  [].forEach.call(D.querySelectorAll('.proof-stat'),function(el){ var s=el.querySelector('strong'); if(!s||el.classList.contains('pt-feature'))return;
   if(/\$\s*1\.[0-9]/.test(s.textContent)){ el.classList.add('pt-feature');
    walk(s,function(n){ n.nodeValue=n.nodeValue.replace(/\$\s*1\.[0-9]+/,'$5').replace(/^M\+$/,'B+').replace(/million/i,'B'); });
    var lab=[].filter.call(el.children,function(c){return c.tagName==='SPAN'&&!c.classList.contains('pt-badge-sm')})[0];
    if(lab){ var done=false; walk(lab,function(n){ if(!done&&n.nodeValue.trim()){n.nodeValue='Portfolio managed · Microsoft';done=true}else if(done)n.nodeValue=''; });
     if(!el.querySelector('.pt-sub')){var sub=D.createElement('small');sub.className='pt-sub';sub.textContent='ByteDance ~$3.5B · Temu ~$2B · BHP Australia';lab.after(sub);} }
    if(el.parentNode.firstElementChild!==el) el.parentNode.insertBefore(el,el.parentNode.firstElementChild); /* lead with it */
   } }); }
 /* --- colour classification: neutralise old light/saturated palette --- */
 function rgb(s){var m=s&&s.match(/rgba?\(([^)]+)\)/);if(!m)return null;var p=m[1].split(/[ ,\/]+/).map(parseFloat);return{r:p[0],g:p[1],b:p[2],a:p.length>3?p[3]:1}}
 function lum(c){return (0.2126*c.r+0.7152*c.g+0.0722*c.b)/255}
 function sat(c){var mx=Math.max(c.r,c.g,c.b),mn=Math.min(c.r,c.g,c.b);return mx?(mx-mn)/mx:0}
 var SKIP='.hero-media,.media-frame,video,img,svg,.pt-badge,.pt-badge-sm,.button-primary,.btn-solid,.button-dark,.thesis-cta,.enterprise-logos,pre,code';
 function classify(root){ var els=(root||D.body).querySelectorAll('*:not([data-ptc])');
  for(var i=0;i<els.length;i++){var e=els[i]; e.setAttribute('data-ptc','1'); if(e.closest(SKIP)||e.namespaceURI!=='http://www.w3.org/1999/xhtml')continue;
   var cs=getComputedStyle(e),bg=rgb(cs.backgroundColor),fg=rgb(cs.color),bc=rgb(cs.borderTopColor);
   if(cs.webkitBackgroundClip==='text'||cs.backgroundClip==='text'){e.classList.add('pt-gt');continue}
   if(bg&&bg.a>.35){ if(lum(bg)>.5)e.classList.add('pt-lb'); else if(sat(bg)>.4&&lum(bg)>.2)e.classList.add('pt-sb'); }
   if(cs.backgroundImage.indexOf('gradient')>-1&&!e.matches('.tlx-line b,.tlx-line,.kicker-rule,.eyebrow-line,.caption-rule,.hero-footer-line,.timeline-copy'))e.classList.add('pt-gb');
   if(fg&&fg.a>.2){ if(lum(fg)<.4&&sat(fg)<.5)e.classList.add('pt-dt'); else if(sat(fg)>.35)e.classList.add('pt-at'); }
   if(bc&&parseFloat(cs.borderTopWidth)>0&&(lum(bc)<.3||sat(bc)>.35))e.classList.add('pt-bd'); } }
 /* --- motion --- */
 var io='IntersectionObserver' in window&&!RM?new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add('pt-in');io.unobserve(x.target);if(x.target.classList.contains('proof-stat'))count(x.target)}})},{threshold:.15,rootMargin:'0px 0px -6% 0px'}):null;
 function reveal(){ if(!io){[].forEach.call(D.querySelectorAll('.proof-stat'),function(){});return}
  [].forEach.call(D.querySelectorAll('.principle-card,.project-card,.proof-stat,.capability-card,.playbook-card,.bento-card,.stack-row,.card,.step,.talk-list>*'),function(el){ if(el.dataset.ptr)return; el.dataset.ptr=1;
   var r=el.getBoundingClientRect(); if(r.top<innerHeight*.9)return; var sib=[].indexOf.call(el.parentNode.children,el); el.style.setProperty('--d',(sib%4)*0.09+'s'); el.classList.add('pt-rv'); io.observe(el); }); }
 function count(el){ var s=el.querySelector('strong'); if(!s||RM)return; var t=null; walk(s,function(n){if(!t&&/\d/.test(n.nodeValue))t=n}); if(!t)return;
  var m=t.nodeValue.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/); if(!m)return; var end=parseFloat(m[2]),dec=(m[2].split('.')[1]||'').length,t0=performance.now();
  (function f(now){var p=Math.min(1,(now-t0)/1400),e=1-Math.pow(1-p,3);t.nodeValue=m[1]+(end*e).toFixed(dec)+m[3];if(p<1)requestAnimationFrame(f)})(t0); }
 function interact(){ if(!FINE||RM)return;
  if(!D.querySelector('.pt-spot')){var sp=D.createElement('div');sp.className='pt-spot';D.body.appendChild(sp);
   addEventListener('pointermove',function(e){sp.style.setProperty('--x',e.clientX+'px');sp.style.setProperty('--y',e.clientY+'px')},{passive:true});}
  [].forEach.call(D.querySelectorAll('.button,.btn,.social-link,.nav-availability,.thesis-cta'),function(b){ if(b.dataset.ptm)return;b.dataset.ptm=1;b.classList.add('pt-mag');
   b.addEventListener('pointermove',function(e){var r=b.getBoundingClientRect();b.style.transform='translate('+((e.clientX-r.left)/r.width-.5)*10+'px,'+((e.clientY-r.top)/r.height-.5)*8+'px)'});
   b.addEventListener('pointerleave',function(){b.style.transform=''}); });
  [].forEach.call(D.querySelectorAll('.principle-card,.project-card,.capability-card,.playbook-card,.bento-card,.proof-stat,.card'),function(c){ if(c.dataset.ptg)return;c.dataset.ptg=1;c.classList.add('pt-glow');
   c.addEventListener('pointermove',function(e){var r=c.getBoundingClientRect();c.style.setProperty('--cx',e.clientX-r.left+'px');c.style.setProperty('--cy',e.clientY-r.top+'px')}); }); }
 var busy=0; function run(){ busy=1; try{fixText();swapLucide(D.body);badges();classify();reveal();interact();}catch(e){console.warn('pt',e)} setTimeout(function(){busy=0},0) }
 function start(){ run(); var t; new MutationObserver(function(){ if(busy)return; clearTimeout(t); t=setTimeout(run,120) }).observe(D.body,{childList:true,subtree:true,characterData:true}); setTimeout(run,800); setTimeout(run,2500); }
 if(D.readyState==='loading')D.addEventListener('DOMContentLoaded',start);else start();
})();
