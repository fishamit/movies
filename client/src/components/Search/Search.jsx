import React from 'react';
import style from './Search.module.css';
const Search = ({ searchValue, setSearchValue }) => {
  return (
    <input
      type="text"
      name="search"
      id=""
      className={style.search}
      placeholder="Search"
      value={searchValue}
      onChange={e => setSearchValue(e.target.value)}
    />
  );
};

export default Search;
