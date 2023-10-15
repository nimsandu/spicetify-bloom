import { lyricsContentWrapperSelector, lyricsMaxWidthCSSVariable } from "../constants/constants";
import calculateLyricsMaxWidth from "../utils/calculateLyricsMaxWidth";

import waitForElements from "../../../shared/utils/waitForElements";

function fixLyricsActiveLineClipping(lyricsContentWrapper: HTMLElement): void {
  const maxWidth = calculateLyricsMaxWidth(lyricsContentWrapper);
  document.documentElement.style.setProperty(lyricsMaxWidthCSSVariable, `${maxWidth}px`);
}

function fixLyricsContentWrapperShifting(lyricsContentWrapper: HTMLElement): void {
  const { style } = lyricsContentWrapper;
  style.maxWidth = "";
  style.width = "";
  const lyricsContentWrapperWidth = lyricsContentWrapper.getBoundingClientRect().width;
  style.maxWidth = `${lyricsContentWrapperWidth}px`;
  style.width = `${lyricsContentWrapperWidth}px`;
}

function fixLyricsActiveLineAnimation(): void {
  waitForElements([lyricsContentWrapperSelector], ([lyricsContentWrapper]) => {
    fixLyricsContentWrapperShifting(lyricsContentWrapper as HTMLElement);
    fixLyricsActiveLineClipping(lyricsContentWrapper as HTMLElement);
  });
}

export default fixLyricsActiveLineAnimation;
