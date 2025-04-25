import React from 'react';
import { SearchBoxContainer,SearchInput } from '../../pages/Commonstyles.styles';

interface SearchBoxProps {
    onSearch: (searchTerm: string) => void;
  }
  
  const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onSearch(e.target.value);
    };
  
    return (
      <SearchBoxContainer>
        <SearchInput
          type="text"
          placeholder="Search here....."
          onChange={handleChange}
        />
      </SearchBoxContainer>
    );
  };
  
  export default SearchBox;