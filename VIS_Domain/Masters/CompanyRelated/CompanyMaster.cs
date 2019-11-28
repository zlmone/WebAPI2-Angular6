using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VIS_Domain;

namespace VIS_Domain.Master.CompanyRelated
{
    public class CompanyMaster : VISBaseEntity
    {
        /// <summary>
        /// CompanyMaster Entity Fields. 
        /// </summary>
        public string CompanyName { get; set; }
        public string City { get; set; }
        public string ZipCode { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
        public string CountryName { get; set; }
        public string ContactNo { get; set; }
        public string E_mail { get; set; }
        public string Fax { get; set; }
        public string CompanyURL { get; set; }
        public string Address { get; set; }
        public string CompanyLogo { get; set; }
        public string AccountHead { get; set; }
        public string Designation { get; set; }
        public string Signature { get; set; }
        public string CompanyShortCode { get; set; }
        public string Address2 { get; set; }
        public string StartSeries { get; set; }
        public int FinancialYear { get; set; }
        public string DesignationOther { get; set; }
        public string AccountHeadOther { get; set; }
        public string SignatureOther { get; set; }
        
        // for dropdown in add company master
        public string FinancialYeardll { get; set; }
        public string Employee_Name { get; set; }
    }

    public static class CompanyMasterConstants
    {
        /// <summary>
        /// Database table name constant.
        /// </summary>
        public const string const_Table_CompanyMaster = "CompanyMaster";

        /// <summary>
        /// Database table field Name Constants.
        /// </summary>
        public const string const_Field_CompanyName = "CompanyName";
        public const string const_Field_City = "City";
        public const string const_Field_ZipCode = "ZipCode";
        public const string const_Field_State = "State";
        public const string const_Field_Country = "Country";
        public const string const_Field_ContactNo = "ContactNo";
        public const string const_Field_E_mail = "E_mail";
        public const string const_Field_Fax = "Fax";
        public const string const_Field_CompanyURL = "CompanyURL";
        public const string const_Field_Address = "Address";
        public const string const_Field_CompanyLogo = "CompanyLogo";
        public const string const_Field_AccountHead = "AccountHead";
        public const string const_Field_Designation = "Designation";
        public const string const_Field_Signature = "Signature";
        public const string const_Field_CompanyShortCode = "CompanyShortCode";
        public const string const_Field_Address2 = "Address2";
        public const string const_Field_StartSeries = "StartSeries";
        public const string const_Field_FinancialYear = "FinancialYear";
        public const string const_Field_AccountHeadOther = "AccountHeadOther";
        public const string const_Field_SignatureOther = "SignatureOther";
        public const string const_Field_DesignationOther = "DesignationOther";

        /// <summary>
        /// Database Procedure and fucntion constants.
        /// </summary>
        public const string const_procCompanyMaster_Add = "procCompanyMaster_Add";
        public const string const_procCompanyMaster_Update = "procCompanyMaster_Update";
        public const string const_procCompanyMaster_ActiveInActive = "procCompanyMaster_ActiveInActive";
        public const string const_procCompanyMaster_SelectAll = "procCompanyMaster_SelectAll";
        public const string const_procCompanyMaster_SelectBaseNonBase = "procCompanyMaster_SelectBaseNonBase";
        public const string const_procCompanyMaster_SelectById = "procCompanyMaster_SelectById";
        public const string const_procCompanyMaster_ForCountrydll = "procSelectCountry";
        public const string const_procCompanyMaster_ForFinancialYeardll = "procSelectFinancialYear";
        public const string const_procCompanyMaster_ForPositiondll = "procSelectPosition";
        public const string const_procCompanyMaster_ForSelectHeaddll = "procSelectHead";

    }
}
