export interface Response {
    Status:string
    Message:string
}

export interface QueryParams {
    PageNumber : number
    PageSize : number
    OrderBy : string
    OrderDirection : 0 | 1
}


export interface QueryResult<T> {
    source: T[]
    numberOfRows: number
    numberOfPages: number
}