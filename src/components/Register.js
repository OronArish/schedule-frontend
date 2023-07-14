import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';

function Register() {

    const [userData, setUserData] = useState({
        userName: "",
        email: "",
        password: "",
        employeeID: "",
         })

         function handleChange(e) {
            setUserData({
              ...userData,
              [e.target.name]: e.target.value
            });
           }

           const handleSubmit = (event) => {
            event.preventDefault();
          
            fetch(process.env.REACT_APP_FETCH_URL + 'register', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                userName: userData.userName,
                email: userData.email,
                password: userData.password,
                employeeID: userData.employeeID,
              }),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.errors) {
                  // Handle validation errors
                  console.log(data.errors);
                } else {
                  // Registration successful
                  console.log(data);
                }
              })
              .catch((err) => {
                console.log(err);
              });
          };
          
          return (
            <StyledComponent>
            <form className='Register_page' onSubmit={handleSubmit}>
            <img className='img_Register' src='images/imgregister.jpg' alt='register'/>
            
            <div className='welcome_div'>
            <h1> Welcome  </h1>
             </div>

              <div className='username_div'>
              <input 
              name = 'userName'
              onChange = {handleChange}
              placeholder = "Your Username"
              defaultValue= {userData.userName || ''}
              />
              </div>
              <div className='username_div'>
                <input
                  name="email"
                 onChange={handleChange}
                 placeholder = "Your Email"
                 defaultValue={userData.email || ''}
                />
              </div>
              <div className='employeeid_div'>
              <input 
              name= 'employeeID'
              onChange = {handleChange}
              placeholder = "Your EmployeeID"
              defaultValue= {userData.employeeID || ''}
              />
              </div>
              <div className='password_div'>
              <input 
              name = 'password'
              onChange = {handleChange}
              placeholder = "password"
              defaultValue={userData.password || ''}
              />
              </div>
              <button className='button' type="submit">Register</button>
            </form>
            </StyledComponent>
          );
}

    const StyledComponent = styled.div`
*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    text-size-adjust: none;
}
.body{
    background-color: #f5f5f5;
}
.Register_page{
 padding: 50px;
 justify-content: center;
 text-align: left;
 margin-left: 150px;
 margin-top: 100px;
}
.welcome_div{
    display: block;
    font-size: 1.5em;
    margin-block-start: 0.83em;
    margin-block-end: 0.83em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
}
.username_div{
padding: 5px;
margin:10px 0;
border-radius: 10px;
width: 100%;
}
.password_div{
padding: 5px;
margin:10px 0;
border-radius: 10px;
width: 100%;
}
.employeeid_div{
padding: 5px;
margin:10px 0;
border-radius: 10px;
width: 100%;
}
.button{
  padding:3px;
  border:none;
  background-color:#3F51B5;
  color:#fff;
  font-weight:600;
  border-radius:5px;
  width: 5%;
}
.img_Register {
  float: right;
  position: absolute;
  right: 30px;
  top: 20px;
  width: 50%;
  height: 90%;
}
`

export default Register
