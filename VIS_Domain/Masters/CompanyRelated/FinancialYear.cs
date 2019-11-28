using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VIS_Domain;

namespace VIS_Domain.Master.CompanyRelated
{
    public class FinancialYear : VISBaseEntity
    {
        /// <summary>
        /// FinancialYear Entity Fields. 
        /// </summary>        
        public string FromMonth { get; set; }
        public string ToMonth { get; set; }
        public string CurrentYear { get; set; }
        public string Nextyear { get; set; }
    
    }

    public static class FinancialYearConstants
    {
        /// <summary>
        /// Database table name constant.
        /// </summary>
        public const string const_Table_FinancialYear = "FinancialYear";

        /// <summary>
        /// Database table field Name Constants.
        /// </summary>
        public const string const_Field_FromMonth = "FromMonth";
        public const string const_Field_ToMonth = "ToMonth";
        public const string const_Field_CurrentYear = "CurrentYear";
        public const string const_Field_Nextyear = "Nextyear";
       
        /// <summary>
        /// Database Procedure and fucntion constants.
        /// </summary>
        public const string const_procFinancialYear_Add = "procFinancialYear_Add";
        public const string const_procFinancialYear_Update = "procFinancialYear_Update";
        public const string const_procFinancialYear_ActiveInActive = "procFinancialYear_ActiveInActive";
        public const string const_procFinancialYear_SelectAll = "procFinancialYear_SelectAll";
        public const string const_procFinancialYear_SelectBaseNonBase = "procFinancialYear_SelectBaseNonBase";
        public const string const_procFinancialYear_SelectById = "procFinancialYear_SelectById";

    }
}
