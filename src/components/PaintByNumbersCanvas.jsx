import { useEffect, useRef } from 'react';
import { renderPaintByNumbers, renderQuantizedPreview } from '../utils/paintByNumbersRenderer';
import './PaintByNumbersCanvas.css';

function PaintByNumbersCanvas({ quantized, palette, originalImage }) {
  const paintByNumbersRef = useRef(null);
  const quantizedRef = useRef(null);
  const originalRef = useRef(null);

  useEffect(() => {
    if (!quantized || !palette) return;

    // Render paint-by-numbers version
    renderPaintByNumbers(paintByNumbersRef.current, quantized, palette, {
      showNumbers: true,
      showEdges: true,
      minRegionSize: 100, // 10x10 pixels minimum
      edgeThickness: 2
    });

    // Render quantized color preview
    renderQuantizedPreview(quantizedRef.current, quantized, palette);

    // Render original image
    if (originalImage && originalRef.current) {
      const ctx = originalRef.current.getContext('2d');
      originalRef.current.width = originalImage.width;
      originalRef.current.height = originalImage.height;
      ctx.drawImage(originalImage, 0, 0);
    }
  }, [quantized, palette, originalImage]);

  if (!quantized) {
    return null;
  }

  return (
    <div className="canvas-container">
      <div className="canvas-section">
        <h3>Original Image</h3>
        <canvas ref={originalRef} className="canvas" />
      </div>
      <div className="canvas-section">
        <h3>Simplified Colors</h3>
        <canvas ref={quantizedRef} className="canvas" />
      </div>
      <div className="canvas-section">
        <h3>Paint by Numbers</h3>
        <canvas ref={paintByNumbersRef} className="canvas" />
        <button
          className="download-btn"
          onClick={() => {
            const link = document.createElement('a');
            link.download = 'paint-by-numbers.png';
            link.href = paintByNumbersRef.current.toDataURL();
            link.click();
          }}
        >
          Download Paint by Numbers
        </button>
      </div>
    </div>
  );
}

export default PaintByNumbersCanvas;
