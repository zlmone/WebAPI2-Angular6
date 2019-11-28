using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VIS_Domain;

namespace VIS_Domain.Master.Configuration
{
    public class DailyEntrysheetEmployee:VISBaseEntity
    {
        public string Employee_Name { get; set; }
        public string Date { get; set; }
        public string Entry_Type { get; set; }
        public string Entry_Time { get; set; }
        public string actualEntryTime { get; set; }
        public string Remarks { get; set; }
        public int Grace { get; set; }
        public Int64 Transaction_Id { get; set; }
    }

    public class DailyEntrysheetTime
    {
        public string TotalOfficeTime { get; set; }
        public string TotalWorkingTime { get; set; }
        public string TotalBreakTime { get; set; }
        public string TotalWorksheetHours { get; set; }

    }

    public class EmployeeMaster
    {
        public Int64 Id { get; set; }
        public string Employee_Name { get; set; }
    }

    public static class DailyEntrysheetConstant
    {
        public const string const_procReportPerEmp = "procReportPerEmp";
        public const string const_ProcCalTotalAttendanceReport = "ProcCalTotalAttendanceReport";
        public const string const_ProcCalTotalAttendanceReportAllEmployee = "ProcCalTotalAttendanceReportAllEmployee";
        public const string const_procEmployee_Master_SelectAll = "procEmployee_Master_SelectAll";
        public const string const_procreportRecordUpdate = "procreportRecordUpdate";
        

    }

    public static class DailyEntrysheetParamaterConstant
    {
        public const string const_Mode = "mode";
        public const string const_EmployeeId = "empid";
        public const string const_ForWhichDate = "forWhichDate";
        public const string const_LoginUserId = "LoginUserId";
        public const string const_EmployeeID = "EmployeeID";
        public const string const_Date = "Date";
        public const string const_Time = "Time";
        public const string const_actualEntryTime = "actualEntryTime";
        public const string const_Remarks = "Remarks";
        public const string const_grace = "grace";
    }
}
