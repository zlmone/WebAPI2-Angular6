using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VIS_Domain;

namespace VIS_Domain.Master.CompanyRelated
{
    public class Lookup : VISBaseEntity
    {
        /// <summary>
        /// Lookup Entity Fields. 
        /// </summary>
        /// 

        public string Name { get; set; }
        public string Type { get; set; }
        public decimal Value { get; set; }
        public string FullName { get; set; }
        public string ColorCode { get; set; }
        public string Country { get; set; }

    }

    public static class LookupConstant
    {
        /// <summary>
        /// Database table name constant.
        /// </summary>

        public const string const_lookup_Table = "lookup";

        /// <summary>
        /// Database table field Name Constants.
        /// </summary>
        public const string const_Name = "Name";
        public const string const_Type = "Type";
        public const string const_sName = "sName";
        public const string const_sType = "sType";
        public const string const_Value = "Value";
        public const string const_FullName = "FullName";
        public const string const_ColorCode = "ColorCode";
        public const string const_Country = "Country";

        /// <summary>
        /// Database Procedure and fucntion constants.
        /// </summary>
        public const string const_proclookup_Add = "proclookup_Add";
        public const string const_proclookup_Update = "proclookup_Update";
        public const string const_proclookup_ActiveInActive = "proclookup_ActiveInActive";
        public const string const_proclookup_SelectAll = "proclookup_SelectAll";
        public const string const_proclookup_SelectById = "proclookup_SelectById";

    }
}
