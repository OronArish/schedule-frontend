import React from 'react';
import Sidebar from './Sidebar';

function Home() {
  // Retrieve the user role from localStorage
  const userRole = localStorage.getItem('userRole');

  return (
    <div className="container">
      <Sidebar />
      <div className="content">
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1 }}>
            <h1>Welcome to Technical Support website</h1>
            {userRole === 'manager' ? (
              <p>
                Here you can submit constraints, publish schedule, and manage employees
              </p>
            ) : (
              <p>Here you can submit constraints and look at the shift board</p>
            )}
          </div>
          <div>
            <img src='images/homePage.jpg' alt="HomePage Photo" style={{ width: '100vh', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)' }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
