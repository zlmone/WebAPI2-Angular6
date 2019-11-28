using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VIS_Domain;
using VIS_Domain.Master;
using VIS_Domain.Master.VacancyRelated;
using VIS_Repository;
using VIS_Repository.Masters.VacancyRelated;

namespace VIS_App.Controllers.Masters.VacancyRelated
{
    public class PositionAPIController : BaseAPIController
    {
        PositionRepository objPositionRepository = null;

        public PositionAPIController()
        {
            objPositionRepository = new PositionRepository(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
        }

        [Route("api/PositionAPI/Get")]
        public HttpResponseMessage Get()
        {
            return ToJson(objPositionRepository.GetEntityList());
        }

        [Route("api/PositionAPI/Post")]
        public HttpResponseMessage Post([FromBody]Position value)
        {
            return ToJson(objPositionRepository.AddEntity(value));
        }

        [Route("api/PositionAPI/UpdateEntity")]
        [HttpPut]
        public HttpResponseMessage UpdateEntity(Int64 Id, [FromBody]Position value)
        {
            return ToJson(objPositionRepository.UpdateEntity(value));
        }

        [Route("api/PositionAPI/DeleteEntity")]
        [HttpDelete]
        public HttpResponseMessage DeleteEntity(Int64 Id)
        {
            return ToJson(objPositionRepository.DeleteEntity(Id));
        }


        [Route("api/PositionAPI/GetSkills")]
        public HttpResponseMessage GetSkills()
        {
            return ToJson(objPositionRepository.GetSkills());
        }

    }
}
