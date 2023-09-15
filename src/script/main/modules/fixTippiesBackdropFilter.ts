import { lyricsTooltipWrapperClass, contextMenuItemClass } from "../constants/constants";

// see https://github.com/nimsandu/spicetify-bloom/issues/220#issuecomment-1555071865

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
