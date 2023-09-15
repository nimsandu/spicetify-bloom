function waitForAPIs(apis: string[], func: () => void, attempts = 50): void {
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

export default waitForAPIs;
