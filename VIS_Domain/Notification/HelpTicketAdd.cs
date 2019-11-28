using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VIS_Domain.Notification
{

    public class HelpTicketAdd : VISBaseEntity
    {
        /// <summary>
        /// HelpTicketAdd Entity Fields. 
        /// </summary>
        /// 
        public string Subject { get; set; }
        public string Message { get; set; }
        public string Remarks { get; set; }
        public int    AssignTo { get; set; }
        public int    AddressToGroup { get; set; }
        public string Priority { get; set; }
        public string Status { get; set; }

        public string FileName { get; set; }
        public string FileName1 { get; set; }
        public string FileName2 { get; set; }

        // for dropdown in add company master
        public string DepartmentHelpTicketDll { get; set; }
        public string SuggestionAlie { get; set; }


    }

public static class HelpTicketAddConstants
{
    /// <summary>
    /// Database table name constant.
    /// </summary>
    public const string const_Table_HelpTicketAdd = "HelpTicketMaster";

        /// <summary>
        /// Database table field Name Constants."
        /// </summary>
        public const string const_Field_Subject = "Subject";
        public const string const_Field_Message = "Message";
        public const string const_Field_Remarks = "Remarks";
        public const string const_Field_AssignTo = "AssignTo";
        public const string const_Field_AddressToGroup = "AddressToGroup";
        public const string const_Field_Priority = "Priority";
        public const string const_Field_Status  = "Status";
        public const string cons_Filed_FileName = "FileName";
        public const string cons_Filed_FileName1 = "FileName";
        public const string cons_Filed_FileName2 = "FileName";

        public const string const_Field_SuggestionAlie = "SuggestionAlie";


        /// <summary>
        /// Database Procedure and fucntion constants.
        /// </summary>
        public const string const_procHelpTicketMaster_Add = "procHelpTicketMaster_Add";
        public const string const_procHelpTicketMaster_DepartmentHelpTicketDll = "procSelectDepartmentHelpTicket";


    }
}
