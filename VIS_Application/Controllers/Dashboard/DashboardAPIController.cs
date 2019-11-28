using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VIS_Repository;
using VIS_Domain.Dashboard;
using VIS_Repository.Dashboard;
using System.Configuration;

namespace VIS_App.Controllers.Dashboard
{
    public class DashboardAPIController : BaseAPIController
    {
         DashboardRepository objDashboardRepository = null;
        List<MyProfile> EntityList = new List<MyProfile>();
        public DashboardAPIController()
        {

            
        }

        [HttpGet]
        //public HttpResponseMessage GetDashboardDataSets(int UserId, bool IsApproved, string FromDate, string ToDate, bool IsLineManager, DateTime date, int PunchInId)
        public HttpResponseMessage GetDashboardDataSets(int UserId, bool IsApproved, string FromDate, string ToDate, bool IsLineManager, DateTime date, int PunchInId, bool IsAdmin)
        {
            objDashboardRepository = new DashboardRepository(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
            return ToJson(objDashboardRepository.GetDashboardDataSets(UserId, IsApproved, FromDate, ToDate, IsLineManager, date, PunchInId, IsAdmin));
            //return ToJson(objDashboardRepository.procGetDashboardDataSets(UserId, IsApproved, FromDate, ToDate, IsLineManager, date, PunchInId));

        }

        //[HttpGet]
        //public HttpResponseMessage GetProfileInformationForUser(int UserId)
        //{
        //    objDashboardRepository = new DashboardRepository(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
        //    return ToJson(objDashboardRepository.GetProfileInformationForUser(UserId));
        //}

        [HttpGet]
        [Route("api/DashboardAPI/GetMyAttendance")]
        public HttpResponseMessage GetMyAttendance(int Id,string Date)
        {
            objDashboardRepository = new DashboardRepository(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
            return ToJson(objDashboardRepository.GetAttendanceDetail(Id,Date));
        } 


    }
}
