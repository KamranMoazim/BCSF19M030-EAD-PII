import { Interest } from "./Interest";


export interface Student {
    id: number;
    fullName: string;
    rollNumber: string;
    email: string;
    gender: boolean;
    dateOfBirth: string;
    city: string;
    // interest: string;
    interest: Interest;
    department: string;
    degreeTitle: string;
    subject: string;
    startDate: string;
    endDate: string;
    isDeleted: boolean;
    createdBy: string;
    createdOn: Date;
    modifiedBy: string;
    modifiedOn: Date;
}


export interface Distributions {
    // "key": "string",
    // "value": "string"
    key: string
    value: string
}

export interface DailyStudentCreationData {
    // "date": "2023-12-11T00:00:00",
    // "studentCount": 2
    date: Date
    studentCount: number
}


export interface AddUpdateStudent {
    fullName: string;
    rollNumber: string;
    email: string;
    gender: number;
    dateOfBirth: string;
    city: string;
    interest: string;
    department: string;
    degreeTitle: string;
    subject: string;
    startDate: string;
    endDate: string;
}