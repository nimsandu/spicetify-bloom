import gsap from "gsap";
import fillCanvas from "./modules/fillCanvas";
import fixLyricsWrapperShifting from "./modules/fixLyricsWrapperShifting";
import revealLyricsLines from "./modules/revealLyricsLines";
import setCanvasFiltersAsync from "./modules/setCanvasFiltersAsync";
import setLyricsLinesStyle from "./modules/setLyricsLinesStyle";
import waitForElements from "../../shared/utils/waitForElements";
import { lyricsCinemaClass } from "./constants/constants";
import waitForAPIs from "../../shared/utils/waitForAPIs";

class LyricsEffectsManager {
  protected static _previousAlbumUri: string;

  private static watch():void {
    waitForAPIs(['Spicetify.Platform.History'], () => {
      Spicetify.Platform.History.listen(onPageChange);
      onPageChange();
    });
  
      waitForElements([lyricsCinemaClass], () => {
        const lyricsCinema = document.getElementsByClassName(lyricsCinemaClass)[0];
        const lyricsCinemaObserver = new MutationObserver(lyricsCinemaCallback);
        const lyricsCinemaObserverConfig = {
          attributes: true,
          attributeFilter: ['class'],
        };
        lyricsCinemaObserver.observe(lyricsCinema, lyricsCinemaObserverConfig);
      });
    
  }

  private static onPageChange() {
    const lyricsBackdropContainer = document.getElementById('lyrics-backdrop-container');

    if (Spicetify.Platform.History.location.pathname.includes('lyrics')) {
      if (lyricsBackdropContainer == null) {
        initLyricsBackdrop();
      } else {
        lyricsBackdropContainer.style.display = 'unset';
        updateLyricsPageProperties();
      }
    } else {
      if (lyricsBackdropContainer != null) {
        lyricsBackdropContainer.style.display = 'none';
      }
    }
  }

  private static lyricsCinemaCallback(mutationsList) {
    const lyricsBackdropContainer = document.getElementById('lyrics-backdrop-container');
    const lyricsCinema = mutationsList[0].target;

    if (lyricsCinema.classList.contains('main-lyricsCinema-lyricsCinemaVisible')) {
      if (lyricsBackdropContainer == null) {
        initLyricsBackdrop();
      } else {
        lyricsBackdropContainer.style.display = 'unset';
        updateLyricsPageProperties();
      }
    } else if (
      lyricsBackdropContainer != null &&
      !Spicetify.Platform.History.location.pathname.includes('lyrics')
    ) {
      lyricsBackdropContainer.style.display = 'none';
    }

public static enable():void {
  
}

export default LyricsEffectsManager;
