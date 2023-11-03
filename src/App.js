//importing all files for connections
import {BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Navbar from './components/Navbar';
import PostQuestion from "./pages/PostQuestion";
import CreateAccount from "./pages/CreateAccount";
import Settings from "./pages/Settings";
import Login from "./pages/login";
import PrivateRoute from "./components/PrivateRoute";
import MyQuestions from "./pages/MyQuestions";
import Question from "./pages/Question";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path ="/category/:categoryName/:postingId"  element = {<Question />} />
          <Route path ="/create-account"  element = {<CreateAccount />} />
          <Route path ="/forgot-password"  element = {<ForgotPassword />} />
          <Route path = "/settings" element = {<PrivateRoute /> }>
            <Route path ="/settings"  element = {<Settings />} />
            </Route>
            <Route path = "/post-question" element = {<PrivateRoute /> }>
            <Route path = "/post-question" element = {<PostQuestion />} />
          </Route>
          <Route path = "/post-question" element = {<PrivateRoute /> }>
            <Route path ="/post-question"  element = {<PostQuestion />} />
          </Route>
          <Route path = "/my-questions" element = {<PrivateRoute /> }>
            <Route path ="/my-questions"  element = {<MyQuestions />} />
          </Route>
          <Route path ="/login" element = {<Login />} />
        </Routes>

      </Router>
      
    </div>
  );
}

export default App;
