import React from 'react'
import { menuItems} from '../../utils/menuItems'
import { signout } from '../../utils/icons'
import { NavStyled } from './navStyle'
import avatar from '../../img/avatar.png'
import { useAuthContext } from '../../contexts/AuthContext'

function Navigation({activeWindow, setActiveWindow}) {
    const { user, logout } = useAuthContext();

    // const [isMenuOpen, setIsMenuOpen] = useState(false);

    // const toggleMenu = () => {
    //     setIsMenuOpen(!isMenuOpen);
    // };

    // const handleMenuItemClick = (itemId) => {
    //     setActiveWindow(itemId);
    //     setIsMenuOpen(false); // Close the menu after selecting an item
    // };

    const handleSignout = () => {
        logout();
    }

    return (
        <NavStyled>
            <div className='user-container'>
                <img src={avatar} alt=""/>
                <div>
                    <h2>{user?.name || 'User'}</h2>
                    {/* <p>Your Money</p> */}
                </div>
            </div>
            <ul className='menu-items'>
                {menuItems.map((item) => {
                    return <li 
                        key={item.id}
                        onClick={() => setActiveWindow(item.id)}
                        className={activeWindow === item.id ? 'active' : ''}
                        data-title={item.title}
                        >
                        {item.icon}
                        <span>{item.title}</span>
                    </li>
                })}
            </ul>
            <div className='bottom-nav'>
                <li onClick={handleSignout} style={{ cursor: 'pointer'}}>
                    {signout} <span>Sign Out</span>
                </li>
            </div>
        </NavStyled>
    )
}

export default Navigation;