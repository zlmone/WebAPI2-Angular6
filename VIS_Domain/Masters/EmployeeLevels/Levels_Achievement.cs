using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VIS_Domain.Masters.EmployeeLevels
{
    public class Levels_Achievement : VISBaseEntity
    {
        public string AchievementName { get; set; }
        public int SetUpID { get; set; }
        public Boolean IsCriteria { get; set; }
        public Boolean AndAbove { get; set; }
        public string Description { get; set; }
        public string Help { get; set; }
        public string Calculated { get; set; }
        public int AchievedIn { get; set; }
        public int Points { get; set; }
        public string Image { get; set; }
        public Boolean Active { get; set; }
        public int LevelSetupId { get; set; }

        public string CriteriaName { get; set; }
        public string CalculatedIn { get; set; }
        public string SelectActive { get; set; }
        public string Range { get; set; }
        public int CriteriaId { get; set; }


    }
    public static class Levels_AchievementConstants
    {
        /// <summary>
        /// Database table name constant.
        /// </summary>
        public const string const_Table_Levels_Achievement = "Levels_Achievement";

        /// <summary>
        /// Database table field Name Constants.
        /// </summary>
        public const string const_Field_AchievementName = "AchievementName";
        public const string const_Field_SetUpID = "SetUpID";
        public const string const_Field_IsCriteria = "IsCriteria";
        public const string const_Field_AndAbove = "AndAbove";
        public const string const_Field_Description = "Description";
        public const string const_Field_Help = "Help";
        public const string const_Field_Calculated = "Calculated";
        public const string const_Field_AchievedIn = "AchievedIn";
        public const string const_Field_Points = "Points";
        public const string const_Field_Image = "Image";
        public const string const_Field_Active = "Active";
        public const string const_Field_LevelSetupId = "LevelSetupId";
        public const string const_Field_Value = "Value";
        public const string const_Field_CriteriaId = "CriteriaId";
        public const string const_Field_Range = "Range";
        public const string const_Field_CriteiaId = "CriteriaId";

        /// <summary>
        /// Database Procedure and fucntion constants.
        /// </summary>
        public const string const_procLevels_Achievement_Add = "procLevels_Achievement_Add";
        public const string const_procLevels_Achievement_Update = "procLevels_Achievement_Update";
        public const string const_procLevels_Achievement_ActiveInActive = "procLevels_Achievement_ActiveInActive";
        public const string const_procLevels_Achievement_SelectAll = "procLevels_Achievement_SelectAll";
        public const string const_procLevels_Achievement_SelectBaseNonBase = "procLevels_Achievement_SelectBaseNonBase";
        public const string const_procLevels_Achievement_SelectById = "procLevels_Achievement_SelectById";
        public const string const_procLevels_Achievement_IsCriteria = "Levels_GetCriteriaSetUpList";
        public const string const_procLevels_Achievement_GetLevelSetupId = "procGetLevelSetupId";
        public const string const_procLevels_Achievement_OnEdit = "procLevels_Achievement_OnEdit";
        
    }
}
