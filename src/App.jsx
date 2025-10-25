import { useState } from 'react';
import ImageUploader from './components/ImageUploader';
import PaintByNumbersCanvas from './components/PaintByNumbersCanvas';
import ColorPalette from './components/ColorPalette';
import { DEFAULT_PALETTE, quantizeImage } from './utils/colorUtils';
import './App.css';

function App() {
  const [originalImage, setOriginalImage] = useState(null);
  const [quantized, setQuantized] = useState(null);
  const [palette] = useState(DEFAULT_PALETTE);
  const [processing, setProcessing] = useState(false);

  const handleImageLoad = (img) => {
    setProcessing(true);
    setOriginalImage(img);

    // Create a canvas to get image data
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    // Get image data and quantize
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // Use setTimeout to prevent blocking the UI
    setTimeout(() => {
      const quantizedData = quantizeImage(imageData, palette);
      setQuantized(quantizedData);
      setProcessing(false);
    }, 100);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Paint by Numbers Generator</h1>
        <p>Upload an image to convert it into a paint-by-numbers template</p>
      </header>

      <main className="app-main">
        {!quantized && (
          <ImageUploader onImageLoad={handleImageLoad} />
        )}

        {processing && (
          <div className="processing">
            <p>Processing image...</p>
          </div>
        )}

        {quantized && (
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
                setQuantized(null);
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
