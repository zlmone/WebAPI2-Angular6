using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VIS_Domain;

namespace VIS_Domain.Master.CompanyRelated
{
    public class GroupName : VISBaseEntity
    {
        /// <summary>
        /// GroupName Entity Fields. 
        /// </summary>
        /// 
        public string GroupNames { get; set; }

    }

    public static class GroupNameConstant
    {
        /// <summary>
        /// Database table name constant.
        /// </summary>

        public const string const_GroupName_Table = "GroupName";

        /// <summary>
        /// Database table field Name Constants.
        /// </summary>
        public const string const_GroupNames = "GroupNames";

        /// <summary>
        /// Database Procedure and fucntion constants.
        /// </summary>
        public const string const_procGroupName_Add = "procGroupName_Add";
        public const string const_procGroupName_Update = "procGroupName_Update";
        public const string const_procGroupName_ActiveInActive = "procGroupName_ActiveInActive";
        public const string const_procGroupName_SelectAll = "procGroupName_SelectAll";
        public const string const_procGroupName_SelectById = "procGroupName_SelectById";

    }
}
