using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VIS_App.Infrastructure;
using VIS_Domain.Master;
using VIS_Domain.Registration;
using VIS_Repository;
using VIS_Repository.Registration;

namespace VIS_App.Controllers
{
    public class VISUserAPIController : BaseAPIController
    {
        VISIBaseRepository<VISUser> VISUserRepository;
        VISUserRepository objVISUserRepository = new VISUserRepository(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
        List<VISUser> EntityList = new List<VISUser>();
       
        public VISUserAPIController(VISIBaseRepository<VISUser> _visUserRepository)
        {
            VISUserRepository = _visUserRepository;
        }

        public HttpResponseMessage Get()
        {
            return ToJson(VISUserRepository.GetEntityList().AsEnumerable());
        }

        public HttpResponseMessage GetActivateLoginImage()
        {
            return ToJson(objVISUserRepository.GetActivateLoginImage());
        }

        [HttpPost]
        public HttpResponseMessage AddEntity([FromBody]VISUser value)
        {
            return ToJson(VISUserRepository.AddEntity(value));
        }

      
        [HttpPost]
        public HttpResponseMessage PostUserByUserIdPassword([FromBody]VISUser value)
        {
            value.VISPassword = CommonCode.Encrypt(value.VISPassword, "vervesys");
            return ToJson(objVISUserRepository.PostUserByUserIdPassword(value.VISUsername, value.VISPassword));
        }

        public HttpResponseMessage Put(Int64 id, [FromBody]VISUser value)
        {
            return ToJson(VISUserRepository.UpdateEntity(value));
        }

        public HttpResponseMessage Delete(Int64 Id)
        {
            return ToJson(VISUserRepository.DeleteEntity(Id));
        }
        [HttpGet]
        [Route("api/VISUserAPI/GetForgotPassword")]
        public HttpResponseMessage GetForgotPassword(string Email)
        {
            return ToJson(objVISUserRepository.ForgotPassword(Email));
        }
    }
}
