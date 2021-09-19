import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GameBoard from './components/GameBoard/GameBoard';
import { newGame } from './store/game/game-slice';
import { currentPlayerSelector } from './store/game/game-selectors';

function App() {
  const currentPlayer = useSelector(currentPlayerSelector);
  const dispatch = useDispatch();
  const isTheGameOver = useSelector(state => state.game.isTheGameOver);
  const winner = useSelector(state => state.game.winner);
  return (
    <div className="tic-tac-toe">
      <header className="d-flex justify-content-between align-items-center mb-2">
        <h2 className="mb-0">TicTacToe</h2>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => dispatch(newGame())}
        >
          New Gane
        </button>
      </header>
      <GameBoard />
      <div className="mt-2">
        {
          !isTheGameOver ?
          `${currentPlayer.name} has to play` :
          ( winner ? `${winner.name} won!` : 'No winner' )
        }
      </div>
    </div>
  );
}

export default App;
