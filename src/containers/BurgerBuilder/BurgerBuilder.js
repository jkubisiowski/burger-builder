import React, { Component } from "react";
import Burger from "./../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import { Object } from "core-js";
import Modal from "./../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import WithErrorHandler from "./../../components/UI/WithErrorHandler/WithErrorHandler";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";

class BurgerBuilder extends Component {
  state = {
    purchasable: false,
    purchasing: false,
    loading: false,
    hasError: false
  };

  // componentDidMount() {
  //   axios
  //     .get("ingredients.json")
  //     .then(response => {
  //       this.setState({ ingredients: response.data });
  //     })
  //     .catch(error => {
  //       this.setState({ hasError: true });
  //     });
  // }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(x => ingredients[x])
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  }

  purchaseHandler = () => {
    this.setState({
      purchasing: true
    });
  };

  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false
    });
  };

  purchaseContinuedHandler = () => {
    const queryParams = [];
    for (let i in this.props.ingredients) {
      queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.props.ingredients[i]));
    }
    queryParams.push("price=" + this.props.totalPrice);
    const queryString = queryParams.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString
    });
  };

  render() {
    const disabledInfo = {
      ...this.props.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let burger = this.state.hasError ? <p>Ingredients can't be loaded</p> : <Spinner />;
    let orderSummary = null;
    if (this.props.ingredients) {
      burger = (
        <>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            ingredientAdded={name => this.props.onIngredientAdded(name)}
            ingredientRemoved={name => this.props.onIngredientRemoved(name)}
            disabled={disabledInfo}
            price={this.props.totalPrice}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
          />
        </>
      );

      console.log(this.props.totalPrice);

      orderSummary = (
        <OrderSummary
          price={this.props.totalPrice}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinuedHandler}
          ingredients={this.props.ingredients}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: name => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: name }),
    onIngredientRemoved: name => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: name })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(BurgerBuilder, axios));
