import { SettingsSection } from "spcr-settings";

import reloadLocalion from "../../shared/helpers/reloadLocation";
import getOsAsync from "../../shared/utils/getOsAsync";

import {
  themeSettingsSectionID,
  themeSettingsSectionName,
  requirementsSettingDefaultValue,
  requirementsSettingTitle,
  bloomLyricsStyleSettingDefaultValue,
  bloomLyricsStyleSettingTitle,
  windowControlsBackgroundSettingDefaultValue,
  windowControlsBackgroundSettingTitle,
  fluentStyleSettingDefaultValue,
  fluentStyleSettingTitle,
  easterEggButtonDescription,
  easterEggButtonID,
  easterEggButtonValue,
  easterEggVideoURL,
} from "../constants/constants";

import {
  requirementsSettingID,
  bloomLyricsStyleSettingID,
  windowControlsBackgroundSettingID,
  fluentStyleSettingID,
} from "../../shared/constants/constants";

async function addSettingsAsync(): Promise<SettingsSection> {
  const settings = new SettingsSection(themeSettingsSectionName, themeSettingsSectionID);

  settings.addToggle(
    requirementsSettingID,
    requirementsSettingTitle,
    requirementsSettingDefaultValue,
    reloadLocalion,
  );

  settings.addToggle(
    bloomLyricsStyleSettingID,
    bloomLyricsStyleSettingTitle,
    bloomLyricsStyleSettingDefaultValue,
    reloadLocalion,
  );

  const os = await getOsAsync();
  if (os === "windows") {
    settings.addToggle(
      windowControlsBackgroundSettingID,
      windowControlsBackgroundSettingTitle,
      windowControlsBackgroundSettingDefaultValue,
      reloadLocalion,
    );
  }

  settings.addToggle(
    fluentStyleSettingID,
    fluentStyleSettingTitle,
    fluentStyleSettingDefaultValue,
    reloadLocalion,
  );

  settings.addButton(easterEggButtonID, easterEggButtonDescription, easterEggButtonValue, () => {
    const videoElement = document.createElement("video");
    videoElement.style.position = "absolute";
    videoElement.style.width = "100%";
    videoElement.style.height = "100%";
    videoElement.onloadedmetadata = () => {
      videoElement.play();
      document.body.appendChild(videoElement);
    };
    videoElement.onended = () => {
      videoElement.remove();
    };
    videoElement.src = easterEggVideoURL;
  });

  settings.pushSettings();
  return settings;
}

export default addSettingsAsync;
