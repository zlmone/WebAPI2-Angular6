using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VIS_Domain.Masters.EmployeeLevelCriteriaSetup;
using VIS_Domain.Masters.EmployeeLevels;
using VIS_Repository;
using VIS_Repository.Masters.EmployeeLevels;

namespace VIS_App.Controllers.Masters.EmployeeLevels
{
    public class LevelCriteriaSetupAPIController : BaseAPIController
    {
        LevelCriteriaSetupRepository objLevelCriteriaSetupRepository = null;
        VISIBaseRepository<LevelCriteriaSetup> LevelCriteriaSetupRepository;
        List<LevelCriteriaSetup> EntityList = new List<LevelCriteriaSetup>();


        public LevelCriteriaSetupAPIController(VISIBaseRepository<LevelCriteriaSetup> _levelsRepository)
        {
            LevelCriteriaSetupRepository = _levelsRepository;
            objLevelCriteriaSetupRepository = new LevelCriteriaSetupRepository(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
        }

        [HttpGet]
        [Route("api/LevelCriteriaSetupAPI/GetCriteriadll")]
        public HttpResponseMessage GetCriteriadll()
        {
            return ToJson(objLevelCriteriaSetupRepository.GetCriteria().AsEnumerable());
        }

        [HttpGet]
        [Route("api/LevelCriteriaSetupAPI/GetCalculatedOndll")]
        public HttpResponseMessage GetCalculatedOndll()
        {
            return ToJson(objLevelCriteriaSetupRepository.GetCalculatedOn().AsEnumerable());
        }
        [HttpGet]
        [Route("api/LevelCriteriaSetupAPI/GetCategorydll")]
        public HttpResponseMessage GetCategorydll()
        {
            return ToJson(objLevelCriteriaSetupRepository.GetCategory().AsEnumerable());
        }
        [Route("api/LevelCriteriaSetupAPI/getLevelSetupId")]
        public HttpResponseMessage getLevelSetupId(int CriteriaId)
        {
            return ToJson(objLevelCriteriaSetupRepository.GetSetupIdForAchievement(CriteriaId));
        }
        public HttpResponseMessage Get()
        {
            return ToJson(LevelCriteriaSetupRepository.GetEntityList().AsEnumerable());
        }

        public HttpResponseMessage Post([FromBody]LevelCriteriaSetup value)
        {

            DefineLevelCriteriaObject(ref value);
            return ToJson(LevelCriteriaSetupRepository.AddEntity(value));
        }

        [HttpPut]
        public HttpResponseMessage UpdateEntity(Int64 id, [FromBody]LevelCriteriaSetup value)
        {
            DefineLevelCriteriaObject(ref value);
            return ToJson(LevelCriteriaSetupRepository.UpdateEntity(value));
        }

        [HttpDelete]
        public HttpResponseMessage DeleteEntity(Int64 Id)
        {
            return ToJson(LevelCriteriaSetupRepository.DeleteEntity(Id));
        }

        private void DefineLevelCriteriaObject(ref LevelCriteriaSetup levelcriteriasetup)
        {
            if (levelcriteriasetup.ArbCriteriaType == "Automatic")
            {
                levelcriteriasetup.IsAutomatic = true;
                if (levelcriteriasetup.ArbSubType == "Range")
                {
                    levelcriteriasetup.IsRange = true;
                }
                if (levelcriteriasetup.ArbSubType == "Repeated")
                {
                    levelcriteriasetup.IsRepeated = true;
                    levelcriteriasetup.Units = levelcriteriasetup.Units;
                }
                if (levelcriteriasetup.ArbSubType == "Once")
                {
                    levelcriteriasetup.IsOnce = true;
                }
            }
            if (levelcriteriasetup.ArbCriteriaType == "Manual")
            {
                levelcriteriasetup.IsAutomatic = false;
                levelcriteriasetup.AliasName = levelcriteriasetup.Name;
                levelcriteriasetup.CategoryID = Convert.ToInt32(levelcriteriasetup.CategoryID);
                levelcriteriasetup.IsAutomatic = false;
                
                if (levelcriteriasetup.ArbManualType == "PerformanceBased")
                {
                    levelcriteriasetup.IsPerformanceBased = true;
                }
            }

            // start: for edit part 
            //if (lblFromPercent.Visible && lblToPercent.Visible)
            //{
            //    criteriaSetup.IsPercentage = true;
            //}rbtnProgressiveYes.Checked

            if (levelcriteriasetup.ArbIsProgressive=="Yes")
            {
                levelcriteriasetup.IsProgressive = true;
            }
            else 
            {
                levelcriteriasetup.IsProgressive = false;
                levelcriteriasetup.ProgressiveDays = 0;
                levelcriteriasetup.ProgressivePoints = 0;
            }
            if (levelcriteriasetup.ArbCascading == "Yes")
            {
               
                LevelCriteriaSetup CascadingLogEntry = new LevelCriteriaSetup();
                CascadingLogEntry.dtFromDate = DateTime.Now.Date;
                CascadingLogEntry.dtToDate = DateTime.Now.Date;
                CascadingLogEntry.bFromYes = false;
                CascadingLogEntry.bToYes = false;
                CascadingLogEntry.bBothYes = false; 
                CascadingLogEntry.bBothNo = false;
                CascadingLogEntry.Point = levelcriteriasetup.Point;
                CascadingLogEntry.CriteriaID = levelcriteriasetup.CriteriaID;
                if (levelcriteriasetup.dtFromDate != null)
                {
                    CascadingLogEntry.dtFromDate = levelcriteriasetup.dtFromDate;
                }
               
                if (levelcriteriasetup.dtToDate != null)
                {
                    CascadingLogEntry.dtFromDate = levelcriteriasetup.dtToDate;
                }
              
                if (levelcriteriasetup.dtFromDate != null && levelcriteriasetup.dtToDate != null)
                {
                    CascadingLogEntry.bBothYes = true;
                }
                else if (levelcriteriasetup.dtFromDate == null && levelcriteriasetup.dtToDate != null)
                {
                    CascadingLogEntry.bToYes = true;
                }
                else if (levelcriteriasetup.dtFromDate != null && levelcriteriasetup.dtToDate == null)
                {
                    CascadingLogEntry.bFromYes = true;
                }
                else
                {
                    CascadingLogEntry.bBothNo = true;
                }
                //levelsBAL.CascadingEffect();
                objLevelCriteriaSetupRepository.LevelsPointLogEntry(CascadingLogEntry);

            }
            //End : For Edit part
        }

    }
}
