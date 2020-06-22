import React from "react";

function Game({data, deleteGame}) {
  return <div style={{backgroundImage: `url(${data.background_image})`}} className="Game">
    <p>{data.name}</p>
    <p>{data.rating}</p>
    <button onClick={() => deleteGame(data.id)}>Delete</button>
    </div>;
}

export default Game;
