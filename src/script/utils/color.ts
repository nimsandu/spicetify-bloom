import {
  FastAverageColor,
  FastAverageColorResource,
  FastAverageColorResult,
} from "fast-average-color";
import { roundToDecimal } from "./general";

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

  if (finalSaturation > 0.8) {
    saturationCoefficient = 1 - (finalSaturation - 0.8);
  }

  if (finalSaturation < 0.5 && firstAverageSaturation > 0.05) {
    saturationCoefficient += 0.5 - finalSaturation;
  }

  if (saturationCoefficient > 1.7) {
    saturationCoefficient = 1.7;
  }

  return roundToDecimal(saturationCoefficient, 1);
}

export async function calculateBrightnessCoefficient(resource: FastAverageColorResource) {
  const fac = new FastAverageColor();

  // ignore colors darker than 50% by HSB, because 0.5 is the brightness threshold
  const averageColor = await fac.getColorAsync(resource, { ignoredColor: [0, 0, 0, 255, 125] });

  // slice(0, 3) - remove alpha channel
  let brightness = Math.max(...averageColor.value.slice(0, 3));
  brightness = roundToDecimal(brightness / 255, 1);
  const brightnessCoefficient = brightness > 0.5 ? 1 - (brightness - 0.5) : 1;

  fac.destroy();
  return brightnessCoefficient;
}
