import waitForElements from "../../shared/utils/waitForElements";
import { playingBarBlurClass } from "../constants/constants";

function addBlurElements(): void {
  waitForElements([".main-nowPlayingBar-container"], ([playingBarContainer]) => {
    const playingBarBlur = document.createElement("div");
    playingBarBlur.classList.add(playingBarBlurClass);
    playingBarContainer.insertAdjacentElement("beforebegin", playingBarBlur);
  });
}

export default addBlurElements;
