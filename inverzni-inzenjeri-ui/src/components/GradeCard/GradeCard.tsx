import React from "react";
import "./GradeCard.css";

export const GradeCard = (g: any) => {
  return (
    <div>
      <div className={"GradeCard-container"}>
        <div className={"GradeCard-userName"}>{g.g.creatorUsername}:</div>
        <div className={"GradeCard-data"}>
          <span>{g.g.grade}/10</span>
          <br />
          <span>{g.g.comment}</span>
        </div>
      </div>
    </div>
  );
};
