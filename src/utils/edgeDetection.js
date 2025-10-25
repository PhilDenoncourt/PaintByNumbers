/**
 * Detect edges in quantized image
 * Returns a 2D array of boolean values (true = edge)
 */
export function detectEdges(quantized) {
  const height = quantized.length;
  const width = quantized[0].length;
  const edges = [];

  for (let y = 0; y < height; y++) {
    edges[y] = [];
    for (let x = 0; x < width; x++) {
      const current = quantized[y][x];
      let isEdge = false;

      // Check all 8 neighbors
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dy === 0) continue;

          const ny = y + dy;
          const nx = x + dx;

          // Check bounds
          if (ny >= 0 && ny < height && nx >= 0 && nx < width) {
            if (quantized[ny][nx] !== current) {
              isEdge = true;
              break;
            }
          }
        }
        if (isEdge) break;
      }

      edges[y][x] = isEdge;
    }
  }

  return edges;
}

/**
 * Find connected regions using flood fill
 */
export function findRegions(quantized) {
  const height = quantized.length;
  const width = quantized[0].length;
  const regions = [];
  const visited = Array(height).fill(null).map(() => Array(width).fill(false));

  function floodFill(startY, startX, colorIndex) {
    const region = { colorIndex, pixels: [], minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity };
    const stack = [[startY, startX]];

    while (stack.length > 0) {
      const [y, x] = stack.pop();

      if (y < 0 || y >= height || x < 0 || x >= width) continue;
      if (visited[y][x]) continue;
      if (quantized[y][x] !== colorIndex) continue;

      visited[y][x] = true;
      region.pixels.push([y, x]);

      // Update bounding box
      region.minX = Math.min(region.minX, x);
      region.maxX = Math.max(region.maxX, x);
      region.minY = Math.min(region.minY, y);
      region.maxY = Math.max(region.maxY, y);

      // Add neighbors to stack
      stack.push([y - 1, x]);
      stack.push([y + 1, x]);
      stack.push([y, x - 1]);
      stack.push([y, x + 1]);
    }

    return region;
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (!visited[y][x]) {
        const region = floodFill(y, x, quantized[y][x]);
        if (region.pixels.length > 0) {
          regions.push(region);
        }
      }
    }
  }

  return regions;
}

/**
 * Calculate centroid of a region for label placement
 */
export function calculateCentroid(region) {
  let sumX = 0, sumY = 0;

  region.pixels.forEach(([y, x]) => {
    sumX += x;
    sumY += y;
  });

  return {
    x: Math.round(sumX / region.pixels.length),
    y: Math.round(sumY / region.pixels.length)
  };
}
