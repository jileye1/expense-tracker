import React from 'react'
import styled from 'styled-components'

function Navigation() {
    return (
        <NavStyled>
            <div className='user-container'>
                <div>User Image</div>
                <div>
                    <h2>Name</h2>
                    <p>Your Money</p>
                </div>
            </div>
            <ul className='menu-items'>
                
            </ul>
        </NavStyled>
    )
}

const NavStyled = styled.nav`

`;

export default Navigation;