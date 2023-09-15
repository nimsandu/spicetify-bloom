function fillCanvas(canvas: HTMLCanvasElement): void {
  const rootStyles = getComputedStyle(document.documentElement);
  const spiceRGBMain = rootStyles.getPropertyValue("--spice-rgb-main").split(",");
  const context = canvas.getContext("2d") as CanvasRenderingContext2D;
  context.fillStyle = `rgb(
    ${spiceRGBMain[0]},
    ${spiceRGBMain[1]},
    ${spiceRGBMain[2]}
    )`;
  context.fillRect(0, 0, canvas.width, canvas.height);
}

export default fillCanvas;
