import getTextLineDirection from "../helpers/getTextLineDirection";
import calculateLyricsMaxWidth from "../utils/calculateLyricsMaxWidth";
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

function setLyricsLinesStyle(lyricsContentWrapper: HTMLElement, lyricsLines: HTMLElement[]): void {
  const maxWidth = calculateLyricsMaxWidth(lyricsContentWrapper);
  let positionIndex = 0;

  lyricsLines.forEach((lyricsLine) => {
    const { style } = lyricsLine;
    positionIndex += 1;

    style.maxWidth = `${maxWidth}px`; // fix lyrics active line clipping
    style.transformOrigin = getTextLineDirection(lyricsLine.innerText) === "rtl" ? "right" : "left";

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
  });
}

export default setLyricsLinesStyle;
