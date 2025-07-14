export const getMonthOptions = () => {
    return [
        { value: 'thisMonth', label: 'This Month' },
        { value: 'showAll', label: 'Show All' },
        { value: '0', label: 'January' },
        { value: '1', label: 'February' },
        { value: '2', label: 'March' },
        { value: '3', label: 'April' },
        { value: '4', label: 'May' },
        { value: '5', label: 'June' },
        { value: '6', label: 'July' },
        { value: '7', label: 'August' },
        { value: '8', label: 'September' },
        { value: '9', label: 'October' },
        { value: '10', label: 'November' },
        { value: '11', label: 'December' }
    ];
};

export const getYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [
        { value: 'thisYear', label: 'This Year' },
        { value: 'showAll', label: 'Show All' }
    ];
    
    // Add years from 5 years ago to current year
    for (let year = currentYear; year >= currentYear - 5; year--) {
        years.push({ value: year.toString(), label: year.toString() });
    }
    
    return years;
};

// Get display label for month value
export const getMonthLabel = (monthValue) => {
    const monthOptions = getMonthOptions();
    const option = monthOptions.find(opt => opt.value === monthValue);
    return option ? option.label : monthValue;
};

// Get display label for year value  
export const getYearLabel = (yearValue) => {
    const yearOptions = getYearOptions();
    const option = yearOptions.find(opt => opt.value === yearValue);
    return option ? option.label : yearValue;
};