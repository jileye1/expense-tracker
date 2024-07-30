import React, { useState } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { postIncome } from "../../api/incomes";
import { IncomeFormStyled } from "./incomeStyles"; 
import StyledButton from "../button/styledButton";
import { plus } from "./../../utils/icons";


function IncomeForm({updatePage, setUpdatePage}) {

    const [newIncome, setNewIncome] = useState({
        amount: '',
        date: '',
        weekday_hours: '',
        weekend_hours: '',
        tax: '',
    })

    const { amount, date, weekday_hours, weekend_hours, tax } = newIncome;

    const handleInput = name => e => {
        setNewIncome({...newIncome, [name]: e.target.value});
    }

    const handleSubmit = e => {
        console.log(newIncome)
        e.preventDefault(); // prevent refresh
        postIncome(newIncome).then((response) => {
            console.log(response);
            setUpdatePage(!updatePage);
        }).catch((err) => console.log(err));
        setNewIncome({
            amount: '',
            date: '',
            weekday_hours: '',
            weekend_hours: '',
            tax: '',
        });
    }

    return (
        <IncomeFormStyled onSubmit={handleSubmit}>
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
                        setNewIncome({...newIncome, date: date})
                    }} />
            </div>
            <div className="input-control">
                <input 
                    type='text'
                    value={weekday_hours}
                    name={'weekday_hours'}
                    placeholder="Weekday Hours"
                    onChange={handleInput('weekday_hours')}
                />
            </div>
            <div className="input-control">
                <input 
                    type='text'
                    value={weekend_hours}
                    name={'weekend_hours'}
                    placeholder="Weekend Hours"
                    onChange={handleInput('weekend_hours')}
                />
            </div>
            <div className="input-control">
                <input 
                    type='text'
                    value={tax}
                    name={'tax'}
                    placeholder="Taxed amount"
                    onChange={handleInput('tax')}
                />
            </div>
            <div className="submit-btn">
                <StyledButton
                    name={'Add Income'}
                    icon={plus}
                    bPadding={'.8rem 1.6rem'}
                    bRadius={'30px'}
                    bg={'var(--color-accent'}
                    color={'#fff'}
                />
            </div>
        </IncomeFormStyled>
    )
}


export default IncomeForm;