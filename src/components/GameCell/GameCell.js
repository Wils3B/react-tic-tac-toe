import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './game-cell.module.css';
import { newMove } from '../../store/game/game-slice';
import { isWinnerCellSelector } from '../../store/game/game-selectors';
const classNames = require('classnames');

export default function GameCell(props) {
  const dispatch = useDispatch();
  const handleCellClicked = () => {
    if (!isTheGameOver && !props.player) {
      const { x, y } = props;
      dispatch(newMove({ x, y }));
    }
  };
  const isWinnerCell = useSelector(isWinnerCellSelector)(props.x, props.y);
  const isTheGameOver = useSelector(state => state.game.isTheGameOver);
  return (
    <div
      className={classNames([
        styles['game-cell'],
        {
          [styles.available]: !isTheGameOver && !props.player,
          [styles.unavailable]: !!props.player,
          [styles['winner-cell']]: isWinnerCell,
        }
      ])}
      onClick={handleCellClicked}
    >
      {props.player ? (
        <img className={styles['cell-icon']} src={props.player.icon} alt={props.player.name} />
      ) : (
        ''
      )}
    </div>
  );
}
