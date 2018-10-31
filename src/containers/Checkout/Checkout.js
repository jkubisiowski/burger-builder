import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

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
    console.log(ingredients);

    this.setState({ingredients: ingredients})
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          onCheckoutContinued={this.checkoutContinuedHandler}
          onCheckoutCancelled={this.checkoutCancelledHandler}
          ingredients={this.state.ingredients}
        />
      </div>
    );
  }
}

export default Checkout;
