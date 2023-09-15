import {
  lyricsBackdropBlurValue,
  lyricsBackdropImageSmoothingEnabled,
  lyricsBackdropElementId,
} from "../constants/constants";
import fillCanvas from "../helpers/fillCanvas";

function createLyricsBackdropElement(): HTMLCanvasElement {
  const lyricsBackdropElement = document.createElement("canvas");
  lyricsBackdropElement.id = lyricsBackdropElementId;
  fillCanvas(lyricsBackdropElement);
  const context = lyricsBackdropElement.getContext("2d") as CanvasRenderingContext2D;
  context.imageSmoothingEnabled = lyricsBackdropImageSmoothingEnabled;
  context.filter = `blur(${lyricsBackdropBlurValue}px)`;
  return lyricsBackdropElement;
}

export default createLyricsBackdropElement;
