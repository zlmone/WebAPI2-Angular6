using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VIS_Domain.HumanResource.Attendance;
using VIS_Repository.HumanResource.Attendace;

namespace VIS_App.Controllers.HumanResource.Attendance
{
    public class MySkillAPIController : BaseAPIController
    {

        MySkillRepository ObjMySkillRepository = null;

        public MySkillAPIController()
        {
            ObjMySkillRepository = new MySkillRepository(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
        }
        [Route("api/MySkillAPI/GetMySkill")]
        [HttpGet]
        public HttpResponseMessage GetMySkill(long UserID)
        {
            return ToJson(ObjMySkillRepository.GetSkillUserWise(UserID));
        }
        [Route("api/MySkillAPI/GetNewSkill")]
        [HttpGet]
        public HttpResponseMessage GetNewSkill(long UserID)
        {
            return ToJson(ObjMySkillRepository.GetAddNewSkill(UserID));
        }
        [Route("api/MySkillAPI/GetPopupChildSkill")]
        [HttpGet]
        public HttpResponseMessage GetPopupChildSkill()
        {
            return ToJson(ObjMySkillRepository.GetPopupChildSkill());
        }
        [Route("api/MySkillAPI/GetPopupSecondSkill")]
        [HttpGet]
        public HttpResponseMessage GetPopupSecondSkill(long lookupSkilId)
        {
            return ToJson(ObjMySkillRepository.GetPopupsecondSkill(lookupSkilId));
        }
        public HttpResponseMessage Get()
        {
            return ToJson(ObjMySkillRepository.GetEntityList().AsEnumerable());
        }        

        public HttpResponseMessage Post([FromBody]MySkill value)
        {
            return ToJson(ObjMySkillRepository.AddEntity(value));
        }

        [HttpPut]
        public HttpResponseMessage UpdateEntity(Int64 Id, [FromBody]MySkill value)
        {
            return ToJson(ObjMySkillRepository.UpdateEntity(value));
        }

        [HttpDelete]
        public HttpResponseMessage DeleteEntity(Int64 Id)
        {
            return ToJson(ObjMySkillRepository.DeleteEntity(Id));
        }
        [Route("api/MySkillAPI/DeleteSkill")]
        [HttpDelete]
        public HttpResponseMessage DeleteSkill(int SkillID, long UserID)
        {
            return ToJson(ObjMySkillRepository.DeleteSkill(SkillID, UserID));
        }

    }
}
