using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VIS_Domain.Masters.EmployeeLevelCriteriaSetup
{
    public class LevelCriteriaSetup : VISBaseEntity
    {
        public long CriteriaID { get; set; }
        public string AliasName { get; set; }
        public int CalculatedOnID { get; set; }
        public int CategoryID { get; set; }
        public Boolean IsAutomatic { get; set; }
        public Boolean Active { get; set; }
        public string reference { get; set; }
        public Boolean IsRange { get; set; }
        public decimal FromLimit { get; set; }
        public decimal ToLimit { get; set; }
        public Boolean IsRepeated { get; set; }
        public decimal Units { get; set; }
        public Boolean IsOnce { get; set; }
        public Boolean IsPerformanceBased { get; set; }

        public Boolean IsPercentage { get; set; }
        public int Point { get; set; }

        public Boolean IsProgressive { get; set; }
        public int ProgressiveDays { get; set; }
        public int ProgressivePoints { get; set; }

        public string Category { get; set; }
        public string Name { get; set; }
        public string CriteriaType { get; set; }
        public string CalculatedOn { get; set; }
        public int SelectPoint { get; set; }

        public Boolean rbAutomatic { get; set; }
        public Boolean rbManual { get; set; }
        public Boolean rbRange { get; set; }
        public Boolean rbRepeated { get; set; }
        public Boolean rbOnce { get; set; }
        public Boolean rbPerformanceBasedType { get; set; }
        public Boolean rbManualType { get; set; }
        public Boolean rbEnabledYes { get; set; }
        public Boolean rbEnabledNo { get; set; }
        public Boolean rbProgressiveYes { get; set; }
        public Boolean rbProgressiveNo { get; set; }
        public Boolean rbCSYes { get; set; }
        public Boolean rbCSNo { get; set; }

        public string ArbCriteriaType { get; set; }
        public string ArbSubType { get; set; }
        public string ArbManualType { get; set; }
        public string ArbIsProgressive { get; set; }
        public string ArbCascading { get; set; }



        public DateTime dtFromDate { get; set; }
        public DateTime dtToDate { get; set; }
        public Boolean bBothYes { get; set; }
        public Boolean bBothNo { get; set; }
        public Boolean bFromYes { get; set; }
        public Boolean bToYes { get; set; }
        public long CriteriaId { get; set; }//for manual point entry



        //public string ArbAutomatic { get; set; }
        //public string ArbManual { get; set; }
        //public string ArbRange { get; set; }
        //public string ArbRepeated { get; set; }
        //public string ArbOnce { get; set; }
        //public string ArbPerformanceBasedType { get; set; }
        //public string ArbManualType { get; set; }
        //public string ArbEnabledYes { get; set; }
        //public string ArbEnabledNo { get; set; }
        //public string ArbProgressiveYes { get; set; }
        //public string ArbProgressiveNo { get; set; }


    }
    public static class LevelCriteriaSetupConstants
    {
        /// <summary>
        /// Database table name constant.
        /// </summary>
        public const string const_Table_LevelCriteriaSetup = "LevelCriteriaSetup";

        /// <summary>
        /// Database table field Name Constants.
        /// </summary>
        public const string const_Field_CriteriaID = "CriteriaID";
        public const string const_Field_IsRange = "IsRange";
        public const string const_Field_FromLimit = "FromLimit";
        public const string const_Field_ToLimit = "ToLimit";
        public const string const_Field_IsRepeated = "IsRepeated";
        public const string const_Field_Units = "Units";
        public const string const_Field_IsOnce = "IsOnce";
        public const string const_Field_IsPerformanceBadge = "IsPerformanceBadge";
        public const string const_Field_IsPercentage = "IsPercentage";
        public const string const_Field_Point = "Point";
        public const string const_Field_Active = "Active";
        public const string const_Field_IsProgressive = "IsProgressive";
        public const string const_Field_ProgressiveDays = "ProgressiveDays";
        public const string const_Field_ProgressivePoints = "ProgressivePoints";
        public const string const_Field_CalculatedOn = "CalculatedOn";
        public const string const_Field_FromDate = "dtFromDate";
        public const string const_Field_ToDate = "dtToDate";

        public const string const_Field_bBothYes = "bBothYes";
        public const string const_Field_bBothNo = "bBothNo";
        public const string const_Field_bFromYes = "bFromYes";
        public const string const_Field_bToYes = "bToYes";

        public const string const_Field_CriteriaId = "CriteriaId";//for manual point entry


        /// <summary>
        /// Database table name constant.
        /// </summary>
        public const string const_Table_LevelCriteria = "LevelCriteria";

        /// <summary>
        /// Database table field Name Constants.
        /// </summary>
        public const string const_Field_Name = "Name";
        public const string const_Field_AliasName = "AliasName";
        public const string const_Field_CalculatedOnID = "CalculatedOnID";
        
        public const string const_Field_CategoryID = "CategoryID";
        public const string const_Field_IsAutomatic = "IsAutomatic";

        public const string const_Field_reference = "reference";
        public const string const_Field_iSetupID = "iSetupID";


        /// <summary>
        /// Database Procedure and fucntion constants. 
        /// </summary>
        public const string const_procLevelCriteriaSetup_Add = "procLevelCriteriaSetup_Add";
        public const string const_procLevelCriteriaSetup_Update = "procLevelCriteriaSetup_Update";
        public const string const_procLevelCriteriaSetup_ActiveInActive = "procLevelCriteriaSetup_ActiveInActive";
        public const string const_procLevelCriteriaSetup_SelectAll = "procLevelCriteriaSetup_SelectAll";
        public const string const_procLevelCriteriaSetup_SelectById = "procLevelCriteriaSetup_SelectById";
        public const string const_procLevelCriteriaSetup_ForSelectCriteria = "procSelectCriteria";
        public const string const_procLevelCriteriaSetup_ForSelectCalculatedOn = "procSelectCalculatedOn";
        public const string const_procLevelCriteriaSetup_ForSelectCategory = "procSelectCategory";
        public const string const_procLevelCriteriaSetup_LogEntry = "Levels_CascadingChange";

        public const string const_procLevelCriteriaSetup_GetSetupDetails = "procGetSetupDetails";
        public const string const_procLevelCriteriaSetup_GetCriteriaDetails = "procGetCriteriaDetails";
        public const string const_procLevelCriteriaSetup_AddCriteriaLevel = "proc_AddCriteriaLevel";

        public const string const_procManualPointEntry_GetDataByCriteriaId = "procGetDataByCriteriaId";//for manual point entry

    }
}