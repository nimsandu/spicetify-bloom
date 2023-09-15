import { lyricsMaxWidthCSSVariable } from "../constants/constants";
import calculateLyricsMaxWidth from "../utils/calculateLyricsMaxWidth";

function fixLyricsActiveLineClipping(lyricsContentWrapper: HTMLElement): void {
  const maxWidth = calculateLyricsMaxWidth(lyricsContentWrapper);
  document.body.style.setProperty(lyricsMaxWidthCSSVariable, `${maxWidth}px`);
}

export default fixLyricsActiveLineClipping;
