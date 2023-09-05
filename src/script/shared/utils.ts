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

export function roundToDecimal(inputNumber: number, decimalPlaces: number): number {
  const multiplier = 10 ** decimalPlaces;
  return Math.round(inputNumber * multiplier) / multiplier;
}
