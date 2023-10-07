import fixLyricsContentWrapperShifting from "./modules/fixLyricsContentWrapperShifting";
import setLyricsBackdropFiltersAsync from "./modules/setLyricsBackdropFiltersAsync";
import fixLyricsActiveLineClipping from "./modules/fixLyricsActiveLineClipping";
import waitForElements from "../../shared/utils/waitForElements";
import {
  lyricsBackdropBlurValue,
  lyricsBackdropGlobalCompositeOperation,
  lyricsBackdropContainerId,
  lyricsCinemaElementSelector,
  underMainViewSelector,
  lyricsContentWrapperSelector,
  lyricsLinesSelecor,
  mainViewContainerSelector,
  lyricsContentProviderSelector,
} from "./constants/constants";
import waitForAPIs from "../../shared/utils/waitForAPIs";
import { bloomLyricsStyleSettingId } from "../../shared/constants/constants";
import calculateContextDrawValuesAsync from "./utils/calculateContextDrawValuesAsync";
import createLyricsBackdropElement from "./utils/createLyricsBackdropElement";
import animateLyricsBackdropChange from "./modules/animateLyricsBackdropChange";
import setLyricsLinesStyle from "./modules/setLyricsLinesStyle";
import enableFeatureStyles from "../../shared/modules/enableFeatureStyles";

class LyricsEffectsManager {
  protected static previousAlbumUri: string;

  protected static lyricsBackdropContainer: HTMLElement;

  protected static lyricsCinemaElement: HTMLElement;

  protected static lyricsBackdropElement: HTMLCanvasElement;

  protected static mainViewContainerResizeObserver: ResizeObserver;

  private static watchForLyrics(): void {
    waitForAPIs(["Spicetify.Platform.History"], () => {
      Spicetify.Platform.History.listen(LyricsEffectsManager.handleLyricsStatus);

      LyricsEffectsManager.handleLyricsStatus();
    });

    waitForElements([lyricsCinemaElementSelector], ([lyricsCinemaElement]) => {
      LyricsEffectsManager.lyricsCinemaElement = lyricsCinemaElement as HTMLElement;
      const lyricsCinemaObserver = new MutationObserver(LyricsEffectsManager.handleLyricsStatus);
      const lyricsCinemaObserverConfig = {
        attributes: true,
        attributeFilter: ["class"],
      };
      lyricsCinemaObserver.observe(lyricsCinemaElement, lyricsCinemaObserverConfig);

      LyricsEffectsManager.handleLyricsStatus();
    });

    waitForAPIs(["Spicetify.Player"], () => {
      Spicetify.Player.addEventListener("songchange", LyricsEffectsManager.updateLyricsEffects);
    });
  }

  private static handleLyricsStatus() {
    if (
      Spicetify.Platform.History.location.pathname.includes("lyrics") ||
      LyricsEffectsManager.lyricsCinemaElement?.className.includes("lyricsCinemaVisible")
    ) {
      LyricsEffectsManager.lyricsBackdropContainer.style.display = "unset";
      LyricsEffectsManager.updateLyricsEffects();
    } else {
      LyricsEffectsManager.lyricsBackdropContainer.style.display = "none";
    }
  }

  private static updateLyricsEffects(): void {
    waitForAPIs(["Spicetify.Player.data"], () => {
      const { metadata } = Spicetify.Player.data.item;

      if (LyricsEffectsManager.previousAlbumUri === metadata.album_uri) {
        LyricsEffectsManager.updateLyricsPageProperties();
        return;
      }
      LyricsEffectsManager.previousAlbumUri = metadata.album_uri;

      const lyricsBackdropPrevious = LyricsEffectsManager.lyricsBackdropElement;
      const contextPrevious = lyricsBackdropPrevious.getContext("2d") as CanvasRenderingContext2D;
      contextPrevious.globalCompositeOperation = lyricsBackdropGlobalCompositeOperation;

      LyricsEffectsManager.lyricsBackdropElement = createLyricsBackdropElement();
      const context = LyricsEffectsManager.lyricsBackdropElement.getContext(
        "2d",
      ) as CanvasRenderingContext2D;
      lyricsBackdropPrevious.insertAdjacentElement(
        "beforebegin",
        LyricsEffectsManager.lyricsBackdropElement,
      );

      const lyricsBackdropImage = new Image();
      lyricsBackdropImage.src = metadata.image_xlarge_url;

      lyricsBackdropImage.onload = async () => {
        const [drawWidth, drawHeight, drawX, drawY] = await calculateContextDrawValuesAsync(
          LyricsEffectsManager.lyricsBackdropElement,
          lyricsBackdropBlurValue,
        );
        context.drawImage(lyricsBackdropImage, drawX, drawY, drawWidth, drawHeight);
        setLyricsBackdropFiltersAsync(
          LyricsEffectsManager.lyricsBackdropElement,
          lyricsBackdropImage,
        );

        LyricsEffectsManager.updateLyricsPageProperties();
        animateLyricsBackdropChange(lyricsBackdropPrevious);
      };
    });
  }

  private static updateLyricsPageProperties(): void {
    waitForElements([lyricsContentWrapperSelector], ([lyricsContentWrapper]) => {
      fixLyricsContentWrapperShifting(lyricsContentWrapper as HTMLElement);
      fixLyricsActiveLineClipping(lyricsContentWrapper as HTMLElement);

      const mainViewContainer = document.querySelector(mainViewContainerSelector) as HTMLElement;
      if (LyricsEffectsManager.mainViewContainerResizeObserver) {
        LyricsEffectsManager.mainViewContainerResizeObserver.disconnect();
      }
      LyricsEffectsManager.mainViewContainerResizeObserver = new ResizeObserver(() => {
        fixLyricsContentWrapperShifting(lyricsContentWrapper as HTMLElement);
        fixLyricsActiveLineClipping(lyricsContentWrapper as HTMLElement);
      });
      LyricsEffectsManager.mainViewContainerResizeObserver.observe(mainViewContainer);

      waitForElements([lyricsContentProviderSelector], () => {
        const lyricsLines = Array.from(
          lyricsContentWrapper.querySelectorAll(lyricsLinesSelecor) as NodeListOf<HTMLElement>,
        );
        setLyricsLinesStyle(lyricsLines);
      });
    });
  }

  public static enable(): void {
    enableFeatureStyles(bloomLyricsStyleSettingId);

    waitForElements([underMainViewSelector], ([underMainView]) => {
      LyricsEffectsManager.lyricsBackdropContainer = document.createElement("div");
      LyricsEffectsManager.lyricsBackdropContainer.id = lyricsBackdropContainerId;
      underMainView.prepend(LyricsEffectsManager.lyricsBackdropContainer);

      LyricsEffectsManager.lyricsBackdropElement = createLyricsBackdropElement();
      LyricsEffectsManager.lyricsBackdropContainer.appendChild(
        LyricsEffectsManager.lyricsBackdropElement,
      );

      LyricsEffectsManager.watchForLyrics();
    });
  }
}

export default LyricsEffectsManager;
