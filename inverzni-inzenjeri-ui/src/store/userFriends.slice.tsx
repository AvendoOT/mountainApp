import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as userApi from "../actions/user.action";
import { UserProfileDetails } from "../models/UserProfileDetails";
import { SendFriendRequestDTO } from "../models/SendFriendRequestDTO";
import { MakeFriendsDTO } from "../models/MakeFriendsDTO";

type Status = "idle" | "waiting" | "success" | "error";

const sendFriendRequest = createAsyncThunk(
  "user/sendFriendRequest",
  async (param: SendFriendRequestDTO) =>
    userApi.sendFriendRequest(param.userId, param.friendId)
);

const makeFriends = createAsyncThunk(
  "user/makeFriends",
  async (param: MakeFriendsDTO) =>
    userApi.makeFriends(param.firstUserId, param.secondUserId)
);

const initialState = {
  sentRequestUserResponse: {} as UserProfileDetails,
  getSentRequestStatus: "idle" as Status,
  makeFriendsUserResponse: {} as UserProfileDetails,
  getMakeFriendsStatus: "idle" as Status,
};

const sendFriendRequestSlice = createSlice({
  initialState,
  name: "sendFriendRequest",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(sendFriendRequest.pending, (state, action) => {
      state.getSentRequestStatus = "waiting";
    });

    builder.addCase(sendFriendRequest.rejected, (state, action) => {
      state.getSentRequestStatus = "error";
    });

    builder.addCase(sendFriendRequest.fulfilled, (state, action) => {
      if (action.payload) {
        state.getSentRequestStatus = "success";
        state.sentRequestUserResponse = action.payload;
      } else {
        state.getSentRequestStatus = "error";
        state.sentRequestUserResponse = {} as UserProfileDetails;
      }
    });

    builder.addCase(makeFriends.pending, (state, action) => {
      state.getMakeFriendsStatus = "waiting";
    });

    builder.addCase(makeFriends.rejected, (state, action) => {
      state.getMakeFriendsStatus = "error";
    });

    builder.addCase(makeFriends.fulfilled, (state, action) => {
      if (action.payload) {
        state.getMakeFriendsStatus = "success";
        state.makeFriendsUserResponse = action.payload;
      } else {
        state.getMakeFriendsStatus = "error";
        state.makeFriendsUserResponse = {} as UserProfileDetails;
      }
    });
  },
});

export const friendRequest = sendFriendRequestSlice.reducer;
export const friendRequestActions = {
  sendFriendRequest,
  makeFriends,
};
