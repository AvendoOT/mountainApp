import React from "react";
import "semantic-ui-css/semantic.min.css";
import {Card, Icon} from "semantic-ui-react";
import "../TripCard/TripCard.css";

export const HomepageEventCard = (t: any) => {

    return (
        <Card className={"card"} href={"/event/" + t.t.eventId}>
            <Card.Content header={"Tvoj prijatelj " + t.t.username + " ima novi događaj"}/>

            <Card.Content className={"card"}>
                <Icon name={"map marker alternate"}/>
                {t.t.area}
                <br/>
                <Icon name="map marker alternate"/>
                {t.t.eventName}
                <br/>
                <Icon name={"clock"}/>
                {t.t.date}
                <br/>
                <br/>
            </Card.Content>
        </Card>
    );
};
