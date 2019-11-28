using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using VIS_Domain.Notification;
using VIS_Repository;
using VIS_Repository.Notification;

namespace VIS_App.Controllers.Notification
{
    public class PolicyAPIController : BaseAPIController
    {
        //VISIBaseRepository<Policy> PolicyRepository;
        //List<Policy> EntityList = new List<Policy>();
        PolicyRepository ObjPolicyRepository = null;

        public PolicyAPIController()
        {
            ObjPolicyRepository = new PolicyRepository(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
            //PolicyRepository = _PolicyRepository;
        }
        public HttpResponseMessage Get()
        {
            return ToJson(ObjPolicyRepository.GetEntityList().AsEnumerable());
        }
        [Route("api/policyapi/GetViewPolicyList")]
        [HttpGet]
        public HttpResponseMessage GetViewPolicyList(int id)
        {
            return ToJson(ObjPolicyRepository.GetViewPolicy(id));
        }

        public HttpResponseMessage Post([FromBody]Policy value)
        {
            return ToJson(ObjPolicyRepository.AddEntity(value));
        }

        [HttpPut]
        public HttpResponseMessage UpdateEntity(Int64 Id, [FromBody]Policy value)
        {
            return ToJson(ObjPolicyRepository.UpdateEntity(value));
        }

        [HttpDelete]
        public HttpResponseMessage DeleteEntity(Int64 Id)
        {
            return ToJson(ObjPolicyRepository.DeleteEntity(Id));
        }
    }
}
