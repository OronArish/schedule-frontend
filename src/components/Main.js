import React from 'react';
import styled from 'styled-components';

function Main() {
  return (
    <StyledComponent>
      <img className='img_main' src='images/schedule.png' alt='Main' />
      <div className='main-content'>
        <div className='greeting'>Hello User!</div>
        <div className='links'>
          <a href='/Login' className='link login-link'>
            Login
          </a>
          {/* <a href='/Register' className='link register-link'>
            Register
          </a> */}
        </div>
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
    background-color: #f2f2f2;
    font-family: Arial, sans-serif;
  }

  .img_main {
    width: 10%;
    display: block;
    margin-left: auto;
    margin-right: auto;
    padding-top: 30px;
  }

  .main-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding-top: 50px;
  }

  .greeting {
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: bold;
  }

  .links {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
}

.link {
  padding: 10px 20px;
  margin: 0 10px; /* Added a 10px margin between the links */
  font-weight: bold;
  text-transform: uppercase;
  color: #333;
  text-decoration: none;
  border-radius: 4px;
  border: 1.5px solid #333;
  transition: all 0.3s ease-in-out;
}

  .link:hover {
    background-color: #333;
    color: #fff;
  }

  .login-link {
    justify-content: center;
    display: inline-block;
    vertical-align: middle;
  }

  .register-link {
    justify-content: center;
    vertical-align: middle;
  }
  padding-top: 50px;

`;

export default Main;
