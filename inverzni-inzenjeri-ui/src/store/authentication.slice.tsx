import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Credentials} from "../models/Credentials";
import * as authApi from "../actions/authentication.action";
import * as userApi from "../actions/user.action";
import {UserDetails} from "../models/UserDetails";
import {HTTP_STATUS} from "../util/commonConstants";
import {appendParams} from "../util/commonFunctions";
import {AUTHENTICATION_PATHS} from "../actions/paths";
import {UserProfileDetails} from "../models/UserProfileDetails";

type Status = "idle" | "waiting" | "success" | "error";

const login = createAsyncThunk(
    "authentication/login",
    async (credentials: Credentials, thunkAPI) => {
        const params = new URLSearchParams();
        appendParams(params, {...credentials});
        const response = await fetch(
            `${AUTHENTICATION_PATHS.LOGIN_USER}?${params.toString()}`,
            {method: "POST"}
        ).then(function (response) {
            if (response.status === HTTP_STATUS.OK) {
                thunkAPI.dispatch(authenticationActions.getLoggedInUserDetails());
            }

        });

        return HTTP_STATUS.OK;
    }
);

const logout = createAsyncThunk("authentication/logout", async () =>
    authApi.logout()
);

const getOnDutyStatus = createAsyncThunk("user/onDutyStatus", async () =>
    userApi.getOnDutyStatus()
);

const getLoggedInUserDetails = createAsyncThunk(
    "user/loggedInDetails",
    async () => userApi.getLoggedInUserDetails()
);

const getLoggedInUserProfileDetails = createAsyncThunk(
    "user/loggedInProfileDetails",
    async () => userApi.getLoggedInUserProfileDetails()
);

const getUserProfileDetails = createAsyncThunk(
    "user/ProfileDetails",
    async (id: number) => userApi.getUserProfileDetails(id)
);

const initialState = {
    isLoggedIn: false,
    loginStatus: "idle" as Status,
    badCredentials: false,
    logoutStatus: "idle" as Status,
    userDetails: {} as UserDetails, // basic info about my profile
    getDetailsStatus: "idle" as Status,
    userProfileDetails: {} as UserProfileDetails, // all the info about someone else's profile
    getProfileDetailsStatus: "idle" as Status,
    myProfileDetails: {} as UserProfileDetails, // all the info about my profile
    getMyProfileDetailsStatus: "idle" as Status,
    getOnDutyStatus: "idle" as Status,
    onDutyStatus: false,
};

const authenticationSlice = createSlice({
    initialState,
    name: "authentication",
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state, action) => {
            state.loginStatus = "waiting";
        });

        builder.addCase(login.rejected, (state, action) => {
            state.loginStatus = "error";
        });

        builder.addCase(login.fulfilled, (state, action) => {
            state.loginStatus = "success";
            if (action.payload) {
                state.isLoggedIn = true;
                state.badCredentials = false;
            } else {
                state.badCredentials = true;
            }
        });

        builder.addCase(getOnDutyStatus.pending, (state, action) => {
            state.getOnDutyStatus = "waiting";
        });

        builder.addCase(getOnDutyStatus.rejected, (state, action) => {
            state.getOnDutyStatus = "error";
        });

        builder.addCase(getOnDutyStatus.fulfilled, (state, action) => {
            state.getOnDutyStatus = "success";
            state.onDutyStatus = action.payload;
        });

        builder.addCase(logout.pending, (state, action) => {
            state.logoutStatus = "waiting";
        });

        builder.addCase(logout.rejected, (state, action) => {
            state.logoutStatus = "error";
        });

        builder.addCase(logout.fulfilled, (state, action) => {
            state.logoutStatus = "success";
            state.isLoggedIn = false;
            state.userDetails = {} as UserDetails;
        });

        builder.addCase(getLoggedInUserDetails.pending, (state, action) => {
            state.getDetailsStatus = "waiting";
        });

        builder.addCase(getLoggedInUserDetails.rejected, (state, action) => {
            state.getDetailsStatus = "error";
        });

        builder.addCase(getLoggedInUserDetails.fulfilled, (state, action) => {
            if (action.payload) {
                state.getDetailsStatus = "success";
                state.userDetails = action.payload;
                state.isLoggedIn = true;
            } else {
                state.getDetailsStatus = "error";
                state.isLoggedIn = false;
                state.userDetails = {} as UserDetails;
            }
        });

        builder.addCase(getLoggedInUserProfileDetails.pending, (state, action) => {
            state.getMyProfileDetailsStatus = "waiting";
        });

        builder.addCase(getLoggedInUserProfileDetails.rejected, (state, action) => {
            state.getMyProfileDetailsStatus = "error";
        });

        builder.addCase(
            getLoggedInUserProfileDetails.fulfilled,
            (state, action) => {
                if (action.payload) {
                    state.getMyProfileDetailsStatus = "success";
                    state.myProfileDetails = action.payload;
                    state.isLoggedIn = true;
                } else {
                    state.getMyProfileDetailsStatus = "error";
                    state.isLoggedIn = false;
                    state.myProfileDetails = {} as UserProfileDetails;
                }
            }
        );

        builder.addCase(getUserProfileDetails.pending, (state, action) => {
            state.getProfileDetailsStatus = "waiting";
        });

        builder.addCase(getUserProfileDetails.rejected, (state, action) => {
            state.getProfileDetailsStatus = "error";
        });

        builder.addCase(getUserProfileDetails.fulfilled, (state, action) => {
            if (action.payload) {
                state.getProfileDetailsStatus = "success";
                state.userProfileDetails = action.payload;
                state.isLoggedIn = true;
            } else {
                state.getProfileDetailsStatus = "error";
                state.isLoggedIn = false;
                state.userProfileDetails = {} as UserProfileDetails;
            }
        });
    },
});

export const authentication = authenticationSlice.reducer;
export const authenticationActions = {
    login,
    logout,
    getLoggedInUserDetails,
    getUserProfileDetails,
    getLoggedInUserProfileDetails,
    getOnDutyStatus,
};
