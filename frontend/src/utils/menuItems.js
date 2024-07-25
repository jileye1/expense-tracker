import { budget, categories, dashboard, expenses, income } from '../utils/icons'

export const menuItems = [
    {
        id: 1,
        title: 'Dashboard',
        icon: dashboard,
        link: '/dashboard'
    },
    {
        id: 2,
        title: 'Expenses',
        icon: expenses,
        link: '/espenses'
    },
    {
        id: 3,
        title: 'Income',
        icon: income,
        link: '/income'
    },
    {
        id: 4,
        title: 'Budget by Category',
        icon: categories,
        link: '/budget-by-category'
    },
    {
        id: 5,
        title: 'Budget by Month',
        icon: budget,
        link: '/budget-by-month'
    }
]