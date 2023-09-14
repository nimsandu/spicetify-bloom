function fixLyricsContentWrapperShifting(lyricsContentWrapper: HTMLElement): void {
  const { style } = lyricsContentWrapper;
  const lyricsWrapperWidth = lyricsContentWrapper.getBoundingClientRect().width;
  style.maxWidth = "";
  style.width = "";
  style.maxWidth = `${lyricsWrapperWidth}px`;
  style.width = `${lyricsWrapperWidth}px`;
}

export default fixLyricsContentWrapperShifting;
