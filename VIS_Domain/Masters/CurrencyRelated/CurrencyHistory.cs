using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VIS_Domain;

namespace VIS_Domain.Master.CurrencyRelated
{
    public class CurrencyHistory : VISBaseEntity
    {
        /// <summary>
        /// CurrencyHistory Entity Fields. 
        /// </summary>
        public Int64 Currency_Id { get; set; }
        public double Default_Exch_Rate { get; set; }
        public double Current_Exch_Rate { get; set; }
        public int Month_Entered { get; set; }
        public int Year_Entered { get; set; }
        public DateTime Date_Entered { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }

    }

    public static class CurrencyHistoryConstants
    {
        /// <summary>
        /// Database table name constant.
        /// </summary>
        public const string const_Table_Currency = "CurrencyHistory";

        /// <summary>
        /// Database table field Name Constants.
        /// </summary>
        public const string const_Field_Currency_Id = "Currency_Id";
        public const string const_Field_Default_Exch_Rate = "Default_Exch_Rate";
        public const string const_Field_Current_Exch_Rate = "Current_Exch_Rate";
        public const string const_Field_Month_Entered = "Month_Entered";
        public const string const_Field_Year_Entered = "Year_Entered";
        public const string const_Field_Date_Entered = "Date_Entered";
        public const string const_Field_FromDate = "FromDate";
        public const string const_Field_ToDate = "ToDate";

        /// <summary>
        /// Database Procedure and fucntion constants.
        /// </summary>
        public const string const_procCurrencyHistory_Add = "procCurrencyHistory_Add";
        public const string const_procCurrencyHistory_Update = "procCurrencyHistory_Update";
        public const string const_procCurrencyHistory_ActiveInActive = "procCurrencyHistory_ActiveInActive";
        public const string procCurrencyHistory_SelectAll = "procCurrencyHistory_SelectAll";
        public const string procCurrencyHistory_SelectById = "procCurrencyHistory_SelectById";

    }
}
