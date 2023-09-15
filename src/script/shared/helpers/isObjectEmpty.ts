function isObjectEmpty(inputObject: object): boolean {
  // eslint-disable-next-line no-restricted-syntax
  for (const property in inputObject) {
    if (Object.hasOwn(inputObject, property)) return false;
  }
  return true;
}

export default isObjectEmpty;
