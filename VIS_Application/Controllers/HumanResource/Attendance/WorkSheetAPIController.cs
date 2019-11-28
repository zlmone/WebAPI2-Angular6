using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VIS_Domain.HumanResource.Attendance;
using VIS_Repository.HumanResource.Attendace;

namespace VIS_App.Controllers.HumanResource.Attendance
{
    public class WorkSheetAPIController : BaseAPIController
    {

         WorkSheetRepository ObjWorkSheetRepository = null;

        public WorkSheetAPIController()
        {
            ObjWorkSheetRepository = new WorkSheetRepository(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
        }

        public HttpResponseMessage Get()
        {
            return ToJson(ObjWorkSheetRepository.GetEntityList().AsEnumerable());
        }


        //[Route("api/WorkSheetAPI/AddWorkSheet")]
        //[HttpGet]
        //public HttpResponseMessage AddWorkSheet([FromBody]WorkSheet value)
        //{
        //    return ToJson(ObjWorkSheetRepository.AddWorkSheet(value));
        //}

        [Route("api/WorkSheetAPI/GetDropDownList")]
        [HttpGet]
        public HttpResponseMessage GetDropDownList()
        {
            return ToJson(ObjWorkSheetRepository.GetDefaultConfigure());
        }
        [Route("api/WorkSheetAPI/GetDate")]
        [HttpGet]
        public HttpResponseMessage GetDate()
        {
            return ToJson(ObjWorkSheetRepository.GetDate());
        }
        [Route("api/WorkSheetAPI/GetProjectList")]
        [HttpGet]
        public HttpResponseMessage GetProjectList(Int64 UserId, string Date)
        {
            return ToJson(ObjWorkSheetRepository.GetProjectList(UserId, Date));

        }
        [Route("api/WorkSheetAPI/GetChildtaskDropDown")]
        [HttpGet]
        public HttpResponseMessage GetChildtaskDropDown(Int64 ProjectId, Int64 UserId, string Date)
        {
            return ToJson(ObjWorkSheetRepository.GetTaskDropDownFill(ProjectId, UserId, Date));

        }
        [Route("api/WorkSheetAPI/SaveWorksheet")]
        [HttpPost]
        public HttpResponseMessage SaveWorksheet(List<WorkSheet> value)
        {
            return ToJson(ObjWorkSheetRepository.SaveWorksheet(value));
        }

        public HttpResponseMessage Post([FromBody]WorkSheet value)
        {
            return ToJson(ObjWorkSheetRepository.AddEntity(value));
        }

        [HttpPut]
        public HttpResponseMessage UpdateEntity(Int64 Id, [FromBody]WorkSheet value)
        {
            return ToJson(ObjWorkSheetRepository.UpdateEntity(value));
        }

        [HttpDelete]
        public HttpResponseMessage DeleteEntity(Int64 Id)
        {
            return ToJson(ObjWorkSheetRepository.DeleteEntity(Id));
        }
    }













}
