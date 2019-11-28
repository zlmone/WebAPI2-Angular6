export interface IEmpInfoTabular {

    EditEmployeeid: string;
    Editmode: string;
    returnid: number;
    mode: string;
    id: number;
    URoleId: number;
    PositionId: number;
    DepartmentID: number;
    PID: number;
    EID: number;
    EducationID: number;
    EmployeeID: number;
    TechnologyID: number;
    technologyName: string;
    CompanyName: string;
    Employee_Name: string;
    Name: string;
    positionName: string;
    Department_name: string;
    Remarks: string;

    UserId: number;
    SalaryRangeId: number;
    Salary: number;
    salaryrangetitle: string;
    Value: number;
    Parentid: number;
    NonWorkingDay: string;
    NWID: number;
    IntimeMondayToFridayHH: number;
    IntimeMondayToFridayMM: number;
    IntimeSaturdayHH: number;
    IntimeSaturdayMM: number;
    OutTimeMondayToFridayHH: number;
    OutTimeMondayToFridayMM: number;
    OutTimeSaturdayHH: number;
    OutTimeSaturdayMM: number;
    CompanyId: number;
    strCode: string;

    EmployeeName: string; 
    FirstName: string;
    MiddleName: string;
    LastName: string;
    Password: string;
    Email: string;
    Active: boolean;
    UserType: string;
    JoiningDate: Date;
    RelevingDate: Date;
    ResignedDate: Date;
    TotalCL: number;
    TotalSl: number;
    AdditionalRights: number;
    ValidForLogin: boolean;
    Employeecode: string;
    ProbationTill: Date;
    ActivityId: number
    Gender: boolean;
    IsConfirmed: boolean;
    JoiningSalary: number;
    JoiningDesignation: number;
    PhotographFileName: string;
    SalaryAfterRevision: number;
    IsSLASigned: boolean;
    ConfirmationDate: Date;
    AppraisalDate: Date;
    IsAppraisalRequired: boolean;
    SLAYear: number;
    Technology: string;
    OtherTechnology: string;
    LineManagerID: number;
    WorkingLocation: number;
    WorkingLocationAddress: string;
    CommunicationID: string;
    OtherRemark: string;
    IsWebAccess: boolean;
    WorksheetThruWeb: boolean;
    IsSwitchUser: boolean;
    AllowScreenCapture: boolean;
    IsWorksheetFill: boolean;
    IsConfirmationLeave: boolean;
    EmployeeGradeID: number;
    IsResigned: boolean;
    isMailAlert: boolean;
    IsAllowMouseMovement: boolean;
    CreatedDateTime: Date;
    IsMouseTracking: boolean;
    IsScreenCaptureRemarks: boolean;
    IsHost: boolean;
    IsHostForEmpMaster: boolean;
    IsProductivityTracker: boolean;
    WorkFromHome: boolean;
    Sar: number;
    YearEducation: string;
    joingdate:string;
    Designation: string;
    SLASigned: string
    Department:string


}
export interface IPersonalInformation {
    EditEmployeeid: string;
    Editmode: string;
    FatherName: string;
    Birthdate: Date;
    Paddress: string;
    Caddress: string;
    Landlineno: string;
    Mobileno: string;
    Emergencyno: string;
    Age: number;
    Bloodgroup: string;
    Status: string;
    Spouse: string;
    Numberofchild: number;
    Childname: string;
    AnniversaryDate: Date;
    Grandfathername: string;
    Spousedob: string;
    MotherName: string;
    BrotherName: string;
    SisterName: string;
    FatherOccupation: string;
    MotherOccupation: string;
    BrotherOccupation: string;
    SisterOccupation: string;
    SpouseOccupation: string;


}
export interface IEducationInformation {
    EditEmployeeid: string;
    Editmode: string;
    Eduid: number;
    UserId: number;
    HighestEducation: boolean;
    ClassDegree: string;
    Schoolinstitute: string;
    Medium: string;
    Passingyear: number;
    Boarduniversity: string;
    Percentage: number;
    mode: string;
}
export interface IExperienceInformation {
    EditEmployeeid: string;
    Editmode: string;
    RoleId: number;
    RoleName: string;
    Efficiency: number;
    ExpRoleId: number;
    Expid: number;
    Skills: string;
    Totalexp: string;
    Org: string;
    Url: string;
    Designation: string;
    Joiningdate: string;
    Relievingdate: string;
    Reportingto: string;
    Contactno: string;
    Reason: string;
    Lastsalary: string;
    experiencesummary: string;
    skills: string;
    ProjectHandled: string;
    RelevanceExp: string;
    expyear: number;
    expmonth: number;
    relevanceExpYear: string;
    relevanceExpMonth: string;
    hdnProjectsToSave: string;

}
export interface ISalaryInformation {
    EditEmployeeid: string;
    Editmode: string;
    UserId: number;
    Salary: number;
    Bankname: string;
    Accountno: string;
    PFAccountNo: string;
    CurrentDesignation: string;
    ISPFApplicable: boolean;
    AdharNumber: number;
    UANNumber: number;
    Employee_Name: string;
    Type: string;
}
export interface IAttendanceInformation {

