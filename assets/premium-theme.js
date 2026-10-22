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
/* ===== premium v2: brand colours, project artwork, living visuals ===== */
(function(){
 var D=document,H=D.documentElement,RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
 var DOL='<svg viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="ptdg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#bffcf5"/><stop offset=".45" stop-color="#3fe0d2"/><stop offset="1" stop-color="#7b6bff"/></linearGradient><linearGradient id="ptwg" x2="1"><stop offset="0" stop-color="#2ee6d6" stop-opacity=".0"/><stop offset=".5" stop-color="#2ee6d6" stop-opacity=".9"/><stop offset="1" stop-color="#8b5cff" stop-opacity=".0"/></linearGradient></defs>'
  +'<g transform="translate(-34 -22) rotate(-10 238 140)"><g class="dol"><path fill="url(#ptdg)" d="M96 150L118 141Q124 122 148 116C186 100 214 96 236 98Q250 80 272 70Q264 86 276 106C298 112 314 122 330 138L346 118Q352 134 348 146Q366 150 380 160Q356 162 338 154C318 156 296 152 272 150C246 150 220 152 196 154Q182 170 160 182Q170 166 168 156C148 158 128 158 112 156Z"/><circle cx="136" cy="134" r="3" fill="#04121c"/><path d="M122 147C160 150 220 146 300 146" stroke="#e8fffc" stroke-opacity=".45" stroke-width="2" fill="none"/></g></g>'
  +'<g class="wv"><path fill="none" stroke="url(#ptwg)" stroke-width="3" d="M0 168q25-14 50 0t50 0 50 0 50 0 50 0 50 0 50 0 50 0 50 0 50 0 50 0 50 0 50 0"/></g>'
  +'<g class="wv b" opacity=".6"><path fill="none" stroke="#8b5cff" stroke-width="2" d="M0 184q25 10 50 0t50 0 50 0 50 0 50 0 50 0 50 0 50 0 50 0 50 0 50 0 50 0 50 0"/></g>'
  +'<circle class="bub" cx="300" cy="150" r="3" fill="none" stroke="#bffcf5"/><circle class="bub" cx="316" cy="160" r="2" fill="none" stroke="#bffcf5"/><circle class="bub" cx="292" cy="170" r="2.5" fill="none" stroke="#c9b6ff"/></svg>';
 function mark(e){e.setAttribute('data-ptc','1');[].forEach.call(e.querySelectorAll('*'),function(x){x.setAttribute('data-ptc','1')});return e}
 function ira(){var e=D.createElement('span');e.className='pt-ira';e.innerHTML='<span class="ig"></span>'+DOL+'<span class="sh"></span>';return mark(e)}
 function projects(){
  [].forEach.call(D.querySelectorAll('.project-card.blue .project-art'),function(a){if(!a.querySelector('.pt-ira'))a.appendChild(ira())});
  [].forEach.call(D.querySelectorAll('article.card'),function(c){var h=c.querySelector('h3');if(!h||c.querySelector('.pt-plogo'))return;var t=h.textContent.trim(),el;
   if(/^HireOnAI$/i.test(t)){el=D.createElement('span');el.className='pt-plogo hire'}
   else if(/^IRA[- ]Dolphin$/i.test(t)){el=D.createElement('span');el.className='pt-plogo ira';el.appendChild(ira());c.classList.add('pt-ira-card')}
   if(el)c.insertBefore(mark(el),c.firstChild)});
  if(/\/projects\/ira-dolphin/.test(location.pathname)){H.classList.add('pt-ira-page');var w=D.querySelector('header.hero .wrap');
   if(w&&!w.querySelector('.pt-ira-hero')){var x=D.createElement('div');x.className='pt-ira-hero';mark(x);x.appendChild(ira());var k=w.querySelector('h1');k&&k.nextElementSibling?w.insertBefore(x,k.nextElementSibling.nextElementSibling):w.appendChild(x)}}
 }
 /* brand colours */
 var BR=[[/^Microsoft/,'ms'],[/^McAfee/,'mc'],[/^Accenture|^accenture/,'ac'],[/^Reliance/,'rl'],[/^ByteDance/,'bd'],[/^Temu/,'tm'],[/^BHP/,'bh'],[/^Telstra/,'ts'],[/^ANZ\b/,'anz']];
 function brandOf(t){t=t.trim();for(var i=0;i<BR.length;i++)if(BR[i][0].test(t))return BR[i][1]}
 function brands(){
  [].forEach.call(D.querySelectorAll('.enterprise-logo,#experience span,#experience strong,.timeline-copy span,.timeline-copy strong,.tlx-hl span,.tlx-hl div,.proof-stat span'),function(e){
   if(e.classList.contains('pt-br')||e.dataset.ptbw)return;var bb=e.querySelector(':scope>b');
   if(bb&&e.children.length===1){var tn=[].filter.call(e.childNodes,function(n){return n.nodeType===3&&n.nodeValue.trim()})[0];var k=tn&&brandOf(tn.nodeValue);if(k){e.dataset.ptbw=1;var w=D.createElement('span');w.className='pt-br pt-br-'+k+' pt-br-in';w.setAttribute('data-ptc','1');tn.parentNode.insertBefore(w,tn);w.appendChild(tn);e.style.setProperty('--bc2',getComputedStyle(w).color);e.classList.add('pt-br-chip')}return}
   if(e.children.length>1)return;var b=brandOf(e.textContent);if(b)e.classList.add('pt-br','pt-br-'+b)});
  [].forEach.call(D.querySelectorAll('.pt-sub:not([data-ptb])'),function(s){s.dataset.ptb=1;var parts=s.textContent.split(' · ');s.textContent='';
   parts.forEach(function(p,i){var m=p.match(/^(\S+)(.*)$/),sp=D.createElement('span');sp.textContent=p;var b=brandOf(p);if(b)sp.className='pt-br pt-br-'+b;s.appendChild(sp);if(i<parts.length-1)s.appendChild(D.createTextNode(' '))})});
 }
 /* shared helpers */
 function mkCanvas(host){var c=D.createElement('canvas');c.className='pt-cv';c.setAttribute('data-ptc','1');host.appendChild(c);return c}
 function fit(c){var r=c.getBoundingClientRect(),d=Math.min(2,devicePixelRatio||1);if(c.width!==Math.round(r.width*d)||c.height!==Math.round(r.height*d)){c.width=Math.round(r.width*d);c.height=Math.round(r.height*d)}return{w:r.width,h:r.height,d:d,r:r}}
 var sprite=(function(){var s=D.createElement('canvas');s.width=s.height=32;var g=s.getContext('2d'),gr=g.createRadialGradient(16,16,0,16,16,16);gr.addColorStop(0,'rgba(255,248,225,1)');gr.addColorStop(.25,'rgba(241,210,140,.85)');gr.addColorStop(1,'rgba(241,210,140,0)');g.fillStyle=gr;g.fillRect(0,0,32,32);return s})();
 var spriteT=(function(){var s=D.createElement('canvas');s.width=s.height=32;var g=s.getContext('2d'),gr=g.createRadialGradient(16,16,0,16,16,16);gr.addColorStop(0,'rgba(230,255,252,1)');gr.addColorStop(.25,'rgba(95,246,230,.85)');gr.addColorStop(1,'rgba(95,246,230,0)');g.fillStyle=gr;g.fillRect(0,0,32,32);return s})();
 function loop(host,draw){var on=false,raf=0,t0=0;function f(n){if(!t0)t0=n;draw((n-t0)/1000);if(on&&!RM)raf=requestAnimationFrame(f)}
  if(RM){setTimeout(function(){draw(99)},50);addEventListener('resize',function(){draw(99)});return}
  new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting&&!on){on=true;raf=requestAnimationFrame(f)}else if(!x.isIntersecting){on=false;cancelAnimationFrame(raf)}})},{rootMargin:'60px'}).observe(host)}
 function ease(x){x=Math.max(0,Math.min(1,x));return 1-Math.pow(1-x,3)}
 function flow(g,ax,ay,bx,by,n,t,speed,spr,size,bend){var mx=(ax+bx)/2,my=(ay+by)/2,dx=bx-ax,dy=by-ay,cx=mx-dy*bend,cy=my+dx*bend;
  for(var k=0;k<n;k++){var u=((t*speed+k/n)%1),v=1-u,x=v*v*ax+2*v*u*cx+u*u*bx,y=v*v*ay+2*v*u*cy+u*u*by,a=Math.sin(Math.PI*u);g.globalAlpha=a;var s=size*(.6+a*.6);g.drawImage(spr,x-s,y-s,s*2,s*2)}g.globalAlpha=1}
 /* THE STACK */
 var STC=[['rgba(241,220,170,','#f1dcaa'],['rgba(230,170,90,','#e6aa5a'],['rgba(95,246,230,','#5ff6e6']];
 function stack(){[].forEach.call(D.querySelectorAll('.stack-graphic:not(.pt-live-on)'),function(sg){
  var sp=[].slice.call(sg.querySelectorAll(':scope>span')),core=sg.querySelector(':scope>b');if(sp.length<3||!core)return;sg.classList.add('pt-live-on');
  var r1=mark(D.createElement('i'));r1.className='pt-ring';var r2=mark(D.createElement('i'));r2.className='pt-ring o2';core.appendChild(r1);core.appendChild(r2);
  var cv=mkCanvas(sg),g=cv.getContext('2d'),seen=-1,manual=-1,mt=0,geo=null;
  function measure(){var f=fit(cv),o=f.r;geo={f:f,n:sp.map(function(s){s.style.transform='';var r=s.getBoundingClientRect();return{x:r.left-o.left+r.width/2,y:r.top-o.top+r.height/2,rx:r.width/2,ry:r.height/2}}),c:(function(){var r=core.getBoundingClientRect();return{x:r.left-o.left+r.width/2,y:r.top-o.top+r.height/2,r:r.width/2}})()}}
  addEventListener('resize',function(){geo=null});
  function pick(e){var r=sg.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top,b=0,bd=1e9;if(!geo)return;geo.n.forEach(function(n,i){var d=Math.hypot(n.x-x,n.y-y);if(d<bd){bd=d;b=i}});manual=b;mt=performance.now()}
  sg.addEventListener('pointerdown',pick);sg.addEventListener('pointermove',function(e){if(e.pointerType==='mouse')pick(e)});
  new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting&&seen<0)seen=performance.now()})},{threshold:.3}).observe(sg);
  loop(sg,function(t){if(!geo)measure();var f=geo.f;g.setTransform(f.d,0,0,f.d,0,0);g.clearRect(0,0,f.w,f.h);
   var now=performance.now(),p=RM?1:(seen<0?0:(now-seen)/1000),act=(manual>=0&&now-mt<4000)?manual:Math.floor(t/1.6)%3;
   g.globalCompositeOperation='lighter';
   geo.n.forEach(function(n,i){var pr=RM?1:ease((p-.15*i)/1.4),br=RM?0:Math.sin(t*1.3+i*2.1),ox=RM?0:Math.cos(t*.7+i*2)*5,oy=RM?0:Math.sin(t*.9+i*1.7)*4,on=i===act;
    var x=n.x+ox,y=n.y+oy,rx=n.rx*(1+br*.04)+6,ry=n.ry*(1+br*.04)+6;sp[i].style.transform='translate('+ox.toFixed(1)+'px,'+oy.toFixed(1)+'px)';sp[i].classList.toggle('pt-on',on&&pr>.9);
    var gr=g.createRadialGradient(x,y,0,x,y,Math.max(rx,ry));gr.addColorStop(0,STC[i][0]+(on?.16:.07)*pr+')');gr.addColorStop(1,STC[i][0]+'0)');g.fillStyle=gr;g.beginPath();g.ellipse(x,y,rx,ry,0,0,Math.PI*2);g.fill();
    g.lineWidth=on?2:1.2;g.strokeStyle=STC[i][0]+(on?.95:.55)+')';g.beginPath();var st=-Math.PI/2+t*.15;g.ellipse(x,y,rx,ry,0,st,st+Math.PI*2*pr);g.stroke();
    if(pr>0&&pr<1){var a=st+Math.PI*2*pr;g.drawImage(sprite,x+Math.cos(a)*rx-8,y+Math.sin(a)*ry-8,16,16)}
    if(!RM&&pr>.6){var c=geo.c;flow(g,x,y,c.x,c.y,on?7:4,t,on?.55:.32,i===2?spriteT:sprite,on?4.5:3,.18*(i%2?1:-1));
     var a2=t*(on?1.2:.6)+i*2;g.drawImage(i===2?spriteT:sprite,x+Math.cos(a2)*rx-5,y+Math.sin(a2)*ry-5,10,10)}
   });g.globalCompositeOperation='source-over';
  })})}
 /* CURRENT SIGNAL */
 function signal(){[].forEach.call(D.querySelectorAll('.signal-bars:not(.pt-live-on)'),function(sb){
  var bars=[].map.call(sb.querySelectorAll('i'),function(i){return parseFloat(i.style.height)/100||.5});if(!bars.length)return;sb.classList.add('pt-live-on');
  var card=sb.closest('.bento-card');if(card&&!card.querySelector('.pt-livetag')){var lt=D.createElement('span');lt.className='pt-livetag';lt.innerHTML='<i></i>LIVE <em></em>';mark(lt);card.appendChild(lt);var em=lt.querySelector('em'),z=function(n){return(n<10?'0':'')+n};
   (function tick(){var d=new Date();em.textContent=z(d.getHours())+':'+z(d.getMinutes())+':'+z(d.getSeconds());setTimeout(tick,1000-d.getMilliseconds())})()}
  var cv=mkCanvas(sb),g=cv.getContext('2d'),seen=-1,f=null;addEventListener('resize',function(){f=null});
  new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting&&seen<0)seen=performance.now()})},{threshold:.4}).observe(sb);
  function val(i,t){var b=bars[i];if(RM)return b;return Math.max(.08,Math.min(1,b*(.78+.22*Math.sin(t*2.1+i*1.3))+.12*Math.sin(t*3.7+i*2.9)*Math.sin(t*.9+i)))}
  function line(x,t){return .5+.22*Math.sin(x*.045-t*1.6)+.12*Math.sin(x*.11-t*2.7+1)+.07*Math.sin(x*.023+t*.8)}
  loop(sb,function(t){if(!f)f=fit(cv);var W=f.w,Hh=f.h;g.setTransform(f.d,0,0,f.d,0,0);g.clearRect(0,0,W,Hh);
   var p=RM?9:(seen<0?0:(performance.now()-seen)/1000),n=bars.length,gap=Math.max(4,W*.018),bw=(W-gap*(n-1))/n;
   for(var i=0;i<n;i++){var gr=ease((p-i*.06)/.9),h=val(i,t)*Hh*.92*gr,x=i*(bw+gap),y=Hh-h;
    var lg=g.createLinearGradient(0,y,0,Hh);lg.addColorStop(0,'rgba(255,236,190,.95)');lg.addColorStop(.12,'rgba(228,184,108,.75)');lg.addColorStop(1,'rgba(120,88,40,.12)');g.fillStyle=lg;
    g.beginPath();g.roundRect?g.roundRect(x,y,bw,h,[Math.min(6,bw/2),Math.min(6,bw/2),1,1]):g.rect(x,y,bw,h);g.fill();
    g.fillStyle='rgba(255,246,220,'+(.5+.5*gr)+')';g.fillRect(x+1,y,bw-2,1.5)}
   var lp=ease((p-.5)/1.2);if(lp>0){var X=W*lp;g.save();g.beginPath();g.rect(0,0,X,Hh);g.clip();
    g.beginPath();for(var x=0;x<=W;x+=4){var y=Hh*(1-line(x,t)*.85);x?g.lineTo(x,y):g.moveTo(x,y)}
    var sg=g.createLinearGradient(0,0,W,0);sg.addColorStop(0,'rgba(95,246,230,.1)');sg.addColorStop(.6,'rgba(95,246,230,.9)');sg.addColorStop(1,'rgba(255,240,200,1)');
    g.strokeStyle='rgba(95,246,230,.18)';g.lineWidth=7;g.stroke();g.strokeStyle=sg;g.lineWidth=2;g.stroke();g.restore();
    var hx=RM?W*.7:(t*.18%1)*W,hy=Hh*(1-line(hx,t)*.85);g.globalCompositeOperation='lighter';g.drawImage(spriteT,hx-12,hy-12,24,24);g.globalCompositeOperation='source-over';
    g.fillStyle='rgba(95,246,230,.25)';g.fillRect(hx,0,1,Hh)}
  })})}
 /* TECHNOLOGY map: particles flowing nodes -> core */
 function techmap(){[].forEach.call(D.querySelectorAll('.signal-map:not(.pt-live-on)'),function(m){var core=m.querySelector('.map-core');var nodes=[].slice.call(m.querySelectorAll('.signal-node .node-dot'));if(!core||!nodes.length)return;m.classList.add('pt-live-on');
  var r1=mark(D.createElement('i'));r1.className='pt-ring';var r2=mark(D.createElement('i'));r2.className='pt-ring o2';core.appendChild(r1);core.appendChild(r2);
  var cv=mkCanvas(m);cv.style.zIndex=3;var g=cv.getContext('2d');
  loop(m,function(t){var f=fit(cv),o=f.r;g.setTransform(f.d,0,0,f.d,0,0);g.clearRect(0,0,f.w,f.h);var sx=f.w/o.width||1,cr=core.getBoundingClientRect(),cx=cr.left-o.left+cr.width/2,cy=cr.top-o.top+cr.height/2;g.globalCompositeOperation='lighter';
   nodes.forEach(function(nd,i){var r=nd.getBoundingClientRect(),x=r.left-o.left+r.width/2,y=r.top-o.top+r.height/2,on=Math.floor(t/1.4)%nodes.length===i;
    g.strokeStyle='rgba(217,184,120,'+(on?.35:.12)+')';g.lineWidth=1;g.setLineDash([2,6]);g.lineDashOffset=-t*20;g.beginPath();g.moveTo(x,y);g.lineTo(cx,cy);g.stroke();g.setLineDash([]);
    if(!RM)flow(g,x,y,cx,cy,on?8:4,t,on?.5:.28,i%2?spriteT:sprite,on?5:3.5,.12*(i%2?1:-1))});g.globalCompositeOperation='source-over'})})}
 var busy=0;function run(){busy=1;try{projects();brands();stack();signal();techmap()}catch(e){console.warn('pt2',e)}setTimeout(function(){busy=0},0)}
 function start(){run();var t;new MutationObserver(function(){if(busy)return;clearTimeout(t);t=setTimeout(run,150)}).observe(D.body,{childList:true,subtree:true});setTimeout(run,900);setTimeout(run,2600)}
 if(D.readyState==='loading')D.addEventListener('DOMContentLoaded',start);else start();
})();
/* v3: unique colourful artwork per project */
(function(){
 var D=document;
 var P={
  brief:['#04201a','#0a5a4a','#0b5f73','#06223a','rgba(52,230,160,.55)','rgba(34,211,238,.45)','#a7ffd9','#22d3ee',
   '<g class="rot" style="transform-origin:250px 110px"><circle cx="250" cy="110" r="58" fill="none" stroke="url(#G)" stroke-width="3" stroke-dasharray="6 8"/><path d="M250 60l10 50-10 50-10-50z" fill="url(#G)"/></g><rect x="120" y="50" width="96" height="124" rx="10" fill="rgba(4,32,26,.55)" stroke="url(#G)" stroke-width="3"/><g class="ln"><path d="M138 82h60M138 102h48M138 122h60M138 142h36" stroke="#a7ffd9" stroke-width="5" stroke-linecap="round"/></g><circle class="pl" cx="250" cy="110" r="7" fill="#eafff7"/>'],
  loops:['#2a0716','#7a1442','#8a1a6e','#2a0a3a','rgba(255,107,107,.55)','rgba(232,62,190,.5)','#ffb199','#ff4fd8',
   '<g class="wv"><path d="M0 90q25-30 50 0t50 0 50 0 50 0 50 0 50 0 50 0 50 0 50 0 50 0 50 0 50 0 50 0" fill="none" stroke="url(#G)" stroke-width="5"/></g><g class="wv b"><path d="M0 120q25 30 50 0t50 0 50 0 50 0 50 0 50 0 50 0 50 0 50 0 50 0 50 0 50 0 50 0" fill="none" stroke="#ffb199" stroke-width="3" opacity=".8"/></g><g class="rot" style="transform-origin:200px 105px"><ellipse cx="200" cy="105" rx="70" ry="34" fill="none" stroke="#ff4fd8" stroke-width="2.5" opacity=".7"/><circle cx="270" cy="105" r="7" fill="#fff0f6"/></g>'],
  pattern:['#0a0b2e','#1e1b6b','#123a9e','#0a1440','rgba(99,102,241,.6)','rgba(56,189,248,.5)','#c7d2fe','#38bdf8',
   '<g fill="none" stroke="url(#G)" stroke-width="2.5" opacity=".9"><path d="M120 70L200 110L120 150M200 110L280 60M200 110L280 160M280 60L280 160"/></g><g><circle class="pl" cx="120" cy="70" r="9" fill="#c7d2fe"/><circle class="pl d1" cx="120" cy="150" r="9" fill="#818cf8"/><circle class="pl d2" cx="280" cy="60" r="9" fill="#38bdf8"/><circle class="pl d1" cx="280" cy="160" r="9" fill="#a5f3fc"/><circle cx="200" cy="110" r="22" fill="#0a0b2e" stroke="#38bdf8" stroke-width="3"/><circle cx="200" cy="110" r="8" fill="#e0f2fe" class="pl"/></g>'],
  next:['#1d0a26','#5b1a6b','#a3245e','#2b0f1f','rgba(244,114,182,.55)','rgba(251,191,36,.45)','#fde68a','#f472b6',
   '<g class="rot" style="transform-origin:200px 110px"><path d="M200 50c4 34 12 50 46 60-34 10-42 26-46 60-4-34-12-50-46-60 34-10 42-26 46-60z" fill="url(#G)"/></g><circle class="pl" cx="290" cy="64" r="6" fill="#fde68a"/><circle class="pl d1" cx="118" cy="150" r="5" fill="#f9a8d4"/><circle class="pl d2" cx="300" cy="160" r="4" fill="#fff"/>'],
  cat:['#2a1604','#7a4a0a','#0d6b66','#062a2a','rgba(251,191,36,.55)','rgba(20,184,166,.5)','#fde68a','#2dd4bf',
   '<g class="rip"><ellipse cx="200" cy="170" rx="60" ry="12" fill="none" stroke="#2dd4bf" stroke-width="2.5"/></g><g class="rip d1"><ellipse cx="200" cy="170" rx="60" ry="12" fill="none" stroke="#5eead4" stroke-width="2"/></g><g class="dol"><ellipse cx="200" cy="118" rx="34" ry="28" fill="url(#G)"/><ellipse cx="160" cy="78" rx="13" ry="17" fill="url(#G)"/><ellipse cx="187" cy="62" rx="13" ry="17" fill="url(#G)"/><ellipse cx="214" cy="62" rx="13" ry="17" fill="url(#G)"/><ellipse cx="240" cy="78" rx="13" ry="17" fill="url(#G)"/></g>'],
  vk:['#04122e','#0a3a8a','#0077ff','#061a40','rgba(0,119,255,.6)','rgba(96,165,250,.45)','#bfdbfe','#0077ff',
   '<g class="wv"><g fill="#93c5fd"><circle cx="20" cy="70" r="4"/><circle cx="70" cy="70" r="4"/><circle cx="120" cy="70" r="4"/><circle cx="170" cy="70" r="4"/><circle cx="220" cy="70" r="4"/><circle cx="270" cy="70" r="4"/><circle cx="320" cy="70" r="4"/><circle cx="370" cy="70" r="4"/><circle cx="420" cy="70" r="4"/><circle cx="470" cy="70" r="4"/><circle cx="520" cy="70" r="4"/><circle cx="570" cy="70" r="4"/></g></g><g class="wv b"><g fill="#60a5fa"><circle cx="45" cy="150" r="3"/><circle cx="95" cy="150" r="3"/><circle cx="145" cy="150" r="3"/><circle cx="195" cy="150" r="3"/><circle cx="245" cy="150" r="3"/><circle cx="295" cy="150" r="3"/><circle cx="345" cy="150" r="3"/><circle cx="395" cy="150" r="3"/><circle cx="445" cy="150" r="3"/><circle cx="495" cy="150" r="3"/><circle cx="545" cy="150" r="3"/><circle cx="595" cy="150" r="3"/></g></g><rect x="160" y="82" width="80" height="56" rx="16" fill="#0077ff" stroke="#bfdbfe" stroke-width="2"/><path d="M178 98h9c1 10 5 16 9 17V98h8v10c4 0 8-6 9-10h8c-1 6-6 12-10 14 4 2 9 6 11 12h-9c-2-5-5-8-9-8v8h-2c-14 0-22-10-24-26z" fill="#fff"/>']
 };
 function art(k){var p=P[k],e=D.createElement('span');e.className='pt-ira pt-art3';
  e.style.background='linear-gradient(135deg,'+p[0]+' 0%,'+p[1]+' 38%,'+p[2]+' 70%,'+p[3]+' 100%)';
  var id='g'+k+Math.random().toString(36).slice(2,6);
  e.innerHTML='<span class="ig" style="background:conic-gradient(from 0deg,'+p[4]+','+p[5]+','+p[4]+')"></span><svg viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="'+id+'" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="'+p[6]+'"/><stop offset="1" stop-color="'+p[7]+'"/></linearGradient></defs>'+p[8].replace(/url\(#G\)/g,'url(#'+id+')')+'</svg><span class="sh"></span>';
  e.setAttribute('data-ptc','1');[].forEach.call(e.querySelectorAll('*'),function(x){x.setAttribute('data-ptc','1')});return e}
 var HOME={lime:'cat',violet:'vk',sand:'pattern'},PG={'Account Decision Brief':'brief','Fishing Cat AI':'cat','VK Public Posts Fetcher':'vk'};
 var BC={brief:'#34e6a0',loops:'#ff5fa8',pattern:'#6f7cff',next:'#f472b6',cat:'#fbbf24',vk:'#3b8cff'};
 
 var COLAB='https://colab.research.google.com/github/maxrajiv-buda/maxrajiv-buda.github.io/blob/main/projects/AI-Projects.ipynb';
 var REP={lime:['03','CUSTOM ASSISTANT','Fishing Cat AI',"A small custom assistant named after the fishing cat, Odisha's state animal. Llama-3.2-1B-Instruct in 4-bit, LoRA-trained on a hand-written set of 219 instruction/answer pairs.",['Python','Unsloth','Llama-3.2-1B','TRL SFTTrainer','Google Drive'],COLAB],
  violet:['04','DATA UTILITY','VK Public Posts Fetcher','A data-collection utility that pulls recent public wall posts from a VK community through the official API, with the token kept in a Colab secret.',['Python','vk_api','requests','BeautifulSoup'],COLAB],
  sand:['05','AI PROJECTS','View all AI projects','Five projects: a live career product, two LoRA fine-tunes, a data-collection tool and an account decision brief. The three notebook projects run from a single Colab notebook.',['HireOnAI','IRA Dolphin','Fishing Cat AI','VK Fetcher'],'/projects/']};
 function setText(el,txt){if(!el)return;var done=false;[].forEach.call(el.childNodes,function(n){if(n.nodeType===3){if(!done&&n.nodeValue.trim()){n.nodeValue=txt;done=true}else if(done)n.nodeValue=''}});if(!done)el.insertBefore(D.createTextNode(txt),el.firstChild)}
 function replaceHome(){for(var tone in REP){var c=D.querySelector('.project-card.'+tone);if(!c||c.dataset.pt3r)continue;var r=REP[tone];c.dataset.pt3r=1;
   var top=c.querySelectorAll('.project-top span');setText(top[0],r[0]);setText(top[1],r[1]);setText(c.querySelector('h3'),r[2]);setText(c.querySelector('.project-body p'),r[3]);
   var tr=c.querySelector('.tag-row');if(tr){var sp=tr.querySelectorAll('span');r[4].forEach(function(t,i){var s=sp[i];if(!s){s=D.createElement('span');s.setAttribute('data-ptc','1');tr.appendChild(s)}setText(s,t)})}
   c.setAttribute('href',r[5]);if(r[5].indexOf('http')===0){c.target='_blank';c.rel='noreferrer'}else{c.removeAttribute('target');c.removeAttribute('rel')}}
  var ink=D.querySelector('.project-card.ink');if(ink)ink.style.display='none';}
 function run(){replaceHome();
  for(var t in HOME)[].forEach.call(D.querySelectorAll('.project-card.'+t+' .project-art'),function(a){if(a.querySelector('.pt-art3'))return;a.appendChild(art(HOME[t]));a.classList.add('pt-has3');a.closest('.project-card').style.setProperty('--pc',BC[HOME[t]]);a.closest('.project-card').classList.add('pt-c3')});
  [].forEach.call(D.querySelectorAll('article.card'),function(c){var h=c.querySelector('h3'),k=h&&PG[h.textContent.trim()];if(!k||c.querySelector('.pt-plogo'))return;var el=D.createElement('span');el.className='pt-plogo p3';el.setAttribute('data-ptc','1');el.appendChild(art(k));c.insertBefore(el,c.firstChild);c.style.setProperty('--pc',BC[k]);c.classList.add('pt-c3')});
 }
 var t;function go(){run();new MutationObserver(function(){clearTimeout(t);t=setTimeout(run,200)}).observe(D.body,{childList:true,subtree:true});setTimeout(run,1000);setTimeout(run,2700)}
 if(D.readyState==='loading')D.addEventListener('DOMContentLoaded',go);else go();
})();
/* v3: model name correction */
(function(){var D=document;function fix(){var w=D.createTreeWalker(D.body,NodeFilter.SHOW_TEXT),n;while(n=w.nextNode())if(n.nodeValue.indexOf('Qwen3-4B')>-1)n.nodeValue=n.nodeValue.replace(/Qwen3-4B/g,'Qwen2.5-3B')}
function go(){fix();var t;new MutationObserver(function(){clearTimeout(t);t=setTimeout(fix,100)}).observe(D.body,{childList:true,subtree:true,characterData:true})}
if(D.readyState==='loading')D.addEventListener('DOMContentLoaded',go);else go()})();
