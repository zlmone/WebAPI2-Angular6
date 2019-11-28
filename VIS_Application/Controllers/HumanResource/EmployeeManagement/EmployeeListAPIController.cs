using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VIS_Domain.HumanResource.EmployeeManagement;
using VIS_Repository.HumanResource.EmployeeManagement;

namespace VIS_App.Controllers.HumanResource.EmployeeManagement
{
    public class EmployeeListAPIController : BaseAPIController
    {

        EmployeeListRepository ObjEmployeeListRepository = null;
        public EmployeeListAPIController()
        {
            ObjEmployeeListRepository = new EmployeeListRepository(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
        }


        public HttpResponseMessage Get()
        {
            return ToJson(ObjEmployeeListRepository.GetEntityList().AsEnumerable());
        }
        [Route("api/EmployeeListAPI/GetEmployeeListActive")]
        [HttpGet]
        public HttpResponseMessage GetEmployeeListActive(string Usertype, long UserId, string EmployeeCode)
        {
            return ToJson(ObjEmployeeListRepository.GetEmployeeListActive(Usertype, UserId, EmployeeCode));
        }
        [Route("api/EmployeeListAPI/GetEmployeeListAll")]
        [HttpGet]
        public HttpResponseMessage GetEmployeeListAll(string Usertype, long UserId, string EmployeeCode)
        {
            return ToJson(ObjEmployeeListRepository.GetEmployeeListAll(Usertype, UserId, EmployeeCode));
        }
        [Route("api/EmployeeListAPI/GetEmployeeListInActive")]
        [HttpGet]
        public HttpResponseMessage GetEmployeeListInActive(string Usertype, long UserId, string EmployeeCode)
        {
            return ToJson(ObjEmployeeListRepository.GetEmployeeListInActive(Usertype, UserId, EmployeeCode));
        }

        
        [Route("api/EmployeeListAPI/GetEmployeeModeActive")]
        [HttpGet]
        public HttpResponseMessage GetEmployeeModeActive(string Usertype, long UserId)
        {
            return ToJson(ObjEmployeeListRepository.GetEmployeeModeActive(Usertype, UserId));
        }
        [Route("api/EmployeeListAPI/GetEmployeeModeAll")]
        [HttpGet]
        public HttpResponseMessage GetEmployeeModeAll(string Usertype, long UserId)
        {
            return ToJson(ObjEmployeeListRepository.GetEmployeeModeAll(Usertype, UserId ));
        }
        [Route("api/EmployeeListAPI/GetEmployeeModeInActive")]
        [HttpGet]
        public HttpResponseMessage GetEmployeeModeInActive(string Usertype, long UserId)
        {
            return ToJson(ObjEmployeeListRepository.GetEmployeeModeInActive(Usertype, UserId));
        }

        public HttpResponseMessage Post([FromBody]EmployeeList value)
        {
            return ToJson(ObjEmployeeListRepository.AddEntity(value));
        }

        [HttpPut]
        public HttpResponseMessage UpdateEntity(Int64 Id, [FromBody]EmployeeList value)
        {
            return ToJson(ObjEmployeeListRepository.UpdateEntity(value));
        }
        //[Route("api/EmployeeListAPI/deleteEmployeeid")]
        //[HttpDelete]
        //public HttpResponseMessage deleteEmployeeid(Int64 id)
        //{
        //    return ToJson(ObjEmployeeListRepository.deleteEmployeeid(id));
        //}
        [HttpDelete]
        public HttpResponseMessage DeleteEntity(Int64 id)
        {
            return ToJson(ObjEmployeeListRepository.deleteEmployeeid(id));
        }
    }
}
