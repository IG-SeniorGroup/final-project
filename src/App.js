import {BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Navbar from './components/Navbar';

import CreateAccount from "./pages/CreateAccount";
import Settings from "./pages/Settings";
import Login from "./pages/login";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path ="/create-account"  element = {<CreateAccount />} />
          <Route path = "/settings" element = {<PrivateRoute /> }>
            <Route path ="/settings"  element = {<Settings />} />
          </Route>
          <Route path ="/login" element = {<Login />} />
        </Routes>

      </Router>
      
    </div>
  );
}

export default App;
