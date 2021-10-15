import {UserRegistration} from "../models/UserRegistration";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Credentials} from "../models/Credentials";
import {HTTP_STATUS} from "../util/commonConstants";
import {authenticationActions} from "./authentication.slice";

type Status = "idle" | "waiting" | "success" | "error";

const REGISTER_USER = "/api/register";
const createUser = createAsyncThunk(
    "",
    async (registrationDTO: UserRegistration, thunkAPI): Promise<Response> => {
        const formData = new FormData();

        for (const [key, value] of Object.entries(registrationDTO)) {
            if (!!value) {
                formData.append(key, value);
            }
        }

        const response = await fetch(REGISTER_USER, {
            method: "POST",
            body: formData,
        });

        const credentials = {username: registrationDTO.username, password: registrationDTO.password} as Credentials
        if (response.status === HTTP_STATUS.OK) {
            thunkAPI.dispatch(authenticationActions.login(credentials));
        }

        return response;
    }
);

const initialState = {
    response: (undefined as unknown) as Response,
    addStatus: "idle" as Status,
};

const registerUserSlice = createSlice({
    initialState,
    name: "createUser",
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createUser.pending, (state, action) => {
            state.addStatus = "waiting";
        });

        builder.addCase(createUser.rejected, (state, action) => {
            state.addStatus = "error";
        });

        builder.addCase(createUser.fulfilled, (state, action) => {
            state.addStatus = "success";
            state.response = action.payload;
        });
    },
});
export const registerUser = registerUserSlice.reducer;
export const actions = {
    createUser,
};
