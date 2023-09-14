function calculateLyricsMaxWidth(lyricsContentWrapper: HTMLElement): number {
  const lyricsContainer = lyricsContentWrapper.parentElement as HTMLElement;
  const marginLeft = parseInt(window.getComputedStyle(lyricsContentWrapper).marginLeft, 10);
  const totalOffset = lyricsContentWrapper.offsetLeft + marginLeft;
  return Math.round(0.95 * (lyricsContainer.clientWidth - totalOffset));
}

export default calculateLyricsMaxWidth;
