using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VIS_Domain;

namespace VIS_Domain.Master.Configuration
{
    // model For Bind Data 

    public class EmployeeScreenCaptureReport : VISBaseEntity
    {
        public string EmployeeName { get; set; }
        public string AllowScreenCapture { get; set; }
        public string AttendanceStatus { get; set; }
        public int Counts { get; set; }
        public DateTime Date { get; set; }
        public string PunchIn { get; set; }
        public string PunchOut { get; set; }
        public string Timming { get; set; }
    }

    // model For Send Parameter
    public class EmployeeScreenCaptureParamterModel
    {
        public int EmployeeId { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public string OrderBy { get; set; }
        public int LoginUserId { get; set; }
        public string FromMonth { get; set; }
        public string FromYear { get; set; }
        public string ToMonth { get; set; }
        public string ToYear { get; set; }
        public bool MonthWise { get; set; }

    }

    public static class EmployeeScreenCaptureReportConstant
    {

        // Constance For Parameter

        public const string const_EmployeeId = "employeeId";
        public const string const_FromDate = "fromDate";
        public const string const_ToDate = "toDate";
        public const string const_OrderBy = "orderBy";
        public const string const_LoginUserId = "LoginUserId";
        
        // Constance For Store Procedure

        public const string const_procEmployee_ScreenCaptureReport = "procEmployee_ScreenCaptureReport";
        public const string const_procFinancialYear_SelectAll = "procGetYear";

    }

   
}
