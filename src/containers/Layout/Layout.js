import React, { Component } from "react";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar"
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer"
import {connect} from 'react-redux'

class Layout extends Component {
  state = {
    showSideDrawer: false
  }

  sideDrawerClosedHandler = () => {
    this.setState({showSideDrawer: false})
  }

  sideDrawerOpenedHandler = () => {
    this.setState({showSideDrawer: true})
  }

  render() {
    return (
      <>
        <SideDrawer isAuthenticated={this.props.isAuthenticated} open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
        <Toolbar isAuthenticated={this.props.isAuthenticated} hamburgerClicked={this.sideDrawerOpenedHandler} />
        <main className={classes.Content}>{this.props.children}</main>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(Layout);
