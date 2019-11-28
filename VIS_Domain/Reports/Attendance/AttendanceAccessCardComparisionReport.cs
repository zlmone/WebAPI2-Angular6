using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VIS_Domain;

namespace VIS_Domain.Master.Configuration
{
    // model For Bind Data 

    public class AttendanceAccessCardComparisionReport : VISBaseEntity
    {
        public string EmployeeCode { get; set; }
        public string Employee_Name { get; set; }
        public DateTime Date { get; set; }
        public string LineManager { get; set; }
        public int Grace { get; set; }
        public string Grade { get; set; }
        public string Status { get; set; }
        public DateTime PunchInVIS { get; set; }
        public DateTime PunchInAC { get; set; }
        public DateTime PunchOutVIS { get; set; }
        public DateTime PunchOutAC { get; set; }
        public string MAC { get; set; }
        public string IP { get; set; }
        public string TimeofFirstScreenShot { get; set; }
        public string TimeofLastScreenShot { get; set; }
        public string PunchInIssue { get; set; }
        public string PunchOutIssue { get; set; }
    }

    // model For Send Parameter
    public class AttendanceAccessCardComparisionReportParameterModel
    {
        public int EmployeeId { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public string IssueOnly { get; set; }
        public string Search { get; set; }
        public int LoginUserId { get; set; }
        public string FromMonth { get; set; }
        public string FromYear { get; set; }
        public string ToMonth { get; set; }
        public string ToYear { get; set; }
        public bool MonthWise { get; set; }
    }

    public static class AttendanceAccessCardComparisionReportConstant
    {

        // Constance For Parameter

        public const string const_EmployeeId = "empId";
        public const string const_FromDate = "fromDate";
        public const string const_ToDate = "toDate";
        public const string const_IssueOnly = "issueOnly";
        public const string const_Search = "search";
        public const string const_LoginUserId = "LoginUserId";

        // Constance For Store Procedure

        public const string const_procAccessCardEntry_Report = "procAccessCardEntry_Report";
        public const string const_ProcAttendanceReportBindDropdown = "ProcAttendanceReportBindDropdown";
        public const string const_procFinancialYear_SelectAll = "procGetYear";

    }


}
