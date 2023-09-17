import waitForAPIs from "../../shared/utils/waitForAPIs";
import addBackdropToCategoryCards from "./modules/addBackdropToCategoryCards";

function styleCategoryCards(): void {
  waitForAPIs(["Spicetify.Platform.History"], () => {
    const { History } = Spicetify.Platform;

    function applyStyle(): void {
      if (History.location.pathname === "/search") addBackdropToCategoryCards();
    }

    applyStyle();
    History.listen(applyStyle);
  });
}

export default styleCategoryCards;
