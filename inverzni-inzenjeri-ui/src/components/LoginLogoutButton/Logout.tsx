import React, {useEffect} from "react";
import {RootState} from "../../store/reducer";
import {useDispatch, useSelector} from "react-redux";
import {authenticationActions} from "../../store/authentication.slice";

export const Logout = () => {
    const dispatch = useDispatch();
    const { isLoggedIn, logoutStatus } = useSelector(
        (state: RootState) => state.authentication
    );

    useEffect(() => {
                dispatch(authenticationActions.logout());
        }, [dispatch]);

    if (!isLoggedIn && logoutStatus === "success") {
        window.location.reload();
    }
    return (
        <div className="pt-10">
            {isLoggedIn && logoutStatus === "waiting" ? <div>Odjava...</div> : null}
        </div>
    );
};