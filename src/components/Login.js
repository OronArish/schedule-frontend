import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    phoneNumber: '',
    otpCode: '',
    showOtpField: false,
  });

  function handleChange(e) {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }

  function handleLogin(e) {
    e.preventDefault();
  
    axios
      .post(process.env.REACT_APP_FETCH_URL + 'login', {
        username: userData.username,
        password: userData.password,
      })
      .then((response) => {
        if (response.status === 200) {
          console.log('Login successful');
          const role = response.data.role;
          localStorage.setItem('role', role);
          axios
            .post(process.env.REACT_APP_FETCH_URL + 'otp', {
              phoneNumber: userData.phoneNumber,
            })
            .then((response) => {
              if (response.status === 200) {
                console.log('OTP sent successfully');
                setUserData({ ...userData, showOtpField: true });
              } else {
                console.log('Failed to send OTP');
              }
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          console.log('Login failed');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleOtpVerification(e) {
    e.preventDefault();

    axios
      .post(process.env.REACT_APP_FETCH_URL + 'verify-otp', {
        phoneNumber: userData.phoneNumber,
        otpCode: userData.otpCode,
      })
      .then((response) => {
        if (response.status === 200) {
          console.log('OTP verification successful');
          navigate('/home');
        } else {
          console.log('OTP verification failed');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <StyledComponent>
      <div className="Login_page">
        <img className="img_Login" src="images/imglogin.jpg" alt="login" />

        <div className="welcome_div">
          <h1>Welcome Back</h1>
        </div>

        {!userData.showOtpField ? (
          <form onSubmit={handleLogin}>
            <div className="username_div">
              <input
                name="username"
                onChange={handleChange}
                placeholder="Your Username"
                value={userData.username}
              />
            </div>

            <div className="password_div">
              <input
                name="password"
                type="password"
                onChange={handleChange}
                placeholder="Password"
                value={userData.password}
              />
            </div>

            <div className="phoneNumber_div">
              <input
                name="phoneNumber"
                onChange={handleChange}
                placeholder="Your Phone Number"
                value={userData.phoneNumber}
              />
            </div>

            <button className="button" type="submit">
              Send OTP
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpVerification}>
            <div className="otpCode_div">
              <input
                name="otpCode"
                onChange={handleChange}
                placeholder="Enter OTP Code"
                value={userData.otpCode}
              />
            </div>

            <button className="button" type="submit">
              Verify OTP
            </button>
          </form>
        )}
      </div>
    </StyledComponent>
  );
}

const StyledComponent = styled.div`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    text-size-adjust: none;
  }

  .body {
    background-color: #f5f5f5;
  }

  .Login_page {
    padding: 50px;
    justify-content: center;
    text-align: left;
    margin-left: 150px;
    margin-top: 100px;
  }

  .welcome_div {
    display: block;
    font-size: 1.5em;
    margin-block-start: 0.83em;
    margin-block-end: 0.83em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
  }

  .username_div {
    padding: 5px;
    margin: 10px 0;
    border-radius: 10px;
    width: 100%;
  }

  .password_div {
    padding: 5px;
    margin: 10px 0;
    border-radius: 10px;
    width: 100%;
  }

  .phoneNumber_div {
    padding: 5px;
    margin: 10px 0;
    border-radius: 10px;
    width: 100%;
  }

  .employeeid_div {
    padding: 5px;
    margin: 10px 0;
    border-radius: 10px;
    width: 100%;
  }

  .button {
    padding: 3px;
    margin: 10px 0;
    border: none;
    background-color: #3f51b5;
    color: #fff;
    font-weight: 600;
    border-radius: 5px;
    width: 5%;
  }

  .img_Login {
    float: right;
    position: absolute;
    right: 30px;
    top: 20px;
    width: 50%;
    height: 90%;
  }
`;

export default Login;
