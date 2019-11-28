using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VIS_Domain.HumanResource.EmployeeManagement;
using VIS_Domain.Master.CompanyRelated;
using VIS_Repository.HumanResource.EmployeeManagement;
using VIS_Repository.Masters.CompanyRelated;

namespace VIS_App.Controllers.HumanResource.EmployeeManagement
{
    public class SalaryBreakupTypeAPIController : BaseAPIController
    {

        SalaryBreakupTypeRepository ObjSalaryBreakupTypeRepository = null;
        public SalaryBreakupTypeAPIController()
        {
            ObjSalaryBreakupTypeRepository = new SalaryBreakupTypeRepository(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
        }


        public HttpResponseMessage Get()
        {
            return ToJson(ObjSalaryBreakupTypeRepository.GetEntityList().AsEnumerable());
        }

        public HttpResponseMessage Post([FromBody]SalaryBreakupType value)
        {
            return ToJson(ObjSalaryBreakupTypeRepository.AddEntity(value));
        }

        [HttpPut]
        public HttpResponseMessage UpdateEntity(Int64 Id, [FromBody]SalaryBreakupType value)
        {
            return ToJson(ObjSalaryBreakupTypeRepository.UpdateEntity(value));
        }

        [HttpDelete]
        public HttpResponseMessage DeleteEntity(Int64 id)
        {
            return ToJson(ObjSalaryBreakupTypeRepository.DeleteEntity(id));
        }
    }
}
