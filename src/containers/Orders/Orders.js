import React, { Component } from "react";
import { connect } from "react-redux";
import Order from "./../../components/Order/Order";
import axios from "../../axios-orders";
import WithErrorHandler from "./../../components/UI/WithErrorHandler/WithErrorHandler";
import * as actions from "../../store/actions/index";
import Spinner from "./../../components/UI/Spinner/Spinner";

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders();
  }

  render() {
    let orders = <Spinner />;
    if (!this.props.loading) {
      orders = (
        <div>
          {this.props.orders.map(x => {
            return <Order key={x.id} ingredients={x.ingredients} price={x.price} />;
          })}
        </div>
      );
    }

    return orders;
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: () => dispatch(actions.fetchOrders())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(Orders, axios));
