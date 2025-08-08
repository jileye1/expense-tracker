import styled from "styled-components";
import bg from './img/bg.png'
import { MainLayout } from './styles/Layouts'
import Navigation from "./components/navigation/navigation";
import { useState } from "react";
import Dashboard from "./components/dashboard";
import Expenses from "./components/expenses/expenseIndex";
// import Income from "./components/incomes/incomeIndex";
import Categories from "./components/categoryBudgets/categoryBudgetIndex";
import Budget from "./components/budget";
import { useAuthContext } from "./contexts/AuthContext";
import LoginPage from "./pages/login/login";


function App() {

  const { isAuthenticated, loading } = useAuthContext();
  const [activeWindow, setActiveWindow] = useState(1);

  const displayActiveWindow = () => {
    switch (activeWindow) {
      case 1:
        return <Expenses />
      case 2:
        return <Categories />
      case 3:
        return <Dashboard />
      default:
        return <Expenses />
    }
  }

  // Show loading spinner while checking authentication
  if(loading) {
    return (
      <AppStyled bg={bg} className="App">
        <MainLayout>
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading...</p>
          </div>
        </MainLayout>
      </AppStyled>
    );
  }

  return (
    <AppStyled bg={bg} className="App">
        {!isAuthenticated() ? ( <LoginPage /> ) : (
          <MainLayout>
            <Navigation activeWindow={activeWindow} setActiveWindow={setActiveWindow} />
            <main>
              {displayActiveWindow()}
            </main>
          </MainLayout>
        )}
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
  .loading-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    color: #374151;

    .spinner{
      width: 40px;
      height: 40px;
      border: 4px solid #e5e7eb;
      border-top: 4px solid #3b82f6;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-bottom: 16px;
    }

    p {
      font-size: 16px;
      margin: 0;
    }
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export default App;




    // switch (activeWindow) {
    //   case 1:
    //     return <Dashboard />
    //   case 2:
    //     return <Expenses />
    //   case 3:
    //     return <Income />
    //   case 4:
    //     return <Categories />
    //   case 5:
    //     return <Budget />
    //   default:
    //     return <Dashboard />
    // }