import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route } from 'react-router-dom';
import ContactData from "../ContactData/ContactData";

class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      cheese: 1,
      meat: 1,
      bacon: 1
    }
  };

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    for(let param of query.entries()) {
      let [index, value] = param
      ingredients[index] = +value
    }

    this.setState({ingredients: ingredients})
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          onCheckoutContinued={this.checkoutContinuedHandler}
          onCheckoutCancelled={this.checkoutCancelledHandler}
          ingredients={this.state.ingredients}
        />
        <Route path={this.props.match.path+ '/contact-data'} render={()=>(<ContactData ingredients={this.state.ingredients}></ContactData>)}></Route>
      </div>
    );
  }
}

export default Checkout;
