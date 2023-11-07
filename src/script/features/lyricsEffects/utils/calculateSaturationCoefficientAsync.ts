import { FastAverageColorResource } from "fast-average-color";

import getImageSaturationAsync from "../helpers/getImageSaturationAsync";
import roundToDecimal from "../../../shared/helpers/roundToDecimal";
import {
  lyricsBackdropMaxFinalSaturation,
  lyricsBackdropMinFinalSaturation,
  lyricsBackdropMinOriginalSaturation,
  lyricsBackdropMaxSaturationCoefficient,
} from "../constants/constants";

async function calculateSaturationCoefficientAsync(
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

  if (finalSaturation > lyricsBackdropMaxFinalSaturation) {
    saturationCoefficient = 1 - (finalSaturation - lyricsBackdropMaxFinalSaturation);
  }

  if (
    finalSaturation < lyricsBackdropMinFinalSaturation &&
    firstAverageSaturation > lyricsBackdropMinOriginalSaturation
  ) {
    saturationCoefficient += lyricsBackdropMinFinalSaturation - finalSaturation;
  }

  if (saturationCoefficient > lyricsBackdropMaxSaturationCoefficient) {
    saturationCoefficient = lyricsBackdropMaxSaturationCoefficient;
  }

  return roundToDecimal(saturationCoefficient, 1);
}

export default calculateSaturationCoefficientAsync;
