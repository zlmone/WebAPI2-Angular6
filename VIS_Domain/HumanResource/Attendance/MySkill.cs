using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VIS_Domain.HumanResource.Attendance
{
   public class MySkill : VISBaseEntity
    {
        public string mode { get; set; }
        public Int64  UserID { get; set; }
        public  int SkillID { get; set; }
        public string SkillName { get; set; }
        public string SkillGroup { get; set; }
        public string Skilltext { get; set; }
        public Int64 lookupSkilId { get; set; }
        public string Name { get; set; }
        public Int64 skillgroupid { get; set; }
        public string status { get; set; }
        public bool IsApproved { get; set; }
        public Int64 id { get; set; }


    }
    public static class MySkillConstants
    {
        /// <summary>
        /// Database table name constant.
        /// </summary>
        public const string const_Table_MySkill = "MySkill";

        /// <summary>
        /// Database table field Name Constants.
        /// </summary>
        /// 
        public const string const_Filed_id = "id";
        public const string const_Field_mode = "mode";
        public const string const_Field_UserId = "UserId";
        public const string const_Field_SkillName = "SkillName";
        public const string const_Field_SkillGroup = "SkillGroup";
        public const string const_Field_Skilltext = "Skilltext";
        public const string const_Field_SkillID = "SkillID";
        public const string const_Field_lookupSkilId = "lookupSkilId";
        public const string const_Field_Name = "Name";
        public const string const_Field_skillgroupid = "skillgroupid";
        public const string const_Field_status = "status";
        public const string const_Field_IsApproved = "IsApproved";

        /// <summary>
        /// Database Procedure and fucntion constants.
        /// </summary>
        /// 

        public const string const_procGetMySkill = "procGetMySkill";
        public const string const_procDeleteSkill = "procDeleteSkill";
        public const string const_procSkillUser_Add = "procSkillUser_Add";

    }
}
