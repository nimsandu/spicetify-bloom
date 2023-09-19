import waitForAPIs from "../../../shared/utils/waitForAPIs";

function setControlsDimensions(): void {
  waitForAPIs(["Spicetify.Platform.PlayerAPI"], async () => {
    // eslint-disable-next-line no-underscore-dangle
    const { entries } = await Spicetify.Platform.PlayerAPI._prefs.get({
      key: "app.browser.zoom-level",
    });
    const zoomLevel = entries["app.browser.zoom-level"].number;

    const multiplier = zoomLevel !== 0 ? zoomLevel / 50 : 0;
    const constant = 0.912872807;

    const finalWidth = Math.abs(135 * constant ** multiplier);
    const finalHeight = Math.abs(31 * constant ** multiplier);

    const { style } = document.documentElement;
    style.setProperty("--control-width", `${finalWidth}px`);
    style.setProperty("--control-height", `${finalHeight}px`);
  });
}

export default setControlsDimensions;
