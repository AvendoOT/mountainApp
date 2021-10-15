import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {NOTIFICATION_PATHS} from "../actions/paths";
import {MessageDTO} from "../models/MessageDTO";

type Status = "idle" | "waiting" | "success" | "error";

type CounterAction = "increase" | "decrease" | "reset";

const setStompClientConnected = createAsyncThunk(
    "chat/setStompClientConnected",
    async (isConnected: boolean) => isConnected
);

const setMessageSeen = createAsyncThunk(
    "notification/setMessageSeen",
    async (messageId: number | undefined): Promise<boolean> => {
        const response = await fetch(NOTIFICATION_PATHS.SET_MESSAGE_SEEN + messageId, {
            method: "PUT",
        });
        return response.ok;
    }
    )
;

const getMessages = createAsyncThunk(
    "notification/getNotifications",
    async (): Promise<MessageDTO[]> => {
        const response = await fetch(NOTIFICATION_PATHS.GET_NOTIFICATIONS);
        return response.json();
    }
);

const countUnseenMessages = createAsyncThunk(
    "chat/countUnseenMessages",
    async (): Promise<number | undefined> => {
        const response = await fetch(NOTIFICATION_PATHS.COUNT_UNSEEN_MESSAGES);
        if (response.ok) {
            return response.json();
        } else {
            return undefined;
        }
    }
);

const notificationCounterAction = createAsyncThunk(
    "chat/notificationCounterAction",
    async (counterAction: CounterAction) => {
        return counterAction;
    }
);

const setCurrentChatOtherUserId = createAsyncThunk(
    "chat/setCurrentChatOtherUserId",
    async (otherUserId: number) => {
        return otherUserId;
    }
);

type NotificationInitialState = {
    connectStatus: Status;
    notificationCounter: number;
    getChatStatus: Status;
    getCurrentChatDetailsStatus: Status;
    setMessageSeenStatus: Status;
    currentChatOtherUserId: number | undefined;
    isStompClientConnected: boolean;
    countUnseenMessagesStatus: Status;
    conversationStatusUpdateStatus: Status;
    notifications: MessageDTO[];
    getNotificationsStatus: Status;
};

const initialState = {
    connectStatus: "idle",
    sendMessageStatus: "idle",
    notificationCounter: 0,
    getChatStatus: "idle",
    getConversationsStatus: "idle",
    getCurrentChatDetailsStatus: "idle",
    setMessageSeenStatus: "idle",
    currentChatOtherUserId: undefined,
    isStompClientConnected: false,
    countUnseenMessagesStatus: "idle",
    conversationStatusUpdateStatus: "idle",
    notifications: [],
    getNotificationsStatus: "idle"
} as NotificationInitialState;

const notificationSlice = createSlice({
    initialState,
    name: "notification",
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(setStompClientConnected.fulfilled, (state, action) => {
            state.isStompClientConnected = action.payload;
        });
        builder.addCase(getMessages.pending, (state) => {
            state.getNotificationsStatus = "waiting";
        });
        builder.addCase(getMessages.rejected, (state) => {
            state.getNotificationsStatus = "error";
        });
        builder.addCase(getMessages.fulfilled, (state, action) => {
            state.notifications = action.payload;
            state.getNotificationsStatus = "success";
        });
        builder.addCase(setCurrentChatOtherUserId.fulfilled, (state, action) => {
            state.currentChatOtherUserId = action.payload;
        });
        builder.addCase(countUnseenMessages.pending, (state, action) => {
            state.countUnseenMessagesStatus = "waiting";
        });

        builder.addCase(countUnseenMessages.rejected, (state, action) => {
            state.countUnseenMessagesStatus = "error";
        });
        builder.addCase(countUnseenMessages.fulfilled, (state, action) => {
            if (action.payload === undefined) {
                state.countUnseenMessagesStatus = "error";
            } else {
                state.notificationCounter = action.payload;
            }
        });
        builder.addCase(notificationCounterAction.fulfilled, (state, action) => {
            if (action.payload === "increase") {
                state.notificationCounter++;
            } else if (action.payload === "decrease") {
                state.notificationCounter--;
            } else {
                state.notificationCounter = 0;
            }
        });
        builder.addCase(setMessageSeen.pending, (state, action) => {
            state.setMessageSeenStatus = "waiting";
        });

        builder.addCase(setMessageSeen.rejected, (state, action) => {
            state.setMessageSeenStatus = "error";
        });

        builder.addCase(setMessageSeen.fulfilled, (state, action) => {
            if (action.payload) {
                state.setMessageSeenStatus = "success";
            } else {
                state.setMessageSeenStatus = "error";
            }
        });
    }
});

export const notification = notificationSlice.reducer;
export const NotificationActions = {
    setStompClientConnected,
    countUnseenMessages,
    setCurrentChatOtherUserId,
    notificationCounterAction,
    getMessages,
    setMessageSeen
}