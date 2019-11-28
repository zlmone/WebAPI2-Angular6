using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VIS_Domain;

namespace VIS_Domain.Master.Configuration
{
    public class ConfigureTicket : VISBaseEntity
    {
        /// <summary>
        /// organization Entity Fields. 
        /// </summary>

        public Int64 Parent_Id { get; set; }
        public Int64 User_Id { get; set; }
        public string Department_Name { get; set; }
        public Int64 Position_Id { get; set; }
        public bool IsActiveSuggestion { get; set; }
        public string SuggestionAlie { get; set; }
        public Int64 Organization_Id { get; set; }
        public Int64 Suggestion_Dep_Emp_Id { get; set; }
        public bool Flag { get; set; }

        /// <summary>
        /// Employee_Master Entity Fields. 
        /// </summary>

        public string Employee_Name { get; set; }


        /// <summary>
        /// SuggestionsOrganizationEmployeeMapping Entity Fields. 
        /// </summary>
        public Int64 Employee_Id { get; set; }
        public string Mode { get; set; }
        


    }

    public static class ConfigureTicketConstant
    {
        /// <summary>
        /// Database table name constant.
        /// </summary>

        public const string const_organization_Table = "organization";
        public const string const_Employee_Master_Table = "Employee_Master";
        public const string const_SuggestionsOrganizationEmployeeMapping_Table = "SuggestionsOrganizationEmployeeMapping";

        /// <summary>
        /// Table organization field Name Constants.
        /// </summary>
        public const string const_Suggestion_Dep_Emp_Id = "Suggestion_Dep_Emp_Id";
        public const string const_Organization_Id = "Organization_Id";
        public const string const_Parent_Id = "Parent_Id";
        public const string const_User_Id = "User_Id";
        public const string const_Department_Name = "Department_Name";
        public const string const_Position_Id = "Position_Id";
        public const string const_IsActiveSuggestion = "IsActiveSuggestion";
        public const string const_SuggestionAlie = "SuggestionAlie";
        public const string const_Flag = "Flag";
        /// <summary>
        /// Table Employee_Master field Name Constants.
        /// </summary>
        public const string const_Employee_Name = "Employee_Name";

        /// <summary>
        /// Table SuggestionsOrganizationEmployeeMapping field Name Constants.
        /// </summary>
        public const string const_Employee_Id = "Employee_Id";
        public const string const_Mode = "Mode";

        /// <summary>
        /// Database Procedure and fucntion constants.
        /// </summary>

        public const string const_procSelectParent = "procSelectParent";
        public const string const_procSelectChildGroup = "procSelectChildGroup";
        public const string const_procSelectHead = "procSelectHead";
        public const string const_procorganization_Update = "procorganization_Update";
        public const string const_proSuggestionsOrganizationEmployeeMapping = "proSuggestionsOrganizationEmployeeMapping";
        public const string const_procSuggestionsOrganizationEmployeeMapping_UpdateEmployeeId = "procSuggestionsOrganizationEmployeeMapping_UpdateEmployeeId";
        public const string const_procSuggestionsOrganizationEmployeeMapping_Compare = "procSuggestionsOrganizationEmployeeMappingCompare";
        
    }
}
