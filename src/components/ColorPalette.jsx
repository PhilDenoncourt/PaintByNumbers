import { rgbToHex } from '../utils/colorUtils';
import './ColorPalette.css';

function ColorPalette({ palette }) {
  return (
    <div className="color-palette">
      <h3>Color Legend</h3>
      <div className="palette-grid">
        {palette.map((color, index) => (
          <div key={index} className="palette-item">
            <div
              className="color-swatch"
              style={{ backgroundColor: rgbToHex(color.r, color.g, color.b) }}
            />
            <div className="color-info">
              <span className="color-number">{index + 1}</span>
              <span className="color-name">{color.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ColorPalette;
