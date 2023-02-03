import React, { useEffect, useContext } from "react";
import { useHttpClient } from "../../Hook/HttppHook";
import { DataContext } from "../../context/data-context";

import "./Search.css";
const Search = function () {
  const data = useContext(DataContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const search = (filter) => {
    data.addToList(filter);
  };

  return (
    <>
      <div className="Search">
        <textarea
          className="Search_data"
          onChange={(e) => search(e.target.value)}
        />
        <button className="Search_button"> search</button>
      </div>
    </>
  );
};

export default Search;
