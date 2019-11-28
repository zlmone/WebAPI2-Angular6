using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VIS_Domain;

namespace VIS_Domain.UserManagement
{
    public class AttendanceEntry : VISBaseEntity
    {
        //Attendance Entry

        public int Employee_Id { get; set; }
        public int Entry_Type { get; set; }
        public string Remarks { get; set; }
        public DateTime Entry_Time { get; set; }
        public string Date { get; set; }
        public string actualEntryTime { get; set; }
        public int grace { get; set; }
        public string macID { get; set; }
        public DateTime forWhichDate { get; set; }
        public string ipAddress { get; set; }
        public string source { get; set; }
        public Boolean isApproved { get; set; }
        public Int64 groupId { get; set; }
        public string attendancePolicy { get; set; }
        public int Grade { get; set; }
        public string ImportRemarks { get; set; }
        public string Days { get; set; }
        public int forWhichEntryType { get; set; }


        //AttendanceEntry Get

        public string Employee_Name { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string In_Mon_Fri { get; set; }
        public string Out_Mon_Fri { get; set; }
        public string In_Sat { get; set; }
        public string Out_Sat { get; set; }
        public int Grace { get; set; }
        public Boolean Active { get; set; }
        public string userType { get; set; }
        public DateTime joiningDate { get; set; }
        public DateTime relevingDate { get; set; }
        public Decimal totalCL { get; set; }
        public Decimal totalSL { get; set; }
        public int additionalRights { get; set; }
        public Boolean validForLogin { get; set; }
        public int leaveApproveBy { get; set; }
        public string employeeCode { get; set; }
        public DateTime probationTill { get; set; }
        public int ActivityId { get; set; }
        
        public Boolean Gender { get; set; }
        public Boolean IsConfirmed { get; set; }
        public int JoiningSalary { get; set; }
        public string PhotographFileName { get; set; }
        public int SalaryAfterRevision { get; set; }
        public Boolean IsSLASigned { get; set; }
        public DateTime ConfirmationDate { get; set; }
        public DateTime AppraisalDate { get; set; }
        public Boolean IsAppraisalRequired { get; set; }
        public int SLAYear { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public int JoiningDesignation { get; set; }
        public string Technology { get; set; }
        public Boolean IsPasswordChange { get; set; }
        public string OtherTechnology { get; set; }
        public int SalaryRangeId { get; set; }

        public int LineManagerId { get; set; }
        public int TotalCOff { get; set; }
        public int enrollnumber { get; set; }
        public Boolean AllowScreenCapture { get; set; }
        public Boolean ActiveDashboard { get; set; }
        public Boolean IsSwitchUser { get; set; }
        public int WorkingLocation { get; set; }
        public string WorkingLocationAddress { get; set; }
        public int Education { get; set; }
        public string CommunicationID { get; set; }
        public int SatGrace { get; set; }
        public Boolean IsWebAccess { get; set; }
        public string OtherRemark { get; set; }
        public Boolean WorksheetThruWeb { get; set; }
        public Boolean IsWorksheetFill { get; set; }
        public float CL { get; set; }
        public float SL { get; set; }
        public Boolean IsjoiningLeave { get; set; }
        public Boolean IsConfirmationLeave { get; set; }
        public int EmployeeGradeID { get; set; }
        public Boolean IsResigned { get; set; }
        public Boolean isMailAlert { get; set; }
        public Boolean IsAllowMouseMovement { get; set; }
        public int accessCardId { get; set; }
        
        public DateTime CreatedDateTime { get; set; }
        
        public DateTime UpdatedDateTime { get; set; }
        public Boolean IsMouseTracking { get; set; }
        public Boolean IsScreenCaptureRemarks { get; set; }
        public Boolean IsHost { get; set; }
        public Boolean IsProductivityTracker { get; set; }
        public Boolean WorkFromHome { get; set; }
        
        public DateTime IsHostForEmpMaster { get; set; }
        public DateTime ResignedDate { get; set; }
    }

    public static class AttendanceEntryConstants 
    {
        /// Database table name constant.
        ///

        public const string const_Table_Currency = "Attendance_Transaction";

        /// Database table field Name Constants.
        /// 

        public const string const_Field_Employee_Id = "Employee_Id";
        public const string const_Field_Entry_Type = "Entry_Type";
        public const string const_Field_Remarks = "Remarks";
        public const string const_Field_Entry_Time = "Entry_Time";
        public const string const_Field_Date = "Date";
        public const string const_Field_actualEntryTime = "actualEntryTime";
        public const string const_Field_grace = "grace";
        public const string const_Field_macID = "macID";
        public const string const_Field_forWhichDate = "forWhichDate";
        public const string const_Field_ipAddress = "ipAddress";
        public const string const_Field_source = "source";
        public const string const_Field_mouseMovement = "mouseMovement";
        public const string const_Field_isApproved = "isApproved";
        public const string const_Field_groupId = "groupId";
        public const string const_Field_attendancePolicy = "attendancePolicy";
        public const string const_Field_Grade = "Grade";
        public const string const_Field_ImportRemarks = "ImportRemarks";
        public const string const_Field_Days = "Days";
        public const string const_Field_forWhichEntryType = "forWhichEntryType";

        public const string const_Field_Mode = "mode";


        /// Database Procedure and fucntion constants.
        /// 

        public const string const_procAttendanceEntry_Add = "Procattendance_transaction";
        public const string const_procAttendanceEntry_Update = "";
        public const string const_procAttendanceEntry_SelectAll = "ProcPunchOutOnNextDays";
        public const string const_procAttendanceEntry_SelectBaseNonBase = "";
        public const string const_procAttendanceEntry_SelectById = "";

        public const string const_procAttendanceEntry_GetTimer = "ProcLevels_GetAttendance";
        //public const string const_procAttendanceEntry_GetTimer = "ProcLevels_GetAttendance_Timer";
        public const string const_procAttendanceEntry_GetAttendanceEntryType = "procAttendanceEntryType";
        public const string const_procAttendanceEntry_GetCommonConfiguration = "procCommonConfiguration_SelectAll";
        public const string const_procAttendanceEntry_GetPointCounts = "ProcLevels_GetProgressiveDetails";
    }
}
