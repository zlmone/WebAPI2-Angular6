using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VIS_Domain.Reports.Attendance;
using VIS_Repository.Reports;
using VIS_Repository.Reports.Attendance;

namespace VIS_App.Controllers.Report.Attendance
{
    public class OfficialWorkReportAPIController : BaseAPIController
    {
        OfficialWorkReportRepository objOfficialWorkReportRepository = null;

        public OfficialWorkReportAPIController()
        {
            objOfficialWorkReportRepository = new OfficialWorkReportRepository(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);

        }

        [Route("api/OfficialWorkReportAPI/GetEmployee")]
        [HttpGet]
        public HttpResponseMessage GetEmployee()
        {
            return ToJson(objOfficialWorkReportRepository.GetEmployee());
        }

        [Route("api/OfficialWorkReportAPI/GetYear")]
        [HttpGet]
        public HttpResponseMessage GetYear()
        {
            return ToJson(objOfficialWorkReportRepository.GetYear());
        }

        [Route("api/OfficialWorkReportAPI/GetOfficialWorkReport")]
        [HttpPost]
        public HttpResponseMessage GetOfficialWorkReport(OfficialWorkReportParamterModel entityobject)

        {
            if (entityobject.MonthWise == true)
            {
                entityobject.FromDate = new DateTime(Convert.ToInt32(entityobject.FromYear), Convert.ToInt32(entityobject.FromMonth), 01);
                entityobject.ToDate = new DateTime(Convert.ToInt32(entityobject.FromYear), Convert.ToInt32(entityobject.FromMonth), DateTime.DaysInMonth(Convert.ToInt32(entityobject.FromYear), Convert.ToInt32(entityobject.FromMonth)));
            }
            return ToJson(objOfficialWorkReportRepository.GetOfficialWorkReport(entityobject));
        }


    }
}
