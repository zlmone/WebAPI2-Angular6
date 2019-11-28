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
    public class OutReportAPIController : BaseAPIController
    {
        OutReportRepository objOutReportRepository = null;

        public OutReportAPIController()
        {
            objOutReportRepository = new OutReportRepository(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);

        }

        [Route("api/OutReportAPI/GetEmployee")]
        [HttpGet]
        public HttpResponseMessage GetEmployee()
        {
            return ToJson(objOutReportRepository.GetEmployee());

        }

        [Route("api/OutReportAPI/GetAllEmployee")]
        [HttpGet]
        public HttpResponseMessage GetAllEmployee()
        {
            return ToJson(objOutReportRepository.GetAllEmployee());

        }

        [Route("api/OutReportAPI/GetDepartment")]
        [HttpGet]
        public HttpResponseMessage GetDepartment()
        {
            return ToJson(objOutReportRepository.GetDepartment());

        }

        [Route("api/OutReportAPI/GetCompany")]
        [HttpGet]
        public HttpResponseMessage GetCompany()
        {
            return ToJson(objOutReportRepository.GetCompany());

        }

        [Route("api/OutReportAPI/GetLineManager")]
        [HttpGet]
        public HttpResponseMessage GetLineManager()
        {
            return ToJson(objOutReportRepository.GetLineManager());

        }

        [Route("api/OutReportAPI/GetReportByEmployeeId")]
        [HttpPost]
        public HttpResponseMessage GetReportByEmployeeId(OutReport entityobject)
        {
            return ToJson(objOutReportRepository.GetOutReportByEmployeeId(entityobject));
        }

        [Route("api/OutReportAPI/GetEmployeeIdByLM")]
        [HttpGet]
        public HttpResponseMessage GetEmployeeIdByLM(int LineManagerId)
        {
            return ToJson(objOutReportRepository.GetEmployeeIdByLM(LineManagerId));
        }

        [Route("api/OutReportAPI/GetEmployeeIdByCompany")]
        [HttpGet]
        public HttpResponseMessage GetEmployeeIdByCompany(int CompanyId)
        {
            return ToJson(objOutReportRepository.GetEmployeeIdByCompany(CompanyId));
        }

        [Route("api/OutReportAPI/GetEmployeeIdByDepartment")]
        [HttpGet]
        public HttpResponseMessage GetEmployeeIdByDepartment(int ParentId)
        {
            return ToJson(objOutReportRepository.GetEmployeeIdByDepartment(ParentId));
        }


    }
}
