import waitForAPIs from "../../shared/utils/waitForAPIs";
import injectStyle from "../../shared/modules/injectStyle";
import cleanLocalizationString from "../utils/cleanLocalizationString";
import { fluentIconsURL } from "../../shared/constants/constants";

function addButtonStyles(): void {
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

export default addButtonStyles;
