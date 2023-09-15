import waitForElements from "../../../shared/utils/waitForElements";
import {
  categoryCardBackdropClass,
  categoryCardImageClass,
  categoryCardClass,
} from "../constants/constants";

function addBackdropToCategoryCards(): void {
  waitForElements([`.${categoryCardImageClass}`], () => {
    const cards = Array.from(document.getElementsByClassName(categoryCardClass));
    cards.forEach((card) => {
      const cardImage = card.getElementsByClassName(categoryCardImageClass)[0];
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
