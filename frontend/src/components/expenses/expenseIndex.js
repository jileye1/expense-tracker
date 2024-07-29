import React, { useState } from "react";
import styled from "styled-components";
import { InnerLayout } from "../../styles/Layouts";
import ExpenseForm from "./expenseForm";

function Expenses() {

    const [expenses, setExpenses] = useState([]);

    return (
        <ExpensesStyled>
            <InnerLayout>
                <h1>Expenses</h1>
                <div className="expense-content">
                    <div className="form-container">
                        <ExpenseForm></ExpenseForm>
                    </div>
                    <div className="expenses">
                        
                    </div>
                </div>
            </InnerLayout>
        </ExpensesStyled>
    )
}

const ExpensesStyled = styled.div``;

export default Expenses;