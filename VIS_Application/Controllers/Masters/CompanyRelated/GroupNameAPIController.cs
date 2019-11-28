using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VIS_Domain.Master.CompanyRelated;
using VIS_Repository;

namespace VIS_App.Controllers.Masters.CompanyRelated
{
    public class GroupNameAPIController : BaseAPIController
    {

        VISIBaseRepository<GroupName> GroupNameRepository;
        List<GroupName> EntityList = new List<GroupName>();

        public GroupNameAPIController(VISIBaseRepository<GroupName> _GroupNameRepositiory)
        {
            GroupNameRepository = _GroupNameRepositiory;
        }

        public HttpResponseMessage Get()
        {
            return ToJson(GroupNameRepository.GetEntityList().AsEnumerable());
        }

        public HttpResponseMessage Post([FromBody]GroupName value)
        {
            return ToJson(GroupNameRepository.AddEntity(value));
        }

        [HttpPut]
        public HttpResponseMessage UpdateEntity(Int64 Id, [FromBody]GroupName value)
        {
            return ToJson(GroupNameRepository.UpdateEntity(value));
        }

        [HttpDelete]
        public HttpResponseMessage DeleteEntity(Int64 Id)
        {
            return ToJson(GroupNameRepository.DeleteEntity(Id));
        }
    }
}
