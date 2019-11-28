using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VIS_Domain;

namespace VIS_Domain.Master.Configuration
{
    public class ConfigureWorksheet : VISBaseEntity
    {
        /// <summary>
        /// ConfigureWorksheet Entity Fields. 
        /// </summary>
        /// 

        public int Fromm { get; set; }
        public int Too { get; set; }
        public string HexadecimalValue { get; set; }
        public string SrNo { get; set; }

    }

    public static class ConfigureWorksheetConstant
    {
        /// <summary>
        /// Database table name constant.
        /// </summary>

        public const string const_ConfigureWorksheet_Table = "ConfigureWorksheet";

        /// <summary>
        /// Database table field Name Constants.
        /// </summary>
        public const string const_Fromm = "Fromm";
        public const string const_Too = "Too";
        public const string const_HexadecimalValue = "HexadecimalValue";



        /// <summary>
        /// Database Procedure and fucntion constants.
        /// </summary>
        public const string const_procConfigureWorksheet_Add = "procConfigureWorksheet_Add";
        public const string const_procConfigureWorksheet_Update = "procConfigureWorksheet_Update";
        public const string const_procConfigureWorksheet_ActiveInActive = "procConfigureWorksheet_ActiveInActive";
        public const string const_procConfigureWorksheet_SelectAll = "procConfigureWorksheet_SelectAll";
        public const string const_procConfigureWorksheet_SelectById = "procConfigureWorksheet_SelectById";

    }
}
