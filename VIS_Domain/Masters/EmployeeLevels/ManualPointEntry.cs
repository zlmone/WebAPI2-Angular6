using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VIS_Domain;

namespace VIS_Domain.Master.EmployeeManualPointEntry
{
    public class ManualPointEntry : VISBaseEntity
    {
        /// <summary>
        /// ManualPointEntry Entity Fields. 
        /// </summary>
        public int GroupID { get; set; }
        public string EmpName { get; set; }
        public string Criteria { get; set; }
        public string Category { get; set; }
        public int Points { get; set; }
        public DateTime Month { get; set; }
        public string Remarks { get; set; }
        public long CriteriaId { get; set; }
        public Boolean IsPerformanceBadge{ get; set; }
        public long CategoryId { get; set; }
        public int Point { get; set; }
        public long EmpId { get; set; }
        public string Employee_name { get; set; }
        public string Type { get; set; }
        public DateTime ForDate { get; set; }
        public int Max { get; set; }
    }

    public static class ManualPointEntryConstants
    {
        /// <summary>
        /// Database table name constant.
        /// </summary>
        public const string const_Table_ManualPointEntry = "ManualPointEntry";

        /// <summary>
        /// Database table field Name Constants.
        /// </summary>
        public const string const_Field_GroupID = "GroupID";
        public const string const_Field_EmpName = "EmpName";
        public const string const_Field_Criteria = "Criteria";
        public const string const_Field_Points = "Points";
        public const string const_Field_Month = "Month";
        public const string const_Field_Remarks = "Remarks";
        public const string const_Field_CriteriaId = "CriteriaId";
        public const string const_Field_Max = "Max";



        /// <summary>
        /// Database Procedure and fucntion constants. 
        /// </summary>
        public const string const_procManualPointEntry_Add = "procManualPointEntry_Add";
        public const string const_procManualPointEntry_Update = "procManualPointEntry_Update";
        public const string const_procManualPointEntry_ActiveInActive = "procManualPointEntry_ActiveInActive";
        public const string const_procManualPointEntry_SelectAll = "procManualPointEntry_SelectAll";
        public const string const_procManualPointEntry_SelectById = "procManualPointEntry_SelectById";
        public const string const_procManualPointEntry_GetCriteria = "procGetCriteria";
        public const string const_procManualPointEntry_GetCategory = "procGetCategory";
        public const string const_procManualPointEntry_GetDataByCriteriaId = "procGetDataByCriteriaId";
        
        public const string const_procManualPointEntry_GetEmployeeById = "procGetEmployeeById";
        public const string const_procManualPointEntry_SelectEmployee = "procSelectMultipleEmployee";
        public const string const_procManualPointEntry_GetLevelCriteriaSetupByCriteriaId = "procGetLevelCriteriaSetupByCriteriaId";
        public const string const_procManualPointEntry_GetLevelCriteriaCriteriaId = "procGetLevelCriteriaByCriteriaId";
        public const string const_procSaveLevelsPointLog = "procSaveLevelsPointLog";
        public const string const_procGetMaxGroupId = "procGetMaxGroupId";
        public const string const_GetCriteriaFromSetupId = "procGetCriteriaFromSetupId";

    }
}
