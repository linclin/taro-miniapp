
import { configureStore } from '@reduxjs/toolkit';
// import storage from 'redux-persist/lib/storage';
// import storage from './redux-persist-taro-storage';
import { combineReducers } from 'redux';
// import { persistReducer } from 'redux-persist';

// 创建的reducer
import tabBarReducer from './tabBar';
// combineReducers合并reducer
const reducers = combineReducers({
  tabBar: tabBarReducer,
});
// const persistConfig = {
//   key: 'root',
//   storage,
//   blacklist:[''] // 黑名单 不缓存的
// };
//const persistedReducer = persistReducer(persistConfig, reducers);
const store = configureStore({
  //reducer: persistedReducer,
  reducer: reducers,
  devTools: process.env.NODE_ENV !== 'production', 
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch