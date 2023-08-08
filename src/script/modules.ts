import {
  waitForAPIs,
  cleanLocalizationString,
  injectStyle,
  waitForElements,
  calculateLyricsMaxWidth,
  getTextLineDirection,
} from "./utils";
import { fluentIconsURL, lightNoiseOpacityValue, noiseOpacityVariable } from "./constants";

export function addButtonsStyles(): void {
  waitForAPIs(["Spicetify.Locale"], () => {
    const { Locale } = Spicetify;

    const playlistPlayText = cleanLocalizationString(Locale.get("playlist.a11y.play") as string);
    const playlistPauseText = cleanLocalizationString(Locale.get("playlist.a11y.pause") as string);
    const tracklistPlayText = Locale.get("tracklist.a11y.play") as string;
    const playbackPauseText = Locale.get("playback-control.pause");
    const playbackPlayText = Locale.get("playback-control.play");
    const playText = Locale.get("play");
    const pauseText = Locale.get("pause");

    let tracklistPlayLabelOne;
    let tracklistPlayLabelTwo;
    if (["zh-CN", "zh-TW", "am", "fi"].includes(Locale.getLocale())) {
      [tracklistPlayLabelOne, tracklistPlayLabelTwo] = tracklistPlayText.split("{1}");
    } else {
      [tracklistPlayLabelOne, tracklistPlayLabelTwo] = tracklistPlayText.split("{0}");
    }
    tracklistPlayLabelOne = cleanLocalizationString(tracklistPlayLabelOne);
    tracklistPlayLabelTwo = cleanLocalizationString(tracklistPlayLabelTwo);

    injectStyle(`
    .main-playButton-button[aria-label*="${playText}"],
    .main-playPauseButton-button[aria-label="${playText}"][aria-label="${playbackPlayText}"],
    .main-trackList-rowPlayPauseButton[aria-label*="${playText}"],
    .main-trackList-rowImagePlayButton[aria-label*="${tracklistPlayLabelOne}"][aria-label*="${tracklistPlayLabelTwo}"],
    .main-playButton-PlayButton>button[aria-label*="${playlistPlayText}"][aria-label*="${playText}"] {
      background-color: var(--spice-text) !important;
      -webkit-mask-image: url('${fluentIconsURL}/ic_fluent_play_24_filled.svg') !important;
    }
    .main-playButton-button[aria-label*="${pauseText}"],
    .main-playPauseButton-button[aria-label*="${pauseText}"][aria-label="${playbackPauseText}"],
    .main-trackList-rowPlayPauseButton[aria-label*="${pauseText}"],
    .main-trackList-rowImagePlayButton[aria-label*="${pauseText}"],
    .main-playButton-PlayButton>button[aria-label*="${playlistPauseText}"][aria-label*="${pauseText}"] {
      background-color: var(--spice-text) !important;
      -webkit-mask-image: url('${fluentIconsURL}/ic_fluent_pause_16_filled.svg') !important;
    }

    .main-yourLibraryX-button[aria-label*="${Locale.get(
      "web-player.your-library-x.enlarge-your-library",
    )}"] span {
      background-color: var(--spice-text) !important;
      -webkit-mask-image: url('${fluentIconsURL}/ic_fluent_arrow_right_24_filled.svg') !important;
      width: 18px;
      height: 18px;
    }
    .main-yourLibraryX-button[aria-label*="${Locale.get(
      "web-player.your-library-x.reduce-your-library",
    )}"] span {
      background-color: var(--spice-text) !important;
      -webkit-mask-image: url('${fluentIconsURL}/ic_fluent_arrow_left_24_filled.svg') !important;
      width: 18px;
      height: 18px;
    }
    .main-yourLibraryX-button[aria-label*="${Locale.get(
      "web-player.your-library-x.grid-view",
    )}"] span {
      background-color: var(--spice-text) !important;
      -webkit-mask-image: url('${fluentIconsURL}/ic_fluent_table_simple_24_regular.svg') !important;
      width: 18px;
      height: 18px;
    }
    .main-yourLibraryX-button[aria-label*="${Locale.get(
      "web-player.your-library-x.list-view",
    )}"] span {
      background-color: var(--spice-text) !important;
      -webkit-mask-image: url('${fluentIconsURL}/ic_fluent_text_bullet_list_ltr_24_filled.svg') !important;
      width: 18px;
      height: 18px;
    }
    .main-yourLibraryX-button[aria-label*="${Locale.get(
      "web-player.your-library-x.create.button-label",
    )}"] span {
      background-color: var(--spice-text) !important;
      -webkit-mask-image: url('${fluentIconsURL}/ic_fluent_add_24_filled.svg') !important;
      width: 18px;
      height: 18px;
    }
  `);
  });
}