    EditEmployeeid: string;
    Editmode: string;
    UserId: number;
    Intime: string;
    Outitme: string;
    Intimesat: string;
    Outtimesat: string;
    Grace: number;
    Leaveapproveby: number;
    SatGrace: number;
    IsAlertRequired: boolean;
    AccessCardId: number;
    UpdatedBy: number;
    AttendancePolicy: string;
    Nwdday: string;
    NWID: number;
    Output: string;
}
export interface IJoiningInformation {

    EditEmployeeid: string;
    Editmode: string;
    Panno: string;
    Passportno: string;
    Placeofissue: string;
    Issuedate: Date;
    Expirydate: Date;
    Isrelevingletter: boolean;
    Isexperienceletter: boolean;
    Issalaryslip: boolean;
    IsDegreeCertificate: boolean;
    IsMarkSheet: boolean;
    IsPassport: boolean;
    Isdrivinglicense: boolean;
    Ispancard: boolean;
    Iscv: boolean;
    Isother: boolean;
    Other: string;
    RelievingLetterFileName: string;
    ExperienceLetterFileName: string;
    LastSalarySlipFileName: string;
    DegreeCertificateFileName: string;
    LastMarksheetFileName: string;
    PassportFileName: string;
    DrivingLicenseFileName: string;
    PANCardFileName: string;
    CurriculamVitaeFilName: string;
    OtherFileName: string;
    OtherFileName0: string;
    OtherFileName1: string;
    Other0: string;
    Other1: string;
    HR_Remark: string;
    Isother0: boolean;
    Isother1: boolean;


}
export interface IIncrementformation {
    EditEmployeeid: string;
    Editmode: string;
    Incrementdate: Date;
    Designationchange: number;
    Increment: number;
    Salarychange: number;
    Isfirst: boolean;
    Incrementid: number;
    AppraisalDate: Date;
    SalaryRangeId: number;
}
export interface IOfficialInformation {
    EditEmployeeid: string;
    Editmode: string;
    Verveemail: string;
    Vervepassword: string;
    Gmail: string;
    Gmailpassword: string;
    Yahoo: string;
    Yahoopassword: string;
    Skype: string;
    Skypepassword: string;
    Othersitename: string;
    Otherid: string;
    Otherpassword: string;

}
export interface IProjectInfoFrm {
    EditEmployeeid: string;
    Editmode: string;
    FromDate: string;
    ToDate: string;
    UserId: number;
}
export interface ILeaveInfoFrm {
    EditEmployeeid: string;
    Editmode: string;
    Leavetype: string;
    Balance: number;
    Transactiontype: string;
    Isadjusted: boolean;
    AdjustedValue: number;
    Lastyear: string;
    UUPLBalance: number;
    Leavedate: Date;
    Createddate: Date;
    Remarks: string;
    Leavename: string;
    Isaupl: boolean;
    leavestartdate: string;
    leaveenddate: string;


}
export interface IMySkillFrm
{
    EditEmployeeid: string;
    Editmode: string;
    Name: string;
    lookupSkilId: number;
    SkillName: string;
    id: number;

}


