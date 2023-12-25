import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css'; // Import a separate CSS file for styling
import { FaEye, FaEyeSlash } from 'react-icons/fa';


const Sidebar = () => {
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    return (
        <nav className={`sidebar ${isSidebarVisible ? 'visible' : 'hidden'}`}>
            {/* <button onClick={toggleSidebar} className="toggle-btn">
                {isSidebarVisible ? 'Hide Sidebar' : 'Show Sidebar'}
            </button> */}
            <button onClick={toggleSidebar} className="toggle-btn btn btn-primary ms-3">
                {isSidebarVisible ? <FaEyeSlash /> : <FaEye />} {isSidebarVisible ? 'Hide Sidebar' : 'Show Sidebar'}
            </button>
            <ul className="nav flex-column">
                <li className="nav-item">
                    <NavLink to="/" className=" btn btn-warning" >Email@a.com <br /> ADMIN</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/" className="nav-link" >Dashboard</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/students" className="nav-link" >Students</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/students/0" className="nav-link" >Add New Student</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/staff" className="nav-link" >Staff</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/cities" className="nav-link" >Cities</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/degrees" className="nav-link" >Degree</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/departments" className="nav-link" >Departments</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/login" className="nav-link btn btn-warning" >Logout</NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Sidebar;
