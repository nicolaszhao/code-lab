import React from 'react';
import { StatusFilters } from '../filters/filtersSlice';

export const StatusFilter = ({ status, onChange }) => {
  return (
    <section>
      <h3>Filter by Status</h3>
      <ul>
        {Object.values(StatusFilters).map((statusText) => (
          <li 
            key={statusText}
            style={{ 
              textTransform: 'capitalize', 
              fontWeight: status === statusText 
                ? 'bold' 
                : 'normal' 
            }} 
            onClick={() => onChange(statusText)}
          >
            {statusText}
          </li>
        ))}
      </ul>
    </section>
  );
};
