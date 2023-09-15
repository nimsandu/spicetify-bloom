import { FastAverageColor, FastAverageColorResource } from "fast-average-color";

async function getImageSaturationAsync(resource: FastAverageColorResource): Promise<number> {
  const fac = new FastAverageColor();
  // ignore black and almost black colors
  const averageColor = await fac.getColorAsync(resource, { ignoredColor: [0, 0, 0, 255, 10] });

  // slice(0, 3) - remove alpha channel
  const colors = averageColor.value.slice(0, 3);
  const max = Math.max(...colors);
  const min = Math.min(...colors);
  const delta = max - min;

  const averageColorSaturation = max !== 0 ? delta / max : 0;
  fac.destroy();
  return averageColorSaturation;
}

export default getImageSaturationAsync;
