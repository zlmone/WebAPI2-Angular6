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
    public class ConfigureWorksheetAPIController : BaseAPIController
    {
        ConfigureWorksheetRepository objConfigureWorksheetRepository = null;
        VISIBaseRepository<ConfigureWorksheet> ConfigureWorkSheetRepository;

        public ConfigureWorksheetAPIController(VISIBaseRepository<ConfigureWorksheet> _ConfigureWorkSheetRepository)
        {
            objConfigureWorksheetRepository = new ConfigureWorksheetRepository(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
            ConfigureWorkSheetRepository = _ConfigureWorkSheetRepository;
        }

        public HttpResponseMessage Get()
        {
            return ToJson(objConfigureWorksheetRepository.GetEntityList());
        }

        [HttpPut]
        public HttpResponseMessage UpdateEntity(Int64 Id, [FromBody]ConfigureWorksheet value)
        {
            return ToJson(ConfigureWorkSheetRepository.UpdateEntity(value));
        }

    }
}
