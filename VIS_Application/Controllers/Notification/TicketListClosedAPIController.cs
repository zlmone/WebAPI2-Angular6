using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VIS_Domain.Notification;
using VIS_Repository.Notification;

namespace VIS_App.Controllers.Notification
{
    public class TicketListClosedAPIController : BaseAPIController
    {
        TicketListClosedRepository ObjTicketListClosedRepository = null;

        public TicketListClosedAPIController()
        {
            // TicketListClosedRepository = _TicketListClosedRepository;
            ObjTicketListClosedRepository = new TicketListClosedRepository(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
        }


        public HttpResponseMessage Get()
        {
            return ToJson(ObjTicketListClosedRepository.GetEntityList().AsEnumerable());

        }


        [Route("api/TicketListClosedapi/GetDetailTicket")]
        [HttpGet]
        public HttpResponseMessage GetDetailTicket(int UserId)
        {
            return ToJson(ObjTicketListClosedRepository.GetTicketByUserOpen(UserId));
        }
        [Route("api/TicketListClosedapi/GetViewHistoryTicket")]
        [HttpGet]
        public HttpResponseMessage GetViewHistoryTicket(int id)
        {
            return ToJson(ObjTicketListClosedRepository.GetViewHistory(id));
        }
        [Route("api/TicketListClosedapi/GetDetailTicketByID")]
        [HttpGet]
        public HttpResponseMessage GetDetailTicketByID(int id)
        {
            return ToJson(ObjTicketListClosedRepository.GetTicketDetail(id));
        }



        public HttpResponseMessage Post([FromBody]TicketListClosed value)
        {
            return ToJson(ObjTicketListClosedRepository.AddEntity(value));
        }



        [HttpPut]
        public HttpResponseMessage UpdateEntity(Int64 Id, [FromBody]TicketListClosed value)
        {
            return ToJson(ObjTicketListClosedRepository.UpdateEntity(value));
        }

        [HttpDelete]
        public HttpResponseMessage DeleteEntity(Int64 Id)
        {
            return ToJson(ObjTicketListClosedRepository.DeleteEntity(Id));
        }
    }
}
