// import React, { useState } from 'react';
// import { Link, NavLink } from 'react-router-dom';

// const Sidebar = () => {
//     const [isSidebarVisible, setIsSidebarVisible] = useState(true);

//     const toggleSidebar = () => {
//         setIsSidebarVisible(!isSidebarVisible);
//     };

//     return (
//         <nav className={`${isSidebarVisible ? '' : 'd-none '} d-md-block bg-light sidebar`}>
//             <div className="sidebar-sticky">
//                 {/* <button onClick={toggleSidebar} className="btn btn-primary btn-sm mb-2">
//                     {isSidebarVisible ? 'Hide Sidebar' : 'Show Sidebar'}
//                 </button> */}
//                 {isSidebarVisible && (
//                     <ul className="nav flex-row">
//                         <li className="nav-item">
//                             <NavLink to="/" className="nav-link active">Dashboard</NavLink>
//                         </li>
//                         <li className="nav-item">
//                             <NavLink to="/students" className="nav-link active">Students</NavLink>
//                         </li>
//                         <li className="nav-item">
//                             <NavLink to="/staff" className="nav-link">Staff</NavLink>
//                         </li>
//                         <li className="nav-item">
//                             <NavLink to="/cities" className="nav-link">Cities</NavLink>
//                         </li>
//                         <li className="nav-item">
//                             <NavLink to="/degrees" className="nav-link">Degree</NavLink>
//                         </li>
//                     </ul>
//                 )}
//             </div>
//         </nav>
//     );
// };

// export default Sidebar;


import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css'; // Import a separate CSS file for styling

const Sidebar = () => {
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    return (
        <nav className={`sidebar ${isSidebarVisible ? 'visible' : 'hidden'}`}>
            <button onClick={toggleSidebar} className="toggle-btn">
                {isSidebarVisible ? 'Hide Sidebar' : 'Show Sidebar'}
            </button>
            <ul className="nav flex-column">
                <li className="nav-item">
                    <NavLink to="/" className="nav-link" >Dashboard</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/students" className="nav-link" >Students</NavLink>
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
            </ul>
        </nav>
    );
};

export default Sidebar;
