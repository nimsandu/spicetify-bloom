import { SettingsSection } from "spcr-settings";
import styleCategoryCards from "./features/categoryCardBackdrops/styleCategoryCards";
import checkRequirements from "./features/checkRequirements/checkRequirements";
import addButtonStyles from "./main/modules/addButtonStyles";
import addLibraryNavLinkAccent from "./main/modules/addLibraryNavLinkAccent";
import controlNoiseOpacity from "./main/modules/controlNoiseOpacity";
import fixTippiesBackdropFilter from "./main/modules/fixTippiesBackdropFilter";
import keepTopBarContentCentered from "./main/modules/keepTopBarContentCentered";

async function bloom() {
  const settings = new SettingsSection("Bloom theme settings", "bloom-settings");
  settings.addToggle("check-requirements", "Check the theme requirements", true);
  settings.addToggle(
    "fix-tippies-backdrop-filter",
    "Fix some menus and flyouts blur (might be resource intensive)",
    true,
    () => {
      window.location.reload();
    },
  );
  settings.pushSettings();

  // const textColor = getComputedStyle(document.documentElement).getPropertyValue("--spice-text");
  // if (textColor === " #000000") {
  //   document.documentElement.style.setProperty("--filter-brightness", 0);
  // }

  addButtonStyles();
  keepTopBarContentCentered();
  addLibraryNavLinkAccent();
  controlNoiseOpacity();
  styleCategoryCards();
  if (settings.getFieldValue("fix-tippies-backdrop-filter")) fixTippiesBackdropFilter();
  if (settings.getFieldValue("check-requirements")) checkRequirements();
}

export default bloom;
