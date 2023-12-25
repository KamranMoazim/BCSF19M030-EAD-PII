import React, { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';

import {Student} from "../types/Student"
import SingleStudentView from './SingleStudentView';
import StudentServiceCreator from '../services/students-service';




const initialData:Student[] = [
    { 
        id: 1, 
        fullName: 'John Doe', 
        rollNumber: 'A123', 
        email: "jon@email.com",
        gender: true,
        dateOfBirth: "dateOfBirth",
        city: "city",
        interest: {
            createdBy: "createdBy",
            createdOn: new Date(),
            modifiedBy: "modifiedBy",
            modifiedOn: new Date(),
            isDeleted: false,
            id: 1,
            name: "interest"
        },
        department: "department",
        degreeTitle: "degreeTitle",
        subject: "subject",
        startDate: "startDate",
        endDate: "endDate",
        isDeleted: false,
        createdBy: "createdBy",
        createdOn: new Date(),
        modifiedBy: "modifiedBy",
        modifiedOn: new Date()
    },
];




const StudentTable = () => {

    const [data, setData] = useState(initialData);

    const [orderBy, setOrderBy] = useState("id");
    const [totalPages, setTotalPages] = useState(1);
    const [direction, setDirection] = useState(true);
    const [pageSize, setPageSize] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);

    const [singleStudentView, setSingleStudentView] = useState({} as Student);
    const [showSingleStudentView, setShowSingleStudentView] = useState(false);


    const naviagtion = useNavigate()



    // Pagination
    // const totalPages = Math.ceil(data.length / pageSize);



    useEffect(() => {
        fetchData(
            orderBy,
            direction,
            currentPage,
            pageSize
        );
    }, []);


    

    const fetchData = async (OrderBy:string, OrderDirection:boolean, PageNumber:number, PageSize:number) => {
        const {source, numberOfPages, numberOfRows} = await StudentServiceCreator().getAllWithQuery({
            OrderBy: OrderBy,
            OrderDirection: OrderDirection===false?1:0,
            PageNumber: PageNumber,
            PageSize: PageSize,
        });
        setData(source);
        setTotalPages(numberOfPages);
        setDirection(!OrderDirection);
        console.log(direction)
    };



    const getSortIcon = (key:string) => {
        if (orderBy === key) {
            // return direction === true ? '↑' : '↓';
            return direction === true ? <IoIosArrowUp /> : <IoIosArrowDown />;;
        }
        return '';
    };

    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'fullName', label: 'Name' },
        { key: 'rollNumber', label: 'Roll No' },
        { key: 'department', label: 'Department' },
        { key: 'degreeTitle', label: 'Degree' },
        { key: 'dateOfBirth', label: 'Date of Birth' },
        { key: 'city', label: 'City' },
        { key: 'interest', label: 'Interest' },
    ];


    const requestSort = (key:string) => {
        console.log(`Request Sort: ${key} ${direction}`);
        setOrderBy(key);
        fetchData(
            key,
            direction,
            currentPage,
            pageSize
        );
    };





    const handlePageSizeChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
        setPageSize(parseInt(e.target.value, 10));
        setCurrentPage(1);

        fetchData(
            orderBy,
            direction,
            1,
            parseInt(e.target.value, 10)
        );
    };

    const handlePageChange = (newPage:number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }

        fetchData(
            orderBy,
            direction,
            newPage,
            pageSize
        );
    };

    const handleFirstPage = () => {
        setCurrentPage(1);

        fetchData(
            orderBy,
            direction,
            1,
            pageSize
        );
    };

    const handlePreviousPage = () => {
        handlePageChange(currentPage - 1);

        fetchData(
            orderBy,
            direction,
            currentPage - 1,
            pageSize
        );
    };

    const handleNextPage = () => {
        handlePageChange(currentPage + 1);

        fetchData(
            orderBy,
            direction,
            currentPage + 1,
            pageSize
        );
    };

    const handleLastPage = () => {
        setCurrentPage(totalPages);

        fetchData(
            orderBy,
            direction,
            totalPages,
            pageSize
        );
    };










    const handleView = (id:number) => {
        console.log(`View clicked for ID: ${id}`);
        setShowSingleStudentView(true);
        setSingleStudentView(data.find((item) => item.id === id) as Student);
    };

    const handleEdit = (id:number) => {
        console.log(data[id])
        console.log(`Edit clicked for ID: ${id}`);
        naviagtion(`/students/${id}`)
    };

    const handleDelete = (id:number) => {
        console.log(`Delete clicked for ID: ${id}`);

    };





    return showSingleStudentView ? 
    (<>
        <button className='btn btn-primary' onClick={() => setShowSingleStudentView(false)}>Show All</button>
        <SingleStudentView student={singleStudentView } />
    </>)
    :
    (
        <div className="container mt-4">

            {/* Page Size Dropdown */}
            <div className="mb-3">
                <label htmlFor="pageSize">Page Size:</label>
                <select id="pageSize" className="ml-2" value={pageSize} onChange={(e) => handlePageSizeChange(e)}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                </select>
            </div>

            {/* Pagination Controls */}
            
            <div className="mt-3">
                <button className="btn btn-light mr-2" onClick={handleFirstPage} disabled={currentPage === 1}>
                    &lt;&lt; 
                </button>
                <button className="btn btn-light mr-2" onClick={handlePreviousPage} disabled={currentPage === 1}>
                    &lt; 
                </button>
                <span className="mr-2">
                    Page {currentPage} of {totalPages}
                </span>
                <button className="btn btn-light mr-2" onClick={handleNextPage} disabled={currentPage === totalPages}>
                    &gt;
                </button>
                <button className="btn btn-light" onClick={handleLastPage} disabled={currentPage === totalPages}>
                    &gt;&gt;
                </button>
                
            </div>

            <table className="table">
                <thead>

                    <tr>
                        {columns.map((column) => (
                            <th key={column.key} onClick={() => requestSort(column.key)}>
                            {column.label} {getSortIcon(column.key)}
                            </th>
                        ))}
                        <th>Actions</th>
                    </tr>

                </thead>
                <tbody>
                    {data.map((item) =>  (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.fullName}</td>
                            <td>{item.rollNumber}</td>
                            <td>{item.department}</td>
                            <td>{item.degreeTitle}</td>
                            <td>{new Date(item.dateOfBirth).toDateString().split('T')[0]}</td>
                            <td>{item.city}</td>
                            <td>{item.interest.name}</td>
                            <td>
                                <button className="btn btn-info me-2" onClick={() => handleView(item.id)}>
                                    View
                                </button>
                                <button className="btn btn-warning me-2" onClick={() => handleEdit(item.id)}>
                                    Edit
                                </button>
                                <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentTable;