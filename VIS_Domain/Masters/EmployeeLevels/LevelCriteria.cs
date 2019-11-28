using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VIS_Domain.Masters.EmployeeLevels
{
   public class LevelCriteria:VISBaseEntity
    {
        public string Name { get; set; }
        public string AliasName { get; set; }
        public int calculatedOnID { get; set; }
        public int CategoryID { get; set; }
        public Boolean IsAutomatic { get; set; }
        public Boolean Active { get; set; }
        public string reference { get; set; }
       
    }
    public static class LevelCriteriaConstants
    {
        /// <summary>
        /// Database table name constant.
        /// </summary>
        public const string const_Table_LevelCriteria = "LevelCriteria";

        /// <summary>
        /// Database table field Name Constants.
        /// </summary>
        public const string const_Field_Name = "Name";
        public const string const_Field_AliasName = "AliasName";
        public const string const_Field_calculatedOnID = "calculatedOnID";
        public const string const_Field_CategoryID = "CategoryID";
        public const string const_Field_IsAutomatic = "IsAutomatic";
        public const string const_Field_Active = "Active";
        public const string const_Field_reference = "reference";

        /// <summary>
        /// Database Procedure and fucntion constants.
        /// </summary>
        public const string const_procLevelCriteria_Add = "procLevelCriterias_Add";
        public const string const_procLevelCriteria_Update = "procLevelCriterias_Update";
        public const string const_procLevelCriteria_ActiveInActive = "procLevelCriteria_ActiveInActive";
        public const string const_procLevelCriteria_SelectAll = "procLevelCriterias_SelectAll";
        public const string const_procLevelCriteria_SelectBaseNonBase = "procLevelCriterias_SelectBaseNonBase";
        public const string const_procLevelCriteria_SelectById = "procLevelCriterias_SelectById";

    }
}
