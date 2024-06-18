document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('button#primaryNavHamburgerToggle');
  const backdrop = document.createElement('span');
  backdrop.classList.add('backdrop');
  navToggle.addEventListener('click', (e) => {
    const isExpanding = navToggle.getAttribute('aria-expanded') === 'false';
    if (isExpanding) {
      navToggle.setAttribute('aria-expanded', 'true');
      document.body.append(backdrop);
    } else {
      navToggle.setAttribute('aria-expanded', 'false');
      backdrop.remove();
    }
  });
  const mediaQueryBreakPoint = window.matchMedia('(min-width: 725px)');
  const handleBreakpoint = (e) => {
    if (e.matches) {
      navToggle.setAttribute('aria-expanded', false);
      backdrop.remove();
    }
  };
  mediaQueryBreakPoint.addEventListener('change', handleBreakpoint);
});
