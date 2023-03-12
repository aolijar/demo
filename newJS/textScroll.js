const text = document.getElementById("demo-text");

window.addEventListener("scroll", () => {
  //   console.log(window.scrollY);
  text.style.left = `calc(110% - ${window.scrollY}px)`;
  text.style.top = ` ${window.scrollY + 350}px`;
});

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

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
