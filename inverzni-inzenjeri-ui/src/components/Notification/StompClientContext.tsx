import React, {useContext, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/reducer";
import * as Stomp from "stompjs";
import {NOTIFICATION_PATHS} from "../../actions/paths";
import {authenticationActions} from "../../store/authentication.slice";
import {NotificationActions} from "../../store/notification.slice";

const StompClientContext = React.createContext({} as StompClientState);

export const useStompClientContext = () => {
    return useContext(StompClientContext);
};

declare type StompClientProviderProps = {
    children?: React.ReactNode;
};

type StompClientState = Stomp.Client;

export const StompClientContextProvider = ({children}: StompClientProviderProps) => {
    const {userDetails} = useSelector(
        (state: RootState) => state.authentication
    );
    const {currentChatOtherUserId} = useSelector(
        (state: RootState) => state.notification
    );
    const [stompClient, setStompClient] = useState({} as StompClientState);
    const [notificationSubscription, setNotificationSubscription] = useState(
        {} as Stomp.Subscription
    );

    const dispatch = useDispatch();

    useEffect(() => {
        if (userDetails.id != undefined) {
            connectStompClientAndSubscribeToNotificationTopic();
        }
    }, [userDetails.id]);

    useEffect(() => {
        try {
            notificationSubscription.unsubscribe()
        } catch (err) {
            console.log("NOT YET SUBSCRIBED")
        }
        if (stompClient.subscribe != undefined) {
            if (stompClient.connected) {
                const subscription = stompClient.subscribe(
                    NOTIFICATION_PATHS.NOTIFICATION_TOPIC + userDetails.id,
                    (response) => {
                        if (currentChatOtherUserId != JSON.parse(response.body)) {
                            dispatch(NotificationActions.notificationCounterAction("increase"));
                        }
                    }
                );
                setNotificationSubscription(subscription);
            } else {
                connectStompClientAndSubscribeToNotificationTopic();
            }
        }
    }, [currentChatOtherUserId]);

    const connectStompClientAndSubscribeToNotificationTopic = () => {
        let ws_url;
        if (stompClient.disconnect != undefined) {
            stompClient.disconnect(() => {
            });
        }

        try {
            notificationSubscription.unsubscribe()
        } catch (err) {
            console.log("NOT YET SUBSCRIBED")
        }

        ws_url = NOTIFICATION_PATHS.WEBSOCKET_URL_FOR_STOMP_CLIENT_LOCAL_TESTING;

        const sc = Stomp.client(ws_url);
        sc.connect(
            {},
            () => {
                dispatch(NotificationActions.countUnseenMessages());
                try {
                    notificationSubscription.unsubscribe()
                } catch (err) {
                    console.log("NOT YET SUBSCRIBED")
                }
                console.log(ws_url);
                const subscription = sc.subscribe(
                    NOTIFICATION_PATHS.NOTIFICATION_TOPIC + userDetails.id,
                    (response) => {
                        if (currentChatOtherUserId != JSON.parse(response.body)) {
                            dispatch(NotificationActions.notificationCounterAction("increase"));
                        }
                    }
                );
                setNotificationSubscription(subscription);
                setStompClient(sc);
                dispatch(NotificationActions.setStompClientConnected(true));
            },
            () => {
                dispatch(NotificationActions.setStompClientConnected(false));
                dispatch(authenticationActions.getLoggedInUserDetails);
                if (userDetails.id) {
                    connectStompClientAndSubscribeToNotificationTopic();
                }
            }
        );
    };

    return (
        <StompClientContext.Provider value={stompClient}>
            {children}
        </StompClientContext.Provider>
    );
};