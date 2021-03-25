import React, { useState, useEffect } from "react";
import "../styles/SearchBox.css";

const SearchBox = ({ history, location, match }) => {
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    if (location.pathname.split("/")[1] !== "search") {
      setKeyword("");
    }
  }, [location, setKeyword]);

  const submitHandler = (e) => {
    e.preventDefault();
    const trimWord = keyword.trim();
    if (trimWord) {
      history.push(`/search/${trimWord}`);
      setKeyword(trimWord);
    } else {
      history.push(`/`);
    }
  };

  return (
    <form onSubmit={submitHandler} className="flex">
      <input
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search posts..."
        className="search-input"
        value={keyword}
      ></input>
      <button type="submit" className="btn search-button">
        Search
      </button>
    </form>
  );
};

export default SearchBox;
