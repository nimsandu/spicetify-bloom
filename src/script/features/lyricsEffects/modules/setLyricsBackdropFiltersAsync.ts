import calculateBrightnessCoefficientAsync from "../utils/calculateBrightnessCoefficientAsync";
import calculateSaturationCoefficientAsync from "../utils/calculateSaturationCoefficientAsync";

async function setLyricsBackdropFiltersAsync(
  lyricsBackdrop: HTMLCanvasElement,
  image: HTMLImageElement,
): Promise<void> {
  const [brightnessCoefficient, saturationCoefficient] = await Promise.all([
    calculateBrightnessCoefficientAsync(lyricsBackdrop),
    calculateSaturationCoefficientAsync(image, lyricsBackdrop),
  ]);
  // eslint-disable-next-line no-param-reassign
  lyricsBackdrop.style.filter = `saturate(${saturationCoefficient}) brightness(${brightnessCoefficient})`;
}

export default setLyricsBackdropFiltersAsync;
