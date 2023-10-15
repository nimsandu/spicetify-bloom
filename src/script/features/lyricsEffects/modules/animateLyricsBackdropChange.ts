import gsap from "gsap";
import {
  lyricsBackdropAnimationDurationSec,
  lyricsBackdropAnimationEasingVariant,
} from "../constants/constants";

function animateLyricsBackdropChange(lyricsBackdrop: HTMLCanvasElement): void {
  const context = lyricsBackdrop.getContext("2d") as CanvasRenderingContext2D;

  const maxRadius = Math.ceil(
    Math.sqrt(lyricsBackdrop.width ** 2 + lyricsBackdrop.height ** 2) / 2,
  );
  const centerX = lyricsBackdrop.width / 2;
  const centerY = lyricsBackdrop.height / 2;
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
      lyricsBackdrop.remove();
    },
    ease: lyricsBackdropAnimationEasingVariant,
  });
}

export default animateLyricsBackdropChange;
