using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VIS_Domain;

namespace VIS_Domain.Master.CompanyRelated
{
    public class ContactMaster : VISBaseEntity
    {
        /// <summary>
        /// ContactMaster Entity Fields. 
        /// </summary>        
        public string Name { get; set; }
        public string Designation { get; set; }
        public string Email { get; set; }
        public string phone { get; set; }
        public string SkypeId { get; set; }
        public string MsnId { get; set; }
        public string GtalkId { get; set; }
        public string AolId { get; set; }
        public string Other { get; set; }
        public int ProspectId { get; set; }
   
    }

    public static class ContactMasterConstants
    {
        /// <summary>
        /// Database table name constant.
        /// </summary>
        public const string const_Table_ContactMaster = "ContactMaster";

        /// <summary>
        /// Database table field Name Constants.
        /// </summary>
        public const string const_Field_Name = "Name";
        public const string const_Field_Designation = "Designation";
        public const string const_Field_Email = "Email";
        public const string const_Field_phone = "phone";
        public const string const_Field_SkypeId = "SkypeId";
        public const string const_Field_MsnId = "MsnId";
        public const string const_Field_GtalkId = "GtalkId";
        public const string const_Field_AolId = "AolId";
        public const string const_Field_Other = "Other";
        public const string const_Field_ProspectId = "ProspectId";

        /// <summary>
        /// Database Procedure and fucntion constants.
        /// </summary>
        public const string const_procContactMaster_Add = "procContactMaster_Add";
        public const string const_procContactMaster_Update = "procContactMaster_Update";
        public const string const_procContactMaster_ActiveInActive = "procContactMaster_ActiveInActive";
        public const string const_procContactMaster_SelectAll = "procContactMaster_SelectAll";
        public const string const_procContactMaster_SelectBaseNonBase = "procContactMaster_SelectBaseNonBase";
        public const string const_procContactMaster_SelectById = "procContactMaster_SelectById";

    }
}
