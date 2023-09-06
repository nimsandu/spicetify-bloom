import { FastAverageColorResource } from "fast-average-color";
import {
  backdropMaxFinalSaturation,
  backdropMinFinalSaturation,
  backdropMinOriginalSaturation,
  backdropMaxSaturationCoefficient,
} from "../constants/constants";

import getImageSaturationAsync from "./getImageSaturationAsync";
import roundToDecimal from "../../../shared/utils/roundToDecimal";

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

export default calculateSaturationCoefficientAsync;
