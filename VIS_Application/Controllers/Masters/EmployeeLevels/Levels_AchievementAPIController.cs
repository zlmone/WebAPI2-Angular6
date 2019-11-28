using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using VIS_Domain.Master.EmployeeLevels;
using VIS_Domain.Masters.EmployeeLevels;
using VIS_Repository;
using VIS_Repository.Masters.EmployeeLevels;

namespace VIS_App.Controllers.Masters.EmployeeLevels
{
    public class Levels_AchievementAPIController : BaseAPIController
    {
        Levels_AchievementRepository objLevels_AchievementRepository = null;
        
        List<Levels_Achievement> EntityList = new List<Levels_Achievement>();

        
        public Levels_AchievementAPIController()
        {
            objLevels_AchievementRepository = new Levels_AchievementRepository(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
        }
        public HttpResponseMessage Get()
        {
            return ToJson(objLevels_AchievementRepository.GetEntityList().AsEnumerable());
        }
        [HttpGet]
        [Route("api/Levels_AchievementAPI/GetIsCriteria")]
        public HttpResponseMessage GetIsCriteria(int value)
        {
            return ToJson(objLevels_AchievementRepository.GetIsCriteriaDDL(value).AsEnumerable());
        }
        public HttpResponseMessage Post([FromBody]Levels_Achievement value)
        {
            return ToJson(objLevels_AchievementRepository.AddEntity(value));
        }

        [HttpPut]
        public HttpResponseMessage UpdateEntity(Int64 id, [FromBody]Levels_Achievement value)
        {
            return ToJson(objLevels_AchievementRepository.UpdateEntity(value));
        }
        
        [HttpGet]
        [Route("api/Levels_AchievementAPI/GetDataOnEdit")]
        public HttpResponseMessage GetDataOnEdit(int Id)
        {
            return ToJson(objLevels_AchievementRepository.GetEditData(Id));
        }


        [HttpDelete]
        public HttpResponseMessage DeleteEntity(Int64 Id)
        {
            return ToJson(objLevels_AchievementRepository.DeleteEntity(Id));
        }

        [HttpPost]
        [Route("api/Levels_AchievementAPI/UploadJsonFile")]
        public HttpResponseMessage UploadJsonFile()
        {
            HttpResponseMessage response = new HttpResponseMessage();
            var httpRequest = HttpContext.Current.Request;
            if (httpRequest.Files.Count > 0)
            {
                foreach (string file in httpRequest.Files)
                {
                    var postedFile = httpRequest.Files[file];
                    var filePath = HttpContext.Current.Server.MapPath("~/Upload/EmployeeLevels/" + postedFile.FileName);
                    postedFile.SaveAs(filePath);
                }
            }
            return response;
        }
    }
}
