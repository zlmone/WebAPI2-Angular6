using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using VIS_Domain.Master.Configuration;
using VIS_Repository.Reports.Attendance;

namespace VIS_App.Controllers.Report.Attendance
{
    public class AttendanceAccessCardComparisionReportAPIController : BaseAPIController
    {

        AttendanceAccessCardComparisionReportRepository objAttendanceAccessCardComparisionReportRepository = null;

        public AttendanceAccessCardComparisionReportAPIController()
        {
            objAttendanceAccessCardComparisionReportRepository = new AttendanceAccessCardComparisionReportRepository(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);

        }

        [Route("api/AttendanceAccessCardComparisionReportAPI/GetEmployee")]
        [HttpGet]
        public HttpResponseMessage GetEmployee()
        {
            return ToJson(objAttendanceAccessCardComparisionReportRepository.GetEmployee());

        }

        [Route("api/AttendanceAccessCardComparisionReportAPI/GetYear")]
        [HttpGet]
        public HttpResponseMessage GetYear()
        {
            return ToJson(objAttendanceAccessCardComparisionReportRepository.GetYear());
        }

        [Route("api/AttendanceAccessCardComparisionReportAPI/GetEmployeeAccessCardEntryComparision")]
        [HttpPost]
        public HttpResponseMessage GetEmployeeAccessCardEntryComparision(AttendanceAccessCardComparisionReportParameterModel entityobject)
        {
            if (entityobject.MonthWise == true)
            {
                entityobject.FromDate = new DateTime(Convert.ToInt32(entityobject.FromYear), Convert.ToInt32(entityobject.FromMonth), 01);
                entityobject.ToDate = new DateTime(Convert.ToInt32(entityobject.ToYear), Convert.ToInt32(entityobject.ToMonth), DateTime.DaysInMonth(Convert.ToInt32(entityobject.ToYear), Convert.ToInt32(entityobject.ToMonth)));
            }
            return ToJson(objAttendanceAccessCardComparisionReportRepository.GetAttendanceAccessCardEntryComparisionEmployeeId(entityobject));
        }

    }

}
