using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VIS_Domain.HumanResource.Attendance
{
    public class MyTeam : VISBaseEntity
    {
         public Int64 id { get; set; }
        public string mode { get; set; }
        public Int64 UserId { get; set; }
        public string Name { get; set; }
        public Int64 NumberOfSkill { get; set; }
        public Int64 NumberToBeApproved { get; set; }
        public string SkillName { get; set; }
        public string SkillGroup { get; set; }
        public string SkillText { get; set; }
        public string leavel { get; set; }
        public Int64 SkillID { get; set; }

        public string LevelText { get; set; }
        public int Levelorder { get; set; }
        public bool IsApproved { get; set; }
        public string Status { get; set; }
    }

    public static class MyTeamConstants
    {


        public const string const_Table_MyTeam = "MyTeam";


        public const string const_Field_id = "id";
        public const string const_Field_mode = "mode";
        public const string const_Field_UserId = "UserId";
        public const string const_Field_Name = "Name";
        public const string const_Field_NumberOfSkill = "NumberOfSkill";
        public const string const_Field_NumberToBeApproved = "NumberToBeApproved";
        public const string const_Field_SkillName = "SkillName";
        public const string const_Field_SkillGroup = "SkillGroup";
        public const string const_Field_SkillText = "SkillText";
        public const string const_Field_leavel = "leavel";
        public const string const_Field_SkillID = "SkillID";
        public const string const_Field_LevelText = "LevelText";
        public const string const_Field_Levelorder = "Levelorder";
        public const string const_Field_IsApproved = "IsApproved";
        public const string const_Field_Status = "Status";

        /// <summary>
        /// Database Procedure and fucntion constants.
        /// </summary>
        /// 

        public const string const_procGetMyTeam_List = "procGetMyTeam_List";
        public const string const_procgetLinemanager = "procgetLinemanager";
        public const string const_procSkillLeavel = "procSkillLeavel";
    }

}
