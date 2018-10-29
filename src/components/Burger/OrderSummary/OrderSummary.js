import React from "react";
import Button from './../../UI/Button/Button';

const OrderSummary = props => {
  const ingredients = Object.keys(props.ingredients).map(x => {
    return (
      <li key={x}>
        {" "}
        <span style={{ textTransform: "capitalize" }}>{x}</span>:{" "}
        {props.ingredients[x]}{" "}
      </li>
    );
  });

  return (
    <div>
      <h3>You order</h3>
      <p>Delicious burger with following ingredients:</p>
      <ul>{ingredients}</ul>
      <p><strong>Total price: ${props.price.toFixed(2)}</strong></p>
      <p>Continue to checkout</p>
      <Button buttonType="Danger" clicked={props.purchaseCanceled}>Cancel</Button>
      <Button buttonType="Success" clicked={props.purchaseContinued}>Continue</Button>
    </div>
  );
};

export default OrderSummary;
