using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VIS_Domain.HumanResource.MyProfiles;
using VIS_Repository.HumanResource.ProfileAttendace;

namespace VIS_App.Controllers.HumanResource.ProfileAttendance
{
   
    public class MyProfilesAPIController : BaseAPIController
    {
        //VISIBaseRepository<MyProfiles> MyProfilesRepository;
        //List<MyProfiles> EntityList = new List<MyProfiles>();
        MyProfilesRepository ObjMyProfilesRepository = null;

        public MyProfilesAPIController()
        {
            ObjMyProfilesRepository = new MyProfilesRepository(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
        }

        public HttpResponseMessage Get()
        {
            return ToJson(ObjMyProfilesRepository.GetEntityList().AsEnumerable());
        }

        [Route("api/MyProfilesAPI/GetUserDeatils")]
        [HttpGet]
        public HttpResponseMessage GetUserDeatils(long UserId)
        {
            return ToJson(ObjMyProfilesRepository.GetProfileByUser(UserId));
        }

        [Route("api/MyProfilesAPI/GetEduactionDeatils")]
        [HttpGet]
        public HttpResponseMessage GetEduactionDeatils(long UserId)
        {
            return ToJson(ObjMyProfilesRepository.GetEducationUser(UserId));
        }

        [Route("api/MyProfilesAPI/GetEmployeeList")]
        [HttpGet]
        public HttpResponseMessage GetEmployeeList()
        {
            return ToJson(ObjMyProfilesRepository.GetEmployeeList());
        }

        public HttpResponseMessage Post([FromBody]MyProfiles value)
        {
            return ToJson(ObjMyProfilesRepository.AddEntity(value));
        }

        [HttpPut]
        public HttpResponseMessage UpdateEntity(Int64 Id, [FromBody]MyProfiles value)
        {
            return ToJson(ObjMyProfilesRepository.UpdateEntity(value));
        }

        [HttpDelete]
        public HttpResponseMessage DeleteEntity(Int64 Id)
        {
            return ToJson(ObjMyProfilesRepository.DeleteEntity(Id));
        }
    }
}
