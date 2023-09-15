import {
  lyricsAnimationName,
  lyricsAnimationTimingFunction,
  lyricsAnimationDurationMsMax,
  lyricsAnimationDurationStepMs,
  lyricsAnimationDurationStepMultiplier,
  lyricsAnimationDelayMsMax,
  lyricsAnimationDelayStepMs,
  lyricsAnimationDelayStepMultiplier,
} from "../constants/constants";
import getTextLineDirection from "../helpers/getTextLineDirection";

function setLyricsLinesStyle(lyricsLines: HTMLElement[]): void {
  let positionIndex = 0;

  lyricsLines.forEach((lyricsLine) => {
    if (lyricsLine.textContent) {
      const { style } = lyricsLine;
      positionIndex += 1;

      style.transformOrigin =
        getTextLineDirection(lyricsLine.textContent) === "rtl" ? "right" : "left";

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

export default setLyricsLinesStyle;
