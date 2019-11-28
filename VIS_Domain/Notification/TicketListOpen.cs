using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VIS_Domain.Notification
{
    public class TicketListOpen :VISBaseEntity 
    {

        public string Mode { get; set; }
   
    
        public string Subject { get; set; }
        public string Message { get; set; }
        public string Remarks { get; set; }
        public string AddressToGroup { get; set; }
        public string AssignTo { get; set; }
        public string Priority { get; set; }
        public string Status { get; set; }
        public string CreatedByName { get; set; }
        public string UpdatedByName { get; set; }
        public Int64 HelpTicketId { get; set; }
        public string FileName { get; set; }
        public string UserType { get; set; }
        public string RoleType { get; set; }

    }
    public static class TicketListOpenConstants
    {
        /// <summary>
        /// Database table name constant.
        /// </summary>
        public const string const_Table_HelpTicket_Master = "HelpTicketMaster";

        /// <summary>
        /// Database table field Name Constants.
        /// </summary>
        /// 
        public const string const_Field_Mode = "Mode";
       
        public const string const_Field_Subject = "Subject";
        public const string const_Field_Message = "Message";
        public const string const_Field_Remarks = "Remarks";
        public const string const_Field_AddressToGroup = "AddressToGroup";
        public const string const_Field_AssignTo = "AssignTo";
        public const string const_Field_CreatedByName = "CreatedByName";
        public const string const_Field_UpdatedByName = "UpdatedByName";
        public const string const_Field_Priority = "Priority";
        public const string const_Field_Status = "Status";
        public const string const_Field_UserId = "UserID";
        public const string cons_Filed_HelpTicketId = "HelpTicketId";
        public const string cons_Filed_FileName = "FileName"; 
        public const string cons_Filed_UserType = "UserType";


        /// <summary>
        /// Database Procedure and fucntion constants.
        /// </summary>
        public const string const_procHelpTicketDetailByAssignToUser = "procHelpTicketDetailByAssignToUser";
        public const string const_procHelpTicketHistory_History = "ProcHelpTicket_History";
        public const string const_procHelpTicket_update = "procHelpTicket_Update";
        public const string const_procHelpTicketMasterLog = "procHelpTicketMasterLog";
        public const string const_procHelpTicket_selectAll = "procHelpTicketMaster_SelectAll";
        public const string const_procHelpTicket_SelectById = "procHelpTickeMster_SelectById";
        public const string const_procHelpTicket_ActiveInActive = "procHelpTicaket_ActiveInActive";


    }
}
