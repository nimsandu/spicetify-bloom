function getTextLineDirection(line: string): "rtl" | "ltr" {
  const rtlRegExp = /[\u0591-\u07FF]/;
  const firstCharacter = line[0];
  return rtlRegExp.test(firstCharacter) ? "rtl" : "ltr";
}

export default getTextLineDirection;
