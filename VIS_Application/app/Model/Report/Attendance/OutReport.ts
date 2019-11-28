export interface IDepartment
{

    Id: number;
    Department_Name: string;
    mode: string;

}

export interface IEmployee
{
    Id: number;
    Employee_Name: string;
    mode: string;
}

export interface IEmployeeId
{
    Id: number;
}


export interface ICompany
{
    Id: number;
    CompanyName: string;
    mode: string;
}

export interface ILineManager
{
    Id: number;
    LineManager: string;
    mode: string;
}

export interface ICalTotalAttendance
{
    EmployeeID: number;
    EmployeeName: string;
    Date: string;
    ToDate: string;
    InTimeID: number;
    InTIme: Date;
    OutTimeID: number;
    OutTIme: Date;
    LunchOutTimeID: number;
    LunchOutTIme: Date;
    LunchInTimeID: number;
    LunchInTIme: Date;
    OtherTimeID: number;
    TotalOtherTime: string;
    TotalOfficeTime: string;
    TotalLunchTime: string;
    TotalBreakTime: string;
    TotalWorkingTime: string;
    TotalWorksheetHours: number;
    IsInOffice: boolean;
    IsInBreak: boolean;
    IsInLunch: boolean;
    IsInMeeting: boolean;
    IsInOfficeWork: boolean;
    Days: string;
    ImportRemarks: string;
    EmployeeCode: string;
    MMDDYYYY_DateFormat: string;

}

export interface IOutReport
{
    EmployeeId: number;
    Active: number;
    FromDate: Date;
    ToDate: Date;
    OutType: string;
    Minute: number;
    AllDate: boolean;
    Employeelist: string;
    Consolidated: string;
    Sort: string;
}

export interface IOutReportBindReport
{
    Id: number;
    Employee_Name; string;
    CurrentDate: Date;
    Entry_Type: string;
    Entry_Time: Date;
    InTime: Date;
    Duration: number;
    Remarks: string;
}

export interface IYear
{
    Id: number;
    Month: string;
    Year: string;
}



