using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VIS_Domain;
using VIS_Domain.Reports;
using VIS_Repository;
using VIS_Repository.Reports;
using VIS_Domain.Reports.Attendance;
using VIS_Repository.Reports.Attendance;

namespace VIS_App.Controllers.Report.Attendance
{
    public class ProductivityTrackerReportAPIController : BaseAPIController
    {
        ProductivityTrackerReportRepository objProductivityTrackerReportRepository = null;

        public ProductivityTrackerReportAPIController()
        {
            objProductivityTrackerReportRepository = new ProductivityTrackerReportRepository(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
        }

        [Route("api/ProductivityTrackerReportAPI/FillDepartment")]
        [HttpGet]
        public HttpResponseMessage FillDepartment()
        {
            return ToJson(objProductivityTrackerReportRepository.FillDepartment());
        }
        
        [Route("api/ProductivityTrackerReportAPI/FillEmployee")]
        [HttpGet]
        public HttpResponseMessage FillEmployee(Int64 UserId,Boolean InActive)
        {
            return ToJson(objProductivityTrackerReportRepository.FillEmployee(UserId,InActive));
        }

        [Route("api/ProductivityTrackerReportAPI/FillAllEmployees")]
        [HttpGet]
        public HttpResponseMessage FillAllEmployees(Int64 UserId, Boolean Allow)
        {
            return ToJson(objProductivityTrackerReportRepository.FillAllEmployees(UserId, Allow));
        }
        
        [Route("api/ProductivityTrackerReportAPI/FillLineManager")]
        [HttpGet]
        public HttpResponseMessage FillLineManager(Int64 UserId, Boolean Allow)
        {
            return ToJson(objProductivityTrackerReportRepository.FillLineManager(UserId, Allow));
        }
        
        [Route("api/ProductivityTrackerReportAPI/FillOverall")]
        [HttpGet]
        public HttpResponseMessage FillOverall()
        {
            return ToJson(objProductivityTrackerReportRepository.FillOverall());
        }
        
        [Route("api/ProductivityTrackerReportAPI/FillLookup")]
        [HttpGet]
        public HttpResponseMessage FillLookup()
        {
            return ToJson(objProductivityTrackerReportRepository.FillLookup());
        }

        [Route("api/ProductivityTrackerReportAPI/FillYear")]
        [HttpGet]
        public HttpResponseMessage FillYear()
        {
            return ToJson(objProductivityTrackerReportRepository.FillYear());
        }

        [Route("api/ProductivityTrackerReportAPI/GetProductivity")]
        [HttpGet]
        public HttpResponseMessage GetProductivity(string sort, string FromDate, string ToDate, string Employeeids, string Mode, string OutIds, string Consolidatedview, string chk)
        {
            return ToJson(objProductivityTrackerReportRepository.GetProductivity(sort, FromDate,ToDate,Employeeids,Mode, OutIds, Consolidatedview,chk));
        }
        
    }
}
