import { dollar, categories, dashboard, expenses, income } from '../utils/icons'

export const menuItems = [
    {
        id: 1,
        title: 'Expenses',
        icon: expenses,
        link: '/expenses'
    },
    {
        id: 2,
        title: 'Budget by Category',
        icon: categories,
        link: '/budget-by-category'
    },
    {
        id: 3,
        title: 'Dashboard',
        icon: dashboard,
        link: '/dashboard'
    }
    // {
    //     id: 1,
    //     title: 'Dashboard',
    //     icon: dashboard,
    //     link: '/dashboard'
    // },
    // {
    //     id: 2,
    //     title: 'Expenses',
    //     icon: expenses,
    //     link: '/expenses'
    // },
    // {
    //     id: 3,
    //     title: 'Income',
    //     icon: income,
    //     link: '/income'
    // },
    // {
    //     id: 4,
    //     title: 'Budget by Category',
    //     icon: categories,
    //     link: '/budget-by-category'
    // },
    // {
    //     id: 5,
    //     title: 'Budget by Month',
    //     icon: dollar,
    //     link: '/budget-by-month'
    // }
]