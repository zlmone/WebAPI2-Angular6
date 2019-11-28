using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using VIS_Domain.Notification;
using VIS_Repository;
using VIS_Repository.Notification;

namespace VIS_App.Controllers.Notification
{
    public class TicketListOpenAPIController : BaseAPIController
    {
        //VISIBaseRepository<TicketListOpen> TicketListOpenRepository;
        //List<TicketListOpen> EntityList = new List<TicketListOpen>();
        TicketListOpenRepository ObjTicketListOpenRepository = null;

        public TicketListOpenAPIController()
        {
            // TicketListOpenRepository = _TicketListOpenRepository;
            ObjTicketListOpenRepository = new TicketListOpenRepository(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
        }


        public HttpResponseMessage Get()
        {
            return ToJson(ObjTicketListOpenRepository.GetEntityList().AsEnumerable());

        }

     
        [Route("api/TicketListOpenapi/GetDetailTicket")]
        [HttpGet]
        public HttpResponseMessage GetDetailTicket(int UserId)
        {
            return ToJson(ObjTicketListOpenRepository.GetTicketByUserOpen(UserId));
        }
        [Route("api/TicketListOpenapi/GetViewHistoryTicket")]
        [HttpGet]
        public HttpResponseMessage GetViewHistoryTicket(int id)
        {
            return ToJson(ObjTicketListOpenRepository.GetViewHistory(id));
        }
        [Route("api/TicketListOpenapi/GetDetailTicketByID")]
        [HttpGet]
        public HttpResponseMessage GetDetailTicketByID(int id)
        {
            return ToJson(ObjTicketListOpenRepository.GetTicketDetail(id));
        }

        [Route("api/TicketListOpenapi/GetDetailTicketAdmin")]
        [HttpGet]
        public HttpResponseMessage GetDetailTicketAdmin()
        {
            return ToJson(ObjTicketListOpenRepository.GetTicketByAllTicket());
        }

        public HttpResponseMessage Post([FromBody]TicketListOpen value)
        {
            return ToJson(ObjTicketListOpenRepository.AddEntity(value));
        }

       

        [HttpPut]
        public HttpResponseMessage UpdateEntity(Int64 Id, [FromBody]TicketListOpen value)
        {
            return ToJson(ObjTicketListOpenRepository.UpdateEntity(value));
        }

        [HttpDelete]
        public HttpResponseMessage DeleteEntity(Int64 Id)
        {
            return ToJson(ObjTicketListOpenRepository.DeleteEntity(Id));
        }
    }
}
