import { calculateLyricsMaxWidth, getTextLineDirection } from "./utils";
import {
  lyricsAnimationName,
  lyricsAnimationTimingFunction,
  lyricsAnimationDurationMsMax,
  lyricsAnimationDurationStepMs,
  lyricsAnimationDurationStepMultiplier,
  lyricsAnimationDelayMsMax,
  lyricsAnimationDelayStepMs,
  lyricsAnimationDelayStepMultiplier,
} from "./constants";

export function revealLyricsLines(lyricsLines: HTMLElement[]): void {
  let positionIndex = 0;
  lyricsLines.forEach((lyricsLine) => {
    if (lyricsLine.innerText) {
      const { style } = lyricsLine;
      positionIndex += 1;

      let animationDelay =
        lyricsAnimationDelayStepMs + positionIndex * lyricsAnimationDelayStepMultiplier;
      if (animationDelay > lyricsAnimationDelayMsMax) {
        animationDelay = lyricsAnimationDelayMsMax;
      }

      let animationDuration =
        lyricsAnimationDurationStepMs + positionIndex * lyricsAnimationDurationStepMultiplier;
      if (animationDuration > lyricsAnimationDurationMsMax) {
        animationDuration = lyricsAnimationDurationMsMax;
      }

      style.animationDelay = `${animationDelay}ms`;
      style.animationDuration = `${animationDuration}ms`;
      style.animationTimingFunction = lyricsAnimationTimingFunction;
      style.animationName = lyricsAnimationName;
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
