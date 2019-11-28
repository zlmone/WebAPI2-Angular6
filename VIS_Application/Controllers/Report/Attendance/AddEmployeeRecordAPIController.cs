using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VIS_Domain.Reports.Attendance;
using VIS_Repository.Reports.Attendance;

namespace VIS_App.Controllers.Report.Attendance
{
    public class AddEmployeeRecordAPIController : BaseAPIController
    {
        AddEmployeeRecordRepository objAddEmployeeRecordRepository = null;

        public AddEmployeeRecordAPIController()
        {
            objAddEmployeeRecordRepository = new AddEmployeeRecordRepository(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
        }

        [Route("api/AddEmployeeRecordAPI/FillEmployee")]
        [HttpGet]
        public HttpResponseMessage FillEmployee()
        {
            return ToJson(objAddEmployeeRecordRepository.GetEmployee());
        }
        
        [Route("api/AddEmployeeRecordAPI/BindEmployeeDetails")]
        [HttpGet]
        public HttpResponseMessage BindEmployeeDetails(Int64 EmpId,string Date,Int64 LoginUserId)
        {
            return ToJson(objAddEmployeeRecordRepository.GetEmployeeDetails(EmpId,Date,LoginUserId));
        }
        
        [Route("api/AddEmployeeRecordAPI/BindEmployeeAttendance")]
        [HttpGet]
        public HttpResponseMessage BindEmployeeAttendance(Int64 EmployeeID,string Date)
        {
            return ToJson(objAddEmployeeRecordRepository.BindEmployeeAttendance(EmployeeID,Date));
        }
        
        [Route("api/AddEmployeeRecordAPI/BindHRAttendanceDetails")]
        [HttpGet]
        public HttpResponseMessage BindHRAttendanceDetails(Int64 EmployeeId, string forWhichDate)
        {
            return ToJson(objAddEmployeeRecordRepository.BindHRAttendanceDetails(EmployeeId, forWhichDate));
        }
        
        [Route("api/AddEmployeeRecordAPI/GetAttendanceTransaction")]
        [HttpGet]
        public HttpResponseMessage GetAttendanceTransaction(Int64 EmployeeId, string Date,Int64 EntryType)
        {
            return ToJson(objAddEmployeeRecordRepository.GetAttendanceTransaction(EmployeeId, Date,EntryType));
        }
        
        [Route("api/AddEmployeeRecordAPI/GetUpdateEmployeeAttendance")]
        [HttpGet]
        public HttpResponseMessage GetUpdateEmployeeAttendance(Int64 id,Int64 EmployeeId,Int64 EntryType,string Remarks,string entryTime, string Date, Int64 Grace,Int64 LoginId,string ActualEntryTime)
        {
            return ToJson(objAddEmployeeRecordRepository.GetUpdateEmployeeAttendance(id,EmployeeId,EntryType,Remarks,entryTime, Date,Grace,LoginId,ActualEntryTime));
        }
        
        [Route("api/AddEmployeeRecordAPI/AddEmployee")]
        [HttpGet]
        public HttpResponseMessage AddEmployee(Int64 EmployeeId,Int64 EntryType,string Remarks,string entryTime, string Date,string Time,Int64 Grace)
        {
            return ToJson(objAddEmployeeRecordRepository.AddEmployee(EmployeeId,EntryType,Remarks,entryTime,Date,Time,Grace));
        }
    }
}
