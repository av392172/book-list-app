import React, { useState } from "react";
import "./SearchBar.css";
import { useDispatch, useSelector } from "react-redux";
import { setResultList, setSearchQuery } from "../redux/actions/bookAction";

function SearchBar() {
  const dispatch = useDispatch();

  const bookList = useSelector((state) => state.bookList);
  const searchQueryEntered = useSelector((state) => state.searchQueryEntered);

  const [query, setQuery] = useState("");

  const handleClick = (e) => {
    const filteredList = bookList.filter((item) => {
      if (item.title.toLowerCase().includes(query.toLowerCase())) {
        return item;
      }
    });
    dispatch(setResultList(filteredList));
    dispatch(setSearchQuery(true));
    setQuery("");
  };
  const handleReset = () => {
    dispatch(setResultList([]));
    dispatch(setSearchQuery(false));
  };

  return (
    <div className="searchBarContainer">
      <div className="searchInputContainer">
        <input
          type="text"
          className="searchInput"
          placeholder="Search book by title"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={searchQueryEntered}
        />
      </div>
      <div className="btnContainer">
        <button
          className="btn"
          onClick={handleClick}
          disabled={searchQueryEntered}
        >
          Search
        </button>
        <button
          className="btn"
          onClick={handleReset}
          disabled={!searchQueryEntered}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
