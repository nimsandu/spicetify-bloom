function fixLyricsContentWrapperShifting(lyricsContentWrapper: HTMLElement): void {
  const { style } = lyricsContentWrapper;
  style.maxWidth = "";
  style.width = "";
  const lyricsContentWrapperWidth = lyricsContentWrapper.getBoundingClientRect().width;
  style.maxWidth = `${lyricsContentWrapperWidth}px`;
  style.width = `${lyricsContentWrapperWidth}px`;
}

export default fixLyricsContentWrapperShifting;
