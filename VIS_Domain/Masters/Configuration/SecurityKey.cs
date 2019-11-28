using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VIS_Domain;

namespace VIS_Domain.Master.Configuration
{
    public class SecurityKey : VISBaseEntity
    {
        /// <summary>
        /// SecurityKey Entity Fields. 
        /// </summary>
        /// 

        public string Key1 { get; set; }
        public string Key2 { get; set; }
        public string Key3 { get; set; }
        public string Key4 { get; set; }
        public string Key5 { get; set; }
        public bool Active { get; set; }
        public string UniqueKey { get; set; }

    }

    public static class SecurityKeyConstant
    {
        /// <summary>
        /// Database table name constant.
        /// </summary>

        public const string const_SecurityKey_Table = "SecurityKey";

        /// <summary>
        /// Database table field Name Constants.
        /// </summary>
        public const string const_Key1 = "Key1";
        public const string const_Key2 = "Key2";
        public const string const_Key3 = "Key3";
        public const string const_Key4 = "Key4";
        public const string const_Key5 = "Key5";
        public const string const_Active = "Active";
        public const string const_UniqueKey = "UniqueKey";



        /// <summary>
        /// Database Procedure and fucntion constants.
        /// </summary>
        public const string const_procSecurityKey_Add = "procSecurityKey_Add";
        public const string const_procSecurityKey_Update = "procSecurityKey_Update";
        public const string const_procSecurityKey_ActiveInActive = "procSecurityKey_ActiveInActive";
        public const string const_procSecurityKey_SelectAll = "procSecurityKey_SelectAll";
        public const string const_procSecurityKey_SelectById = "procSecurityKey_SelectById";

    }
}
