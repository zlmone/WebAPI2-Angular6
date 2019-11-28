using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VIS_Domain.HumanResource.Attendance
{
    public class EmployeeFeedback : VISBaseEntity
    {
        public Int64 Id { get; set; }
        public string mode { get; set; }
        public Int64 UserId { get; set; }
        public string Remarks { get; set; }
        public bool IsLike { get; set; }
        public string EmployeeName { get; set; }
        public string SenderName { get ;set;}
        public Int64 EmployeeId { get; set; }
        public string Employee_Name { get; set; }
        public Int64 TeamEmployeeId { get; set; }

    }
    public static class EmployeeFeedbackConstants
    {


        public const string const_Table_EmployeeFeedback = "EmployeeFeedback";


        public const string const_Field_Id = "Id";
        public const string const_Field_mode = "mode";
        public const string const_Field_UserId = "UserId";
        public const string const_Field_Remarks = "Remarks";
        public const string const_Field_IsLike = "IsLike"; 
        public const string const_Field_EmployeeName = "EmployeeName";
        public const string const_Field_Employee_Name = "Employee_Name";
        public const string const_Field_EmployeeId = "EmployeeId";
        public const string const_Field_SenderName = "SenderName";
        public const string const_Field_TeamEmployeeId = "TeamEmployeeId";

        /// <summary>
        /// Database Procedure and fucntion constants.
        /// </summary>
        /// 

        public const string const_procEmployeeFeedbackDetailUser = "procEmployeeFeedbackDetailUser";
        public const string const_procEmployeeFeedbackTeamWiseLm = "procEmployeeFeedbackTeamWiseLm";
        public const string const_procEmployeeFeedbackPending = "procEmployeeFeedbackPending";
        public const string const_procEmployeeFeedbackAction = "procEmployeeFeedbackAction";
        public const string const_procTeamMemberlist = "procTeamMemberlist";
    }
}
