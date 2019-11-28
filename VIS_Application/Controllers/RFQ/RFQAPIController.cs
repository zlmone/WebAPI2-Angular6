using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using VIS_Domain;
using VIS_Domain.GeneralHelper;
using VIS_Domain.Master;
using VIS_Domain.Master.CompanyRelated;
using VIS_Domain.RFQ;
using VIS_Repository;
using VIS_Repository.GeneralHelper;
using VIS_Repository.Masters;
using VIS_Repository.RFQ;

namespace VIS_App.Controllers.RFQ
{
    public class RFQAPIController : BaseAPIController
    {
        VISIBaseRepository<RFQList> RFQRepository;
        HelperRepository HelperObj = null;
        List<RFQList> EntityList = new List<RFQList>();
        RFQRepository obj = null;

        public RFQAPIController()
        {
            obj = new RFQRepository(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
            HelperObj = new HelperRepository(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
        }

        [HttpGet]
        [Route("api/RFQAPI/GetMyRFQ")]
        public HttpResponseMessage GetMyRFQ(string CommunicationId)
        {

            string Mode = "myrfq";
            long emp = Convert.ToInt64(HelperObj.GetEmpIdByCommunicationId(CommunicationId));
            return ToJson(obj.GetEntityList(emp, Mode).AsEnumerable());
        }
        [HttpGet]
        [Route("api/RFQAPI/GetAllRFQ")]
        public HttpResponseMessage GetAllRFQ(string CommunicationId)
        {

            string Mode = "allrfq";
            long emp = Convert.ToInt64(HelperObj.GetEmpIdByCommunicationId(CommunicationId));
            return ToJson(obj.GetEntityList(emp, Mode).AsEnumerable());
        }
        //
        [HttpGet]
        [Route("api/RFQAPI/GetResponceRequestedRFQ")]
        public HttpResponseMessage GetResponceRequestedRFQ(string CommunicationId)
        {
            IEnumerable<RFQList> lstRFQ = new List<RFQList>();
            string Mode = "estimateby";
            long emp = Convert.ToInt64(HelperObj.GetEmpIdByCommunicationId(CommunicationId));
            lstRFQ = obj.GetEntityList(emp, Mode);
            lstRFQ = lstRFQ.Where(x => x.rfqStatus.ToLower().Contains("in process")).ToList();
            return ToJson(lstRFQ.AsEnumerable());
        }
        [HttpGet]
        [Route("api/RFQAPI/GetMyActionRFQ")]
        public HttpResponseMessage GetMyActionRFQ(string CommunicationId)
        {
            IEnumerable<RFQList> lstRFQ = new List<RFQList>();
            string Mode = "myaction";
            long emp = Convert.ToInt64(HelperObj.GetEmpIdByCommunicationId(CommunicationId));
            lstRFQ = obj.GetEntityList(emp, Mode);
            lstRFQ = lstRFQ.Where(x => x.rfqStatus.ToLower().Contains("in process")).ToList();
            return ToJson(lstRFQ.AsEnumerable());
        }
        //
        [HttpGet]
        [Route("api/RFQAPI/GetMyWatchListRFQ")]
        public HttpResponseMessage GetMyWatchListRFQ(string CommunicationId)
        {
            IEnumerable<RFQList> lstRFQ = new List<RFQList>();
            string Mode = "mywatch";
            long emp = Convert.ToInt64(HelperObj.GetEmpIdByCommunicationId(CommunicationId));
            lstRFQ = obj.GetEntityList(emp, Mode);
            lstRFQ = lstRFQ.Where(x => x.rfqStatus.ToLower().Contains("in process")).ToList();
            return ToJson(lstRFQ.AsEnumerable());
        }
        public HttpResponseMessage Post([FromBody]MainRFQInitial value)
        {
            bool CheckSave = obj.RFQInitial(value.RFQInitial);
            if (CheckSave == true)
            {
                obj.RFQDoc(value.RFQDoc, value.SessionData);
                obj.RFQLink(value.RFQLink, value.SessionData);
                return ToJson("Success:");
            }
            else {
                return ToJson("Failed:");
            }

            
        }
        //[HttpPost]
        //[Route("api/RFQAPI/Post")]
        //public void Post([FromBody]MainRFQInitial MainRFQInitial)
        //{

        //}

        [HttpPut]
        public HttpResponseMessage UpdateEntity(Int64 Id, [FromBody]RFQList value)
        {
            return ToJson(RFQRepository.UpdateEntity(value));
        }

        [HttpDelete]
        public HttpResponseMessage DeleteEntity(Int64 Id)
        {
            return ToJson(RFQRepository.DeleteEntity(Id));
        }
        [HttpGet]
        [Route("api/RFQAPI/FillBusinessHead")]
        public HttpResponseMessage FillBusinessHead()
        {

            return ToJson(obj.FillBusinessHead());
        }

        [HttpGet]
        [Route("api/RFQAPI/GetBusinessManager")]
        public HttpResponseMessage GetBusinessManager(string UserId)
        {
            long emp = Convert.ToInt64(HelperObj.GetEmpIdByCommunicationId(UserId));
            return ToJson(obj.FillBusinessManager(emp));
        }
        [HttpGet]
        [Route("api/RFQAPI/GetBusinessType")]
        public HttpResponseMessage GetBusinessType()
        {
            return ToJson(obj.GetBusinessType());
        }

        [HttpGet]
        [Route("api/RFQAPI/GetProjectType")]
        public HttpResponseMessage GetProjectType()
        {
            return ToJson(obj.GetProjectType());
        }
        [HttpGet]
        [Route("api/RFQAPI/GetIndustries")]
        public HttpResponseMessage GetIndustries()
        {
            return ToJson(obj.GetIndustries());
        }
        [HttpGet]
        [Route("api/RFQAPI/GetSolution")]
        public HttpResponseMessage GetSolution()
        {
            return ToJson(obj.GetSolution());
        }
        [HttpGet]
        [Route("api/RFQAPI/GetServiceOffering")]
        public HttpResponseMessage GetServiceOffering()
        {
            return ToJson(obj.GetServiceOffering());
        }
        [HttpGet]
        [Route("api/RFQAPI/GetFileType")]
        public HttpResponseMessage GetFileType()
        {
            return ToJson(obj.GetFileType());
        }
        [HttpGet]
        [Route("api/RFQAPI/GetAuthor")]
        public HttpResponseMessage GetAuthor()
        {
            return ToJson(obj.GetAuthor());
        }
        [HttpGet]
        [Route("api/RFQAPI/GetTechnology")]
        public HttpResponseMessage GetTechnology()
        {
            return ToJson(obj.GetTechnology());
        }
        [HttpGet]
        [Route("api/RFQAPI/GetEmployee")]
        public HttpResponseMessage GetEmployee()
        {
            return ToJson(obj.GetEmployee());
        }
        [HttpGet]
        [Route("api/RFQAPI/GetRFQStatus")]
        public HttpResponseMessage GetRFQStatus()
        {
            return ToJson(obj.GetRFQStatus());
        }


        [HttpPost]
        [Route("api/RFQAPI/UploadRFQDoc")]
        public HttpResponseMessage UploadRFQDoc()
        {
            HttpResponseMessage response = new HttpResponseMessage();
            var httpRequest = HttpContext.Current.Request;
            if (httpRequest.Files.Count > 0)
            {
                foreach (string file in httpRequest.Files)
                {
                    var postedFile = httpRequest.Files[file];
                    var filePath = HttpContext.Current.Server.MapPath("~/Upload/RFQ/Document/" + postedFile.FileName);
                    postedFile.SaveAs(filePath);
                }
            }
            return response;
        }
        [HttpPost]
        [Route("api/RFQAPI/GetProspectClient")]
        public HttpResponseMessage GetProspectClient(SuperProspectClient superProspectClient)
        {
            return ToJson(obj.GetProspectClient(superProspectClient.ProspectClient, superProspectClient.SessionValues));
        }
    }
}
