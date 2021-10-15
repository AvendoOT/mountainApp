import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/reducer";
import {authenticationActions} from "../../../store/authentication.slice";
import {friendRequestActions} from "../../../store/userFriends.slice";
import {isInteger} from "formik";
import {Redirect} from "react-router";
import BasicProfileInformation from "../BasicProfileInformation/BasicProfileInformation";
import {UserDetails} from "../../../models/UserDetails";
import {TripCard} from "../../TripCard/TripCard";
import FriendList from "../Friends/FriendList";
import "./OthersProfile.css";
import {SendFriendRequestDTO} from "../../../models/SendFriendRequestDTO";
import {MakeFriendsDTO} from "../../../models/MakeFriendsDTO";
import {getFavouriteTripsActions} from "../../../store/getFavouriteTrips.slice";

export default function OthersProfile(props) {
    const id: number = props.match.params.id;

    // used to know when to dispatch in order to send or accept friend request
    const [isSendingRequest, setIsSendingRequest] = useState(false);
    const [isAcceptingRequest, setIsAcceptingRequest] = useState(false);

    const dispatch = useDispatch();

    const {getFavouriteTripsStatus} = useSelector(
        (state: RootState) => state.getFavTrips
    );

    const {
        userDetails,
        getDetailsStatus,
        userProfileDetails,
        getProfileDetailsStatus,
        myProfileDetails,
        getMyProfileDetailsStatus,
    } = useSelector((state: RootState) => state.authentication);

    // const {isStompClientConnected} = useSelector((state: RootState) => state.notification);
    //
    // const stompClient = useStompClientContext();

    useEffect(() => {
        if (isSendingRequest) {
            dispatch(
                friendRequestActions.sendFriendRequest({
                    userId: userDetails.id,
                    friendId: userProfileDetails.id,
                } as SendFriendRequestDTO)
            );
            // const sendMessage = {
            //     to: userProfileDetails.id,
            //     from: userDetails.id,
            //     content: "Novi zahtjev za prijateljstvo",
            //     messageRole: MessageRole.FRIEND_REQUEST,
            // };
            // stompClient.send(
            //     "/api/notification/" + Number(userProfileDetails.id),
            //     {},
            //     JSON.stringify(sendMessage)
            // );
            setTimeout(() => {
                setIsSendingRequest(false);
            }, 100);
        } else if (isAcceptingRequest) {
            dispatch(
                friendRequestActions.makeFriends({
                    firstUserId: userDetails.id,
                    secondUserId: userProfileDetails.id,
                } as MakeFriendsDTO)
            );
            // const sendMessage = {
            //     to: userProfileDetails.id,
            //     from: userDetails.id,
            //     content: "Prihvaćen zahtjev za prijateljstvo",
            //     messageRole: MessageRole.ACCEPTED_FRIEND_REQUEST,
            // };
            // stompClient.send(
            //     "/api/notification/" + Number(userProfileDetails.id),
            //     {},
            //     JSON.stringify(sendMessage)
            // );
            setTimeout(() => {
                setIsAcceptingRequest(false);
            }, 100);
        } else {
            dispatch(authenticationActions.getLoggedInUserProfileDetails());
            dispatch(authenticationActions.getLoggedInUserDetails());
            dispatch(authenticationActions.getUserProfileDetails(id));
            dispatch(getFavouriteTripsActions.getFavouriteTrips());
        }
    }, [dispatch, id, isSendingRequest, isAcceptingRequest]);

    if (
        getDetailsStatus === "success" &&
        getProfileDetailsStatus === "success" &&
        getMyProfileDetailsStatus === "success" &&
        getFavouriteTripsStatus === "success"
        // && isStompClientConnected
    ) {
        if (!isInteger(id)) {
            return <Redirect to={"/"}/>;
        }
        if (userDetails.id === userProfileDetails.id) {
            return <Redirect to={"/myProfile"}/>;
        }

        let isFriend: boolean = false;
        let youPendingHim: boolean = false;
        let himPendingYou: boolean = false;
        let ud: UserDetails;
        if (
            userProfileDetails.pendingFriends !== null &&
            userProfileDetails.pendingFriends !== undefined
        ) {
            for (ud of userProfileDetails.pendingFriends) {
                if (userDetails.id === ud.id) {
                    himPendingYou = true;
                    break;
                }
            }
        }

        if (
            !himPendingYou &&
            myProfileDetails.pendingFriends !== null &&
            myProfileDetails.pendingFriends !== undefined
        ) {
            for (ud of myProfileDetails.pendingFriends) {
                if (ud.id === userProfileDetails.id) {
                    youPendingHim = true;
                    break;
                }
            }
        }

        if (
            !youPendingHim &&
            userProfileDetails.friends !== null &&
            userProfileDetails.friends !== undefined
        ) {
            for (ud of userProfileDetails.friends) {
                if (userDetails.id === ud.id) {
                    // check if there is current user's id in the friend ids
                    isFriend = true;
                    break;
                }
            }
        }

        // main code here
        return (
            <div>
                <BasicProfileInformation
                    id={userProfileDetails.id}
                    firstName={userProfileDetails.firstName}
                    lastName={userProfileDetails.lastName}
                    username={userProfileDetails.username}
                    userRole={userProfileDetails.userRole}
                    email={userProfileDetails.email}
                    badge={userProfileDetails.badge}
                />

                <div style={{textAlign: "center"}}>
                    {isFriend ? (
                        <button className={"othersProfile-button-disabled"} disabled={true}>
                            Prijatelj
                        </button>
                    ) : null}
                    {youPendingHim ? (
                        <button className={"othersProfile-button-disabled"} disabled={true}>
                            Zahtjev za prijateljstvom poslan
                        </button>
                    ) : null}
                    {himPendingYou ? (
                        <button
                            className={"othersProfile-button"}
                            onClick={() => setIsAcceptingRequest(true)}
                        >
                            Prihvatite zahtjev za prijateljstvom
                        </button>
                    ) : null}
                    {!isFriend && !youPendingHim && !himPendingYou ? (
                        <button
                            className={"othersProfile-button"}
                            onClick={() => setIsSendingRequest(true)}
                        >
                            Dodajte za prijatelja
                        </button>
                    ) : null}
                </div>

                {isFriend ? ( // if they're friends, show additional info
                    <div>
                        <br/>
                        {userProfileDetails.visitedTrips !== undefined &&
                        userProfileDetails.visitedTrips !== null &&
                        userProfileDetails.visitedTrips.length > 0 ? ( // if he has visited >1 trips, show these trips
                            <div>
                                <div style={{fontSize: "large", textAlign: "center"}}>
                                    {userProfileDetails.firstName} je dosad posjetio sljedeće
                                    izlete:
                                </div>
                                <div className={"Homepage-main"}>
                                    <div className={"Homepage-subContainer"}>
                                        <div
                                            className={"Homepage-container"}
                                            style={{
                                                border: "1px solid grey",
                                                padding: "2px",
                                            }}
                                        >
                                            {userProfileDetails.visitedTrips.map((t) => (
                                                <div className={"Homepage-card"}>
                                                    <TripCard t={t}/>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            // else say that this user hasn't yet visited any trips
                            <div style={{fontSize: "large", textAlign: "center"}}>
                                {userProfileDetails.firstName} do sad nije posjetio nijedan
                                izlet.
                            </div>
                        )}
                        {userProfileDetails.friends !== undefined &&
                        userProfileDetails.friends !== null &&
                        userProfileDetails.friends.length > 0 ? ( // if this user has any friends, show all of them
                            <FriendList friends={userProfileDetails.friends}/>
                        ) : (
                            // else say that this user has no friends yet
                            <div style={{marginTop: "10px", marginBottom: "5px"}}>
                                {userProfileDetails.firstName} nema još nijednog prijatelja.
                            </div>
                        )}
                    </div>
                ) : null}
            </div>
        );
    } else {
        return null;
    }
}
