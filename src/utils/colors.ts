export const generateRandomColorRGB = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
};

export const getOppositeColorRGB = (rgbColor) => {
  const rgbValues = rgbColor.match(/\d+/g);
  const [r, g, b] = rgbValues.map(Number);

  const oppositeR = 255 - r;
  const oppositeG = 255 - g;
  const oppositeB = 255 - b;

  return `rgb(${oppositeR}, ${oppositeG}, ${oppositeB})`;
};
