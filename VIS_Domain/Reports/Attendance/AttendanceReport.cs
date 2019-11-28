using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VIS_Domain.Reports.Attendance;

namespace VIS_Domain.Reports.Attendance
{
    public class AttendanceReport : VISBaseEntity
    {

        public string Department_Name { get; set; }
        public string Employee_Name { get; set; }
        public string CompanyName { get; set; }
        public string LineManager { get; set; }
        public string mode { get; set; }


        //-------BIND DATA Attendance Data -------//

        public int EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public string Date { get; set; }
        public string ToDate { get; set; }
        public int InTimeID { get; set; }
        public DateTime InTIme { get; set; }
        public int OutTimeID { get; set; }
        public DateTime OutTIme { get; set; }
        public int LunchOutTimeID { get; set; }
        public DateTime LunchOutTIme { get; set; }
        public int LunchInTimeID { get; set; }
        public DateTime LunchInTIme { get; set; }
        public int OtherTimeID { get; set; }
        public string TotalOtherTime { get; set; }
        public string TotalOfficeTime { get; set; }
        public string TotalLunchTime { get; set; }
        public string TotalBreakTime { get; set; }
        public string TotalWorkingTime { get; set; }
        public int TotalWorksheetHours { get; set; }
        public bool IsInOffice { get; set; }
        public bool IsInBreak { get; set; }
        public bool IsInLunch { get; set; }
        public bool IsInMeeting { get; set; }
        public bool IsInOfficeWork { get; set; }
        public string Days { get; set; }
        public string ImportRemarks { get; set; }
        public string EmployeeCode { get; set; }
        public string MMDDYYYY_DateFormat { get; set; }


        public string Month { get; set; }
        public string Year { get; set; }

        public bool IsChecked { get; set; }


        public DateTime ForWhichDate { get; set; }
        public string DaysCount { get; set; }
        public string Remarks { get; set; }
        public int UploadedBy { get; set; }
        public DateTime UploadedDateTime { get; set; }

    }
    public class AttendanceReportParam
    {
        public Boolean cbMissingEntry { get; set; }
        public Boolean cbDeduction { get; set; }
        public Boolean rdbDate { get; set; }
        public Boolean rdbmonth { get; set; }
        public Int32 ddlemp { get; set; }
    }
    public class SelectedEmp
    {
        public int id { get; set; }
        public string employee_name { get; set; }
    }
    
    public static class AttendanceReportConstatnts
    {
        /// <summary>
        /// Database table name constant.
        /// </summary>

        public const string const_Table_Organization = "Organization";
        public const string const_Table_Employee_Employee_Master = "Employee_Master";
        public const string const_Table_Employee_CompanyMaster = "CompanyMaster";

        public const string const_Table_FinancialYear = "FinancialYear";
        public const string const_Table_SalaryDeductionDetail = "SalaryDeductionDetail";
        public const string const_Table_AttendanceTransaction = "AttendanceTransaction";
        public const string const_Table_TransactionChange = "TransactionChange";
        public const string const_Table_TransactionLog = "TransactionLog";
        /// <summary>
        /// Database table field Name Constants.
        /// </summary>

        public const string const_Field_Id = "Id";
        public const string const_Field_DepartmentName = "Department_Name";
        public const string const_Field_EmployeeName = "Employee_Name";
        public const string const_Field_CompanyName = "CompanyName";
        public const string const_Field_LineManager = "LineManager";
        public const string const_Field_mode = "mode";


        public const string const_Field_EmployeeID = "EmployeeID";
        public const string const_Field_EmployeeId = "EmployeeId";

