import { windowControlsBackgroundSettingId } from "../../shared/constants/constants";
import controlFeatureStyles from "../../shared/modules/controlFeatureStyles";
import setControlsDimensions from "./modules/setControlsDimensions";

function hideWindowControlsBackground(): void {
  controlFeatureStyles.enable(windowControlsBackgroundSettingId);
  setControlsDimensions();
  window.onresize = setControlsDimensions;
}

export default hideWindowControlsBackground;
