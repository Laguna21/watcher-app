import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EVENT_URI } from "../../const";

const initialState = {
  value: [],
  status: "idle",
};

export const watcherEvent = createAsyncThunk(
  "watcher/watcherEvent",
  async () => {
    const res = await fetch(EVENT_URI, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    //console.log("ESTOS SON LOS DATOS", data);
    return data;
  }
);

export const watcherSlice = createSlice({
  name: "watcher",
  initialState,

  reducers: {
    increment: (state) => {},
    decrement: (state) => {},
  },

  extraReducers: (builder) => {
    builder
      .addCase(watcherEvent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(watcherEvent.rejected, (state) => {
        state.status = "Error";
      })
      .addCase(watcherEvent.fulfilled, (state, action) => {
        state.status = "idle";
        console.log("el evento cambio", action.payload.length);
        if (action.payload.length === 0) {
          console.log("no llego informacion", action.payload);
        } else {
          state.value = [...action.payload];
          console.log("el evento cambio", state.value.length);
        }
      });
  },
});

export const { increment, decrement } = watcherSlice.actions;

export const watcherValue = (state) => state.watcher.value;

export default watcherSlice.reducer;
