import React from 'react';
import { FilterGridContainer, FilterSection, FilterHeading,  ResetButton } from '../../pages/Commonstyles.styles';

interface FilterGridProps {
  onFilterChange: (type: string, value: string) => void;
  onClearFilters: () => void; 
  filters: { language: string; format: string; genre: string };
}

const FilterGrid: React.FC<FilterGridProps> = ({ onFilterChange, onClearFilters, filters }) => {
  return (
    <FilterGridContainer>
      <FilterSection>
        <FilterHeading>Language</FilterHeading>
        <div>
          <label>
            <input
              type="radio"
              name="language"
              value="English"
              checked={filters.language === 'English'}
              onChange={() => onFilterChange('language', 'English')}
            />
            English
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="language"
              value="Hindi"
              checked={filters.language === 'Hindi'}
              onChange={() => onFilterChange('language', 'Hindi')}
            />
            Hindi
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="language"
              value="Tamil"
              checked={filters.language === 'Tamil'}
              onChange={() => onFilterChange('language', 'Tamil')}
            />
            Tamil
          </label>
        </div>
      </FilterSection>

      <FilterSection>
        <FilterHeading>Format</FilterHeading>
        <div>
          <label>
            <input
              type="radio"
              name="format"
              value="2D"
              checked={filters.format === '2D'}
              onChange={() => onFilterChange('format', '2D')}
            />
            2D
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="format"
              value="3D"
              checked={filters.format === '3D'}
              onChange={() => onFilterChange('format', '3D')}
            />
            3D
          </label>
        </div>
      </FilterSection>

      <FilterSection>
        <FilterHeading>Genre</FilterHeading>
        <div>
          <label>
            <input
              type="radio"
              name="genre"
              value="Action"
              checked={filters.genre === 'Action'}
              onChange={() => onFilterChange('genre', 'Action')}
            />
            Action
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="genre"
              value="Drama"
              checked={filters.genre === 'Drama'}
              onChange={() => onFilterChange('genre', 'Drama')}
            />
            Drama
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="genre"
              value="Comedy"
              checked={filters.genre === 'Comedy'}
              onChange={() => onFilterChange('genre', 'Comedy')}
            />
            Comedy
          </label>
        </div>
      </FilterSection>

      <ResetButton onClick={onClearFilters}>Clear Filters</ResetButton>  
    </FilterGridContainer>
  );
};

export default FilterGrid;
