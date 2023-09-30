import waitForElements from "../../shared/utils/waitForElements";
import { navItemSelector, navLinkAccentClass, navLinkSelector } from "../constants/constants";

function addLibraryNavLinkAccent(): void {
  waitForElements([navItemSelector], () => {
    const navLinks = Array.from(document.querySelectorAll(navLinkSelector));
    navLinks.forEach((navLink) => {
      const div = document.createElement("div");
      div.classList.add(navLinkAccentClass);
      navLink.appendChild(div);
    });
  });
}

export default addLibraryNavLinkAccent;
