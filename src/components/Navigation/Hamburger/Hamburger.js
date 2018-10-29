import React from "react";
import classes from "./Hamburger.module.css";

const Hamburger = props => (
  <div className={classes.Hamburger} onClick={props.clicked}>
    <span />
    <span />
    <span />
  </div>
);

export default Hamburger;
