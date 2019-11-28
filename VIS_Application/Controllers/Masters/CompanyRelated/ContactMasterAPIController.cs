using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VIS_Domain;
using VIS_Domain.Master;
using VIS_Domain.Master.CompanyRelated;
using VIS_Repository;
using VIS_Repository.Masters;

namespace VIS_App.Controllers.Masters.CompanyRelated
{
    public class ContactMasterAPIController : BaseAPIController
    {
        VISIBaseRepository<ContactMaster> ContactMasterRepository;
        List<ContactMaster> EntityList = new List<ContactMaster>();


        public ContactMasterAPIController(VISIBaseRepository<ContactMaster> _ContactMasterRepository)
        {
            ContactMasterRepository = _ContactMasterRepository;
        }
        public HttpResponseMessage Get()
        {
            return ToJson(ContactMasterRepository.GetEntityList().AsEnumerable());
        }

        public HttpResponseMessage Post([FromBody]ContactMaster value)
        {
            return ToJson(ContactMasterRepository.AddEntity(value));
        }

        [HttpPut]
        public HttpResponseMessage UpdateEntity(Int64 Id, [FromBody]ContactMaster value)
        {
            return ToJson(ContactMasterRepository.UpdateEntity(value));
        }

        [HttpDelete]
        public HttpResponseMessage DeleteEntity(Int64 Id)
        {
            return ToJson(ContactMasterRepository.DeleteEntity(Id));
        }
    }
}
