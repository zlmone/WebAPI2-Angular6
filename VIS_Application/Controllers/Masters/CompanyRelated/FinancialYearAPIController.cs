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
using VIS_Domain.Master.CompanyRelated;
using VIS_Repository.Masters.CompanyRelated;
using System.Web;

namespace VIS_App.Controllers.Masters.CompanyRelated
{
    public class FinancialYearAPIController : BaseAPIController
    {
        FinancialYearRepository objFinancialYear = null;
        VISIBaseRepository<FinancialYear> FinancialYearRepository;
        List<FinancialYear> EntityList = new List<FinancialYear>();


        public FinancialYearAPIController(VISIBaseRepository<FinancialYear> _FinancialYearRepository)
        {
            FinancialYearRepository = _FinancialYearRepository;
            objFinancialYear = new FinancialYearRepository(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
        }
        public HttpResponseMessage Get()
        {
            return ToJson(FinancialYearRepository.GetEntityList().AsEnumerable());
        }
        public HttpResponseMessage Post([FromBody]FinancialYear value)
        {
            return ToJson(FinancialYearRepository.AddEntity(value));
        }

        [HttpPut]
        public HttpResponseMessage UpdateEntity(Int64 Id, [FromBody]FinancialYear value)
        {
            return ToJson(FinancialYearRepository.UpdateEntity(value));
        }

        [HttpDelete]
        public HttpResponseMessage DeleteEntity(Int64 Id)
        {
            return ToJson(FinancialYearRepository.DeleteEntity(Id));
        }
        
    }
}
