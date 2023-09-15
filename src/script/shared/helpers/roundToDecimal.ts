function roundToDecimal(inputNumber: number, decimalPlaces: number): number {
  const multiplier = 10 ** decimalPlaces;
  return Math.round(inputNumber * multiplier) / multiplier;
}

export default roundToDecimal;
