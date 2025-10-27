import { useEffect, useRef, useState } from 'react';
import { renderPaintByNumbers, renderQuantizedPreview } from '../utils/paintByNumbersRenderer';
import './PaintByNumbersCanvas.css';

function PaintByNumbersCanvas({ quantized, palette, originalImage }) {
  const paintByNumbersRef = useRef(null);
  const quantizedRef = useRef(null);
  const originalRef = useRef(null);
  const [zoomedCanvas, setZoomedCanvas] = useState(null);

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

  const handleCanvasClick = (canvasType) => {
    setZoomedCanvas(canvasType);
  };

  const handleZoomClose = () => {
    setZoomedCanvas(null);
  };

  return (
    <>
      <div className="canvas-container">
        <div className="canvas-section">
          <h3>Original Image</h3>
          <canvas
            ref={originalRef}
            className="canvas clickable"
            onClick={() => handleCanvasClick('original')}
            title="Click to view full size"
          />
        </div>
        <div className="canvas-section">
          <h3>Simplified Colors</h3>
          <canvas
            ref={quantizedRef}
            className="canvas clickable"
            onClick={() => handleCanvasClick('quantized')}
            title="Click to view full size"
          />
        </div>
        <div className="canvas-section">
          <h3>Paint by Numbers</h3>
          <canvas
            ref={paintByNumbersRef}
            className="canvas clickable"
            onClick={() => handleCanvasClick('paintByNumbers')}
            title="Click to view full size"
          />
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

      {zoomedCanvas && (
        <div className="zoom-modal" onClick={handleZoomClose}>
          <div className="zoom-modal-content">
            <button className="zoom-close" onClick={handleZoomClose}>
              ×
            </button>
            <canvas
              ref={(el) => {
                if (!el) return;
                const sourceCanvas =
                  zoomedCanvas === 'original' ? originalRef.current :
                  zoomedCanvas === 'quantized' ? quantizedRef.current :
                  paintByNumbersRef.current;

                if (sourceCanvas) {
                  el.width = sourceCanvas.width;
                  el.height = sourceCanvas.height;
                  const ctx = el.getContext('2d');
                  ctx.drawImage(sourceCanvas, 0, 0);
                }
              }}
              className="zoom-canvas"
            />
            <p className="zoom-hint">Click anywhere to close</p>
          </div>
        </div>
      )}
    </>
  );
}

export default PaintByNumbersCanvas;
