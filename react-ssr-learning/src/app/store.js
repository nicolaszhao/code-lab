import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";

// 这是 server 端注入的初始数据状态，如果运行的纯前端环境，应该是 undefined
const preloadedState = window.__PRELOADED_STATE__;

delete window.__PRELOADED_STATE__;

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
  preloadedState,
});
