import React, { Component } from 'react';
import Order from './../../components/Order/Order';
import axios from '../../axios-orders';
import WithErrorHandler from "./../../components/UI/WithErrorHandler/WithErrorHandler";

class Orders extends Component {
  state={
    orders: [],
    loading: true
  }

  componentDidMount() {
    axios.get('/orders.json')
    .then(response=> {
      const orders = [];
      for(let key in response.data) {
        orders.push({
          ...response.data[key],
          id: key
        })
      }

      this.setState({order: orders, loading: false});
    })
    .catch(error=>{
      this.setState({loading: false});
    })
  }

  render() {
    return (
      <div>
        <Order></Order>
      </div>
    );
  }
};

export default WithErrorHandler(Orders, axios);
