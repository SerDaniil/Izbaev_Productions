import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

// import characterReducer from '../feature/game/components/player/reduxTK/characterSlice';

// Слайсы - это отдельные модули нашего приложения. У каждого слайса - свой редьюсер.

const store = configureStore({
  // теперь функция combineReducers не нужна
  reducer: {
    // characters: characterReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export type RootState = ReturnType<typeof store.getState>;

export default store;
