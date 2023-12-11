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
import Home from "./pages/Home";
import ExplorePage from "./pages/ExplorePage";
import MorePosts from "./pages/MorePosts";
import Category from "./pages/Category";
import AnswerQuestion from "./pages/AnswerQuestion";
import AnswerPage from "./pages/AnswerPage";
import Footer from "./components/Footer";
import SavedQuestions from './pages/SavedQuestions';
import AboutPage from "./pages/AboutPage";
import UserProfile from "./components/UserProfile";
import LearningResources from "./pages/LearningResources";
import UnansweredQuestions from "./pages/Unanswered";
import MostAnswered from "./pages/MostAnswered";
import Subject from "./pages/Subjects";
import Homepage from "./pages/Homepage";
import BackgroundView from "./components/BackgroundVeiw";
function App() {
  return (
    <div className="">
      <Router>
        <Navbar />
        <BackgroundView>
        <Routes>
          <Route path = "/" element = {<Homepage />}/>
          <Route path ="/category/:categoryName/:postingId"  element = {<Question />} />
          <Route path = "/answer/:postingId" element = {<AnswerPage />} />
          <Route path = "/learning-resources" element = {<LearningResources />} />
          <Route path = "/unanswered-posts" element = {<UnansweredQuestions />} />
          <Route path = "/most-answered-posts" element = {<MostAnswered />} />
          
          <Route path = "/profile/:profileId" element = {<UserProfile />}></Route>
          <Route path ="/create-account"  element = {<CreateAccount />} />
          <Route path ="/forgot-password"  element = {<ForgotPassword />} />
          <Route path = "/settings" element = {<PrivateRoute /> }>
            <Route path ="/settings"  element = {<Settings />} />
            </Route>
            <Route path = "/post-question" element = {<PrivateRoute /> }>
              <Route path = "/post-question" element = {<PostQuestion />} />
            </Route>
            <Route path = "/answer-question" element = {<PrivateRoute /> }>
              <Route path = "/answer-question/:postingId" element = {<AnswerQuestion />} />
            </Route>
          <Route path = "/post-question" element = {<PrivateRoute /> }>
            <Route path ="/post-question"  element = {<PostQuestion />} />
          </Route>
          <Route path = "/my-questions" element = {<PrivateRoute /> }>
            <Route path ="/my-questions"  element = {<MyQuestions />} />
          </Route>
          <Route path ="/login" element = {<Login />} />
          <Route path="/more-posts" element={<MorePosts />} />
          <Route path = "/category/:categoryName" element = {<Category/>}/>
          <Route path="/saved-questions" element={<SavedQuestions />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path ="/explore"  element = {<ExplorePage />} />
          <Route path = "/subjects/:subjectName" element = {<Subject />}/>
          <Route path = "/Homepage" element = {<Homepage />} />
        </Routes>
       
        </BackgroundView>
        <Footer />

      </Router>
      
    </div>
  );
}

export default App;