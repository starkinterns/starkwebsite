/* STARK TECHNOVATIONS – Forms & FAQ */
(function(){
'use strict';

/* Contact form validation */
const form = document.getElementById('contactForm');
if(form){
  form.addEventListener('submit', e=>{
    e.preventDefault();
    let valid = true;
    form.querySelectorAll('[required]').forEach(inp=>{
      const v = inp.value.trim();
      inp.classList.remove('error');
      if(!v){ inp.classList.add('error'); valid = false; return; }
      if(inp.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)){
        inp.classList.add('error');
        valid = false;
      }
    });
    if(!valid) return;

    const btn = form.querySelector('[type="submit"]');
    const orig = btn.innerHTML;
    btn.innerHTML = '<i class="bi bi-hourglass-split"></i> Sending…';
    btn.disabled = true;

    setTimeout(()=>{
      btn.innerHTML = '<i class="bi bi-check-circle-fill"></i> Message Sent!';
      btn.style.background = '#16a34a';
      form.reset();
      const suc = document.getElementById('formSuccess');
      if(suc) suc.style.display = 'block';
      setTimeout(()=>{
        btn.innerHTML = orig;
        btn.disabled = false;
        btn.style.background = '';
        if(suc) suc.style.display = 'none';
      }, 4000);
    }, 1800);
  });

  form.querySelectorAll('.f-input').forEach(inp=>{
    inp.addEventListener('input', ()=>inp.classList.remove('error'));
  });
}

/* FAQ accordion */
document.querySelectorAll('.faq-item').forEach(item=>{
  const btn = item.querySelector('.faq-q');
  if(!btn) return;
  btn.addEventListener('click', ()=>{
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i=>i.classList.remove('open'));
    if(!wasOpen) item.classList.add('open');
  });
});

})();
