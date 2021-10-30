import React from 'react'
import imgLogo from '../images/virtualsdesign-logo.png';
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className="sidebar">
        <div className="sidebar-brand">
          <h1> 
              <img src={imgLogo} alt="logo" />
          </h1>
        </div>
        
        <div className="sidebar-menu">
          <ul>
            <li>
              <NavLink to="/dashboard/team" activeClassName="active">
                <span className="fas fa-users" ></span>
                <span>Team</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/portfolio" activeClassName="active">
                <span className="fas fa-stream"></span>
              <span>Portfolio</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/blog" activeClassName="active">
                <span className="fas fa-clone"></span>
                <span>Blog</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/career" activeClassName="active">
                <span className="fas fa-boxes"></span>
                <span>Career</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/services" activeClassName="active">
                <span className="fas fa-tasks"></span>
                <span>Services</span>
              </NavLink>
            </li>
          </ul>

        </div>
    </div>
    )
}

export default Sidebar
