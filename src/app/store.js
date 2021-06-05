import { configureStore } from "@reduxjs/toolkit";
import channelReducer from "../features/channel/channelSlice";
import userReducer from "../features/user/userSlice";
import counterReducer from "../features/counter/counterSlice";
import watcherReducer from "../features/watcher/watcherSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    channel: channelReducer,
    user: userReducer,
    watcher: watcherReducer,
  },
});
