import { calculateLyricsMaxWidth, getTextLineDirection } from "../utils/getImageSaturationAsync";

function fixLyricsActiveLineClipping(lyricsWrapper: HTMLElement, lyricsLines: HTMLElement[]): void {
  const maxWidth = calculateLyricsMaxWidth(lyricsWrapper);
  lyricsLines.forEach((lyricsLine) => {
    const { style } = lyricsLine;
    style.maxWidth = `${maxWidth}px`;
    style.transformOrigin = getTextLineDirection(lyricsLine.innerText) === "rtl" ? "right" : "left";
  });
}

export default fixLyricsActiveLineClipping;
