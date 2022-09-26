import React from "react";
import { Component } from "react";

class AddTransactionForm extends Component {

  state = {
    date: "",
    description: "",
    category: "",
    amount: ""
  }

  handleSubmit = (event) => {
    event.preventDefault()
    fetch('http://localhost:8001/transactions', {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        date: this.state.date,
        description: this.state.description,
        category: this.state.category,
        amount: this.state.amount
      })
    })
      .then(response => response.json())
      .then(addTransaction => {
        this.props.addTransactionFun(addTransaction)
        this.setState({
          date: "",
          description: "",
          category: "",
          amount: ""
        })
      })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <div className="ui segment">
        <form className="ui form" onSubmit={this.handleSubmit}>
          <div className="inline fields">
            <input
              type="date"
              name="date"
              value={this.state.date}
              onChange={this.handleChange}
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={this.state.description}
              onChange={this.handleChange}

            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={this.state.category}
              onChange={this.handleChange}
            />
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              step="10"
              value={this.state.amount}
              onChange={this.handleChange}
            />
          </div>
          <button className="ui button" type="submit" >
            Add Transaction
          </button>
        </form>
      </div>
    );
  }
}

export default AddTransactionForm;