import { FastAverageColorResult } from "fast-average-color";

function getColorSaturation(color: FastAverageColorResult): number {
  // remove alpha channel
  const value = color.value.slice(0, 3);

  const max = Math.max(...value);
  const min = Math.min(...value);
  const delta = max - min;

  return max !== 0 ? delta / max : 0;
}

export default getColorSaturation;
