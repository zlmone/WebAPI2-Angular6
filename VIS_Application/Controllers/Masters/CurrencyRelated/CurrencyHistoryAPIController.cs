using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VIS_Domain.Master.CurrencyRelated;
using VIS_Repository;
using VIS_Repository.Masters.CurrencyRelated;
namespace VIS_App.Controllers.Masters.CurrencyRelated
{
    public class CurrencyHistoryAPIController : BaseAPIController
    {

        CurrencyHistoryRepository  CurrencyHistoryRepository = null;


        public CurrencyHistoryAPIController()
        {
            CurrencyHistoryRepository = new CurrencyHistoryRepository(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
        }

        public HttpResponseMessage Get()
        {
            return ToJson(CurrencyHistoryRepository.GetEntityList());
        }

        public HttpResponseMessage GetById(Int64 Id)
        {
            return ToJson(CurrencyHistoryRepository.GetEntityByID(Id));
        }

        public HttpResponseMessage Post([FromBody]CurrencyHistory value)
        {
            return ToJson(CurrencyHistoryRepository.AddEntity(value));
        }

        [HttpPut]
        public HttpResponseMessage UpdateEntity(Int64 Id, [FromBody]CurrencyHistory value)
        {
            return ToJson(CurrencyHistoryRepository.UpdateEntity(value));
        }

        [HttpDelete]
        public HttpResponseMessage DeleteEntity(Int64 Id)
        {
            return ToJson(CurrencyHistoryRepository.DeleteEntity(Id));
        }

    }
}
