import addButtonStyles from "./main/modules/addButtonStyles";
import addLibraryNavLinkAccent from "./main/modules/addLibraryNavLinkAccent";
import controlNoiseOpacity from "./main/modules/controlNoiseOpacity";
import fixTippiesBackdropFilter from "./main/modules/fixTippiesBackdropFilter";
import keepTopBarContentCentered from "./main/modules/keepTopBarContentCentered";

async function bloom() {
  // const textColor = getComputedStyle(document.documentElement).getPropertyValue("--spice-text");
  // if (textColor === " #000000") {
  //   document.documentElement.style.setProperty("--filter-brightness", 0);
  // }

  addButtonStyles();
  keepTopBarContentCentered();
  addLibraryNavLinkAccent();
  controlNoiseOpacity();
  fixTippiesBackdropFilter();
}

export default bloom;
