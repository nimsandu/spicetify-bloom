import setLyricsBackdropFiltersAsync from "./modules/setLyricsBackdropFiltersAsync";
import fixLyricsActiveLineAnimation from "./modules/fixLyricsActiveLineAnimation";
import waitForElements from "../../shared/utils/waitForElements";
import {
  lyricsBackdropBlurValue,
  lyricsBackdropGlobalCompositeOperation,
  lyricsBackdropContainerId,
  lyricsCinemaSelector,
  underMainViewSelector,
  lyricsLinesSelecor,
  mainViewContainerSelector,
  lyricsContentProviderSelector,
} from "./constants/constants";
import waitForAPIs from "../../shared/utils/waitForAPIs";
import { bloomLyricsStyleSettingId } from "../../shared/constants/constants";
import calculateContextDrawValuesAsync from "./utils/calculateContextDrawValuesAsync";
import createLyricsBackdrop from "./utils/createLyricsBackdrop";
import animateLyricsBackdropChange from "./modules/animateLyricsBackdropChange";
import setLyricsLinesStyle from "./modules/setLyricsLinesStyle";
import controlFeatureStyles from "../../shared/modules/controlFeatureStyles";

class LyricsEffectsManager {
  protected static previousAlbumUri: string;

  protected static lyricsBackdropContainer: HTMLElement;

  protected static lyricsCinema: HTMLElement;

  protected static lyricsBackdrop: HTMLCanvasElement;

  protected static mainViewContainerResizeObserver: ResizeObserver;

  private static watchForLyrics(): void {
    waitForAPIs(["Spicetify.Platform.History"], () => {
      Spicetify.Platform.History.listen(LyricsEffectsManager.handleLyricsStatus);

      LyricsEffectsManager.handleLyricsStatus();
    });

    waitForElements([lyricsCinemaSelector], ([lyricsCinema]) => {
      LyricsEffectsManager.lyricsCinema = lyricsCinema as HTMLElement;
      const lyricsCinemaObserver = new MutationObserver(LyricsEffectsManager.handleLyricsStatus);
      const lyricsCinemaObserverConfig = {
        attributes: true,
        attributeFilter: ["class"],
      };
      lyricsCinemaObserver.observe(lyricsCinema, lyricsCinemaObserverConfig);

      LyricsEffectsManager.handleLyricsStatus();
    });

    waitForAPIs(["Spicetify.Player"], () => {
      Spicetify.Player.addEventListener("songchange", LyricsEffectsManager.updateLyricsEffects);
    });
  }

  private static handleLyricsStatus() {
    if (
      Spicetify.Platform.History.location.pathname.includes("lyrics") ||
      LyricsEffectsManager.lyricsCinema?.className.includes("lyricsCinemaVisible")
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

      const lyricsBackdropPrevious = LyricsEffectsManager.lyricsBackdrop;
      const contextPrevious = lyricsBackdropPrevious.getContext("2d") as CanvasRenderingContext2D;
      contextPrevious.globalCompositeOperation = lyricsBackdropGlobalCompositeOperation;

      LyricsEffectsManager.lyricsBackdrop = createLyricsBackdrop();
      const context = LyricsEffectsManager.lyricsBackdrop.getContext(
        "2d",
      ) as CanvasRenderingContext2D;
      lyricsBackdropPrevious.insertAdjacentElement(
        "beforebegin",
        LyricsEffectsManager.lyricsBackdrop,
      );

      const lyricsBackdropImage = new Image();
      lyricsBackdropImage.src = metadata.image_xlarge_url;

      lyricsBackdropImage.onload = async () => {
        const [drawWidth, drawHeight, drawX, drawY] = await calculateContextDrawValuesAsync(
          LyricsEffectsManager.lyricsBackdrop,
          lyricsBackdropBlurValue,
        );
        context.drawImage(lyricsBackdropImage, drawX, drawY, drawWidth, drawHeight);
        setLyricsBackdropFiltersAsync(
          LyricsEffectsManager.lyricsBackdrop,
          lyricsBackdropImage,
        );

        LyricsEffectsManager.updateLyricsPageProperties();
        animateLyricsBackdropChange(lyricsBackdropPrevious);
      };
    });
  }

  private static updateLyricsPageProperties(): void {
    fixLyricsActiveLineAnimation();

    if (!LyricsEffectsManager.mainViewContainerResizeObserver) {
      const mainViewContainer = document.querySelector(mainViewContainerSelector) as HTMLElement;
      LyricsEffectsManager.mainViewContainerResizeObserver = new ResizeObserver(
        fixLyricsActiveLineAnimation,
      );
      LyricsEffectsManager.mainViewContainerResizeObserver.observe(mainViewContainer);
    }

    waitForElements([lyricsContentProviderSelector], () => {
      const lyricsLines = Array.from(
        document.querySelectorAll(lyricsLinesSelecor) as NodeListOf<HTMLElement>,
      );
      setLyricsLinesStyle(lyricsLines);
    });
  }

  public static enable(): void {
    controlFeatureStyles.enable(bloomLyricsStyleSettingId);

    waitForElements([underMainViewSelector], ([underMainView]) => {
      LyricsEffectsManager.lyricsBackdropContainer = document.createElement("div");
      LyricsEffectsManager.lyricsBackdropContainer.id = lyricsBackdropContainerId;
      underMainView.prepend(LyricsEffectsManager.lyricsBackdropContainer);

      LyricsEffectsManager.lyricsBackdrop = createLyricsBackdrop();
      LyricsEffectsManager.lyricsBackdropContainer.appendChild(
        LyricsEffectsManager.lyricsBackdrop,
      );

      LyricsEffectsManager.watchForLyrics();
    });
  }
}

export default LyricsEffectsManager;
