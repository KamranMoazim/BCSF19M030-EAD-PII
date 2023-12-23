import React from 'react';
import DropdownInput from '../components/DropdownInput';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';

const AddUpdateStudentForm = () => {

    const params = useParams()
    const [searchParams, setSearchParams] = useSearchParams()
    console.log(searchParams.get("OrderBy"))
    console.log(searchParams)

    const lc = useLocation()
    console.log(lc)


    return (
        <div>
            <h1 className="text-center mt-4 mb-5">Add Student Form</h1>

            <div className="container">
                <div className="row">
                    {/* Row 1 */}
                    <div className="col-md-4 mb-3">
                        <div className="form-group">
                            <label htmlFor="fullName">Full Name:</label>
                            <input type="text" className="form-control" id="fullName" placeholder="Enter full name" />
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <div className="form-group">
                            <label htmlFor="rollNo">Roll No:</label>
                            <input type="text" className="form-control" id="rollNo" placeholder="Enter roll number" />
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <div className="form-group">
                            <label htmlFor="email">Email Address:</label>
                            <input type="email" className="form-control" id="email" placeholder="Enter email address" />
                        </div>
                    </div>

                    {/* Row 2 */}
                    <div className="col-md-4 mb-3">
                        <div className="form-group">
                            <label htmlFor="gender">Gender:</label>
                            <select className="form-control" id="gender">
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <div className="form-group">
                            <label htmlFor="dob">Date of Birth:</label>
                            <input type="date" className="form-control" id="dob" />
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <div className="form-group">
                            <label htmlFor="city">City:</label>
                            <select className="form-control" id="city">
                                <option value="city1">City 1</option>
                                <option value="city2">City 2</option>
                                <option value="city3">City 3</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <div className="form-group">
                            <label htmlFor="interests">Interests:</label>
                            <DropdownInput />
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <div className="form-group">
                            <label htmlFor="department">Department:</label>
                            <select className="form-control" id="department">
                                <option value="dept1">Department 1</option>
                                <option value="dept2">Department 2</option>
                                <option value="dept3">Department 3</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <div className="form-group">
                            <label htmlFor="degreeTitle">Degree Title:</label>
                            <select className="form-control" id="degreeTitle">
                                <option value="degree1">Degree 1</option>
                                <option value="degree2">Degree 2</option>
                                <option value="degree3">Degree 3</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <div className="form-group">
                            <label htmlFor="subject">Subject:</label>
                            <input type="text" className="form-control" id="subject" placeholder="Enter subject" />
                        </div>
                    </div>

                    {/* Row 3 */}
                    <div className="col-md-4 mb-3">
                        <div className="form-group">
                            <label htmlFor="startDate">Start Date:</label>
                            <input type="date" className="form-control" id="startDate" />
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <div className="form-group">
                            <label htmlFor="endDate">End Date:</label>
                            <input type="date" className="form-control" id="endDate" />
                        </div>
                    </div>
                </div>

                {/* Add a button or any other UI elements as needed */}
            </div>
        </div>
    );
};

export default AddUpdateStudentForm;
