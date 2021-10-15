import React, { useEffect, useState } from "react";
import "semantic-ui-css/semantic.min.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/reducer";
import "../TripList/TripList.css";
import { NotificationActions } from "../../store/notification.slice";
import { NotificationCard } from "./NotificationCard";
import { isEmptyArray } from "formik";
import { HomepageTripCard } from "../Homepage/HomepageTripCard";

export const NotificationList = () => {
  const dispatch = useDispatch();
  const { notifications, getNotificationsStatus } = useSelector(
    (state: RootState) => state.notification
  );
  const { userDetails } = useSelector(
    (state: RootState) => state.authentication
  );

  useEffect(() => {
    dispatch(NotificationActions.getMessages());
  }, [dispatch]);

  const [seenLoopCalled, setSeenLoopCalled] = useState(false);

  useEffect(() => {
    if (getNotificationsStatus === "success" && notifications !== undefined) {
      if (notifications.length !== 0) {
        if (!seenLoopCalled) {
          setReceivedMessagesToSeen();
          setSeenLoopCalled(true);
        }
      }
    }
  }, [notifications]);

  const setReceivedMessagesToSeen = () => {
    [...notifications].reverse().some((message) => {
      console.log(message.to);
      console.log(userDetails.id);
      if (message.to) {
        if (message.seen) {
          return true;
        } else {
          dispatch(NotificationActions.setMessageSeen(message.id));
          dispatch(NotificationActions.notificationCounterAction("decrease"));
        }
      }
    });
  };

  if (getNotificationsStatus === "success") {
    if (isEmptyArray(notifications)) {
      return (
        <div className={"Homepage-subContainer"}>
          <h2 className={"Homepage-subTitle"}>Nema obavijesti</h2>
        </div>
      );
    } else {
      return (
        <div className={"Homepage-main"}>
          <div className={"Homepage-subContainer"} style={{ marginTop: 0 }}>
            <h3 className={"Homepage-subTitle"}>Obavijesti</h3>
            <div className={"Homepage-container"}>
              {notifications.map((t) => (
                <div className={"Homepage-card"}>
                  <NotificationCard t={t} />
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }
  } else {
    return <h2 className={"Homepage-subTitle"}>Nema obavijesti</h2>;
  }
};
