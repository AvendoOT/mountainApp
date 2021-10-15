import React from "react";
import { UserDetails } from "../../../models/UserDetails";
import { Icon } from "semantic-ui-react";
import "./BasicProfileInformation.css";
import noBadge from "./badges/award-badge-svgrepo-com.svg";
import bronzeBadge from "./badges/bronze-medal-svgrepo-com.svg";
import silverBadge from "./badges/silver-medal-svgrepo-com.svg";
import goldBadge from "./badges/gold-medal-svgrepo-com.svg";
import platinumBadge from "./badges/badge-svgrepo-com.svg";
import diamondBadge from "./badges/diamond-svgrepo-com.svg";

export default function BasicProfileInformation(props: UserDetails) {
  return (
    <div className={"basicProfileInformation-container"}>
      <div className={"basicProfileInformation-icon"}>
        <Icon name={"user"} size={"massive"} />
      </div>
      <div className={"basicProfileInformation-info"}>
        <div className={"basicProfileInformation-nameSurname"}>
          {props.firstName} {props.lastName}
        </div>
        <div className={"basicProfileInformation-username"}>
          {props.username}
        </div>
        <div className={"basicProfileInformation-email"}>{props.email}</div>
        <div className={"basicProfileInformation-role"}>
          {props.userRole.toLowerCase()}
        </div>
      </div>
      <div className={"basicProfileInformation-badge"}>
        {props.badge === "NOTHING" ? (
          <img src={noBadge} alt="no badge" width={130} />
        ) : null}
        {props.badge === "BRONZE" ? (
          <img src={bronzeBadge} alt="bronze badge" width={130} />
        ) : null}
        {props.badge === "SILVER" ? (
          <img src={silverBadge} alt="silver badge" width={130} />
        ) : null}
        {props.badge === "GOLD" ? (
          <img src={goldBadge} alt="gold badge" width={130} />
        ) : null}
        {props.badge === "PLATINUM" ? (
          <img src={platinumBadge} alt="platinum badge" width={130} />
        ) : null}
        {props.badge === "DIAMOND" ? (
          <img src={diamondBadge} alt="diamond badge" width={130} />
        ) : null}
      </div>
    </div>
  );
}
