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
    public class MyTicketAPIController : BaseAPIController
    {
        //VISIBaseRepository<MyTicket> MyTicketRepository;
        //List<MyTicket> EntityList = new List<MyTicket>();
        MyTicketRepository ObjMyTicketRepository = null;

        public MyTicketAPIController()
        {
           // MyTicketRepository = _MyTicketRepository;
            ObjMyTicketRepository = new MyTicketRepository(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
        }

       
        public HttpResponseMessage Get()
        {
            return ToJson(ObjMyTicketRepository.GetEntityList().AsEnumerable());

        }

        [Route("api/MyTicketapi/GetDepatmentDll")]
        [HttpGet]
        public HttpResponseMessage GetDepatmentDll()
        {
            return ToJson(ObjMyTicketRepository.GetDepartmentOrganization().AsEnumerable());
        }
      

        [Route("api/MyTicketapi/GetChildGroupData")]
        [HttpGet]
        public HttpResponseMessage GetChildGroupData(int CreatedId)
        {
            return ToJson(ObjMyTicketRepository.GetTicketByUser(CreatedId));
        }
        [Route("api/MyTicketapi/GetViewHistoryTicket")]
        [HttpGet]
        public HttpResponseMessage GetViewHistoryTicket(int id)
        {
            return ToJson(ObjMyTicketRepository.GetViewHistory(id));
        }

        [Route("api/MyTicketapi/GetDetailTicket")]
        [HttpGet]
        public HttpResponseMessage GetDetailTicket(int id)
        {
            return ToJson(ObjMyTicketRepository.GetTicketDetail(id));
        }


        public HttpResponseMessage Post([FromBody]MyTicket value)
        {
            return ToJson(ObjMyTicketRepository.AddEntity(value));
        }

        [HttpPost]
        [Route("api/MyTicketapi/UploadJsonFile")]
        public HttpResponseMessage UploadJsonFile()
        {
            HttpResponseMessage response = new HttpResponseMessage();
            var httpRequest = HttpContext.Current.Request;
            if (httpRequest.Files.Count > 0)
            {
                foreach (string file in httpRequest.Files)
                {
                    var postedFile = httpRequest.Files[file];
                    var filePath = HttpContext.Current.Server.MapPath("~/Upload/" + postedFile.FileName);
                    postedFile.SaveAs(filePath);
                }
            }
            return response;
        }

        [HttpPut]
        public HttpResponseMessage UpdateEntity(Int64 Id, [FromBody]MyTicket value)
        {
            return ToJson(ObjMyTicketRepository.UpdateEntity(value));
        }

        [HttpDelete]
        public HttpResponseMessage DeleteEntity(Int64 Id)
        {
            return ToJson(ObjMyTicketRepository.DeleteEntity(Id));
        }
    }
}
