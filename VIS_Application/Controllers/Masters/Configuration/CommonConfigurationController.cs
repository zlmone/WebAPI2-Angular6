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
    public class CommonConfigurationAPIController : BaseAPIController
    {
        CommonConfigurationRepository objCommonConfigurationRepository = null;
        //VISIBaseRepository<CommonConfiguration> CommonConfigurationRepository;
        //List<CommonConfiguration> EntityList = new List<CommonConfiguration>();
        //CommonConfiguration SingleEntity = new CommonConfiguration();

        public CommonConfigurationAPIController()
        {
            //CommonConfigurationRepository = _CommonConfigurationRepository;
            objCommonConfigurationRepository = new CommonConfigurationRepository(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
        }

        [HttpGet]
        [Route("api/CommonConfigurationAPI/GetAllCommonConfiguration")]
        public HttpResponseMessage GetAllCommonConfiguration()
        {
            return ToJson(objCommonConfigurationRepository.GetCommonConfiguration());
        }

        [HttpPut]
        public HttpResponseMessage UpdateEntity(Int64 Id, [FromBody]CommonConfiguration value)
        {
            return ToJson(objCommonConfigurationRepository.UpdateEntity(value));
        }



    }
}
