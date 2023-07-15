import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

function RegisterEmployee(props) {
  const navigate = useNavigate();
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
        <h2>Register Employee</h2>
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
  padding: 20px 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 16px;
`;

const StyledSelect = styled.select`
  width: 101.57%;
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
  width: 100%;
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