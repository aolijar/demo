(async () => {
  // startProgress();

  const videoContainer = document.querySelector("#canvas-container");
  const footerContainer = document.querySelector("#footer-container");

  const framesUrlElement = document.querySelector('input[name="frames-url"]');
  const framesFooterUrlElement = document.querySelector(
    'input[name="footer-frames-url"]'
  );
  if (
    !videoContainer ||
    !framesUrlElement ||
    !footerContainer ||
    !framesFooterUrlElement
  ) {
    throw new Error("Element missing!");
  }

  const framesUrlPattern = framesUrlElement.value;
  const framesUrlStart = parseInt(framesUrlElement.dataset.frameStart, 10);
  const framesUrlEnd = parseInt(framesUrlElement.dataset.frameEnd, 10);
  const framesIdPadding = parseInt(framesUrlElement.dataset.frameIdPadding, 10);

  const footerUrlPattern = framesFooterUrlElement.value;
  const footerUrlStart = parseInt(
    framesFooterUrlElement.dataset.frameStart,
    10
  );
  const footerUrlEnd = parseInt(framesFooterUrlElement.dataset.frameEnd, 10);
  const footerIdPadding = parseInt(
    framesFooterUrlElement.dataset.frameIdPadding,
    10
  );
  // log(`Initializing frames download...`);

  // log(`Please be patient. Downloaing ${framesUrlEnd} frames...`);

  // const startTime = Date.now();

  const frames = await FrameUnpacker.unpack({
    urlPattern: framesUrlPattern,
    start: framesUrlStart,
    end: framesUrlEnd,
    padding: framesIdPadding,
  });

  const footerFrames = await FrameUnpacker.unpack({
    urlPattern: footerUrlPattern,
    start: footerUrlStart,
    end: footerUrlEnd,
    padding: footerIdPadding,
  });

  // const endTime = Date.now();

  // log(`Took ${(endTime - startTime) / 1000} seconds.`);

  // log("Painting canvas with first frame...");

  const canvas = document.createElement("canvas");
  canvas.classList.add("canvas");
  canvas.height = frames[0].height;
  canvas.width = frames[0].width;
  const context = canvas.getContext("2d");
  context.drawImage(frames[0], 0, 0);

  videoContainer.appendChild(canvas);

  // FOOTER CANVAS
  const footerCanvas = document.createElement("canvas");
  footerCanvas.classList.add("footer-canvas");
  footerCanvas.height = footerFrames[0].height;
  footerCanvas.width = footerFrames[0].width;
  const contextFooter = footerCanvas.getContext("2d");
  contextFooter.drawImage(footerFrames[0], 0, 0);

  footerContainer.appendChild(footerCanvas);
  // log("Setting up scrubber...");

  const observer = CanvasFrameScrubber.create(context, frames);
  const observable = new ScrollObservable();
  observable.subscribe(observer);

  const footerObserver = CanvasFrameScrubberFooter.create(
    contextFooter,
    footerFrames
  );
  const footerObservable = new ScrollObservable();
  footerObservable.subscribe(footerObserver);
  // log("Ready! Scroll to scrub.");

  // stopProgress();
})();
