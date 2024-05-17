let toAnimate = document.querySelectorAll('.animate');

function checkScroll() {
  toAnimate.forEach((sec) => {
    const rect = sec.getBoundingClientRect();
    const isInViewport = rect.top >= -527 && rect.top <= window.innerHeight;

    if (isInViewport) {
        sec.classList.add('show-animation');
        sec.classList.remove('hide-animation');
    } else {
      sec.classList.add('hide-animation');
      sec.classList.remove('show-animation');
    }
  });
}

checkScroll();

window.addEventListener('scroll', checkScroll);