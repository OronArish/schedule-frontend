import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useSelector } from 'react-redux';

function RegisterEmployee(props) {
  const navigate = useNavigate();
  const userRole = useSelector((state) => state.user);
  const [employee, setEmployee] = useState({
    username: '',
    email: '',
    phone: '',
    employeeID: '',
    position: '',
    password: '',
    role: 'employee',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(process.env.REACT_APP_FETCH_URL + 'Registeremployee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employee),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        navigate('/Home');
        props.addEmployee(data); // Add the new employee to the list
      }
      // Add any necessary logic for handling the response data
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Sidebar employee={employee} />
      <StyledRegisterForm onSubmit={handleSubmit}>
        <h2 style={{color: "#F8F8FF"}}>Register Employee</h2>
        <StyledInput
          type="text"
          placeholder="Name"
          name="username"
          value={employee.username}
          onChange={handleInputChange}
          required
        />
        <StyledInput
          type="email"
          placeholder="Email"
          name="email"
          value={employee.email}
          onChange={handleInputChange}
          required
        />
        <StyledInput
          type="tel"
          placeholder="Phone Number"
          name="phone"
          value={employee.phone}
          onChange={handleInputChange}
          required
        />
        <StyledInput
          type="text"
          placeholder="Position"
          name="position"
          value={employee.position}
          onChange={handleInputChange}
          required
        />
        <StyledInput
          type="text"
          placeholder="Employee ID"
          name="employeeID"
          value={employee.employeeID}
          onChange={handleInputChange}
          required
        />
        <StyledInput
          type="password"
          placeholder="Password"
          name="password"
          value={employee.password}
          onChange={handleInputChange}
          required
        />
        <StyledSelect
          name="role"
          value={employee.role}
          onChange={handleInputChange}
          required
        >
          <option disabled="Select Role">Select Role</option>
          <option value="employee">Employee</option>
          <option value="manager">Manager</option>
        </StyledSelect>
        <StyledButton type="submit">Submit</StyledButton>
      </StyledRegisterForm>
    </div>
  );
}

const StyledRegisterForm = styled.form`
background-image: url(https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80);
background-size: cover;
background-position: center;
  background-repeat: no-repeat;
  height: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-attachment: fixed;

`;

const StyledInput = styled.input`
  width: 30%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 16px;
`;

const StyledSelect = styled.select`
  width: 32%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 16px;
  box-sizing: border-box;

  option.disabled {
    font-size: 16px;
    color: gray;
  }
`;

const StyledButton = styled.button`
  width: 32%;
  padding: 10px;
  border-radius: 4px;
  border: none;
  background-color: #333;
  color: #fff;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #444;
  }
`;

export default RegisterEmployee;