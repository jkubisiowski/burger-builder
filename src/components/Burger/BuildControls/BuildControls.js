import React from "react";
import BuildControl from "./BuildControl/BuildControl";
import classes from "./BuildControls.module.css";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" }
];

const BuildControls = props => {
  return (
    <div className={classes.BuildControls}>
      <p>Current price: <strong>${props.price.toFixed(2)}</strong></p>
      {controls.map(x => (
        <BuildControl
          added={() => props.ingredientAdded(x.type)}
          removed={() => props.ingredientRemoved(x.type)}
          key={x.label}
          label={x.label}
          disabled={props.disabled[x.type]}          
        />
      ))}
      <button className={classes.OrderButton} disabled={!props.purchasable} onClick={props.ordered}>Order now</button>
    </div>
  );
};

export default BuildControls;
