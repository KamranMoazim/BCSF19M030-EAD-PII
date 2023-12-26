import React, { ChangeEvent, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import { FaAngleDoubleLeft, FaAngleLeft, FaAngleRight, FaAngleDoubleRight } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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

    const StudentService = StudentServiceCreator();

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
        const {source, numberOfPages, numberOfRows} = await StudentService.getAllWithQuery({
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
        const shouldDelete = window.confirm(`Are you sure you want to delete the item with ID ${id}?`);

        if (shouldDelete) {
            // User clicked "OK," proceed with delete logic
            console.log(`Deleting item with ID: ${id}`);
            // Add your delete logic here
            StudentService.new_delete(id)
            .then((response) => {
                console.log(response);
                fetchData(
                    orderBy,
                    direction,
                    currentPage,
                    pageSize
                );
                toast.success('Student deleted successfully!');
            })
        } else {
            // User clicked "Cancel," do nothing or handle accordingly
            console.log(`Cancelled delete for ID: ${id}`);
            toast.error('Failed to Delete Student. Please try again.');
        }

    };





    return showSingleStudentView ? 
    (<>
        <button className='btn btn-primary' onClick={() => {
            setShowSingleStudentView(false)}
            }>Show All</button>
        <SingleStudentView student={singleStudentView } />
    </>)
    :
    (
        <div className="container mt-4">

            {/* Page Size Dropdown */}
            <div className="container mb-3">
                <label htmlFor="pageSize" className="form-label">Page Size:</label>
                <div className="col-md-4">
                    <select id="pageSize" className="form-select ml-2" value={pageSize} onChange={(e) => handlePageSizeChange(e)}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                    </select>
                </div>
            </div>



            <NavLink to="/students/0" className="btn btn-primary" >Add New Student</NavLink>

            {/* Pagination Controls */}
            
            <div className="mt-3">
                <button className="btn btn-light me-2" onClick={handleFirstPage} disabled={currentPage === 1}>
                    <FaAngleDoubleLeft /> 
                </button>
                <button className="btn btn-light me-2" onClick={handlePreviousPage} disabled={currentPage === 1}>
                    <FaAngleLeft /> 
                </button>
                <span className="badge bg-secondary me-2">
                    Page {currentPage} of {totalPages}
                </span>
                <button className="btn btn-light me-2" onClick={handleNextPage} disabled={currentPage === totalPages}>
                    <FaAngleRight />
                </button>
                <button className="btn btn-light" onClick={handleLastPage} disabled={currentPage === totalPages}>
                    <FaAngleDoubleRight />
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
                                <button className="btn btn-outline-info me-2" onClick={() => handleView(item.id)}>
                                    View
                                </button>
                                <button className="btn btn-outline-warning me-2" onClick={() => handleEdit(item.id)}>
                                    Edit
                                </button>
                                <button className="btn btn-outline-danger" onClick={() => handleDelete(item.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ToastContainer closeButton />
        </div>
    );
};

export default StudentTable;