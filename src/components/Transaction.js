import React from "react";

const Transaction = (props) => {
  let {date, description, category, amount} = props.transaction
  let handledelete = () => {
    fetch(`http://localhost:8001/transactions/${props.transaction.id}`, {
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(dltdTransaction => {
      props.dltTransactionFun(props.transaction)
    })
  }

  return (
    <tr>
      <td>{date}</td>
      <td>{description}</td>
      <td>{category}</td>
      <td>{amount}</td>
      <td><button onClick={handledelete}>DELETE</button></td> 
    </tr>
  );
};

export default Transaction;