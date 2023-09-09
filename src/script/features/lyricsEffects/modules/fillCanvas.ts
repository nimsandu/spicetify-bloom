function fillCanvas(canvas: HTMLCanvasElement): void {
  const context = canvas.getContext("2d");
  if (context) {
    const rootStyles = getComputedStyle(document.documentElement);
    const spiceRGBMain = rootStyles.getPropertyValue("--spice-rgb-main").split(",");
    context.fillStyle = `rgb(
    ${spiceRGBMain[0]},
    ${spiceRGBMain[1]},
    ${spiceRGBMain[2]}
    )`;
    context.fillRect(0, 0, canvas.width, canvas.height);
  }
}

export default fillCanvas;
