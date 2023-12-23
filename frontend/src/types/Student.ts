

/*
{
    "fullName": "kaamran",
    "rollNumber": "bcsf19m030",
    "email": "bcsf19m030@pucit.edu.pk",
    "gender": true,
    "dateOfBirth": "2002-07-18",
    "city": "lahore",
    "interest": null,
    "department": "Computer Science",
    "degreeTitle": "Bachelor's Degree",
    "subject": "Computer",
    "startDate": "2023-12-11",
    "endDate": "2024-02-11",
    "isDeleted": false,
    "createdBy": null,
    "createdOn": "2023-12-11T20:27:48.074562",
    "modifiedBy": null,
    "modifiedOn": null,
    "id": 2
},
*/

export interface Student {
    id: number;
    fullName: string;
    rollNumber: string;
    email: string;
    gender: boolean;
    dateOfBirth: string;
    city: string;
    interest: string;
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


