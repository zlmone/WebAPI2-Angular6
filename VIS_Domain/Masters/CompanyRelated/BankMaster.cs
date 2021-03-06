﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VIS_Domain;

namespace VIS_Domain.Master.CompanyRelated
{
    public class BankMaster : VISBaseEntity
    {
        /// <summary>
        /// BankMaster Entity Fields. 
        /// </summary>
        /// 
        public string BankAlias { get; set; }
        public string BankName { get; set; }
        public string BranchName { get; set; }
        public string BankAddress { get; set; }
        public string BankDetail { get; set; }
        public string AccountNumber { get; set; }
        public int CurrencyId { get; set; }
        public bool Status { get; set; }
    }


    public static class BankMasterConstant
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
        public const string const_Status = "Status";

        /// <summary>
        /// Database Procedure and fucntion constants.
        /// </summary>
        public const string const_procBankMaster_Add = "procBankMaster_Add";
        public const string const_procBankMaster_Update = "procBankMaster_Update";
        public const string const_procBankMaster_ActiveInActive = "procBankMaster_ActiveInActive";
        public const string const_procBankMaster_SelectAll = "procBankMaster_SelectAll";
        public const string const_procBankMaster_SelectById = "procBankMaster_SelectById";
        public const string const_procGetCompanyMaster = "procGetCompanyMaster";
        public const string const_procGetCurrency = "procGetCurrency";

    }
}
