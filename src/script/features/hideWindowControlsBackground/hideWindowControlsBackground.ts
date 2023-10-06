import { windowControlsBackgroundSettingID } from "../../shared/constants/constants";
import enableFeatureStyles from "../../shared/modules/enableFeatureStyles";
import setControlsDimensions from "./modules/setControlsDimensions";

function hideWindowControlsBackground(): void {
  enableFeatureStyles(windowControlsBackgroundSettingID);
  setControlsDimensions();
  window.onresize = setControlsDimensions;
}

export default hideWindowControlsBackground;
