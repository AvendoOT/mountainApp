import React, { useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/reducer";
import "../TripList/TripList.css";
import "./Homepage.css";
import { homepageActions } from "../../store/homepage.slice";
import { HomepageEventCard } from "./HomepageEventCard";
import { HomepageTripCard } from "./HomepageTripCard";
import { TripCard } from "../TripCard/TripCard";
import { HomepageBadgeCard } from "./HomepageBadgeCard";

export const Homepage = () => {
  const dispatch = useDispatch();
  const {
    trips,
    getTripStatus,
    events,
    getEventStatus,
    badges,
    getBadgeStatus,
  } = useSelector((state: RootState) => state.homepage);

  useEffect(() => {
    dispatch(homepageActions.getTrips());
    dispatch(homepageActions.getEvents());
    dispatch(homepageActions.getBadges());
  }, [dispatch]);

  if (
    getTripStatus === "success" &&
    getEventStatus === "success" &&
    getBadgeStatus === "success"
  ) {
    return (
      <div className={"Homepage-main"}>
        <div className={"Homepage-subContainer"}>
          <h3 className={"Homepage-subTitle"}>Novi izleti</h3>
          <div className={"Homepage-container"}>
            {trips.map((t) => (
              <div className={"Homepage-card"}>
                <HomepageTripCard t={t} />
              </div>
            ))}
          </div>
        </div>

        <div className={"Homepage-subContainer"}>
          <h3 className={"Homepage-subTitle"}>Novi događaji</h3>
          <div className={"Homepage-container"}>
            {events.map((t) => (
              <div className={"Homepage-card"}>
                <HomepageEventCard t={t} />
              </div>
            ))}
          </div>
        </div>

        <div className={"Homepage-subContainer"}>
          <h3 className={"Homepage-subTitle"}>Postignuća</h3>
          <div className={"Homepage-container"}>
            {badges.map((t) => (
              <div className={"Homepage-card"}>
                <HomepageBadgeCard t={t} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className={"Homepage-subContainer"}>
          <h2 style={{ fontSize: "xxx-large" }} className={"Homepage-subTitle"}>
            Dobrodošli na stranicu za planinare
          </h2>
        </div>
        <div className={"Homepage-subContainer"}>
          <h2 className={"Homepage-subTitle"}>
            Imate planinarske staze i izlete koje želite podijeliti s drugima?
          </h2>
          <h2 className={"Homepage-subTitle"}>
            Prijavite se i kreirajte vlastite izlete, upoznajte ljude te
            organizirajte događaje i planinarska druženja
          </h2>
          <br />
          <h2 className={"Homepage-subTitle"}>
            U slučaju da samo želite pronaći neku novu stazu za planinarenje,
            sve izlete možete pogledati na kartici
          </h2>
          <div className={"Homepage-subContainer"}>
            {" "}
            <a
              href="/trips"
              style={{
                textDecoration: "none",
                margin: "0 auto",
                fontSize: "x-large",
              }}
            >
              PLANINARSKI IZLETI
            </a>
          </div>
        </div>
      </div>
    );
  }
};
