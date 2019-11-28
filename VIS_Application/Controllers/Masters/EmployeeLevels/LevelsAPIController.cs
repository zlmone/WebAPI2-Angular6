using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VIS_Domain;
using VIS_Domain.Master;
using VIS_Domain.Master.EmployeeLevels;
using VIS_Repository;
using VIS_Repository.Masters;

namespace VIS_App.Controllers.Masters.EmployeeLevels
{
    public class LevelsAPIController : BaseAPIController
    {
        VISIBaseRepository<Levels> LevelsRepository;
        List<Levels> EntityList = new List<Levels>();


        public LevelsAPIController(VISIBaseRepository<Levels> _levelsRepository)
        {
            LevelsRepository = _levelsRepository;
        }
        public HttpResponseMessage Get()
        {
            return ToJson(LevelsRepository.GetEntityList().AsEnumerable());
        }

        public HttpResponseMessage Post([FromBody]Levels value)
        {
            return ToJson(LevelsRepository.AddEntity(value));
        }

        [HttpPut]
        public HttpResponseMessage UpdateEntity(Int64 id, [FromBody]Levels value)
        {
            return ToJson(LevelsRepository.UpdateEntity(value));
        }

        [HttpDelete]
        public HttpResponseMessage DeleteEntity(Int64 Id)
        {
            return ToJson(LevelsRepository.DeleteEntity(Id));
        }
    }
}
