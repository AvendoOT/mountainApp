import React from "react";
import "semantic-ui-css/semantic.min.css";
import {Card, Icon, Image} from "semantic-ui-react";
import "./TripCard.css";
import image from "./hiking_man.jpg";
import CabinCard from "./CabinCard/CabinCard";
import getHoursMinutes from "./getHoursMinutes";
import {RootState} from "../../store/reducer";
import {useDispatch, useSelector} from "react-redux";
import {getFavouriteTripsActions} from "../../store/getFavouriteTrips.slice";

export const TripCard = (t: any) => {
    const dispatch = useDispatch();

    const {isLoggedIn} = useSelector(
        (state: RootState) => state.authentication
    );

    const {favouriteTrips} = useSelector(
        (state: RootState) => state.getFavTrips
    );

    const addToFavourites = (event: React.MouseEvent) => {
        event.stopPropagation();
        dispatch(getFavouriteTripsActions.addToFavourites(t.t.id));
    };

    const removeFromFavourites = (event: React.MouseEvent) => {
        event.stopPropagation();
        dispatch(getFavouriteTripsActions.removeFromFavourites(t.t.id));
    };

    const renderButton = () => {
        if (!isLoggedIn) return null;
        if (favouriteTrips.includes(t.t.id)) {
            return (
                <button
                    className={"tripCard-button"}
                    onClick={(event) => removeFromFavourites(event)}
                >
                    <Icon name={"heart"}/>
                </button>
            );
        }
        return (
            <button
                className={"tripCard-button"}
                onClick={(event) => addToFavourites(event)}
            >
                <Icon name={"heart outline"}/>
            </button>
        );
    };

    return (
        <Card className={"card"}>
            <Card.Content header={"Izlet #" + t.t.id} href={"/trip/" + t.t.id}/>
            <Card.Content href={"/trip/" + t.t.id}>
                <Image
                    src={image}
                    alt={"Image???"}
                    centered={true}
                    circular={true}
                    size={"tiny"}
                />
            </Card.Content>

            <Card.Content className={"card"}>
                <Icon name={"map marker alternate"}/>
                {t.t.area}
                <br/>
                <Icon name={"clock"}/>
                {getHoursMinutes(t.t.duration)}
                <br/>
                <Icon name={"chart line"}/>
                {t.t.difficulty}/5
                <br/>
                <Icon name={"caret up"}/>
                {t.t.peak}
                <br/>
                <Icon name={"resize horizontal"}/>
                {t.t.length} km
                <br/>
                <Icon name={"star"}/>
                {t.t.rate}/10
                <br/>
                <br/>
            </Card.Content>

            <Card.Content className={"card grid"}>
                {t.t.cabins.map((cabin, index) => {
                    return <CabinCard key={index} cabin={cabin}/>;
                })}
            </Card.Content>

            <Card.Content
                description={'"' + t.t.description + '"'}
                className={"tripDescription"}
            />

            {renderButton()}
        </Card>
    );
};
