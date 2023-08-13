import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddUserForm from "./components/AddUserForm";
import PageNotFound from "./components/PageNotFound";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import Homepage from "./components/Homepage";
import Logout from "./components/Logout";
import Header from "./components/Header";
import IndexPage from "./components/index/IndexPage";
import SkillView from "./components/SkillView/SkillView";

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
                <Homepage />
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
          <Route path="/add-user" element={<AddUserForm />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
