import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CHANNEL_LIST_URI } from "../../const";

const initialState = {
  channel: {},
  channelList: [],
  status: "idle",
};

export const getChannels = createAsyncThunk("channel/getChannels", async () => {
  const res = await fetch(CHANNEL_LIST_URI, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log("cargando los canales");
  const data = await res.json();
  return data;
});

export const channelSlice = createSlice({
  name: "channel",
  initialState,

  reducers: {
    increment: (state) => {},
    channelListRemove: (state, action) => {
      const newChannelList = state.channelList.filter((e) =>
        e.id !== action.payload.id ? e : null
      );
      state.channelList = [...newChannelList];
      console.log("ACTUALIZAndo el canal desde el reducer channel slicer");
    },
    decrement: (state) => {},

    channelListAdd: (state, action) => {
      const localChannelList = [...state.channelList];
      const exist = localChannelList.some(
        (obj) => obj.id === action.payload.id
      );
      if (!exist) {
        state.channelList = [...state.channelList, action.payload];
      } else {
        console.log("EL ITEM YA EXISTE ", action.payload);
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getChannels.rejected, (state) => {
        state.status = "Error";
      })
      .addCase(getChannels.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getChannels.fulfilled, (state, action) => {
        state.status = "idle";
        state.channelList = [...action.payload];
      });
  },
});

export const {
  increment,
  decrement,
  addChannel,
  channelListRemove,
  channelListAdd,
} = channelSlice.actions;

export const channel = (state) => state.channel.channel;
export const channelsList = (state) => state.channel.channelList;

export default channelSlice.reducer;
