import { windowControlsBackgroundSettingId } from "../../shared/constants/constants";
import enableFeatureStyles from "../../shared/modules/enableFeatureStyles";
import setControlsDimensions from "./modules/setControlsDimensions";

function hideWindowControlsBackground(): void {
  enableFeatureStyles(windowControlsBackgroundSettingId);
  setControlsDimensions();
  window.onresize = setControlsDimensions;
}

export default hideWindowControlsBackground;
