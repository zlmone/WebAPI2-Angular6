export interface IDepartment {

    Id: number;
    Department_Name: string;
    mode: string;

}

export interface IEmployee {
    Id: number;
    Employee_Name: string;
    mode: string;
}

export interface ICompany {
    Id: number;
    CompanyName: string;
    mode: string;
}

export interface ILineManager {
    Id: number;
    LineManager: string;
    mode: string;
}

export interface ICalTotalAttendance {
    Employee_Id: number;
    EmployeeCode: string;
    Employee_Name: string;
    Date: string;
    MMDDYYYY_DateFormat: string;
    Days: string;
    ImportRemarks: string;
    HoverImportRemarks: string;
    InId: number;
    In_Time: Date;
    OutId: number;
    Out_Time: Date;
    LunchOutId: number;
    LunchOut_Time: Date;
    LunchInId: number;
    LunchIn_Time: Date;
    OtherId: number;
    Other_Time: Date;
    TotalWorksheet_Hr: number;
    status: string;
    Total_W_Hr: string;
    Total_Hrs: string;
    diff: string;
    TotalId: string;
    ActualEntryTime: string;
    Grace: number;
    EntryType: string;
}
export interface IAttendanceParam {
    cbDeduction: false;
    cbMissingEntry: false;
    rdbmonth: false;
    rdbDate: false;
}
export interface IYear {
    Id: number;
    Month: string;
    Year: string;
}

export interface SaveDailyEntryTime {
    In_Mon_Fri: string;
    Out_Mon_Fri: string;
    In_Sat: string;
    Out_Sat: string;
}

export interface IEmpId
{
    id: number;
}











