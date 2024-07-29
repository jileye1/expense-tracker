import React, { useState } from "react";
import { InnerLayout } from "../../styles/Layouts";
import ExpenseForm from "./expenseForm";
import { ExpensesStyled } from "./expenseStyles"

function Expenses() {

    const [expenses, setExpenses] = useState([]);

    return (
        <ExpensesStyled>
            <InnerLayout>
                <h1>Expenses</h1>
                <div className="expense-content">
                    <div className="form-container">
                        <ExpenseForm />
                    </div>
                    <div className="expenses">
                        
                    </div>
                </div>
            </InnerLayout>
        </ExpensesStyled>
    )
}

export default Expenses;