function convertVersionToNumber(version: string): number {
  return parseInt(version.replaceAll(".", ""), 10);
}

export default convertVersionToNumber;
