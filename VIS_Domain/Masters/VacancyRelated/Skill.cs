using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VIS_Domain;

namespace VIS_Domain.Master.VacancyRelated
{
    public class Skill : VISBaseEntity
    {
        /// <summary>
        /// Skill Entity Fields. 
        /// </summary>
        /// 
        public string SkillName { get; set; }
        public string Description { get; set; }
        public Int64 SkillGroupID { get; set; }
        public string SkillGroupName { get; set; }
        public string RatingGroup { get; set; }
        public bool Status { get; set; }
        public Int64[] Level { get; set; }

    }

    public class SkillViewModel : VISBaseEntity
    {
        /// <summary>
        /// Skill Entity Fields. 
        /// </summary>
        /// 
        public string SkillName { get; set; }
        public string Description { get; set; }
        public Int64 SkillGroupID { get; set; }
        public string SkillGroupName { get; set; }
        public string RatingGroup { get; set; }
        public bool Status { get; set; }
        public string Level { get; set; }

    }

    public static class SkillConstant
    {
        /// <summary>
        /// Database table name constant.
        /// </summary>

        public const string const_SkillGroup_Table = "SkillMaster";

        /// <summary>
        /// Database table field Name Constants.
        /// </summary>
        public const string const_SkillName = "SkillName";
        public const string const_Description = "Description";
        public const string const_SkillGroupId = "SkillGroupId";
        public const string const_Status = "Status";


        public const string const_SkillLevelText = "SkillLevelText";
        public const string const_SkillLevelOrder = "SkillLevelOrder";
        public const string const_SkillId = "SkillId";

        /// <summary>
        /// Database Procedure and fucntion constants.
        /// </summary>
        public const string const_procSkillMaster_Add = "procSkillMaster_Add";
        public const string const_procSkillMaster_Update = "procSkillMaster_Update";
        public const string const_procSkillMaster_ActiveInActive = "procSkillMaster_ActiveInActive";
        public const string const_procSkillMaster_SelectAll = "procSkillMaster_SelectAll";
        public const string const_procSkillMaster_SelectById = "procSkillMaster_SelectById";
        public const string const_procGetSkill = "procGetSkill";
        public const string const_procSkillMasterLevel_Add = "procSkillMasterLevel_Add";
        public const string const_procSkillMasterLevel_Delete = "procSkillMasterLevel_Delete";

    }
}
