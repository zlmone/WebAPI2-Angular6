export interface IEmployee {
    Id: number;
    Employee_Name: string;
}

export interface IBindEmployeeDetails {
    Id: number;
    Employee_Name: string;
    Transaction_Id: number;
    Entry_Type: string;
    Remarks: string;
    Entry_Time: string;
    forWhichDate: string;
    actualEntryTime: string;
    grace: number;
}

export interface IBindEmployeeAttendance {
    EmployeeID: number;
    EmployeeName: string;
    Date: string;
    InTimeID: number;
    InTIme: Date;
    OutTimeID: number;
    OutTIme: Date;
    LunchOutTimeID: number;
    LunchOutTIme: Date;
    LunchInTimeID: number;
    LunchInTIme: Date;
    OtherTimeID: number;
    TotalOtherTime: Date;
    TotalOfficeTime: Date;
    TotalLunchTime: Date;
    TotalBreakTime: Date;
    TotalWorkingTime: Date;
    TotalWorksheetHours: Date;
    IsInOffice: boolean;
    IsInBreak: boolean;
    IsInLunch: boolean;
    IsInMeeting: boolean;
    IsInOfficeWork: boolean;
    Days: string;
    ImportRemarks:string;
    EmployeeCode: string;
    MMDDYYYY_DateFormat: Date;
    CalTotalAttendance:string;
}

export interface IHRAttendance
{
    HRInTime: string;
    HROutTime: string;
    Grace: number;
    Grade: string;
}

export interface IAttendance {
    Id: number;
    Employee_Id: number;
    Entry_Type: number;
    Remarks: string;
    Entry_Time: string;
    Date: string;
    actualEntryTime: string;
    grace: number;
    macID: string;
    forWhichDate: Date;
    IsActive: boolean;
    ipAddress: string;
    source: string;
    isApprove: boolean;
    groupId: number;
    attendancePolicy: string;
    Grade: number;
    ImportRemarks: string;
    Days: string;
    forWhichEntryType: number;
    CreatedOn: Date;
    UpdatedOn: Date;
    CreatedBy: number;
    UpdatedBy: number;
}