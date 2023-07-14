import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const StyledLogoutButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-left: 10px;
  cursor: pointer;
  margin-right: 10px;
`;

function Sidebar({ employee }) {
  const [showMenu, setShowMenu] = useState(false);
  const [role, setUserRole] = useState('');
  const navigate = useNavigate();

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    // Fetch the user role from local storage or API
    const storedUserRole = localStorage.getItem('role');
    setUserRole(storedUserRole);
  }, []);

  const handleLogout = () => {
    // Perform logout actions, e.g., clear user data, remove tokens, etc.
    localStorage.removeItem('role');
    navigate('/login'); // Redirect to the login page after logout
  };

  return (
    <StyledSidebar>
      <StyledHamburgerMenu onClick={handleMenuToggle}>
        <StyledHamburgerLine className={showMenu ? 'open' : ''} />
        <StyledHamburgerLine className={showMenu ? 'open' : ''} />
        <StyledHamburgerLine className={showMenu ? 'open' : ''} />
      </StyledHamburgerMenu>
      <StyledSidebarMenu className={showMenu ? 'open' : ''}>
        <ul>
          <li>
            <Link to="/Shifts" className="sidebar-link">
              Shifts
            </Link>
          </li>
          <li>
            <Link to="/Employees" className="sidebar-link">
              Employees
            </Link>
          </li>
          <li>
            <Link to="/Constraints" className="sidebar-link">
              Constraints
            </Link>
          </li>
          {role === 'manager' && (
            <li>
              <Link to="/RegisterEmployee" className="sidebar-link">
                Register Employee
              </Link>
            </li>
          )}
        </ul>
      </StyledSidebarMenu>
      <StyledLogoutButton onClick={handleLogout}>Logout</StyledLogoutButton>
    </StyledSidebar>
  );
}

const StyledSidebar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 10px;
  background-color: #333;
  color: #fff;
`;

const StyledHamburgerMenu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 60px;
  cursor: pointer;

  @media (min-width: 768px) {
    display: none;
  }
`;

const StyledHamburgerLine = styled.div`
  width: 30px;
  height: 3px;
  margin: 4px 0;
  background-color: #fff;
  transition: all 0.3s;

  &.open:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }

  &.open:nth-child(2) {
    opacity: 0;
  }

  &.open:nth-child(3) {
    transform: rotate(-45deg) translate(5px, -5px);
  }
`;

const StyledSidebarMenu = styled.div`
  position: fixed;
  top: 60px;
  left: -250px;
  height: calc(100vh - 60px);
  width: 250px;
  background-color: #333;
  color: #fff;
  transition: all 0.3s;

  &.open {
    left: 0;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      padding: 10px;
      border-bottom: 1px solid #666;

      &:hover {
        background-color: #444;
      }
    }
  }

  .sidebar-link {
    color: white;
    text-decoration: none;
  }

  @media (min-width: 768px) {
    position: static;
    height: auto;
    width: auto;
    left: 0;

    ul {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;

      li {
        padding: 0 20px;
        border-bottom: none;

        &:hover {
          background-color: transparent;
        }
      }
    }
  }
`;

export default Sidebar;
