import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route } from 'react-router-dom';
import ContactData from "../ContactData/ContactData";

class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0
  };

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = null;
    for(let param of query.entries()) {
      let [index, value] = param
      if(index==='price') {
        price = value
      } else {
        ingredients[index] = +value
      }
    }

    this.setState({ingredients: ingredients, totalPrice: price})
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
        <Route path={this.props.match.path+ '/contact-data'} render={()=>(<ContactData totalPrice={this.state.totalPrice} ingredients={this.state.ingredients}></ContactData>)}></Route>
      </div>
    );
  }
}

export default Checkout;
