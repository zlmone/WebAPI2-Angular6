export interface IDepartment
{
    Id: number;
    Department_Name: string;
}

export interface IEmployee
{
    Id: number;
    Employee_Name: string;
}

export interface ICompany
{
    Id: number;
    CompanyName: string;
}

export interface IYear
{
    CurrentYear: string;
}

export interface ILateEarlyReport
{
    Id: number;
    Employees_Name: string;
    LateComing: number;
    EarlyLeaving: number;
    LessTime: number;
}

export interface ParameterModel
{
    Id: number;
    Fromdate: Date;
    Todate: Date;
    MonthWise: boolean;
    FromMonth: string;
    FromYear: string;
}










