/* rajivbuda.com — timeline upgrade override v1 */
(function(){
 var RM=matchMedia('(prefers-reduced-motion: reduce)').matches, FINE=matchMedia('(hover:hover) and (pointer:fine)').matches;
 var HL={role:'Business Program Manager',title:'Highlight · AI-products volume licensing contracts',items:[['~$3.5B','ByteDance'],['~$2B','Temu'],['','BHP Australia']]};
 function enhance(tl){
  if(tl.dataset.tlx)return; tl.dataset.tlx='1'; tl.classList.add('tlx-on');
  var stars=document.createElement('div');stars.className='tlx-stars';
  var line=document.createElement('div');line.className='tlx-line';line.innerHTML='<b></b>';
  tl.append(stars,line); // append (not prepend) so the site's :nth-child item styling is untouched
  var items=[].slice.call(tl.querySelectorAll('.timeline-item'));
  items.forEach(function(it){
   var h=it.querySelector('h3');
   if(h&&h.textContent.trim()===HL.role&&!it.querySelector('.tlx-hl')){
    var d=document.createElement('div');d.className='tlx-hl';
    d.innerHTML='<small>'+HL.title+'</small><div>'+HL.items.map(function(x){return '<span>'+(x[0]?'<b>'+x[0]+'</b>':'')+x[1]+'</span>'}).join('')+'</div>';
    it.querySelector('.timeline-copy').appendChild(d);}
   if(FINE&&!RM){var c=it.querySelector('.timeline-copy');
    c.addEventListener('pointermove',function(e){var r=c.getBoundingClientRect();
     c.style.setProperty('--tlx-ty',((e.clientX-r.left)/r.width-.5)*8+'deg');c.style.setProperty('--tlx-tx',-((e.clientY-r.top)/r.height-.5)*6+'deg');});
    c.addEventListener('pointerleave',function(){c.style.removeProperty('--tlx-ty');c.style.removeProperty('--tlx-tx');});}
  });
  if(RM||!('IntersectionObserver' in window)){items.forEach(function(i){i.classList.add('tlx-in','tlx-lit')});}
  else{var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('tlx-in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -12% 0px'});
   items.forEach(function(i){io.observe(i)});}
  var geo=null,tick=false;
  function measure(){var tr=tl.getBoundingClientRect(),n=items.map(function(i){var r=i.querySelector('.timeline-rail i').getBoundingClientRect();return {x:r.left+r.width/2-tr.left,y:r.top+r.height/2-tr.top}});
   if(!n.length)return;geo={n:n,top:n[0].y,len:n[n.length-1].y-n[0].y};
   line.style.left=n[0].x+'px';line.style.top=geo.top+'px';line.style.height=geo.len+'px';}
  function update(){tick=false;if(!geo)measure();if(!geo)return;
   var tr=tl.getBoundingClientRect(),probe=innerHeight*.6-tr.top-geo.top,p=RM?1:Math.max(0,Math.min(1,probe/geo.len));
   tl.style.setProperty('--tlx-p',p.toFixed(4));tl.style.setProperty('--tlx-tip',p>0&&p<1?1:0);
   if(!RM)tl.style.setProperty('--tlx-par',(-tr.top*.12).toFixed(1)+'px');
   geo.n.forEach(function(n,k){items[k].classList.toggle('tlx-lit',RM||geo.top+probe>=n.y-4)});}
  function req(){if(!tick){tick=true;requestAnimationFrame(update)}}
  addEventListener('scroll',req,{passive:true});addEventListener('resize',function(){geo=null;req()});
  if('ResizeObserver' in window)new ResizeObserver(function(){geo=null;req()}).observe(tl);
  setTimeout(function(){geo=null;req()},900);req();
 }
 function scan(){var t=document.querySelector('.cosmic-timeline');if(t)enhance(t)}
 new MutationObserver(scan).observe(document.documentElement,{childList:true,subtree:true});
 document.readyState==='loading'?document.addEventListener('DOMContentLoaded',scan):scan();
})();
