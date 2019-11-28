using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VIS_Domain.RFQ;
using VIS_Repository;
using VIS_Repository.GeneralHelper;
using VIS_Repository.RFQ;

namespace VIS_App.Controllers.RFQ
{
    public class RFQResponseAPIController : BaseAPIController
    {
       
        RFQResponseRepository obj = null;
        RFQHelperRepository objHelper = null;
        RFQRepository objDL = null;

        public RFQResponseAPIController()
        {
            obj = new RFQResponseRepository(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
            objDL = new RFQRepository(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
            objHelper = new RFQHelperRepository(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
        }

        [HttpGet]
        [Route("api/RFQResponseAPI/GetActionTaken")]
        public HttpResponseMessage GetActionTaken(long UserId, bool Access)
        {
            string UserID = UserId.ToString(); 
            return ToJson(obj.GetActionTaken(UserID, Access));
        }
        [HttpGet]
        [Route("api/RFQResponseAPI/GetOnLoadData")]
        public HttpResponseMessage GetOnLoadData(long UserId, long RFQId)
        {
            string UserID = UserId.ToString();
            return ToJson(obj.GetOnLoadData(UserID, RFQId));
        }
        public HttpResponseMessage Post([FromBody]MainAddResponse value)
        {
            obj.SaveAddResponse(value.RFQResponse, value.SessionData, value.RFQId);
            objDL.RFQDoc(value.RFQDoc, value.SessionData);
            objDL.RFQLink(value.RFQLink, value.SessionData);
            return ToJson("Success:");

        }
        [HttpGet]
        [Route("api/RFQResponseAPI/GetRFQDocument")]
        public HttpResponseMessage GetRFQDocument()
        {
            return ToJson(objHelper.GetRFQDocument());
        }
        [HttpGet]
        [Route("api/RFQResponseAPI/GetRFQLink")]
        public HttpResponseMessage GetRFQLink()
        {
            return ToJson(objHelper.GetRFQLink());
        }
        [HttpGet]
        [Route("api/RFQResponseAPI/GetViewRFQResponseById")]
        public HttpResponseMessage GetViewRFQResponseById(long Id)
        {
            return ToJson(obj.GetViewRFQResponseById(Id));
        }

    }
}
