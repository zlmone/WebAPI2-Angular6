using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VIS_Domain.Master.CurrencyRelated;

namespace VIS_Domain.Master.CompanyRelated
{
    public class Bank : Currency
    {
        /// <summary>
        /// Bank Entity Fields.
        /// </summary>
        public string BankAlias { get; set; }
        public string BankName { get; set; }
        public string BranchName { get; set; }
        public string BankAddress { get; set; }
        public string BankDetail { get; set; }
        public string AccountNumber { get; set; }
        public Int64 CurrencyId { get; set; }
    }

    public static class BankConstsants
    {
        /// <summary>
        /// Database table name constant.
        /// </summary>
        public const string const_BankMaster_Table = "BankMaster";

        /// <summary>
        /// Database table field Name Constants.
        /// </summary>
        public const string const_BankAlias = "BankAlias";
        public const string const_BankName = "BankName";
        public const string const_BranchName = "BranchName";
        public const string const_BankAddress = "BankAddress";
        public const string const_BankDetail = "BankDetail";
        public const string const_AccountNumber = "AccountNumber";
        public const string const_CurrencyId = "CurrencyId";

        /// <summary>
        /// Database Procedure and fucntion constants.
        /// </summary>
        public const string const_Proc_BankMaster_Add = "BankMaster_Add";
        public const string const_Proc_BankMaster_Update = "BankMaster_Update";
        public const string const_Proc_BankMaster_Delete = "BankMaster_Delete";
        public const string const_Proc_BankMaster_GetAll = "BankMaster_GetAll";
    }
}
