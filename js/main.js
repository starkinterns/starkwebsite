/* STARK TECHNOVATIONS – Main Entry */
(function () {
  'use strict';

  /* Robust splash screen dismissal: always hide after a short, fixed delay
     so the splash cannot block the site indefinitely. Honors reduced-motion. */
  let _splashScheduled = false;

  function getNavigationType() {
    const nav = performance.getEntriesByType('navigation')[0];
    if (nav && nav.type) return nav.type;
    if (performance.navigation) {
      switch (performance.navigation.type) {
        case 1:
          return 'reload';
        case 2:
          return 'back_forward';
        default:
          return 'navigate';
      }
    }
    return 'navigate';
  }

  function shouldShowSplash() {
    const splash = document.getElementById('splash');
    if (!splash) return false;

    const referrer = document.referrer;
    let isInternalNavFromOtherPage = false;
    try {
      if (referrer) {
        const referrerUrl = new URL(referrer);
        isInternalNavFromOtherPage = referrerUrl.origin === location.origin && referrerUrl.pathname !== location.pathname;
      }
    } catch (error) {
      isInternalNavFromOtherPage = false;
    }

    const navigationType = getNavigationType();
    const isReload = navigationType === 'reload';
    const shownBefore = sessionStorage.getItem('starkSplashShown');

    if (isInternalNavFromOtherPage) {
      return false;
    }

    if (shownBefore && !isReload) {
      return false;
    }

    return true;
  }

  function scheduleDismiss() {
    if (_splashScheduled) return;
    _splashScheduled = true;

    const splash = document.getElementById('splash');
    if (!splash) return;

    if (!shouldShowSplash()) {
      splash.parentNode.removeChild(splash);
      return;
    }

    sessionStorage.setItem('starkSplashShown', 'true');
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
