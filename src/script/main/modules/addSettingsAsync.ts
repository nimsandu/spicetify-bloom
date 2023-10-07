import { SettingsSection } from "spcr-settings";

import reloadLocalion from "../../shared/helpers/reloadLocation";
import getOsAsync from "../../shared/utils/getOsAsync";

import {
  themeSettingsSectionId,
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
  easterEggButtonId,
  easterEggButtonValue,
  easterEggVideoURL,
} from "../constants/constants";

import {
  requirementsSettingId,
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

  settings.addButton(easterEggButtonId, easterEggButtonDescription, easterEggButtonValue, () => {
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
