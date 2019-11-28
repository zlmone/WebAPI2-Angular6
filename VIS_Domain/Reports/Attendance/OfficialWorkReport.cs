using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VIS_Domain.Reports.Attendance
{
    // model For Send Parameter
    public class OfficialWorkReportParamterModel
    {
        public string Mode { get; set; }
        public Int64 EmployeeId { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public string ReportSort { get; set; }
        public int Sort { get; set; }
        public Int64 UserId { get; set; }
        public string UserType { get; set; }


        public string FromMonth { get; set; }
        public string FromYear { get; set; }
        public string ToMonth { get; set; }
        public string ToYear { get; set; }
        public bool MonthWise { get; set; }

    }

    // model for Bind Data
    public class OfficialWorkReport : VISBaseEntity
    {
        public string Employee_Name { get; set; }
        public string Date { get; set; }
        public string OutTime { get; set; }
        public string InTime { get; set; }
        public string Total_Time { get; set; }
        public string Out_Remark { get; set; }
        public string In_Remark { get; set; }
        public string Line_Manager { get; set; }
        public string ApprovalSentTo { get; set; }
        public string Status { get; set; }
        public string ActionBy { get; set; }
        public string Action_DateTime { get; set; }
    }

    public static class OfficialWorkReportConstant
    {

        // Constance For Parameter

        public const string const_Mode = "Mode";
        public const string const_EmployeeId = "EmployeeId";
        public const string const_FromDate = "FromDate";
        public const string const_ToDate = "ToDate";
        public const string const_ReportSort = "ReportSort";
        public const string const_Sort = "Sort";
        public const string const_UserId = "UserId";
        public const string const_UserType = "UserType";


        // Constance For Store Procedure

        public const string const_ProcAttendanceReportBindDropdown = "ProcAttendanceReportBindDropdown";
        public const string const_procFinancialYear_SelectAll = "procGetYear";
        public const string const_procUSP_OfficeWorkInOut = "procUSP_OfficeWorkInOut";


    }
}
