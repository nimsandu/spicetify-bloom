import calculateBrightnessCoefficientAsync from "../utils/calculateBrightnessCoefficientAsync";
import calculateSaturationCoefficientAsync from "../utils/calculateSaturationCoefficientAsync";

async function setLyricsBackdropFiltersAsync(
  lyricsBackdropElement: HTMLCanvasElement,
  image: HTMLImageElement,
): Promise<void> {
  const [brightnessCoefficient, saturationCoefficient] = await Promise.all([
    calculateBrightnessCoefficientAsync(lyricsBackdropElement),
    calculateSaturationCoefficientAsync(image, lyricsBackdropElement),
  ]);
  // eslint-disable-next-line no-param-reassign
  lyricsBackdropElement.style.filter = `saturate(${saturationCoefficient}) brightness(${brightnessCoefficient})`;
}

export default setLyricsBackdropFiltersAsync;
