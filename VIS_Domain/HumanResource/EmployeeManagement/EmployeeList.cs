using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VIS_Domain.HumanResource.EmployeeManagement
{
    public class EmployeeList : VISBaseEntity
    {
        public string mode { get; set; }
        public Int64  UserId { get; set; }
        public string Usertype { get; set; }
        public string EmployeeCode { get; set; }
        public string CompanyName { get; set; }
        public string Employee_Name { get; set; }
        public string Email { get; set; }
        public string Department { get; set; }
        public string TotalExp { get; set; }
        public DateTime JoiningDate { get; set; }
        public DateTime RelevingDate { get; set; }
        public Int64 Grace { get; set; }
        public string SL_CL { get; set; }
    }
    public static class EmployeeListConstants
    {


        public const string const_Table_EmployeeFeedback = "Employee_Master";

        public const string const_Field_mode = "mode";
        public const string const_Field_UserId = "UserId";
        public const string const_Field_Usertype = "Usertype";
     
        public const string const_Field_EmployeeCode = "EmployeeCode";
        public const string const_Field_CompanyName = "CompanyName";
        public const string const_Field_Employee_Name = "Employee_Name";
        public const string const_Field_Email = "Email";
        public const string const_Field_Department = "Department";
        public const string const_Field_TotalExp = "TotalExp";
        public const string const_Field_joiningDate = "JoiningDate"; 
        public const string const_Field_RelevingDate = "RelevingDate";
        public const string const_Field_Grace = "Grace";
        public const string const_Field_SL_CL = "SL_CL";

        /// <summary>
        /// Database Procedure and fucntion constants.
        /// </summary>
        /// 

        public const string const_procgetEmployeeRecordActive = "procgetEmployeeRecordActive";
        public const string const_procgetEmployeeRecordAll = "procgetEmployeeRecordAll";
        public const string const_procgetEmployeeRecorInActive = "procgetEmployeeRecorInActive";
        public const string const_procSelectListDeleteEmployeelist = "procSelectListDeleteEmployeelist";
        public const string const_procDeleteEmployeelist = "procDeleteEmployeelist";

        public const string const_procEmployeemodeActive = "procEmployeemodeActive";
        public const string const_procEmployeemodeAll = "procEmployeemodeAll";
        public const string const_procEmployeemodeInActive = "procEmployeemodeInActive";
    }
}
