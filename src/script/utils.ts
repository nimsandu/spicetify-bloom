export function waitForElements(
  elements: string[],
  // eslint-disable-next-line no-empty-pattern
  func: ([]: Element[]) => void,
  attempts = 50,
): void {
  const queries = elements.map((element) => document.querySelector(element));
  if (queries.every((a) => a)) {
    func(queries as Element[]);
  } else if (attempts > 0) {
    setTimeout(waitForElements, 200, elements, func, attempts - 1);
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

export function getTextLineDirection(line: string): "rtl" | "ltr" {
  const rtlRegExp = /[\u0591-\u07FF]/;
  return rtlRegExp.test(line[0]) ? "rtl" : "ltr";
}

export function cleanLocalizationString(string: string) {
  return string.replace(/[{0}{1}«»”“]/g, "").trim();
}

export function injectStyle(styleCSS: string): void {
  const styleElement = document.createElement("style");
  styleElement.innerHTML = styleCSS;
  document.head.appendChild(styleElement);
}
