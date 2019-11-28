export interface ISalaryGrievance {
    Id: number;
    Employee_Id: number;
    Employee_Name: string;
    Deduction_Date: Date;
    Grievance_Remarks: string;
    PaycutAmount: string;
    GrievanceType_PE: string;
    GrievanceType_PH: string;
    PE_Status: number;
    PE_Remarks: string;
    PE_UpdatedBy: number;
    PE_UpdatedDate: Date;
    PH_Status: number;
    PH_Remarks: string;
    PH_UpdatedBy: number;
    PH_UpdatedDate: Date;
    CreatedBy: number;
    CreatedOn: Date;
    UpdatedBy: number;
    UpdatedOn: Date;
    Active: boolean;
    verified_By: number;
}

export interface IGrievanceDate
{
    Id: number;
    EmployeeId: number;
    Deduction_Date: string;
    CreatedOn: Date;
    PayrollCut: string;
    PayrollRemarks: string;
    LineManagerId: number;
    LineManagerName: string;
}

export interface IAttendance
{
    Id: number;
    EmployeeId: number;
    EmployeeCode: string;
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
    LunchInRemark: string;
    OtherWork: string;
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

export interface IDailyEntry
{
    Id: number;
    Employee_Name: string;
    Date: string;
    Transaction_Id: number;
    Entry_Type: string;
    Remarks: string;
    Entry_Time: Date;
    forwhichDate: string;
}