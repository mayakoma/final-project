import Button from "../Button/Button";
import React from "react";

function ShowDetails({ list }) {
  return (
    <ul className="showDetails">
      {list.map((l, i) => (
        <li key={i} className="showDetails_userItem">
          <div className="showDetails_info">
            <p>email: {l.email}</p>
            <p>user Name: {l.userName}</p>
            <p>Area: {l.area}</p>
            <p>Gender: {l.gender}</p>
          </div>
          <button className="showDetails_delBtn">delete</button>
        </li>
      ))}
    </ul>
  );
}

export default ShowDetails;
