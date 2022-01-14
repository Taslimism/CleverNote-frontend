import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './../pages/Home';
import Authenticate from './../pages/Authenticate';
import AuthContext from "./../store/authContext";

function App() {
  const ctx = useContext(AuthContext);
  console.log(ctx.isLoggedIn);

  return (
    <Router>
      <Routes>

        <Route path="/" element={ctx.isLoggedIn ? <Home /> : <Authenticate />} />

      </Routes>
    </Router>
  );
}

export default App;
