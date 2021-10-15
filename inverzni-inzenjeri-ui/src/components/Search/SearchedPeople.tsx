import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducer";
import FriendList from "../Profile/Friends/FriendList";

export const SearchedPeople = () => {
  const { searchedPeople, searchedPeopleStatus } = useSelector(
    (state: RootState) => state.searchPeople
  );

  if (searchedPeopleStatus === "success" && searchedPeople.totalElements) {
    return <FriendList friends={searchedPeople.content} />;
  } else {
    return <div>Nema pronađenih planinara.</div>;
  }
};
