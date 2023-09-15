function calculateLyricsMaxWidth(lyricsContentWrapper: HTMLElement): number {
  const lyricsContentContainer = lyricsContentWrapper.parentElement as HTMLElement;
  const marginLeft = parseInt(window.getComputedStyle(lyricsContentWrapper).marginLeft, 10);
  const totalOffset = lyricsContentWrapper.offsetLeft + marginLeft;
  return Math.round(0.95 * (lyricsContentContainer.clientWidth - totalOffset));
}

export default calculateLyricsMaxWidth;
