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
  themeSettingsSectionId,
  themeSettingsSectionName,
} from "./main/constants/constants";
import {
  tippiesBackdropSettingId,
  bloomLyricsStyleSettingId,
  requirementsSettingId,
} from "./shared/constants/constants";

function reloadLocalion() {
  window.location.reload();
}

function bloom() {
  const settings = new SettingsSection(themeSettingsSectionName, themeSettingsSectionId);
  settings.addToggle(requirementsSettingId, requirementsSettingTitle, true);
  settings.addToggle(tippiesBackdropSettingId, tippiesBackdropSettingTitle, true, reloadLocalion);
  settings.addToggle(
    bloomLyricsStyleSettingId,
    bloomLyricsStyleSettingTitle,
    false,
    reloadLocalion,
  );
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
  if (settings.getFieldValue(requirementsSettingId)) checkRequirements();
  if (settings.getFieldValue(bloomLyricsStyleSettingId)) LyricsEffectsManager.enable();
}

export default bloom;
