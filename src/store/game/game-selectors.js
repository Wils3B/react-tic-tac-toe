export const currentPlayerSelector = state => {
  return state.game.players[state.game.playerIndex];
};

export const isWinnerCellSelector = state => {
  return (x, y) => state.game.isTheGameOver && state.game.winner && state.game.winnerCells.some(item => item.x === x && item.y === y);
}
