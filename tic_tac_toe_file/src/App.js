import React, { useEffect, useState } from "react";
import SquareComponent from "./modules/SquareComponent";

// Khaali board ka initial state define kar rahe hain
const clearState = ["", "", "", "", "", "", "", "", "", ""];

function App() {
  const [gameState, updateGameState] = useState(clearState);
  const [isXChance, updateIsXChance] = useState(false);

  // Jab user kisi square par click karega, ye function call hoga
  const onUserClicked = (index) => {
    let strings = Array.from(gameState);
    if (strings[index]) return;
    strings[index] = isXChance ? "X" : "0";
    updateIsXChance(!isXChance);
    updateGameState(strings);
  };

  // Game reset karne ke liye function
  const clearGame = () => {
    updateGameState(clearState);
  };

  useEffect(() => {
    let winner = checkWinner();
    if (winner) {
      clearGame();
      alert(`Congratulations ${winner}   , You won !`);
    }
  }, [gameState]);

  // Winner check karne ka function
  const checkWinner = () => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        gameState[a] &&
        gameState[a] === gameState[b] &&
        gameState[a] === gameState[c]
      ) {
        return gameState[a];
      }
    }
    return null;
  };

  return (
    <div className="app-header">
      <p className="heading-text">Tic Tac Toe ( 3 T )</p>
      <div className="row jc-center">
        <SquareComponent
          className="b-bottom-right"
          onClick={() => onUserClicked(0)}
          state={gameState[0]}
        />
        <SquareComponent
          className="b-bottom-right"
          onClick={() => onUserClicked(1)}
          state={gameState[1]}
        />
        <SquareComponent
          className="b-bottom"
          onClick={() => onUserClicked(2)}
          state={gameState[2]}
        />
      </div>
      <div className="row jc-center">
        <SquareComponent
          className="b-bottom-right"
          onClick={() => onUserClicked(3)}
          state={gameState[3]}
        />
        <SquareComponent
          className="b-bottom-right"
          onClick={() => onUserClicked(4)}
          state={gameState[4]}
        />
        <SquareComponent
          className="b-bottom"
          onClick={() => onUserClicked(5)}
          state={gameState[5]}
        />
      </div>
      <div className="row jc-center">
        <SquareComponent
          className="b-right"
          onClick={() => onUserClicked(6)}
          state={gameState[6]}
        />
        <SquareComponent
          className="b-right"
          onClick={() => onUserClicked(7)}
          state={gameState[7]}
        />
        <SquareComponent
          onClick={() => onUserClicked(8)}
          state={gameState[8]}
        />
      </div>
      <button className="clear-button" onClick={clearGame}>
        Clear Game
      </button>
      <p className="fc-aqua fw-600">@Web4Sell</p>
    </div>
  );
}

export default App;
