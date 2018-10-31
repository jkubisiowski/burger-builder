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
      const fetchedOrders = [];
      for(let key in response.data) {
        fetchedOrders.push({
          ...response.data[key],
          id: key
        })
      }

      this.setState({orders: fetchedOrders, loading: false});
    })
    .catch(error=>{
      this.setState({loading: false});
    })
  }

  render() {
    return (
      <div>
        {this.state.orders.map(x=>{
          return <Order key={x.id} ingredients={x.ingredients} price={x.price}></Order>
        })}
      </div>
    );
  }
};

export default WithErrorHandler(Orders, axios);
