function injectStyle(styleCSS: string): void {
  const styleElement = document.createElement("style");
  styleElement.innerHTML = styleCSS;
  document.head.appendChild(styleElement);
}

export default injectStyle;
