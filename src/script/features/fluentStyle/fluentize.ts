import { fluentStyleSettingID } from "../../shared/constants/constants";
import enableFeatureStyles from "../../shared/modules/enableFeatureStyles";
import { settingImageUrlInputID } from "./constants/constants";
import addBackgroundImage from "./modules/addBackgroundImage";
import addFluentSettings from "./modules/addFluentSettings";

function fluentize() {
  const [colorScheme, colorSchemeVariant] = Spicetify.Config.color_scheme.split("_");

  if (colorScheme === "fluent") {
    enableFeatureStyles(fluentStyleSettingID);
    document.documentElement.classList.add(colorSchemeVariant);
    const settings = addFluentSettings();
    addBackgroundImage(settings.getFieldValue(settingImageUrlInputID));
  }
}

export default fluentize;
