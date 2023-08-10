export function waitForElements(
  elementSelectors: string[],
  // eslint-disable-next-line no-empty-pattern
  func: ([]: Element[]) => void,
  attempts = 50,
): void {
  const queries = elementSelectors.map((elementSelector) =>
    document.querySelector(elementSelector),
  );
  if (queries.every((element) => element)) {
    func(queries as Element[]);
  } else if (attempts > 0) {
    setTimeout(waitForElements, 200, elementSelectors, func, attempts - 1);
  }
}

export function waitForAPIs(apis: string[], func: () => void, attempts = 50): void {
  try {
    apis.forEach((api) => {
      // eslint-disable-next-line no-eval
      if (!eval(api)) throw new Error();
    });
  } catch {
    if (attempts > 0) setTimeout(waitForAPIs, 200, apis, func, attempts - 1);
    return;
  }
  func();
}

export function injectStyle(styleCSS: string): void {
  const styleElement = document.createElement("style");
  styleElement.innerHTML = styleCSS;
  document.head.appendChild(styleElement);
}

export function cleanLocalizationString(input: string): string {
  return input.replace(/[{0}{1}«»”“]/g, "").trim();
}

export function getTextLineDirection(line: string): "rtl" | "ltr" {
  const rtlRegExp = /[\u0591-\u07FF]/;
  const firstCharacter = line[0];
  return rtlRegExp.test(firstCharacter) ? "rtl" : "ltr";
}

export function calculateLyricsMaxWidth(lyricsWrapper: HTMLElement): number {
  const lyricsContainer = lyricsWrapper.parentElement as HTMLElement;
  const marginLeft = parseInt(window.getComputedStyle(lyricsWrapper).marginLeft, 10);
  const totalOffset = lyricsWrapper.offsetLeft + marginLeft;
  return Math.round(0.95 * (lyricsContainer.clientWidth - totalOffset));
}
