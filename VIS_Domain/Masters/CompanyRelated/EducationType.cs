using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VIS_Domain;

namespace VIS_Domain.Master.CompanyRelated
{
    public class EducationType : VISBaseEntity
    {
        /// <summary>
        /// EducationType Entity Fields. 
        /// </summary>
        /// 

        public string Name { get; set; }
        public string Type { get; set; }
        public string FullName { get; set; }


    }

    public static class EducationTypeConstant
    {
        /// <summary>
        /// Database table name constant.
        /// </summary>

        public const string const_EducationType_Table = "EducationType";

        /// <summary>
        /// Database table field Name Constants.
        /// </summary>
        public const string const_Name = "Name";
        public const string const_Type = "Type";
        public const string const_FullName = "FullName";
        /// <summary>
        /// Database Procedure and fucntion constants.
        /// </summary>
        public const string const_procEducationType_Add = "procEducationType_Add";
        public const string const_procEducationType_Update = "procEducationType_Update";
        public const string const_procEducationType_ActiveInActive = "procEducationType_ActiveInActive";
        public const string const_procEducationType_SelectAll = "procEducationType_SelectAll";
        public const string const_procEducationType_SelectById = "procEducationType_SelectById";

    }
}
