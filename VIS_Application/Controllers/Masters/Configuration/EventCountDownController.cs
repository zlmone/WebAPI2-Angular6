using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VIS_Domain;
using VIS_Domain.Master;
using VIS_Repository;
using VIS_Repository.Masters;
using System.Configuration;
using VIS_Domain.Master.Configuration;
using VIS_Repository.Masters.Configuration;

namespace VIS_App.Controllers.Masters.Configuration
{
    public class EventCountDownAPIController : BaseAPIController
    {
        VISIBaseRepository<EventCountDown> EventCountDownRepository;
        List<EventCountDown> EntityList = new List<EventCountDown>();

        public EventCountDownAPIController(VISIBaseRepository<EventCountDown> _EventCountDownRepository)
        {
            EventCountDownRepository = _EventCountDownRepository;
        }

        public HttpResponseMessage Get()
        {
            return ToJson(EventCountDownRepository.GetEntityList().AsEnumerable());
        }


        public HttpResponseMessage Post([FromBody]EventCountDown value)
        {
            return ToJson(EventCountDownRepository.AddEntity(value));
        }

        [HttpPut]
        public HttpResponseMessage UpdateEntity(Int64 Id, [FromBody]EventCountDown value)
        {
            return ToJson(EventCountDownRepository.UpdateEntity(value));
        }

        [HttpDelete]
        public HttpResponseMessage DeleteEntity(Int64 Id)
        {
            return ToJson(EventCountDownRepository.DeleteEntity(Id));
        }

    }
}
