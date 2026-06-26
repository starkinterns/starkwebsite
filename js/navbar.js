/* STARK TECHNOVATIONS – Navbar & Navigation */
(function(){
'use strict';

const nav = document.getElementById('mainNav');
const prog = document.getElementById('scrollProgress');
const page = document.body.dataset.page;

/* Scroll progress */
window.addEventListener('scroll', ()=>{
  if(!prog) return;
  const h = document.body.scrollHeight - window.innerHeight;
  prog.style.width = (h > 0 ? window.scrollY / h * 100 : 0) + '%';
},{passive:true});

/* Sticky nav, back-to-top, scroll spy */
const deskLinks = nav ? nav.querySelectorAll('.nav-links-desk a[data-sec], .nav-links-desk a[data-page]') : [];

window.addEventListener('scroll', ()=>{
  const y = window.scrollY;
  if(nav){
    nav.classList.toggle('scrolled', y > 60);
  }
  const bt = document.getElementById('backTop');
  if(bt) bt.classList.toggle('show', y > 400);

  if(page === 'home'){
    const secs = document.querySelectorAll('section[id]');
    let cur = '';
    secs.forEach(s=>{ if(y >= s.offsetTop - 130) cur = s.id; });
    deskLinks.forEach(a=>{
      if(a.dataset.sec) a.classList.toggle('active', a.dataset.sec === cur);
    });
  }
},{passive:true});

/* Active page link on inner pages */
if(page && page !== 'home'){
  deskLinks.forEach(a=>{
    if(a.dataset.page) a.classList.toggle('active', a.dataset.page === page);
  });
  document.querySelectorAll('.mob-links a[data-page]').forEach(a=>{
    a.classList.toggle('active', a.dataset.page === page);
  });
}

/* Mobile menu */
const tog = document.getElementById('navTog');
const mob = document.getElementById('mobMenu');
const mcls = document.getElementById('mobClose');

function openMob(){
  if(!mob) return;
  mob.classList.add('open');
  document.body.style.overflow = 'hidden';
  mob.querySelectorAll('.mob-links li').forEach((li,i)=>{
    li.style.opacity = '0';
    li.style.transform = 'translateX(-20px)';
    setTimeout(()=>{
      li.style.transition = 'opacity .3s ease, transform .3s ease';
      li.style.opacity = '1';
      li.style.transform = 'translateX(0)';
    }, 80 + i * 55);
  });
}
function closeMob(){
  if(!mob) return;
  mob.classList.remove('open');
  document.body.style.overflow = '';
}
if(tog) tog.addEventListener('click', openMob);
if(mcls) mcls.addEventListener('click', closeMob);
if(mob) mob.querySelectorAll('a').forEach(a=>a.addEventListener('click', closeMob));

/* Back to top */
const backTop = document.getElementById('backTop');
if(backTop) backTop.addEventListener('click', ()=>window.scrollTo({top:0, behavior:'smooth'}));

/* Smooth anchor scroll (same page) */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const id = a.getAttribute('href');
    if(id === '#') return;
    const t = document.querySelector(id);
    if(t){
      e.preventDefault();
      const off = (nav ? nav.offsetHeight : 70) + 12;
      window.scrollTo({top: t.getBoundingClientRect().top + window.scrollY - off, behavior:'smooth'});
    }
  });
});

})();
