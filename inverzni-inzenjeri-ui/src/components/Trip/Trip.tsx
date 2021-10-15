import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { RootState } from "../../store/reducer";
import { authenticationActions } from "../../store/authentication.slice";
import { tripsActions } from "../../store/trips.slice";
import { TripCard } from "../TripCard/TripCard";
import { getFavouriteTripsActions } from "../../store/getFavouriteTrips.slice";
import { TripDTO } from "../../models/TripDTO";
import { CreateErrorReport } from "../CreateErrorReport/CreateErrorReport";
import { ErrorReportsListForATrip } from "../ErrorReportsList/ErrorReportsListForATrip";
import "./Trip.css";
import { CreateGradeForm } from "../CreateGradeForm/CreateGradeForm";
import { gradesActions } from "../../store/grade.slice";
import { GradeCard } from "../GradeCard/GradeCard";
import { Scrollbars } from "rc-scrollbars";
import { getArchivedTripsActions } from "../../store/getArchivedTrips.slice";
import { Redirect } from "react-router";
import userEvent from "@testing-library/user-event";
import { EditTrip } from "../EditTrip/EditTrip";

export default function Trip(props) {
  const id: number = props.match.params.id;
  const dispatch = useDispatch();

  const { trip, getTripByIdStatus } = useSelector(
    (state: RootState) => state.tripList
  );

  const {
    myProfileDetails,
    getMyProfileDetailsStatus,
    isLoggedIn,
  } = useSelector((state: RootState) => state.authentication);

  const { getFavouriteTripsStatus } = useSelector(
    (state: RootState) => state.getFavTrips
  );

  const {
    archivedTrips,
    getArchivedTripsStatus,
    addToArchivedStatus,
    removeFromArchivedStatus,
  } = useSelector((state: RootState) => state.getArchiveTrips);

  useEffect(() => {
    dispatch(authenticationActions.getLoggedInUserProfileDetails());
    dispatch(tripsActions.getTripById(id));
  }, [dispatch, id, isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getFavouriteTripsActions.getFavouriteTrips());
      dispatch(getArchivedTripsActions.getArchivedTrips());
    }
  }, [isLoggedIn]);

  const { reviewerIds } = useSelector((state: RootState) => state.grades);
  useEffect(() => {
    dispatch(gradesActions.getReviewers(trip.id));
  }, [trip.id, dispatch]);

  const { grades } = useSelector((state: RootState) => state.grades);
  useEffect(() => {
    dispatch(gradesActions.getGrades(trip.id));
  }, [trip.id, dispatch]);

  const addToArchived = (event: React.MouseEvent) => {
    event.stopPropagation();
    dispatch(getArchivedTripsActions.addToArchived(id));
    window.location.reload();
  };

  const removeFromArchived = (event: React.MouseEvent) => {
    event.stopPropagation();
    dispatch(getArchivedTripsActions.removeFromArchived(id));
    window.location.reload();
  };

  if (getTripByIdStatus !== "success") {
    return <div>Nije moguće dohvatiti izlet s id-jem {id}</div>;
  }

  let found: boolean = false;
  if (getMyProfileDetailsStatus === "success") {
    for (let i = 0; i < myProfileDetails.visitedTrips.length; i++) {
      if (myProfileDetails.visitedTrips[i].id == id) {
        found = true;
        break;
      }
    }
  }

  let alreadyReviewed: boolean = false;
  if (getMyProfileDetailsStatus === "success") {
    for (let i = 0; i < reviewerIds.length; i++) {
      if (reviewerIds[i] == myProfileDetails.id) {
        alreadyReviewed = true;
        break;
      }
    }
  }

  let alreadyArchived: boolean = false;
  if (
    getArchivedTripsStatus === "success" &&
    getMyProfileDetailsStatus === "success"
  ) {
    for (let i = 0; i < archivedTrips.length; i++) {
      if (archivedTrips[i].id == id) {
        alreadyArchived = true;
        break;
      }
    }
  }

  return (
    <div className={"Trip-mainContainer"}>
      <div className={"Trip-tripCardContainer"}>
        <TripCard t={trip} />

        <div className={"Trip-tripCardContainerElement"}>
          {isLoggedIn &&
          getMyProfileDetailsStatus === "success" &&
          found &&
          trip.creatorId !== myProfileDetails.id ? (
            <CreateErrorReport tripId={id} />
          ) : null}
        </div>

        <div className={"Trip-tripCardContainerElement"}>
          {isLoggedIn &&
          getMyProfileDetailsStatus === "success" &&
          found &&
          trip.creatorId !== myProfileDetails.id &&
          !alreadyReviewed ? (
            <CreateGradeForm tripId={id} />
          ) : alreadyReviewed ? (
            <div style={{ margin: 10, fontSize: 15 }}>
              Već ste ocijenili ovaj izlet
            </div>
          ) : null}
        </div>
        <div className={"Trip-tripCardContainerElement"}>
          {isLoggedIn &&
          getMyProfileDetailsStatus === "success" &&
          trip.creatorId === myProfileDetails.id ? (
            <ErrorReportsListForATrip tripId={id} />
          ) : null}
        </div>
        <div className={"Trip-tripCardContainerElement"}>
          {isLoggedIn &&
          getMyProfileDetailsStatus === "success" &&
          trip.creatorId === myProfileDetails.id ? (
            <a
              className={"CreateGradeForm-toggleButton"}
              href={"/edit/trip/" + trip.id}
            >
              Uredi izlet
            </a>
          ) : null}
        </div>

        {Array.from(grades).length > 0 ? (
          <Scrollbars
            style={{
              width: "70%",
              height: "300px",
              border: "1px solid grey",
              margin: "0 auto",
              borderColor: "#2e82f4",
            }}
          >
            <div className={"Trip-gradesList"}>
              {grades.map((g) => (
                <GradeCard g={g} />
              ))}
            </div>
          </Scrollbars>
        ) : null}
      </div>
      <br />

      {!found && !alreadyArchived && isLoggedIn ? (
        <div style={{ textAlign: "center" }}>
          <button
            className={"othersProfile-button"}
            onClick={(event) => addToArchived(event)}
          >
            Arhiviraj
          </button>
        </div>
      ) : null}

      {isLoggedIn && alreadyArchived ? (
        <div style={{ textAlign: "center" }}>
          <button
            className={"othersProfile-button"}
            onClick={(event) => removeFromArchived(event)}
          >
            Makni iz arhive
          </button>
        </div>
      ) : null}

      <br />
    </div>
  );
}
