// Simple page-wide slide-in animation helper
// Usage: add data-animate-from="left" or "right" on any element.

(function () {
  const ATTR_NAME = 'data-animate-from';

  function initSlideInAnimations() {
    const animatedEls = Array.from(
      document.querySelectorAll('[' + ATTR_NAME + ']')
    );

    if (!animatedEls.length) return;

    animatedEls.forEach((el, index) => {
      const direction = (el.getAttribute(ATTR_NAME) || 'left').toLowerCase();

      // base class so CSS can apply initial transform/opacity + transition
      el.classList.add('will-animate');

      if (direction === 'right') {
        el.classList.add('from-right');
      } else {
        // default: left
        el.classList.add('from-left');
      }

      // optional stagger if data-animate-delay not set
      const customDelay = el.getAttribute('data-animate-delay');
      const delaySeconds =
        typeof customDelay === 'string' && customDelay.trim() !== ''
          ? customDelay
          : (index * 0.12).toFixed(2) + 's';

      el.style.setProperty('--enter-delay', delaySeconds);
    });

    // Use double rAF để đảm bảo layout đã xong trước khi trigger transition
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        animatedEls.forEach((el) => {
          el.classList.add('is-visible');
        });
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSlideInAnimations);
  } else {
    initSlideInAnimations();
  }
})();

