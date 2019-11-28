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
    public class DailyEntrysheetAPIController : BaseAPIController
    {
        DailyEntrySheetRepository objDailyEntrySheetRepository = null;

        public DailyEntrysheetAPIController()
        {
            objDailyEntrySheetRepository = new DailyEntrySheetRepository(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
            
        }

        [Route("api/DailyEntrysheetAPI/GetDailyEntryRecord")]
        [HttpGet]
        public HttpResponseMessage GetDailyEntryRecord(Int64 Id,string Date)
        {
            return ToJson(objDailyEntrySheetRepository.GetDailyEntrySheetData(Id, Date));

        }

        [Route("api/DailyEntrysheetAPI/GetDailyEntryTime")]
        [HttpGet]
        public HttpResponseMessage GetDailyEntryTime(Int64 Id, string Date)
        {
            return ToJson(objDailyEntrySheetRepository.GetDailyEntrySheetTime(Id, Date));

        }

        [Route("api/DailyEntrysheetAPI/GetDailyEntryTimeAllEmp")]
        [HttpGet]
        public HttpResponseMessage GetDailyEntryTimeAllEmp(string Date)
        {
            return ToJson(objDailyEntrySheetRepository.GetDailyEntrySheetTimeAllEmployee(Date));
        }

        [Route("api/DailyEntrysheetAPI/GetAllEmployee")]
        [HttpGet]
        public HttpResponseMessage GetAllEmployee()
        {
            return ToJson(objDailyEntrySheetRepository.GetAllEmployees());
        }

        [Route("api/DailyEntrysheetAPI/UpdateReportDeatil")]
        [HttpPut]
        public HttpResponseMessage UpdateReportDeatil(DailyEntrysheetEmployee entityObject)
        {
            return ToJson(objDailyEntrySheetRepository.UpdateReportDetail(entityObject));
        }

    }
}
