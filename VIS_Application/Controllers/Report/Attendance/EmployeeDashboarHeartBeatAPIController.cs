using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VIS_Domain;
using VIS_Domain.Master;
using VIS_Repository;
using VIS_Repository.Masters;
using System.Configuration;
using VIS_Domain.Master.Configuration;
using VIS_Repository.Masters.Configuration;
using VIS_Repository.Reports.Attendance;
using VIS_Repository.Dashboard;
using VIS_Repository.Reports;

namespace VIS_App.Controllers.Report.Attendance
{
    public class EmployeeDashboarHeartBeatAPIController : BaseAPIController
    {
        EmployeeDashboardHeartBeatReportRepository objEmployeeDashboardHeartBeatReportRepository = null;

        public EmployeeDashboarHeartBeatAPIController()
        {
            objEmployeeDashboardHeartBeatReportRepository = new EmployeeDashboardHeartBeatReportRepository(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);

        }

        [Route("api/EmployeeDashboarHeartBeatAPI/GetEmployee")]
        [HttpGet]
        public HttpResponseMessage GetEmployee()
        {
            return ToJson(objEmployeeDashboardHeartBeatReportRepository.GetEmployee());

        }

        [Route("api/EmployeeDashboarHeartBeatAPI/GetYear")]
        [HttpGet]
        public HttpResponseMessage GetYear()
        {
            return ToJson(objEmployeeDashboardHeartBeatReportRepository.GetYear());
        }

        [Route("api/EmployeeDashboarHeartBeatAPI/GetEmployeeDashboardHeartBeatReport")]
        [HttpPost]
        public HttpResponseMessage GetEmployeeDashboardHeartBeatReport(EmployeeDashboardHeartBeatReportParameterModel entityobject)
        {
            if (entityobject.MonthWise == true)
            {
                entityobject.FromDate = new DateTime(Convert.ToInt32(entityobject.FromYear), Convert.ToInt32(entityobject.FromMonth), 01);
                entityobject.ToDate = new DateTime(Convert.ToInt32(entityobject.ToYear), Convert.ToInt32(entityobject.ToMonth), DateTime.DaysInMonth(Convert.ToInt32(entityobject.ToYear), Convert.ToInt32(entityobject.ToMonth)));
            }
            return ToJson(objEmployeeDashboardHeartBeatReportRepository.GetEmployeeDashboardHeartBeatReporytByEmployeeId(entityobject));
        }

    }
}
