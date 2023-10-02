import waitForElements from "../../shared/utils/waitForElements";
import { playingBarBlurClass, playingBarBlurBorderClass } from "../constants/constants";

function addBlurElements(): void {
  waitForElements([".main-nowPlayingBar-container"], ([playingBarContainer]) => {
    const playingBarBlur = document.createElement("div");
    playingBarBlur.classList.add(playingBarBlurClass);

    const playingBarBlurBorder = document.createElement("div");
    playingBarBlurBorder.classList.add(playingBarBlurBorderClass);

    playingBarContainer.insertAdjacentElement("beforebegin", playingBarBlur);
    playingBarContainer.insertAdjacentElement("beforebegin", playingBarBlurBorder);
  });
}

export default addBlurElements;
