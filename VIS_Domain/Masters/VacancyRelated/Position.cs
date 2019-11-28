using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VIS_Domain;

namespace VIS_Domain.Master.VacancyRelated
{
    public class Position : VISBaseEntity
    {
        /// <summary>
        /// Position Entity Fields. 
        /// </summary>
        /// 
        public string PositionName { get; set; }
        public string Remarks { get; set; }
        public bool Status { get; set; }
        public Int64[] SkillId { get; set; }
        public string SkillName { get; set; }
    }

    public class SkillViewList
    {
        public Int64 PositionId { get; set; }
        public Int64 SkillId { get; set; }
        public string SkillName { get; set; }
    }

    public class PositionViewModel
    {
        public Int64 Id { get; set; }
        public string PositionName { get; set; }
        public string Remarks { get; set; }
        public bool Status { get; set; }
        public bool IsActive { get; set; }
        public Int64 SkillId { get; set; }
        public string SkillName { get; set; }
        public string SkillsId { get; set; }
    }

    public class SkillList
    {
        public Int64 id { get; set; }
        public string name { get; set; }
    }


    public static class PositionConstant
    {
        /// <summary>
        /// Database table name constant.
        /// </summary>

        public const string const_PositionMaster_Table = "PositionMaster";

        /// <summary>
        /// Database table field Name Constants.
        /// </summary>
        public const string const_PositionName = "PositionName";
        public const string const_Remarks = "Remarks";
        public const string const_Status = "Status";


        public const string const_SkillId = "SkillId";
        public const string const_PositionId = "PositionId";


        /// <summary>
        /// Database Procedure and fucntion constants.
        /// </summary>
        public const string const_procPositionMaster_Add = "procPositionMaster_Add";
        public const string const_procPositionMaster_Update = "procPositionMaster_Update";
        public const string const_procPositionMaster_ActiveInActive = "procPositionMaster_ActiveInActive";
        public const string const_procPositionMaster_SelectAll = "procPositionMaster_SelectAll";
        public const string const_procPositionMaster_SelectById = "procPositionMaster_SelectById";
        public const string const_procPositionSkill_Add = "procPositionSkill_Add";
        public const string const_procPositionSkill_Delete = "procPositionSkill_Delete";

    }
}
