import React from "react";
import "./Search.css";
const Search = function () {
  return (
    <>
      <div className="Search">
        <textarea className="Search_data" />
        <button className="Search_button"> search</button>
      </div>
    </>
  );
};

export default Search;
