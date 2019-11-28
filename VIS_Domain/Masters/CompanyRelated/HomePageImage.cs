using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VIS_Domain;

namespace VIS_Domain.Master.Configuration
{
    public class HomePageImage : VISBaseEntity
    {
        /// <summary>
        /// HomePage Entity Fields. 
        /// </summary>

        public string ImagePath { get; set; }
        public bool Active { get; set; }


    }

    public static class HomePageImageConstant
    {
        /// <summary>
        /// Database table name constant.
        /// </summary>

        public const string const_organization_Table = "HomePage";
        

        /// <summary>
        /// Table organization field Name Constants.
        /// </summary>
        public const string const_ImagePath = "ImagePath";
        public const string const_Active = "Active";

        /// <summary>
        /// Database Procedure and fucntion constants.
        /// </summary>

        public const string const_procHomePage_Add = "procHomePage_Add";
        public const string const_procHomePage_Update = "procHomePage_Update";
        public const string const_procHomePage_ActiveInActive = "procHomePage_ActiveInActive";
        public const string const_procHomePage_SelectAll = "procHomePage_SelectAll";
        public const string const_procHomePage_SelectById = "procHomePage_SelectById";
        public const string const_procHomePage_CountActiveImage = "procHomePage_CountActiveImage";


    }
}
