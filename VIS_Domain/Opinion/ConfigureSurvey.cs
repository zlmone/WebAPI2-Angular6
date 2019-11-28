using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VIS_Domain.Opinion
{
    public class ConfigureSurvey : VISBaseEntity
    {
        public Boolean RoleName { get; set; }
    }

    public class SurveyType
    {
        public Int64 Id { get; set; }
        public string Name { get; set; }
    }

    public class GetUserListForOwnerSelection
    {
        public Int64 ID { get; set; }
        public string EmployeeName { get; set; }
    }
    public static class ConfigureSurveyConstant 
    {
        /// <summary>
        /// Database table field Name Constants.
        /// </summary>
        public const string const_Field_EmployeeID = "EmployeeID";
        public const string const_Field_RoleName = "RoleName";
        public const string const_Field_SearchField = "SearchField";
        public const string const_Field_SearchValue = "SearchValue";
        public const string const_Field_RoleType = "RoleType";
        public const string const_Field_SurveyType = "SurveyType";
        public const string const_Field_ApproveType = "ApproveType";
        public const string const_Field_Mode = "mode";

        /// <summary>
        /// Database Procedure and fucntion constants.
        /// </summary>
        public const string Const_Proc_CheckUserRolesById = "Proc_CheckUserRolesById";
        public const string const_ProcSurvey_GetAllSurvey_SelectAll = "ProcSurvey_GetAllSurvey";
        public const string const_ProcEmployeeDropDown = "procEmployeeDropDown";


    }
}
