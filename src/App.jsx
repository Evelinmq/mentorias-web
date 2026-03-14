import { useState } from 'react'
import MainMenu from './Components/All/MainMenu'
import "./App.css";
import Login from './Components/Auth/Login';

function App() {

  const [isLoggeado, setLoggeado] = useState(false);


  return (
    <>
    {isLoggeado ? 
    (<MainMenu />) :(
      <Login onLoginSuccess={() => setLoggeado(true)} />
    ) }
    </>
  );
}

export default App;
