using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VIS_Domain;

namespace VIS_Domain.Master.CompanyRelated
{
    public class LeaveType : VISBaseEntity
    {
        /// <summary>
        /// LeaveType Entity Fields. 
        /// </summary>
        /// 
        public string LeaveTypeName { get; set; }

    }

    public static class LeaveTypeConstant
    {
        /// <summary>
        /// Database table name constant.
        /// </summary>

        public const string const_LeaveType_Table = "LeaveType";

        /// <summary>
        /// Database table field Name Constants.
        /// </summary>
        public const string const_LeaveType = "LeaveTypeName";

        /// <summary>
        /// Database Procedure and fucntion constants.
        /// </summary>
        public const string const_procLeaveType_Add = "procLeaveType_Add";
        public const string const_procLeaveType_Update = "procLeaveType_Update";
        public const string const_procLeaveType_ActiveInActive = "procLeaveType_ActiveInActive";
        public const string const_procLeaveType_SelectAll = "procLeaveType_SelectAll";
        public const string const_procLeaveType_SelectById = "procLeaveType_SelectById";

    }
}
