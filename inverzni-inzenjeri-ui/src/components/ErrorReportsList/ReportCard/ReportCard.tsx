import React, { useEffect } from "react";
import "./ReportCard.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/reducer";
import { errorReportsActions } from "../../../store/errorReports.slice";

export const ReportCard = (r: any) => {
  const dispatch = useDispatch();

  const { removeStatus, removedReport } = useSelector(
    (state: RootState) => state.errorReports
  );

  function onSubmit(id: any) {
    dispatch(errorReportsActions.removeErrorReport(id));
  }

  useEffect(() => {
    if (removeStatus === "success") {
      window.location.reload();
    }
  }, [removedReport]);

  return (
    <div className={"ReportCard-report"}>
      <div className={"ReportCard-notification"}>
        Korisnik{" "}
        <span className={"ReportCard-bold"}> {r.r.reporterUsername}</span> je
        prijavio grešku na izletu{" "}
        <span className={"ReportCard-bold"}>#{r.r.tripId}</span> s
        obrazloženjem: "{r.r.explanation}".
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
