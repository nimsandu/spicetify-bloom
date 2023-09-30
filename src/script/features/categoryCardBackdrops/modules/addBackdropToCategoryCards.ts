import waitForElements from "../../../shared/utils/waitForElements";
import {
  categoryCardBackdropClass,
  categoryCardImageSelector,
  categoryCardSelector,
} from "../constants/constants";

function addBackdropToCategoryCards(): void {
  waitForElements([categoryCardImageSelector], () => {
    const cards = Array.from(document.querySelectorAll(categoryCardSelector));
    cards.forEach((card) => {
      const cardImage = card.querySelector(categoryCardImageSelector);
      if (
        card instanceof HTMLElement &&
        cardImage instanceof HTMLImageElement &&
        cardImage.previousElementSibling?.className !== categoryCardBackdropClass
      ) {
        const cardBackdrop = document.createElement("div");
        cardBackdrop.classList.add(categoryCardBackdropClass);
        cardBackdrop.style.backgroundImage = `url(${cardImage.src})`;
        cardBackdrop.style.backgroundColor = `${card.style.backgroundColor}`;
        cardImage.insertAdjacentElement("beforebegin", cardBackdrop);
      }
    });
  });
}

export default addBackdropToCategoryCards;
