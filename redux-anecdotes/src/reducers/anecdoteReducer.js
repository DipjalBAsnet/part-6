import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as anecdoteService from "../services/anecdotes";

export const fetchAnecdotes = createAsyncThunk(
  "anecdotes/fetchAnecdotes",
  async () => {
    const anecdotes = await anecdoteService.getAll();
    return anecdotes;
  }
);
export const createAnecdote = createAsyncThunk(
  "anecdotes/createAnecdote",
  async (content) => {
    const newAnecdote = await anecdoteService.createNew(content);
    return newAnecdote;
  }
);

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    voteForAnecdote(state, action) {
      const id = action.payload;
      const anecdote = state.find((a) => a.id === id);
      if (anecdote) anecdote.votes += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnecdotes.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(createAnecdote.fulfilled, (state, action) => {
        state.push(action.payload);
      });
  },
});

export const { voteForAnecdote } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
