import React from "react";

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
      <p>Continue to checkout</p>
      <button>Cancel</button>
      <button>Continue</button>
    </div>
  );
};

export default OrderSummary;
