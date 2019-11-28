using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VIS_Domain;
using VIS_Domain.Master;
using VIS_Domain.Master.CompanyRelated;
using VIS_Repository;
using VIS_Repository.Masters;
using VIS_Repository.Masters.CompanyRelated;
namespace VIS_App.Controllers.Masters.CompanyRelated
{
    public class BankMasterAPIController : BaseAPIController
    {
        BankMasterRepositiory objBankBankRepository = null;

        public BankMasterAPIController()
        {
            objBankBankRepository = new BankMasterRepositiory(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
        }

        [Route("api/BankMasterAPI/Get")]
        public HttpResponseMessage Get()
        {
            return ToJson(objBankBankRepository.GetEntityList().AsEnumerable());
        }

        [Route("api/BankMasterAPI/Post")]
        public HttpResponseMessage Post([FromBody]BankMaster value)
        {
            return ToJson(objBankBankRepository.AddEntity(value));
        }

        [Route("api/BankMasterAPI/UpdateEntity")]
        [HttpPut]
        public HttpResponseMessage UpdateEntity(Int64 Id, BankMaster value)
        {
            return ToJson(objBankBankRepository.UpdateEntity(value));
        }

        [Route("api/BankMasterAPI/DeleteEntity")]
        [HttpDelete]
        public HttpResponseMessage DeleteEntity(Int64 Id)
        {
            return ToJson(objBankBankRepository.DeleteEntity(Id));
        }

        [Route("api/BankMasterAPI/GetCompany")]
        [HttpGet]
        public HttpResponseMessage GetCompany()
        {
            return ToJson(objBankBankRepository.GetCompany());
        }

        [Route("api/BankMasterAPI/GetCurrency")]
        [HttpGet]
        public HttpResponseMessage GetCurrency()
        {
            return ToJson(objBankBankRepository.GetCurrency());
        }

    }
}
