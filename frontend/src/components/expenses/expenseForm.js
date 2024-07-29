import React, { useState } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { postExpense } from "./../../api/expenses"
import { ExpenseFormStyled } from "./expenseStyles"
import StyledButton from "../button/styledButton";
import { plus } from "./../../utils/icons"


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

    const handleSubmit = e => {
        console.log(newExpense)
        e.preventDefault(); // prevent refresh
        postExpense(newExpense).then((response) => {
            console.log(response);
        });
    }

    return (
        <ExpenseFormStyled onSubmit={handleSubmit}>
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
            <div className="selects input-control">
                <select 
                    required value={category} 
                    name="category" 
                    id="category"
                    onChange={handleInput('category')} >
                        <option value="" disabled>Select Option</option>
                        <option value="groceries">Groceries</option>
                        <option value="other">Other</option>
                </select>
            </div>
            <div className="input-control">
                <textarea 
                    name="description"
                    value={description}
                    placeholder="Add a description"
                    id="description"
                    cols="30"
                    rows="4"
                    onChange={handleInput('description')}
                />
            </div>
            <div className="submit-btn">
                <StyledButton
                    name={'Add Expense'}
                    icon={plus}
                    bPadding={'.8rem 1.6rem'}
                    bRadius={'30px'}
                    bg={'var(--color-accent'}
                    color={'#fff'}
                />
            </div>
        </ExpenseFormStyled>
    )
}


export default ExpenseForm;