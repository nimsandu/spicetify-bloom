import waitForElements from "../../shared/utils/waitForElements";
import { navItemClass, navLinkAccentClass, navLinkClass } from "../constants/constants";

function addLibraryNavLinkAccent(): void {
  waitForElements([`.${navItemClass}`], () => {
    const navLinks = document.getElementsByClassName(navLinkClass);
    for (let i = 0, max = navLinks.length; i < max; i += 1) {
      const div = document.createElement("div");
      div.classList.add(navLinkAccentClass);
      navLinks[i].appendChild(div);
    }
  });
}

export default addLibraryNavLinkAccent;
