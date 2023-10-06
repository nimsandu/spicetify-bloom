import { SettingsSection } from "spcr-settings";

import reloadLocalion from "../../../shared/helpers/reloadLocation";
import getImageBase64FromUrlAsync from "../utils/getImageBase64FromUrlAsync";

import {
  settingRemoveImageButtonValue,
  settingRemoveImageButtonDescription,
  settingRemoveImageButtonID,
  settingConfirmInputButtonValue,
  settingConfirmInputButtonDescription,
  settingConfirmInputButtonID,
  settingDownloadImageButtonValue,
  settingDownloadImageButtonDescription,
  settingDownloadImageButtonID,
  settingImageUrlInputDefaultValue,
  settingImageUrlInputDescription,
  settingImageUrlInputID,
  settingsSectionID,
  settingsSectionName,
  backgroundImageLocalStorageKey,
  backgroundImageUrlLocalStorageKey,
} from "../constants/constants";

function addFluentSettings(): SettingsSection {
  const settings = new SettingsSection(settingsSectionName, settingsSectionID);

  settings.addInput(
    settingImageUrlInputID,
    settingImageUrlInputDescription,
    settingImageUrlInputDefaultValue,
  );

  settings.addButton(
    settingConfirmInputButtonID,
    settingConfirmInputButtonDescription,
    settingConfirmInputButtonValue,
    async () => {
      const imageURL: string = settings.getFieldValue(settingImageUrlInputID);
      const fluentBackgroundImage = await getImageBase64FromUrlAsync(imageURL);
      if (typeof fluentBackgroundImage === "string") {
        localStorage.setItem(backgroundImageUrlLocalStorageKey, imageURL);
      }
      reloadLocalion();
    },
  );

  settings.addButton(
    settingDownloadImageButtonID,
    settingDownloadImageButtonDescription,
    settingDownloadImageButtonValue,
    async () => {
      const fluentBackgroundImage = await getImageBase64FromUrlAsync(
        settings.getFieldValue(settingImageUrlInputID),
      );
      if (typeof fluentBackgroundImage === "string") {
        localStorage.setItem(backgroundImageLocalStorageKey, fluentBackgroundImage);
        reloadLocalion();
      }
    },
  );

  settings.addButton(
    settingRemoveImageButtonID,
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
