import { lyricsMaxWidthCSSVariable } from "../constants/constants";
import calculateLyricsMaxWidth from "../utils/calculateLyricsMaxWidth";

function fixActiveLyricsLineClipping(
  lyricsContentWrapper: HTMLElement,
): void {
  const maxWidth = calculateLyricsMaxWidth(lyricsContentWrapper);
  document.body.style.setProperty(lyricsMaxWidthCSSVariable, `${maxWidth}px`);
}

export default fixActiveLyricsLineClipping;
