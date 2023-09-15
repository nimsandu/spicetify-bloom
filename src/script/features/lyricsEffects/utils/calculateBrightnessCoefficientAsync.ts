import {
  FastAverageColor,
  FastAverageColorResource,
  FastAverageColorRgbaWithThreshold,
} from "fast-average-color";
import { lyricsBackdropMaxBrightness } from "../constants/constants";
import roundToDecimal from "../../../shared/helpers/roundToDecimal";

async function calculateBrightnessCoefficientAsync(resource: FastAverageColorResource) {
  const fac = new FastAverageColor();

  const ignoredColor: FastAverageColorRgbaWithThreshold = [
    0,
    0,
    0,
    255,
    Math.floor(255 * lyricsBackdropMaxBrightness),
  ];
  const averageColor = await fac.getColorAsync(resource, { ignoredColor });

  // slice(0, 3) - remove alpha channel
  let brightness = Math.max(...averageColor.value.slice(0, 3));
  brightness = roundToDecimal(brightness / 255, 1);
  const brightnessCoefficient =
    brightness > lyricsBackdropMaxBrightness ? 1 - (brightness - lyricsBackdropMaxBrightness) : 1;

  fac.destroy();
  return brightnessCoefficient;
}

export default calculateBrightnessCoefficientAsync;
