import React from "react";
import "semantic-ui-css/semantic.min.css";
import {Card, Icon} from "semantic-ui-react";
import "../TripCard/TripCard.css";

export const HomepageBadgeCard = (t: any) => {

    return (
        <Card className={"card"} href={"/profile/" + t.t.userId}>
            <Card.Content header={"Tvoj prijatelj " + t.t.username}/>

            <Card.Content className={"card"}>
                <Icon name={"map marker alternate"}/>
                {t.t.badge}
                <br/>
                <br/>
            </Card.Content>
        </Card>
    );
};
