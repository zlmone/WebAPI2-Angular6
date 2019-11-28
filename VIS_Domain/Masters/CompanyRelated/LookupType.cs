using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VIS_Domain;

namespace VIS_Domain.Master.CompanyRelated
{
    public class LookupType : VISBaseEntity
    {
        /// <summary>
        /// Lookuptype Entity Fields. 
        /// </summary>
        /// 
        public string TypeName { get; set; }

    }

    public static class LookupTypeConstant
    {
        /// <summary>
        /// Database table name constant.
        /// </summary>

        public const string const_LookupType_Table = "LookupType";

        /// <summary>
        /// Database table field Name Constants.
        /// </summary>
        public const string const_TypeName = "TypeName";

        /// <summary>
        /// Database Procedure and fucntion constants.
        /// </summary>
        public const string const_procLookupType_Add = "procLookupType_Add";
        public const string const_procLookupType_Update = "procLookupType_Update";
        public const string const_procLookupType_ActiveInActive = "procLookupType_ActiveInActive";
        public const string const_procLookupType_SelectAll = "procLookupType_SelectAll";
        public const string const_procLookupType_SelectById = "procLookupType_SelectById";

    }
}
