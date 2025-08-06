import styled from "styled-components";

export const NavStyled = styled.nav`
padding: 2rem 1.5rem;
width: 20%;
min-width: 200px;
height: 100%;
background: rgba(252, 246, 249, 0.78);
border: 3px solid #FFFFFF;
backdrop-filter: blur(4.5px);
border-radius: 32px;
display: flex;
flex-direction: column;
justify-content: space-between;
gap: 2rem;
position: relative; // Establish stacking context
z-index: 100; // Ensure nav is above main content

@media screen and (max-width: 1200px) {
    width: 180px;
    min-width: 180px;
}

// @media screen and (max-width: 900px) {
//     width: 140px;
//     min-width: 140px;
//     padding: 1.5rem 0.8rem;
// }

// For tablet/mobile view - icons only
@media screen and (max-width: 900px) {
    width: 80px;
    min-width: 80px;
    padding: 1.5rem 0;
}

.user-container{
    height: auto;
    min-height: 100px;
    display: flex;
    align-items: center;
    gap: 1rem;
    overflow: hidden;

    @media screen and (max-width: 1200px) {
        flex-direction: column;
        text-align: center;
        gap: 0.5rem;
        min-height: 80px;
    }

    // For tablet/mobile view - icons only
    @media screen and (max-width: 900px) {
        min-height: 60px;
        gap: 0;
        justify-content: center; // Align image left like icons
        padding-left: 0;
    }

    img{
        width: 80px;
        height: 80px;
        border-radius: 50%;
        object-fit: cover;
        box-shadow: -5px 5px 10px rgba(0, 0, 0, 0.2);

        @media screen and (max-width: 1200px) {
            width: 60px;
            height: 60px;   
        }

        // small thumbnail for tablet/mobile view
        @media screen and (max-width: 900px) {
            width: 40px;
            height: 40px; 
            padding: 0.1rem;   
        }
    }

    div{
        min-width: 0; // Allows text to shrink if necessary

        @media screen and (max-width: 900px) {
            display: none; // Hide text on tablet/mobile view
        }
    }
    h2{
        color: rgba(34, 34, 96, 1);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        @media screen and (max-width: 1200px) {
            font-size: 1.1rem;
        }
    }
    p{
        color: rgba(34, 34, 96, .6);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        @media screen and (max-width: 1200px) {
            font-size: 0.9rem;
        }
    }
}

.menu-items{
    flex: 1;
    display: flex;
    flex-direction: column;

    @media screen and (max-width: 900px) {
        flex: none; // Prevent flex growth on mobile
    }

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

            @media screen and (max-width: 900px) {
                display: none; // Hide text on tablet view
            }
        }
        @media screen and (max-width: 1200px) {
            padding-left: 0.5rem;
            grid-template-columns: 30px 1fr;
            // margin: .6rem 0;
            font-size: 0.85rem;
        }

        // For tablet/mobile view - icons only
        // Center icons
        // @media screen and (max-width: 900px) {
        //     grid-template-columns: 1fr;
        //     justify-items: center; // center the icon
        //     margin: .4rem 0;
        //     padding-left: 0;
        //     border-radius: 8px; // Add border radius for hover effect

        //     &:hover {
        //         background: rgba(34, 34, 96, 0.05);
        //     }
        // }

        // For tablet/mobile view - icons only
        // Centre icons
        @media screen and (max-width: 900px) {
            grid-template-columns: 1fr; // Single column for icon only
            justify-items: center; // center the icon
            // margin: .6rem 0;
            padding-left: 0;
            // padding: 0.4rem; // Add padding for touch targets
            border-radius: 8px; // Add border radius for hover effect
            position: relative; // for positioning tooltip

            &:hover {
                background: rgba(34, 34, 96, 0.05);

                // Show expanded overlay on hover
                &::after {
                    content: attr(data-title);
                    position: absolute;
                    left: 100%;
                    top: 50%;
                    transform: translateY(-50%);
                    background: rgba(252, 246, 249, 0.95);
                    border: 2px solid #FFFFFF;
                    border-radius: 8px;
                    padding: 0.5rem 1rem;
                    white-space: nowrap;
                    font-size: 0.85rem;
                    font-weight: 500;
                    color: rgba(34, 34, 96, 0.8);
                    backdrop-filter: blur(4.5px);
                    box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.15);
                    z-index: 9999; // Ensure tooltip is above other content
                    margin-left: 0.5rem;
                    opacity: 0;
                    animation: fadeInTooltip 0.2s ease-out forwards;
                    pointer-events: none; // Prevent tooltip from blocking clicks
                }
                
                span {
                    display: none; // Keep text hidden even on hover
                }
            }
        }

        @keyframes fadeInTooltip {
            from {
                opacity: 0;
                transform: translateY(-50%) translateX(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(-50%) translateX(0);
            }
        }

        i{
            color: rgba(34, 34, 96, 0.6);
            font-size: 1.4rem;
            transition: all .4s ease-in-out;

            @media screen and (max-width: 1200px) {
                font-size: 1.2rem;
            }
        }
    }
}

.bottom-nav{

    margin-top: auto; // Push to the bottom

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

            @media screen and (max-width: 900px) {
                display: none; // Hide text on tablet/mobile view
            }
        }

        @media screen and (max-width: 1200px) {
            padding-left: 0.5rem;
            grid-template-columns: 30px 1fr;
            // margin: .4rem 0;
            font-size: 0.85rem;
        }

        // For tablet/mobile view - icons only
        // Center like menu items
        @media screen and (max-width: 900px) {
            grid-template-columns: 1fr;
            justify-items: center;
            // margin: .6rem 0;
            padding-left: 0;
            // padding: 0.4rem; // Add padding for touch targets
            border-radius: 8px;
            position: relative; // for positioning tooltip

            &:hover {
                background: rgba(34, 34, 96, 0.05); 

                // Show "Sign Out" tooltip on hover
                &::after {
                    content: "Sign Out";
                    position: absolute;
                    left: 100%;
                    top: 50%;
                    transform: translateY(-50%);
                    background: rgba(252, 246, 249, 0.95);
                    border: 2px solid #FFFFFF;
                    border-radius: 8px;
                    padding: 0.5rem 1rem;
                    white-space: nowrap;
                    font-size: 0.85rem;
                    font-weight: 500;
                    color: rgba(34, 34, 96, 0.8);
                    backdrop-filter: blur(4.5px);
                    box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.15);
                    z-index: 9999; // Ensure tooltip is above other content
                    margin-left: 0.5rem;
                    opacity: 0;
                    animation: fadeInTooltip 0.2s ease-out forwards;
                    pointer-events: none; // Prevent tooltip from blocking clicks
                }
                
                span {
                    display: none;
                }
            }
        }
        i{
            color: rgba(34, 34, 96, 0.6);
            font-size: 1.4rem;
            transition: all .4s ease-in-out;

            @media screen and (max-width: 1200px) {
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

        // Keep indicator for tablet view
        @media screen and (max-width: 900px) {
            left: 0;
            top: 0;
            bottom: auto;
            width: 4px;
            height: 100%;
            transform: none;
            border-radius: 0 10px 10px 0;
        }
    }
}
`;

