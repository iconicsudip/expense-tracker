import styled from "styled-components";
import React, { useEffect, useState } from "react";
import {MdDelete} from 'react-icons/md'

const Container = styled.div`
  background-color: white;
  color: #0d1d2c;
  display: flex;
  flex-direction: column;
  font-size: 18px;
  width: 100%;
  gap: 10px;
  font-weight: bold;
  overflow: auto;
    max-height: 24rem;
  overflow-y: auto !important;
  position:relative;
  margin-top: 2rem;
  & input {
    padding: 10px 12px;
    border-radius: 12px;
    background: #e6e8e9;
    border: 1px solid #e6e8e9;
    outline: none;
  }
`;
const Cell = styled.div`
  background-color: white;
  color: #0d1d2c;
  display: flex;
  flex-direction: row;
  padding: 10px 15px;
  font-size: 14px;
  border-radius: 2px;
  border: 1px solid #e6e8e9;
  align-items: center;
  font-weight: normal;
  justify-content: space-between;
  
  border-right: 4px solid ${(props) => (props.isExpense ? "red" : "green")};
`;
const TransactionCell = (props) => {
  const handleDelete = (id)=>{
    console.log(id)
  }
  return (
    <Cell isExpense={props.payload?.type === "EXPENSE"}>
      <span>{props.payload?.desc}</span>
      <div style={{display: "flex",
    alignItems: "center",
    gap:" 0.5rem"}}>
        <span>₹{props.payload?.amount}</span>
        <MdDelete style={{width: "1.2rem",
    height: "1.2rem",cursor:"pointer"}} onClick={()=>handleDelete(props.payload.id)}/>
      </div>
    </Cell>
  );
};
const TransactionsComponent = (props) => {
  const [searchText, updateSearchText] = useState("");
  const [filteredTransaction, updateTxn] = useState(props.transactions);

  const filterData = (searchText) => {
    if (!searchText || !searchText.trim().length) {
      updateTxn(props.transactions);
      return;
    }
    let txn = [...props.transactions];
    txn = txn.filter((payload) =>
      payload.desc.toLowerCase().includes(searchText.toLowerCase().trim()),
    );
    updateTxn(txn);
  };

  useEffect(() => {
    filterData(searchText);
  }, [props.transactions]);

  return (
    <Container>
      <div style={{display: "flex",
    flexDirection: "column",
    position: "sticky",
    top: 0,
    width: "webkitFillAvailable",
    zIndex: 22,
    background: "white",
    gap: "1rem"}}>
        Transactions
        <input
          placeholder="Search"
          onChange={(e) => {
            updateSearchText(e.target.value);
            filterData(e.target.value);
          }}
        />
      </div>
      {filteredTransaction?.map((payload) => (
        <TransactionCell payload={payload} />
      ))}
    </Container>
  );
};
export default TransactionsComponent;
