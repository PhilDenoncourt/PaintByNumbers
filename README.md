# Paint by Numbers Generator

A React web application that converts any image into a paint-by-numbers template. Upload an image, and the app will analyze it pixel-by-pixel to create a simplified, numbered outline that's ready to paint!

## Features

- **Image Upload**: Drag-and-drop or click to upload any image (JPG, PNG, GIF)
- **Color Quantization**: Intelligently reduces the image to a 12-color palette using Euclidean distance color matching
- **Edge Detection**: Automatically detects boundaries between different color regions
- **Region Numbering**: Labels each region with numbers corresponding to the color palette
- **Three Views**:
  - Original image
  - Simplified color preview
  - Final paint-by-numbers template
- **Downloadable Output**: Save your paint-by-numbers template as a PNG
- **Color Legend**: Visual reference showing which number corresponds to each color

## How It Works

1. **Color Quantization**: Each pixel in the uploaded image is analyzed and mapped to the closest color in a predefined palette using Euclidean distance in RGB color space.

2. **Edge Detection**: The algorithm checks each pixel against its 8 neighbors to identify boundaries where different colors meet.

3. **Region Detection**: Uses a flood-fill algorithm to identify contiguous regions of the same color.

4. **Numbering**: Each region larger than a minimum threshold is labeled with a number at its centroid (center point).

5. **Rendering**: The final template shows white regions with black outlines and numbers, ready for painting.

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173/`

## Build

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── ImageUploader.jsx          # Image upload component
│   ├── PaintByNumbersCanvas.jsx   # Canvas display component
│   └── ColorPalette.jsx            # Color legend component
├── utils/
│   ├── colorUtils.js               # Color quantization functions
│   ├── edgeDetection.js            # Edge detection and region finding
│   └── paintByNumbersRenderer.js  # Canvas rendering utilities
└── App.jsx                         # Main application component
```

## Customization

You can customize the color palette by modifying the `DEFAULT_PALETTE` array in `src/utils/colorUtils.js`. Each color should have:
- `r`, `g`, `b`: RGB values (0-255)
- `name`: Display name for the color legend

## Technologies Used

- React 18
- Vite
- HTML5 Canvas API
- CSS3

## License

MIT
