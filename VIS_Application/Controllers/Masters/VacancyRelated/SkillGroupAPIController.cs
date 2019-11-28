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
    public class SkillGroupAPIController : BaseAPIController
    {
        VISIBaseRepository<SkillGroup> SkillGroupRepository;
        List<SkillGroup> EntityList = new List<SkillGroup>();

        public SkillGroupAPIController(VISIBaseRepository<SkillGroup> _SkillGroupRepository)
        {
            SkillGroupRepository = _SkillGroupRepository;
        }

        public HttpResponseMessage Get()
        {
            return ToJson(SkillGroupRepository.GetEntityList().AsEnumerable());
        }

        public HttpResponseMessage Post([FromBody]SkillGroup value)
        {
            return ToJson(SkillGroupRepository.AddEntity(value));
        }

        [HttpPut]
        public HttpResponseMessage UpdateEntity(Int64 Id, [FromBody]SkillGroup value)
        {
            return ToJson(SkillGroupRepository.UpdateEntity(value));
        }

        [HttpDelete]
        public HttpResponseMessage DeleteEntity(Int64 Id)
        {
            return ToJson(SkillGroupRepository.DeleteEntity(Id));
        }

    }
}
