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
    public class LookupAPIController : BaseAPIController
    {
        VISIBaseRepository<Lookup> LookupRepository;
        List<Lookup> EntityList = new List<Lookup>();

        public LookupAPIController(VISIBaseRepository<Lookup> _LookupRepositiory)
        {
            LookupRepository = _LookupRepositiory;
        }

        public HttpResponseMessage Get()
        {
            return ToJson(LookupRepository.GetEntityList().AsEnumerable());
        }

        public HttpResponseMessage Post([FromBody]Lookup value)
        {
            return ToJson(LookupRepository.AddEntity(value));
        }

        [HttpPut]
        public HttpResponseMessage UpdateEntity(Int64 Id, [FromBody]Lookup value)
        {
            return ToJson(LookupRepository.UpdateEntity(value));
        }

        [HttpDelete]
        public HttpResponseMessage DeleteEntity(Int64 Id)
        {
            return ToJson(LookupRepository.DeleteEntity(Id));
        }

    }
}
