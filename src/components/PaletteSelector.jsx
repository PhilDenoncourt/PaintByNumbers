import { PALETTES } from '../utils/colorUtils';
import './PaletteSelector.css';

function PaletteSelector({ selectedPalette, onPaletteChange }) {
  return (
    <div className="palette-selector">
      <label htmlFor="palette-select">Choose Color Palette:</label>
      <select
        id="palette-select"
        value={selectedPalette}
        onChange={(e) => onPaletteChange(e.target.value)}
        className="palette-dropdown"
      >
        {Object.entries(PALETTES).map(([key, palette]) => (
          <option key={key} value={key}>
            {palette.name}
          </option>
        ))}
      </select>
      <p className="palette-description">
        Different palettes create different artistic effects. Try them all to see which works best for your image!
      </p>
    </div>
  );
}

export default PaletteSelector;
