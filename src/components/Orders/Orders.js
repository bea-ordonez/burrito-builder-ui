import React from 'react';
import './Orders.css';

const Orders = props => {
  let orderEls = null;
  if ( props.orders.length > 0) {
    orderEls = props.orders.map(order => {
      return (
        <div className="order">
          <h3>{order.name}</h3>
          <ul className="ingredient-list">
            {order.ingredients.map(ingredient => {
              return <li>{ingredient}</li>
            })}
          </ul>
        </div>
      )
    });
  } else {
    orderEls = <p>No orders yet!</p>
  }

  return (
    <section>
      {orderEls}
    </section>
  )
}

export default Orders;