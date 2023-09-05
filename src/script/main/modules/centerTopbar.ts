import waitForElements from "../../shared/utils/waitForElements";
import { topbarContentWrapperSelector } from "../constants/constants";

function centerTopbar(): void {
  waitForElements([topbarContentWrapperSelector], ([topBarContentWrapper]) => {
    if (topBarContentWrapper instanceof HTMLElement) {
      const left = topBarContentWrapper.offsetLeft;
      const right = window.innerWidth - (left + topBarContentWrapper.offsetWidth);

      const max = window.innerWidth / 2;
      if (left <= 0 || right <= 0 || left > max || right > max) return;

      const { style } = topBarContentWrapper;
      const marginLeft = parseInt(style.marginLeft, 10);
      const diff = right - left + (marginLeft || 0);
      if (diff !== 0) style.marginLeft = `${diff}px`;
    }
  });
}

export default centerTopbar;
