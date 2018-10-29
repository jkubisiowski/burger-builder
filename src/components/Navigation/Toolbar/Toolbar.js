import React from "react";
import classes from "./Toolbar.module.css";
import Logo from './../../Logo/Logo';
import NavigationItems from "../NavigationItems/NavigationItems";

const Toolbar = () => (
  <header className={classes.Toolbar}>
    <div>Menu</div>
    <Logo></Logo>
    <NavigationItems></NavigationItems>
  </header>
);

export default Toolbar;