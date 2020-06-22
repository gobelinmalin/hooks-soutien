import React, { useEffect, useState, useRef } from "react";
import Game from "./Game";
import axios from 'axios';

function GameList() {
  // useEffect[] remplace componentDidMount
  // useState remplace state
  // userEffect[state] remplace componentDidUpdate
  // set"state" remplace this.setState
  // useContext permet créer un state global
  // useRef remplace ref={}
  // useReducer remplace le reducer de redux via context
  // ...

  useEffect(() => {
    axios.get('https://wild-games.herokuapp.com/api/v1')
      .then(response => response.data)
      .then(data => setListOfGame(data))
  }, [])

  const [ listOfGame, setListOfGame ] = useState([]);
  const [ listOfFilter, setListOfFilter ] = useState([]);
  const [ filter, setFilter ] = useState(false)

  const refInputRating = useRef(null)

  const deleteGame = (id) => {
    const newListOfGame = listOfGame.filter(game => game.id !== id)
    setListOfGame(newListOfGame)
  }

  const filterGame = () => {
    const inputNumber = refInputRating.current.value
    const bestGames = inputNumber;
    let newBestGame = [];
    console.log(refInputRating)

    if(!filter) {
      newBestGame = listOfGame.filter(game => game.rating >= bestGames)
    } else {
      newBestGame = listOfGame
    }
    setListOfFilter(newBestGame)


    setFilter(!filter)
  }

  return (
    <div className="Game">
      Liste de produits:
      <input ref={refInputRating} type="number" />
      <button onClick={() => filterGame()}>{filter ? "Tous les jeux"  : "Je filtre"}</button>

      {!filter ? 
        listOfGame.map((game, index) => <Game key={index} data={game} deleteGame={deleteGame} />) 
        : 
        listOfFilter.map((game, index) => <Game key={index} data={game} deleteGame={deleteGame} />)
      }
    </div>
  );
}

export default GameList;
