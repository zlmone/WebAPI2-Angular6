using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using VIS_Domain.Master.CurrencyRelated;
using VIS_Repository;

namespace VIS_App.Controllers.Masters.CurrencyRelated
{
    public class CurrencyAPIController : BaseAPIController
    {
        VISIBaseRepository<Currency> CurrencyRepository;
        List<Currency> EntityList = new List<Currency>();


        public CurrencyAPIController(VISIBaseRepository<Currency> _currencyRepository)
        {
            CurrencyRepository = _currencyRepository;
        }
        public HttpResponseMessage Get()
        {
            return ToJson(CurrencyRepository.GetEntityList().AsEnumerable());
        }

        public HttpResponseMessage Post([FromBody]Currency value)
        {
            return ToJson(CurrencyRepository.AddEntity(value));
        }

        [HttpPut]
        public HttpResponseMessage UpdateEntity(Int64 Id, [FromBody]Currency value)
        {
            return ToJson(CurrencyRepository.UpdateEntity(value));
        }

        [HttpDelete]
        public HttpResponseMessage DeleteEntity(Int64 Id)
        {            
            return ToJson(CurrencyRepository.DeleteEntity(Id));
        }
    }
}
