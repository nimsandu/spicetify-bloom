function cleanLocalizationString(input: string): string {
  return input.replace(/[{0}{1}«»”“]/g, "").trim();
}

export default cleanLocalizationString;
