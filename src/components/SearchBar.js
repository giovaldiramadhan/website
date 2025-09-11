import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search/${searchTerm}`);
      setSearchTerm('');
    }
  };

  return (
    <SearchWrapper onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search for courses..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="submit">
        <FaSearch size={18} />
      </button>
    </SearchWrapper>
  );
};

const SearchWrapper = styled.form`
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 20px;
  overflow: hidden;
  width: 100%;
  max-width: 400px;

  input {
    flex: 1;
    border: none;
    padding: 8px 15px;
    font-size: 14px;
    outline: none;
  }

  button {
    background: transparent;
    border: none;
    padding: 0 15px;
    cursor: pointer;
    color: #555;
    display: flex;
    align-items: center;

    &:hover {
      color: var(--clr-purple);
    }
  }
`;

export default SearchBar;