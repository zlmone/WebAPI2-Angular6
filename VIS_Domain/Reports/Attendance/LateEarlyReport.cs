using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VIS_Domain.Reports.Attendance
{
   public class LateEarlyReport
    {

       
    }
   
    public static class LateEarlyReportConstant
    {


        // Constance For Parameter 
        public const string const_Employee_Id = "Employee_Id";
        public const string const_Id = "Id";
        public const string const_mode = "mode";
        public const string const_FromDate = "FromDate";
        public const string const_ToDate = "ToDate";
        public const string const_Date = "Date";
        public const string const_Field_EntityMessage = "EntityMessage";

        // Constance For Store Procedure

        public const string const_ProcAttendanceReportBindDropdown = "ProcAttendanceReportBindDropdown";
        public const string const_procFinancialYear_SelectAll = "procGetYear";
        public const string const_procGetEmployeeId = "procGetEmployeeId";
        public const string const_ProcLevels_GetAttendance = "ProcLevels_GetAttendance";
        public const string const_ProcLevels_GetAttendanceForLateComing = "ProcLevels_GetAttendanceForLateComing";

    }
}

