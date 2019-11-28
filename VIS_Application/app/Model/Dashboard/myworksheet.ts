export class IMyLeaveDetails {
    ID: number;
    EmployeeID: number;
    ToDate: Date;
    FromDate: Date;
    Reason: String;
    ContactDetail: String;
    AppliedTo: number;
    LeaveType: number;
    Status: number;
    GHID: number;
    EnteredDate: Date;
    ResponsiblePersonID: number;
    Remarks: String;
    IsFullDay: boolean;
    IsFirstHalf: boolean;
    IsSecondHalf: boolean;
    CreatedDate: Date;
    contact: string;
    CallOnDate: Date;
    CallOnTime: string;
    EmergencyLeave: boolean;
    LongleaveEntry: boolean;
}

export class INwdHistory {
    id: number;
    employeeId: number;
    date: Date;
    leaveType: string;
    nwdId: number;
}

export class ICalTotalAttendance {
    EmployeeID: number;
    EmployeeName: String;
    Date: String;
    InTimeID: number;
    InTime: Date;
    OutTimeID: number;
    OutTime: Date;
    LunchOutTimeID: number;
    LunchOutTime: Date;
    LunchInTimeID: number;
    LunchInTime: Date;
    OtherTimeID: number;
    TotalOtherTime: String;
    TotalOfficeTime: String;
    TotalLunchTime: String;
    TotalBreakTime: String;
    TotalWorkingTime: String;
    TotalWorksheetHour: number;
    IsInOffice: boolean;
    IsInBreak: boolean;
    IsInLunch: boolean;
    IsInMeeting: boolean;
    IsInOfficeWork: boolean;
    Days: String;
    ImportRemarks: String;
    EmployeeCode: String;
    MMDDYYYY_DateFormate: String;
}

export class IActualEntryTimeAndGraceForPunchInId {
    actualEntryTime: string;
    grace: number;
}

export class IEmpLeaveLedgerForDate {
    leaveDuration: String;
    leaveType: String;
    approveType: String;
    shortLeaveType: String;
}

export class ILeaveDetailsByDate {
    ID: number;
    LeaveType: string;
    LeaveStatus: string;
    EmployeeId: number;
    FromDate: Date;
    ToDate: Date;
    CalendarDays: Date;
    IsFullDay: boolean;
    IsFirstHalf: boolean;
    IsSecondhalf: boolean;
}
export class IEmpHolidayListForDate {
    id: number;
    holidayName: String;
    fromDate: Date;
    toDate: Date;
    remarks: String;
    active: boolean;
    noOfDays: number;
}

export class IHolidayForDate {
    id: number;
    holidayName: String;
    fromDate: Date;
    toDate: Date;
    remarks: String;
    active: boolean;
    noOfDays: number;
}

export interface MyDate {
    year: number;
    month: number;
    day: number;
}

export interface mymonth {
    monthTxt: string;
    monthNbr: number;
    year: number;
}

export class IMyCalender {
    private myDatePickeroption = {
        todaybtnTxt: 'Today',
        dateFormat: 'yyyy-mm-dd',
        firstdayofweek: 'mo',
        sunHighlights: true,
        height: '150px',
        width: '300px',
        background: '#3BAFDA',
        ShowTextBox: false,
    };
    SelectedDate: string = '';
}

