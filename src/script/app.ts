import { SettingsSection } from "spcr-settings";
import styleCategoryCards from "./features/categoryCardBackdrops/styleCategoryCards";
import checkRequirements from "./features/checkRequirements/checkRequirements";
import addButtonStyles from "./main/modules/addButtonStyles";
import addLibraryNavLinkAccent from "./main/modules/addLibraryNavLinkAccent";
import controlNoiseOpacity from "./main/modules/controlNoiseOpacity";
import fixTippiesBackdropFilter from "./main/modules/fixTippiesBackdropFilter";
import keepTopBarContentCentered from "./main/modules/keepTopBarContentCentered";
import LyricsEffectsManager from "./features/lyricsEffects/lyricsEffectsManager";
import {
  tippiesBackdropSettingTitle,
  bloomLyricsStyleSettingTitle,
  requirementsSettingTitle,
  windowControlsBackgroundSettingTitle,
  themeSettingsSectionId,
  themeSettingsSectionName,
} from "./main/constants/constants";
import {
  tippiesBackdropSettingId,
  bloomLyricsStyleSettingId,
  requirementsSettingId,
  windowControlsBackgroundSettingId,
} from "./shared/constants/constants";
import getOsAsync from "./shared/utils/getOsAsync";
import hideWindowControlsBackground from "./features/hideWindowControlsBackground/hideWindowControlsBackground";

function reloadLocalion() {
  window.location.reload();
}

async function bloom() {
  const settings = new SettingsSection(themeSettingsSectionName, themeSettingsSectionId);
  settings.addToggle(requirementsSettingId, requirementsSettingTitle, true);
  settings.addToggle(tippiesBackdropSettingId, tippiesBackdropSettingTitle, true, reloadLocalion);
  settings.addToggle(
    bloomLyricsStyleSettingId,
    bloomLyricsStyleSettingTitle,
    false,
    reloadLocalion,
  );
  const os = await getOsAsync();
  if (os === "windows") {
    settings.addToggle(
      windowControlsBackgroundSettingId,
      windowControlsBackgroundSettingTitle,
      false,
      reloadLocalion,
    );
  }
  settings.pushSettings();

  // const textColor = getComputedStyle(document.documentElement).getPropertyValue("--spice-text");
  // if (textColor === " #000000") {
  //   document.documentElement.style.setProperty("--filter-brightness", 0);
  // }

  addButtonStyles();
  keepTopBarContentCentered();
  addLibraryNavLinkAccent();
  controlNoiseOpacity();
  styleCategoryCards();
  if (settings.getFieldValue(tippiesBackdropSettingId)) fixTippiesBackdropFilter();
  if (settings.getFieldValue(windowControlsBackgroundSettingId)) hideWindowControlsBackground();
  if (settings.getFieldValue(bloomLyricsStyleSettingId)) LyricsEffectsManager.enable();
  if (settings.getFieldValue(requirementsSettingId)) checkRequirements();
}

export default bloom;
