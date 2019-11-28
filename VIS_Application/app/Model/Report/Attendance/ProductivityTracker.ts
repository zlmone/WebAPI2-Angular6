export interface IDepartment {
    Id: number;
    Department_Name: string;
}
export interface IEmployee {
    ID: number;
    EmployeeName: string;
}
export interface ILineManager {
    Id: number;
    EmployeeName: string;
}
export interface ILookup {
    Id: number;
    name: string;
}
export interface IProductivityTracker
{
    EntryType: string;
    Difference: string;
    Employeename: string;
    ForWhichDate: string;
    OutTime: string;
    InTime: string;
}