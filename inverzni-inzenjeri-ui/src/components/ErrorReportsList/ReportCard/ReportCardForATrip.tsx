import React from "react";
import "./ReportCard.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/reducer";
import { errorReportsActions } from "../../../store/errorReports.slice";

export const ReportCardForATrip = (r: any) => {
  const dispatch = useDispatch();

  const { removeStatus } = useSelector(
    (state: RootState) => state.errorReports
  );

  function onSubmit(id: any) {
    dispatch(errorReportsActions.removeErrorReport(id));
  }

  if (removeStatus === "success") {
    window.location.reload(false);
  }

  return (
    <div className={"ReportCard-report"}>
      <div className={"ReportCard-notification"}>
        Korisnik{" "}
        <span className={"ReportCard-bold"}> {r.r.reporterUsername}</span> je
        prijavio grešku uz obrazloženje: "{r.r.explanation}".
      </div>
      <button
        onClick={() => onSubmit(r.r.id)}
        className={"ReportCard-removeButton"}
      >
        X
      </button>
    </div>
  );
};
