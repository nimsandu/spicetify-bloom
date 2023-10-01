import { lyricsTooltipWrapperClass, contextMenuItemClass } from "../constants/constants";

// fixes some topbar/playbar menus and flyouts backdrop-filter
// it doesn't work because topbar and playbar, which are parent elements for these menus and flyouts, already have backdrop-filter applied to them
// and if you move the blur to a pseudo element, you'll get color banding - dithering with noise as element

function moveTippies(mutationsList: MutationRecord[]): void {
  mutationsList.forEach((mutation) => {
    mutation.addedNodes?.forEach((addedNode) => {
      if (addedNode instanceof HTMLElement && addedNode.id?.includes("tippy")) {
        const { parentElement } = addedNode;
        if (
          parentElement !== document.body &&
          !parentElement?.classList?.contains(lyricsTooltipWrapperClass) &&
          !parentElement?.classList?.contains(contextMenuItemClass)
        ) {
          addedNode.classList.add("encore-dark-theme");
          document.body.appendChild(addedNode);
        }
      }
    });
  });
  // trigger element postition correction
  window.dispatchEvent(new Event("resize"));
}

function fixTippiesBackdropFilter(): void {
  const bodyObserver = new MutationObserver(moveTippies);
  const bodyObserverConfig = {
    childList: true,
    subtree: true,
  };
  bodyObserver.observe(document.body, bodyObserverConfig);
}

export default fixTippiesBackdropFilter;
