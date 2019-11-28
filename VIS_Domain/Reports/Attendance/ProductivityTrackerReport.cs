using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VIS_Domain.Reports.Attendance
{
    public class ProductivityTrackerReport:VISBaseEntity
    {

    }

    public class FillDP
    {
        public Int64 Id { get; set; }
        public string Department_Name { get; set; }
    }

    public class EmployeeList
    {
        public Int64 ID { get; set; }
        public string EmployeeName { get; set; }
    }
    public class LineManager
    {
        public Int64 Id { get; set; }
        public string EmployeeName { get; set; }
    }
    public class Lookup
    {
        public Int64 Id { get; set; }
        public string name { get; set; }
    }
    public class YearData
    {
        public Int64 Id { get; set; }
        public string Year { get; set; }
    }
    public class ProductivityTracker
    {
        public string EntryType { get; set; }
        public string Difference { get; set; }
        public string Employeename { get; set; }
        public string ForWhichDate { get; set; }
        public string OutTime { get; set; }
        public string InTime { get; set; }
    }
    public static class ProductivityTrackerReportConstants
    {
        /// <summary>
        /// Database table name constant.
        /// </summary>

        public const string const_Table_Organization = "Organization";

        /// <summary>
        /// Database table field Name Constants.
        /// </summary>

        public const string const_Field_Id = "Id";
        public const string const_Field_DepartmentName = "Department_Name";
        public const string const_Field_Mode = "mode";
        public const string const_Field_Allow = "Allow";
        public const string const_Field_empid = "empid";
        public const string Const_Field_InActive = "isActive";
        public const string Const_Field_UserId = "UserId";
        public const string Const_Field_Allow = "Allow";

        public const string Const_Field_sort = "sort";
        public const string Const_Field_fromDate = "fromDate";
        public const string Const_Field_toDate = "toDate";
        public const string Const_Field_Duration = "Duration";
        public const string Const_Field_Employeelist = "Employeelist";
        public const string Const_Field_OutType = "OutType";
        public const string Const_Field_Consolidate = "Consolidate";
        public const string Const_Field_Out = "Out";
        /// <summary>
        /// Database Procedure and fucntion constants.
        /// </summary>

        public const string const_procAttendanceReportNew_SelectAll = "ProcAttendanceReportBindDropdown";
        public const string const_procGetEmployeeForOutReport = "procGetEmployeeForOutReport";
        public const string const_ProcAttendanceReportBindDropdown = "ProcAttendanceReportBindDropdown";
        public const string const_Proc_productivityTracker = "Proc_productivityTracker";
    }
}
