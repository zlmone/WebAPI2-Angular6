export interface IEmployee
{
    Id: number;
    Employee_Name: string;
}

export interface IYear
{
    CurrentYear: string;   
}

export interface IEmployeeScreenCapture
{
    EmployeeName: string;
    AllowScreenCapture: string;
    AttendanceStatus: string;
    Counts: number;
    Date: Date;
    PunchIn: string;
    PunchOut: string;
    Timming: string;
}

export interface IParameterModel
{
    EmployeeId: number;
    FromDate: string;
    ToDate: string;
    OrderBy: string;
    LoginUserId: number;
    FromMonth: string;
    FromYear: string;
    ToMonth: string;
    ToYear: string;
    MonthWise: boolean;

}







