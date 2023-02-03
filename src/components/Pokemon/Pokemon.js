import React from "react";

const Pokemon = ({ name, type, height, attack, defense, price }) => {
  return (
    <div style={{ border: "1px solid black", margin: "10px" }}>
      <p>Name: {name}</p>
      <p>Type: {type}</p>
      <p>Height: {height}</p>
      <p>Attack: {attack}</p>
      <p>Defense: {defense}</p>
      <p>Price: {price}</p>
    </div>
  );
};

export default Pokemon;
