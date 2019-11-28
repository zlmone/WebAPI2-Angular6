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
    public class EmployeeFeedbackAPIController : BaseAPIController
    {

        EmployeeFeedbackRepository ObjEmployeeFeedbackRepository = null;

        public EmployeeFeedbackAPIController()
        {
            ObjEmployeeFeedbackRepository = new EmployeeFeedbackRepository(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
        }
        [Route("api/EmployeeFeedbackAPI/UpdateFeedback")]
        [HttpPut]
        public HttpResponseMessage UpdateFeedback(Int64 Id)
        {
            return ToJson(ObjEmployeeFeedbackRepository.UpdateFeedback(Id));
        }
        [Route("api/EmployeeFeedbackAPI/RejectFeedback")]
        [HttpPut]
        public HttpResponseMessage RejectFeedback(Int64 Id)
        {
            return ToJson(ObjEmployeeFeedbackRepository.RejectFeedback(Id));
        }
        [Route("api/EmployeeFeedbackAPI/GetEmployeeList")]
        [HttpGet]
        public HttpResponseMessage GetEmployeeList(long UserId)
        {
            return ToJson(ObjEmployeeFeedbackRepository.GetEmployeeList(UserId));
        }
        [Route("api/EmployeeFeedbackAPI/GetEmployeeFeedback")]
        [HttpGet]
        public HttpResponseMessage GetEmployeeFeedback(long UserId)
        {
            return ToJson(ObjEmployeeFeedbackRepository.GetEmployeeFeedbackList(UserId));
        }

        [Route("api/EmployeeFeedbackAPI/GetPendingListEmployee")]
        [HttpGet]
        public HttpResponseMessage GetPendingListEmployee(long UserId)
        {
            return ToJson(ObjEmployeeFeedbackRepository.GetPendingListEmployee(UserId));
        }
        [Route("api/EmployeeFeedbackAPI/GetMyTeam")]
        [HttpGet]
        public HttpResponseMessage GetMyTeam(long UserId)
        {
            return ToJson(ObjEmployeeFeedbackRepository.GetMyTeam(UserId));
        }
        [Route("api/EmployeeFeedbackAPI/GetEmployeewiseSelect")]
        [HttpGet]
        public HttpResponseMessage GetEmployeewiseSelect(long TeamEmployeeId, long UserId)
        {
            return ToJson(ObjEmployeeFeedbackRepository.GetEmployeewiseSelect(TeamEmployeeId, UserId));
        }
        public HttpResponseMessage Get()
        {
            return ToJson(ObjEmployeeFeedbackRepository.GetEntityList().AsEnumerable());
        }

        public HttpResponseMessage Post([FromBody]EmployeeFeedback value)
        {
            return ToJson(ObjEmployeeFeedbackRepository.AddEntity(value));
        }

        [HttpPut]
        public HttpResponseMessage UpdateEntity(Int64 Id, [FromBody]EmployeeFeedback value)
        {
            return ToJson(ObjEmployeeFeedbackRepository.UpdateEntity(value));
        }

        [HttpDelete]
        public HttpResponseMessage DeleteEntity(Int64 Id)
        {
            return ToJson(ObjEmployeeFeedbackRepository.DeleteEntity(Id));
        }


    }
}
