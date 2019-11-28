using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VIS_Domain.RFQ
{
   public class RFQResponse :VISBaseEntity
    {
        public long RFQ_InitialID { get; set; }
        public bool IsEstimateReady { get; set; }
        public bool IsChangeToAction { get; set; }
        public int Hours { get; set; }
        public int Timeline { get; set; }
        public string Timeline_Unit { get; set; }
        public int Leadtime { get; set; }
        public string Leadtime_Unit { get; set; }
        public string Technology { get; set; }
        public List<long> TechnologyIdList { get; set; }
        public string Description { get; set; }
        public long ActionRequestedBy { get; set; }
        public DateTime ActionByDate { get; set; }
        public long EmpId { get; set; }

        public long UserId { get; set; }
        public bool Access { get; set; }
        public long RFQId { get; set; }

        public string hdnEmployee { get; set; }
        public string EmployeeName { get; set; }
        public string Employee_Name { get; set; }
        public long hdnEmployeeId { get; set; }
        

    }

    public class RFQResponseConstant
    {
        /// <summary>
        /// Database table field Name Constants.Industries
        /// </summary>
        /// 
        public const string const_Field_RFQ_InitialID = "RFQ_InitialID";
        public const string const_Field_IsEstimateReady = "IsEstimateReady";
        public const string const_Field_Hours = "Hours";
        public const string const_Field_Timeline = "Timeline";
        public const string const_Field_Timeline_Unit = "Timeline_Unit";
        public const string const_Field_Leadtime = "Leadtime";
        public const string const_Field_Leadtime_Unit = "Leadtime_Unit";
        public const string const_Field_Technology = "Technology";
        public const string const_Field_Description = "Description";
        public const string const_Field_ActionRequestedBy = "ActionRequestedBy";
        public const string const_Field_ActionByDate = "ActionByDate";
        public const string const_Field_UserId = "UserId";
        public const string const_Field_Access = "Access";
        public const string const_Field_RFQId = "RFQId";



        /// <summary>
        /// Procedure
        /// </summary>
        public const string const_Field_GetEmployeeActionId = "procGetEmployeeActionId";
        public const string const_Field_GetEmployeeNameById = "procGetEmployeeNameById";
        public const string const_Field_RFQResponse_Add = "procRFQResponse_Add";
        public const string const_Field_GetMaxResponseId = "procGetMaxResponseId";
        public const string const_Field_GetRFQDetailByRFQInitialId = "procGetRFQDetailByRFQInitialId";
        public const string const_Field_GetRFQResponseByResponseId = "procGetRFQResponseByResponseId";
        public const string const_Field_GetTechnologyNameById = "procGetTechnologyNameById";

    }
    public class AutoPointAdd
    {
        public long empId { get; set; }
        public string criteria { get; set; }
        public string forWhichData { get; set; }
        public decimal rangeCount { get; set; }
        public bool isTodo { get; set; }
    }
    public class AutoPointAddConstant
    {
        public const string const_Field_empId = "empId";
        public const string const_Field_criteria = "criteria";
        public const string const_Field_forWhichData = "forWhichData";
        public const string const_Field_rangeCount = "rangeCount";
        public const string const_Field_isTodo = "isTodo";

        /// <summary>
        /// Procedure
        /// </summary>
        public const string const_Field_Levels_AutomaticPointsEntry = "procLevels_AutomaticPointsEntry";

    }


    public class ActionTakenBy
    {
        public long EmpId { get; set; }
        public string Employee_Name { get; set; }
    }

    public class HiddenValue
    {
        public long hdnEmployeeId { get; set; }
        public string hdnEmployee { get; set; }
    }

    public class ActionTakenByConstatnt
    {
        public const string const_Field_Id = "Id";
        public const string const_Field_Employee_Name = "Employee_Name";

        public const string const_Field_GetActionTaken = "procGetActionTaken";
    }
    public class MainAddResponse
    {
        public SessionData SessionData { get; set; }
        public RFQResponse RFQResponse { get; set; }
        public List<RFQDoc> RFQDoc { get; set; }
        public List<RFQLink> RFQLink { get; set; }
        public long RFQId { get; set; }
    }

}
