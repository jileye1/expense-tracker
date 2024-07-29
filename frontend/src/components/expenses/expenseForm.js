import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


function ExpenseForm() {

    const [newExpense, setNewExpense] = useState({
        title: '',
        amount: '',
        date: '',
        category: '',
        description: '',
    })

    const { title, amount, date, category, description } = newExpense;

    const handleInput = name => e => {
        setNewExpense({...newExpense, [name]: e.target.value});
    }

    return (
        <ExpenseFormStyled>
            <div className="input-control">
                <input 
                    type='text'
                    value={title}
                    name={'title'}
                    placeholder="Title"
                    onChange={handleInput('title')}
                />
            </div>
            <div className="input-control">
                <input 
                    type='text'
                    value={amount}
                    name={'amount'}
                    placeholder="Amount"
                    onChange={handleInput('amount')}
                />
            </div>
            <div className="input-control">
                <DatePicker 
                    id='date'
                    placeholderText="Enter A Date"
                    selected={date}
                    dateFormat="dd/MM/yyy"
                    onChange={(date) => {
                        setNewExpense({...newExpense, date: date})
                    }} />
            </div>
        </ExpenseFormStyled>
    )
}

const ExpenseFormStyled = styled.div`
`;

export default ExpenseForm;