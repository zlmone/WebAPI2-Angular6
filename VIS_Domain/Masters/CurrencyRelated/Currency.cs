using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VIS_Domain;

namespace VIS_Domain.Master.CurrencyRelated
{
    public class Currency : VISBaseEntity
    {
        /// <summary>
        /// Currency Entity Fields. 
        /// </summary>
        public string Full_Name { get; set; }
        public string Short_Name { get; set; }
        public string Sub_Unit { get; set; }
        public string Symbol { get; set; }
        public bool Is_Base_Currency { get; set; }
        public string Default_Exchange { get; set; }
    }

    public static class CurrencyConstants
    {
        /// <summary>
        /// Database table name constant.
        /// </summary>
        public const string const_Table_Currency = "Currency";

        /// <summary>
        /// Database table field Name Constants.
        /// </summary>
        public const string const_Field_Full_Name = "Full_Name";
        public const string const_Field_Short_Name = "Short_Name";
        public const string const_Field_Sub_Unit = "Sub_Unit";
        public const string const_Field_Symbol = "Symbol";
        public const string const_Field_Is_Base_Currency = "Is_Base_Currency";
        public const string const_Field_Default_Exchange = "Default_Exchange";

        /// <summary>
        /// Database Procedure and fucntion constants.
        /// </summary>
        public const string const_procCurrency_Add = "procCurrency_Add";
        public const string const_procCurrency_Update = "procCurrency_Update";
        public const string const_procCurrency_ActiveInActive = "procCurrency_ActiveInActive";
        public const string const_procCurrency_SelectAll = "procCurrency_SelectAll";
        public const string const_procCurrency_SelectBaseNonBase = "procCurrency_SelectBaseNonBase";
        public const string const_procCurrency_SelectById = "procCurrency_SelectById";
        
    }
}
