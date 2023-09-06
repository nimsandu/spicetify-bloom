function fixLyricsWrapperShifting(lyricsWrapper: HTMLElement): void {
  const { style } = lyricsWrapper;
  const lyricsWrapperWidth = lyricsWrapper.getBoundingClientRect().width;
  style.maxWidth = "";
  style.width = "";
  style.maxWidth = `${lyricsWrapperWidth}px`;
  style.width = `${lyricsWrapperWidth}px`;
}

export default fixLyricsWrapperShifting;
