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
 * Basic/Beginner Palette - Simple primary and secondary colors
 */
export const BASIC_PALETTE = [
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
 * Pastel Palette - Soft, muted colors
 */
export const PASTEL_PALETTE = [
  { r: 250, g: 255, b: 199, name: 'Pale Yellow' },
  { r: 255, g: 204, b: 225, name: 'Light Pink' },
  { r: 224, g: 215, b: 255, name: 'Lavender' },
  { r: 179, g: 235, b: 242, name: 'Pastel Blue' },
  { r: 181, g: 234, b: 215, name: 'Mint' },
  { r: 255, g: 182, b: 193, name: 'Light Coral' },
  { r: 255, g: 218, b: 193, name: 'Peach' },
  { r: 199, g: 206, b: 234, name: 'Periwinkle' },
  { r: 226, g: 240, b: 203, name: 'Tea Green' },
  { r: 255, g: 239, b: 213, name: 'Papaya' },
  { r: 222, g: 224, b: 228, name: 'Platinum' },
  { r: 232, g: 227, b: 252, name: 'Pale Lavender' },
];

/**
 * Earth Tones Palette - Natural browns, beiges, and greens
 */
export const EARTH_TONES_PALETTE = [
  { r: 250, g: 250, b: 210, name: 'Light Goldenrod' },
  { r: 128, g: 96, b: 67, name: 'Earth Brown' },
  { r: 103, g: 68, b: 34, name: 'Dark Brown' },
  { r: 194, g: 155, b: 108, name: 'Camel' },
  { r: 148, g: 115, b: 82, name: 'Pale Brown' },
  { r: 213, g: 130, b: 88, name: 'Raw Sienna' },
  { r: 236, g: 185, b: 132, name: 'Gold' },
  { r: 168, g: 166, b: 118, name: 'Olive Green' },
  { r: 37, g: 150, b: 62, name: 'Forest Green' },
  { r: 143, g: 170, b: 179, name: 'Stone Blue' },
  { r: 196, g: 155, b: 140, name: 'Tan' },
  { r: 69, g: 27, b: 4, name: 'Coffee' },
];

/**
 * Vibrant Palette - Bold, bright colors
 */
export const VIBRANT_PALETTE = [
  { r: 255, g: 255, b: 255, name: 'White' },
  { r: 20, g: 20, b: 20, name: 'Black' },
  { r: 238, g: 75, b: 43, name: 'Bright Red' },
  { r: 247, g: 9, b: 59, name: 'Crimson' },
  { r: 254, g: 149, b: 0, name: 'Orange' },
  { r: 251, g: 222, b: 24, name: 'Bright Yellow' },
  { r: 101, g: 211, b: 12, name: 'Neon Green' },
  { r: 0, g: 120, b: 255, name: 'Vivid Blue' },
  { r: 189, g: 0, b: 255, name: 'Violet' },
  { r: 241, g: 9, b: 131, name: 'Magenta' },
  { r: 58, g: 229, b: 231, name: 'Cyan' },
  { r: 135, g: 89, b: 203, name: 'Purple' },
];

/**
 * Extended Palette - More colors for detailed work
 */
export const EXTENDED_PALETTE = [
  { r: 255, g: 255, b: 255, name: 'White' },
  { r: 0, g: 0, b: 0, name: 'Black' },
  { r: 220, g: 220, b: 220, name: 'Light Gray' },
  { r: 128, g: 128, b: 128, name: 'Medium Gray' },
  { r: 64, g: 64, b: 64, name: 'Dark Gray' },
  { r: 255, g: 0, b: 0, name: 'Red' },
  { r: 200, g: 0, b: 0, name: 'Dark Red' },
  { r: 255, g: 128, b: 128, name: 'Light Red' },
  { r: 255, g: 165, b: 0, name: 'Orange' },
  { r: 255, g: 255, b: 0, name: 'Yellow' },
  { r: 255, g: 255, b: 128, name: 'Light Yellow' },
  { r: 0, g: 255, b: 0, name: 'Green' },
  { r: 0, g: 128, b: 0, name: 'Dark Green' },
  { r: 144, g: 238, b: 144, name: 'Light Green' },
  { r: 0, g: 255, b: 255, name: 'Cyan' },
  { r: 0, g: 0, b: 255, name: 'Blue' },
  { r: 0, g: 0, b: 139, name: 'Dark Blue' },
  { r: 173, g: 216, b: 230, name: 'Light Blue' },
  { r: 128, g: 0, b: 128, name: 'Purple' },
  { r: 255, g: 0, b: 255, name: 'Magenta' },
  { r: 255, g: 192, b: 203, name: 'Pink' },
  { r: 165, g: 42, b: 42, name: 'Brown' },
  { r: 210, g: 180, b: 140, name: 'Tan' },
  { r: 0, g: 128, b: 128, name: 'Teal' },
];

/**
 * Collection of all available palettes
 */
export const PALETTES = {
  basic: { name: 'Basic (12 colors)', colors: BASIC_PALETTE },
  pastel: { name: 'Pastel (12 colors)', colors: PASTEL_PALETTE },
  earth: { name: 'Earth Tones (12 colors)', colors: EARTH_TONES_PALETTE },
  vibrant: { name: 'Vibrant (12 colors)', colors: VIBRANT_PALETTE },
  extended: { name: 'Extended (24 colors)', colors: EXTENDED_PALETTE },
};

/**
 * Default color palette
 */
export const DEFAULT_PALETTE = BASIC_PALETTE;

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
