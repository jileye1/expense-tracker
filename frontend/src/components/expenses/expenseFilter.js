import React, { useState, useEffect } from "react";
import styled from "styled-components";
import StyledButton from "../button/styledButton";
import { getCategories } from "../../api/categories";
import { getMonthOptions, getYearOptions } from "../../utils/filterUtils.js";

function ExpenseFilter({ onFilterChange, expenses }) {

    const [activeFilters, setActiveFilters] = useState({
        month: 'thisMonth',
        year: 'thisYear',
        searchTerm: ''
    });
    
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    // Apply filters on component mount and when activeFilters change
    useEffect(() => {
        if (onFilterChange) {
            onFilterChange(activeFilters);
        }
    }, [activeFilters, onFilterChange]);

    const handleFilterChange = (filterType, value) => {
        const newFilters = { ...activeFilters, [filterType]: value };
        setActiveFilters(newFilters);
    };


    return (
        <ExpenseFilterStyled>
            {/* Search Input */}
            <div className={`search-container ${isSearchFocused ? 'focused' : ''}`}>
                <div className="search-icon">🔍</div>
                <input
                    type="text"
                    placeholder="Search expenses..."
                    value={activeFilters.searchTerm}
                    onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    className="search-input"
                />
            </div>

            {/* Filter Dropdowns */}
            <div className="filter-dropdowns">
                {/* Month Filtering */}
                <div className="dropdown-container">
                    <select
                        value={activeFilters.month}
                        onChange={(e) => handleFilterChange('month', e.target.value)}
                        className="filter-dropdown"
                    >
                        {getMonthOptions().map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Year Filtering */}
                <div className="dropdown-container">
                    <select
                        value={activeFilters.year}
                        onChange={(e) => handleFilterChange('year', e.target.value)}
                        className="filter-dropdown"
                    >
                        {getYearOptions().map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </ExpenseFilterStyled>

    )

}

const ExpenseFilterStyled = styled.div`
    display: flex;
    align-items: center;
    gap: 1.5rem;
    background: rgba(255, 255, 255, 0.7);
    border: 1px solid rgba(34, 34, 96, 0.08);
    border-radius: 12px;
    padding: 1rem 1.25rem;
    margin-bottom: 1.5rem;
    backdrop-filter: blur(4px);

    .search-container {
        position: relative;
        flex: 1;
        max-width: 350px;
        
        .search-input {
            width: 100%;
            padding: 0.6rem 1rem 0.6rem 2.25rem; 
            border: 2px solid rgba(34, 34, 96, 0.1);
            border-radius: 8px; 
            background: #FFFFFF;
            font-size: 0.85rem; 
            transition: all 0.3s ease;
            
            &:focus {
                border-color: var(--color-accent);
                outline: none;
                box-shadow: 0 0 0 3px rgba(200, 119, 247, 0.1);
            }
            
            &::placeholder {
                color: rgba(34, 34, 96, 0.5);
            }
        }
        
        .search-icon {
            position: absolute;
            left: 0.75rem;
            top: 50%;
            transform: translateY(-50%); 
            font-size: 0.85rem;
            color: rgba(34, 34, 96, 0.5);
            pointer-events: none;
            z-index: 1; 
        }
        
        &.focused .search-icon {
            color: var(--color-accent);
        }
    }

    .filter-dropdowns {
        display: flex;
        gap: 1rem; 
        flex-shrink: 0; 
    }

    .dropdown-container {
        position: relative;
        
        .filter-dropdown {
            background: #FFFFFF;
            border: 2px solid rgba(34, 34, 96, 0.1);
            border-radius: 8px; 
            padding: 0.6rem 2rem 0.6rem 0.75rem; 
            font-size: 0.85rem; 
            color: rgba(34, 34, 96, 0.8);
            cursor: pointer;
            transition: all 0.3s ease;
            background-position: right 0.5rem center;
            background-repeat: no-repeat;
            background-size: 1rem;
            min-width: 120px; 
            
            &:focus {
                border-color: var(--color-accent);
                outline: none;
                box-shadow: 0 0 0 3px rgba(200, 119, 247, 0.1);
            }
            
            &:hover {
                border-color: rgba(34, 34, 96, 0.2);
            }
        }
    }

    @media screen and (max-width: 768px) {
        flex-direction: column; 
        align-items: stretch;
        gap: 1rem;
        padding: 1rem;
        
        .search-container {
            max-width: 100%;
        }
        
        .filter-dropdowns {
            flex-direction: column; 
            gap: 0.75rem;
        }
        
        .dropdown-container .filter-dropdown {
            width: 100%;
            min-width: auto;
        }
    }

    @media screen and (max-width: 480px) {
        padding: 0.75rem;
        gap: 0.75rem;
        
        .filter-dropdowns {
            gap: 0.5rem;
        }
    }
`;

export default ExpenseFilter;