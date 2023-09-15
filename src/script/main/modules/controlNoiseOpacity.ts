import waitForElements from "../../shared/utils/waitForElements";
import {
  lightNoiseOpacityValue,
  noiseOpacityCSSVariable,
  marketplaceSchemeSelector,
} from "../constants/constants";

function setNoiseOpacity(): void {
  if (Spicetify.Config.color_scheme.includes("light")) {
    document.documentElement.style.setProperty(noiseOpacityCSSVariable, lightNoiseOpacityValue);
  }
}

function controlNoiseOpacity(): void {
  setNoiseOpacity();
  waitForElements([marketplaceSchemeSelector], ([marketplaceScheme]) => {
    new MutationObserver(setNoiseOpacity).observe(marketplaceScheme, { attributes: true });
  });
}

export default controlNoiseOpacity;
