export interface IEmployee
{
    Id: number;
    Employee_Name: string;
}

export interface IYear
{
    CurrentYear: string;
}

export interface IEmployeeDashboardHeartBeat
{
    Employee_Name: string;
    Date: Date;
    OutTime: string;
    InTime: string;
    TotalTime: string;
    Duration: number;
}

export interface IParameterModel
{
    EmployeeId: number;
    FromDate: string;
    ToDate: string;
    ViewBy: string;
    ConsolidateBy: string;
    OrderBy: string;
    LoginUserId: number;
    FromMonth: string;
    FromYear: string;
    ToMonth: string;
    ToYear: string;
    MonthWise: boolean;
}







