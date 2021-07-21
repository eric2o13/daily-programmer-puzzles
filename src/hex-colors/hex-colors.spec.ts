import {rgbToHex, hexToRgb, blend} from './index';

test('rgb to hex & vice versa', () => {
  expect(rgbToHex(255, 99, 71).toUpperCase()).toBe('#FF6347');
  expect(hexToRgb('#FF6347')).toEqual([255, 99, 71]);
});

test('blending colors', () => {
  const blue: string = rgbToHex(0, 0, 255);
  const red: string = rgbToHex(255, 0, 0);
  const purple: string = rgbToHex(127, 0, 127);
  const yellow: string = rgbToHex(255, 255, 0);
  const cyan: string = rgbToHex(0, 127, 255);
  const green: string = '#7fbf7f';

  expect(blend(blue, red)).toBe(purple);
  expect(blend(cyan, yellow)).toBe(green);
});
