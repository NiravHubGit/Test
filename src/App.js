import React, { useState } from "react";

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const winnerData = calculateWinner(board);

  function handleClick(i) {
    if (board[i] || winnerData) return;

    const newBoard = [...board];
    newBoard[i] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  }

  return (
    <div className="app">
      <h1 className="title">TIC TAC TOE</h1>

      <p className="status">
        {winnerData
          ? `Winner: ${winnerData.player}`
          : board.includes(null)
          ? `Next Turn: ${isXNext ? "X" : "O"}`
          : "It's a Draw"}
      </p>

      <div className="board">
        {board.map((cell, i) => (
          <button
            key={i}
            className={`cell ${
              winnerData?.line.includes(i) ? "winner-cell" : ""
            }`}
            onClick={() => handleClick(i)}
          >
            {cell}
          </button>
        ))}
      </div>

      <button className="reset" onClick={resetGame}>
        Restart Game
      </button>

    </div>
  );
}

function calculateWinner(board) {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6],
  ];

  for (let line of lines) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { player: board[a], line };
    }
  }
  return null;
}
