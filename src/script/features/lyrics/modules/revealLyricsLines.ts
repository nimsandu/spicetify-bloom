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

function revealLyricsLines(lyricsLines: HTMLElement[]): void {
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

export default revealLyricsLines;
