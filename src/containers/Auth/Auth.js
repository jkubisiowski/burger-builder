import React, { Component } from "react";
import Input from "./../../components/UI/Input/Input";
import Button from "./../../components/UI/Button/Button";
import classes from "./Auth.module.css";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import Spinner from './../../components/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Email"
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      }
    },
    isSignUp: false
  };

  checkValidity(value, rules) {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
        touched: true
      }
    };

    this.setState({
      controls: updatedControls
    });
  };

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {
        isSignUp: !prevState.isSignUp
      }
    })
  }


  submitHandler = event => {
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({ ...this.state.controls[key], id: key });
    }

    let form = formElementsArray.map(x => {
      return (
        <Input
          elementType={x.elementType}
          elementConfig={x.elementConfig}
          value={x.value}
          key={x.id}
          invalid={!x.valid}
          shouldValidate={x.validation}
          touched={x.touched}
          changed={event => this.inputChangedHandler(event, x.id)}
        />
      );
    });

    if(this.props.loading) {
      form = <Spinner></Spinner>
    }

    let errorMessage;
    if(this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>
    }

    let authRedirect = null;
    if(this.props.isAuthenticated) {
      authRedirect = <Redirect to="/"></Redirect>
    }

    return (
      <div className={classes.Auth}>
        {authRedirect}
        Mode {this.state.isSignUp ? 'SIGNUP' : 'SIGNIN'}
        {errorMessage}
        <form>
          {form}
          <Button clicked={this.submitHandler} buttonType="Success">
            Submit
          </Button>
          <Button clicked={this.switchAuthModeHandler} buttonType="Danger">
            Switch to {this.state.isSignUp ? 'SIGNIN' : 'SIGNUP'}
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
