export interface IDepartment {
    Id: number;
    Department_name: string;
}
export interface IEmployee {
    Id: number;
    Employee_Name: string;
}
export interface ICompany {
    Id: number;
    CompanyName: string;
}
export interface ILineManager {
    Id: number;
    EmployeeName: string;
}
export interface IUserType {
    Id: number;
    UserType: string;
}
export interface IYear {
    Id: number;
    Year: string;
}

export interface IAttendanceReport
{
    EmployeeId: number;
    EmployeeCode: number;
    EmployeeName: string;
    Date: string;
    forWhichDate: Date;
    LineManager: string;
    Grace: number;
    Grade: string;
    attendancePolicy: string;
    HR_In_Time: string;
    PunchIntime: Date;
    PunchInRemark: number;
    PunchInBackColor: string;
    PunchOuttime: Date;
    PunchOutRemark: number;
    PunchOutBackColor: string;
    LunchOutTime: Date;
    LunchOutRemark: number;
    LunchInTime: Date;
    LunchInRemark: number;
    OtherWork: Date;
    OtherWorkRemark: number;
    TotalOtherWork: string;
    WorkingHour: string;
    WorkingHourBackColor: string;
    WorkingHourFontColor: string;
    TotalOfficeTime: string;
    WorksheetHour: string;
    WorksheetHourBackColor: string;
    IsAdmin: boolean;
    Diff: string;
    Status: string;
    GU_BU: number;
    GU_BUBackColor: string;
    WNE: string;
    PC: string;
    PC_Remarks: string;
    AUPL: string;
    UUPL: string;
    CL_H: string;
    CL_F: string;
    SL_H: string;
    SL_F: string;
    In_Remarks: string;
    Out_Remarks: string;
    Lunch_Out_Remarks: string;
    Lunch_In_Remarks: string;
    Other_Out_Remarks: string;
    Days: string;
    l1: string;
    l2: string;
    l3: string;
    l4: string;
    l5: string;
    l6: string;
    l7: string;
    l8: string;
    l9: string;
    l10: string;
    Total: string;
}