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

namespace VIS_App.Controllers.Masters.Configuration
{
    public class MacIdConfigurationAPIController : BaseAPIController
    {
        MacIdConfigurationRepository objMacIdConfigurationRepository = null;
        VISIBaseRepository<MacIdConfiguration> MacIdConfigurationRepository;
        List<MacIdConfiguration> EntityList = new List<MacIdConfiguration>();

        public MacIdConfigurationAPIController()
        {
            objMacIdConfigurationRepository = new MacIdConfigurationRepository(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
        }

        [HttpGet]
        [Route("api/MacIdConfigurationAPI/Get")]
        public HttpResponseMessage Get()
        {
            return ToJson(objMacIdConfigurationRepository.GetEntityList().AsEnumerable());
        }

        [HttpGet]
        [Route("api/MacIdConfigurationAPI/GetAllEmployees")]
        public HttpResponseMessage GetAllEmployees()
        {
            return ToJson(objMacIdConfigurationRepository.GetAllEmployees().AsEnumerable());
        }

        [HttpPost]
        [Route("api/MacIdConfigurationAPI/Post")]
        public HttpResponseMessage Post([FromBody]MacIdConfiguration value)
        {
            return ToJson(objMacIdConfigurationRepository.AddEntity(value));
        }

        [HttpPut]
        [Route("api/MacIdConfigurationAPI/UpdateEntity")]
        public HttpResponseMessage UpdateEntity(Int64 Id, [FromBody]MacIdConfiguration value)
        {
            return ToJson(objMacIdConfigurationRepository.UpdateEntity(value));
        }

        [HttpDelete]
        [Route("api/MacIdConfigurationAPI/DeleteEntity")]
        public HttpResponseMessage DeleteEntity(Int64 Id)
        {
            return ToJson(objMacIdConfigurationRepository.DeleteEntity(Id));
        }

        [Route("api/MacIdConfigurationAPI/ActivateDeactivateStatus")]
        [HttpPost]
        public HttpResponseMessage ActivateDeactivateStatus(Int64 Id)
        {
            return ToJson(objMacIdConfigurationRepository.ActivateDeactivateStatus(Id));
        }



    }
}
