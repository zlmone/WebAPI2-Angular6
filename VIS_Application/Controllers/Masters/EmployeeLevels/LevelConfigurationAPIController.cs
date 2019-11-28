using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using VIS_Domain.Masters.EmployeeLevels;
using VIS_Repository;

namespace VIS_App.Controllers.Masters.EmployeeLevels
{
    public class LevelConfigurationAPIController : BaseAPIController
    {
        VISIBaseRepository<LevelConfiguration> LevelConfigurationRepository;
        List<LevelConfiguration> EntityList = new List<LevelConfiguration>();


        public LevelConfigurationAPIController(VISIBaseRepository<LevelConfiguration> _levelsRepository)
        {
            LevelConfigurationRepository = _levelsRepository;
        }
        public HttpResponseMessage Get()
        {
            return ToJson(LevelConfigurationRepository.GetEntityList().AsEnumerable());
        }

        public HttpResponseMessage Post([FromBody]LevelConfiguration value)
        {
            return ToJson(LevelConfigurationRepository.AddEntity(value));
        }

        [HttpPut]
        public HttpResponseMessage UpdateEntity(Int64 id, [FromBody]LevelConfiguration value)
        {
            return ToJson(LevelConfigurationRepository.UpdateEntity(value));
        }

        [HttpDelete]
        public HttpResponseMessage DeleteEntity(Int64 Id)
        {
            return ToJson(LevelConfigurationRepository.DeleteEntity(Id));
        }
    }
}
