export type HSLColor = {
  h: number;
  s: number;
  l: number;
};

export function hslToHex({ h, s, l }: HSLColor): {
  r: string;
  g: string;
  b: string;
} {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0"); // convert to Hex and prefix "0" if needed
  };
  return { r: f(0), g: f(8), b: f(4) };
}