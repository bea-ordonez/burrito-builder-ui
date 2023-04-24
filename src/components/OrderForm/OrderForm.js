import React, { Component } from 'react';

class OrderForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      name: '',
      ingredients: [],
      isValid: false
    };
  }

  handleIngredientChange = event => {
    event.preventDefault(event)
    const ingredient = event.target.name
    const ingredients = [...this.state.ingredients, ingredient]
    this.setState({ ingredients }, () => {
      if (this.state.name && this.state.ingredients.length > 0) {
        this.setState({ isValid: true });
      } else {
        this.setState({ isValid: false });
      }
    });
  }

  handleNameChange = event => {
    this.setState({ name: event.target.value }, () => {
      if (this.state.name && this.state.ingredients.length > 0) {
        this.setState({ isValid: true });
      } else {
        this.setState({ isValid: false });
      }
    });
  }



  clearInputs = () => {
    this.setState({name: '', ingredients: []});
  }
  
  postNewOrder = () => {
    const newOrder = {
      name: this.state.name,
      ingredients: this.state.ingredients
    };
    return fetch('http://localhost:3001/api/v1/orders', {
      method: 'POST',
      body: JSON.stringify({name: newOrder.name, ingredients: newOrder.ingredients}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.isValid === true) {
      this.postNewOrder()
      .then(response => response.json())
      .then(data => {
        if (data["id"]) {
          this.props.addOrder(data);
          this.clearInputs();
          this.setState({isValid: false});
        }
      })
      .catch(error => console.error('Error submitting order:', error));
    }
  }



  render() {
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button key={ingredient} name={ingredient} onClick={event => this.handleIngredientChange(event)}>
          {ingredient}
        </button>
      )
    });

    return (
      <form>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={this.state.name}
          onChange={event => this.handleNameChange(event)}
        />

        { ingredientButtons }

        <p>Order: { this.state.ingredients.join(', ') || 'Nothing selected' }</p>

        <button onClick={event => this.handleSubmit(event)}>
          Submit Order
        </button>
      </form>
    )
  }
}

export default OrderForm;
