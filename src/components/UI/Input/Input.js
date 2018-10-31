import React from "react";
import classes from "./Input.module.css";

const Input = props => {
  let inputElement;

  switch (props.inputtype) {
    case "input":
      inputElement = <input {...props} className={classes.Input} />;
      break;
    case "textarea":
      inputElement = <textarea {...props} className={classes.Input} />;
      break;
    default:
      inputElement = <input {...props} className={classes.Input} />;
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
