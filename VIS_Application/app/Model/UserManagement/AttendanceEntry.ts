export interface IAttendanceEntry {
    Id: number;
    Employee_Id: number;
    Entry_Type: number;
    Remarks: string;
    Entry_Time: Date;
    Date: string;
    actualEntryTime: string;
    grace: number;
    macID: string;
    forWhichDate: Date;
    ipAddress: string;
    source: string;
    isApproved: boolean;
    groupId: number;
    attendancePolicy: string;
    Grade: number;
    ImportRemarks: string;
    Days: string;
    forWhichEntryType: number;
}

export interface IAttendanceEntryGet {
    Id: number;
    Employee_Name: string;
    Password: string;
    Email: string;
    In_Mon_Fri: string;
    Out_Mon_Fri: string;
    In_Sat: string;
    Out_Sat: string;
    Grace: number;
    Active: boolean;
    userType: string;
    joiningDate: Date;
    relevingDate: Date;
    totalCL: number;
    totalSL: number;
    additionalRights: number;
    validForLogin: boolean;
    leaveApproveBy: number;
    employeeCode: string;
    probationTill: Date;
    ActivityId: number;
    CompanyId: number;
    Gender: boolean;
    IsConfirmed: boolean;
    JoiningSalary: number;
    PhotographFileName: string;
    SalaryAfterRevision: number;
    IsSLASigned: boolean;
    ConfirmationDate: Date;
    AppraisalDate: Date;
    IsAppraisalRequired: boolean;
    SLAYear: number;
    FirstName: string;
    MiddleName: string;
    LastName: string;
    JoiningDesignation: number;
    Technology: string;
    IsPasswordChange: boolean;
    OtherTechnology: string;
    SalaryRangeId: number;
    LineManagerId: number;
    TotalCOff: number;
    enrollnumber: number;
    AllowScreenCapture: boolean;
    ActiveDashboard: boolean;
    IsSwitchUser: boolean;
    WorkingLocation: number;
    WorkingLocationAddress: string;
    Education: number;
    CommunicationID: string;
    SatGrace: number;
    IsWebAccess: boolean;
    OtherRemark: string;
    WorksheetThruWeb: boolean;
    IsWorksheetFill: boolean;
    CL: number;
    SL: number;
    IsjoiningLeave: boolean;
    IsConfirmationLeave: boolean;
    EmployeeGradeID: number;
    IsResigned: boolean;
    isMailAlert: boolean;
    IsAllowMouseMovement: boolean;
    accessCardId: number;
    CreatedBy: number;
    CreatedDateTime: Date;
    UpdatedBy: number;
    UpdatedDateTime: Date;
    IsMouseTracking: boolean;
    IsScreenCaptureRemarks: boolean;
    IsHost: boolean;
    IsProductivityTracker: boolean;
    WorkFromHome: boolean;
    attendancePolicy: string;
    IsHostForEmpMaster: boolean;
    ResignedDate: Date;
    CreatedOn: Date;
    UpdatedOn: Date;
    IsActive: boolean;
    
}

export interface IGetTimeDetails {
    TotalOfficeTime: Date;
    TotalPunchInHours: Date;
    TotalBreakTime: Date;
    TotalWorkingTime: Date;
    PunchIn: number;
    InBreak: number;
}

export interface IPunchOutOnNextDay {
    Id: number;
    Employee_Id: number;
    FromDt: Date;
    ToDt: Date;
    Active: Boolean;
    OpenedBy: number;
}

export interface IGetEmployeeName {
    Employee_Id: number;
    Employee_Name: string;
}
