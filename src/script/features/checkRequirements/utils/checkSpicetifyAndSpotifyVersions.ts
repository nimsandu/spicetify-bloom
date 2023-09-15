import {
  minimalSpotifyVersion,
  minimalSpicetifyVersion,
  spotifyVersionWarningMessage,
  spicetifyVersionWarningMessage,
  notificationDisplayTimeMS,
} from "../constants/constants";
import convertVersionToNumber from "../helpers/convertVersionToNumber";

function checkSpicetifyAndSpotifyVersions(): void {
  if (!Spicetify.Platform?.PlatformData || !Spicetify.showNotification) {
    setTimeout(checkSpicetifyAndSpotifyVersions, 100);
    return;
  }

  const currentSpicetifyVersion = Spicetify.Config.version;
  const currentSpotifyVersion = Spicetify.Platform.PlatformData.client_version_triple;

  if (
    convertVersionToNumber(currentSpicetifyVersion) <
    convertVersionToNumber(minimalSpicetifyVersion)
  ) {
    Spicetify.showNotification(
      `${spicetifyVersionWarningMessage} <br/> Minimal: ${minimalSpicetifyVersion}; current: ${currentSpicetifyVersion}`,
      false,
      notificationDisplayTimeMS,
    );
  }

  if (
    convertVersionToNumber(currentSpotifyVersion) < convertVersionToNumber(minimalSpotifyVersion)
  ) {
    setTimeout(() => {
      Spicetify.showNotification(
        `${spotifyVersionWarningMessage} <br/> Minimal: ${minimalSpotifyVersion}; current: ${currentSpotifyVersion}`,
        false,
        notificationDisplayTimeMS,
      );
    }, notificationDisplayTimeMS);
  }
}

export default checkSpicetifyAndSpotifyVersions;
