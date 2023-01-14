import React from "react";
import { useHttpClient } from "../../Hook/HttppHook";

function ShowDetails({ list }) {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const deleteObject = async (objId) => {
    try {
      const responseData = await sendRequest(
        `http://localhost:3001/user/delete`,
        "DELETE",
        JSON.stringify({
          userId: objId,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      console.log(responseData);
    } catch (err) {}
  };

  return (
    <ul className="showDetails">
      {list != [] &&
        list.map((l, i) => (
          <li key={i} className="showDetails_userItem">
            <div className="showDetails_info">
              <p>email: {l.email}</p>
              <p>user Name: {l.userName}</p>
              <p>Area: {l.area}</p>
              <p>Gender: {l.gender}</p>
            </div>
            <button
              className="showDetails_delBtn"
              onClick={function () {
                deleteObject(l._id);
              }}
            >
              delete
            </button>
          </li>
        ))}
    </ul>
  );
}

export default ShowDetails;
