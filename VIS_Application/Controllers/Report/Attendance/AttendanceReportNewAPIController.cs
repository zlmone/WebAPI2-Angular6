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
    
    public class AttendanceReportNewAPIController : BaseAPIController
    {
        AttendanceReportNewRepository objAttendanceReportNew = null;

        public AttendanceReportNewAPIController()
        {
            objAttendanceReportNew = new AttendanceReportNewRepository(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
        }
        
        [Route("api/AttendanceReportNewAPI/FillDepartMent")]
        [HttpGet]
        public HttpResponseMessage FillDepartMent()
        {
            return ToJson(objAttendanceReportNew.FillDepartMent());
        }
        
        [Route("api/AttendanceReportNewAPI/FillEmployee")]
        [HttpGet]
        public HttpResponseMessage FillEmployee(Int64 UserId,string UserType)
        {
            return ToJson(objAttendanceReportNew.FillEmployee(UserId,UserType));
        }
        
        [Route("api/AttendanceReportNewAPI/FillYear")]
        [HttpGet]
        public HttpResponseMessage FillYear()
        {
            return ToJson(objAttendanceReportNew.FillYear());
        }
        
        [Route("api/AttendanceReportNewAPI/FillCompany")]
        [HttpGet]
        public HttpResponseMessage FillCompany(Boolean Allow)
        {
            return ToJson(objAttendanceReportNew.FillCompany(Allow));
        }
        
        [Route("api/AttendanceReportNewAPI/FillAllLineManager")]
        [HttpGet]
        public HttpResponseMessage FillAllLineManager(Boolean Allow,Int64 UserId)
        {
            return ToJson(objAttendanceReportNew.FillAllLineManager(Allow,UserId));
        }
        
        [Route("api/AttendanceReportNewAPI/FillUserType")]
        [HttpGet]
        public HttpResponseMessage FillUserType()
        {
            return ToJson(objAttendanceReportNew.FillUserType());
        }
        
        [Route("api/AttendanceReportNewAPI/FillAllEmployee")]
        [HttpGet]
        public HttpResponseMessage FillAllEmployee(Boolean Allow, Int64 UserId)
        {
            return ToJson(objAttendanceReportNew.FillAllEmployee(Allow,UserId));
        }
        
        [Route("api/AttendanceReportNewAPI/GetSystemDateTime")]
        [HttpGet]
        public HttpResponseMessage GetSystemDateTime()
        {
            return ToJson(objAttendanceReportNew.GetSystemDateTime());
        }
        
        [Route("api/AttendanceReportNewAPI/GetAllAttendanceData")]
        [HttpGet]
        public HttpResponseMessage GetAllAttendanceData(string Mode,Int64 ModeId,string StartDate,string EndDate,string SortBy,Boolean IsAdmin)
        {
            return ToJson(objAttendanceReportNew.GetAllAttendanceData(Mode,ModeId,StartDate,EndDate,SortBy,IsAdmin));
        }
        
        [Route("api/AttendanceReportNewAPI/GetAllAttendanceReport")]
        [HttpGet]
        public HttpResponseMessage GetAllAttendanceReport(string Mode, Int64 ModeId, string StartDate, string EndDate, string SortBy, Boolean IsAdmin)
        {
            return ToJson(objAttendanceReportNew.GetAllAttendanceReport(Mode, ModeId, StartDate, EndDate, SortBy, IsAdmin));
        }

    }
}