// // Hamburger button styles
// export const HamburgerButton = styled.button`
//     display: none;
//     flex-direction: column;
//     justify-content: space-around;
//     width: 40px;
//     height: 40px;
//     background: rgba(252, 246, 249, 0.78);
//     border: 2px solid #FFFFFF;
//     border-radius: 8px;
//     cursor: pointer;
//     padding: 8px;
//     position: fixed;
//     top: 20px;
//     left: 20px;
//     z-index: 1001;
//     backdrop-filter: blur(4.5px);
//     box-shadow: 0px 2px 10px rgba(0, 0, 0, 1);

//     // Show hamburger button only on mobile
//     @media screen and (max-width: 768px) {
//         display: flex;
//     }


//     span {
//         width: 100%;
//         height: 3px;
//         background: rgba(34, 34, 96, 0.8);
//         border-radius: 2px;
//         transition: all 0.3s ease;
//         transform-origin: center;
//     }

//     &:hover {
//         background: rgba(252, 246, 249, 1);

//         span {
//             background: rgba(34, 34, 96, 1);
//         }
//     }

//     &:active {
//         transform: scale(0.95);
//     }

// `;

// // Overlay for mobile menu
// export const MenuOverlay = styled.div`
//     display: none;

//     @media screen and (max-width: 768px) {
//         display: block;
//         position: fixed;
//         top: 0;
//         left: 0;
//         width: 100vw;
//         height: 100vh;
//         background: rgba(0, 0, 0, 0.5);
//         z-index: 999;
//         cursor: pointer;
//     }
// `;
