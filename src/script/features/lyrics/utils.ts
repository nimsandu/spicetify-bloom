import {
  FastAverageColor,
  FastAverageColorResource,
  FastAverageColorResult,
  FastAverageColorRgbaWithThreshold,
} from "fast-average-color";
import {
  backdropMaxFinalSaturation,
  backdropMinFinalSaturation,
  backdropMinOriginalSaturation,
  backdropMaxSaturationCoefficient,
  backdropMaxBrightness,
} from "./constants";
import { roundToDecimal } from "../../shared/utils";

export function getColorSaturation(color: FastAverageColorResult): number {
  // remove alpha channel
  const value = color.value.slice(0, 3);

  const max = Math.max(...value);
  const min = Math.min(...value);
  const delta = max - min;

  return max !== 0 ? delta / max : 0;
}

export async function getImageSaturationAsync(resource: FastAverageColorResource): Promise<number> {
  const fac = new FastAverageColor();

  // ignore black and almost black colors
  const averageColor = await fac.getColorAsync(resource, { ignoredColor: [0, 0, 0, 255, 10] });
  const averageColorSaturation = getColorSaturation(averageColor);

  fac.destroy();
  return averageColorSaturation;
}

export async function calculateSaturationCoefficientAsync(
  firstResource: FastAverageColorResource,
  secondResource: FastAverageColorResource,
): Promise<number> {
  const [firstAverageSaturation, secondAverageSaturation] = await Promise.all([
    getImageSaturationAsync(firstResource),
    getImageSaturationAsync(secondResource),
  ]);

  let saturationCoefficient = 1;

  if (secondAverageSaturation < firstAverageSaturation) {
    saturationCoefficient = firstAverageSaturation / secondAverageSaturation;
  }

  const finalSaturation = roundToDecimal(secondAverageSaturation * saturationCoefficient, 1);

  if (finalSaturation > backdropMaxFinalSaturation) {
    saturationCoefficient = 1 - (finalSaturation - backdropMaxFinalSaturation);
  }

  if (
    finalSaturation < backdropMinFinalSaturation &&
    firstAverageSaturation > backdropMinOriginalSaturation
  ) {
    saturationCoefficient += backdropMinFinalSaturation - finalSaturation;
  }

  if (saturationCoefficient > backdropMaxSaturationCoefficient) {
    saturationCoefficient = backdropMaxSaturationCoefficient;
  }

  return roundToDecimal(saturationCoefficient, 1);
}

export async function calculateBrightnessCoefficientAsync(resource: FastAverageColorResource) {
  const fac = new FastAverageColor();

  const ignoredColor: FastAverageColorRgbaWithThreshold = [
    0,
    0,
    0,
    255,
    Math.floor(255 * backdropMaxBrightness),
  ];
  const averageColor = await fac.getColorAsync(resource, { ignoredColor });

  // slice(0, 3) - remove alpha channel
  let brightness = Math.max(...averageColor.value.slice(0, 3));
  brightness = roundToDecimal(brightness / 255, 1);
  const brightnessCoefficient =
    brightness > backdropMaxBrightness ? 1 - (brightness - backdropMaxBrightness) : 1;

  fac.destroy();
  return brightnessCoefficient;
}

export function calculateLyricsMaxWidth(lyricsWrapper: HTMLElement): number {
  const lyricsContainer = lyricsWrapper.parentElement as HTMLElement;
  const marginLeft = parseInt(window.getComputedStyle(lyricsWrapper).marginLeft, 10);
  const totalOffset = lyricsWrapper.offsetLeft + marginLeft;
  return Math.round(0.95 * (lyricsContainer.clientWidth - totalOffset));
}

export function getTextLineDirection(line: string): "rtl" | "ltr" {
  const rtlRegExp = /[\u0591-\u07FF]/;
  const firstCharacter = line[0];
  return rtlRegExp.test(firstCharacter) ? "rtl" : "ltr";
}
