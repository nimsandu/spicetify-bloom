import waitForElements from "../../shared/utils/waitForElements";
import {
  playingBarBlurClass,
  playingBarContainerSelector,
  topBarBlurClass,
  topBarContainerSelector,
} from "../constants/constants";

function addBlurElements(): void {
  waitForElements(
    [playingBarContainerSelector, topBarContainerSelector],
    ([playingBarContainer, mainTopBarContainer]) => {
      const playingBarBlur = document.createElement("div");
      playingBarBlur.classList.add(playingBarBlurClass);
      playingBarContainer.insertAdjacentElement("beforebegin", playingBarBlur);

      const topBarBlur = document.createElement("div");
      topBarBlur.classList.add(topBarBlurClass);
      mainTopBarContainer.insertAdjacentElement("beforebegin", topBarBlur);
    },
  );
}

export default addBlurElements;
