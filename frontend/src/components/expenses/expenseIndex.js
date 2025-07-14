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
import { getMonthLabel, getYearLabel } from "../../utils/filterUtils";


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

    // Calculate total of filtered expenses
    const calculateTotal = () => {
        return filteredExpenses.reduce((total, expense) => {
            return total + parseFloat(expense.amount || 0);
        }, 0);
    };

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
        const parts = [];
        // Add search context
        if (filters.searchTerm) {
            parts.push(`Search: "${filters.searchTerm}"`);
        }
        // Add month context
        if (filters.month !== 'showAll') {
            parts.push(getMonthLabel(filters.month));
        }
        // Add year context using shared utility  
        if (filters.year !== 'showAll') {
            parts.push(getYearLabel(filters.year));
        }
        // Build the heading
        if (parts.length === 0) {
            setListHeading(`All Expenses (${count})`);
        } else {
            const context = parts.join(' • ');
            setListHeading(`${context} (${count})`);
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
                        <div className="list-header-container">
                            <div className="list-header">{listHeading}</div>
                            <div className="list-total">
                                Total: <span className="total-amount">${calculateTotal().toFixed(2)}</span>
                            </div>
                        </div>
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