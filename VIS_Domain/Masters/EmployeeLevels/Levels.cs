using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VIS_Domain;

namespace VIS_Domain.Master.EmployeeLevels
{
    public class Levels : VISBaseEntity
    {
        /// <summary>
        /// Levels Entity Fields. 
        /// </summary>
        public int LevelNumber { get; set; }
        public string LevelName { get; set; }
        public string LevelIcon { get; set; }
        public int StartPoint { get; set; }
        public int EndPoint { get; set; }
    }

    public static class LevelsConstants
    {
        /// <summary>
        /// Database table name constant.
        /// </summary>
        public const string const_Table_Levels = "Levels";

        /// <summary>
        /// Database table field Name Constants.
        /// </summary>
        public const string const_Field_LevelNumber = "LevelNumber";
        public const string const_Field_LevelName = "LevelName";
        public const string const_Field_LevelIcon = "LevelIcon";
        public const string const_Field_StartPoint = "StartPoint";
        public const string const_Field_EndPoint = "EndPoint";
        

        /// <summary>
        /// Database Procedure and fucntion constants.
        /// </summary>
        public const string const_procLevels_Add = "procLevels_Add";
        public const string const_procLevels_Update = "procLevels_Update";
        public const string const_procLevels_ActiveInActive = "procLevels_ActiveInActive";
        public const string const_procLevels_SelectAll = "procLevels_SelectAll";
        public const string const_procLevels_SelectById = "procLevels_SelectById";

    }
}
