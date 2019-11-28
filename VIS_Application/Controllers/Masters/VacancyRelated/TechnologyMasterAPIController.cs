using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using VIS_Repository;
using VIS_Domain.Master.VacancyRelated;

namespace VIS_App.Controllers.Masters.VacancyRelated
{
    public class TechnologyMasterAPIController : BaseAPIController
    {
        VISIBaseRepository<TechnologyMaster> TechnologyMasterRepository;
        List<TechnologyMaster> EntityList = new List<TechnologyMaster>();


        public TechnologyMasterAPIController(VISIBaseRepository<TechnologyMaster> _currencyRepository)
        {
            TechnologyMasterRepository = _currencyRepository;
        }
        public HttpResponseMessage Get()
        {
            return ToJson(TechnologyMasterRepository.GetEntityList().AsEnumerable());
        }

        public HttpResponseMessage Post([FromBody]TechnologyMaster value)
        {
            return ToJson(TechnologyMasterRepository.AddEntity(value));
        }

        [HttpPut]
        public HttpResponseMessage UpdateEntity(Int64 Id, [FromBody]TechnologyMaster value)
        {
            return ToJson(TechnologyMasterRepository.UpdateEntity(value));
        }

        [HttpDelete]
        public HttpResponseMessage DeleteEntity(Int64 Id)
        {
            return ToJson(TechnologyMasterRepository.DeleteEntity(Id));
        }
    }
}
