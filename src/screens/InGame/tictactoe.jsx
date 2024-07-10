import React from 'react';
import './styles.css';
import { useMultiplayerState, useIsHost } from 'playroomkit';

const Square = ({ value, onClick }) => (
  <button className="square" onClick={onClick}>
    {value}
  </button>
);

const Game = () => {
  const [gameState, setGameState] = useMultiplayerState('gameState', {
    squares: Array(9).fill(null),
    isXNext: true,
  });
  const isHost = useIsHost();

  const handleClick = (i) => {
    if (calculateWinner(gameState.squares) || gameState.squares[i]) return;
    if (isHost !== gameState.isXNext) return; 
    const newSquares = gameState.squares.slice();
    newSquares[i] = gameState.isXNext ? 'X' : 'O';
    setGameState({
      squares: newSquares,
      isXNext: !gameState.isXNext,
    });
  };

  const resetGame = () => {
    setGameState({
      squares: Array(9).fill(null),
      isXNext: true,
    });
  };

  const renderSquare = (i) => (
    <Square value={gameState.squares[i]} onClick={() => handleClick(i)} />
  );

  const winner = calculateWinner(gameState.squares);
  const status = winner ? `Winner: ${winner}` : `Next player: ${gameState.isXNext ? 'X' : 'O'}`;

  return (
    <div className="game">
      <div className="status">{status}</div>
      <div className="board">
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <button className="reset-button" onClick={resetGame}>Restart Game</button>
    </div>
  );
};

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Game;
