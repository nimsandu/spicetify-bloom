import addButtonStyles from "./main/modules/addButtonStyles";
import addBlurElements from "./main/modules/addBlurElements";
import addLibraryNavLinkAccent from "./main/modules/addLibraryNavLinkAccent";
import keepTopBarContentCentered from "./main/modules/keepTopBarContentCentered";
import controlNoiseOpacity from "./main/modules/controlNoiseOpacity";
import prefetchAssets from "./main/modules/prefetchAssets";
import addSettingsAsync from "./main/modules/addSettingsAsync";

import styleCategoryCards from "./features/categoryCardBackdrops/styleCategoryCards";
import checkRequirements from "./features/checkRequirements/checkRequirements";
import LyricsEffectsManager from "./features/lyricsEffects/lyricsEffectsManager";
import hideWindowControlsBackground from "./features/hideWindowControlsBackground/hideWindowControlsBackground";
import fluentize from "./features/fluentStyle/fluentize";

import {
  bloomLyricsStyleSettingId,
  requirementsSettingId,
  windowControlsBackgroundSettingId,
  fluentStyleSettingId,
} from "./shared/constants/constants";

async function bloom(): Promise<void> {
  // const textColor = getComputedStyle(document.documentElement).getPropertyValue("--spice-text");
  // if (textColor === " #000000") {
  //   document.documentElement.style.setProperty("--filter-brightness", 0);
  // }

  addBlurElements();
  addButtonStyles();
  addLibraryNavLinkAccent();
  keepTopBarContentCentered();
  controlNoiseOpacity();
  styleCategoryCards();
  prefetchAssets();

  const settings = await addSettingsAsync();

  if (settings.getFieldValue(fluentStyleSettingId)) fluentize();
  if (settings.getFieldValue(windowControlsBackgroundSettingId)) hideWindowControlsBackground();
  if (settings.getFieldValue(bloomLyricsStyleSettingId)) LyricsEffectsManager.enable();
  if (settings.getFieldValue(requirementsSettingId)) checkRequirements();
}

export default bloom;
