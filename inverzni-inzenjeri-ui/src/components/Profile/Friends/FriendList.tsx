import React from "react";
import Friend from "./Friend";
import { Scrollbars } from "rc-scrollbars";
import "./FriendList.css";

export default function FriendList(props: any) {
  return (
    <div className={"friendListWrapper"}>
      <Scrollbars
        style={{
          width: "100%",
          height: "300px",
          border: "1px solid grey",
          display: "inline-block",
          borderRadius: "4px",
          borderColor: "#2e82f4",
        }}
      >
        {props.friends.map((f) => (
          <div className={"FriendList-cardDiv"}>
            <Friend friend={f} />
          </div>
        ))}
      </Scrollbars>
    </div>
  );
}
