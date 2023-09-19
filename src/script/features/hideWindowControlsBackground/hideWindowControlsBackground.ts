import { windowControlsBackgroundSettingId } from "../../shared/constants/constants";
import setControlsDimensions from "./modules/setControlsDimensions";

function hideWindowControlsBackground(): void {
  document.body.classList.add(windowControlsBackgroundSettingId);
  setControlsDimensions();
  window.onresize = setControlsDimensions;
}

export default hideWindowControlsBackground;
