# Paint by Numbers Generator

A React web application that converts any image into a paint-by-numbers template. Upload an image, and the app will analyze it pixel-by-pixel to create a simplified, numbered outline that's ready to paint!

## Features

- **Image Upload**: Drag-and-drop or click to upload any image (JPG, PNG, GIF)
- **Multiple Color Palettes**: Choose from 7 different color palettes to create different artistic effects:
  - **Basic** - Simple primary and secondary colors (12 colors)
  - **Pastel** - Soft, muted tones perfect for gentle artwork (12 colors)
  - **Earth Tones** - Natural browns, beiges, and greens for rustic scenes (12 colors)
  - **Vibrant** - Bold, bright colors for energetic designs (12 colors)
  - **Extended** - More color variety for detailed work (24 colors)
  - **Adaptive** - Automatically extracts up to 32 dominant colors from your image
  - **Adaptive Unique** - Extracts distinct colors only, filtering out similar shades (variable count)
- **Dynamic Palette Switching**: Change palettes on the fly to see different interpretations of your image
- **Adaptive Color Extraction**: Uses median cut algorithm to identify the most dominant colors in your image
- **Smart Color Filtering**: Adaptive Unique palette removes colors that are too similar (within 35 RGB units)
- **Color Quantization**: Intelligently reduces the image to match the selected palette using Euclidean distance color matching
- **Edge Detection**: Automatically detects boundaries between different color regions
- **Region Numbering**: Labels each region with numbers corresponding to the color palette (minimum 10x10 pixels)
- **Three Views**:
  - Original image
  - Simplified color preview
  - Final paint-by-numbers template
- **Downloadable Output**: Save your paint-by-numbers template as a PNG
- **Color Legend**: Visual reference showing which number corresponds to each color

## How It Works

1. **Adaptive Palettes (Optional)**:
   - **Adaptive**: Uses median cut algorithm to extract up to 32 dominant colors from your image
   - **Adaptive Unique**: Extracts dominant colors but filters out similar shades - any color within 35 RGB units of an already-selected color is excluded. This results in a more distinct set of colors (typically 15-25 colors depending on the image).

2. **Color Quantization**: Each pixel in the uploaded image is analyzed and mapped to the closest color in the selected palette using Euclidean distance in RGB color space.

3. **Edge Detection**: The algorithm checks each pixel against its 8 neighbors to identify boundaries where different colors meet.

4. **Region Detection**: Uses a flood-fill algorithm to identify contiguous regions of the same color.

5. **Numbering**: Each region larger than a minimum threshold (100 pixels / 10x10) is labeled with a number at its centroid (center point).

6. **Small Region Handling**: Regions smaller than 100 pixels are automatically filled with black.

7. **Rendering**: The final template shows white regions with black outlines and numbers, ready for painting.

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
│   ├── ColorPalette.jsx            # Color legend component
│   └── PaletteSelector.jsx         # Palette selection dropdown
├── utils/
│   ├── colorUtils.js               # Color quantization functions & palettes
│   ├── edgeDetection.js            # Edge detection and region finding
│   └── paintByNumbersRenderer.js  # Canvas rendering utilities
└── App.jsx                         # Main application component
```

## Customization

You can create your own custom color palettes by modifying `src/utils/colorUtils.js`. Each palette should be an array of color objects with:
- `r`, `g`, `b`: RGB values (0-255)
- `name`: Display name for the color legend

Add your custom palette to the `PALETTES` object to make it available in the dropdown selector.

## Technologies Used

- React 18
- Vite
- HTML5 Canvas API
- CSS3

## License

MIT
