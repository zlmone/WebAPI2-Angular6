using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VIS_Domain.Registration
{
    public class VISUser : VISBaseEntity
    {
        /// <summary>
        /// User Entity Fields.
        /// </summary>
        public String VISUsername { get; set; }
        public String VISPassword { get; set; }
    }

    public static class VISUserConstants
    {
        /// <summary>
        /// Database table name constant.
        /// </summary>
        public const string const_Table_VISUser = "VISUser";

        /// <summary>
        /// Database table field Name Constants.
        /// </summary>
        public const string const_Field_VISUsername = "VISUsername";
        public const string const_Field_VISPassword = "VISPassword";
        public const string const_Field_VISEmail = "Email";
        public const string const_Field_FirstName = "FirstName";
        public const string const_Field_LastName = "LastName";
        public const string const_Field_Email = "Email";
        public const string const_Field_UserType = "UserType";
        public const string const_Field_IsAdmin = "IsAdmin";
        public const string const_Field_IsLineManager = "IsLineManager";
        public const string const_Field_DepartmentId = "DepartmentId";
        public const string const_Field_IsOnStypend = "IsOnStypend";
        public const string const_Field_IsFormerEmployee = "IsFormerEmployee";

        /// <summary>
        /// Database Procedure and fucntion constants.
        /// </summary>
        public const string const_procVISUser_Add = "procVISUser_Add";
        public const string const_procVISUser_Update = "procVISUser_Update";
        public const string const_procVISUser_ActiveInActive = "procVISUser_ActiveInActive";
        public const string const_procVISUser_SelectAll = "procVISUser_SelectAll";
        public const string const_procVISUser_SelectBaseNonBase = "procVISUser_SelectBaseNonBase";
        public const string const_procVISUser_SelectById = "procVISUser_SelectById";
        public const string const_procGetActivateImages = "procGetActivateImages";
        public const string const_procVISUser_SelectByUserIdPassword = "procVISUser_SelectByUserIdPassword";
        public const string const_procVISUser_ForgotPassword = "procForgotPassword";


    }
}
