/* STARK TECHNOVATIONS – Animations & Interactions */
(function(){
'use strict';

/* Animate on scroll */
const aosEls = document.querySelectorAll('[data-aos]');
const aosObs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('in');
      aosObs.unobserve(e.target);
    }
  });
},{threshold:.1, rootMargin:'0px 0px -40px 0px'});
aosEls.forEach(el=>aosObs.observe(el));

/* Animated counters */
function easeOut(t){ return 1 - Math.pow(1 - t, 3); }
function animCount(el, target, suffix, duration){
  duration = duration || 2000;
  const start = performance.now();
  (function tick(now){
    const p = Math.min((now - start) / duration, 1);
    el.textContent = Math.round(easeOut(p) * target) + (suffix || '');
    if(p < 1) requestAnimationFrame(tick);
  })(start);
}

const statsEl = document.getElementById('stats');
let statsDone = false;
if(statsEl){
  new IntersectionObserver(entries=>{
    if(entries[0].isIntersecting && !statsDone){
      statsDone = true;
      document.querySelectorAll('.stat-num[data-target]').forEach(el=>{
        animCount(el, +el.dataset.target, el.dataset.suffix || '');
      });
    }
  }, {threshold:.4}).observe(statsEl);
}

/* Portfolio filter */
const filterBtns = document.querySelectorAll('.fp');
const projCards = document.querySelectorAll('.proj-card[data-cat]');
filterBtns.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    filterBtns.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.filter;
    projCards.forEach(c=>{
      const match = cat === 'All' || c.dataset.cat === cat;
      if(match){
        c.classList.remove('hidden');
        c.style.opacity = '0';
        c.style.transform = 'scale(.92)';
        requestAnimationFrame(()=>{
          c.style.transition = 'opacity .4s ease, transform .4s ease';
          c.style.opacity = '1';
          c.style.transform = 'scale(1)';
        });
      } else {
        c.style.transition = 'opacity .2s ease';
        c.style.opacity = '0';
        setTimeout(()=>c.classList.add('hidden'), 200);
      }
    });
  });
});

/* Testimonials carousel */
const track = document.getElementById('tTrack');
const slides = track ? track.querySelectorAll('.t-slide') : [];
const prevB = document.getElementById('tPrev');
const nextB = document.getElementById('tNext');
const dots = document.querySelectorAll('.c-dot');
let cur = 0, autoT;

function goSlide(n){
  if(!slides.length) return;
  cur = (n + slides.length) % slides.length;
  if(track) track.style.transform = 'translateX(-' + (cur * 100) + '%)';
  dots.forEach((d,i)=>d.classList.toggle('active', i === cur));
}
function startAuto(){ if(slides.length) autoT = setInterval(()=>goSlide(cur + 1), 5500); }
function stopAuto(){ clearInterval(autoT); }

if(prevB) prevB.addEventListener('click', ()=>{ stopAuto(); goSlide(cur - 1); startAuto(); });
if(nextB) nextB.addEventListener('click', ()=>{ stopAuto(); goSlide(cur + 1); startAuto(); });
dots.forEach((d,i)=>d.addEventListener('click', ()=>{ stopAuto(); goSlide(i); startAuto(); }));
if(track){
  track.addEventListener('mouseenter', stopAuto);
  track.addEventListener('mouseleave', startAuto);
  let tx = 0;
  track.addEventListener('touchstart', e=>{ tx = e.touches[0].clientX; stopAuto(); }, {passive:true});
  track.addEventListener('touchend', e=>{
    const d = tx - e.changedTouches[0].clientX;
    if(Math.abs(d) > 50) goSlide(cur + (d > 0 ? 1 : -1));
    startAuto();
  });
  startAuto();
}

/* Cursor glow (desktop) */
if(window.matchMedia('(pointer:fine)').matches){
  const glow = document.createElement('div');
  glow.id = 'cursorGlow';
  Object.assign(glow.style, {
    position:'fixed', inset:'0', pointerEvents:'none', zIndex:'9997', transition:'opacity .3s'
  });
  document.body.appendChild(glow);
  document.addEventListener('mousemove', e=>{
    glow.style.background = 'radial-gradient(500px at ' + e.clientX + 'px ' + e.clientY + 'px, rgba(45,127,255,0.05) 0%, transparent 60%)';
  });
}

/* 3D card tilt */
document.querySelectorAll('.svc-card,.why-card,.ind-card,.team-card').forEach(card=>{
  card.addEventListener('mousemove', e=>{
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    card.style.transform = 'translateY(-6px) rotateX(' + (-y * 6) + 'deg) rotateY(' + (x * 6) + 'deg)';
    card.style.transition = 'transform .1s linear';
  });
  card.addEventListener('mouseleave', ()=>{
    card.style.transform = '';
    card.style.transition = 'transform .4s var(--ease)';
  });
});

})();
