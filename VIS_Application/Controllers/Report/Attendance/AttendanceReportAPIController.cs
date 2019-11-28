using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VIS_Domain;
using VIS_Domain.Reports;
using VIS_Repository;
using VIS_Repository.Reports;
using System.Configuration;
using VIS_Domain.Reports.Attendance;
using VIS_Repository.Reports.Attendance;

namespace VIS_App.Controllers.Report.Attendance
{
    public class AttendanceReportAPIController : BaseAPIController
    {
        Reports_AttendanceRepository objReports_AttendanceRepository = null;

        public AttendanceReportAPIController()
        {
            objReports_AttendanceRepository = new Reports_AttendanceRepository(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
        }

        [Route("api/AttendanceReportAPI/GetBindAttendanceData")]
        [HttpGet]
        public HttpResponseMessage GetBindAttendanceData(int Id, string strDate, string ToDate, string name, int DRPData, string rdbDate, string Rdbmonth, int month, int year)
        {
            return ToJson(objReports_AttendanceRepository.GetBindAttendanceData(Id, strDate, ToDate, name, DRPData, rdbDate, Rdbmonth, month, year));
        }

        [Route("api/AttendanceReportAPI/GetDepartment")]
        [HttpGet]
        public HttpResponseMessage GetDepartment()
        {
            return ToJson(objReports_AttendanceRepository.GetDepartment());
        }

        [Route("api/AttendanceReportAPI/GetEmployee")]
        [HttpGet]
        public HttpResponseMessage GetEmployee()
        {
            return ToJson(objReports_AttendanceRepository.GetEmployee());
        }

        [Route("api/AttendanceReportAPI/GetAllEmployee")]
        [HttpGet]
        public HttpResponseMessage GetAllEmployee()
        {
            return ToJson(objReports_AttendanceRepository.GetAllEmployee());
        }

        [Route("api/AttendanceReportAPI/GetCompany")]
        [HttpGet]
        public HttpResponseMessage GetCompany()
        {
            return ToJson(objReports_AttendanceRepository.GetCompany());
        }

        [Route("api/AttendanceReportAPI/GetLineManager")]
        [HttpGet]
        public HttpResponseMessage GetLineManager()
        {
            return ToJson(objReports_AttendanceRepository.GetLineManager());
        }

        [Route("api/AttendanceReportAPI/GetYear")]
        [HttpGet]
        public HttpResponseMessage GetYear()
        {
            return ToJson(objReports_AttendanceRepository.GetEntityYear());
        }

        [Route("api/AttendanceReportAPI/GetMissingEntry")]
        [HttpGet]
        public HttpResponseMessage GetMissingEntry(string fromdate, string todate, string Employeeids)
        {
            return ToJson(objReports_AttendanceRepository.GetMissingEntry(fromdate,todate, Employeeids));
        }

        [Route("api/AttendanceReportAPI/GetDeductionDetails")]
        [HttpGet]
        public HttpResponseMessage GetDeductionDetails(string fromdate,string todate,string Employeeids)
        {
            return ToJson(objReports_AttendanceRepository.GetDeductionDetails(fromdate,todate,Employeeids));
        }
        
        [Route("api/AttendanceReportAPI/SelectDepartment")]
        [HttpGet]
        public HttpResponseMessage SelectDepartment(string Department)
        {
            return ToJson(objReports_AttendanceRepository.SelectDepartment(Department));
        }
        
        [Route("api/AttendanceReportAPI/SelectCompany")]
        [HttpGet]
        public HttpResponseMessage SelectCompany(string Company)
        {
            return ToJson(objReports_AttendanceRepository.SelectCompany(Company));
        }
        
        [Route("api/AttendanceReportAPI/SelectLineManager")]
        [HttpGet]
        public HttpResponseMessage SelectLineManager(string LineManager)
        {
            return ToJson(objReports_AttendanceRepository.SelectLineManager(LineManager));
        }

        [Route("api/AttendanceReportAPI/GetDepartmentEmployee")]
        [HttpGet]
        public HttpResponseMessage GetDepartmentEmployee(int Id)
        {
            return ToJson(objReports_AttendanceRepository.GetDepartmentEmployee(Id));
        }

        [Route("api/AttendanceReportAPI/GetCheckedData")] //---Checkbox checked value Get from Server side.
        [HttpGet]
        public HttpResponseMessage GetCheckedData(string name, string DRPData)
        {
            return ToJson(objReports_AttendanceRepository.GetcheckedData(name, DRPData));
        }
        //---Attendance Approve Punch In API

        [Route("api/AttendanceReportAPI/AttendanceApproval")]
        [HttpGet]
        public HttpResponseMessage AttendanceApproval(int InId, int EntryType, string Remarks, string Date, string Time, int Grace, string ActualHrs)
        {
            return ToJson(objReports_AttendanceRepository.UpdateEntity(InId, EntryType, Remarks, Date, Time, Grace, ActualHrs));
        }

        [Route("api/AttendanceReportAPI/GetDailyEntryTime")]
        [HttpGet]
        public HttpResponseMessage GetDailyEntryTime(int Employee_Id, string Date)
        {
            return ToJson(objReports_AttendanceRepository.GetDailyEntryTime(Employee_Id, Date));
        }

        [Route("api/AttendanceReportAPI/AttendanceApproveAdd")]
        [HttpGet]
        public HttpResponseMessage AttendanceApproveAdd(int Id, int Employee_Id, int EntryType, string HODRemarks, string Temp, string strDate, string Time, int Grace)
        {
            return ToJson(objReports_AttendanceRepository.AddEntity(Id, Employee_Id, EntryType, HODRemarks, Temp, strDate, Time, Grace));
        }

        [Route("api/AttendanceReportAPI/AttendanceRejectPunchIn")]
        [HttpGet]
        public HttpResponseMessage AttendanceRejectPunchIn(int Employee_Id, int EntryType, string Date, string RemarksIn, int InId)
        {
            return ToJson(objReports_AttendanceRepository.AttendanceRejectPunchIn(Employee_Id, EntryType, Date, RemarksIn, InId));
        }

        [Route("api/AttendanceReportAPI/ApproveAttendanceOkIn")]
        [HttpGet]
        public HttpResponseMessage ApproveAttendanceOkIn(int InId, string Remarks)
        {
            return ToJson(objReports_AttendanceRepository.ApproveAttendanceOkIn(InId, Remarks));
        }

        //---Attendance Approve Punch Out API

        [Route("api/AttendanceReportAPI/ApproveAttendancePunchOut")]
        [HttpGet]
        public HttpResponseMessage ApproveAttendancePunchOut(int OutId, int EntryType, string Remarks, string Date, string Time, int Grace, string ActualHrs)
        {
            return ToJson(objReports_AttendanceRepository.ApproveAttendancePunchOut(OutId, EntryType, Remarks, Date, Time, Grace, ActualHrs));
        }

        [Route("api/AttendanceReportAPI/AddEmployeeAttendancePunchOut")]
        [HttpGet]
        public HttpResponseMessage AddEmployeeAttendancePunchOut(int Employee_Id, int EntryType, string HODRemarks, string Temp, string strDate, string Time, int Grace)
        {
            return ToJson(objReports_AttendanceRepository.AddEmployeeAttendancePunchOut(Employee_Id, EntryType, HODRemarks, Temp, strDate, Time, Grace));
        }

        [Route("api/AttendanceReportAPI/AttendanceRejectPunchOut")]
        [HttpGet]
        public HttpResponseMessage AttendanceRejectPunchOut(int Employee_Id, int EntryType, string Date, string HODRemarks, int OutId)
        {
            return ToJson(objReports_AttendanceRepository.AttendanceRejectPunchOut(Employee_Id, EntryType, Date, HODRemarks, OutId));
        }

        [Route("api/AttendanceReportAPI/ApproveAttendanceOkPunchOut")]
        [HttpGet]
        public HttpResponseMessage ApproveAttendanceOkPunchOut(int OutId, string Remarks)
        {
            return ToJson(objReports_AttendanceRepository.ApproveAttendanceOkPunchOut(OutId, Remarks));
        }

        //---Attendance Approve Lunch Out API
        [Route("api/AttendanceReportAPI/ApproveAttendanceLunchOut")]
        [HttpGet]
        public HttpResponseMessage ApproveAttendanceLunchOut(int LunchOutId, string Remarks, string Time)
        {
            return ToJson(objReports_AttendanceRepository.ApproveAttendanceLunchOut(LunchOutId, Remarks, Time));
        }

        [Route("api/AttendanceReportAPI/AddEmployeeAttendanceLunchOut")]
        [HttpGet]
        public HttpResponseMessage AddEmployeeAttendanceLunchOut(int Employee_Id, int EntryType, string Remarks, string Temp, string Date, string Time)
        {
            return ToJson(objReports_AttendanceRepository.AddEmployeeAttendanceLunchOut(Employee_Id, EntryType, Remarks, Temp, Date, Time));
        }

        [Route("api/AttendanceReportAPI/AttendanceRejectLunchOut")]
        [HttpGet]
        public HttpResponseMessage AttendanceRejectLunchOut(int LunchOutId, int Employee_Id, int EntryType, string Date, string HODRemarks)
        {
            return ToJson(objReports_AttendanceRepository.AttendanceRejectLunchOut(LunchOutId, Employee_Id, EntryType, Date, HODRemarks));
        }

        [Route("api/AttendanceReportAPI/ApproveAttendanceOkLunchOut")]
        [HttpGet]
        public HttpResponseMessage ApproveAttendanceOkLunchOut(int LunchOutId, string Remarks)
        {
            return ToJson(objReports_AttendanceRepository.ApproveAttendanceOkLunchOut(LunchOutId, Remarks));
        }

        [Route("api/AttendanceReportAPI/ApproveAttendanceLunchIn")]
        [HttpGet]
        public HttpResponseMessage ApproveAttendanceLunchIn(int LunchInId, string Remarks, string Time)
        {
            return ToJson(objReports_AttendanceRepository.ApproveAttendanceLunchIn(LunchInId, Remarks,Time));
        }

        [Route("api/AttendanceReportAPI/AddEmployeeAttendanceLunchIn")]
        [HttpGet]
        public HttpResponseMessage AddEmployeeAttendanceLunchIn(int Employee_Id, int EntryType, string Remarks, string Temp, string Date, string Time)
        {
            return ToJson(objReports_AttendanceRepository.AddEmployeeAttendanceLunchIn(Employee_Id, EntryType, Remarks, Temp, Date, Time));
        }

        [Route("api/AttendanceReportAPI/AttendanceRejectLunchIn")]
        [HttpGet]
        public HttpResponseMessage AttendanceRejectLunchIn(int Employee_Id, int LunchInId, int EntryType, string Date, string HODRemarks)
        {
            return ToJson(objReports_AttendanceRepository.AttendanceRejectLunchIn(Employee_Id, LunchInId, EntryType, Date, HODRemarks));
        }

        [Route("api/AttendanceReportAPI/ApproveAttendanceOkLunchIn")]
        [HttpGet]
        public HttpResponseMessage ApproveAttendanceOkLunchIn(int LunchInId,string Remarks)
        {
            return ToJson(objReports_AttendanceRepository.ApproveAttendanceOkLunchIn(LunchInId,Remarks));
        }

        //---Attendance Approve Other API
        [Route("api/AttendanceReportAPI/ApproveAttendanceOther")]
        [HttpGet]
        public HttpResponseMessage ApproveAttendanceOther(int OtherId, string Remarks,string Time)
        {
            return ToJson(objReports_AttendanceRepository.ApproveAttendanceOther(OtherId, Remarks,Time));
        }
        
        [Route("api/AttendanceReportAPI/GetEmployeeIsNotHostEmployee")]
        [HttpGet]
        public HttpResponseMessage GetEmployeeIsNotHostEmployee(int Employee_Id)
        {
            return ToJson(objReports_AttendanceRepository.GetEmployeeIsNotHostEmployee(Employee_Id));
        }
        
        [Route("api/AttendanceReportAPI/AddEmployeeAttendanceOtherwork")]
        [HttpGet]
        public HttpResponseMessage AddEmployeeAttendanceOtherwork(int Employee_Id,int EntryType,string HODRemarks,string Temp,string Date,string Time)
        {
            return ToJson(objReports_AttendanceRepository.AddEmployeeAttendanceOtherwork(Employee_Id,EntryType,HODRemarks,Temp,Date,Time));
        }
        
        [Route("api/AttendanceReportAPI/AttendanceRejectOtherWork")]
        [HttpGet]
        public HttpResponseMessage AttendanceRejectOtherWork(int Employee_Id, int OtherId,int EntryType,string Date,string HODRemarks)
        {
            return ToJson(objReports_AttendanceRepository.AttendanceRejectOtherWork(Employee_Id, OtherId,EntryType,Date,HODRemarks));
        }
        
        [Route("api/AttendanceReportAPI/ApproveAttendanceOkOtherWorkIn")]
        [HttpGet]
        public HttpResponseMessage ApproveAttendanceOkOtherWorkIn(int OtherId,string Remarks)
        {
            return ToJson(objReports_AttendanceRepository.ApproveAttendanceOkOtherWorkIn(OtherId,Remarks));
        }
    }
}
