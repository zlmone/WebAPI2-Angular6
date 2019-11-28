using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VIS_Domain.Opinion;
using VIS_Repository.Opinion;

namespace VIS_App.Controllers.Opinion
{
    public class ConfigureSurveyAPIController : BaseAPIController
    {
        ConfigureServeyRepository objConfigureServeyRepository = null;

        public ConfigureSurveyAPIController()
        {
            objConfigureServeyRepository = new ConfigureServeyRepository(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
        }

        [Route("api/ConfigureSurveyAPI/GetRollOfEmployee")]
        [HttpGet]
        public HttpResponseMessage GetRollOfEmployee(int EmployeeId, string RoleType)
        {
            return ToJson(objConfigureServeyRepository.GetRollOfEmployee(EmployeeId, RoleType));
        }

        [Route("api/ConfigureSurveyAPI/GetSurveyDetails")]
        [HttpGet]
        public HttpResponseMessage GetSurveyDetails(string SearchField, string searchValue, int EmployeeId, string RoleType, string ServeyType, string Approvetype)
        {
            return ToJson(objConfigureServeyRepository.GetSurveyDetails(SearchField, searchValue, EmployeeId, RoleType, ServeyType, Approvetype));
        }
        
        [Route("api/ConfigureSurveyAPI/BindSurveyType")]
        [HttpGet]
        public HttpResponseMessage BindSurveyType()
        {
            return ToJson(objConfigureServeyRepository.BindSurveyType());
        }
        
        [Route("api/ConfigureSurveyAPI/BindUsersForOwnerSelection")]
        [HttpGet]
        public HttpResponseMessage BindUsersForOwnerSelection()
        {
            return ToJson(objConfigureServeyRepository.BindUsersForOwnerSelection());
        }
    }
}
