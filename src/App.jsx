import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login.jsx";
import Home from "./pages/Home/Home.jsx";
import Edit from "./pages/Edit/Edit.jsx";
import AuthCheck from "./AuthCheck.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={
            <AuthCheck>
              <Home />
            </AuthCheck>
          }
        />
        <Route
          path="/edit"
          element={
            <AuthCheck>
              <Edit />
            </AuthCheck>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
