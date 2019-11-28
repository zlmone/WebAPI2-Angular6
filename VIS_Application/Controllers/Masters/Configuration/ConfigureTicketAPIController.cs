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
    public class ConfigureTicketAPIController : BaseAPIController
    {
        ConfigureTicketRepository objConfigureTicketRepository = null;
        VISIBaseRepository<ConfigureTicket> ConfigureTicketRepository;

        public ConfigureTicketAPIController(VISIBaseRepository<ConfigureTicket> _ConfigureTicketRepository)
        {
            objConfigureTicketRepository = new ConfigureTicketRepository(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
            ConfigureTicketRepository = _ConfigureTicketRepository;
        }

        [Route("api/ConfigureTicketAPI/GetParentGroupData")]
        [HttpGet]
        public HttpResponseMessage GetParentGroupData()
        {
            return ToJson(objConfigureTicketRepository.GetParantGroup());
        }

        [Route("api/ConfigureTicketAPI/GetChildGroupData")]
        [HttpGet]
        public HttpResponseMessage GetChildGroupData(int Parent_Id)
        {
            return ToJson(objConfigureTicketRepository.GetChildGroup(Parent_Id));
        }

        [Route("api/ConfigureTicketAPI/GetEmployeeHeadData")]
        [HttpGet]
        public HttpResponseMessage GetEmployeeHeadData()
        {
            return ToJson(objConfigureTicketRepository.GetEmployeeHead());
        }

        [HttpPut]
        public HttpResponseMessage UpdateEntity(Int64 Id, [FromBody]ConfigureTicket value)
        {
            value.Id = Id;
            return ToJson(ConfigureTicketRepository.UpdateEntity(value));
        }

        [Route("api/ConfigureTicketAPI/GetListofTicketDisplay")]
        [HttpGet]
        public HttpResponseMessage GetListofTicketDisplay(int Organization_Id)
        {
            return ToJson(objConfigureTicketRepository.GetListofTicketDisplayTo(Organization_Id));
        }

        [Route("api/ConfigureTicketAPI/SaveEmployeeId")]
        [HttpPut]
        public HttpResponseMessage SaveEmployeeId(List<ConfigureTicket> value)
        {
            return ToJson(objConfigureTicketRepository.UpdateEmployeeNew(value));
        }


    }
}
