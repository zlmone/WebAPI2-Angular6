using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using VIS_Domain.DocCentre;
using VIS_Repository.DocCenter;

namespace VIS_App.Controllers.DocCentre
{
    public class DocumentTemplateAPIController : BaseAPIController
    {
        DocumentTemplateRepository objDocumentTemplateRepository = null;


        public DocumentTemplateAPIController()
        {
            objDocumentTemplateRepository = new DocumentTemplateRepository(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
        }


        // Step 1 Related API
        public HttpResponseMessage GetAllApprovedRecord(int EmployeeId, string EmployeeRole, string ApprovedStatus)
        {
            return ToJson(objDocumentTemplateRepository.GetEntityListApproved(EmployeeId,EmployeeRole,ApprovedStatus));
        }

        public HttpResponseMessage GetAllModule()
        {
            return ToJson(objDocumentTemplateRepository.GetAllModule());
        }

        public HttpResponseMessage GetById(Int64 Id)
        {
            return ToJson(objDocumentTemplateRepository.GetById(Id));
        }

        [HttpPost]
        public HttpResponseMessage AddNewDocumentTemplate(DocumentTemplateModel entityobject)
        {
            return ToJson(objDocumentTemplateRepository.AddDocumentTemplate(entityobject));
        }

        [HttpPut]
        public HttpResponseMessage UpdateDocumentTemplate(DocumentTemplateModel entityobject)
        {
            return ToJson(objDocumentTemplateRepository.UpdateDocumentTemplate(entityobject));
        }

        [HttpDelete]
        public HttpResponseMessage DeleteDocumentTemplate(Int64 Id)
        {
            return ToJson(objDocumentTemplateRepository.ActiveInActiveDocumentTemplate(Id));
        }

        // Step 2 Related API

        [HttpPost]
        public HttpResponseMessage AddDocumentField(DocMasterFieldDataContract entityobject)
        {
            return ToJson(objDocumentTemplateRepository.AddDocumentField(entityobject));
        }

        [HttpPut]
        public HttpResponseMessage UpdateDocumentField(DocMasterFieldDataContract entityobject)
        {
            return ToJson(objDocumentTemplateRepository.UpdateDocumentField(entityobject));
        }

        [HttpDelete]
        public HttpResponseMessage DeleteDocumentField(Int64 Id,Int64 UpdatedBy)
        {
            return ToJson(objDocumentTemplateRepository.DeleteDocumentField(Id,UpdatedBy));
        }

        [HttpGet]
        public HttpResponseMessage GetAllDocumenetFieldByDocId(Int64 DocTempId)
        {
            return ToJson(objDocumentTemplateRepository.GetByDocTemplateId(DocTempId));
        }

        [HttpGet]
        public HttpResponseMessage GetAllDocumenetFieldById(Int64 Id)
        {
            return ToJson(objDocumentTemplateRepository.GetByFieldId(Id));
        }

        [HttpGet]
        public HttpResponseMessage GetDocTemplateMaxId()
        {
            return ToJson(objDocumentTemplateRepository.GetMaxDocTempId());
        }

        [HttpPost]
        public HttpResponseMessage UploadImage()
        {
            HttpResponseMessage response = new HttpResponseMessage();
            var httpRequest = HttpContext.Current.Request;
            if (httpRequest.Files.Count > 0)
            {
                foreach (string file in httpRequest.Files)
                {
                    var postedFile = httpRequest.Files[file];
                    var filePath = HttpContext.Current.Server.MapPath("~/Upload/DocumentCenter/DocumentTemplateImages/" + postedFile.FileName);
                    postedFile.SaveAs(filePath);
                }
            }
            return response;
        }

        [HttpGet]
        public HttpResponseMessage BindTableFieldDropDown(string TableName)
        {
            return ToJson(objDocumentTemplateRepository.BindTableFieldDropdown(TableName));
        }

        [HttpGet]
        public HttpResponseMessage BindCustomFieldDropDown(Int64 DocTempId)
        {
            return ToJson(objDocumentTemplateRepository.BindCustomFieldDropdown(DocTempId));
        }


        // Step 3 Related API


        [HttpPost]
        public HttpResponseMessage AddDocumentContainerField(List<DocMasterFieldDataContract> entitylist)
        {
            return ToJson(objDocumentTemplateRepository.AddDocumentContainerField(entitylist));
        }

        [HttpPost]
        public HttpResponseMessage AddDocumentMasterField(List<DocMasterFieldDataContract> entitylist)
        {
            return ToJson(objDocumentTemplateRepository.AddDocumentMasterField(entitylist));
        }

        [HttpGet]
        public HttpResponseMessage BindDocumentContainer(Int64 DocTempId)
        {
            return ToJson(objDocumentTemplateRepository.BindDocumentContainer(DocTempId));
        }




    }
}
