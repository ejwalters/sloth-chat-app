import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


const initialState = {
  value: 0,
  status: 'idle',
};

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    roomId: null,
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    enterRoom: (state, action) => {
      state.roomId = action.payload.roomId;
    },
    toggleForm: (state) => {
      state.showForm = !state.showForm;
    },
  },
});

export const { enterRoom } = appSlice.actions;
export const { toggleForm } = appSlice.actions;

export const selectRoomId = state => state.app.roomId;
export const selectShowForm = (state) => state.app.showForm;

export default appSlice.reducer;