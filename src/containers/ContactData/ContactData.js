import React, { Component } from "react";
import Button from "./../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: ""
    },
    loading: false
  };

  orderHandler = () => {
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      customer: {
        name: "Jim",
        address: {
          street: "Test strett",
          zipCode: "123456",
          country: "Poland"
        },
        email: "test@test.com"
      },
      deliveryMethod: "fastest"
    };
    axios
      .post("/orders.json", order)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  };

  render() {
    let form = this.state.loading ? (
      <Spinner />
    ) : (
      <form>
        <input className={classes.Input} type="text" name="name" placeholder="Name" />
        <input className={classes.Input} type="email" name="email" placeholder="Your email" />
        <input className={classes.Input} type="text" name="street" placeholder="Street" />
        <input className={classes.Input} type="text" name="postal" placeholder="Postal code" />
        <Button buttonType="Success" clicked={this.orderHandler}>
          Order
        </Button>
      </form>
    );
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
