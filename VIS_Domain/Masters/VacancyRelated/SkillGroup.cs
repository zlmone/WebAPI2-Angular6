using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VIS_Domain;

namespace VIS_Domain.Master.VacancyRelated
{
    public class SkillGroup : VISBaseEntity
    {
        /// <summary>
        /// SkillGroup Entity Fields. 
        /// </summary>
        /// 
        public Int64 SkillGroupID { get; set; }
        public string SkillGroupName { get; set; }
        public string RatingGroup { get; set; }


    }

    public static class SkillGroupConstant
    {
        /// <summary>
        /// Database table name constant.
        /// </summary>

        public const string const_SkillGroup_Table = "SkillGroup";

        /// <summary>
        /// Database table field Name Constants.
        /// </summary>
        public const string  const_SkillGroupID = "SkillGroupID";
        public const string const_SkillGroupName = "SkillGroupName";
        public const string const_RatingGroup = "RatingGroup";

        /// <summary>
        /// Database Procedure and fucntion constants.
        /// </summary>
        public const string const_procSkillGroup_Add = "procSkillGroup_Add";
        public const string const_procSkillGroup_Update = "procSkillGroup_Update";
        public const string const_procSkillGroup_ActiveInActive = "procSkillGroup_ActiveInActive";
        public const string const_procSkillGroup_SelectAll = "procSkillGroup_SelectAll";
        public const string const_procSkillGroup_SelectById = "procSkillGroup_SelectById";

    }
}
