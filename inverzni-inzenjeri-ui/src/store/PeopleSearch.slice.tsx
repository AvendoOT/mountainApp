import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PeopleFilterValues } from "../models/PeopleFilterValues";
import { Page } from "../models/Page";
import * as api from "../actions/user.action";
import { UserDetails } from "../models/UserDetails";

type Status = "idle" | "waiting" | "success" | "error";

const peopleFilter = createAsyncThunk(
  "users/filterUsers",
  async (model: PeopleFilterValues) => api.peopleFilter(model.keyWords, 20, 0)
);

const initialState = {
  searchedPeople: {} as Page<UserDetails>,
  searchedPeopleStatus: "idle" as Status,
};

const searchSlice = createSlice({
  initialState,
  name: "searchPeople",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(peopleFilter.pending, (state, action) => {
      state.searchedPeopleStatus = "waiting";
    });

    builder.addCase(peopleFilter.rejected, (state, action) => {
      state.searchedPeopleStatus = "error";
    });

    builder.addCase(peopleFilter.fulfilled, (state, action) => {
      state.searchedPeopleStatus = "success";
      state.searchedPeople = action.payload;
    });
  },
});

export const searchPeople = searchSlice.reducer;
export const searchActions = {
  peopleFilter,
};
