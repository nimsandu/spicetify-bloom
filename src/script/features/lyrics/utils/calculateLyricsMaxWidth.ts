function calculateLyricsMaxWidth(lyricsWrapper: HTMLElement): number {
  const lyricsContainer = lyricsWrapper.parentElement as HTMLElement;
  const marginLeft = parseInt(window.getComputedStyle(lyricsWrapper).marginLeft, 10);
  const totalOffset = lyricsWrapper.offsetLeft + marginLeft;
  return Math.round(0.95 * (lyricsContainer.clientWidth - totalOffset));
}

export default calculateLyricsMaxWidth;
