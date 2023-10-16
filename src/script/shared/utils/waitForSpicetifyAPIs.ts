/* eslint-disable @typescript-eslint/no-explicit-any */
function waitForSpicetifyAPIs(
  apiNames: string[],
  // eslint-disable-next-line no-empty-pattern
  func: ([]: any[]) => void,
  attempts = 50,
): void {
  const apis = apiNames.map((apiName) => {
    let api: any = Spicetify;

    try {
      apiName.split(".").forEach((apiPart) => {
        api = api[apiPart];
      });
    } catch {
      return null;
    }

    return api;
  });

  if (apis.every((api) => api)) {
    func(apis);
  } else if (attempts > 0) {
    setTimeout(waitForSpicetifyAPIs, 200, apiNames, func, attempts - 1);
  }
}

export default waitForSpicetifyAPIs;
