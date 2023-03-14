const text = document.getElementById("demo-text");
const ft = document.querySelector(".footer-text");
const footer = document.querySelector(".footer");

window.addEventListener("scroll", () => {
  //   console.log(window.scrollY);
  text.style.left = `calc(110% - ${window.scrollY}px)`;

  // text.style.top = ` ${window.scrollY + 50}px`;
  if (window.scrollY > 10000) {
    ft.style.opacity = 1;
    footer.style.backd;
    console.log(window.scrollY);
  } else if (window.scrollY < 10000) {
    ft.style.opacity = 0;
    console.log(window.scrollY);
  }
});

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

console.log(document.querySelector(".footer").getBoundingClientRect().bottom);

// THIS IS HORIZONTAL SCROLL SECTION

const spaceHolder = document.querySelector(".space-holder");
const horizontal = document.querySelector(".horizontal");
spaceHolder.style.height = `${calcDynamicHeight(horizontal)}px`;

function calcDynamicHeight(ref) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const objectWidth = ref.scrollWidth;
  return objectWidth - vw + vh + 150; // 150 is the padding (in pixels) desired on the right side of the .cards container. This can be set to whatever your styles dictate
}

window.addEventListener("scroll", () => {
  const sticky = document.querySelector(".sticky");
  horizontal.style.transform = `translateX(-${sticky.offsetTop}px)`;
});

window.addEventListener("resize", () => {
  spaceHolder.style.height = `${calcDynamicHeight(horizontal)}px`;
});
