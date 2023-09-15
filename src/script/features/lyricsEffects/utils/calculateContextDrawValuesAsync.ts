// necessary because backdrop edges become transparent due to blurring

async function calculateContextDrawValuesAsync(
  canvas: HTMLCanvasElement,
  blurValue: number,
): Promise<number[]> {
  const drawWidth = canvas.width + blurValue * 2;
  const drawHeight = canvas.height + blurValue * 2;
  const drawX = 0 - blurValue;
  const drawY = 0 - blurValue;
  return [drawWidth, drawHeight, drawX, drawY];
}

export default calculateContextDrawValuesAsync;
