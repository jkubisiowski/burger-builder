import React from "react";
import classes from "./Input.module.css";

const Input = props => {
  let inputElement;
  const inputClasses = [classes.InputElement]

  if(props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid)
  }

  switch (props.elementType) {
    case "input":
      inputElement = <input {...props.elementConfig} className={inputClasses.join(" ")} value={props.value} onChange={props.changed} />;
      break;
    case "textarea":
      inputElement = <textarea {...props.elementConfig} className={inputClasses.join(" ")} value={props.value} onChange={props.changed} />;
      break;
    case "select":
      const options = props.elementConfig.options.map(x => (
        <option key={x.value} value={x.value}>
          {x.displayValue}
        </option>
      ));
      inputElement = (
        <select className={inputClasses.join(" ")} value={props.value} onChange={props.changed}>
          {options}
        </select>
      );
      break;
    default:
      inputElement = <input {...props.elementConfig} className={inputClasses.join(" ")} value={props.value} onChange={props.changed} />;
      break;
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default Input;
