import {BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css';
import Navbar from './components/Navbar';

import CreateAccount from "./pages/CreateAccount";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
        <Route path ="/create-account"  element = {<CreateAccount />} />
        </Routes>

      </Router>
      
    </div>
  );
}

export default App;
