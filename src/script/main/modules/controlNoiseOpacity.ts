import waitForElements from "../../shared/utils/waitForElements";
import {
  lightNoiseOpacityValue,
  noiseOpacityVariable,
  marketplaceSchemeSelector,
} from "../constants/constants";

function controlNoiseOpacity(): void {
  waitForElements([marketplaceSchemeSelector], ([marketplaceScheme]) => {
    const schemeObserver = new MutationObserver(() => {
      if (Spicetify.Config.color_scheme.includes("light")) {
        document.documentElement.style.setProperty(noiseOpacityVariable, lightNoiseOpacityValue);
      }
    });
    schemeObserver.observe(marketplaceScheme, { attributes: true });
  });
}

export default controlNoiseOpacity;
