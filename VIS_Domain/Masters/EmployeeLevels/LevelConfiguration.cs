using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VIS_Domain.Masters.EmployeeLevels
{
   public class LevelConfiguration : VISBaseEntity
    {
        public int Period { get; set; }
        public string PeriodName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public Boolean Active { get; set; }
        public Boolean IsCurrentPeriod { get; set; }

        public Int32 StartYear { get; set; }
        public Int32 StartMonth { get; set; }

    }
    public static class LevelConfigurationConstants
    {
        /// <summary>
        /// Database table name constant.
        /// </summary>
        public const string const_Table_LevelConfiguration = "LevelConfiguration";

        /// <summary>
        /// Database table field Name Constants.
        /// </summary>
        public const string const_Field_Period = "Period";
        public const string const_Field_PeriodName = "PeriodName";
        public const string const_Field_StartDate = "StartDate";
        public const string const_Field_EndDate = "EndDate";
        public const string const_Field_Active = "Active";
        public const string const_Field_IsCurrentPeriod = "IsCurrentPeriod";
        
        /// <summary>
        /// Database Procedure and fucntion constants.
        /// </summary>
        public const string const_procLevelConfigurations_Add = "procLevelConfigurations_Add";
        public const string const_procLevelConfigurations_Update = "procLevelConfigurations_Update";
        public const string const_procLevelConfigurations_ActiveInActive = "procLevelConfiguration_ActiveInActive";
        public const string const_procLevelConfigurations_SelectAll = "procLevelConfigurations_SelectAll";
        public const string const_procLevelConfigurations_SelectBaseNonBase = "procLevelConfigurations_SelectBaseNonBase";
        public const string const_procLevelConfigurations_SelectById = "procLevelConfigurations_SelectById";

    }
}
