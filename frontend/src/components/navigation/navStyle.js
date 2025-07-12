import styled from "styled-components";

export const NavStyled = styled.nav`
padding: 2rem 1.5rem;
width: 25%;
min-width: 250px;
height: 100%;
background: rgba(252, 246, 249, 0.78);
border: 3px solid #FFFFFF;
backdrop-filter: blur(4.5px);
border-radius: 32px;
display: flex;
flex-direction: column;
justify-content: space-between;
gap: 2rem;

@media screen and (max-width: 1200px) {
    width: 280px;
}

@media screen and (max-width: 900px) {
    width: 220px;
    min-width: 220px;
    padding: 1.5rem 1rem;
}

// For mobile view - hidden by default
@media screen and (max-width: 768px) {
    position: fixed;
    top: 0;
    left: -280px; // Initially hidden off-screen
    width: 280px;
    height: 100vh;
    z-index: 1000;
    transition: left 0.3s ease-in-out;
    border-radius: 0;
    min-width: unset;

    &.menu-open {
        left: 0;    
    }
}

.user-container{
    height: auto;
    min-height: 100px;
    display: flex;
    align-items: center;
    gap: 1rem;

    @media screen and (max-width: 900px) {
        flex-direction: column;
        text-align: center;
        gap: 0.5rem;
    }
    img{
        width: 80px;
        height: 80px;
        border-radius: 50%;
        object-fit: cover;
        background: #fcf6f9;
        border: 2px solid #FFFFFF;
        padding: .2rem;
        box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
    }
    h2{
        color: rgba(34, 34, 96, 1);
    }
    p{
        color: rgba(34, 34, 96, .6);
    }
}

.menu-items{
    flex: 1;
    display: flex;
    flex-direction: column;
    li{
        display: grid;
        grid-template-columns: 40px 1fr;
        align-items: center;
        margin: .6rem 0;
        font-weight: 500;
        cursor: pointer;
        transition: all .4s ease-in-out;
        color: rgba(34, 34, 96, .6);
        padding-left: 1rem;
        position: relative;
        min-width: 0; //Allows text to shrink if necessary

        span{
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            min-width: 0; // Ensures text can shrink properly
        }

        @media screen and (max-width: 900px) {
            grid-template-columns: 30px 1fr;
            margin: .4rem 0;
            font-size: 0.85rem;
            padding-left: 0.5rem;
        }

        @media screen and (max-width: 768px) {
            grid-template-columns: 25px 1fr;
            margin: .3rem 0;
            font-size: 0.8rem;
            padding-left: 0.5rem;
        }

        i{
            color: rgba(34, 34, 96, 0.6);
            font-size: 1.4rem;
            transition: all .4s ease-in-out;

            @media screen and (max-width: 900px) {
                font-size: 1.1rem;
            }

            @media screen and (max-width: 768px) {
                font-size: 1rem;
            }
        }
    }
}

.bottom-nav{
    li{
        display: grid;
        grid-template-columns: 40px 1fr;
        align-items: center;
        margin: .6rem 0;
        font-weight: 500;
        cursor: pointer;
        transition: all .4s ease-in-out;
        color: rgba(34, 34, 96, .6);
        padding-left: 1rem;
        position: relative;
        min-width: 0; //Allows text to shrink if necessary

        @media screen and (max-width: 900px) {
            padding-left: 0.5rem;
            grid-template-columns: 30px 1fr;
            margin: .4rem 0;
            font-size: 0.85rem;
        }

        @media screen and (max-width: 768px) {
            grid-template-columns: 25px 1fr;
            margin: .3rem 0;
            font-size: 0.8rem;
            padding-left: 0.5rem;
        }
        i{
            color: rgba(34, 34, 96, 0.6);
            font-size: 1.4rem;
            transition: all .4s ease-in-out;

            @media screen and (max-width: 768px) {
                font-size: 1.2rem;
            }
        }
    }
}

.active{
    color: rgba(34, 34, 96, 1) !important;
    i{
        color: rgba(34, 34, 96, 1) !important;
    }
    &::before{
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 4px;
        height: 100%;
        background: #222260;
        border-radius: 0 10px 10px 0;
    }
}
`;

// Hamburger button styles
export const HamburgerButton = styled.button`
    display: none;
    flex-direction: column;
    justify-content: space-around;
    width: 40px;
    height: 40px;
    background: rgba(252, 246, 249, 0.78);
    border: 2px solid #FFFFFF;
    border-radius: 8px;
    cursor: pointer;
    padding: 8px;
    position: fixed;
    top: 20px;
    left: 20px;
    z-index: 1001;
    backdrop-filter: blur(4.5px);
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 1);

    // Show hamburger button only on mobile
    @media screen and (max-width: 768px) {
        display: flex;
    }


    span {
        width: 100%;
        height: 3px;
        background: rgba(34, 34, 96, 0.8);
        border-radius: 2px;
        transition: all 0.3s ease;
        transform-origin: center;
    }

    &:hover {
        background: rgba(252, 246, 249, 1);

        span {
            background: rgba(34, 34, 96, 1);
        }
    }

    &:active {
        transform: scale(0.95);
    }

`;

// Overlay for mobile menu
export const MenuOverlay = styled.div`
    display: none;

    @media screen and (max-width: 768px) {
        display: block;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.5);
        z-index: 999;
        cursor: pointer;
    }
`;
