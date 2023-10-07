import { SettingsSection } from "spcr-settings";

import reloadLocalion from "../../../shared/helpers/reloadLocation";
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
      reloadLocalion();
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
        reloadLocalion();
      }
    },
  );

  settings.addButton(
    settingRemoveImageButtonId,
    settingRemoveImageButtonDescription,
    settingRemoveImageButtonValue,
    () => {
      localStorage.removeItem(backgroundImageLocalStorageKey);
      reloadLocalion();
    },
  );

  settings.pushSettings();
  return settings;
}

export default addFluentSettings;
