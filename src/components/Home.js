import React from 'react';
import Sidebar from './Sidebar';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

function Home() {
  // Retrieve the user role from localStorage
  const userRole = useSelector((state) => state.user);

  return (
    <StyledComponent>
    <div className="container">
      <Sidebar />
      <div className="content">
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1 }}>
            <h1>Welcome to Technical Support website</h1>
            {userRole === 'manager' ? (
              <p className='text'>
                Here you can submit constraints, publish schedule, and manage employees
              </p>
            ) : (
              <p className='text'>Here you can submit constraints and look at the shift board</p>
            )}
          </div>
          <div>
          </div>
        </div>
      </div>
    </div>
    </StyledComponent>
  );
}
const StyledComponent = styled.div`
background-image: url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80);
background-size: cover;
background-position: center;
height: 100vh;
position: relative;
justify-content: center;
align-items: center;
font-family: "Mona Sans","Mona Sans Header Fallback",-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";

.content{
  position: cover;
  color: white;
  padding: 10px;
  font-family: "Mona Sans","Mona Sans Header Fallback",-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
}

@media (max-width: 768px) {
    /* Adjust the position and width for smaller screens */
    position: relative;
    top: 0;
    left: 0;
    transform: none;
    width: 100%;
    max-width: 100%;
  }
`;


export default Home;
