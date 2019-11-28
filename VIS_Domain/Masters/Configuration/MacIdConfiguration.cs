using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VIS_Domain;

namespace VIS_Domain.Master.Configuration
{
    public class MacIdConfiguration : VISBaseEntity
    {
        /// <summary>
        /// MacIdConfiguration Entity Fields. 
        /// </summary>
        /// 
        public int EmployeeId { get; set; }
        public string Employee_Name { get; set; }
        public string MacID { get; set; }
        public string IPAddress { get; set; }
        public DateTime RequestedDate { get; set; }
        public DateTime ApprovalDate { get; set; }
        public string ApprovedBy { get; set; }
        public string Version { get; set; }
        public bool Active { get; set; }
        public bool OfficeMacId { get; set; }
        public string Description { get; set; }


    }

    public static class MacIdConfigurationConstant
    {
        /// <summary>
        /// Database table name constant.
        /// </summary>

        public const string const_Employee_MACRegister_Table = "Employee_MACRegister";

        /// <summary>
        /// Database table field Name Constants.
        /// </summary>
        public const string const_EmployeeId = "EmployeeId";
        public const string const_Employee_Name = "Employee_Name";
        public const string const_MacID = "MacID";
        public const string const_IPAddress = "IPAddress";
        public const string const_RequestedDate = "RequestedDate";
        public const string const_ApprovalDate = "ApprovalDate";
        public const string const_ApprovedBy = "ApprovedBy";
        public const string const_Version = "Version";
        public const string const_Active = "Active";
        public const string const_OfficeMacId = "OfficeMacId";
        public const string const_Description = "Description";


        /// <summary>
        /// Database Procedure and fucntion constants.
        /// </summary>
        public const string const_procEmployee_MacRegisteration_Add = "procEmployee_MacRegisteration_Add";
        public const string const_procEmployee_MacRegisteration_Update = "procEmployee_MacRegisteration_Update";
        public const string const_procEmployee_MacRegisteration_ActiveInActive = "procEmployee_MacRegisteration_ActiveInActive";
        public const string const_procEmployee_MACRegister_SelectAll = "procEmployee_MacRegisteration_SelectAll";
        public const string const_procEmployee_MACRegister_SelectById = "procEmployee_MacRegisteration_SelectById";
        public const string const_procEmployee_Master_SelectAll = "procEmployee_Master_SelectAll";
        public const string const_procEmployee_MacRegisteration_ActivateDeactivate = "procEmployee_MacRegisteration_ActivateDeactivate";

    }
}
