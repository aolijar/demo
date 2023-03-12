function ScrollObservable() {
  this._observers = [];

  // using RAF as a petty debounce
  let inProgress = false;
  const handler = () => {
    if (inProgress) return;
    inProgress = true;

    window.requestAnimationFrame(() => {
      this._process();

      inProgress = false;
    });
  };

  window.addEventListener("scroll", handler);
}

ScrollObservable.prototype._process = function () {
  const viewportHeight = document.documentElement.clientHeight;
  console.log(viewportHeight);
  // const documentHeight = document.body.clientHeight;
  const documentHeight = document.querySelector(".hero").clientHeight;
  const footerHeight = document.querySelector(".footer").clientHeight;
  if (
    document.querySelector(".hero").getBoundingClientRect().top >=
    document.querySelector(".hero").clientHeight * -1
  ) {
    const scrolled = Math.max(
      window.scrollY,
      window.pageYOffset,
      document.documentElement.scrollTop,
      document.body.scrollTop
    );
    // console.log(scrolled, "scrolled");
    const scrolledPercentage =
      Math.round((100 * (100 * scrolled)) / (documentHeight - viewportHeight)) /
      100;
    // console.log(scrolledPercentage, "scrolled");
    this.publish(scrolledPercentage);
  }

  const scrolledCheck = Math.max(
    viewportHeight -
      document.querySelector(".footer").getBoundingClientRect().top
  );
  // console.log(scrolledCheck, "check");
  const scrolledPercentage =
    Math.round(
      (100 * (100 * scrolledCheck)) / (footerHeight - viewportHeight)
    ) / 100;

  // console.log(scrolledPercentage, "percentage");

  if (
    window.innerHeight >=
    document.querySelector(".footer").getBoundingClientRect().top
  ) {
    this.publish(scrolledPercentage);
  }
  // }
};

ScrollObservable.prototype.subscribe = function (observer) {
  this._observers.push(observer);
};

ScrollObservable.prototype.publish = function (value) {
  this._observers.forEach((observer) => {
    observer.next(value);
  });
};
