using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VIS_Domain.HumanResource.ProfileAttendance;
using VIS_Repository;
using VIS_Repository.HumanResource.ProfileAttendace;

namespace VIS_App.Controllers.HumanResource.ProfileAttendance
{
    public class ProfileAttendanceAPIController : BaseAPIController
    {
        ProfileAttendanceRepository ObjProfileAttendanceRepository = null;
        //VISIBaseRepository<ProfileAttend> ProfileAttendanceRepository;
        List<ProfileAttend> EntityList = new List<ProfileAttend>();


        public ProfileAttendanceAPIController()
        {
            ObjProfileAttendanceRepository= new ProfileAttendanceRepository(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
        }

        [HttpPost]
        [Route("api/ProfileAttendanceAPI/GetChangePassword")]
        public HttpResponseMessage GetChangePassword(int Id, ProfileAttend Profile)
        {
            return ToJson(ObjProfileAttendanceRepository.userchangepsw(Id, Profile));
        }

        //[HttpPut]
        //[Route("api/ProfileAttendanceAPI/GetChangePassword")]
        //public HttpResponseMessage GetChangePassword(Int64 Id, [FromBody]ProfileAttend value)
        //{
        //    return ToJson(ProfileAttendanceRepository.UpdateEntity(value));
        //}


    }
}
