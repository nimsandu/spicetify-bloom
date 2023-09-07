import gsap from "gsap";

class LyricsEffectsManager {
  protected static _previousAlbumUri: string;

  //   // eslint-disable-next-line no-undef
  //   if (typeof lyricsObserver === 'undefined') {
  //     waitForElements(['.lyrics-lyrics-contentWrapper'], () => {
  //       const lyricsContentWrapper = document.getElementsByClassName(
  //         'lyrics-lyrics-contentWrapper'
  //       )[0];
  //       const lyricsObserver = new MutationObserver(lyricsCallback);
  //       const lyricsObserverConfig = { childList: true };
  //       lyricsObserver.observe(lyricsContentWrapper, lyricsObserverConfig);
  //     });
  //     // eslint-disable-next-line no-undef
  //   } else if (lyricsObserver == null) {
  //     // eslint-disable-next-line no-undef
  //     lyricsObserver.observe(lyricsContentWrapper, lyricsObserverConfig);
  //   }
  // }
}

// gsap.to(radius, {
//      duration: 0.8,
//      value: maxRadius,
//      onUpdate: () => {
//        contextPrevious.beginPath();
//        contextPrevious.arc(centerX, centerY, radius.value, 0, Math.PI * 2);
//        contextPrevious.closePath();
//        contextPrevious.fill();
//      },
//      onComplete: async () => {
//        updateLyricsPageProperties();
//        lyricsBackdropPrevious.remove();
//      },
//      ease: "sine.out",
//    });

export default LyricsEffectsManager;
