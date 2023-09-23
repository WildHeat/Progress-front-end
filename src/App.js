import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PageNotFound from "./components/PageNotFound";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login and Logout/Login";
import Logout from "./components/Login and Logout/Logout";
import Header from "./components/Header/Header";
import IndexPage from "./components/index/IndexPage";
import SkillView from "./components/SkillView/SkillView";
import ProfilePage from "./components/Profile/ProfilePage";
import Footer from "./components/Footer/Footer";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import About from "./components/About/About";
import ScrollToTop from "./components/ScrollToTop";
import Register from "./components/Register/Register";
import HeaderUpdater from "./components/HeaderUpdater";

library.add(faBars, faTimes);

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <HeaderUpdater>
                <IndexPage />
              </HeaderUpdater>
            }
          />
          <Route
            path="/profile"
            element={
              <HeaderUpdater>
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              </HeaderUpdater>
            }
          />

          <Route
            path="/skills/:id"
            element={
              <HeaderUpdater>
                <PrivateRoute>
                  <SkillView />
                </PrivateRoute>
              </HeaderUpdater>
            }
          />

          <Route
            path="/login"
            element={
              <HeaderUpdater>
                <Login />
              </HeaderUpdater>
            }
          />
          <Route
            path="/logout"
            element={
              <HeaderUpdater>
                <Logout />
              </HeaderUpdater>
            }
          />
          <Route
            path="/register"
            element={
              <HeaderUpdater>
                <Register />
              </HeaderUpdater>
            }
          />
          <Route
            path="/about"
            element={
              <HeaderUpdater>
                <About />
              </HeaderUpdater>
            }
          />
          <Route
            path="/*"
            element={
              <HeaderUpdater>
                <PageNotFound />
              </HeaderUpdater>
            }
          />
        </Routes>
        <Footer />
        <ScrollToTop />
      </div>
    </Router>
  );
}

export default App;
