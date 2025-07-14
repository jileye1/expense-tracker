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

    const [allExpenses, setAllExpenses] = useState([]);
    const [filteredExpenses, setFilteredExpenses] = useState([]);
    const [updateList, setUpdateList] = useState(false);
    const [listHeading, setListHeading] = useState("Recently Added");
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch expenses when the component mounts or when updateList changes
    useEffect(() => {
        getExpenses().then((response) => {
            console.log(response.data);
            setAllExpenses(response.data);
            setFilteredExpenses(response.data);
        });
    }, [updateList]);

    const applyFilters = (filters) => {
        let filtered = [...allExpenses];

        // Apply search filter
        if (filters.searchTerm) {
            const searchLower = filters.searchTerm.toLowerCase();
            filtered = filtered.filter(expense =>
                expense.title.toLowerCase().includes(searchLower) ||
                expense.description.toLowerCase().includes(searchLower) ||
                expense.category.toLowerCase().includes(searchLower)
            );
        }

        // Apply time frame filter
        if (filters.timeFrame !== 'all') {
            const now = new Date();
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

            filtered = filtered.filter(expense => {
                const expenseDate = new Date(expense.date);
                switch (filters.timeFrame) {
                    case 'today':
                        return expenseDate >= today;
                    case 'week':
                        const weekAgo= new Date(today);
                        weekAgo.setDate(today.getDate() - 7);
                        return expenseDate >= weekAgo;
                    case 'month':
                        const monthAgo = new Date(today);
                        monthAgo.setMonth(today.getMonth() - 1);
                        return expenseDate >= monthAgo;
                    case 'quarter':
                        const quarterAgo = new Date(today);
                        quarterAgo.setMonth(today.getMonth() - 3);
                        return expenseDate >= quarterAgo;
                    case 'year':
                        const yearAgo = new Date(today);
                        yearAgo.setFullYear(today.getFullYear() - 1);
                        return expenseDate >= yearAgo;
                    default:
                        return true; // 'all' or any other case
                }
            });
        }

        // Apply category filter
        if (filters.category !== 'all') {
            filtered = filtered.filter(expense => expense.category.toLowerCase() === filters.category.toLowerCase());
        }

        setFilteredExpenses(filtered);

        updateListHeading(filters, filtered.length);
    };

    const updateListHeading = (filters, count) => {
        if (filters.searchTerm) {
            setListHeading(`Search Results: (${count})`);
        } else if (filters.timeFrame !== 'all' || filters.category !== 'all') {
            setListHeading(`Filtered Results: (${count})`);
        } else {
            setListHeading(`All Expenses: (${count})`);
        }
    };

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
                        <ExpenseFilter 
                            onFilterChange={applyFilters}
                            expenses={allExpenses}
                        />
                        <div className="list-header">{listHeading}</div>
                        <ExpenseTableHeader />
                        <div className="expenses-container">
                            {filteredExpenses.map((expense) => {
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