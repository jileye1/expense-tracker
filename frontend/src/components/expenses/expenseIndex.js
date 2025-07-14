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
                expense.description?.toLowerCase().includes(searchLower) ||
                expense.category?.toLowerCase().includes(searchLower)
            );
        }
        
        // Apply month filter
        if (filters.month !== 'showAll') {
            const now = new Date();
            
            if (filters.month === 'thisMonth') {
                // Current month and year
                const currentMonth = now.getMonth();
                const currentYear = now.getFullYear();
                
                filtered = filtered.filter(expense => {
                    const expenseDate = new Date(expense.date);
                    return expenseDate.getMonth() === currentMonth && 
                           expenseDate.getFullYear() === currentYear;
                });
            } else {
                // Specific month (any year)
                const monthIndex = parseInt(filters.month);
                filtered = filtered.filter(expense => {
                    const expenseDate = new Date(expense.date);
                    return expenseDate.getMonth() === monthIndex;
                });
            }
        }
        
        // Apply year filter
        if (filters.year !== 'showAll') {
            const now = new Date();
            
            if (filters.year === 'thisYear') {
                // Calendar year to date (January 1st to today)
                const currentYear = now.getFullYear();
                const yearStart = new Date(currentYear, 0, 1); // January 1st
                
                filtered = filtered.filter(expense => {
                    const expenseDate = new Date(expense.date);
                    return expenseDate >= yearStart && expenseDate <= now;
                });
            } else {
                // Specific year
                const selectedYear = parseInt(filters.year);
                filtered = filtered.filter(expense => {
                    const expenseDate = new Date(expense.date);
                    return expenseDate.getFullYear() === selectedYear;
                });
            }
        }
        
        setFilteredExpenses(filtered);
        
        // Update heading based on filters
        updateListHeading(filters, filtered.length);
    };

    const updateListHeading = (filters, count) => {
        if (filters.searchTerm) {
            setListHeading(`Search Results (${count})`);
        } else if (filters.month === 'thisMonth' && filters.year === 'thisYear') {
            setListHeading(`This Month (${count})`);
        } else if (filters.month === 'thisMonth') {
            setListHeading(`This Month (${count})`);
        } else if (filters.year === 'thisYear') {
            setListHeading(`This Year (${count})`);
        } else if (filters.month !== 'showAll' || filters.year !== 'showAll') {
            setListHeading(`Filtered Results (${count})`);
        } else {
            setListHeading(`All Expenses (${count})`);
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