import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Student } from '../types/Student';
import { Interest } from '../types/Interest';
import MyDropdownInput from '../components/DropdownInput';

import StudentServiceCreator from '../services/students-service';
import InterestServiceCreator from '../services/interest-service';
import UtilsServiceCreator from '../services/utils-service';


const AddUpdateStudentForm = () => {

    const StudentService = StudentServiceCreator()
    const InterestService = InterestServiceCreator()
    const UtilsService = UtilsServiceCreator()






    const navigation = useNavigate()
    const params = useParams()
    // console.log(params.id)
    // const [searchParams, setSearchParams] = useSearchParams()
    // console.log(searchParams.get("OrderBy"))
    // console.log(searchParams)

    // const lc = useLocation()
    // console.log(lc)

    const [interestsList, setInterestsList] = useState<Interest[]>([
        {
            createdBy: "createdBy",
            createdOn: new Date(),
            id: 1,
            isDeleted: false,
            modifiedBy: "modifiedBy",
            modifiedOn: new Date(),
            name: "interest1"
        } as Interest,
    ])

    const [student, setStudent] = useState({
        city: "",
        createdBy: "",
        createdOn: new Date(),
        dateOfBirth: "",
        degreeTitle: "",
        department: "",
        email: "",
        endDate: "",
        fullName: "",
        gender: true,
        id: 0,
        interest: {
            createdBy: "",
            createdOn: new Date(),
            id: 0,
            isDeleted: false,
            modifiedBy: "",
            modifiedOn: new Date(),
            name: ""
        },
        isDeleted: false,
        modifiedBy: "",
        modifiedOn: new Date(),
        rollNumber: "",
        startDate: "",
        subject: ""
    } as Student)

    const [cities, setCities] = useState<string[]>([])
    const [departments, setDepartments] = useState<string[]>([])
    const [degrees, setDegrees] = useState<string[]>([])




    useEffect(() => {

        console.log("first render")

        UtilsService.getAllCities()
            .then((res) => {
                setCities(res)
            }).catch((err) => {
                console.log(err)
            })

        UtilsService.getAllDegrees()
            .then((res) => {
                setDegrees(res)
            }).catch((err) => {
                console.log(err)
            })

        UtilsService.getAllDepartments()
            .then((res) => {
                setDepartments(res)
            }).catch((err) => {
                console.log(err)
            })

        const {request} = InterestService.getAll();
            
        request
            .then((res) => {
                console.log(res)
                setInterestsList(res)
            })
            .catch((err) => {
                console.log(err)
            })

        if (params&& params?.id == "0") { // means add new student
    
            setStudent({
                city: "",
                createdBy: "",
                createdOn: new Date(),
                dateOfBirth: "",
                degreeTitle: "",
                department: "",
                email: "",
                endDate: "",
                fullName: "",
                gender: true,
                id: 0,
                interest: {
                    createdBy: "",
                    createdOn: new Date(),
                    id: 0,
                    isDeleted: false,
                    modifiedBy: "",
                    modifiedOn: new Date(),
                    name: ""
                },
                isDeleted: false,
                modifiedBy: "",
                modifiedOn: new Date(),
                rollNumber: "",
                startDate: "",
                subject: ""
            })
            
        } else { // means update student
    
            // call api to get student data

            if(params&& params?.id != "0"){
                StudentService.getSingleStudent(parseInt(params?.id as string))
                .then((res) => {
                    console.log(res)
                    setStudent({
                        ...res,
                        startDate: res.startDate.split("T")[0],
                        endDate: res.endDate.split("T")[0],
                        dateOfBirth: res.dateOfBirth.split("T")[0],
                    })
                })
                .catch((err) => {
                    console.log(err)
                })
            }
        }

    },[])
    

    const handleSubmit = () => {
        console.log(student)

        if(student.id == 0){ // means add new student

            StudentService.new_create({
                fullName: student.fullName,
                rollNumber: student.rollNumber,
                city: student.city,
                dateOfBirth: student.dateOfBirth,
                degreeTitle: student.degreeTitle,
                department: student.department,
                email: student.email,
                endDate: student.endDate,
                gender: student.gender?1:0,
                interest: student.interest.name,
                startDate: student.startDate,
                subject: student.subject
            })
                .then((res) => {
                    console.log(res)
                })
                .catch((err) => {
                    console.log(err)
                })

        } else { // means update student

            StudentService.new_update(student.id, {
                fullName: student.fullName,
                rollNumber: student.rollNumber,
                city: student.city,
                dateOfBirth: student.dateOfBirth,
                degreeTitle: student.degreeTitle,
                department: student.department,
                email: student.email,
                endDate: student.endDate,
                gender: student.gender?1:0,
                interest: student.interest.name,
                startDate: student.startDate,
                subject: student.subject
            })
                .then((res) => {
                    console.log(res)
                })
                .catch((err) => {
                    console.log(err)
                })

        }

        setStudent({
            city: "",
            createdBy: "",
            createdOn: new Date(),
            dateOfBirth: "",
            degreeTitle: "",
            department: "",
            email: "",
            endDate: "",
            fullName: "",
            gender: true,
            id: 1,
            interest: {
                createdBy: "",
                createdOn: new Date(),
                id: 0,
                isDeleted: false,
                modifiedBy: "",
                modifiedOn: new Date(),
                name: ""
            },
            isDeleted: false,
            modifiedBy: "",
            modifiedOn: new Date(),
            rollNumber: "",
            startDate: "",
            subject: ""
        })

        navigation("/students")

    }


    // const onInterestChange = (e:any) => {
    //     console.log(e.target)
    //     setStudent({...student, interest:{
    //         ...student.interest,
    //         name: e.target.value
    //     }})
    // }

    const onInterestChange = (selectedOption: any) => {
        if (selectedOption) {
            // If an option is selected from the dropdown
            setStudent({
                ...student,
                interest: {
                    ...student.interest,
                    name: selectedOption.label,
                    id: selectedOption.value,
                },
            });
        } else {
            // If a new value is entered (not in the dropdown)
            // Handle the logic for the new value
            console.log('New interest value:', student.interest.name);
        }
    };


    return (
        <div>
            <h1 className="text-center mt-4 mb-5">Add Student Form</h1>

            <div className="container">
                <div className="row">
                    {/* Row 1 */}
                    <div className="col-md-4 mb-3">
                        <div className="form-group">
                            <label htmlFor="fullName">Full Name:</label>
                            <input 
                                value={student.fullName} 
                                onChange={(e) => setStudent({...student, fullName: e.target.value})}
                            type="text" className="form-control" id="fullName" placeholder="Enter full name" />
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <div className="form-group">
                            <label htmlFor="rollNo">Roll No:</label>
                            <input
                                value={student.rollNumber} 
                                onChange={(e) => setStudent({...student, rollNumber: e.target.value})}
                            type="text" className="form-control" id="rollNo" placeholder="Enter roll number" />
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <div className="form-group">
                            <label htmlFor="email">Email Address:</label>
                            <input 
                                value={student.email} 
                                onChange={(e) => setStudent({...student, email: e.target.value})}
                            type="email" className="form-control" id="email" placeholder="Enter email address" />
                        </div>
                    </div>

                    {/* Row 2 */}
                    <div className="col-md-4 mb-3">
                        <div className="form-group">
                            <label htmlFor="gender">Gender:</label>
                            <select 
                                onChange={(e) => setStudent({...student, gender: e.target.value == "male" ? true: false})}
                                className="form-control" id="gender">
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <div className="form-group">
                            <label htmlFor="dob">Date of Birth:</label>
                            <input
                                value={student.dateOfBirth} 
                                onChange={(e) => setStudent({...student, dateOfBirth: e.target.value})}
                            type="date" className="form-control" id="dob" />
                        </div>
                    </div>


                    <div className="col-md-4 mb-3">
                        <div className="form-group">
                            <label htmlFor="city">City:</label>
                            <select 
                                value={student.city} 
                                onChange={(e) => setStudent({...student, city: e.target.value})}
                            className="form-control" id="city">
                                {
                                    cities.map((city, index) => (<option value={city} key={index}>{city}</option>))
                                }
                            </select>
                        </div>
                    </div>
                    

                    <div className="col-md-4 mb-3">
                        <div className="form-group">
                            <label htmlFor="interests">Interests: {params&& params?.id == "0" ? "" : <b>Current - {student?.interest?.name}</b>} </label>
                            <MyDropdownInput 
                                options={interestsList.map((interest) => ({label: interest.name,value: interest.id}))}
                                onInterestChange={onInterestChange}
                                defaultOption={{label:student.interest.name, value:student.interest.id}}
                            />
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <div className="form-group">
                            <label htmlFor="department">Department:</label>
                            <select 
                                value={student.department} 
                                onChange={(e) => setStudent({...student, department: e.target.value})}
                            className="form-control" id="department">
                                {
                                    departments.map((department, index) => (<option value={department} key={index}>{department}</option>))
                                }
                            </select>
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <div className="form-group">
                            <label htmlFor="degreeTitle">Degree Title:</label>
                            <select
                                value={student.degreeTitle} 
                                onChange={(e) => setStudent({...student, degreeTitle: e.target.value})}
                            className="form-control" id="degreeTitle">
                                {
                                    degrees.map((degree, index) => (<option value={degree} key={index}>{degree}</option>))
                                }
                            </select>
                        </div>
                    </div> 



                    <div className="col-md-4 mb-3">
                        <div className="form-group">
                            <label htmlFor="subject">Subject:</label>
                            <input
                                value={student.subject} 
                                onChange={(e) => setStudent({...student, subject: e.target.value})}
                            type="text" className="form-control" id="subject" placeholder="Enter subject" />
                        </div>
                    </div>

                    {/* Row 3 */}
                    <div className="col-md-4 mb-3">
                        <div className="form-group">
                            <label htmlFor="startDate">Start Date:</label>
                            <input
                                value={student.startDate} 
                                onChange={(e) => setStudent({...student, startDate: e.target.value})}
                            type="date" className="form-control" id="startDate" />
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <div className="form-group">
                            <label htmlFor="endDate">End Date:</label>
                            <input
                                value={student.endDate} 
                                onChange={(e) => setStudent({...student, endDate: e.target.value})}
                            type="date" className="form-control" id="endDate" />
                        </div>
                    </div>
                </div>

                {/* Add a button or any other UI elements as needed */}
                <button onClick={handleSubmit} className='btn btn-primary'>
                    {params&& params?.id == "0" ? "Add Student" : "Update Student"}
                </button>
            </div>
        </div>
    );
};

export default AddUpdateStudentForm;
