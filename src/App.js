import React, { Fragment, useEffect, useState } from "react";
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
import { useDispatch } from "react-redux";
import { setUserHander } from "./store/store";
import axios from "axios";
import { useSelector } from "react-redux/es/hooks/useSelector";

function App() {
  const [user, setLoginUser] = useState({});
  const [employees, setEmployees] = useState([]);
  const dispatch = useDispatch();
  const role = useSelector(state => state.user);
  
  // Add employee to the list of employees
  const addEmployee = (employee) => {
    setEmployees([...employees, employee]);
  };
  Modal.setAppElement(document.body);

  useEffect(() => { 
    const getUser = async() => {
      const id = localStorage.getItem("id");
      if (id) {
      const user = await axios.post(process.env.REACT_APP_FETCH_URL +'getposition', {
        id:(id)
      })
      console.log(user);
      dispatch(setUserHander({role: user.data.role}))
      }
    }
    getUser();
  },[])
  console.log(role);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/Login" element={<Login setLoginUser={setLoginUser} />} />
          {!role && <Route path="*" element={<Login setLoginUser={setLoginUser} />}/>}
          {role && <Fragment>
          <Route path="/Home" element={<Home />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Shifts" element={<Shifts />} />
          <Route path="/Employees" element={<Employees employees={employees} />} />
          <Route path="/RegisterEmployee" element={<RegisterEmployee addEmployee={addEmployee} />} />
          <Route path="/Constraints" element={<Constraints />} />
          </Fragment>}
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

