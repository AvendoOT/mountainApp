import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/reducer";
import React, { useEffect } from "react";
import { errorReportsActions } from "../../store/errorReports.slice";
import { ReportCard } from "./ReportCard/ReportCard";
import { ReportCardForATrip } from "./ReportCard/ReportCardForATrip";

export const ErrorReportsListForATrip = (param: any) => {
  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector(
    (state: RootState) => state.authentication
  );
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(errorReportsActions.getErrorReportsByTripId(param.tripId));
    }
  }, [isLoggedIn, dispatch]);

  const { reportsForTrip, getReportsForTripStatus } = useSelector(
    (state: RootState) => state.errorReports
  );

  if (getReportsForTripStatus === "success" && reportsForTrip.length > 0) {
    return (
      <div>
        {reportsForTrip.map((report) => (
          <div>
            <ReportCardForATrip r={report} />
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ fontSize: "medium", margin: 20 }}>Nema prijava</div>
      </div>
    );
  }
};
