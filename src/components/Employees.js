import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from 'styled-components';
import Sidebar from "./Sidebar";

function Employees({ username }) {
  const [employees, setEmployees] = useState([]);
  const [editUsername, setEditUsername] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editEmployeeID, setEditEmployeeID] = useState("");
  const [editPosition, setEditPosition] = useState("");
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [role, setUserRole] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_FETCH_URL + "employees");
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
        // Handle the error here, such as showing an error message to the user
      }
    };
  
    const userRoleFromLocalStorage = localStorage.getItem("role");
    setUserRole(userRoleFromLocalStorage);
  
    fetchEmployees();
  }, []);

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setEditUsername(employee.username);
    setEditEmail(employee.email);
    setEditPhone(employee.phone);
    setEditEmployeeID(employee.employeeID);
    setEditPosition(employee.position);
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
  
    try {
      const { username, email, employeeID, phone, position } = editingEmployee;
      const newUsername = editUsername;
      const newEmail = editEmail;
      const newPhone = editPhone;
      const newEmployeeID = editEmployeeID;
      const newPosition = editPosition;
  
      // Check if the new username is different from the existing one
      if (newUsername !== username) {
        // Check if the new username already exists in the database
        const existingEmployee = employees.find((employee) => employee.username === newUsername);
        if (existingEmployee) {
          throw new Error('Username already exists');
        }
      }
  
      await axios.put(process.env.REACT_APP_FETCH_URL + `Employees/${username}`, {
        username: newUsername,
        email: newEmail,
        employeeID: newEmployeeID,
        phone: newPhone,
        position: newPosition,
        shift: editingEmployee.shift,
      });
  
      setEditUsername("");
      setEditEmail("");
      setEditPhone("");
      setEditEmployeeID("");
      setEditPosition("");
      setEditingEmployee(null);
  
      const updatedEmployees = employees.map((employee) => {
        if (employee.username === editingEmployee.username) {
          return {
            ...employee,
            username: newUsername,
            email: newEmail,
            employeeID: newEmployeeID,
            phone: newPhone,
            position: newPosition,
          };
        }
        return employee;
      });
  
      setEmployees(updatedEmployees);
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };
  
  const handleDelete = async (username) => {
    try {
      await axios.delete(process.env.REACT_APP_FETCH_URL + `employees/${username}`);
  
      // Update the employees state after deletion
      setEmployees(prevEmployees => prevEmployees.filter(employee => employee.username !== username));
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  return (
    <StyledComponent>
      <Sidebar />
      <div className="employees-container">
        <h1>Employees Page</h1>
        <ul className="employees-list">
          {employees.map((employee) => (
            <li key={employee._id || employee.email} className="employee-item">
              <p className="mb-1">
                <strong>Username:</strong> {employee.username}
              </p>
              <p className="mb-1">
                <strong>Email:</strong> {employee.email}
              </p>
              <p className="mb-1">
                <strong>Phone:</strong> {employee.phone}
              </p>
              <p className="mb-1">
                <strong>Employee ID:</strong> {employee.employeeID}
              </p>
              <p className="mb-1">
                <strong>Position:</strong> {employee.position}
              </p>
              {role === "manager" && (
              <button onClick={() => handleEdit(employee)} className="edit-button">
                Edit
              </button>
              )}
              {role === "manager" && (
              <button onClick={() => handleDelete(employee.username)} className="delete-button">
                Delete
              </button>
              )}
            </li>
          ))}
        </ul>
         
        {editingEmployee && (
          <form onSubmit={handleUpdate} className="edit-form">
            <input
              type="text"
              value={editUsername}
              onChange={(e) => setEditUsername(e.target.value)}
              placeholder="Username"
              className="input-field"
            />
            <input
              type="email"
              value={editEmail}
              onChange={(e) => setEditEmail(e.target.value)}
              placeholder="Email"
              className="input-field"
            />
            <input
              type="text"
              value={editPhone}
              onChange={(e) => setEditPhone(e.target.value)}
              placeholder="Phone"
              className="input-field"
            />
            <input
              type="text"
              value={editEmployeeID}
              onChange={(e) => setEditEmployeeID(e.target.value)}
              placeholder="Employee ID"
              className="input-field"
            />
            <input
              type="text"
              value={editPosition}
              onChange={(e) => setEditPosition(e.target.value)}
              placeholder="Position"
              className="input-field"
            />
            <button type="submit" className="update-button">
              Update Employee
            </button>
            <button onClick={() => setEditingEmployee(null)} className="cancel-button">
              Cancel
            </button>
          </form>
        )}
      </div>
    </StyledComponent>
  );  
}

const StyledComponent = styled.div`
  margin: 0;
  padding: 0;
  background-image: url(https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100%;
  min-height: 100vh;
  font-family: "Mona Sans", "Mona Sans Header Fallback", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";

  .employees-container {
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
  }

  .employee-item {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;
  }

  .delete-button,
  .edit-button {
    background-color: #dc3545;
    color: white;
    border: none;
    padding: 10px 20px;
    margin-right: 10px;
    cursor: pointer;
  }

  .update-button,
  .cancel-button
   {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    margin-right: 10px;
    cursor: pointer;
  }

  .employees-list {
    list-style: none;
    padding: 0;
  }

  .employees-list .mb-1 {
    margin-bottom: 5px;
  }

  .edit-form {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    margin-top: 10px;
  }

  .edit-form .input-field {
    margin-bottom: 10px;
    width: 100%;
    padding: 8px;
    font-size: 14px;
  }
`;

export default Employees;
