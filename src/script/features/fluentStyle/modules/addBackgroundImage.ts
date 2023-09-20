import waitForElements from "../../../shared/utils/waitForElements";
import {
  backgroundImageLocalStorageKey,
  backgroundImageUrlLocalStorageKey,
} from "../constants/constants";

function addBackgroundImage(fallbackUrl: string): void {
  waitForElements([".Root__top-container"], ([rootTopContainer]) => {
    const fluentBackground = document.createElement("canvas");
    fluentBackground.classList.add("bloom-fluent-background");

    rootTopContainer.prepend(fluentBackground);

    const fluentBackgroundOverlay = document.createElement("div");
    fluentBackgroundOverlay.classList.add("bloom-fluent-background-overlay");
    fluentBackground.insertAdjacentElement("afterend", fluentBackgroundOverlay);

    const fluentStyle = window.getComputedStyle(document.documentElement);
    const blur = fluentStyle.getPropertyValue("--bloom-fluent-background-blur").trim();
    const saturate = fluentStyle.getPropertyValue("--bloom-fluent-background-saturate").trim();

    const context = fluentBackground.getContext("2d") as CanvasRenderingContext2D;
    context.imageSmoothingEnabled = false;
    context.filter = `blur(${blur}px) saturate(${saturate})`;

    const fluentBackgroundImage = new Image();
    fluentBackgroundImage.onload = () => {
      context.drawImage(
        fluentBackgroundImage,
        0,
        0,
        fluentBackground.width,
        fluentBackground.height,
      );
    };

    if (localStorage.getItem(backgroundImageLocalStorageKey)) {
      fluentBackgroundImage.src = localStorage.getItem(backgroundImageLocalStorageKey) as string;
    } else if (localStorage.getItem(backgroundImageUrlLocalStorageKey)) {
      fluentBackgroundImage.src = localStorage.getItem(backgroundImageUrlLocalStorageKey) as string;
    } else {
      fluentBackgroundImage.src = localStorage.getItem(fallbackUrl) as string;
    }
  });
}

export default addBackgroundImage;
