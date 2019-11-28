using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VIS_Domain;

namespace VIS_Domain.Master.CompanyRelated
{
    public class SalaryBreakupType : VISBaseEntity
    {
        /// <summary>
        /// SalaryBreakupType Entity Fields. 
        /// </summary>
        /// 

        public string Name { get; set; }
        public string Type { get; set; }
        public string FullName { get; set; }


    }

    public static class SalaryBreakupTypeConstant
    {
        /// <summary>
        /// Database table name constant.
        /// </summary>

        public const string const_SalaryBreakupType_Table = "SalaryBreakupType";

        /// <summary>
        /// Database table field Name Constants.
        /// </summary>
        public const string const_Name = "Name";
        public const string const_Type = "Type";
        public const string const_FullName = "FullName";
        /// <summary>
        /// Database Procedure and fucntion constants.
        /// </summary>
        public const string const_procSalaryBreakupType_Add = "procSalaryBreakupType_Add";
        public const string const_procSalaryBreakupType_Update = "procSalaryBreakupType_Update";
        public const string const_procSalaryBreakupType_ActiveInActive = "procSalaryBreakupType_ActiveInActive";
        public const string const_procSalaryBreakupType_SelectAll = "procSalaryBreakupType_SelectAll";
        public const string const_procSalaryBreakupType_SelectById = "procSalaryBreakupType_SelectById";

    }
}
