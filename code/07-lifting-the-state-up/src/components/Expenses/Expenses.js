import React from "react";

import { useState } from "react";

import ExpensesFilter from "./ExpensesFilter";
import ExpenseItem from "./ExpenseItem";
import Card from "../UI/Card";
import "./Expenses.css";

const Expenses = ({ items }) => {
  const [expenses, setexpenses] = useState(items);
  const onChangeHandler = ({ target }) => {
    if (target.value === "All") {
      setexpenses(items);
    } else {
      const year = parseInt(target.value);
      setexpenses(
        items.filter((expense) => expense.date.getFullYear() === year)
      );
    }
  };
  return (
    <Card className="expenses">
      <ExpensesFilter onChange={onChangeHandler} />
      {expenses.map((expense) => (
        <ExpenseItem
          title={expense.title}
          amount={expense.amount}
          date={expense.date}
        />
      ))}
    </Card>
  );
};

export default Expenses;
