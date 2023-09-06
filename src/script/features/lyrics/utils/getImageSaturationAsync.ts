import { FastAverageColor, FastAverageColorResource } from "fast-average-color";
import getColorSaturation from "./getColorSaturation";

async function getImageSaturationAsync(resource: FastAverageColorResource): Promise<number> {
  const fac = new FastAverageColor();

  // ignore black and almost black colors
  const averageColor = await fac.getColorAsync(resource, { ignoredColor: [0, 0, 0, 255, 10] });
  const averageColorSaturation = getColorSaturation(averageColor);

  fac.destroy();
  return averageColorSaturation;
}

export default getImageSaturationAsync;
