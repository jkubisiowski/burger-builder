import React from "react";
import classes from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const Burger = props => {
  const transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
      return [...Array(props.ingredients[igKey])].map((_, index) => {
        return <BurgerIngredient key={igKey + index} type={igKey} />;
      });
    })
    .reduce((arr, el) => {        
        return arr.concat(el);
    }, []);

  let burger = null;
  if (transformedIngredients.length !== 0) {
    burger = (
      <div className={classes.Burger}>
        <BurgerIngredient type="bread-top" />
        {transformedIngredients}
        <BurgerIngredient type="bread-bottom" />
      </div>
    );
  } else {
    burger = <p>Please add some ingredients</p>;
  }

  return <>{burger}</>;
};

export default Burger;
