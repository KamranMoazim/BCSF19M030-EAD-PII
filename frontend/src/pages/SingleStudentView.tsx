import React from 'react'
import { Student } from '../types/Student'
import "./SingleStudentView.css"

interface Props {
    student:Student
}

const SingleStudentView = ({student}:Props) => {


    return (
        <div className="card">
        <div className="card-body">
            <h3 className="card-title">{student.fullName}</h3>
            <p className="card-text">
                <strong>Roll Number:</strong> {student.rollNumber}
            </p>
            <p className="card-text">
                <strong>Email:</strong> {student.email}
            </p>
            <p className="card-text">
                <strong>Gender:</strong> {student.gender ? 'Male' : 'Female'}
            </p>
            <p className="card-text">
                <strong>Date of Birth:</strong> {student.dateOfBirth}
            </p>
            <p className="card-text">
                <strong>City:</strong> {student.city}
            </p>
            <p className="card-text">
                <strong>Interest:</strong> {student.interest.name}
            </p>
            <p className="card-text">
                <strong>Department:</strong> {student.department}
            </p>
            <p className="card-text">
                <strong>Degree Title:</strong> {student.degreeTitle}
            </p>
            <p className="card-text">
                <strong>Subject:</strong> {student.subject}
            </p>
            <p className="card-text">
                <strong>Start Date:</strong> {student.startDate}
            </p>
            <p className="card-text">
                <strong>End Date:</strong> {student.endDate}
            </p>
            <p className="card-text">
                <strong>Created By:</strong> {student.createdBy}
            </p>
            <p className="card-text">
                <strong>Created On:</strong> {new Date(student.createdOn).toLocaleDateString()}
            </p>
            <p className="card-text">
                <strong>Modified By:</strong> {student.modifiedBy}
            </p>
            <p className="card-text">
                <strong>Modified On:</strong> {new Date(student.modifiedOn).toLocaleDateString()}
            </p>
        </div>
    </div>
    )
}

export default SingleStudentView
