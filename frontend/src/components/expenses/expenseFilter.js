import React, { useState, useEffect } from "react";
import styled from "styled-components";
import StyledButton from "../button/styledButton";
import { getCategories } from "../../api/categories";

function ExpenseFilter({ onFilterChange, expenses }) {

    const [activeFilters, setActiveFilters] = useState({
        timeFrame: 'all',
        category: 'all',
        searchTerm: ''
    });
    const [categories, setCategories] = useState([]);
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    // Fetch categories on component mount
    useEffect(() => {
        getCategories()
            .then(response => {
                setCategories(response.data || []);
            })
            .catch(error => {
                console.error("Error fetching categories:", error);
                setCategories([]);
            }
        );
    }, []);

    // Quick time frame filters
    const timeFrameOptions = [
        { value: 'all', label: 'All Time' },
        { value: 'today', label: 'Today' },
        { value: 'week', label: 'This Week' },
        { value: 'month', label: 'This Month' },
        { value: 'quarter', label: 'This Quarter' },
        { value: 'year', label: 'This Year' }
    ];

    const handleFilterChange = (filterType, value) => {
        const newFilters = { ...activeFilters, [filterType]: value };
        setActiveFilters(newFilters);
        
        // Call parent component's filter handler
        if (onFilterChange) {
            onFilterChange(newFilters);
        }
    };

    const clearAllFilters = () => {
        const clearedFilters = {
            timeFrame: 'all',
            category: 'all',
            searchTerm: ''
        };
        setActiveFilters(clearedFilters);
        if (onFilterChange) {
            onFilterChange(clearedFilters);
        }
    };

    const hasActiveFilters = activeFilters.timeFrame !== 'all' || activeFilters.category !== 'all' || activeFilters.searchTerm !== '';


    return (
        <ExpenseFilterStyled>
            {/* Search Input */}
            <div className={`search-container" ${isSearchFocused ? 'focused' : ''}`}>
                <input
                    type="text"
                    placeholder="Search expenses..."
                    value={activeFilters.searchTerm}
                    onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    className="search-input"
                />
                <div className="search-icon">🔍</div>
            </div>
            {/* Time Frame Filter */}
            <div className="filter-section">
                <span className="filter-label">Time:</span>
                <div className="filter-pills">
                    {timeFrameOptions.map(option => (
                        <button
                            key={option.value}
                            className={`filter-pill ${activeFilters.timeFrame === option.value ? 'active' : ''}`}
                            onClick={() => handleFilterChange('timeFrame', option.value)}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>
            {/* Category Filter */}
            {categories.length > 0 && (
                <div className="filter-section">
                    <span className="filter-label">Category:</span>
                    <div className="filter-pills">
                        <button
                            className={`filter-pill ${activeFilters.category === 'all' ? 'active' : ''}`}
                            onClick={() => handleFilterChange('category', 'all')}
                        >
                            All Categories
                        </button>
                        {categories.map((category) => (
                            <button
                                key={category._id || category.id}
                                className={`filter-pill ${activeFilters.category === category.name ? 'active' : ''}`}
                                onClick={() => handleFilterChange('category', category.name)}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Clear Filters */}
            {hasActiveFilters && (
                <div className="clear-section">
                    <StyledButton
                        name="Clear All"
                        onClick={clearAllFilters}
                        bg="rgba(244, 67, 54, 0.1)"
                        color="#F44336"
                        bPadding="0.5rem 1rem"
                        bRadius="20px"
                        fontSize="0.85rem"
                    />
                </div>
            )}
        </ExpenseFilterStyled>

    )

}

const ExpenseFilterStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background: rgba(255, 255, 255, 0.7);
    border: 1px solid rgba(34, 34, 96, 0.08);
    border-radius: 12px;
    padding: 1.25rem;
    margin-bottom: 1.5rem;
    backdrop-filter: blur(4px);

    .search-container {
        position: relative;
        max-width: 300px;

        .search-input {
            width: 100%;
            padding: 0.75rem 1rem 0.75rem 2.5rem;
            border: 2px solid rgba(34, 34, 96, 0.1);
            border-radius: 25px;
            background: #FFFFFF;
            font-size: 0.9rem;
            transition: all 0.3s ease;

            &:focus {
                border-color: var(--color-accent);
                outline: none;
                box-shadow: 0 0 0 3px rgba(200, 119, 247, 0.1);
            }
            
            &::placeholder {
                color: rgba(34, 34, 96, 0.5);
            }

        .search-icon {
            position: absolute;
            left: 0.75rem;
            top: 50%;
            transform: translateY(-50%);
            font-size: 0.9rem;
            color: rgba(34, 34, 96, 0.5);
            pointer-events: none;
        }

        &.focused .search-icon {
            color: var(--color-accent);
        }
    }

    .filter-section {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        flex-wrap: wrap;

        .filter-label {
            font-weight: 600;
            color: rgba(34, 34, 96, 0.8);
            font-size: 0.85rem;
            min-width: fit-content;
        }

        .filter-pills {
            display: flex;
            gap: 0.5rem;
            flex-wrap: wrap;
            flex: 1;
        }

        .filter-pill {
            background: rgba(34, 34, 96, 0.06);
            color: rgba(34, 34, 96, 0.7);
            border: 1px solid rgba(34, 34, 96, 0.1);
            border-radius: 20px;
            padding: 0.4rem 0.8rem;
            font-size: 0.8rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
            white-space: nowrap;

            &:hover {
                background: rgba(34, 34, 96, 0.1);
                transform: translateY(-1px);
            }
            
            &.active {
                background: var(--color-accent);
                color: white;
                border-color: var(--color-accent);
                box-shadow: 0 2px 8px rgba(200, 119, 247, 0.3);
            }
        }
    }

    .clear-section {
        display: flex;
        justify-content: flex-end;
        margin-top: 0.5rem;
        
        button {
            transition: all 0.2s ease;
            
            &:hover {
                background: rgba(244, 67, 54, 0.15) !important;
                transform: translateY(-1px);
            }
        }
    }

    @media screen and (max-width: 768px) {
        padding: 1rem;
        gap: 0.75rem;

        .search-container {
            max-width: 100%;
        }

        .filter-section {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;

            .filter-label {
                font-size: 0.8rem;
            }

            .filter-pills {
                width: 100%;
                justify-content: flex-start;
            }

            .filter-pill {
                font-size: 0.75rem;
                padding: 0.35rem 0.7rem;
            }
        }

        .clear-section {
            justify-content: center;
        }
    }

    @media screen and (max-width: 480px) {
        padding: 0.75rem;

        .filter-pills {
            gap: 0.3rem;
        }

        .filter-pill {
            font-size: 0.7rem;
            padding: 0.3rem 0.6rem;
        }
    }
`;

export default ExpenseFilter;