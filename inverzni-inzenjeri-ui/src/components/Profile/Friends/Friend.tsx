import React from "react";
import { Card } from "semantic-ui-react";
import "./FriendList.css";

export default function Friend(props: any) {
  return (
    <Card href={"/profile/" + props.friend.id} className={"Friend-card"}>
      <Card.Content
        header={props.friend.firstName + " " + props.friend.lastName}
      />
      <div className={"cardDescriptionWrapper"}>
        <Card.Description
          content={
            props.friend.badge !== undefined && props.friend.badge !== null
              ? props.friend.badge.toLowerCase()
              : "no badge yet"
          }
        />
      </div>
    </Card>
  );
}
