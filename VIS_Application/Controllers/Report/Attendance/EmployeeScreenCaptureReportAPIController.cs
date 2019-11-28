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

namespace VIS_App.Controllers.Masters.Configuration
{
    public class EmployeeScreenCaptureReportAPIController : BaseAPIController
    {
        EmployeeScreenCaptureReportRepository objEmployeeScreenCaptureReportRepository = null;

        public EmployeeScreenCaptureReportAPIController()
        {
            objEmployeeScreenCaptureReportRepository = new EmployeeScreenCaptureReportRepository(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);

        }

        [Route("api/EmployeeScreenCaptureReportAPI/GetEmployee")]
        [HttpGet]
        public HttpResponseMessage GetEmployee()
        {
            return ToJson(objEmployeeScreenCaptureReportRepository.GetEmployee());

        }

        [Route("api/EmployeeScreenCaptureReportAPI/GetYear")]
        [HttpGet]
        public HttpResponseMessage GetYear()
        {
            return ToJson(objEmployeeScreenCaptureReportRepository.GetYear());
        }

        [Route("api/EmployeeScreenCaptureReportAPI/GetReportByEmployeeId")]
        [HttpPost]
        public HttpResponseMessage GetReportByEmployeeId(EmployeeScreenCaptureParamterModel entityobject)
        {
            if(entityobject.MonthWise==true)
            {
                entityobject.FromDate = new DateTime(Convert.ToInt32(entityobject.FromYear), Convert.ToInt32(entityobject.FromMonth), 01);
                entityobject.ToDate = new DateTime(Convert.ToInt32(entityobject.ToYear), Convert.ToInt32(entityobject.ToMonth), DateTime.DaysInMonth(Convert.ToInt32(entityobject.ToYear), Convert.ToInt32(entityobject.ToMonth)));
            }
            return ToJson(objEmployeeScreenCaptureReportRepository.GetScreenCaptureReportByEmployeeId(entityobject));
        }






    }
}
