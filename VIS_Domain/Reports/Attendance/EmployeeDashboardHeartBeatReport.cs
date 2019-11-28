using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VIS_Domain;

namespace VIS_Domain.Master.Configuration
{
    // model For Bind Data 

    public class EmployeeDashboardHeartBeatReport : VISBaseEntity
    {
        public string Employee_Name { get; set; }
        public DateTime Date { get; set; }
        public string OutTime { get; set; }
        public string InTime { get; set; }
        public string TotalTime { get; set; }
        public string Duration { get; set; }
    }

    // model For Send Parameter
    public class EmployeeDashboardHeartBeatReportParameterModel
    {
        public int EmployeeId { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public string ViewBy { get; set; }
        public string ConsolidateBy { get; set; }
        public string OrderBy { get; set; }
        public int LoginUserId { get; set; }
        public string FromMonth { get; set; }
        public string FromYear { get; set; }
        public string ToMonth { get; set; }
        public string ToYear { get; set; }
        public bool MonthWise { get; set; }
    }

    public static class EmployeeDashboardHeartBeatReportParameterModelConstant
    {

        // Constance For Parameter

        public const string const_EmployeeId = "employeeId";
        public const string const_FromDate = "fromDate";
        public const string const_ToDate = "toDate";
        public const string const_ViewBy = "viewBy";
        public const string const_ConsolidateBy = "consolidateBy";
        public const string const_OrderBy = "orderBy";
        public const string const_LoginUserId = "LoginUserId";

        // Constance For Store Procedure

        public const string const_procEmployee_DashboardHeartBeatReport = "procEmployee_DashboardHeartBeatReport";
        public const string const_ProcAttendanceReportBindDropdown = "ProcAttendanceReportBindDropdown";
        public const string const_procFinancialYear_SelectAll = "procGetYear";

    }


}
