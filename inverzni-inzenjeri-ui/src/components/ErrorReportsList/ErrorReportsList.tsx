import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/reducer";
import React, { useEffect } from "react";
import { errorReportsActions } from "../../store/errorReports.slice";
import { ReportCard } from "./ReportCard/ReportCard";
import { authenticationActions } from "../../store/authentication.slice";

export const ErrorReportsList = () => {
  const dispatch = useDispatch();

  const { userDetails } = useSelector(
    (state: RootState) => state.authentication
  );
  useEffect(() => {
    if (userDetails.id !== undefined) {
      dispatch(errorReportsActions.getErrorReports(userDetails.id));
    } else {
      dispatch(authenticationActions.getLoggedInUserDetails());
    }
  }, [userDetails.id, dispatch]);

  const { reports, getReportStatus } = useSelector(
    (state: RootState) => state.errorReports
  );

  if (getReportStatus === "success" && reports.length > 0) {
    return (
      <div>
        {reports.map((report) => (
          <div className={"Homepage-subContainer"}>
            <h2 className={"Homepage-subTitle"}>Prijave grešaka</h2>
            <ReportCard r={report} />
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div className={"Homepage-subContainer"}>
        <h2 className={"Homepage-subTitle"}>Nema prijava grešaka</h2>
      </div>
    );
  }
};
