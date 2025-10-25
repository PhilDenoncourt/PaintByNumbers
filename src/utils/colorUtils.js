/**
 * Calculate Euclidean distance between two RGB colors
 */
export function colorDistance(r1, g1, b1, r2, g2, b2) {
  return Math.sqrt(
    Math.pow(r1 - r2, 2) +
    Math.pow(g1 - g2, 2) +
    Math.pow(b1 - b2, 2)
  );
}

/**
 * Find the closest color in the palette to the given RGB color
 */
export function findClosestPaletteColor(r, g, b, palette) {
  let minDistance = Infinity;
  let closestIndex = 0;

  palette.forEach((color, index) => {
    const distance = colorDistance(r, g, b, color.r, color.g, color.b);
    if (distance < minDistance) {
      minDistance = distance;
      closestIndex = index;
    }
  });

  return closestIndex;
}

/**
 * Default color palette (can be customized)
 */
export const DEFAULT_PALETTE = [
  { r: 255, g: 255, b: 255, name: 'White' },
  { r: 0, g: 0, b: 0, name: 'Black' },
  { r: 255, g: 0, b: 0, name: 'Red' },
  { r: 0, g: 255, b: 0, name: 'Green' },
  { r: 0, g: 0, b: 255, name: 'Blue' },
  { r: 255, g: 255, b: 0, name: 'Yellow' },
  { r: 255, g: 165, b: 0, name: 'Orange' },
  { r: 128, g: 0, b: 128, name: 'Purple' },
  { r: 165, g: 42, b: 42, name: 'Brown' },
  { r: 255, g: 192, b: 203, name: 'Pink' },
  { r: 128, g: 128, b: 128, name: 'Gray' },
  { r: 0, g: 128, b: 128, name: 'Teal' },
];

/**
 * Convert RGB to hex string
 */
export function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

/**
 * Quantize image to palette colors
 * Returns a 2D array of palette indices
 */
export function quantizeImage(imageData, palette) {
  const { width, height, data } = imageData;
  const quantized = [];

  for (let y = 0; y < height; y++) {
    quantized[y] = [];
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];

      const paletteIndex = findClosestPaletteColor(r, g, b, palette);
      quantized[y][x] = paletteIndex;
    }
  }

  return quantized;
}
