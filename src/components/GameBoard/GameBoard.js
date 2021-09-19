import React from 'react';
import { useSelector } from 'react-redux';
import GameCell from '../GameCell/GameCell';
import styles from './game-board.module.css';

export default function GameBoard(props) {
  const board = useSelector(state => state.game.board);
  return (
    <div className={styles['game-grid']}>
      {board.map((row, x) =>
        row.map((cell, y) => (
          <GameCell x={x} y={y} player={cell} key={`${x}${y}`} />
        ))
      )}
    </div>
  );
}
