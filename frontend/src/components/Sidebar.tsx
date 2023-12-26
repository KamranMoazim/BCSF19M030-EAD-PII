import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css'; // Import a separate CSS file for styling
import {
    FaEye, FaEyeSlash, FaUser, FaShieldAlt, FaSignOutAlt,
    FaHome, FaUserGraduate, FaChalkboardTeacher, FaBuilding, FaGraduationCap,
    FaCity
} from 'react-icons/fa';
import useAuthStore from '../state-management/auth/authStore';
import { USER_ROLES } from '../constants/constants';



const Sidebar = () => {
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    const { user, logout } = useAuthStore();

    return (

        <div>
            {/* New horizontal navbar */}

            <nav className="navbar navbar-expand-lg navbar-light bg-dark rounded">
                <div className="container-fluid">
                    <span className="navbar-brand mb-0 h1 ms-auto text-white">
                        <FaUser className="me-2" />
                        {user?.user.email}
                        {user?.user.role && (
                            <>
                                <span className="mx-2">|</span>
                                <FaShieldAlt className="me-2" />
                                Role - {user?.user.role}
                            </>
                        )}
                    </span>
                    <button
                        className="btn btn-light"
                        onClick={() => logout()}
                    >
                        <FaSignOutAlt className="me-2" />
                        Logout
                    </button>
                </div>
            </nav>
            <nav className={`sidebar ${isSidebarVisible ? 'visible' : 'hidden'}`}>
                <button onClick={toggleSidebar} className="toggle-btn btn btn-primary ms-3">
                    {isSidebarVisible ? <FaEyeSlash /> : <FaEye />} {isSidebarVisible ? 'Hide Sidebar' : 'Show Sidebar'}
                </button>
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <NavLink to="/" className="col-md-12 btn btn-warning">
                            <FaShieldAlt className="me-2" />
                            {user?.user.role}
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/" className="nav-link">
                            <FaHome className="me-2" />
                            DASHBOARD
                        </NavLink>
                    </li>
                    {(user?.user.role === USER_ROLES.ADMIN) && (<>
                    <li className="nav-item">
                        <NavLink to="/staff" className="nav-link">
                            <FaChalkboardTeacher className="me-2" />
                            STAFF
                        </NavLink>
                    </li>
                    </>)}
                    {(user?.user.role === USER_ROLES.SUB_ADMIN || user?.user.role === USER_ROLES.ADMIN) && (<>
                    <li className="nav-item">
                        <NavLink to="/students" className="nav-link">
                            <FaUserGraduate className="me-2" />
                            STUDENTS
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/cities" className="nav-link">
                            <FaCity className="me-2" />
                            CITIES
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/degrees" className="nav-link">
                            <FaGraduationCap className="me-2" />
                            DEGREES
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/departments" className="nav-link">
                            <FaBuilding className="me-2" />
                            DEPARTMENT
                        </NavLink>
                    </li>
                    </>)}
                </ul>
            </nav>

        </div>
    );
};

export default Sidebar;
