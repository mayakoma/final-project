import React from "react";

function ShowDetails({ list }) {
   return (
    <ul>
      {list.map((e, index) => (
        <li key={index}>{e}</li>
      ))}
    </ul>
  );;
}

export default ShowDetails;
