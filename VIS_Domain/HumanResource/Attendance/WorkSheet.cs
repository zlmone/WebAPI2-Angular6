using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VIS_Domain.HumanResource.Attendance
{
    public class WorkSheet : VISBaseEntity
    {
        public string mode { get; set; }
        public Int64 UserId { get; set; }
        public Int64 ActivityId { get; set; }
        public string ActivityName { get; set; }
        public Int64 SubActivityId { get; set; }
        public string SubActivityName { get; set; }
        public string Date { get; set; }
        public Int64 ProjectID { get; set; }
        public string ProjectName { get; set; }
        public string TaskName { get; set; }
        public Int64 TaskId { get; set; }
        public string Description { get; set; }
        public string Hours { get; set; }
        public DateTime FillDate { get; set; }
        public Int64 WorkSheetID { get; set; }
    }
    public static class WorkSheetConstants
    {
        /// <summary>
        /// Database table name constant.
        /// </summary>
        public const string const_Table_WorkSheetMaster = "WorkSheetMaster";

        /// <summary>
        /// Database table field Name Constants.
        /// </summary>
        /// 
        public const string const_Field_mode = "mode";
        public const string const_Field_UserId = "UserId";
        public const string const_Field_ActivityId = "ActivityId";
        public const string const_Field_ActivityName = "ActivityName";
        public const string const_Field_SubActivityId = "SubActivityId";
        public const string const_Field_SubActivityName = "SubActivityName";
        public const string const_Field_Date = "Date";
        public const string const_Field_ProjectID = "ProjectID";
        public const string const_Field_ProjectName = "ProjectName";
        public const string const_Field_TaskName = "TaskName";
        public const string const_Field_TaskId = "TaskId";
        public const string const_Field_Description = "Description";
        public const string const_Field_Hours = "Hours";
        public const string const_Field_FillDate = "FillDate";
        public const string const_Field_WorkSheetID = "WorkSheetID";
        /// <summary>
        /// Database Procedure and fucntion constants.
        /// </summary>
        /// 

        public const string const_ProcGetAllActivity = "ProcGetAllActivity";
        public const string const_procGetAllSubActivity = "procGetAllSubActivity";
        public const string const_procGetProjectsByUserId = "procGetProjectsByUserId";
        public const string const_ProcGetWorkSheetTaskName = "ProcGetWorkSheetTaskName";
        public const string const_InsertUpdateWorkSheetMaster = "InsertUpdateWorkSheetMaster";
        public const string const_UpdateWorkSheetMaster = "UpdateWorkSheetMaster";
    }
}
