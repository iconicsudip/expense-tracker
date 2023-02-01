import React, { useEffect, useState } from "react";
import styled from "styled-components";
import OverViewComponent from "./OverViewComponent";
import TransactionsComponent from "./TransactionsComponent";

const Container = styled.div`
  background-color: white;
  color: #0d1d2c;
  display: flex;
  flex-direction: column;
  font-size: 18px;
  align-items: center;
  justify-content: space-between;
//   width: -webkit-fill-available;
//   width: -moz-available;
`;

const HomeComponent = (props) => {
    const [transactions, updateTransaction] = useState([]);
    const [expense, updateExpense] = useState(0);
    const [income, updateIncome] = useState(0);
    useEffect(async ()=>{
        const res = await fetch("https://expensetracker-884cd-default-rtdb.firebaseio.com/expenses.json",{
            method:"GET",
            headers:{
                'Content-Type':'application/json'
            }
        })
        const data = (await res.json())
        if(data){
            updateTransaction(Object.values(data))
        }else{
            updateTransaction([])
        }
    },[])
    const calculateBalance = () => {
        let exp = 0;
        let inc = 0;
        transactions.map((payload) =>
            payload.type === "EXPENSE"
                ? (exp = exp + payload.amount)
                : (inc = inc + payload.amount),
        );
        updateExpense(exp);
        updateIncome(inc);
    };
    useEffect(() =>{ 
        calculateBalance()
    }, [transactions]);

    const addTransaction = (payload) => {
        const transactionArray = [...transactions];
        transactionArray.push(payload);
        updateTransaction(transactionArray);
    };
    return (
        <Container>
            <OverViewComponent
                expense={expense}
                income={income}
                addTransaction={addTransaction}
            />
            {transactions?.length ? (
                <TransactionsComponent transactions={transactions} />
            ) : (
                ""
            )}
        </Container>
    );
};
export default HomeComponent;
