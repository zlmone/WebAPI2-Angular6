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
using VIS_Repository.Masters.CompanyRelated;

using System.Web;

namespace VIS_App.Controllers.Masters.Configuration
{
    public class HomePageImageAPIController : BaseAPIController
    {

        HomePageImageRepository objHomePageImageRepository = null;

        public HomePageImageAPIController()
        {
            objHomePageImageRepository = new HomePageImageRepository(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
        }

        [HttpGet]
        public HttpResponseMessage GetAllImage()
        {
            return ToJson(objHomePageImageRepository.GetEntityList());
        }

        [HttpDelete]
        public HttpResponseMessage DeleteEntity(Int64 Id)
        {
            return ToJson(objHomePageImageRepository.DeleteEntity(Id));
        }

        [HttpPut]
        public HttpResponseMessage UpdateEntity(Int64 Id, [FromBody]HomePageImage value)
        {
            value.Id = Id;
            return ToJson(objHomePageImageRepository.UpdateEntity(value));
        }

        [HttpGet]
        [Route("api/HomePageImageAPI/GetActivatHomePageImage")]
        public HttpResponseMessage GetActivatHomePageImage()
        {
            return ToJson(objHomePageImageRepository.GetActiveImage());
        }


        public HttpResponseMessage Post([FromBody]HomePageImage value)
        {
            return ToJson(objHomePageImageRepository.AddEntity(value));
        }

        [HttpPost]
        [Route("api/HomePageImageAPI/UploadJsonFile")]
        public HttpResponseMessage UploadJsonFile()
        {
            HttpResponseMessage response = new HttpResponseMessage();
            var httpRequest = HttpContext.Current.Request;
            if (httpRequest.Files.Count > 0)
            {
                foreach (string file in httpRequest.Files)
                {
                    var postedFile = httpRequest.Files[file];
                    var filePath = HttpContext.Current.Server.MapPath("~/Upload/HomePageImage/" + postedFile.FileName);
                    postedFile.SaveAs(filePath);
                }
            }
            return response;
        }

    }
}
