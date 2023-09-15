import gsap from "gsap";
import {
  lyricsBackdropAnimationDurationSec,
  lyricsBackdropAnimationEasingVariant,
} from "../constants/constants";

function animateLyricsBackdropChange(lyricsBackdropElement: HTMLCanvasElement): void {
  const context = lyricsBackdropElement.getContext("2d") as CanvasRenderingContext2D;

  const maxRadius = Math.ceil(
    Math.sqrt(lyricsBackdropElement.width ** 2 + lyricsBackdropElement.height ** 2) / 2,
  );
  const centerX = lyricsBackdropElement.width / 2;
  const centerY = lyricsBackdropElement.height / 2;
  const radius = { value: 0 };

  gsap.to(radius, {
    duration: lyricsBackdropAnimationDurationSec,
    value: maxRadius,
    onUpdate: () => {
      context.beginPath();
      context.arc(centerX, centerY, radius.value, 0, Math.PI * 2);
      context.closePath();
      context.fill();
    },
    onComplete: () => {
      lyricsBackdropElement.remove();
    },
    ease: lyricsBackdropAnimationEasingVariant,
  });
}

export default animateLyricsBackdropChange;
