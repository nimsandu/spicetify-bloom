function waitForElements(
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

export default waitForElements;
