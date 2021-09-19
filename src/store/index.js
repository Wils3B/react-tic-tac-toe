import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './game/game-slice';

export default configureStore({
  reducer: {
    game: gameReducer
  }
});
