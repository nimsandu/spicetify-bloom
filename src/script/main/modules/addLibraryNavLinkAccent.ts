import waitForElements from "../../shared/utils/waitForElements";

function addLibraryNavLinkAccent(): void {
  waitForElements(["."], () => {
    const navLinks = document.getElementsByClassName("main-yourLibraryX-navLink");
    for (let i = 0; i < navLinks.length; i += 1) {
      const div = document.createElement("div");
      div.classList.add("main-yourLibraryX-navLink-accent");
      navLinks[i].appendChild(div);
    }
  });
}

export default addLibraryNavLinkAccent;
