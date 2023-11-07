import { SettingsSection } from "spcr-settings";

import getImageBase64FromUrlAsync from "../utils/getImageBase64FromUrlAsync";

import {
  settingRemoveImageButtonValue,
  settingRemoveImageButtonDescription,
  settingRemoveImageButtonId,
  settingConfirmInputButtonValue,
  settingConfirmInputButtonDescription,
  settingConfirmInputButtonId,
  settingDownloadImageButtonValue,
  settingDownloadImageButtonDescription,
  settingDownloadImageButtonId,
  settingImageUrlInputDefaultValue,
  settingImageUrlInputDescription,
  settingImageUrlInputId,
  settingsSectionId,
  settingsSectionName,
  backgroundImageLocalStorageKey,
  backgroundImageUrlLocalStorageKey,
} from "../constants/constants";

function addFluentSettings(): SettingsSection {
  const { location } = window;

  const settings = new SettingsSection(settingsSectionName, settingsSectionId);

  settings.addInput(
    settingImageUrlInputId,
    settingImageUrlInputDescription,
    settingImageUrlInputDefaultValue,
  );

  settings.addButton(
    settingConfirmInputButtonId,
    settingConfirmInputButtonDescription,
    settingConfirmInputButtonValue,
    async () => {
      const imageURL: string = settings.getFieldValue(settingImageUrlInputId);
      const fluentBackgroundImage = await getImageBase64FromUrlAsync(imageURL);
      if (typeof fluentBackgroundImage === "string") {
        localStorage.setItem(backgroundImageUrlLocalStorageKey, imageURL);
      }
      location.reload();
    },
  );

  settings.addButton(
    settingDownloadImageButtonId,
    settingDownloadImageButtonDescription,
    settingDownloadImageButtonValue,
    async () => {
      const fluentBackgroundImage = await getImageBase64FromUrlAsync(
        settings.getFieldValue(settingImageUrlInputId),
      );
      if (typeof fluentBackgroundImage === "string") {
        localStorage.setItem(backgroundImageLocalStorageKey, fluentBackgroundImage);
        location.reload();
      }
    },
  );

  settings.addButton(
    settingRemoveImageButtonId,
    settingRemoveImageButtonDescription,
    settingRemoveImageButtonValue,
    () => {
      localStorage.removeItem(backgroundImageLocalStorageKey);
      location.reload();
    },
  );

  settings.pushSettings();
  return settings;
}

export default addFluentSettings;
