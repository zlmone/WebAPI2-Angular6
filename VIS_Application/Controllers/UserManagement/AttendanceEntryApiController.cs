using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VIS_Domain.UserManagement;
using VIS_Repository;
using VIS_Repository.UserManagement;

namespace VIS_App.Controllers.UserManagement
{
    public class AttendanceEntryApiController : BaseAPIController
    {
        AttendanceEntryRepository objAttendanceEntryRepository = new AttendanceEntryRepository(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);

        [Route("api/AttendanceEntryApi/AddAttendanceEntryDetails")]
        [HttpPost]
        public HttpResponseMessage AddAttendanceEntryDetails(AttendanceEntry objAttendance)
        {
            return ToJson(objAttendanceEntryRepository.AddEntity(objAttendance).AsEnumerable());
        }

        [Route("api/AttendanceEntryApi/GetTime")]
        [HttpGet]
        public HttpResponseMessage GetTime(int Id, string Date)
        {
            return ToJson(objAttendanceEntryRepository.GetTimeDetails(Id, Date));
        }

        [Route("api/AttendanceEntryApi/GetPunchOutNextDayDetails")]
        [HttpGet]
        public HttpResponseMessage GetPunchOutNextDayDetails(int Id, string Date)
        {
            return ToJson(objAttendanceEntryRepository.GetPunchOutonNextday(Id, Date));
        }
        [Route("api/AttendanceEntryApi/GetEmployeeName")]
        [HttpGet]
        public HttpResponseMessage GetEmployeeName(int Id)
        {
            return ToJson(objAttendanceEntryRepository.GetEmployeeName(Id));
        }

    }
}
