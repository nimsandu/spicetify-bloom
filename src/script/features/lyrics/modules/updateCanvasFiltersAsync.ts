import calculateBrightnessCoefficientAsync from "../utils/calculateBrightnessCoefficientAsync";
import calculateSaturationCoefficientAsync from "../utils/calculateSaturationCoefficientAsync";

async function updateCanvasFiltersAsync(
  canvas: HTMLCanvasElement,
  image: HTMLImageElement,
): Promise<void> {
  const [brightnessCoefficient, saturationCoefficient] = await Promise.all([
    calculateBrightnessCoefficientAsync(canvas),
    calculateSaturationCoefficientAsync(image, canvas),
  ]);
  // eslint-disable-next-line no-param-reassign
  canvas.style.filter = `saturate(${saturationCoefficient}) brightness(${brightnessCoefficient})`;
}

export default updateCanvasFiltersAsync;
