import React from "react";
import styled from "styled-components";
import { MdMenu, MdNotifications } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useSidebarContext } from "../context/sidebar_context";
import { useUserContext } from "../context/user_context";
import logoElice from "../assets/images/logo_elice.png"; 
import SearchBar from './SearchBar';

const Navbar = () => {
  const { openSidebar } = useSidebarContext();
  const { user, logoutUser } = useUserContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <NavbarWrapper className="bg-white flex">
      <div className="container w-100">
        <div className="brand-and-toggler flex flex-between w-100">
          <Link to="/" className="navbar-brand">
            <img src={logoElice} alt="Elice Platform Logo" />
          </Link>

          <div className="navbar-search">
            <SearchBar />
          </div>

          <div className="navbar-btns flex">
            {user ? (
              <div className="user-info">
                <Link to="/my-courses" className="my-courses-link">My Courses</Link>
                <span className="user-name">Hello, {user.name}</span>
                <button type="button" className="btn logout-btn" onClick={handleLogout}>
                  Log Out
                </button>
              </div>
            ) : (
              <div className="auth-btns">
                <Link to="/login" className="btn login-btn">Log In</Link>
                <Link to="/register" className="btn signup-btn">Sign Up</Link>
              </div>
            )}
            
            <button type="button" className="notification-btn">
              <MdNotifications size={30} />
            </button>

            <button
              type="button"
              className="sidebar-open-btn"
              onClick={openSidebar}
            >
              <MdMenu size={30} />
            </button>
          </div>
        </div>
      </div>
    </NavbarWrapper>
  );
};

const NavbarWrapper = styled.nav`
  position: sticky;
  top: 0;
  left: 0;
  z-index: 999;
  height: 75px;
  box-shadow: rgba(50, 50, 93, 0.15) 0px 16px 12px -2px,
    rgba(0, 0, 0, 0.2) 0px 3px 7px -3px;

  .navbar-brand {
    width: 100px;
    margin-right: 2rem;
  }
  
  .navbar-search {
    flex: 1;
    display: flex;
    justify-content: center;
    padding: 0 2rem;
  }

  .notification-btn {
    position: relative;
    color: var(--clr-dark);
    &:hover {
      opacity: 0.8;
    }
  }

  .navbar-btns {
    display: flex;
    align-items: center;
    gap: 1.2rem;
  }

  .sidebar-open-btn {
    transition: all 300ms ease-in-out;
    &:hover {
      opacity: 0.7;
    }
  }

  .user-info, .auth-btns {
    display: flex;
    align-items: center;
    gap: 1.2rem;
  }

  .user-name {
    font-weight: 600;
    white-space: nowrap;
  }

  .my-courses-link {
    font-weight: 600;
    color: var(--clr-dark);
    text-decoration: none;
    transition: color 0.3s ease;
    white-space: nowrap;

    &:hover {
      color: var(--clr-purple);
    }
  }

  .btn {
    font-weight: 600;
    padding: 0.6rem 1.5rem;
    border-radius: 3px;
    
    &.login-btn, &.logout-btn {
      border: 1px solid var(--clr-dark);
      color: var(--clr-dark);
      &:hover {
        background: var(--clr-dark);
        color: var(--clr-white);
      }
    }

    &.signup-btn {
      background: var(--clr-dark);
      color: var(--clr-white);
      border: 1px solid var(--clr-dark);
      &:hover {
        background: transparent;
        color: var(--clr-dark);
      }
    }
  }
`;

export default Navbar;