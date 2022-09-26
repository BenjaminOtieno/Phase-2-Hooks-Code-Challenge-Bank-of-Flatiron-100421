import React from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";
import { Component } from "react";

class AccountContainer extends Component {
  state = {
    transactions: [],
    search: "",
    select: "all"
  }

  componentDidMount() {
    fetch('http://localhost:8001/transactions')
      .then(response => response.json())
      .then(response => {
        this.setState({
          transactions: response
        })
      })
  }

  addTransactionFun = (addTransaction) => {
    this.setState(prevState => {
      return {
        transactions: [...prevState.transactions, addTransaction]
      }
    })
  }

  dltTransactionFun = (dltdTransaction) => {
    let newTransArr = this.state.transactions.filter(transaction => {
      return transaction.id !== dltdTransaction.id
    })

    this.setState({
      transactions: newTransArr
    })
  }

  searchFun = (searchResult) => {
    this.setState({
      search: searchResult
    })
  }

  filterSearchTransactions = () => {
    let { transactions, search, select } = this.state
    let filterSearch = transactions.filter(transaction => {
      return transaction.description.toLowerCase().includes(search.toLowerCase())
    })

    switch (select) {
      case "all":
        return filterSearch;

      case "descriptionAsc":
        return filterSearch.sort((A, B) => {
          return A.description.localeCompare(B.description)
        });

      case "descriptionDOWN":
        return filterSearch.sort((A, B) => {
          return B.description.localeCompare(A.description)
        });

      case "categoryAsc":
        return filterSearch.sort((A, B) => {
          return A.category.localeCompare(B.category)
        });

      case "categoryDsc":
        return filterSearch.sort((A, B) => {
          return B.category.localeCompare(A.category)
        });

      default:
    }
  }

  render() {
    return (
      <div>
        <Search searchValue={this.state.search} searchFun={this.searchFun} />
        <AddTransactionForm addTransactionFun={this.addTransactionFun} />
        <TransactionsList
          transactions={this.filterSearchTransactions()}
          select={this.state.select}
          selectFun={this.selectFun}
          dltTransactionFun={this.dltTransactionFun}
        />
      </div>
    );
  }
}

export default AccountContainer;