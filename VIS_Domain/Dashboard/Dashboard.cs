using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VIS_Domain.Dashboard
{

    public class DashboardData
    {
        public MyProfile UserProfileData { get; set; }
        public List<MySkill> UserSkillData { get; set; }
        public List<MyAllocation> UserAllocationData { get; set; }
        public List<MyTeam> UserTeamData { get; set; }
        public List<MyAlerts> UserAlertData { get; set; }
        public List<MyLeaveDetails> UserLeaveDetails { get; set; }
        public List<MyNwdHistory> UserNwdHistory { get; set; }
        public CalTotalAttendance UserCalTotalAttendanceData { get; set; }
        public ActualEntryTimeAndGracePeriod UserActualEntryTimeAndGracePeriod { get; set; }
        public List<LeaveLedgerData> UserLeaveLedgerData { get; set; }
        public List<LeaveDetailsByDate> UserLeaveDetailsByDate { get; set; }
        public List<HolidayListForEmployee> UserHolidayListForEmployeeData { get; set; }
        public List<HolidayForDate> HolidayForDateData { get; set; }
    }

    public class MyProfile
    {
        public string EmployeeName { get; set; }
        public string LineManagerName { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }
        public string PhotographFileName { get; set; }
        public string CompanyName { get; set; }
        public string EmailID { get; set; }
        public string Designation { get; set; }
        public string DepartmentName { get; set; }
        public string FatherName { get; set; }
        public string PermenantAddress { get; set; }
        public string CommunicationAddress { get; set; }
        public string LandlineNumber { get; set; }
        public string MobileNumber { get; set; }
        public string MotherName { get; set; }
        public string BirthDate { get; set; }
        public string BloodGroup { get; set; }
        public string MaritalStatus { get; set; }
        public string EmplopyeeGrade { get; set; }
    }

    public class MySkill
    {
        public String Level_Text { get; set; }
        public String SkillName { get; set; }
    }

    public class MyAllocation
    {
        public String FromDate { get; set; }
        public String ToDate { get; set; }
        public Decimal AllocatedHr { get; set; }
        public Decimal TotalHr { get; set; }
        public String ProjectName { get; set; }
    }

    public class MyTeam
    {
        public int EmployeeId { get; set; }
        public int ProjectId { get; set; }
        public String ProjectName { get; set; }
        public String EmployeeName { get; set; }
    }

    public class MyAlerts
    {
        public String Name { get; set; }
        public String Type { get; set; }
        public String Status { get; set; }
    }

    public class MyLeaveDetails
    {
        public int ID { get; set; }
        public int EmployeeID { get; set; }
        public DateTime ToDate { get; set; }
        public DateTime FromDate { get; set; }
        public String Reason { get; set; }
        public String ContactDetail { get; set; }
        public int AppliedTo { get; set; }
        public int LeaveType { get; set; }
        public int Status { get; set; }
        public int GHID { get; set; }
        public DateTime EnteredDate { get; set; }
        public int ResponsiblePersonID { get; set; }
        public string Remarks { get; set; }
        public bool IsFullDay { get; set; }
        public bool IsFirstHalf { get; set; }
        public bool IsSecondHalf { get; set; }
        public DateTime CreatedDate { get; set; }
        public String contact { get; set; }
        public DateTime CallOnDate { get; set; }
        public string CallOnTime { get; set; }
        public bool EmergencyLeave { get; set; }
        public bool LongleaveEntry { get; set; }

    }
    public class MyNwdHistory
    {
        public int id { get; set; }
        public int employeeId { get; set; }
        public DateTime date { get; set; }
        public String leaveType { get; set; }
        public int nwdId { get; set; }
    }

    public class CalTotalAttendance
    {
        public int EmployeeID { get; set; }
        public String EmployeeName { get; set; }
        public String Date { get; set; }
        public int InTimeID { get; set; }
        public DateTime InTime { get; set; }
        public int OutTimeID { get; set; }
        public DateTime OutTime { get; set; }
        public int LunchOutTimeID { get; set; }
        public DateTime LunchOutTime { get; set; }
        public int LunchInTimeID { get; set; }
        public DateTime LunchInTime { get; set; }
        public int OtherTimeID { get; set; }
        public String TotalOtherTime { get; set; }
        public String TotalOfficeTime { get; set; }
        public String TotalLunchTime { get; set; }
        public String TotalBreakTime { get; set; }
        public String TotalWorkingTime { get; set; }
        public Decimal TotalWorksheetHour { get; set; }
        public bool IsInOffice { get; set; }
        public bool IsInBreak { get; set; }
        public bool IsInLunch { get; set; }
        public bool IsInMeeting { get; set; }
        public bool IsInOfficeWork { get; set; }
        public String Days { get; set; }
        public String ImportRemarks { get; set; }
        public String EmployeeCode { get; set; }
        public String MMDDYYYY_DateFormate { get; set; }
    }

    public class ActualEntryTimeAndGracePeriod
    {
        public String actualEntryTime { get; set; }
        public int grace { get; set; }
    }

    public class LeaveLedgerData
    {
        public String leaveDuration { get; set; }
        public String leaveType { get; set; }
        public String approveType { get; set; }
        public String shortLeaveType { get; set; }
    }

    public class LeaveDetailsByDate
    {
        public int ID { get; set; }
        public String LeaveType { get; set; }
        public String LeaveStatus { get; set; }
        public int EmployeeId { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public String CalendarDays { get; set; }
        public bool IsFullDay { get; set; }
        public bool IsFirstHalf { get; set; }
        public bool IsSecondhalf { get; set; }
    }

    public class HolidayListForEmployee
    {
        public int id { get; set; }
        public String holidayName { get; set; }
        public DateTime fromDate { get; set; }
        public DateTime toDate { get; set; }
        public String remarks { get; set; }
        public bool active { get; set; }
        public int noOfDays { get; set; }

    }

    public class HolidayForDate
    {
        public int id { get; set; }
        public String holidayName { get; set; }
        public DateTime fromDate { get; set; }
        public DateTime toDate { get; set; }
        public String remarks { get; set; }
        public bool active { get; set; }
        public int noOfDays { get; set; }
    }

    public class LevelsList
    {
        public int levelnumber { get; set; }
        public String Name { get; set; }
        public String Icon { get; set; }
        public int startpoint { get; set; }
        public int endpoint { get; set; }
    }

    public class Levels_PointsLegend
    {
        public String Criteria { get; set; }
        public String CalculatedOn { get; set; }
        public decimal From { get; set; }
        public decimal To { get; set; }
        public int Points { get; set; }
    }

    public class PointsDetails
    {
        public String EventName { get; set; }
        public bool Type { get; set; }
        public String CalculatedOn { get; set; }
        public int PointsGained { get; set; }
        public String Date { get; set; }
    }

    public class MyAttendance
    {
        public DateTime Date { get; set; }
        public string Status { get; set; }
        public DateTime InTIme { get; set; }
        public DateTime OutTIme { get; set; }
        public DateTime TotalWorksheetHours { get; set; }

    }


    public static class DashboardConstsants
    {
        public const string const_Proc_GetDashboardDataSets = "procGetDashboardDataSets";
        public const string const_Proc_GetProfileById = "procGetProfileById";
        public const string const_Proc_GetAllUser = "procGetAllUesrForLoggedInUser";
        public const string const_Proc_GetUserDetailById = "procGetUserDetailById";
        public const string const_Proc_GetAllUserWithOutLM = "procGetAllUserWithOutLM";
        public const string const_Proc_Getprojectallocationdetails = "procgetprojectallocationdetails";
        public const string const_Proc_GetShortProfileDetails = "ProcGetShortProfileDetails";
        //public const string const_Proc_GetWeekAttendanceReport = "";
        public const string const_Proc_Getweekattendancerecord = "ProcCalTotalAttendanceReport";
        //public const string const_Proc_GetMonthAttendanaceReport = "";
        public const string const_Proc_GetMonthAttendanaceRecord = "ProcCalTotalAttendanceReport";
        public const string const_Proc_GetLeaveDetailsByDate = "ProcGetLeaveDetailsByDate";
        //public const string const_Proc_GetMonthWorksheetReport = "";
        public const string const_Proc_GetMonthWorksheetRecord = "ProcCalTotalAttendanceReport";
        public const string const_Proc_GetWorksheetDetailsReport = "ProcGetWorksheetDetailsReport";
        public const string const_Proc_GetProjectNameByUserId = "ProcGetProjectNameByUserId";
        //public const string const_Proc_GetLeaveReportById = "";
        public const string const_Proc_GetLeaveSummary = "procGetLeaveSummary";
        //public const string const_Proc_Getleavesummary_new = "";
        public const string const_Proc_GetLeaveReportByYear = "ProcGetLeaveReportByYear";
        public const string const_Proc_GetProjectAllocationByUserId = "ProcProjectAllocationByUserId";
        public const string const_Proc_GetMyTeamByUserId = "ProcMyTeamByUserId";
        public const string const_Proc_GetAlertList = "ProcGetAlertList";
        public const string const_Proc_GetAllDetails = "ProcGetAllDetails";
        public const string const_Proc_GetProjectUnplanned = "fnGetProjectUnplanned";
        //public const string const_Proc_GetPendingLeave = "ProcGetAlertList";
        public const string const_Proc_GetOpportunityPending = "fnGetOpportunityPending";
        public const string const_Proc_GetInvoicePending = "fnGetInvoicePendingAlert";
        public const string const_Proc_GetCollectionPending = "fnGetCollectionPendingAlert";
        public const string const_Proc_GetAppraisalPending = "fnGetAppraisalPendingAlert";
        public const string const_Proc_GetSuggestion = "fnGetSuggestionAlert";
        public const string const_Proc_GetPendingTask = "fnGetPendingTaskAlert";
        public const string const_Proc_GetUserSkillById = "ProcUserSkillById";
        public const string const_Proc_GetSkillReportByUserId = "ProcSkillReportByUserId";

        //Procedures for GetLeaveSummary_New function in code.
        public const string const_Proc_GetLeaveSummary_New = "procGetLeaveSummary_New";
        public const string const_Proc_GetPresentDaysBetweenDateForEmp = "procGetPresentDaysBetweenDateForEmp";
        public const string const_Proc_GetEmployeeLeaveRelatedDetailForDate = "procGetEmployeeLeaveRelatedDetailForDate";

        public const string const_Proc_GetNWDHistoryForEmpForDate = "procGetNWDHistoryForEmpForDate";
        public const string const_Proc_GetEmpHolidayListForDate = "procGetEmpHolidayListForDate";
        public const string const_Proc_GetHolidayForDate = "procGetHolidayForDate";
        public const string const_Proc_GetLeaveFormDetail = "procGetLeaveFormDetail";
        public const string const_Proc_GetEmpLeaveLedgerForDate = "procGetEmpLeaveLedgerForDate";

        public const string const_Proc_GetActualEntryTimeAndGraceForPunchInId = "procGetActualEntryTimeAndGraceForPunchInId";
        public const string const_Proc_GetLevelsList = "ProcLevels_GetLevelsList";
        public const string const_Proc_GetLevels_PointsLegend = "Levels_PointsLegend";
        public const string const_Proc_GetProgressive = "Levels_GetProgressiveDetails";
        public const string const_Proc_GetPointsDetails = "ProcLevels_ReportAdmin";

        public const string const_ProcCalTotalAttendanceReport = "ProcCalTotalAttendanceReport";



    }
}
