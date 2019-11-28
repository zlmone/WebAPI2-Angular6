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
using VIS_App.Infrastructure;

namespace VIS_App.Controllers.Masters.Configuration
{
    public class SecurityKeyAPIController : BaseAPIController
    {
        
        VISIBaseRepository<SecurityKey> SecurityKeyRepository;
        List<SecurityKey> EntityList = new List<SecurityKey>();

        CommonCode CommonCode = new CommonCode();
        

        public SecurityKeyAPIController(VISIBaseRepository<SecurityKey> _SecurityKeyRepository)
        {
            SecurityKeyRepository = _SecurityKeyRepository;
        }

        public HttpResponseMessage Get()
        {
            return ToJson(SecurityKeyRepository.GetEntityList().AsEnumerable());
        }

        
        public HttpResponseMessage Post([FromBody]SecurityKey value)
        {
            return ToJson(SecurityKeyRepository.AddEntity(value));
            
        }

        [HttpPut]
        public HttpResponseMessage UpdateEntity(Int64 Id, [FromBody]SecurityKey value)
        {
            return ToJson(SecurityKeyRepository.UpdateEntity(value));
        }

        [HttpDelete]
        public HttpResponseMessage DeleteEntity(Int64 Id)
        {
            return ToJson(SecurityKeyRepository.DeleteEntity(Id));
        }

        [HttpPost]
        [Route("api/SecurityKeyAPI/GenrateUniqueKey")]
        public HttpResponseMessage GenrateUniqueKey(SecurityKey _SecurityKey)
        {
            return ToJson(CommonCode.GenrateUniqueKey(_SecurityKey));
        }

        

    }
}
