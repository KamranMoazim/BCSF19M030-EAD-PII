
export interface Activity {
    id: number;
    userId: string;
    userName: string;
    action: string;
    target: string;
    details: string;
    timestamp: Date;

    // "userId": "userId",
    // "userName": "userName",
    // "action": "POST",
    // "target": "/api/Auth/login",
    // "details": "QueryString: ",
    // "timestamp": "2023-12-10T15:59:41.8753641",
    // "id": 1
} 