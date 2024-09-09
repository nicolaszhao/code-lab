import React from 'react';
import { ColorsFilters } from '../filters/filtersSlice';

export const ColorsFilter = ({ colors, onChange }) => {
  function handleChange({ value, checked }) {
    onChange(value, checked ? 'selected' : 'unselected');
  }

  return (
    <section>
      <h3>Filter by Color</h3>
      <ul style={{ listStyleType: 'square' }}>
        {Object.values(ColorsFilters).map((color) => (
          <li 
            style={{ 
              textTransform: 'capitalize', 
              fontWeight: 'bold', 
              color 
            }}
            key={color}
          >
            <input
              type="checkbox"
              id={`colors-filter-${color}`}
              checked={colors.includes(color)}
              value={color}
              onChange={(e) => handleChange(e.target)}
            />
            <label htmlFor={`colors-filter-${color}`}>{color}</label>
          </li>
        ))}
      </ul>
    </section>
  );
};
