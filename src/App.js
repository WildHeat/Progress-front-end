import "./App.css";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css"
import MainContent from "./components/MainContent";
import AllSkills from "./components/AllSkills";
import { useEffect, useState } from "react";
import NoUsers from "./components/NoUsers";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import AddUserForm from "./components/AddUserForm";
import PageNotFound from "./components/PageNotFound";


function App() {

  const [users, setUsers] = useState([]);
  const [showing, setShowing] = useState("");

  useEffect(() => {
      fetch("/api/v1/users", {
        "headers" : {
          "Content-type" : "application/json"
        },
        "method" : "get"
      })
      .then((response) => Promise.all([response.json(),response.headers]))
      .then(([body,headers]) => {
        setUsers(body);
        console.log(body);
        setShowing(users.length > 0 ? <><Header user={body[0]}/><MainContent/><AllSkills user={body[0]}/></> : <NoUsers/>)
      });
    }, [users.length]);

    

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={showing} />
          <Route path="/add-user" element={<AddUserForm />} />
          <Route path="/*" element={<PageNotFound />} />
          
        </Routes>    
      </div>
    </Router>
  );
}

export default App;
