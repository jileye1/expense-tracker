import styled from "styled-components";
import bg from './img/bg.png'
import { MainLayout } from './styles/Layouts'
import Navigation from "./components/navigation/navigation";
import { useState } from "react";
import Dashboard from "./components/dashboard";
import Expenses from "./components/expenses/expenseIndex";
import Income from "./components/incomes/incomeIndex";
import Categories from "./components/categoryBudgets/categoryBudgetIndex";
import Budget from "./components/budget";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/clerk-react";
import StyledButton from "./components/button/styledButton";


function App() {

  const [activeWindow, setActiveWindow] = useState(1);

  const displayActiveWindow = () => {
    switch (activeWindow) {
      case 1:
        return <Dashboard />
      case 2:
        return <Expenses />
      case 3:
        return <Income />
      case 4:
        return <Categories />
      case 5:
        return <Budget />
      default:
        return <Dashboard />
    }
  }

  return (
    <AppStyled bg={bg} className="App">
      <MainLayout>
        <SignedOut>
          <div className="sign-in-container">
            <h1>Welcome to Your New Budgeting App!</h1>
            <p>
              Sign In or Sign Up to start tracking your expenses!
            </p>
            <div className="btn-con">
              <SignInButton mode="modal">
                <StyledButton name={"Sign In"} />
              </SignInButton>
              <SignUpButton mode="modal">
                <StyledButton name={"Sign Up"} />
              </SignUpButton>
            </div>
          </div>
        </SignedOut>
        <SignedIn>
          <Navigation activeWindow={activeWindow} setActiveWindow={setActiveWindow} />
          <main>
            {displayActiveWindow()}
          </main>
        </SignedIn>
      </MainLayout>
    </AppStyled>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${props => props.bg});
  position: relative;
  main{
    flex: 1;
    min-width: 0; // Allows the main to shrink properly
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    position: relative; // create stacking context
    z-index: 1; // lower z index than nav
    &::-webkit-scrollbar{
      width: 0;
    }
  }
  .sign-in-container{
    margin-top: 100px;
    align-items: center;
    h1, p{
      margin: 10px;
    }
  }
  .btn-con{
    display: flex;
    margin: 10px;
    margin-top: 25px;
    flex: start;
    gap: 10px;
  }
`;

export default App;
