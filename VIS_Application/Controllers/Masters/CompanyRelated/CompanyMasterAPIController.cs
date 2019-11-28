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
    public class CompanyMasterAPIController : BaseAPIController
    {
        CompanyMasterRepository objCompanyMasterRepository = null;
        VISIBaseRepository<CompanyMaster> CompanyMasterRepository;
        List<CompanyMaster> EntityList = new List<CompanyMaster>();


        public CompanyMasterAPIController(VISIBaseRepository<CompanyMaster> _CompanyMasterRepository)
        {
            CompanyMasterRepository = _CompanyMasterRepository;
            objCompanyMasterRepository = new CompanyMasterRepository(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
        }
        public HttpResponseMessage Get()
        {
            return ToJson(CompanyMasterRepository.GetEntityList().AsEnumerable());
        }

        [HttpGet]
        [Route("api/CompanyMasterAPI/GetDesignationdllData")]
        public HttpResponseMessage GetDesignationdllData()
        {
            return ToJson(objCompanyMasterRepository.GetDesignation().AsEnumerable());
        }
        [HttpGet]
        [Route("api/CompanyMasterAPI/GetCountrydllData")]
        public HttpResponseMessage GetCountrydllData()
        {
            return ToJson(objCompanyMasterRepository.GetCountry().AsEnumerable());
        }
        [HttpGet]
        [Route("api/CompanyMasterAPI/GetFYdllData")]
        public HttpResponseMessage GetFYdllData()
        {
            return ToJson(objCompanyMasterRepository.GetFinancialYear().AsEnumerable());
        }
        [HttpGet]
        [Route("api/CompanyMasterAPI/SelectHead")]
        public HttpResponseMessage SelectHead()
        {
            return ToJson(objCompanyMasterRepository.GetHeaddll().AsEnumerable());
        }

        
            [HttpPost]
            [Route("api/CompanyMasterAPI/UploadJsonFile")]
            public HttpResponseMessage UploadJsonFile()
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var httpRequest = HttpContext.Current.Request;
                if (httpRequest.Files.Count > 0)
                {
                    foreach (string file in httpRequest.Files)
                    {
                        var postedFile = httpRequest.Files[file];
                        var filePath = HttpContext.Current.Server.MapPath("~/Upload/CompanyMaster/" + postedFile.FileName);
                        postedFile.SaveAs(filePath);
                    }
                }
                return response;
            }
        

        //[HttpPost]
        //[Route("api/CompanyMasterAPI/FileUpload")]
        //public void FileUpload()
        //{
        //    var httpRequest = HttpContext.Current.Request;
        //    if (httpRequest.Files.Count > 0)
        //    {

        //    }
        //   // return ToJson(CompanyMasterRepository.AddEntity(value));
        //}


        //[Route("api/CompanyMasterAPI/FileUpload")]
        //public HttpResponseMessage UploadJsonFile()
        //{
        //    HttpResponseMessage response = new HttpResponseMessage();
        //    var httpRequest = HttpContext.Current.Request;
        //    if (httpRequest.Files.Count > 0)
        //    {
        //        foreach (string file in httpRequest.Files)
        //        {
        //            var postedFile = httpRequest.Files[file];
        //            var filePath = HttpContext.Current.Server.MapPath("~/Upload/" + postedFile.FileName);
        //            postedFile.SaveAs(filePath);
        //        }
        //    }
        //    return response;
        //}

        public HttpResponseMessage Post([FromBody]CompanyMaster value)
        {
            return ToJson(CompanyMasterRepository.AddEntity(value));
        }

        [HttpPut]
        public HttpResponseMessage UpdateEntity(Int64 Id, [FromBody]CompanyMaster value)
        {
            return ToJson(CompanyMasterRepository.UpdateEntity(value));
        }

        [HttpDelete]
        public HttpResponseMessage DeleteEntity(Int64 Id)
        {
            return ToJson(CompanyMasterRepository.DeleteEntity(Id));
        }

        //public HttpResponseMessage GetDropdownData()
        //{
        //    return ToJson(CompanyMasterRepository.GetAllDropdownData().AsEnumerable());
        //}
    }
}
