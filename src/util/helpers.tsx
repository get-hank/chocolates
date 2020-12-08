export const rem = (size: number, base: number) => `${size * base}rem`;
export const passThroughRule = (rule: string, value: any) =>
  value !== undefined ? `${rule}: ${value};` : "";
