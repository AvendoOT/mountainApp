import React, {useEffect, useState} from "react";
import "semantic-ui-css/semantic.min.css";
import {Card, Icon} from "semantic-ui-react";
import {MessageRole} from "../../models/MessageRole";

export const NotificationCard = (t: any) => {
    const [from, setFrom] = useState();

    useEffect(() => {
        if (t.t.messageRole === MessageRole.EVENT_REQUEST) {
            setFrom("/event/" + t.t.event);
        } else {
            setFrom("/profile/" + t.t.from);
        }
    }, [])

    return (
        <Card href={from} className={"card"}>

            <Card.Content className={"card"}>
                <Icon name={"address card"}/>
                {t.t.name}
                <br/>
                <Icon name={"bullhorn"}/>
                {t.t.content}
                <br/>
            </Card.Content>

        </Card>
    );
};
