// import React, { useState } from 'react';

// const StudentTable = () => {
//     const initialData = [
//         { id: 1, name: 'John Doe', rollNo: 'A123', department: 'Math', degree: 'B.Sc', dob: '1990-01-01', city: 'City1', interest: 'Mathematics' },
//         { id: 2, name: 'Jane Smith', rollNo: 'B456', department: 'Physics', degree: 'M.Sc', dob: '1995-05-15', city: 'City2', interest: 'Physics' },
//         // Add more data as needed
//     ];

//     const [data, setData] = useState(initialData);
//     const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
//     const [pageSize, setPageSize] = useState(5); // Initial page size
//     const [currentPage, setCurrentPage] = useState(1);


//     const requestSort = (key) => {
//         let direction = 'asc';
//         if (sortConfig.key === key && sortConfig.direction === 'asc') {
//             direction = 'desc';
//         }
//         setSortConfig({ key, direction });
//     };

//     const getClassNamesFor = (name) => {
//         if (!sortConfig) {
//             return;
//         }
//         return sortConfig.key === name ? `sorted-${sortConfig.direction}` : undefined;
//     };

//     const sortedData = [...data].sort((a, b) => {
//         if (sortConfig.direction === 'asc') {
//             return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
//         }
//         if (sortConfig.direction === 'desc') {
//             return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
//         }
//         return 0;
//     });


//     // Pagination
//     const totalPages = Math.ceil(sortedData.length / pageSize);
//     const startIndex = (currentPage - 1) * pageSize;
//     const endIndex = startIndex + pageSize;
//     const currentData = sortedData.slice(startIndex, endIndex);

//     const handleView = (id) => {
//         console.log(`View clicked for ID: ${id}`);
//     };

//     const handleEdit = (id) => {
//         console.log(`Edit clicked for ID: ${id}`);
//     };

//     const handleDelete = (id) => {
//         console.log(`Delete clicked for ID: ${id}`);
//     };

//     const handlePageSizeChange = (e) => {
//         setPageSize(parseInt(e.target.value, 10));
//         setCurrentPage(1); // Reset to the first page when page size changes
//     };

//     const handlePageChange = (newPage) => {
//         if (newPage >= 1 && newPage <= totalPages) {
//             setCurrentPage(newPage);
//         }
//     };

//     const handleFirstPage = () => {
//         setCurrentPage(1);
//     };

//     const handlePreviousPage = () => {
//         handlePageChange(currentPage - 1);
//     };

//     const handleNextPage = () => {
//         handlePageChange(currentPage + 1);
//     };

//     const handleLastPage = () => {
//         setCurrentPage(totalPages);
//     };

//     return (
//         <div className="container mt-4">

//             {/* Page Size Dropdown */}
//             <div className="mb-3">
//                 <label htmlFor="pageSize">Page Size:</label>
//                 <select id="pageSize" className="ml-2" value={pageSize} onChange={handlePageSizeChange}>
//                     <option value="5">5</option>
//                     <option value="10">10</option>
//                     <option value="15">15</option>
//                 </select>
//             </div>

//             {/* Pagination Controls */}
//             <div className="mt-3">
//                 <button className="btn btn-light mr-2" onClick={handleFirstPage} disabled={currentPage === 1}>
//                     &lt;&lt; 
//                 </button>
//                 <button className="btn btn-light mr-2" onClick={handlePreviousPage} disabled={currentPage === 1}>
//                     &lt; 
//                 </button>
//                 <span className="mr-2">
//                     Page {currentPage} of {totalPages}
//                 </span>
//                 <button className="btn btn-light mr-2" onClick={handleNextPage} disabled={currentPage === totalPages}>
//                     &gt;
//                 </button>
//                 <button className="btn btn-light" onClick={handleLastPage} disabled={currentPage === totalPages}>
//                     &gt;&gt;
//                 </button>
//             </div>

//             <table className="table">
//                 <thead>
//                     <tr>
//                         <th onClick={() => requestSort('id')} className={getClassNamesFor('id')}>
//                             ID {sortConfig.key === 'id' && <span className={`arrow-${sortConfig.direction}`}>&#9660;</span>}
//                         </th>
//                         <th onClick={() => requestSort('name')} className={getClassNamesFor('name')}>
//                             Name {sortConfig.key === 'name' && <span className={`arrow-${sortConfig.direction}`}>&#9660;</span>}
//                         </th>
//                         <th onClick={() => requestSort('rollNo')} className={getClassNamesFor('rollNo')}>
//                             Roll No {sortConfig.key === 'rollNo' && <span className={`arrow-${sortConfig.direction}`}>&#9660;</span>}
//                         </th>
//                         <th onClick={() => requestSort('department')} className={getClassNamesFor('department')}>
//                             Department {sortConfig.key === 'department' && <span className={`arrow-${sortConfig.direction}`}>&#9660;</span>}
//                         </th>
//                         <th onClick={() => requestSort('degree')} className={getClassNamesFor('degree')}>
//                             Degree {sortConfig.key === 'degree' && <span className={`arrow-${sortConfig.direction}`}>&#9660;</span>}
//                         </th>
//                         <th onClick={() => requestSort('dob')} className={getClassNamesFor('dob')}>
//                             Date of Birth {sortConfig.key === 'dob' && <span className={`arrow-${sortConfig.direction}`}>&#9660;</span>}
//                         </th>
//                         <th onClick={() => requestSort('city')} className={getClassNamesFor('city')}>
//                             City {sortConfig.key === 'city' && <span className={`arrow-${sortConfig.direction}`}>&#9660;</span>}
//                         </th>
//                         <th onClick={() => requestSort('interest')} className={getClassNamesFor('interest')}>
//                             Interest {sortConfig.key === 'interest' && <span className={`arrow-${sortConfig.direction}`}>&#9660;</span>}
//                         </th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {sortedData.map((item) => (
//                         <tr key={item.id}>
//                             <td>{item.id}</td>
//                             <td>{item.name}</td>
//                             <td>{item.rollNo}</td>
//                             <td>{item.department}</td>
//                             <td>{item.degree}</td>
//                             <td>{item.dob}</td>
//                             <td>{item.city}</td>
//                             <td>{item.interest}</td>
//                             <td>
//                                 <button className="btn btn-info" onClick={() => handleView(item.id)}>
//                                     View
//                                 </button>
//                                 <button className="btn btn-warning" onClick={() => handleEdit(item.id)}>
//                                     Edit
//                                 </button>
//                                 <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>
//                                     Delete
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default StudentTable;



import React from 'react'
import { Link } from 'react-router-dom'

const StudentTable = () => {
    return (
        <>
            <Link to="/students/1">
                Single Student View
            </Link>
        </>
    )
}

export default StudentTable