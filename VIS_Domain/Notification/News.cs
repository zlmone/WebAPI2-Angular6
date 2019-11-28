using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VIS_Domain.Notification
{
    public class News : VISBaseEntity
    {
        /// <summary>
        /// News Entity Fields. 
        /// </summary>
        public string News_Name { get; set; }
        public string Description { get; set; }
        public bool IsNew { get; set; }
    }

    public static class NewsConstants
    {
        /// <summary>
        /// Database table name constant.
        /// </summary>
        public const string const_Table_News = "News";

        /// <summary>
        /// Database table field Name Constants.
        /// </summary>
        public const string const_Field_News_Name = "News_Name";
        public const string const_Field_Description = "Description";
        public const string const_Field_IsNew = "IsNew";


        /// <summary>
        /// Database Procedure and fucntion constants.
        /// </summary>
        public const string const_procNews_Add = "procNews_Add";
        public const string const_procNews_Update = "procNews_Update";
        public const string const_procNews_ActiveInActive = "procNews_ActiveInActive";
        public const string const_procNews_SelectAll = "procNews_SelectAll";
        public const string const_procNews_SelectById = "procNews_SelectById";
        public const string const_procNews_View = "procNews_View";

    }
}
