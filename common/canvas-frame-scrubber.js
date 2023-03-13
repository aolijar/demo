const CanvasFrameScrubber = (() => {
  const create = (context, frames) => {
    let currentFrame = 0;
    const movieContainer = document.querySelector(".hero");
    const observer = {
      next: (percentage) => {
        const frameIndex = Math.floor((percentage * (frames.length - 1)) / 100);

        if (currentFrame === frameIndex) return;
        window.requestAnimationFrame(() => {
          // ENSURES VIDEO WON'T PLAY PAST CERTANIN POINT
          const canvas = document.querySelector(".canvas");
          const context = canvas.getContext("2d");
          if (frameIndex >= frames.length) {
            // IMPORT TO KEEP LAST FRAME OF MOVIE EVEN WHEN OFF SCREEN
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(frames[frames.length - 1], 0, 0);
            return;
          }

          // THIS IS ADDED TO DELETE OLD PNG --- normal functionality
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(frames[frameIndex], 0, 0);
        });
      },
    };

    return observer;
  };

  return {
    create: create,
  };
})();

const CanvasFrameScrubberFooter = (() => {
  const create = (context, frames) => {
    let currentFrame = 0;
    // const movieContainer = document.querySelector(".footer");
    const observer = {
      next: (percentage) => {
        const frameIndex = Math.floor((percentage * (frames.length - 1)) / 100);
        if (currentFrame === frameIndex) return;

        window.requestAnimationFrame(() => {
          // ENSURES VIDEO WON'T PLAY PAST CERTANIN POINT

          if (frameIndex >= frames.length) return;
          const canvas = document.querySelector(".footer-canvas");
          const context = canvas.getContext("2d");
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(frames[frameIndex], 0, 0);
        });
      },
    };

    return observer;
  };

  return {
    create: create,
  };
})();
