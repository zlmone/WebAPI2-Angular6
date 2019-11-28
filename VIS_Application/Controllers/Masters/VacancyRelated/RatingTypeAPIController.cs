using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VIS_Domain;
using VIS_Domain.Master;
using VIS_Domain.Master.VacancyRelated;
using VIS_Repository;
using VIS_Repository.Masters;

namespace VIS_App.Controllers.Masters.VacancyRelated
{
    public class RatingTypeAPIController : BaseAPIController
    {
        VISIBaseRepository<RatingType> RatingTypeRepository;
        List<RatingType> EntityList = new List<RatingType>();

        public RatingTypeAPIController(VISIBaseRepository<RatingType>_RatingTypeRepository)
        {
            RatingTypeRepository = _RatingTypeRepository;
        }

        public HttpResponseMessage Get()
        {
            return ToJson(RatingTypeRepository.GetEntityList().AsEnumerable());
        }

        public HttpResponseMessage Post([FromBody]RatingType value)
        {
            return ToJson(RatingTypeRepository.AddEntity(value));
        }

        [HttpPut]
        public HttpResponseMessage UpdateEntity(Int64 Id, [FromBody]RatingType value)
        {
            return ToJson(RatingTypeRepository.UpdateEntity(value));
        }

        [HttpDelete]
        public HttpResponseMessage DeleteEntity(Int64 Id)
        {
            return ToJson(RatingTypeRepository.DeleteEntity(Id));
        }

    }
}
