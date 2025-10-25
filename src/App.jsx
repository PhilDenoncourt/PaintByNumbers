import { useState } from 'react';
import ImageUploader from './components/ImageUploader';
import PaintByNumbersCanvas from './components/PaintByNumbersCanvas';
import ColorPalette from './components/ColorPalette';
import PaletteSelector from './components/PaletteSelector';
import { PALETTES, quantizeImage } from './utils/colorUtils';
import './App.css';

function App() {
  const [originalImage, setOriginalImage] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [quantized, setQuantized] = useState(null);
  const [selectedPaletteKey, setSelectedPaletteKey] = useState('basic');
  const [processing, setProcessing] = useState(false);

  const palette = PALETTES[selectedPaletteKey].colors;

  const handleImageLoad = (img) => {
    setProcessing(true);
    setOriginalImage(img);

    // Create a canvas to get image data
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    // Get image data and store it
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setImageData(imgData);

    // Use setTimeout to prevent blocking the UI
    setTimeout(() => {
      const quantizedData = quantizeImage(imgData, palette);
      setQuantized(quantizedData);
      setProcessing(false);
    }, 100);
  };

  const handlePaletteChange = (paletteKey) => {
    setSelectedPaletteKey(paletteKey);

    // Re-quantize the image with the new palette if we have image data
    if (imageData) {
      setProcessing(true);
      setTimeout(() => {
        const newPalette = PALETTES[paletteKey].colors;
        const quantizedData = quantizeImage(imageData, newPalette);
        setQuantized(quantizedData);
        setProcessing(false);
      }, 100);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Paint by Numbers Generator</h1>
        <p>Upload an image to convert it into a paint-by-numbers template</p>
      </header>

      <main className="app-main">
        {!originalImage && (
          <ImageUploader onImageLoad={handleImageLoad} />
        )}

        {originalImage && !processing && (
          <PaletteSelector
            selectedPalette={selectedPaletteKey}
            onPaletteChange={handlePaletteChange}
          />
        )}

        {processing && (
          <div className="processing">
            <p>Processing image...</p>
          </div>
        )}

        {quantized && !processing && (
          <>
            <PaintByNumbersCanvas
              quantized={quantized}
              palette={palette}
              originalImage={originalImage}
            />
            <ColorPalette palette={palette} />
            <button
              className="reset-btn"
              onClick={() => {
                setOriginalImage(null);
                setImageData(null);
                setQuantized(null);
                setSelectedPaletteKey('basic');
              }}
            >
              Upload New Image
            </button>
          </>
        )}
      </main>

      <footer className="app-footer">
        <p>
          How it works: The image is analyzed pixel by pixel to find the closest color
          in the palette. Then edges are detected where different colors meet, and
          regions are numbered for easy painting.
        </p>
      </footer>
    </div>
  );
}

export default App;
