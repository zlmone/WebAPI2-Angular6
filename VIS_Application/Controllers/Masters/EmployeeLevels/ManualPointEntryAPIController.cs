using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Http;
using System.Net.Mail;
using System.Text;
using System.Web.Http;
using VIS_App.Helper;
using VIS_Domain.Dashboard;
using VIS_Domain.Master.EmployeeManualPointEntry;
using VIS_Domain.Masters.EmployeeLevelCriteriaSetup;
using VIS_Domain.Masters.EmployeeLevels;
using VIS_Repository.Masters.EmployeeLevels;


namespace VIS_App.Controllers.Masters.EmployeeLevels
{
    public class ManualPointEntryAPIController : BaseAPIController
    {
        static string sEmployeeName;

        ManualPointEntryRepository objManualPointEntryRepository = null;
        LevelCriteriaSetupRepository levelCriteriaSetupRepository = null;
        LevelCriteriaRepository objLevelcriteria = null;

        List<ManualPointEntry> EntityList = new List<ManualPointEntry>();


        public ManualPointEntryAPIController()
        {
            objManualPointEntryRepository = new ManualPointEntryRepository(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
            levelCriteriaSetupRepository = new LevelCriteriaSetupRepository(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
            objLevelcriteria = new LevelCriteriaRepository(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
        }

        [HttpGet]
        [Route("API/ManualPointEntryAPI/GetCategory")]
        public HttpResponseMessage GetCategory()
        {
            return ToJson(objManualPointEntryRepository.GetCategory().AsEnumerable());
        }

        [HttpGet]
        [Route("API/ManualPointEntryAPI/GetCriteria")]
        public HttpResponseMessage GetCriteria()
        {
            return ToJson(objManualPointEntryRepository.GetCriteria().AsEnumerable());
        }
        //GetDataByCriteria
        [HttpGet]
        [Route("API/ManualPointEntryAPI/GetDataByCriteria")]
        public HttpResponseMessage GetDataByCriteria(int CriteriaId)
        {
            return ToJson(objManualPointEntryRepository.GetDataByCriteriaId(CriteriaId));
        }

        public HttpResponseMessage Get()
        {
            return ToJson(objManualPointEntryRepository.GetEntityList().AsEnumerable());
        }

        [HttpGet]
        [Route("API/ManualPointEntryAPI/GetEmployeeList")]
        public HttpResponseMessage GetEmployeeList()
        {
            return ToJson(objManualPointEntryRepository.GetEmployeeList());
        }
        public HttpResponseMessage Post([FromBody]ManualPointEntry value)
        {
            bool IsEmployee = GetEmployee(value.EmpName);
            if (IsEmployee)
            {
                return ToJson(ManualPointEntryForEmployee(value));
            }
            else
            {
                return ToJson("Employee not Exist");
            }


           // return ToJson(objManualPointEntryRepository.AddEntity(value));
        }

        [HttpPut]
        public HttpResponseMessage UpdateEntity(Int64 id, [FromBody]ManualPointEntry value)
        {
            return ToJson(objManualPointEntryRepository.UpdateEntity(value));
        }


        [HttpDelete]
        public HttpResponseMessage DeleteEntity(Int64 Id)
        {
            return ToJson(objManualPointEntryRepository.DeleteEntity(Id));
        }

        public bool GetEmployee(string SelectedEmployee)
        {
            bool bIsEmployee = true;
            string[] sTagArr = SelectedEmployee.Split(',');
            for (int iIndex = 1; iIndex < sTagArr.Length; iIndex++)
            {
                var employee = objManualPointEntryRepository.GetEmployeeById(Convert.ToInt32(sTagArr[iIndex]));
                if (employee == null)
                {
                    bIsEmployee = false;
                    sEmployeeName += sTagArr[iIndex] + ",";
                }
            }

            return bIsEmployee;
        }

        string ManualPointEntryForEmployee(ManualPointEntry manualPointEntry)
        {
            string ReturnStr = string.Empty;
            
            string[] sSelectedTags = manualPointEntry.EmpName.Split(',');
            if (sSelectedTags.Length - 1 != 0)
            {
                int CriteriaId = Convert.ToInt32(manualPointEntry.Criteria);
                int iPoint = 0;
                if (CriteriaId > 0)
                {
                    LevelCriteriaSetup criteriaSetup = levelCriteriaSetupRepository.GetLevelCriteriaSetupByCriteriaId(CriteriaId);
                    if (criteriaSetup != null)
                    {
                        LevelCriteria criteria = objLevelcriteria.GetCriteriaDetails(criteriaSetup.CriteriaID);
                        if (criteria != null)
                        {
                            criteria.CategoryID = Convert.ToInt32(manualPointEntry.CategoryId);
                            objLevelcriteria.AddEntity(criteria);
                        }
                        iPoint = criteriaSetup.Point;
                    }
                }

                int iGroupId = GetMaxGroupId();
                for (int iIndex = 1; iIndex < sSelectedTags.Length; iIndex++)
                {
                  //  employee = empMasterBAL.GetEmployeeByName(sSelectedTags[iIndex]);
                    var employee = objManualPointEntryRepository.GetEmployeeById(Convert.ToInt32(sSelectedTags[iIndex]));
                    if (employee != null)
                    {
                        LevelsPointLog points = new LevelsPointLog(); 
                        //points = levelsBAL.CreatePointsLog();
                        points.EmployeeID = employee.Id;
                        points.SetupID = Convert.ToInt64(manualPointEntry.Criteria);
                        points.Date = manualPointEntry.ForDate;
                        points.Points = iPoint;
                        points.GroupID = iGroupId;
                        points.Remarks = manualPointEntry.Remarks;
                        points.IsActive = true;
                        //levelsBAL.SaveLevelsPointsLog(points);
                        ReturnStr = objManualPointEntryRepository.SaveLevelsPointLog(points);

                        try
                        {  
                             //SendEmailAlert(points.EmployeeID, points.SetupID, points.Points, points.Remarks);
                        }
                        catch (Exception ex)
                        {
                           // Common.CommonFunction.writeError(ex);
                        }
                    }
                }
                //Response.Redirect("LevelManualPointsEntryList.aspx");
                //Server.Transfer("LevelManualPointsEntryList.aspx");

            }
            return ReturnStr;


        }

        int GetMaxGroupId()
        {

           return Convert.ToInt32(objManualPointEntryRepository.GetMaxGroupId());
              
        }

        //public void SendEmailAlert(long iEmployeeId, long iSetupId, int iPoint, string sRemarks)
        //{
        //    // EmployeeLevelsBAL levelsBAL = new EmployeeLevelsBAL();
         
        //    string sCriteriaName = objManualPointEntryRepository.GetCriteriaFromSetupId(iSetupId);
        //    //if(pointLog != null)
        //    {
        //        string sSubject = "VIS Point System: Manual Points Entry";
        //        MailAddress toMail = null;
        //        StringBuilder sb = new StringBuilder();
        //        EmployeeData empMaster = new EmployeeData();
        //        empMaster = objManualPointEntryRepository.GetEmployeeByIdForMail(iEmployeeId);
        //        if (empMaster != null)
        //        {
        //            toMail = new MailAddress(empMaster.Email);
        //            sb = new StringBuilder();
        //            sb.Append("<html><head></head><body>");
        //            sb.Append("<table>");

        //            sb.Append("<tr>");
        //            sb.Append("<td colspan=2> Dear " + empMaster.Employee_Name + ",</td>");
        //            sb.Append("</tr>");
        //            sb.Append("<tr>");
        //            sb.Append("<td>&nbsp;</td>");
        //            sb.Append("</tr>");

        //            if (iPoint > 0)
        //            {
        //                sb.Append("<tr>");
        //                sb.Append("<td colspan=2> <b>Congratulations!!!</b> You just received an appreciation. The details are as follows:");
        //                sb.Append("</td>");
        //                sb.Append("</tr>");
        //            }
        //            else
        //            {
        //                sb.Append("<tr>");
        //                sb.Append("<td colspan=2> Sorry you have just received a debit entry. The details are as follows:");
        //                sb.Append("</td>");
        //                sb.Append("</tr>");
        //            }

        //            sb.Append("<tr>");
        //            sb.Append("<td>&nbsp;");
        //            sb.Append("</td>");
        //            sb.Append("</tr>");

        //            sb.Append("<tr>");
        //            sb.Append("<td colspan=2><b><u>Details</u></b></td>");
        //            sb.Append("</tr>");

        //            //sb.Append("<tr>");
        //            //sb.Append("<td>&nbsp;");
        //            //sb.Append("</td>");
        //            //sb.Append("</tr>");

        //            sb.Append("<tr>");
        //            sb.Append("<td>");

        //            sb.Append("<table border='0'>");

        //            sb.Append("<tr>");
        //            sb.Append("<td> Criteria </td>");
        //            sb.Append("<td> : </td>");
        //            sb.Append("<td>" + sCriteriaName + "</td>");
        //            sb.Append("</tr>");

        //            sb.Append("<tr>");
        //            sb.Append("<td> Points </td>");
        //            sb.Append("<td> : </td>");
        //            sb.Append("<td>" + iPoint + "</td>");
        //            sb.Append("</tr>");

        //            sb.Append("<tr>");
        //            sb.Append("<td> Remarks </td>");
        //            sb.Append("<td> : </td>");
        //            sb.Append("<td>" + sRemarks + "</td>");
        //            sb.Append("</tr>");

        //            sb.Append("</td>");
        //            sb.Append("</tr>");
        //            sb.Append("</table>");

        //            sb.Append("<tr>");
        //            sb.Append("<td>&nbsp;</td>");
        //            sb.Append("</tr>");
        //            if (iPoint < 0)
        //            {
        //                sb.Append("<tr>");
        //                sb.Append("<td colspan=2> <i>In case you still need further information feel free to contact Group Head. </i></td>");
        //                sb.Append("</tr>");
        //                sb.Append("<tr>");
        //                sb.Append("<td>&nbsp;</td>");
        //                sb.Append("</tr>");
        //            }
        //            sb.Append("<tr>");
        //            sb.Append("<td><b>Regards,</b></td>");
        //            sb.Append("</tr>");
        //            //sb.Append("<tr>");
        //            //sb.Append("<td>&nbsp;</td>");
        //            //sb.Append("</tr>");
        //            sb.Append("<tr>");
        //            sb.Append("<td><b>VIS Team</b></td>");
        //            sb.Append("</tr>");

        //            sb.Append("</table>");
        //            sb.Append("<table>");
        //            sb.Append("<tr>");
        //            sb.Append("<td>&nbsp;</td>");
        //            sb.Append("</tr>");
        //            sb.Append("<tr>");
        //            sb.Append("<hr> <font size=1> <i> <p> Do not reply to this email. This is a system generated email and in order to reply please login into the system. <br><br> Disclaimer: ******************** <br><br> You have received this notification because you have either subscribed to it, or are involved in it. To change your preferred email notification preferences, please contact HR. To further process the message the please login into your account at : <a href=http://vis.vervesys.com> http://vis.vervesys.com </a> <br><br> Please note that any views or opinions presented in this email are solely those of the author and do not necessarily represent those of the company. The recipient should check this email and any attachments for the presence of viruses. The company accepts no liability for any damage caused by any virus transmitted by this email. If you do not wish to be contacted further by email, please send email to <a href=mailto:verve@vervesys.com> verve@vervesys.com </a> </p> </i> </font>");

        //            sb.Append("</table></body>");
        //            sb.Append("</html>");

        //            try
        //            {
        //                //CommonLogic.SendMailWithAttachment(toMail, null, null, sb.ToString(), sSubject, null);
        //                MailInbox.SendMailWithAttachment(false, Convert.ToInt32(MailInbox.EmailCategory.Miscellaneous), toMail, null, null, sb.ToString(), sSubject, null);
        //            }
        //            catch (Exception ex)
        //            {
        //                CommonFunction.writeError(ex);
        //            }
        //        }
        //    }
        //}
    }
}