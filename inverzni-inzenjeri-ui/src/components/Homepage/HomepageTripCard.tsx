import React from "react";
import "semantic-ui-css/semantic.min.css";
import {Card, Icon} from "semantic-ui-react";
import "../TripCard/TripCard.css";

export const HomepageTripCard = (t: any) => {

    return (
        <Card className={"card"} href={"/trip/" + t.t.tripId}>
            <Card.Content header={"Tvoj prijatelj " + t.t.username + " ima novi izlet"}/>

            <Card.Content className={"card"}>
                <Icon name={"map marker alternate"}/>
                {t.t.area}
                <br/>
                <Icon name={"caret up"}/>
                {t.t.peak}
                <br/>
                <br/>
            </Card.Content>
        </Card>
    );
};
