import {
  FastAverageColor,
  FastAverageColorResource,
  FastAverageColorRgbaWithThreshold,
} from "fast-average-color";
import { backdropMaxBrightness } from "../constants/constants";
import roundToDecimal from "../../../shared/utils/roundToDecimal";

async function calculateBrightnessCoefficientAsync(resource: FastAverageColorResource) {
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

export default calculateBrightnessCoefficientAsync;
