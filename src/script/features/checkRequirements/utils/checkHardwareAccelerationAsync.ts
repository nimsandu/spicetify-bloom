import {
  hardwareAccelerationPrefsKey,
  hardwareAccelerationWarningMessage,
} from "../constants/constants";

async function checkHardwareAccelerationAsync(): Promise<void> {
  if (!Spicetify.Platform?.PlayerAPI || !Spicetify.showNotification) {
    setTimeout(checkHardwareAccelerationAsync, 100);
    return;
  }

  // eslint-disable-next-line no-underscore-dangle
  const { entries } = await Spicetify.Platform.PlayerAPI._prefs.get({
    key: hardwareAccelerationPrefsKey,
  });
  const hardwareAccelerationEnabled = entries[hardwareAccelerationPrefsKey].bool;

  if (!hardwareAccelerationEnabled) {
    Spicetify.showNotification(hardwareAccelerationWarningMessage);
  }
}

export default checkHardwareAccelerationAsync;
