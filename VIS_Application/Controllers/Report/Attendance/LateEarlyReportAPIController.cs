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
    public class LateEarlyReportAPIController : BaseAPIController
    {
        LateEarlyReportRepository objLateEarlyReportRepository = null;

        public LateEarlyReportAPIController()
        {
            objLateEarlyReportRepository = new LateEarlyReportRepository(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);

        }

        [Route("api/LateEarlyReportAPI/GetEmployee")]
        [HttpGet]
        public HttpResponseMessage GetEmployee()
        {
            return ToJson(objLateEarlyReportRepository.GetEmployee());

        }

        [Route("api/LateEarlyReportAPI/GetAllEmployee")]
        [HttpGet]
        public HttpResponseMessage GetAllEmployee()
        {
            return ToJson(objLateEarlyReportRepository.GetAllEmployee());

        }

        [Route("api/LateEarlyReportAPI/GetDepartment")]
        [HttpGet]
        public HttpResponseMessage GetDepartment()
        {
            return ToJson(objLateEarlyReportRepository.GetDepartment());

        }


        [Route("api/LateEarlyReportAPI/GetCompany")]
        [HttpGet]
        public HttpResponseMessage GetCompany()
        {
            return ToJson(objLateEarlyReportRepository.GetCompany());

        }


        [Route("api/LateEarlyReportAPI/GetYear")]
        [HttpGet]
        public HttpResponseMessage GetYear()
        {
            return ToJson(objLateEarlyReportRepository.GetYear());

        }


        [Route("api/LateEarlyReportAPI/GetIdByDepartment")]
        [HttpGet]
        public HttpResponseMessage GetIdByDepartment(Int64 Id, DateTime Fromdate, DateTime Todate, bool MonthWise, string FromMonth, string FromYear)
        {
            if (MonthWise == true)
            {
                Fromdate = new DateTime(Convert.ToInt32(FromYear), Convert.ToInt32(FromMonth), 01);
                Todate = new DateTime(Convert.ToInt32(FromYear), Convert.ToInt32(FromMonth), DateTime.DaysInMonth(Convert.ToInt32(FromYear), Convert.ToInt32(FromMonth)));
            }
            return ToJson(objLateEarlyReportRepository.GetEmployeeIdByDepartment(Id, Fromdate, Todate));

        }


        [Route("api/LateEarlyReportAPI/GetIdByEmployee")]
        [HttpGet]
        public HttpResponseMessage GetIdByEmployee(Int64 Id, DateTime Fromdate,DateTime Todate,bool MonthWise,string FromMonth,string FromYear)
        {
            if (MonthWise == true)
            {
                Fromdate = new DateTime(Convert.ToInt32(FromYear), Convert.ToInt32(FromMonth), 01);
                Todate = new DateTime(Convert.ToInt32(FromYear), Convert.ToInt32(FromMonth), DateTime.DaysInMonth(Convert.ToInt32(FromYear), Convert.ToInt32(FromMonth)));
            }
            return ToJson(objLateEarlyReportRepository.GetEmployeeIdByEmployee(Id,Fromdate,Todate));
        }


        [Route("api/LateEarlyReportAPI/GetIdByCompany")]
        [HttpGet]
        public HttpResponseMessage GetIdByCompany(Int64 Id, DateTime Fromdate, DateTime Todate, bool MonthWise, string FromMonth, string FromYear)
        {
            if (MonthWise == true)
            {
                Fromdate = new DateTime(Convert.ToInt32(FromYear), Convert.ToInt32(FromMonth), 01);
                Todate = new DateTime(Convert.ToInt32(FromYear), Convert.ToInt32(FromMonth), DateTime.DaysInMonth(Convert.ToInt32(FromYear), Convert.ToInt32(FromMonth)));
            }
            return ToJson(objLateEarlyReportRepository.GetEmployeeIdByCompany(Id,Fromdate,Todate));

        }


        [Route("api/LateEarlyReportAPI/GetIdBySelectAll")]
        [HttpGet]
        public HttpResponseMessage GetIdBySelectAll(Int64 Id, DateTime Fromdate, DateTime Todate, bool MonthWise, string FromMonth, string FromYear)
        {
            if (MonthWise == true)
            {
                Fromdate = new DateTime(Convert.ToInt32(FromYear), Convert.ToInt32(FromMonth), 01);
                Todate = new DateTime(Convert.ToInt32(FromYear), Convert.ToInt32(FromMonth), DateTime.DaysInMonth(Convert.ToInt32(FromYear), Convert.ToInt32(FromMonth)));
            }
            return ToJson(objLateEarlyReportRepository.GetEmployeeIdSelectAll(Id, Fromdate, Todate));

        }


    }
}
