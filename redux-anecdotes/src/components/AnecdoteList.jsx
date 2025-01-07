import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { voteForAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(voteForAnecdote(id));
  };

  return (
    <div>
      {anecdotes
        .slice() // Create a copy of the array to avoid mutating the original state
        .sort((a, b) => b.votes - a.votes) // Sort by votes in descending order
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AnecdoteList;
