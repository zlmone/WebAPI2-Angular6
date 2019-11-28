using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using VIS_Domain.HumanResource.EmployeeManagement;
using VIS_Repository.HumanResource.EmployeeManagement;

namespace VIS_App.Controllers.HumanResource.EmployeeManagement
{
    public class EmpInfoTabularAPIController : BaseAPIController
    {


        EmpInfoTabularRepository ObjEmpInfoTabularRepository = null;
        public EmpInfoTabularAPIController()
        {
            ObjEmpInfoTabularRepository = new EmpInfoTabularRepository(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
        }

        [Route("api/EmpInfoTabularAPI/AddRole")]
        [HttpPost]
        public HttpResponseMessage AddRole(EmpInfoTabular entityobject)
        {
            
            return ToJson(ObjEmpInfoTabularRepository.AddRole(entityobject));
        }
        [Route("api/EmpInfoTabularAPI/GetRoleAdd")]
        [HttpGet]
        public HttpResponseMessage GetRoleAdd()
        {
            return ToJson(ObjEmpInfoTabularRepository.GetRoleAdd());
        }
        [Route("api/EmpInfoTabularAPI/SaveMain")]
        [HttpPost]
        public HttpResponseMessage SaveMain(EmpInfoTabular entityobject)
        {

            return ToJson(ObjEmpInfoTabularRepository.SaveMain(entityobject));
        }
        [Route("api/EmpInfoTabularAPI/SavePersonal")]
        [HttpPost]
        public HttpResponseMessage SavePersonal(EmpInfoTabular entityobject)
        {

            return ToJson(ObjEmpInfoTabularRepository.SavePersonal(entityobject));
        }
        [Route("api/EmpInfoTabularAPI/SaveEducation")]
        [HttpPost]
        public HttpResponseMessage SaveEducation(EmpInfoTabular entityobject)
        {

            return ToJson(ObjEmpInfoTabularRepository.SaveEducation(entityobject));
        }
        [Route("api/EmpInfoTabularAPI/SaveSalary")]
        [HttpPost]
        public HttpResponseMessage SaveSalary(EmpInfoTabular entityobject)
        {

            return ToJson(ObjEmpInfoTabularRepository.SaveSalary(entityobject));
        }
        [Route("api/EmpInfoTabularAPI/SaveAttendance")]
        [HttpPost]
        public HttpResponseMessage SaveAttendance(EmpInfoTabular entityobject)
        {

            return ToJson(ObjEmpInfoTabularRepository.SaveAttendance(entityobject));
        }
        [Route("api/EmpInfoTabularAPI/SaveJoining")]
        [HttpPost]
        public HttpResponseMessage SaveJoining(EmpInfoTabular entityobject)
        {

            return ToJson(ObjEmpInfoTabularRepository.SaveJoining(entityobject));
        }
        [Route("api/EmpInfoTabularAPI/SaveIncrement")]
        [HttpPost]
        public HttpResponseMessage SaveIncrement(EmpInfoTabular entityobject)
        {

            return ToJson(ObjEmpInfoTabularRepository.SaveIncrement(entityobject));
        }
        [Route("api/EmpInfoTabularAPI/SaveOfficial")]
        [HttpPost]
        public HttpResponseMessage SaveOfficial(EmpInfoTabular entityobject)
        {
            return ToJson(ObjEmpInfoTabularRepository.SaveOfficial(entityobject));
        }
        [Route("api/EmpInfoTabularAPI/Saveskill")]
        [HttpPost]
        public HttpResponseMessage Saveskill(EmpInfoTabular entityobject)
        {
            return ToJson(ObjEmpInfoTabularRepository.Saveskill(entityobject));
        }

        [Route("api/EmpInfoTabularAPI/AddLeave")]
        [HttpPost]
        public HttpResponseMessage AddLeave(EmpInfoTabular entityobject)
        {
            return ToJson(ObjEmpInfoTabularRepository.AddLeave(entityobject));
        }
        [Route("api/EmpInfoTabularAPI/btnAddExp")]
        [HttpPost]
        public HttpResponseMessage btnAddExp(EmpInfoTabular entityobject)
        {
            return ToJson(ObjEmpInfoTabularRepository.btnAddExp(entityobject));
        }
        [Route("api/EmpInfoTabularAPI/GetAccountNo")]
        [HttpGet]
       
        public HttpResponseMessage GetAccountNo(string AccountNumber, string UserId)
        {
            return ToJson(ObjEmpInfoTabularRepository.GetAccountNo(AccountNumber,UserId));
        }

        [Route("api/EmpInfoTabularAPI/FillProjectDetail")]
        [HttpGet]
        public HttpResponseMessage FillProjectDetail(string FromDate, string ToDate,long UserId)
        {
            return ToJson(ObjEmpInfoTabularRepository.FillProjectDetail(FromDate, ToDate, UserId));
        }
        [Route("api/EmpInfoTabularAPI/FillProjectDetailWbs")]
        [HttpGet]
        public HttpResponseMessage FillProjectDetailWbs(string FromDate, string ToDate,long UserId)
        {
            return ToJson(ObjEmpInfoTabularRepository.FillProjectDetailWbs(FromDate, ToDate, UserId));
        }
        [Route("api/EmpInfoTabularAPI/GetOfferdeatils")]
        [HttpGet]
        public HttpResponseMessage GetOfferdeatils(long UserId)
        {
            return ToJson(ObjEmpInfoTabularRepository.GetOfferdeatils(UserId));
        }
        [Route("api/EmpInfoTabularAPI/GetSkill")]
        [HttpGet]
        public HttpResponseMessage GetSkill()
        {
            return ToJson(ObjEmpInfoTabularRepository.GetSkill());
        }
        [Route("api/EmpInfoTabularAPI/GetPopupSkill")]
        [HttpGet]
        public HttpResponseMessage GetPopupSkill(long lookupSkilId)
        {
            return ToJson(ObjEmpInfoTabularRepository.GetPopupSkill(lookupSkilId));
        }
        [Route("api/EmpInfoTabularAPI/GetGridViewList")]
        [HttpGet]

        public HttpResponseMessage GetGridViewList(long UserId)
        {
            return ToJson(ObjEmpInfoTabularRepository.GetGridViewList(UserId));
        }


        [Route("api/EmpInfoTabularAPI/GetEmployeeDeatils")]
        [HttpGet]
        public HttpResponseMessage GetEmployeeDeatils(string UserId)
        {
            return ToJson(ObjEmpInfoTabularRepository.GetEmployeeDeatils(UserId));
        }
        [Route("api/EmpInfoTabularAPI/GetAdustmentleave")]
        [HttpGet]
        public HttpResponseMessage GetAdustmentleave(long UserId)
        {
            return ToJson(ObjEmpInfoTabularRepository.GetAdustmentleave(UserId));
        }

        [Route("api/EmpInfoTabularAPI/FillLeaveDeatil")]
        [HttpGet]
        public HttpResponseMessage FillLeaveDeatil()
        {
            return ToJson(ObjEmpInfoTabularRepository.FillLeaveDeatil());
        }
        [Route("api/EmpInfoTabularAPI/GetPendingList")]
        [HttpGet]
        public HttpResponseMessage GetPendingList(long UserId)
        {
            return ToJson(ObjEmpInfoTabularRepository.GetPendingList(UserId));
        }
        [Route("api/EmpInfoTabularAPI/GetFeedbackList")]
        [HttpGet]
        public HttpResponseMessage GetFeedbackList(long UserId)
        {
            return ToJson(ObjEmpInfoTabularRepository.GetFeedbackList(UserId));
        }

        public HttpResponseMessage Get()
        {
            return ToJson(ObjEmpInfoTabularRepository.GetEntityList().AsEnumerable());
        }
        [Route("api/EmpInfoTabularAPI/GetRole")]
        [HttpGet]
        public HttpResponseMessage GetRole()
        {
            return ToJson(ObjEmpInfoTabularRepository.GetRole());
        }
        [Route("api/EmpInfoTabularAPI/FillPassingYear")]
        [HttpGet]
        public HttpResponseMessage FillPassingYear(string EditEmployeeid,string Editmode)
        {
            return ToJson(ObjEmpInfoTabularRepository.FillPassingYear(EditEmployeeid,Editmode));
        }
        [Route("api/EmpInfoTabularAPI/GetTechnology")]
        [HttpGet]
        public HttpResponseMessage GetTechnology()
        {
            return ToJson(ObjEmpInfoTabularRepository.GetTechnology());
        }

        [Route("api/EmpInfoTabularAPI/GetCompany")]
        [HttpGet]
        public HttpResponseMessage GetCompany()
        {
            return ToJson(ObjEmpInfoTabularRepository.GetCompany());
        }
        [Route("api/EmpInfoTabularAPI/GetWorking")]
        [HttpGet]
        public HttpResponseMessage GetWorking()
        {
            return ToJson(ObjEmpInfoTabularRepository.GetWorking());
        }
        [Route("api/EmpInfoTabularAPI/GetJoiningDesignation")]
        [HttpGet]
        public HttpResponseMessage GetJoiningDesignation()
        {
            return ToJson(ObjEmpInfoTabularRepository.GetJoiningDesignation( ));
        }

        [Route("api/EmpInfoTabularAPI/GetDepartmentname")]
        [HttpGet]
        public HttpResponseMessage GetDepartmentname()
        {
            return ToJson(ObjEmpInfoTabularRepository.GetDepartmentname());
        }
        [Route("api/EmpInfoTabularAPI/GetPositionName")]
        [HttpGet]
        public HttpResponseMessage GetPositionName()
        {
            return ToJson(ObjEmpInfoTabularRepository.GetPositionName());
        }
        [Route("api/EmpInfoTabularAPI/GetEmployeeGrade")]
        [HttpGet]
        public HttpResponseMessage GetEmployeeGrade()
        {
            return ToJson(ObjEmpInfoTabularRepository.GetEmployeeGrade());
        }
        [Route("api/EmpInfoTabularAPI/GetLinemanager")]
        [HttpGet]
        public HttpResponseMessage GetLinemanager(string Usertype, long UserId)
        {
            return ToJson(ObjEmpInfoTabularRepository.GetLinemanager(Usertype, UserId));
        }
        [Route("api/EmpInfoTabularAPI/GetUserRole")]
        [HttpGet]
        public HttpResponseMessage GetUserRole()
        {
            return ToJson(ObjEmpInfoTabularRepository.GetUserRole());
        }
        [Route("api/EmpInfoTabularAPI/GetEducationType")]
        [HttpGet]
        public HttpResponseMessage GetEducationType()
        {
            return ToJson(ObjEmpInfoTabularRepository.GetEducationType());
        }
        [Route("api/EmpInfoTabularAPI/GetSalaryRangeDropDown")]
        [HttpGet]
        public HttpResponseMessage GetSalaryRangeDropDown(long Salary)
        {
            return ToJson(ObjEmpInfoTabularRepository.GetSalaryRangeDropDown(Salary));
        }
        [Route("api/EmpInfoTabularAPI/GetSalaryBrakup")]
        [HttpGet]
        public HttpResponseMessage GetSalaryBrakup(long SalaryRangeId)
        {
            return ToJson(ObjEmpInfoTabularRepository.GetSalaryBrakup(SalaryRangeId));
        }
        [Route("api/EmpInfoTabularAPI/FillEmployee")]
        [HttpGet]
        public HttpResponseMessage FillEmployee()
        {
            return ToJson(ObjEmpInfoTabularRepository.FillEmployee());
        }
        [Route("api/EmpInfoTabularAPI/GetNonWorking")]
        [HttpGet]
        public HttpResponseMessage GetNonWorking()
        {
            return ToJson(ObjEmpInfoTabularRepository.GetNonWorking());
        }
        [Route("api/EmpInfoTabularAPI/GetInTimeOutTimeSelected")]
        [HttpGet]
        public HttpResponseMessage GetInTimeOutTimeSelected()
        {
            return ToJson(ObjEmpInfoTabularRepository.GetInTimeOutTimeSelected());
        }
        [Route("api/EmpInfoTabularAPI/GetEmployeeTime")]
        [HttpGet]
        public HttpResponseMessage GetEmployeeTime(long CompanyId)
        {
            return ToJson(ObjEmpInfoTabularRepository.GetEmployeeTime(CompanyId));
        }
        public HttpResponseMessage Post([FromBody]EmpInfoTabular value)
        {
            return ToJson(ObjEmpInfoTabularRepository.AddEntity(value));
        }
        [Route("api/EmpInfoTabularAPI/GetIncrementType")]
        [HttpGet]
        public HttpResponseMessage GetIncrementType()
        {
            return ToJson(ObjEmpInfoTabularRepository.GetIncrementType());
        }
        [Route("api/EmpInfoTabularAPI/GetIncrementList")]
        [HttpGet]
        public HttpResponseMessage GetIncrementList()
        {
            return ToJson(ObjEmpInfoTabularRepository.GetIncrementList());
        }
        [Route("api/EmpInfoTabularAPI/GetLeaveType")]
        [HttpGet]
        public HttpResponseMessage GetLeaveType()
        {
            return ToJson(ObjEmpInfoTabularRepository.GetLeaveType());
        }
        [Route("api/EmpInfoTabularAPI/GetAttendanceDetail")]
        [HttpGet]

        public HttpResponseMessage GetAttendanceDetail(int AccessCardId, long UserId)
        {
            return ToJson(ObjEmpInfoTabularRepository.GetAttendanceDetail(AccessCardId, UserId));
        }
        [HttpPut]
        public HttpResponseMessage UpdateEntity(Int64 Id, [FromBody]EmpInfoTabular value)
        {
            return ToJson(ObjEmpInfoTabularRepository.UpdateEntity(value));
        }
      
        [HttpDelete]
        public HttpResponseMessage DeleteEntity(Int64 id)
        {
            return ToJson(ObjEmpInfoTabularRepository.DeleteEntity(id));
        }
        [Route("api/EmpInfoTabularAPI/DeleteRole")]
        [HttpDelete]
        public HttpResponseMessage DeleteRole(Int64 id)
        {
            return ToJson(ObjEmpInfoTabularRepository.DeleteEntity(id));
        }


        [HttpPost]
        [Route("api/EmpInfoTabularAPI/UploadJsonFile")]
        public HttpResponseMessage UploadJsonFile()
        {
            HttpResponseMessage response = new HttpResponseMessage();
            var httpRequest = HttpContext.Current.Request;
            if (httpRequest.Files.Count > 0)
            {
                foreach (string file in httpRequest.Files)
                {
                    var postedFile = httpRequest.Files[file];
                    var filePath = HttpContext.Current.Server.MapPath("~/Upload/JoiningDocuments/" + postedFile.FileName);
                    postedFile.SaveAs(filePath);
                }
            }
            return response;
        }

    }
    }

