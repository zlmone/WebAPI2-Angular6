using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VIS_Domain.Reports.Attendance;

namespace VIS_Domain.Reports.Attendance
{
    class AttendanceReportNew :VISBaseEntity
    {

    }

    public class FillDepartment
    {
        public Int64 Id { get; set; }
        public string Department_name { get; set; }
    }
    public class FillEmployee 
    {
        public Int64 Id { get; set; }
        public string Employee_Name { get; set; }
    }
    public class FillCompany 
    {
        public Int64 Id { get; set; }
        public string CompanyName { get; set; }
    }
    public class FillLineManager 
    {
        public Int64 Id { get; set; }
        public string EmployeeName { get; set; }
    }
    public class FillUserType 
    {
        public Int64 Id { get; set; }
        public string UserType { get; set; }
    }

    public static class AttendanceReportNewConstatnts
    {
        /// <summary>
        /// Database table name constant.
        /// </summary>
        
        public const string const_Table_Organization = "Organization";
        public const string const_Table_Employee_Master = "Employee_Master";

        /// <summary>
        /// Database table field Name Constants.
        /// </summary>

        public const string const_Field_Id = "Id";
        public const string const_Field_DepartmentName = "Department_Name";
        public const string const_Field_Mode = "mode";
        public const string const_Field_Allow = "Allow";
        public const string const_Field_UserId = "UserId";


        public const string const_Field_modeId = "modeId";
        public const string const_Field_fromDate = "fromDate";
        public const string const_Field_toDate = "toDate";
        public const string const_Field_SortBy = "SortBy";
        public const string const_Field_LongLeaveValue = "LongLeaveValue";
        public const string const_Field_isAdmin = "isAdmin"; 

        /// <summary>
        /// Database Procedure and fucntion constants.
        /// </summary>

        public const string const_procAttendanceReportNew_Add = "";
        public const string const_procAttendanceReportNew_Update = "";
        public const string const_procAttendanceReportNew_ActiveInActive = "";
        public const string const_procAttendanceReportNew_SelectAll = "ProcAttendanceReportBindDropdown";
        public const string const_procAttendanceReportNew_SelectBaseNonBase = "";
        public const string const_procAttendanceReportNew_SelectById = "";

        public const string const_Proc_EmployeeDetail = "Proc_EmployeeDetail";
        public const string const_ProcAttendanceReport_rdlc = "ProcAttendanceReport_rdlc";
        public const string const_Proc_AttendanceReport = "Proc_AttendanceReport";

    }
}
