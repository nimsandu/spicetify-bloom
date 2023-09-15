import checkHardwareAccelerationAsync from "./utils/checkHardwareAccelerationAsync";
import checkSpicetifyAndSpotifyVersions from "./utils/checkSpicetifyAndSpotifyVersions";

function checkRequirements() {
  checkSpicetifyAndSpotifyVersions();
  checkHardwareAccelerationAsync();
}

export default checkRequirements;
