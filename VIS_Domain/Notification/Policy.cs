using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VIS_Domain.Notification
{
    public class Policy : VISBaseEntity
    {
        /// <summary>
        /// Policy Entity Fields. 
        /// </summary>
        public string Policy_Name { get; set; }
        public string Description { get; set; }
        public bool IsNewPolicy { get; set; }
    }

    public static class PolicyConstants
    {
        /// <summary>
        /// Database table name constant.
        /// </summary>
        public const string const_Table_Policy = "Policy";

        /// <summary>
        /// Database table field Name Constants.
        /// </summary>
        public const string const_Field_Policy_Name = "Policy_Name";
        public const string const_Field_Description = "Description";
        public const string const_Field_IsNewPolicy = "IsNewPolicy";
        

        /// <summary>
        /// Database Procedure and fucntion constants.
        /// </summary>
        public const string const_procPolicy_Add = "procPolicy_Add";
        public const string const_procPolicy_Update = "procPolicy_Update";
        public const string const_procPolicy_ActiveInActive = "procPolicy_ActiveInActive";
        public const string const_procPolicy_SelectAll = "procPolicy_SelectAll";
        public const string const_procPolicy_SelectById = "procPolicy_SelectById";
        public const string const_procPolicy_View = "procPolicy_View";
    }
}
