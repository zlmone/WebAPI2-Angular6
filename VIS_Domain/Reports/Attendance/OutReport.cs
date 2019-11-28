using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VIS_Domain;

namespace VIS_Domain.Master.Configuration
{
    public class OutReport : VISBaseEntity
    {
        
        public string Employee_Name { get; set; }
        public string Department_Name { get; set; }
        public string CompanyName { get; set; }
        public string LineManager { get; set; }
        public string mode { get; set; }


        //-------BIND DATA Out Report Data -------//

        public int EmployeeId { get; set; }
        public int Active { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public string OutType { get; set; }
        public int Minute { get; set; }
        public bool AllDate { get; set; }
        public string Employeelist { get; set; }
        public string Consolidated { get; set; }
        public string Sort { get; set; }

    }

    public static class OutReportConstant
    {

        /// <summary>
        /// Database table name constant.
        /// </summary>

        public const string const_Table_Employee_Master = "Employee_Master";
        public const string const_Table_Attendance_Transaction = "Attendance_Transaction";
        public const string const_Table_Organization = "Organization";

        /// <summary>
        /// Database table field Name Constants.
        /// </summary>

        public const string const_Field_Id = "Id";
        public const string const_Field_DepartmentName = "Department_Name";
        public const string const_Field_EmployeeName = "Employee_Name";
        public const string const_Field_CompanyName = "CompanyName";
        public const string const_Field_LineManager = "LineManager";
        public const string const_Field_mode = "mode";
        public const string const_Field_LineManagerId = "LineManagerId";
        public const string const_Field_CompanyId = "CompanyId";
        public const string const_Field_ParentId = "ParentId";

        /// <summary>
        /// Database table field Name Constants.
        /// </summary>

        public const string const_Field_EmployeeId = "empId";
        public const string const_Field_Active = "active";
        public const string const_Field_FromDate = "fromDate";
        public const string const_Field_ToDate = "toDate";
        public const string const_Field_OutType = "outType";
        public const string const_Field_Minute = "Minute";
        public const string const_Field_AllDate = "AllDate";
        public const string const_Field_Employeelist = "employeelist";
        public const string const_Field_Consolidated = "Consolidated";
        public const string const_Field_Sort = "sort";


        // procedure Constant

        public const string const_procAttendanceReport_SelectAll = "ProcAttendanceReportBindDropdown";
        public const string const_ProcAttendanceReport_BindAttendanceData = "ProcCalTotalAttendanceReport";
        public const string const_procOutReport = "procOutReport";
        public const string const_procOutReportByLM = "procOutReportByLM";
        public const string const_procOutReportByCompany = "procOutReportByCompany";
        public const string const_procOutReportByDepartment = "procOutReportByDepartment";


    }
}
