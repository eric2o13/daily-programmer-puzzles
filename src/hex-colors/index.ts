const R = require('ramda');

const hexify = (c: number): string => c.toString(16).padStart(2, '0');
const hexReducer = (sum: string, value: number): string => sum + hexify(value);
const average = R.converge(R.divide, [R.sum, R.length]);

export const rgbToHex = (r: number, g: number, b: number): string =>
  [r, g, b].reduce(hexReducer, '#');

export const hexToRgb = (hex: string): number[] => {
  const result: string[] | null = hex
    .replace(
      /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
      (m, r, g, b) => '#' + r + r + g + g + b + b
    )
    .substring(1)
    .match(/.{2}/g);

  if (result) {
    return result.map((s: string) => parseInt(s, 16));
  }

  return [];
};

export const blend = (c1: string, c2: string): string => {
  const a = hexToRgb(c1);
  const b = hexToRgb(c2);
  const color: number[] = R.zip(a, b).map((values: number[]) =>
    Math.floor(average(values))
  );
  return rgbToHex(color[0], color[1], color[2]);
};
