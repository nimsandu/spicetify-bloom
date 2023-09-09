import getTextLineDirection from "../helpers/getTextLineDirection";
import calculateLyricsMaxWidth from "../utils/calculateLyricsMaxWidth";

function setLyricsLinesStyle(lyricsWrapper: HTMLElement, lyricsLines: HTMLElement[]): void {
  const maxWidth = calculateLyricsMaxWidth(lyricsWrapper);
  lyricsLines.forEach((lyricsLine) => {
    const { style } = lyricsLine;
    style.maxWidth = `${maxWidth}px`; // fix lyrics active line clipping
    style.transformOrigin = getTextLineDirection(lyricsLine.innerText) === "rtl" ? "right" : "left";
  });
}

export default setLyricsLinesStyle;
