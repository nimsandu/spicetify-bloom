import { SettingsSection } from "spcr-settings";

import reloadLocalion from "../../shared/helpers/reloadLocation";
import getOsAsync from "../../shared/utils/getOsAsync";

import {
  themeSettingsSectionId,
  themeSettingsSectionName,
  requirementsSettingDefaultValue,
  requirementsSettingTitle,
  tippiesBackdropSettingDefaultValue,
  tippiesBackdropSettingTitle,
  bloomLyricsStyleSettingDefaultValue,
  bloomLyricsStyleSettingTitle,
  windowControlsBackgroundSettingDefaultValue,
  windowControlsBackgroundSettingTitle,
  fluentStyleSettingDefaultValue,
  fluentStyleSettingTitle,
} from "../constants/constants";

import {
  requirementsSettingId,
  tippiesBackdropSettingId,
  bloomLyricsStyleSettingId,
  windowControlsBackgroundSettingId,
  fluentStyleSettingId,
} from "../../shared/constants/constants";

async function addSettingsAsync(): Promise<SettingsSection> {
  const settings = new SettingsSection(themeSettingsSectionName, themeSettingsSectionId);

  settings.addToggle(
    requirementsSettingId,
    requirementsSettingTitle,
    requirementsSettingDefaultValue,
    reloadLocalion,
  );

  settings.addToggle(
    tippiesBackdropSettingId,
    tippiesBackdropSettingTitle,
    tippiesBackdropSettingDefaultValue,
    reloadLocalion,
  );

  settings.addToggle(
    bloomLyricsStyleSettingId,
    bloomLyricsStyleSettingTitle,
    bloomLyricsStyleSettingDefaultValue,
    reloadLocalion,
  );

  const os = await getOsAsync();
  if (os === "windows") {
    settings.addToggle(
      windowControlsBackgroundSettingId,
      windowControlsBackgroundSettingTitle,
      windowControlsBackgroundSettingDefaultValue,
      reloadLocalion,
    );
  }

  settings.addToggle(
    fluentStyleSettingId,
    fluentStyleSettingTitle,
    fluentStyleSettingDefaultValue,
    reloadLocalion,
  );

  settings.pushSettings();
  return settings;
}

export default addSettingsAsync;
