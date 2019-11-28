using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VIS_Domain;

namespace VIS_Domain.Master.VacancyRelated
{
    public class TechnologyMaster : VISBaseEntity
    {
        /// <summary>
        /// TechnologyMaster Entity Fields. 
        /// </summary>
        public string TechnologyName { get; set; }
        public string Remarks { get; set; }
        public bool Major { get; set; }
        
    }

    public static class TechnologyMasterConstants
    {
        /// <summary>
        /// Database table name constant.
        /// </summary>
        public const string const_Table_TechnologyMaster = "TechnologyMaster";

        /// <summary>
        /// Database table field Name Constants.
        /// </summary>
        public const string const_Field_TechnologyName = "TechnologyName";
        public const string const_Field_Remarks = "Remarks";
        public const string const_Field_Major = "Major";

        /// <summary>
        /// Database Procedure and fucntion constants.
        /// </summary>
        public const string const_procTechnologyMaster_Add = "procTechnologyMaster_Add";
        public const string const_procTechnologyMaster_Update = "procTechnologyMaster_Update";
        public const string const_procTechnologyMaster_ActiveInActive = "procTechnologyMaster_ActiveInActive";
        public const string const_procTechnologyMaster_SelectAll = "procTechnologyMaster_SelectAll";
        public const string const_procTechnologyMaster_SelectBaseNonBase = "procTechnologyMaster_SelectBaseNonBase";
        public const string const_procTechnologyMaster_SelectById = "procTechnologyMaster_SelectById";

    }
}
