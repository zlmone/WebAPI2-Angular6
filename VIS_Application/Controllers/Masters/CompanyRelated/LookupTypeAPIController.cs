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
    public class LookupTypeAPIController : BaseAPIController
    {
        VISIBaseRepository<LookupType> LookupTypeRepository;
        List<LookupType> EntityList = new List<LookupType>();

        public LookupTypeAPIController(VISIBaseRepository<LookupType> _LookupTypeRepositiory)
        {
            LookupTypeRepository = _LookupTypeRepositiory;
        }

        public HttpResponseMessage Get()
        {
            return ToJson(LookupTypeRepository.GetEntityList().AsEnumerable());
        }

        public HttpResponseMessage Post([FromBody]LookupType value)
        {
            return ToJson(LookupTypeRepository.AddEntity(value));
        }

        [HttpPut]
        public HttpResponseMessage UpdateEntity(Int64 Id, [FromBody]LookupType value)
        {
            return ToJson(LookupTypeRepository.UpdateEntity(value));
        }

        [HttpDelete]
        public HttpResponseMessage DeleteEntity(Int64 Id)
        {
            return ToJson(LookupTypeRepository.DeleteEntity(Id));
        }

    }
}
