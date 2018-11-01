import React from "react";
import classes from "./Input.module.css";

const Input = props => {
  let inputElement;

  switch (props.elementType) {
    case "input":
      inputElement = <input {...props.elementConfig} className={classes.Input} value={props.value} onChange={props.changed} />;
      break;
    case "textarea":
      inputElement = <textarea {...props.elementConfig} className={classes.Input} value={props.value} onChange={props.changed} />;
      break;
    case "select":
      const options = props.elementConfig.options.map(x => (
        <option key={x.value} value={x.value}>
          {x.displayValue}
        </option>
      ));
      inputElement = (
        <select className={classes.Input} value={props.value} onChange={props.changed}>
          {options}
        </select>
      );
      break;
    default:
      inputElement = <input {...props.elementConfig} className={classes.Input} value={props.value} onChange={props.changed} />;
      break;
  }

  return (
    <div className={classes.inputElement}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default Input;
