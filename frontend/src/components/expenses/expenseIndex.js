import React, { useEffect, useState } from "react";
import { InnerLayout } from "../../styles/Layouts";
import ExpenseForm from "./expenseForm";
import { ExpensesStyled } from "./expenseStyles";
import { getExpenses } from "./../../api/expenses";
import ExpenseListItem from "./expenseListItem";
import ExpenseFilter from "./expenseFilter";
import ExpenseTableHeader from "./expenseTableHeader";
import ExpenseFormModal from "./expenseFormModal";
import FloatingAddButton from "../button/floatingAddButton";

function Expenses() {

    const currentDate = new Date();

    const [expenses, setExpenses] = useState([]);
    const [updateList, setUpdateList] = useState(false);
    const [listHeading, setListHeading] = useState("Recently Added");
    const [yearSelected, setYearSelected] = useState();
    const [monthSelected, setMonthSelected] = useState();
    const [categorySelected, setCategorySelected] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        getExpenses().then((response) => {
            console.log(response.data);
            setExpenses(response.data);
        });
    }, [updateList]);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <ExpensesStyled>
            <InnerLayout>
                <h1>Expenses</h1>
                <div className="expense-content">
                    <div className="expenses-list">
                        <ExpenseFilter />
                        <div className="list-header">{listHeading}</div>
                        <ExpenseTableHeader />
                        <div className="expenses-container">
                            {expenses.map((expense) => {
                            const {_id, title, amount, date, category, description} = expense;
                            return <ExpenseListItem
                                key={_id}
                                id={_id}
                                title={title}
                                description={description}
                                amount={amount}
                                date={date}
                                category={category}  
                                updateList={updateList}
                                setUpdateList={setUpdateList} 
                            />
                        })}
                        </div>
                    </div>
                </div>

                <FloatingAddButton onClick={handleOpenModal} />
                
                <ExpenseFormModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    updateList={updateList}
                    setUpdateList={setUpdateList}
                />
            </InnerLayout>
        </ExpensesStyled>
    )
}

export default Expenses;