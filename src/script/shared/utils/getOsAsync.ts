async function getOsAsync(): Promise<string> {
  while (!Spicetify.Platform?.PlatformData) {
    // eslint-disable-next-line no-await-in-loop, no-promise-executor-return
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  return Spicetify.Platform.PlatformData.os_name;
}

export default getOsAsync;
