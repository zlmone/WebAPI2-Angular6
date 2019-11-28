using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VIS_Domain.Masters.EmployeeLevels
{
    public class LevelsPointLog
    {
        public int Id { get; set; }
        public long EmployeeID { get; set; }
        public long SetupID { get; set; }
        public DateTime Date { get; set; }
        public int Points { get; set; }
        public int GroupID { get; set; }
        public string Remarks { get; set; }
        public int Count { get; set; }
        public Boolean IsActive { get; set; }
    }

    public static class LevelsPointLogConstants
    {
        /// <summary>
        /// Database table name constant.
        /// </summary>
        public const string const_Table_ManualPointEntry = "";

        /// <summary>
        /// Database table field Name Constants.
        /// </summary>
        public const string const_Field_EmployeeID = "EmployeeID";
        public const string const_Field_SetupID = "SetupID";
        public const string const_Field_Date = "Date";
        public const string const_Field_Points = "Points";
        public const string const_Field_GroupID = "GroupID";
        public const string const_Field_Remarks = "Remarks";
        public const string const_Field_Count = "Count";
        public const string const_Field_IsActive = "IsActive";



        /// <summary>
        /// Database Procedure and fucntion constants. 
        /// </summary>

        //public const string const_procSaveLevelsPointLog = "procSaveLevelsPointLog";

    }
}
