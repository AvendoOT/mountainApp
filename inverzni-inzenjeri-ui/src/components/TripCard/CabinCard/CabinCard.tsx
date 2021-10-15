import React, { useState } from "react";
import "semantic-ui-css/semantic.min.css";
import { Button, Collapse } from "@material-ui/core";
import { Icon } from "semantic-ui-react";
import { Cabin } from "../../../models/Cabin";

export default function CabinCard(props) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const cabin: Cabin = props.cabin;

  return (
    <div>
      <Button
        onClick={toggle}
        variant={"contained"}
        style={{ backgroundColor: "#64a3fc", margin: 1 }}
      >
        {cabin.name}{" "}
      </Button>

      <Collapse in={isOpen}>
        <Icon name={"tint"} />
        {cabin.water ? "Da" : "Ne"}
        <br />
        <Icon name={"utensils"} />
        {cabin.food ? "Da" : "Ne"}
        <br />
        <Icon name={"bed"} />
        {cabin.sleep ? "Da" : "Ne"}
        <br />
        <Icon name={"plug"} />
        {cabin.power ? "Da" : "Ne"}
        <br />
      </Collapse>
    </div>
  );
}
