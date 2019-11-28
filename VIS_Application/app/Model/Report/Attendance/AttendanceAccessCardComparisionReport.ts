export interface IEmployee
{
    Id: number;
    Employee_Name: string;
}

export interface IYear
{
    CurrentYear: string;
}

export interface IEmployeeAccessCardComparision
{
    EmployeeCode: string;
    Employee_Name: string;
    Date: Date;
    LineManager: string;
    Grace: number;
    Grade: string;
    Status: string;
    PunchInVIS: Date;
    PunchInAC: Date;
    MAC: string;
    IP: string;
    TimeofFirstScreenShot: string;
    TimeofLastScreenShot: string;
    PunchInIssue: string;
    PunchOutIssue: string;
}

export interface IParameterModel
{
    EmployeeId: number;
    FromDate: string;
    ToDate: string;
    IssueOnly: string;
    Search: string;
    OrderBy: string;
    LoginUserId: number;
    FromMonth: string;
    FromYear: string;
    ToMonth: string;
    ToYear: string;
    MonthWise: boolean;

}







