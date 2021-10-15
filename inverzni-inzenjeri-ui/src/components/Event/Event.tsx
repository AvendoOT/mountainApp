import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/reducer";
import {eventActions} from "../../store/event.slice";
import {TripCard} from "../TripCard/TripCard";
import FriendList from "../Profile/Friends/FriendList";
import "semantic-ui-css/semantic.min.css";
import {Card, Icon} from "semantic-ui-react";

export default function Event(props) {
    const id: number = props.match.params.id;

    const dispatch = useDispatch();

    const {event, getEventStatus, acceptEventStatus} = useSelector(
        (state: RootState) => state.event
    );

    const {isLoggedIn, userDetails} = useSelector(
        (state: RootState) => state.authentication
    );

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(eventActions.getEventById(id));
        }
    }, [isLoggedIn, id, dispatch, acceptEventStatus]);

    if (getEventStatus !== "success") {
        console.log(getEventStatus);
        return <div>Greška pri dohvaćanju događaja s IDjem {id}</div>;
    }

    if (!isLoggedIn) {
        return <div>Morate biti logirani da biste dohvatili događaj.</div>;
    }

    const onClick = (eventId: number) => {
        dispatch(eventActions.acceptEventInvitation(eventId));
    }

    return (
        <div style={{textAlign: "center"}}>
            {event.invitedUsers.map(value => value.id).includes(userDetails.id) &&
            !event.acceptedUsers.map(value => value.id).includes(userDetails.id) &&
            <button className="othersProfile-button" style={{marginTop: "1em"}}
                    onClick={() => onClick(event.id)}>Prihvati poziv</button>
            }
            <div className={"friendListLabel"} style={{marginTop: "1em"}}>
                Događaj:
            </div>
            <Card centered={true}>
                <Card.Content>
                    <Card.Header>{event.name}</Card.Header>
                    <Card.Description>{event.description}</Card.Description>
                </Card.Content>
                <Card.Content>
                    <Icon name={"calendar alternate"}/>
                    {event.date}
                </Card.Content>
                <Card.Content href={"/profile/" + event.creator.id}>
                    <Card.Meta>Kreator zleta:</Card.Meta>
                    <Card.Content>
                        {event.creator.firstName} {event.creator.lastName}
                    </Card.Content>
                </Card.Content>
            </Card>
            <div className={"friendListLabel"} style={{marginTop: "1em"}}>
                Izlet koji će se posjetiti na događaju:
            </div>
            <div className={"Trip-tripCardContainer"}>
                <TripCard t={event.trip}/>
            </div>

            {event.invitedUsers.length > 0 ? (
                <div style={{textAlign: "center"}}>
                    <div className={"friendListLabel"} style={{marginTop: "1em"}}>
                        Lista pozvanih korisnika:
                    </div>
                    <FriendList friends={event.invitedUsers}/>
                </div>
            ) : (
                <div className={"friendListLabel"}>Nema pozvanih korisnika.</div>
            )}

            {event.acceptedUsers.length > 0 ? (
                <div style={{textAlign: "center"}}>
                    <div className={"friendListLabel"} style={{marginTop: "1em"}}>
                        Lista korisnika koji su potvrdili dolazak:
                    </div>
                    <FriendList friends={event.acceptedUsers}/>
                </div>
            ) : (
                <div
                    className={"friendListLabel"}
                    style={{marginTop: "1em", marginBottom: "1em"}}
                >
                    Nitko još nije potvrdio dolazak.
                </div>
            )}
        </div>
    );
}
