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
    public class UserRoleAPIController : BaseAPIController
    {

        UserRoleRepository ObjUserRoleRepository = null;
        public UserRoleAPIController()
        {
            ObjUserRoleRepository = new UserRoleRepository(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
        }


        public HttpResponseMessage Get()
        {
            return ToJson(ObjUserRoleRepository.GetEntityList().AsEnumerable());
        }
       
        public HttpResponseMessage Post([FromBody]UserRole value)
        {
            return ToJson(ObjUserRoleRepository.AddEntity(value));
        }

        [HttpPut]
        public HttpResponseMessage UpdateEntity(Int64 Id, [FromBody]UserRole value)
        {
            return ToJson(ObjUserRoleRepository.UpdateEntity(value));
        }

        [HttpDelete]
        public HttpResponseMessage DeleteEntity(Int64 id)
        {
            return ToJson(ObjUserRoleRepository.DeleteEntity(id));
        }
    }
}
