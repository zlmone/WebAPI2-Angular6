using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using VIS_Domain.Notification;
using VIS_Repository;
using VIS_Repository.Notification;

namespace VIS_App.Controllers.Notification
{
    public class NewsAPIController : BaseAPIController
    {
        //VISIBaseRepository<News> NewsRepository;
        //List<News> EntityList = new List<News>();
        NewsRepository ObjNewsRepository = null;

        public NewsAPIController()
        {
            ObjNewsRepository = new NewsRepository(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
        }
       
        public HttpResponseMessage Get()
        {
            return ToJson(ObjNewsRepository.GetEntityList().AsEnumerable());
        }

        [Route("api/Newsapi/GetViewNewsList")]
        [HttpGet]
        public HttpResponseMessage GetViewNewsList(int id)
        {
            return ToJson(ObjNewsRepository.GetViewNews(id));
        }

        public HttpResponseMessage Post([FromBody]News value)
        {
            return ToJson(ObjNewsRepository.AddEntity(value));
        }

        [HttpPut]
        public HttpResponseMessage UpdateEntity(Int64 Id, [FromBody]News value)
        {
            return ToJson(ObjNewsRepository.UpdateEntity(value));
        }

        [HttpDelete]
        public HttpResponseMessage DeleteEntity(Int64 Id)
        {
            return ToJson(ObjNewsRepository.DeleteEntity(Id));
        }
    }
}
