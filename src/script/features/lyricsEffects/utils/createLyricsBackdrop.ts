import {
  lyricsBackdropBlurValue,
  lyricsBackdropImageSmoothingEnabled,
  lyricsBackdropId,
} from "../constants/constants";
import fillCanvas from "../helpers/fillCanvas";

function createLyricsBackdrop(): HTMLCanvasElement {
  const lyricsBackdropElement = document.createElement("canvas");
  lyricsBackdropElement.id = lyricsBackdropId;
  fillCanvas(lyricsBackdropElement);
  const context = lyricsBackdropElement.getContext("2d") as CanvasRenderingContext2D;
  context.imageSmoothingEnabled = lyricsBackdropImageSmoothingEnabled;
  context.filter = `blur(${lyricsBackdropBlurValue}px)`;
  return lyricsBackdropElement;
}

export default createLyricsBackdrop;
