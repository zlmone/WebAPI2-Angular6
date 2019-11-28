using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VIS_Domain.Notification
{
   public  class MyTicket : VISBaseEntity
    {

        public string Subject { get; set; }

        public string Message { get; set; }
        public string Remarks { get; set; }
        public string AddressToGroup { get; set; }
        public string AssignTo { get; set; }
        public string Priority { get; set; }
        public string Status { get; set; }

        public string CreatedByName { get; set; }
        public string UpdatedByName { get; set; }
        public Int64 CreatedId { get; set; }
        public string RecordCreatedBy { get; set; }
        public DateTime RecordCreatedOn {get;set;}
        public Int64 HelpTicketId { get; set; }
        public string FileName { get; set; }
        public string FileName1 { get; set; }
        public string FileName2 { get; set; }

        public string RoleType { get; set; }

        // for dropdown in add company master
        public string DepartmentHelpTicketDll { get; set; }
        public string SuggestionAlie { get; set; }
       public Int64 SuggestionId { get; set; }
    }
    public static class MyTicketConstants
    {
        /// <summary>
        /// Database table name constant.
        /// </summary>
        public const string const_Table_HelpTicket_Master = "HelpTicketMaster";

        /// <summary>
        /// Database table field Name Constants.
        /// </summary>

        public const string const_Field_Subject = "Subject";
        public const string const_Field_Message = "Message"; 
        public const string const_Field_Remarks = "Remarks";
        public const string const_Field_AddressToGroup = "AddressToGroup";
        public const string const_Field_AssignTo = "AssignTo";
        public const string const_Field_CreatedByName = "CreatedByName";
        public const string const_Field_UpdatedByName = "UpdatedByName";
        public const string const_Field_Priority = "Priority";
        public const string const_Field_Status = "Status";
        public const string const_Field_CreatedId = "CreatedId";

        public const string const_Field_SuggestionAlie = "SuggestionAlie";
        public const string const_Field_SuggestionId = "SuggestionId";
        public const string const_Field_Mode = "Mode";
        public const string const_Field_Employee_Id = "Employee_Id";
        public const string cons_Filed_Organization_id = "Organization_Id";
        public const string const_Field_RecordCreatedBy = "RecordCreatedBy";
        public const string cons_Filed_RecordCreatedOn = "RecordCreatedOn";
        public const string cons_Filed_HelpTicketId = "HelpTicketId";
        public const string cons_Filed_FileName = "FileName";
        public const string cons_Filed_FileName1 = "FileName";
        public const string cons_Filed_FileName2 = "FileName";
       
        public const string cons_Filed_OriginalFileName = "OriginalFileName"; 
        /// <summary>
        /// Database Procedure and fucntion constants.
        /// </summary>
        public const string const_procHelpTicketDetailByUser = "procHelpTicketDetailByUser";
  
        public const string const_procHelpTicket_Add = "procHelpTicketMaster_Add";
        public const string const_procHelpTicket_update = "procHelpTicket_Update";
        public const string const_procHelpTicket_selectAll = "procHelpTicketMaster_SelectAll";
        public const string const_procHelpTicket_ActiveInActive = "procHelpTicaket_ActiveInActive";

        public const string const_procHelpTicket_StatusOpenUserAssignTo = "procHelpTicketDetailByAssignToOpen";
        public const string const_procHelpTicket_ProcHelpTicketAssignToFind = "ProcHelpTicketAssignTo";
        /// <summary>
        /// drop down bind
        /// </summary>
        public const string const_procHelpTicketMaster_DepartmentHelpTicketDll = "procSelectDepartmentHelpTicket";
        public const string const_procHelpTicketHistory_History= "ProcHelpTicket_History";

        public const string const_procHelpTicketAttachement = "procHelpTicketAttachement_Add";
        public const string const_procHelpTicketAttachementUpdate = "procHelpTicketAttachement_Update";
        public const string const_procHelpTicketMasterLog = "procHelpTicketMasterLog";
        public const string const_procHelpTicket_SelectById = "procHelpTickeMster_SelectById";
    }
}
