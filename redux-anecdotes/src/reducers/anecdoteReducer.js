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

export const voteForAnecdote = createAsyncThunk(
  "anecdotes/voteForAnecdote",
  async (anecdote) => {
    const updatedAnecdote = await anecdoteService.updateVote(anecdote);
    return updatedAnecdote;
  }
);

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnecdotes.fulfilled, (state, action) => {
        return action.payload.sort((a, b) => b.votes - a.votes);
      })
      .addCase(createAnecdote.fulfilled, (state, action) => {
        state.push(action.payload);
        return state.sort((a, b) => b.votes - a.votes); // Sort after adding the new anecdote
      })
      .addCase(voteForAnecdote.fulfilled, (state, action) => {
        const updatedAnecdote = action.payload;
        const anecdoteIndex = state.findIndex(
          (anecdote) => anecdote.id === updatedAnecdote.id
        );
        if (anecdoteIndex !== -1) {
          state[anecdoteIndex] = updatedAnecdote;
        }
        return state.sort((a, b) => b.votes - a.votes); // Sort after voting
      });
  },
});

export default anecdoteSlice.reducer;
