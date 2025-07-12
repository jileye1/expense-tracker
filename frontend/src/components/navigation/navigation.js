import React, {useState} from 'react'
import { menuItems} from '../../utils/menuItems'
import { signout } from '../../utils/icons'
import { NavStyled, HamburgerButton, MenuOverlay } from './navStyle'
import avatar from '../../img/avatar.png'

function Navigation({activeWindow, setActiveWindow}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleMenuItemClick = (itemId) => {
        setActiveWindow(itemId);
        setIsMenuOpen(false); // Close the menu after selecting an item
    };

    return (
        <>
        {/* Hamburger button - only visible on mobile */}
        <HamburgerButton onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
        </HamburgerButton>

        {/* Overlay for mobile menu */}
        {isMenuOpen && <MenuOverlay onClick={toggleMenu} />}

        {/* Navigation menu */}
        <NavStyled className={isMenuOpen ? 'menu-open' : ''}>
            <div className='user-container'>
                <img src={avatar} alt=""/>
                <div>
                    <h2>Name</h2>
                    <p>Your Money</p>
                </div>
            </div>
            <ul className='menu-items'>
                {menuItems.map((item) => {
                    return <li 
                        key={item.id}
                        onClick={() => handleMenuItemClick(item.id)}
                        className={activeWindow === item.id ? 'active' : ''}
                        >
                        {item.icon}
                        <span>{item.title}</span>
                    </li>
                })}
            </ul>
            <div className='bottom-nav'>
                <li onClick={toggleMenu}>
                    {signout} <span>Sign Out</span>
                </li>
            </div>
        </NavStyled>
        </>
    )
}

export default Navigation;