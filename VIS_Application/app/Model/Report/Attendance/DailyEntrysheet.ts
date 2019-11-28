export interface IDailyEntrysheetEmployee
{
    Employee_Name: string;
    Date: string;
    Entry_Type: string;
    Entry_Time: string;
    actualEntryTime: string;
    Remarks: string;
    TotalOfficeTime: string;
    TotalWorkingTime: string;
    TotalBreakTime: string;
    TotalWorksheetHours: string;
    Id: number;
    Grace: number;
    Transaction_Id: number;
}

export interface IDailyEntrysheetTime
{
    TotalOfficeTime: Date;
    TotalWorkingTime: Date;
    TotalBreakTime: Date;
    TotalWorksheetHours: Date;
}

export interface IEmployees
{
    Id: number;
    Employee_Name: string;
}

export interface IBindAttendanceReportEmp {
    EmployeeName: string;
    Date: string;
    EntryTime: string;
    Remarks: string;
}