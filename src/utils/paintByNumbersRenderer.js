import { detectEdges, findRegions, calculateCentroid } from './edgeDetection';

/**
 * Render paint-by-numbers image on canvas
 */
export function renderPaintByNumbers(canvas, quantized, palette, options = {}) {
  const {
    showNumbers = true,
    showEdges = true,
    minRegionSize = 50,
    edgeThickness = 2
  } = options;

  const ctx = canvas.getContext('2d');
  const width = quantized[0].length;
  const height = quantized.length;

  canvas.width = width;
  canvas.height = height;

  // Fill with white background
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, width, height);

  // Find all regions
  const regions = findRegions(quantized);

  // Fill small regions with black
  ctx.fillStyle = 'black';
  regions.forEach(region => {
    if (region.pixels.length < minRegionSize) {
      // Fill each pixel of the small region with black
      region.pixels.forEach(([y, x]) => {
        ctx.fillRect(x, y, 1, 1);
      });
    }
  });

  // Draw edges if enabled
  if (showEdges) {
    const edges = detectEdges(quantized);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = edgeThickness;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (edges[y][x]) {
          ctx.fillStyle = 'black';
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }
  }

  // Draw numbers on larger regions
  if (showNumbers) {
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    regions.forEach(region => {
      // Only label regions larger than minimum size
      if (region.pixels.length >= minRegionSize) {
        const centroid = calculateCentroid(region);
        const colorNumber = region.colorIndex + 1; // 1-indexed for user display

        // Draw number with white background for visibility
        const text = colorNumber.toString();
        const metrics = ctx.measureText(text);
        const textHeight = 12;

        ctx.fillStyle = 'white';
        ctx.fillRect(
          centroid.x - metrics.width / 2 - 2,
          centroid.y - textHeight / 2 - 2,
          metrics.width + 4,
          textHeight + 4
        );

        ctx.fillStyle = 'black';
        ctx.fillText(text, centroid.x, centroid.y);
      }
    });
  }

  return canvas;
}

/**
 * Render the quantized color preview (reduced color image)
 */
export function renderQuantizedPreview(canvas, quantized, palette) {
  const ctx = canvas.getContext('2d');
  const width = quantized[0].length;
  const height = quantized.length;

  canvas.width = width;
  canvas.height = height;

  const imageData = ctx.createImageData(width, height);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const paletteIndex = quantized[y][x];
      const color = palette[paletteIndex];
      const idx = (y * width + x) * 4;

      imageData.data[idx] = color.r;
      imageData.data[idx + 1] = color.g;
      imageData.data[idx + 2] = color.b;
      imageData.data[idx + 3] = 255;
    }
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas;
}
