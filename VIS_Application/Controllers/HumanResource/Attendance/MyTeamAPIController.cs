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
    public class MyTeamAPIController : BaseAPIController
    {

        MyTeamRepository ObjMyTeamRepository = null;

        public MyTeamAPIController()
        {
            ObjMyTeamRepository = new MyTeamRepository(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
        }
        [Route("api/MyTeamAPI/GetMyTeam")]
        [HttpGet]
        public HttpResponseMessage GetMyTeam(long UserId)
        {
            return ToJson(ObjMyTeamRepository.GetMyTeamList(UserId));
        }
        [Route("api/MyTeamAPI/GetHoverPopup")]
        [HttpGet]
        public HttpResponseMessage GetHoverPopup(long UserId)
        {
            return ToJson(ObjMyTeamRepository.GetHoverPopup(UserId));
        }
        [Route("api/MyTeamAPI/GetLinemanager")]
        [HttpGet]
        public HttpResponseMessage GetLinemanager(Int64 id)
        {
            return ToJson(ObjMyTeamRepository.GetLinemanager(id));

        }
        [Route("api/MyTeamAPI/GetSkill")]
        [HttpGet]
        public HttpResponseMessage GetSkill(Int64 SkillID)
        {
            return ToJson(ObjMyTeamRepository.GetSkill(SkillID));
        }
        public HttpResponseMessage Get()
        {
            return ToJson(ObjMyTeamRepository.GetEntityList().AsEnumerable());
        }

        public HttpResponseMessage Post([FromBody]MyTeam value)
        {
            return ToJson(ObjMyTeamRepository.AddEntity(value));
        }

        [HttpPut]
        public HttpResponseMessage UpdateEntity(Int64 Id, [FromBody]MyTeam value)
        {
            return ToJson(ObjMyTeamRepository.UpdateEntity(value));
        }

        [HttpDelete]
        public HttpResponseMessage DeleteEntity(Int64 Id)
        {
            return ToJson(ObjMyTeamRepository.DeleteEntity(Id));
        }


    }
}
