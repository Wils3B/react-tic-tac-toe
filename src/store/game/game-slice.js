import { createSlice } from '@reduxjs/toolkit';
import oIcon from '../../icons/o.svg';
import xIcon from '../../icons/x.svg';

const verifyBoard = (board, movesLeft) => {
  console.log(movesLeft);
  if(movesLeft > 4) {
    return { isTheGameOver: false, winner: null, winnerCells: null };
  }

  const combinations = [
    [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }],
    [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }],
    [{ x: 2, y: 0 }, { x: 2, y: 1 }, { x: 2, y: 2 }],
    [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }],
    [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }],
    [{ x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }],
    [{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }],
    [{ x: 2, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 2 }],
  ];
  for (let i = 0; i < combinations.length; i++) {
    const c = combinations[i];
    if (
      board[c[0].x][c[0].y] &&
      board[c[0].x][c[0].y]?.count === board[c[1].x][c[1].y]?.count &&
      board[c[0].x][c[0].y]?.count === board[c[2].x][c[2].y]?.count
    ) {
      return {
        isTheGameOver: true,
        winner: board[c[0].x][c[0].y],
        winnerCells: c,
      };
    }
  }
  return { isTheGameOver: movesLeft === 0, winner: null, winnerCells: null };
};

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    board: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
    playerIndex: 0,
    players: [
      { name: 'Player 1', count: 1, icon: oIcon },
      { name: 'Player 2', count: -1, icon: xIcon }
    ],
    isTheGameOver: false,
    winner: null,
    winnerCells: null,
    movesLeft: 9,
  },
  reducers: {
    newMove(state, action) {
      const { payload } = action;
      const { players } = state;
      state.board[payload.x][payload.y] = players[state.playerIndex];
      state.playerIndex = (state.playerIndex + 1) % players.length;

      state.movesLeft -= 1;
      const { isTheGameOver, winner, winnerCells } = verifyBoard(state.board, state.movesLeft);
      state.isTheGameOver = isTheGameOver;
      state.winner = winner;
      state.winnerCells = winnerCells;
    },
    newGame(state) {
      state.board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
      state.isTheGameOver = false;
      state.winner = null;
      state.winnerCells = null;
      state.movesLeft = 9;
    }
  }
});

export const { newMove, newGame } = gameSlice.actions;

export default gameSlice.reducer;
