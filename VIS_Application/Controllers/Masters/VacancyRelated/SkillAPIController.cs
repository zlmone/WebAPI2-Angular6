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
using VIS_Repository.Masters;
using VIS_Repository.Masters.VacancyRelated;

namespace VIS_App.Controllers.Masters.VacancyRelated
{
    public class SkillAPIController : BaseAPIController
    {

        SkillRepository objSkillRepository=null;

        public SkillAPIController()
        {
            objSkillRepository = new SkillRepository(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
        }

        public HttpResponseMessage Get()
        {
            return ToJson(objSkillRepository.GetEntityList().AsEnumerable());
        }

        public HttpResponseMessage Post([FromBody]Skill value)
        {
            return ToJson(objSkillRepository.AddEntity(value));
        }

        [HttpPut]
        public HttpResponseMessage UpdateEntity(Int64 Id, [FromBody]Skill value)
        {
            return ToJson(objSkillRepository.UpdateEntity(value));
        }

        [HttpDelete]
        public HttpResponseMessage DeleteEntity(Int64 Id)
        {
            return ToJson(objSkillRepository.DeleteEntity(Id));
        }

    }
}
