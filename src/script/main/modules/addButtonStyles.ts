import waitForAPIs from "../../shared/utils/waitForAPIs";
import injectStyle from "../../shared/modules/injectStyle";
import { fluentIconsURL } from "../../shared/constants/constants";
import isObjectEmpty from "../../shared/helpers/isObjectEmpty";

function cleanLocalizationString(input: string): string {
  return input.replace(/[{0}{1}«»”“]/g, "").trim();
}

function addButtonStyles(): void {
  waitForAPIs(["Spicetify.Locale"], async () => {
    const { Locale } = Spicetify;
    let dictionary = Locale.getDictionary();

    while (isObjectEmpty(dictionary)) {
      // eslint-disable-next-line no-await-in-loop, no-promise-executor-return
      await new Promise((resolve) => setTimeout(resolve, 100));
      dictionary = Locale.getDictionary();
    }

    const playlistPlayText = cleanLocalizationString(dictionary["playlist.a11y.play"] as string);
    const playlistPauseText = cleanLocalizationString(dictionary["playlist.a11y.pause"] as string);
    const tracklistPlayText = dictionary["tracklist.a11y.play"] as string;
    const playbackPauseText = dictionary["playback-control.pause"];
    const playbackPlayText = dictionary["playback-control.play"];
    const playText = dictionary.play;
    const pauseText = dictionary.pause;

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
    .main-playPauseButton-button[aria-label="${playText}"],
    .main-playPauseButton-button[aria-label="${playbackPlayText}"],
    .main-trackList-rowPlayPauseButton[aria-label*="${playText}"],
    .main-trackList-rowImagePlayButton[aria-label*="${tracklistPlayLabelOne}"],
    .main-trackList-rowImagePlayButton[aria-label*="${tracklistPlayLabelTwo}"],
    .main-playButton-PlayButton>button[aria-label*="${playlistPlayText}"],
    .main-playButton-PlayButton>button[aria-label*="${playText}"] {
      background-color: var(--spice-text) !important;
      -webkit-mask-image: url('${fluentIconsURL}/ic_fluent_play_24_filled.svg') !important;
    }
    .main-playButton-button[aria-label*="${pauseText}"],
    .main-playPauseButton-button[aria-label*="${pauseText}"],
    .main-playPauseButton-button[aria-label="${playbackPauseText}"],
    .main-trackList-rowPlayPauseButton[aria-label*="${pauseText}"],
    .main-trackList-rowImagePlayButton[aria-label*="${pauseText}"],
    .main-playButton-PlayButton>button[aria-label*="${playlistPauseText}"],
    .main-playButton-PlayButton>button[aria-label*="${pauseText}"] {
      background-color: var(--spice-text) !important;
      -webkit-mask-image: url('${fluentIconsURL}/ic_fluent_pause_16_filled.svg') !important;
    }

    .main-yourLibraryX-button[aria-label*="${dictionary["web-player.your-library-x.enlarge-your-library"]}"] span {
      background-color: var(--spice-text) !important;
      -webkit-mask-image: url('${fluentIconsURL}/ic_fluent_arrow_right_24_filled.svg') !important;
      width: 18px;
      height: 18px;
    }
    .main-yourLibraryX-button[aria-label*="${dictionary["web-player.your-library-x.reduce-your-library"]}"] span {
      background-color: var(--spice-text) !important;
      -webkit-mask-image: url('${fluentIconsURL}/ic_fluent_arrow_left_24_filled.svg') !important;
      width: 18px;
      height: 18px;
    }
    .main-yourLibraryX-button[aria-label*="${dictionary["web-player.your-library-x.grid-view"]}"] span {
      background-color: var(--spice-text) !important;
      -webkit-mask-image: url('${fluentIconsURL}/ic_fluent_table_simple_24_regular.svg') !important;
      width: 18px;
      height: 18px;
    }
    .main-yourLibraryX-button[aria-label*="${dictionary["web-player.your-library-x.list-view"]}"] span {
      background-color: var(--spice-text) !important;
      -webkit-mask-image: url('${fluentIconsURL}/ic_fluent_text_bullet_list_ltr_24_filled.svg') !important;
      width: 18px;
      height: 18px;
    }
    .main-yourLibraryX-button[aria-label*="${dictionary["web-player.your-library-x.create.button-label"]}"] span {
      background-color: var(--spice-text) !important;
      -webkit-mask-image: url('${fluentIconsURL}/ic_fluent_add_24_filled.svg') !important;
      width: 18px;
      height: 18px;
    }
  `);
  });
}

export default addButtonStyles;
