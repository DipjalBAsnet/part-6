import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNotification(state, action) {
      return {
        message: action.payload.message,
        duration: action.payload.duration,
      };
    },
    clearNotification() {
      return initialState;
    },
  },
});

export const setNotificationWithTimeout = (message, durationInSeconds) => {
  return (dispatch) => {
    dispatch(setNotification({ message, duration: durationInSeconds }));
    setTimeout(() => {
      dispatch(clearNotification());
    }, durationInSeconds * 1000);
  };
};

export const { setNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
