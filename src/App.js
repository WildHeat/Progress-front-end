import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddUserForm from "./components/AddUserForm";
import PageNotFound from "./components/PageNotFound";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Header from "./components/Header";
import IndexPage from "./components/index/IndexPage";
import SkillView from "./components/SkillView/SkillView";
import ProfilePage from "./components/Profile/ProfilePage";
import Footer from "./components/Footer";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import About from "./components/About/About";

library.add(faBars, faTimes);

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />

          <Route
            path="/skills/:id"
            element={
              <PrivateRoute>
                <SkillView />
              </PrivateRoute>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<AddUserForm />} />
          <Route path="/about" element={<About />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
