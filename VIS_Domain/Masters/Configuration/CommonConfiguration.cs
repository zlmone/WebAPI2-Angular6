using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VIS_Domain;

namespace VIS_Domain.Master.Configuration
{
    public class CommonConfiguration : VISBaseEntity
    {
        /// <summary>
        /// CommonConfiguration Entity Fields. 
        /// </summary>
        /// 

        public string URLLocal { get; set; }
        public string URLLive { get; set; }
        public int MinimumLunchBreak { get; set; }
        public int MinimumOtherBreak { get; set; }
        public int MouseMinutes { get; set; }
        public int PlusMouseMinutes { get; set; }
        public int MouseTracking { get; set; }
        public int ProductivityTracker { get; set; }
        public int WorksheetPrompt { get; set; }
        public int MinimumPunchoutInterval { get; set; }
        public int InTimeMondayToFridayHH { get; set; }
        public int InTimeMondayToFridayMM { get; set; }
        public int OutTimeMondayToFridayHH { get; set; }
        public int OutTimeMondayToFridayMM { get; set; }
        public int InTimeSaturdayHH { get; set; }
        public int InTimeSaturdayMM { get; set; }
        public int OutTimeSaturdayHH { get; set; }
        public int OutTimeSaturdayMM { get; set; }
        public int ShiftDurationHH { get; set; }
        public int ShiftDurationMM { get; set; }
        public string TDSMenuHideOrShow { get; set; }
        public string RoleMenu { get; set; }

    }

    public static class CommonConfigurationConstant
    {
        /// <summary>
        /// Database table name constant.
        /// </summary>

        public const string const_CommonConfiguration_Table = "CommonConfiguration";

        /// <summary>
        /// Database table field Name Constants.
        /// </summary>
        public const string const_URLLocal = "URLLocal";
        public const string const_URLLive = "URLLive";
        public const string const_MinimumLunchBreak = "MinimumLunchBreak";
        public const string const_MinimumOtherBreak = "MinimumOtherBreak";
        public const string const_MouseMinutes = "MouseMinutes";
        public const string const_PlusMouseMinutes = "PlusMouseMinutes";
        public const string const_MouseTracking = "MouseTracking";
        public const string const_ProductivityTracker = "ProductivityTracker";
        public const string const_WorksheetPrompt = "WorksheetPrompt";
        public const string const_MinimumPunchoutInterval = "MinimumPunchoutInterval";
        public const string const_InTimeMondayToFridayHH = "InTimeMondayToFridayHH";
        public const string const_InTimeMondayToFridayMM = "InTimeMondayToFridayMM";
        public const string const_OutTimeMondayToFridayHH = "OutTimeMondayToFridayHH";
        public const string const_OutTimeMondayToFridayMM = "OutTimeMondayToFridayMM";
        public const string const_InTimeSaturdayHH = "InTimeSaturdayHH";
        public const string const_InTimeSaturdayMM = "InTimeSaturdayMM";
        public const string const_OutTimeSaturdayHH = "OutTimeSaturdayHH";
        public const string const_OutTimeSaturdayMM = "OutTimeSaturdayMM";
        public const string const_ShiftDurationHH = "ShiftDurationHH";
        public const string const_ShiftDurationMM = "ShiftDurationMM";
        public const string const_TDSMenuHideOrShow = "TDSMenuHideOrShow";
        public const string const_RoleMenu = "RoleMenu";

        /// <summary>
        /// Database Procedure and fucntion constants.
        /// </summary>
        /// 

        public const string const_procCommonConfiguration_Add = "procCommonConfiguration_Add";
        public const string const_procCommonConfiguration_Update = "procCommonConfiguration_Update";
        public const string const_procCommonConfiguration_SelectAll = "procCommonConfiguration_SelectAll";
        public const string const_procCommonConfiguration_SelectById = "procCommonConfiguration_SelectById";
        public const string const_procCommonConfiguration_ActiveInActive = "procCommonConfiguration_ActiveInActive";

    }
}
