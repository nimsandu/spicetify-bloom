import calculateLyricsMaxWidth from "../utils/calculateLyricsMaxWidth";

function fixLyricsActiveLineClipping(lyricsWrapper: HTMLElement, lyricsLines: HTMLElement[]): void {
  const maxWidth = calculateLyricsMaxWidth(lyricsWrapper);
  lyricsLines.forEach((lyricsLine) => {
    const { style } = lyricsLine;
    style.maxWidth = `${maxWidth}px`;
  });
}

export default fixLyricsActiveLineClipping;
