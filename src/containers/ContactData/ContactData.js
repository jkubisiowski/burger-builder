import React, { Component } from 'react';
import Button from './../../components/UI/Button/Button';
import classes from './ContactData.module.css';

class ContactData extends Component {
  state= {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    }
  }

  orderHandler = () => {
    console.log(this.props.ingredients);
  }

  render() {
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        <form>
          <input className={classes.Input} type="text" name="name" placeholder="Name"/>
          <input className={classes.Input} type="email" name="email" placeholder="Your email"/>
          <input className={classes.Input} type="text" name="street" placeholder="Street"/>
          <input className={classes.Input} type="text" name="postal" placeholder="Postal code"/>
          <Button buttonType="Success" clicked={this.orderHandler}>Order</Button>
        </form>
      </div>
    );
  }
}

export default ContactData;
