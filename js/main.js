/* STARK TECHNOVATIONS – Main Entry */
(function () {
  'use strict';

  /* Robust splash screen dismissal: always hide after a short, fixed delay
     so the splash cannot block the site indefinitely. Honors reduced-motion. */
  let _splashScheduled = false;
  function scheduleDismiss() {
    if (_splashScheduled) return;
    _splashScheduled = true;
    const splash = document.getElementById('splash');
    if (!splash) return;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hideDelay = reduce ? 400 : 2000; // 2s for normal motion
    const removeDelay = hideDelay + 600;
    setTimeout(() => splash.classList.add('hide'), hideDelay);
    setTimeout(() => {
      if (splash && splash.parentNode) splash.parentNode.removeChild(splash);
    }, removeDelay);
  }

  // If DOM is already interactive/complete, schedule immediately.
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    scheduleDismiss();
  } else {
    document.addEventListener('DOMContentLoaded', scheduleDismiss, { once: true });
  }

  // Also listen for load as a backup, and add a final safety timer in case
  // other events don't fire for any reason.
  window.addEventListener('load', scheduleDismiss, { once: true });
  setTimeout(scheduleDismiss, 7000);
})();
