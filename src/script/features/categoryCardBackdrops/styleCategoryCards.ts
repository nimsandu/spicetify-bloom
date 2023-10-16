import waitForSpicetifyAPIs from "../../shared/utils/waitForSpicetifyAPIs";
import addBackdropToCategoryCards from "./modules/addBackdropToCategoryCards";

function styleCategoryCards(): void {
  waitForSpicetifyAPIs(["Spicetify.Platform.History"], ([History]) => {
    function applyStyle(): void {
      if (History.location.pathname === "/search") addBackdropToCategoryCards();
    }

    applyStyle();
    History.listen(applyStyle);
  });
}

export default styleCategoryCards;