// see https://github.com/nimsandu/spicetify-bloom/issues/220#issuecomment-1555071865
export function moveTippies(mutationsList: MutationRecord[]): void {
  mutationsList.forEach((mutation) => {
    mutation.addedNodes?.forEach((addedNode) => {
      if (addedNode instanceof HTMLElement && addedNode.id?.includes("tippy")) {
        const { parentNode } = addedNode;
        if (
          parentNode instanceof HTMLElement &&
          parentNode !== document.body &&
          !parentNode.classList?.contains("lyrics-tooltip-wrapper") &&
          !parentNode.classList?.contains("main-contextMenu-menuItem")
        ) {
          addedNode.classList.add("encore-dark-theme");
          document.body.appendChild(addedNode);
        }
      }
    });
  });
  // trigger element postition correction
  window.dispatchEvent(new Event("resize"));
}

export function centerTopbar(): void {
  waitForElements([".main-topBar-topbarContentWrapper"], ([topBarContentWrapper]) => {
    if (topBarContentWrapper instanceof HTMLElement) {
      const left = topBarContentWrapper.offsetLeft;
      const right = window.innerWidth - (left + topBarContentWrapper.offsetWidth);

      const max = window.innerWidth / 2;
      if (left <= 0 || right <= 0 || left > max || right > max) {
        return;
      }

      let diff;
      if (topBarContentWrapper.style.marginLeft !== "") {
        diff = right - left + parseInt(topBarContentWrapper.style.marginLeft, 10);
      } else {
        diff = right - left;
      }

      if (diff !== 0) {
        // eslint-disable-next-line no-param-reassign
        topBarContentWrapper.style.marginLeft = `${diff}px`;
      }
    }
  });
}

export function addBackdropToCategoryCards(): void {
  waitForElements([".x-categoryCard-image"], () => {
    const cards = document.getElementsByClassName("x-categoryCard-CategoryCard");
    const cardImages = document.getElementsByClassName("x-categoryCard-image");

    for (let i = 0, max = cards.length; i < max; i += 1) {
      if (cards[i] instanceof HTMLElement && cardImages[i] instanceof HTMLImageElement) {
        if (cardImages[i].previousElementSibling?.className !== "x-categoryCard-backdrop") {
          const { backgroundColor } = (cards[i] as HTMLElement).style;
          const { src } = cardImages[i] as HTMLImageElement;

          const cardBackdrop = document.createElement("div");
          cardBackdrop.classList.add("x-categoryCard-backdrop");
          cardBackdrop.style.backgroundImage = `url(${src})`;
          cardBackdrop.style.backgroundColor = `${backgroundColor}`;

          cardImages[i].insertAdjacentElement("beforebegin", cardBackdrop);
        }
      }
    }
  });
}

export function setNoiseOpacity(value: string): void {
  document.documentElement.style.setProperty(noiseOpacityVariable, value);
}

export function watchForMarketplaceScheme(): void {
  waitForElements([".marketplaceScheme"], ([marketplaceScheme]) => {
    const schemeObserver = new MutationObserver(() => {
      if (Spicetify.Config.color_scheme.includes("light")) setNoiseOpacity(lightNoiseOpacityValue);
    });
    schemeObserver.observe(marketplaceScheme, { attributes: true });
  });
}

export function setLyricsLinesProperties(
  lyricsLines: NodeListOf<HTMLElement>,
  lyricsWrapper: HTMLElement,
): void {
  const maxWidth = calculateLyricsMaxWidth(lyricsWrapper);
  for (let i = 0, max = lyricsLines.length; i < max; i += 1) {
    const lyricsLine = lyricsLines[i];
    lyricsLine.style.maxWidth = `${maxWidth}px`;
    lyricsLine.style.transformOrigin =
      getTextLineDirection(lyricsLine.innerText) === "rtl" ? "right" : "left";
  }
}

export function fixLyricsWrapperMaxWidth(lyricsWrapper: HTMLElement): void {
  const lyricsWrapperWidth = lyricsWrapper.getBoundingClientRect().width;
  /* eslint-disable no-param-reassign */
  lyricsWrapper.style.maxWidth = "";
  lyricsWrapper.style.width = "";
  lyricsWrapper.style.maxWidth = `${lyricsWrapperWidth}px`;
  lyricsWrapper.style.width = `${lyricsWrapperWidth}px`;
  /* eslint-enable no-param-reassign */
}
