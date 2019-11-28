using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VIS_Domain.HumanResource.ProfileAttendance
{
    public class ProfileAttend : VISBaseEntity
    {
        //public ChangePassword ChangePasswordData { get; set; }
        /// <summary>
        /// ProfileAttendance Entity Fields. 
        /// </summary>
        public String VISUsername { get; set; }
        public String VISPassword { get; set; }
        public String NewPassword { get; set; }
        public  String ConfirmNewPassword { get; set; }
        //public String Employee_Name { get; set; }
        //public String Password { get; set; }
        //public String Email { get; set; }
        //public String In_Mon_Fri { get; set; }
        //public String Out_Mon_Fri { get; set; }
        //public String In_Sat { get; set; }
        //public String Out_Sat { get; set; }
        //public int Grace { get; set; }
        //public bool Active { get; set; }
        //public String userType { get; set; }
        //public DateTime joiningDate { get; set; }
        //public DateTime relevingDate { get; set; }
        //public Decimal totalCL { get; set; }
        //public Decimal totalSL { get; set; }
        //public int additionalRights { get; set; }
        //public bool validForLogin { get; set; }
        //public int leaveApproveBy { get; set; }
        //public String employeeCode { get; set; }
        //public DateTime probationTill { get; set; }
        //public int ActivityId { get; set; }
        //public bool Gender { get; set; }
        //public bool IsConfirmed { get; set; }
        //public int JoiningSalary { get; set; }
        //public String PhotographFileName { get; set; }
        //public int SalaryAfterRevision { get; set; }
        //public bool IsSLASigned { get; set; }
        //public DateTime ConfirmationDate { get; set; }
        //public DateTime AppraisalDate { get; set; }
        //public bool IsAppraisalRequired { get; set; }
        //public int SLAYear { get; set; }
        //public String FirstName { get; set; }
        //public String MiddleName { get; set; }
        //public String LastName { get; set; }
        //public int JoiningDesignation { get; set; }
        //public String Technology { get; set; }
        //public bool IsPasswordChange { get; set; }
        //public String OtherTechnology { get; set; }
        //public int SalaryRangeId { get; set; }
        //public int LineManagerId { get; set; }
        //public int TotalCOff { get; set; }
        //public int enrollnumber { get; set; }
        //public bool AllowScreenCapture { get; set; }
        //public bool ActiveDashboard { get; set; }
        //public bool IsSwitchUser { get; set; }
        //public int WorkingLocation { get; set; }
        //public String WorkingLocationAddress { get; set; }
        //public int Education { get; set; }
        //public String CommunicationID { get; set; }
        //public int SatGrace { get; set; }
        //public bool IsWebAccess { get; set; }
        //public String OtherRemark { get; set; }
        //public bool WorksheetThruWeb { get; set; }
        //public bool IsWorksheetFill { get; set; }
        //public float CL { get; set; }
        //public float SL { get; set; }
        //public bool IsjoiningLeave { get; set; }
        //public bool IsConfirmationLeave { get; set; }
        //public int EmployeeGradeID { get; set; }
        //public bool IsResigned { get; set; }
        //public bool isMailAlert { get; set; }
        //public bool IsAllowMouseMovement { get; set; }
        //public int accessCardId { get; set; }

        //public DateTime CreatedDateTime { get; set; }

        //public DateTime UpdatedDateTime { get; set; }
        //public bool IsMouseTracking { get; set; }
        //public bool IsScreenCaptureRemarks { get; set; }
        //public bool IsHost { get; set; }
        //public bool IsProductivityTracker { get; set; }
        //public bool WorkFromHome { get; set; }
        //public String attendancePolicy { get; set; }
        //public bool IsHostForEmpMaster { get; set; }
        //public DateTime ResignedDate { get; set; }

    }

    public static class ProfileAttendanceConstants
    {
        /// <summary>
        /// Database table name constant.
        /// </summary>
        public const string const_Table_VISUser = "VISUser";
        //public const string const_Table_Employee_Master = "Employee_Master";

        /// <summary>
        /// Database table field Name Constants.
        /// </summary>
        public const string const_Field_Id = "Id";
        public const string const_Field_VISUsername = "VISUsername";
        public const string const_Field_VISPassword = "VISPassword";
        public const string const_Field_NewPassword = "NewPassword";
        public const string const_Field_ConfirmNewPassword = "ConfirmNewPassword";
        //public const string const_Field_Employee_Name = "Employee_Name";
        //public const string const_Field_Password = "Password";
        //public const string const_Field_Email = "Email";
        //public const string const_Field_In_Mon_Fri = "In_Mon_Fri";
        //public const string const_Field_Out_Mon_Fri = "Out_Mon_Fri";
        //public const string const_Field_In_Sat = "In_Sat";
        //public const string const_Field_Out_Sat = "Out_Sat";
        //public const string const_Field_Grace = "Grace";
        //public const string const_Field_Active = "Active";
        //public const string const_Field_userType = "userType";
        //public const string const_Field_joiningDate = "joiningDate";
        //public const string const_Field_relevingDate = "relevingDate";
        //public const string const_Field_totalCL = "totalCL";
        //public const string const_Field_totalSL = "totalSL";
        //public const string const_Field_additionalRights = "additionalRights";
        //public const string const_Field_validForLogin = "validForLogin";
        //public const string const_Field_leaveApproveBy = "leaveApproveBy";
        //public const string const_Field_employeeCode = "employeeCode";
        //public const string const_Field_probationTill = "probationTill";
        //public const string const_Field_ActivityId = "ActivityId";

        //public const string const_Field_CompanyId = "CompanyId";

        //public const string const_Field_Gender = "Gender";
        //public const string const_Field_IsConfirmed = "IsConfirmed";
        //public const string const_Field_JoiningSalary = "JoiningSalary";
        //public const string const_Field_PhotographFileName = "PhotographFileName";
        //public const string const_Field_SalaryAfterRevision = "SalaryAfterRevision";
        //public const string const_Field_IsSLASigned = "IsSLASigned";
        //public const string const_Field_ConfirmationDate = "ConfirmationDate";
        //public const string const_Field_AppraisalDate = "AppraisalDate";
        //public const string const_Field_IsAppraisalRequired = "IsAppraisalRequired";
        //public const string const_Field_SLAYear = "SLAYear";
        //public const string const_Field_FirstName = "FirstName";
        //public const string const_Field_MiddleName = "MiddleName";
        //public const string const_Field_LastName = "LastName";
        //public const string const_Field_JoiningDesignation = "JoiningDesignation";
        //public const string const_Field_Technology = "Technology";
        //public const string const_Field_IsPasswordChange = "IsPasswordChange";
        //public const string const_Field_OtherTechnology = "OtherTechnology";
        //public const string const_Field_SalaryRangeId = "SalaryRangeId";
        //public const string const_Field_LineManagerId = "LineManagerId";
        //public const string const_Field_TotalCOff = "TotalCOff";
        //public const string const_Field_enrollnumber = "enrollnumber";
        //public const string const_Field_AllowScreenCapture = "AllowScreenCapture";
        //public const string const_Field_ActiveDashboard = "ActiveDashboard";
        //public const string const_Field_IsSwitchUser = "IsSwitchUser";
        //public const string const_Field_WorkingLocation = "WorkingLocation";

        //public const string const_Field_WorkingLocationAddress = "WorkingLocationAddress";
        //public const string const_Field_Education = "Education";
        //public const string const_Field_CommunicationID = "CommunicationID";
        //public const string const_Field_SatGrace = "SatGrace";
        //public const string const_Field_IsWebAccess = "IsWebAccess";
        //public const string const_Field_OtherRemark = "OtherRemark";
        //public const string const_Field_WorksheetThruWeb = "WorksheetThruWeb";
        //public const string const_Field_IsWorksheetFill = "IsWorksheetFill";
        //public const string const_Field_CL = "CL";
        //public const string const_Field_SL = "SL";
        //public const string const_Field_IsjoiningLeave = "IsjoiningLeave";
        //public const string const_Field_IsConfirmationLeave = "IsConfirmationLeave";
        //public const string const_Field_EmployeeGradeID = "EmployeeGradeID";
        //public const string const_Field_IsResigned = "IsResigned"; 
        //public const string const_Field_isMailAlert = "isMailAlert";
        //public const string const_Field_IsAllowMouseMovement = "IsAllowMouseMovement";
        //public const string const_Field_accessCardId = "accessCardId";

        //public const string const_Field_CreatedDateTime = "CreatedDateTime";
        //public const string const_Field_UpdatedDateTime = "UpdatedDateTime";
        //public const string const_Field_IsMouseTracking = "IsMouseTracking";
        //public const string const_Field_IsScreenCaptureRemarks = "IsScreenCaptureRemarks";
        //public const string const_Field_IsHost = "IsHost";
        //public const string const_Field_IsProductivityTracker = "IsProductivityTracker";
        //public const string const_Field_WorkFromHome = "WorkFromHome";
        //public const string const_Field_attendancePolicy = "attendancePolicy";
        //public const string const_Field_IsHostForEmpMaster = "IsHostForEmpMaster";
        //public const string const_Field_ResignedDate = "ResignedDate";
        /// <summary>
        /// Database Procedure and fucntion constants.
        /// </summary>

        public const string const_procProfileAttendance_Add = "";
        public const string const_procProfileAttendance_Update = "";
        public const string const_procProfileAttendance_ActiveInActive = "";
        public const string const_procProfileAttendance_SelectAll = "";
        public const string const_procProfileAttendance_SelectBaseNonBase = "";
        public const string const_procProfileAttendance_SelectById = "";
        public const string const_procProfileAttendance_ChangePassword = "ProcChangePSW";

        
    }
}
