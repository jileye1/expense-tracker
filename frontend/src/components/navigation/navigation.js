import React from 'react'
import { menuItems} from '../../utils/menuItems'
import { signout } from '../../utils/icons'
import { NavStyled } from './navStyle'
import avatar from '../../img/avatar.png'

function Navigation({activeWindow, setActiveWindow}) {
    return (
        <NavStyled>
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
                        onClick={() => setActiveWindow(item.id)}
                        className={activeWindow === item.id ? 'active' : ''}
                        >
                        {item.icon}
                        <span>{item.title}</span>
                    </li>
                })}
            </ul>
            <div className='bottom-nav'>
                <li>
                    {signout} <span>Sign Out</span>
                </li>
            </div>
        </NavStyled>
    )
}

export default Navigation;