        public const string const_FieldEmployeeName_ = "EmployeeName";
        public const string const_Field_Date = "fromDate";
        public const string const_Field_ToDate = "ToDate";
        public const string const_Field_InTimeID = "InTimeID";
        public const string const_Field_InTIme = "InTIme";
        public const string const_Field_OutTimeID = "OutTimeID";
        public const string const_Field_OutTIme = "OutTIme";
        public const string const_Field_LunchOutTimeID = "LunchOutTimeID";
        public const string const_Field_LunchOutTIme = "LunchOutTIme";
        public const string const_Field_LunchInTimeID = "LunchInTimeID";
        public const string const_Field_LunchInTIme = "LunchInTIme";
        public const string const_Field_OtherTimeID = "OtherTimeID";
        public const string const_Field_TotalOtherTime = "TotalOtherTime";
        public const string const_Field_TotalOfficeTime = "TotalOfficeTime";
        public const string const_Field_TotalLunchTime = "TotalLunchTime";
        public const string const_Field_TotalBreakTime = "TotalBreakTime";
        public const string const_Field_TotalWorkingTime = "TotalWorkingTime";
        public const string const_Field_TotalWorksheetHours = "TotalWorksheetHours";
        public const string const_Field_IsInOffice = "IsInOffice";
        public const string const_Field_IsInBreak = "IsInBreak";
        public const string const_Field_IsInLunch = "IsInLunch";
        public const string const_Field_IsInMeeting = "IsInMeeting";
        public const string const_Field_IsInOfficeWork = "IsInOfficeWork";
        public const string const_Field_Days = "Days";
        public const string const_Field_ImportRemarks = "ImportRemarks";
        public const string const_Field_EmployeeCode = "EmployeeCode";
        public const string const_Field_MMDDYYYY_DateFormat = "MMDDYYYY_DateFormat";
        public const string const_Field_IsActive = "IsActive";

        public const string const_Field_Month = "Month";
        public const string const_Field_Year = "Year";


        public const string const_Field_LongLeave = "LongLeaveDays";
        public const string const_Field_startdate = "StartDate";


        public const string const_Field_ForWhichDate = "ForWhichDate";
        public const string const_Field_DaysCount = "DaysCount";
        public const string const_Field_Remarks = "Remarks";
        public const string const_Field_UploadedBy = "UploadedBy";
        public const string const_Field_UploadedDateTime = "UploadedDateTime";

        public const string const_Field_LeaveDate = "LeaveDate";
        public const string const_Field_fromDate = "Date";

        public const string const_Field_EntryType = "Entry_Type";
        public const string const_Field_Time = "Time";
        public const string const_Field_grace = "grace";
        public const string const_Field_actualEntryTime = "actualEntryTime";

        public const string const_Field_Transaction_Id = "Transaction_Id";
        public const string const_Field_Bit_Approved = "Bit_Approved";
        public const string const_Field_HOD_Remarks = "HOD_Remarks";
        public const string const_Field_Entry_Time = "Entry_Time";

        public const string const_Field_empId = "empId";
        public const string const_Field_InId = "InId";
        public const string const_Field_OutId = "OutId";
        public const string const_Field_LunchOutId = "LunchOutId";
        public const string const_Field_LunchInId = "LunchInId";
        public const string const_Field_OtherId = "OtherId";
        public const string const_Field_Employee_ID = "Employee_Id";
        public const string const_Field_employeeIds = "employeeIds";

        public const string const_Field_Attendance_TransactionId = "Attendance_TransactionId";
        public const string const_Field_ChangeType = "ChangeType";
        public const string const_Field_UserId = "UserId";
        public const string const_Field_ChangeTime = "ChangeTime";
        public const string const_Field_DepartmentId = "DepartmentId";
        public const string const_Field_CompanyId = "CompanyId";
        public const string const_Field_LineMId = "LineMId";

        /// <summary>
        /// Database Procedure and fucntion constants.
        /// </summary>
        public const string const_procAttendanceReport_Add = "";
        public const string const_procAttendanceReport_Update = "";
        public const string const_procAttendanceReport_ActiveInActive = "";
        public const string const_procAttendanceReport_SelectAll = "ProcAttendanceReportBindDropdown";
        public const string const_procAttendanceReport_SelectBaseNonBase = "";
        public const string const_procAttendanceReport_SelectById = "ProcGetAttendanceData";
        public const string const_ProcAttendanceReport_AttendanceApproval = "procreportRecordUpdate";
        public const string const_ProcAttendanceReport_CalLeaveNWD_Days = "ProcAttendanceReport_CalLeaveDetails";
        public const string const_ProcAttendanceReport_SalaryDeduction = "ProcAttendance_Report";
        public const string const_ProcAttendanceReport_BindFinalDetails = "ProcCalTotalAttendanceReport";
        public const string const_ProcAttendanceReport_DailyentrytimingAddEdit = "Proc_DailyentrytimingAddEdit";
        public const string const_ProcAttendanceReport_Procattendance_transaction = "Procattendance_transaction";
        public const string const_ProcAttendanceReport_Proc_TransactionLog = "Proc_TransactionLog";
        public const string const_ProcAttendanceReport_Proc_TransactionChange = "Proc_TransactionChange";
    }

}
