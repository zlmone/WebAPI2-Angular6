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
    public class EducationTypeAPIController : BaseAPIController
    {

        EducationTypeRepository ObjEducationTypeRepository = null;
        public EducationTypeAPIController()
        {
            ObjEducationTypeRepository = new EducationTypeRepository(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
        }


        public HttpResponseMessage Get()
        {
            return ToJson(ObjEducationTypeRepository.GetEntityList().AsEnumerable());
        }

        public HttpResponseMessage Post([FromBody]EducationType value)
        {
            return ToJson(ObjEducationTypeRepository.AddEntity(value));
        }

        [HttpPut]
        public HttpResponseMessage UpdateEntity(Int64 Id, [FromBody]EducationType value)
        {
            return ToJson(ObjEducationTypeRepository.UpdateEntity(value));
        }

        [HttpDelete]
        public HttpResponseMessage DeleteEntity(Int64 id)
        {
            return ToJson(ObjEducationTypeRepository.DeleteEntity(id));
        }
    }
}
