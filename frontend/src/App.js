import styled from "styled-components";
import bg from './img/bg.png'
import {MainLayout} from './styles/Layouts'
import Navigation from "./components/navigation/navigation";
import { useState } from "react";
import Dashboard from "./components/dashboard";
import Expenses from "./components/expenses/expenseIndex";
import Income from "./components/income";
import Categories from "./components/categories";
import Budget from "./components/budget";


function App() {

  const [activeWindow, setActiveWindow] = useState(1);

  const displayActiveWindow = () => {
    switch(activeWindow){
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
          <Navigation activeWindow={activeWindow} setActiveWindow={setActiveWindow}/>
          <main>
            {displayActiveWindow()}
          </main>
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
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar{
      width: 0;
    }
  }
`;

export default App;
