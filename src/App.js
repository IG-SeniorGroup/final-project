import {BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Navbar from './components/Navbar';

import CreateAccount from "./pages/CreateAccount";
import Settings from "./pages/Settings";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path ="/create-account"  element = {<CreateAccount />} />
          <Route path ="/settings"  element = {<Settings />} />
        </Routes>

      </Router>
      
    </div>
  );
}

export default App;
