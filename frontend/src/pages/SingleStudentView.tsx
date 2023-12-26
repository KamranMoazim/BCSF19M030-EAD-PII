import React from 'react'
import { Student } from '../types/Student'
import "./SingleStudentView.css"

interface Props {
    student:Student
}

const SingleStudentView = ({student}:Props) => {


    return (
    //     <div className="card">
    //     <div className="card-body">
    //         <h3 className="card-title">{student.fullName}</h3>
    //         <p className="card-text">
    //             <strong>Roll Number:</strong> {student.rollNumber}
    //         </p>
    //         <p className="card-text">
    //             <strong>Email:</strong> {student.email}
    //         </p>
    //         <p className="card-text">
    //             <strong>Gender:</strong> {student.gender ? 'Male' : 'Female'}
    //         </p>
    //         <p className="card-text">
    //             <strong>Date of Birth:</strong> {student.dateOfBirth}
    //         </p>
    //         <p className="card-text">
    //             <strong>City:</strong> {student.city}
    //         </p>
    //         <p className="card-text">
    //             <strong>Interest:</strong> {student.interest.name}
    //         </p>
    //         <p className="card-text">
    //             <strong>Department:</strong> {student.department}
    //         </p>
    //         <p className="card-text">
    //             <strong>Degree Title:</strong> {student.degreeTitle}
    //         </p>
    //         <p className="card-text">
    //             <strong>Subject:</strong> {student.subject}
    //         </p>
    //         <p className="card-text">
    //             <strong>Start Date:</strong> {student.startDate}
    //         </p>
    //         <p className="card-text">
    //             <strong>End Date:</strong> {student.endDate}
    //         </p>
    //         <p className="card-text">
    //             <strong>Created By:</strong> {student.createdBy}
    //         </p>
    //         <p className="card-text">
    //             <strong>Created On:</strong> {new Date(student.createdOn).toLocaleDateString()}
    //         </p>
    //         <p className="card-text">
    //             <strong>Modified By:</strong> {student.modifiedBy}
    //         </p>
    //         <p className="card-text">
    //             <strong>Modified On:</strong> {new Date(student.modifiedOn).toLocaleDateString()}
    //         </p>
    //     </div>
    // </div>

    <table className="table">
    <tbody>
        <tr>
            <td><strong>Full Name:</strong></td>
            <td>{student.fullName}</td>
        </tr>
        <tr>
            <td><strong>Roll Number:</strong></td>
            <td>{student.rollNumber}</td>
        </tr>
        <tr>
            <td><strong>Email:</strong></td>
            <td>{student.email}</td>
        </tr>
        <tr>
            <td><strong>Gender:</strong></td>
            <td>{student.gender ? 'Male' : 'Female'}</td>
        </tr>
        <tr>
            <td><strong>Date of Birth:</strong></td>
            <td>{student.dateOfBirth}</td>
        </tr>
        <tr>
            <td><strong>City:</strong></td>
            <td>{student.city}</td>
        </tr>
        <tr>
            <td><strong>Interest:</strong></td>
            <td>{student.interest.name}</td>
        </tr>
        <tr>
            <td><strong>Department:</strong></td>
            <td>{student.department}</td>
        </tr>
        <tr>
            <td><strong>Degree Title:</strong></td>
            <td>{student.degreeTitle}</td>
        </tr>
        <tr>
            <td><strong>Subject:</strong></td>
            <td>{student.subject}</td>
        </tr>
        <tr>
            <td><strong>Start Date:</strong></td>
            <td>{student.startDate}</td>
        </tr>
        <tr>
            <td><strong>End Date:</strong></td>
            <td>{student.endDate}</td>
        </tr>
        <tr>
            <td><strong>Created By:</strong></td>
            <td>{student.createdBy}</td>
        </tr>
        <tr>
            <td><strong>Created On:</strong></td>
            <td>{new Date(student.createdOn).toLocaleDateString()}</td>
        </tr>
        <tr>
            <td><strong>Modified By:</strong></td>
            <td>{student.modifiedBy}</td>
        </tr>
        <tr>
            <td><strong>Modified On:</strong></td>
            <td>{new Date(student.modifiedOn).toLocaleDateString()}</td>
        </tr>
    </tbody>
</table>

    )
}

export default SingleStudentView
