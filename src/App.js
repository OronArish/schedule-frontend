import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Shifts from "./components/Shifts";
import Employees from './components/Employees';
import Constraints from "./components/Constraints";
import RegisterEmployee from './components/RegisterEmployee';
import Modal from 'react-modal';

function App() {
  const [user, setLoginUser] = useState({});
  const [employees, setEmployees] = useState([]);

  // Add employee to the list of employees
  const addEmployee = (employee) => {
    setEmployees([...employees, employee]);
  };
  Modal.setAppElement(document.body);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/Login" element={<Login setLoginUser={setLoginUser} />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Shifts" element={<Shifts />} />
          <Route path="/Employees" element={<Employees employees={employees} />} />
          <Route path="/RegisterEmployee" element={<RegisterEmployee addEmployee={addEmployee} />} />
          <Route path="/Constraints" element={<Constraints />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
