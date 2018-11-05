import React from "react";
import classes from "./Toolbar.module.css";
import Logo from "./../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Hamburger from "../Hamburger/Hamburger";

const Toolbar = props => (
  <header className={classes.Toolbar}>
    <div className={classes.MobileOnly}>
      <Hamburger clicked={props.hamburgerClicked} />
    </div>
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems isAuthenticated={props.isAuthenticated}/>
    </nav>
  </header>
);

export default Toolbar;
