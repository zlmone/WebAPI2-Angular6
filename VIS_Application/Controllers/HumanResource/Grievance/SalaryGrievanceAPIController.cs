using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VIS_Domain.HumanResource.Grievance;
using VIS_Repository.HumanResource.Grievance;


namespace VIS_App.Controllers.HumanResource.Grievance
{
    public class SalaryGrievanceAPIController : BaseAPIController
    {
        SalaryGrievanceRepository objSalaryGrievanceRepository = null;

        public SalaryGrievanceAPIController()
        {
            objSalaryGrievanceRepository = new SalaryGrievanceRepository(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
        }

        [Route("api/SalaryGrievanceAPI/GetGrievance")]
        [HttpGet]
        public HttpResponseMessage GetGrievance(Int64 UserId, string mode)
        {
            return ToJson(objSalaryGrievanceRepository.GetGrievance(UserId, mode));
        }

        [Route("api/SalaryGrievanceAPI/FillDeductionDate")]
        [HttpGet]
        public HttpResponseMessage FillDeductionDate(Int64 UserId, string mode)
        {
            return ToJson(objSalaryGrievanceRepository.FillDeductionDate(UserId, mode));
        }

        [Route("api/SalaryGrievanceAPI/LoadEmployeeDailyEntry")]
        [HttpGet]
        public HttpResponseMessage LoadEmployeeDailyEntry(Int64 EmployeeId, string Date)
        {
            return ToJson(objSalaryGrievanceRepository.LoadEmployeeDailyEntry(EmployeeId, Date));
        }

        [Route("api/SalaryGrievanceAPI/LoadEmployeeAttendance")]
        [HttpGet]
        public HttpResponseMessage LoadEmployeeAttendance(Int64 EmployeeId, string Date)
        {
            return ToJson(objSalaryGrievanceRepository.LoadEmployeeAttendance(EmployeeId, Date));
        }
        
        [Route("api/SalaryGrievanceAPI/AddGrievance")]
        [HttpGet]
        public HttpResponseMessage AddGrievance(Int64 EmployeeId, string Date, string PaycutAmt, string GrievanceRemark)
        {
            return ToJson(objSalaryGrievanceRepository.AddGrievance(EmployeeId, Date, PaycutAmt, GrievanceRemark));
        }
        
        [Route("api/SalaryGrievanceAPI/UpdateEntity")]
        [HttpPut]
        public HttpResponseMessage UpdateEntity(Int64 UpdatedBy, SalaryGrievance Value)
        {
            return ToJson(objSalaryGrievanceRepository.UpdateEntity(Value));
        }

        [Route("api/SalaryGrievanceAPI/GetGrievanceData")]
        [HttpGet]
        public HttpResponseMessage GetGrievanceData(Int64 Id)
        {
            return ToJson(objSalaryGrievanceRepository.GetGrievanceData(Id));
        }
    }
}
