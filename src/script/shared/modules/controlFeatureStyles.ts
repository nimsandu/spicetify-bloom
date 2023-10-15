const controlFeatureStyles = {
  enable: (featureSettingId: string) => {
    document.documentElement.classList.add(featureSettingId);
  },
  disable: (featureSettingId: string) => {
    document.documentElement.classList.add(featureSettingId);
  },
  toggle: (featureSettingId: string) => {
    document.documentElement.classList.toggle(featureSettingId);
  },
};

export default controlFeatureStyles;
