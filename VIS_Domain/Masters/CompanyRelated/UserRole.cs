using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VIS_Domain;

namespace VIS_Domain.Master.CompanyRelated
{
    public class UserRole : VISBaseEntity
    {
        /// <summary>
        /// UserRole Entity Fields. 
        /// </summary>
        /// 

        public string Name { get; set; }
        public string Type { get; set; }
        public string FullName { get; set; }


    }

    public static class UserRoleConstant
    {
        /// <summary>
        /// Database table name constant.
        /// </summary>

        public const string const_UserRole_Table = "UserRole";

        /// <summary>
        /// Database table field Name Constants.
        /// </summary>
        public const string const_Name = "Name";
        public const string const_Type = "Type";
        public const string const_FullName = "FullName";
        /// <summary>
        /// Database Procedure and fucntion constants.
        /// </summary>
        public const string const_procUserRole_Add = "procUserRole_Add";
        public const string const_procUserRole_Update = "procUserRole_Update";
        public const string const_procUserRole_ActiveInActive = "procUserRole_ActiveInActive";
        public const string const_procUserRole_SelectAll = "procUserRole_SelectAll";
        public const string const_procUserRole_SelectById = "procUserRole_SelectById";

    }
}
