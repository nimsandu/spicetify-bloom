import { calculateLyricsMaxWidth, getTextLineDirection } from "./utils";

export function revealLyricsLines(lyricsLines: HTMLElement[]): void {
  let positionIndex = 0;
  lyricsLines.forEach((lyricsLine) => {
    if (lyricsLine.innerText) {
      const { style } = lyricsLine;
      positionIndex += 1;

      let animationDelay = 50 + positionIndex * 10;
      if (animationDelay > 1000) animationDelay = 1000;
      let animationDuration = 200 + positionIndex * 100;
      if (animationDuration > 1000) animationDuration = 1000;

      style.animationDelay = `${animationDelay}ms`;
      style.animationDuration = `${animationDuration}ms`;
      style.animationTimingFunction = "ease";
      style.animationName = "reveal";
    }
  });
}

export function fixLyricsActiveLineClipping(
  lyricsWrapper: HTMLElement,
  lyricsLines: HTMLElement[],
): void {
  const maxWidth = calculateLyricsMaxWidth(lyricsWrapper);
  lyricsLines.forEach((lyricsLine) => {
    const { style } = lyricsLine;
    style.maxWidth = `${maxWidth}px`;
    style.transformOrigin = getTextLineDirection(lyricsLine.innerText) === "rtl" ? "right" : "left";
  });
}

export function fixLyricsWrapperShifting(lyricsWrapper: HTMLElement): void {
  const { style } = lyricsWrapper;
  const lyricsWrapperWidth = lyricsWrapper.getBoundingClientRect().width;
  style.maxWidth = "";
  style.width = "";
  style.maxWidth = `${lyricsWrapperWidth}px`;
  style.width = `${lyricsWrapperWidth}px`;
}

export function fillCanvas(canvas: HTMLCanvasElement): void {
  const context = canvas.getContext("2d");
  if (context) {
    const rootStyles = getComputedStyle(document.documentElement);
    const spiceRGBMain = rootStyles.getPropertyValue("--spice-rgb-main").split(",");
    context.fillStyle = `rgb(
    ${spiceRGBMain[0]},
    ${spiceRGBMain[1]},
    ${spiceRGBMain[2]}
    )`;
    context.fillRect(0, 0, canvas.width, canvas.height);
  }
}
