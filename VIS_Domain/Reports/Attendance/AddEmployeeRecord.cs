using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VIS_Domain.Reports.Attendance
{
    public class AddEmployeeRecord :VISBaseEntity
    {
        
    }
    public class EmployeeMaster
    {
        public Int64 Id { get; set; }
        public string Employee_Name { get; set; }
    }
    
    public class BindEmployeeDetails
    {
        public Int64 Id { get; set; }
        public string Employee_Name { get; set; }
        public Int64 Transaction_Id { get; set; }
        public string Entry_Type { get; set; }
        public string Remarks { get; set; }
        public string Entry_Time { get; set; }
        public string forWhichDate { get; set; }
        public string actualEntryTime { get; set; }
        public Int64 grace { get; set; }
    }
    public class BindHRAttendanceDetails
    {
        public string HRInTime { get; set; }
        public string HROutTime { get; set; }
        public string Grace { get; set; }
        public string Grade { get; set; }
    }
    public static class AddEmployeeRecordConstant 
    {

        //--- Constant For Parameter
        public const string const_Mode = "mode";
        public const string const_empId = "empId";
        public const string const_forWhichDate = "forWhichDate";
        public const string const_LoginUserId = "LoginUserId";

        public const string const_EmployeeID = "EmployeeID";
        public const string const_Date = "Date";
        public const string const_EntryType = "EntryType";
        public const string const_Remarks = "Remarks";
        public const string const_Entry_Time = "Entry_Time";
        public const string const_actualEntryTime = "actualEntryTime";
        public const string const_grace = "grace";
        public const string const_createdBy = "createdBy";

        public const string const_Id = "Id";
        public const string const_StrDate = "StrDate";
        public const string const_Employee_Id = "Employee_Id";
        public const string const_Entry_Type = "Entry_Type";


        //--- Constant For Store Procedure
        public const string const_procGeneralSP = "Proc_GeneralSP";
        public const string const_procReportPerEmp = "procReportPerEmp";
        public const string const_ProcCalTotalAttendanceReport = "ProcCalTotalAttendanceReport";
        public const string const_Proc_HRAttendanceDetail = "Proc_HRAttendanceDetail";
        public const string const_Proc_updateTransaction = "Proc_updateTransaction";
        public const string const_Procattendance_transaction = "Procattendance_transaction";
    }


}
