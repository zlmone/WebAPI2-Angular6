using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.UI.WebControls;
using VIS_Domain;
using VIS_Domain.GeneralHelper;
using VIS_Domain.Master.EmployeeManualPointEntry;
using VIS_Domain.RFQ;

namespace VIS_Repository.RFQ
{
    public class RFQRepository : VISDbCommand
    {


        public RFQRepository(string _connectionstring) : base(_connectionstring) { }
        public IEnumerable<RFQList> GetEntityList(long EmpId, string Mode)
        {

            List<RFQList> objListToReturn = new List<RFQList>();
            try
            {
                using (base.objSqlCommand.Connection)
                {
                    base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                    base.objSqlCommand.CommandText = RFQConstants.const_Field_RFQEstimateList;
                    base.objSqlCommand.Parameters.AddWithValue(RFQConstants.const_Field_EmpId, EmpId);
                    base.objSqlCommand.Parameters.AddWithValue(RFQConstants.const_Field_Mode, Mode);
                    if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                    {
                        base.objSqlCommand.Connection.Open();
                    }
                    SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                    DataTable dt = new DataTable();
                    da.Fill(dt);
                    objListToReturn = VISAutoMapper.ConvertDataTable<RFQList>(dt);
                }
            }
            catch (Exception ex)
            {

            }
            return objListToReturn;

        }

        public IEnumerable<RFQInitial> FillBusinessHead()
        {

            List<RFQInitial> objListToReturn = new List<RFQInitial>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = RFQConstants.const_Field_FillBusinessHead;
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<RFQInitial>(dt);
            }
            return objListToReturn;

        }

        public IEnumerable<RFQInitial> FillBusinessManager(long EmpId)
        {
            List<RFQInitial> objListToReturn = new List<RFQInitial>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = RFQConstants.const_Field_GetBusinessManager;
                base.objSqlCommand.Parameters.AddWithValue(RFQConstants.const_Field_EmpId, EmpId);
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<RFQInitial>(dt);
            }
            return objListToReturn;
        }

        public IEnumerable<RFQInitial> GetBusinessType()
        {

            List<RFQInitial> objListToReturn = new List<RFQInitial>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = RFQConstants.const_Field_GetBusinessType;
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<RFQInitial>(dt);
            }
            return objListToReturn;

        }

        public IEnumerable<RFQInitial> GetProjectType()
        {

            List<RFQInitial> objListToReturn = new List<RFQInitial>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = RFQConstants.const_Field_GetProjectType;
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<RFQInitial>(dt);
            }
            return objListToReturn;

        }
        public IEnumerable<RFQInitial> GetIndustries()
        {

            List<RFQInitial> objListToReturn = new List<RFQInitial>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = RFQConstants.const_Field_GetIndustries;
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<RFQInitial>(dt);
            }
            return objListToReturn;

        }
        public IEnumerable<RFQInitial> GetSolution()
        {

            List<RFQInitial> objListToReturn = new List<RFQInitial>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = RFQConstants.const_Field_GetSolution;
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<RFQInitial>(dt);
            }
            return objListToReturn;

        }
        public IEnumerable<RFQInitial> GetServiceOffering()
        {

            List<RFQInitial> objListToReturn = new List<RFQInitial>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = RFQConstants.const_Field_GetServiceOffering;
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<RFQInitial>(dt);
            }
            return objListToReturn;

        }

        public IEnumerable<RFQInitial> GetFileType()
        {

            List<RFQInitial> objListToReturn = new List<RFQInitial>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = RFQConstants.const_Field_GetFileType;
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<RFQInitial>(dt);
            }
            return objListToReturn;

        }
        public IEnumerable<RFQInitial> GetAuthor()
        {

            List<RFQInitial> objListToReturn = new List<RFQInitial>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = RFQConstants.const_Field_GetAuthor;
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<RFQInitial>(dt);
            }
            return objListToReturn;

        }

        public IEnumerable<RFQInitial> GetTechnology()
        {

            List<RFQInitial> objListToReturn = new List<RFQInitial>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = RFQConstants.const_Field_Technology;
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<RFQInitial>(dt);
            }
            return objListToReturn;

        }
        public IEnumerable<RFQInitial> GetEmployee()
        {

            List<RFQInitial> objListToReturn = new List<RFQInitial>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = RFQConstants.const_Field_GetEmployee;
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<RFQInitial>(dt);
            }
            return objListToReturn;

        }
        public IEnumerable<RFQInitial> GetRFQStatus()
        {

            List<RFQInitial> objListToReturn = new List<RFQInitial>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = RFQConstants.const_Field_GetRFQStatus;
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<RFQInitial>(dt);
            }
            return objListToReturn;

        }
        public Boolean RFQInitial(RFQInitial mainRFQ)
        {
            try
            {
                InsertOpportunity(mainRFQ);

                RFQInitialBase RFQBase = new RFQInitialBase();
                RFQInitial rfqInitial = new RFQInitial();
                DateTime DateGet;
                RFQBase.CreatedBy = 0; //Convert.ToInt32(Session["EmpId"].ToString());
                                       //  RFQBase.CreatedOn = DateTime.Parse(DateTime.Now.ToString());
                RFQBase.IsActive = true;
                RFQBase.OpportunityID = Convert.ToInt32(GetMaxOpportunity());
                DateTime.TryParseExact(mainRFQ.ResponseRequiredBy.ToString().Trim(), "dd/MM/yyyy", CultureInfo.InvariantCulture, DateTimeStyles.AssumeLocal, out DateGet);
                //saurabh  RFQBase.SubmittedOn = DateGet;
                RFQBase.SubmittedOn = DateTime.Now;
                //if (CheckListBox(cbWatchBy) == true)
                //    RFQBase.WatchBy = GetListBoxID(cbWatchBy).ToString();

                RFQBase.ResponseRequired = "1";
                if (mainRFQ.UserIdList != null)
                {
                    RFQBase.WatchBy = GetUser(mainRFQ.UserIdList);
                }
                if (rfqInitial.Source != null && rfqInitial.Title != "")
                    // Add source ddl data RFQBase.Source = Convert.ToInt32(ddlSource.SelectedItem.Value);
                    //if (CheckListBox(cbResReq) == true)
                    //    RFQBase.ResReq = GetListBoxID(cbResReq).ToString();
                    RFQBase.ResponseRequired = "1";
                if (rfqInitial.StatusId != 0)
                    RFQBase.Status = rfqInitial.StatusId;

                InsertRFQInitail(RFQBase);
                return true;
            }
            catch (Exception ex)
            {
                return false;
              
            }
           


        }

        public void RFQDoc(List<RFQDoc> rfqDoc, SessionData session)
        {
            RFQHelperRepository objHelper = new RFQHelperRepository(base.DatabaseConnection.ConnectionString);
            RFQDoc objDoc = new RFQDoc();
            foreach (var rfq in rfqDoc)
            {
                objDoc.ReferenceID = Convert.ToInt64(objHelper.GetMaxRFQInitialId());
                objDoc.FileTypeID = Convert.ToInt64(objHelper.GetFileType(rfq.FileType));
                objDoc.AuthorId = Convert.ToInt64(objHelper.GetAuther(rfq.Author));
                objDoc.OriginalFileName = null;
                objDoc.IsResponse = false;
                objDoc.FileName = rfq.FileName;
                objDoc.Remark = rfq.RemarkDoc;
                objDoc.CreatedBy = session.SessionId;
                objDoc.CreatedOn = DateTime.Now;
                objDoc.IsActive = true;
                InsertRFQDoc(objDoc);

            }
        }
        public void InsertRFQDoc(RFQDoc entityObject)
        {
            try
            {
                if (objSqlCommand.Connection.ConnectionString == null || objSqlCommand.Connection.ConnectionString == "")
                {
                    base.objSqlCommand.Connection.ConnectionString = ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString;
                }


                int intAffectedRecords;
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = RFQConstants.const_Field_procRFQDocument_Add;


                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(RFQDocConstant.const_Field_ReferenceID, entityObject.ReferenceID);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(RFQDocConstant.const_Field_OriginalFileName, entityObject.OriginalFileName);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(RFQDocConstant.const_Field_FileName, entityObject.FileName);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(RFQDocConstant.const_Field_FileTypeID, entityObject.FileTypeID);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(RFQDocConstant.const_Field_AuthorId, entityObject.AuthorId);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(RFQDocConstant.const_Field_Remark, entityObject.Remark);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(RFQDocConstant.const_Field_IsResponse, entityObject.IsResponse);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_CreatedBy, entityObject.CreatedBy);
                if (objVISDbCommand.objSqlCommand.Connection.State == ConnectionState.Closed)
                {
                    objVISDbCommand.objSqlCommand.Connection.Open();
                }
                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                objSqlCommand.Connection.Close();
            }
            catch (Exception ex) { }

        }
        public void RFQLink(List<RFQLink> RFQLink, SessionData session)
        {
            RFQLink objLink = new RFQLink();
            foreach (var rfq in RFQLink)
            {
                RFQHelperRepository objHelper = new RFQHelperRepository(base.DatabaseConnection.ConnectionString);
                objLink.ReferenceID = Convert.ToInt64(objHelper.GetMaxRFQInitialId());
                objLink.URL = rfq.URL;
                objLink.UserId = rfq.UserId;
                objLink.Password = rfq.Password;
                objLink.Remark = rfq.RemarkLink;
                objLink.CreatedBy = session.SessionId;
                objLink.IsResponse = false;

                InsertRFQLink(objLink);
            }
        }
        public void InsertRFQLink(RFQLink entityObject)
        {
            try
            {
                if (objSqlCommand.Connection.ConnectionString == null || objSqlCommand.Connection.ConnectionString == "")
                {
                    base.objSqlCommand.Connection.ConnectionString = ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString;
                }
                int intAffectedRecords;
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = RFQLinkConstant.const_Field_RFQLink_Add;
                
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(RFQLinkConstant.const_Field_ReferenceID, entityObject.ReferenceID);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(RFQLinkConstant.const_Field_URL, entityObject.URL);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(RFQLinkConstant.const_Field_UserId, entityObject.UserId);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(RFQLinkConstant.const_Field_Password, entityObject.Password);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(RFQLinkConstant.const_Field_Remark, entityObject.Remark);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(RFQLinkConstant.const_Field_IsResponse, entityObject.IsResponse);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_CreatedBy, entityObject.CreatedBy);
                if (objVISDbCommand.objSqlCommand.Connection.State == ConnectionState.Closed)
                {
                    objVISDbCommand.objSqlCommand.Connection.Open();
                }
                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                objSqlCommand.Connection.Close();
            }
            catch (Exception ex) { }
        }

        /// <summary>
        /// helper
        /// </summary>
        /// 
        public void InsertRFQInitail(RFQInitialBase entityObject)
        {
            try
            {
                if (objSqlCommand.Connection.ConnectionString == null || objSqlCommand.Connection.ConnectionString == "")
                {
                    base.objSqlCommand.Connection.ConnectionString = ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString;
                }


                int intAffectedRecords;
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = RFQInitialBaseConstant.const_Field_RFQInitial_Add;

                
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(RFQInitialBaseConstant.const_Field_OpportunityID, entityObject.OpportunityID);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(RFQInitialBaseConstant.const_Field_SubmittedOn, entityObject.SubmittedOn);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(RFQInitialBaseConstant.const_Field_WatchBy, entityObject.WatchBy);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(RFQInitialBaseConstant.const_Field_ResReq, entityObject.ResponseRequired);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(RFQInitialBaseConstant.const_Field_Source, entityObject.Source);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(RFQInitialBaseConstant.const_Field_Status, entityObject.Status);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_CreatedBy, entityObject.CreatedBy);

                if (objVISDbCommand.objSqlCommand.Connection.State == ConnectionState.Closed)
                {
                    objVISDbCommand.objSqlCommand.Connection.Open();
                }
                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                objSqlCommand.Connection.Close();
            }
            catch (Exception ex) { }
            
        }
        public void InsertOpportunity(RFQInitial rfqInitial)
        {

            RFQOpportunity RFQop = new RFQOpportunity();
            RFQInitial RFQ = new RFQInitial();
            if (rfqInitial.BusinessHeadId == 0)
                RFQop.BDHead = 0;
            else
                RFQop.BDHead = Convert.ToInt64(rfqInitial.BusinessHeadId);

            if (rfqInitial.BusinessManagerId == 0)
                RFQop.BDManager = 0;
            else
                RFQop.BDManager = Convert.ToInt64(rfqInitial.BusinessManagerId);

            DateTime DateGet;
            //DateTime.TryParseExact(txtInitialDate.Text, "dd/MM/yyyy", CultureInfo.InvariantCulture, DateTimeStyles.AssumeLocal, out DateGet);
            RFQop.DateOfInitiation = DateTime.Now;
            if (!string.IsNullOrEmpty(rfqInitial.ProspectClient))
            {
                RFQop.ProspectId = Convert.ToInt32(GetCompanyId(rfqInitial.ProspectClient.Trim()));
                RFQop.BillingClient = RFQop.ProspectId;
            }
            else
            {
                RFQop.ProspectId = 0;
                RFQop.BillingClient = 0;
            }
            if (rfqInitial.BusinessTypeId == 0)
                RFQop.BussinessType = 0;
            else
                RFQop.BussinessType = Convert.ToInt32(rfqInitial.BusinessTypeId);
            RFQop.BussTechArea = 0;
            if (rfqInitial.Title == "")
                RFQop.OpportunityName = " ";
            else
                RFQop.OpportunityName = rfqInitial.Title;

            if (rfqInitial.ProjectTypeId == 0)
                RFQop.ProjectType = 0;
            else
                RFQop.ProjectType = Convert.ToInt32(rfqInitial.ProjectTypeId);

            if (rfqInitial.IndustryId == 0)
                RFQop.Industry = 0;
            else
                RFQop.Industry = Convert.ToInt32(rfqInitial.IndustryId);

            if (rfqInitial.ServiceOfferingId == 0)
                RFQop.serviceOffering = 0;
            else
                RFQop.serviceOffering = Convert.ToInt32(rfqInitial.ServiceOfferingId);

            if (rfqInitial.SolutionId == 0)
                RFQop.Solution = 0;
            else
                RFQop.Solution = Convert.ToInt32(rfqInitial.SolutionId);

            RFQop.TechBody = 0;
            if (rfqInitial.ResponseRequiredFrom == 0)
                RFQop.EstimationDoneBy = 0;
            else
                RFQop.EstimationDoneBy = Convert.ToInt32(rfqInitial.ResponseRequiredFrom);

            // RFQop.ExactTech = GetListBoxID(cbTechnology).ToString();
            RFQop.ExactTech = GetTechnology(rfqInitial.TechnologyIdList);

            RFQop.NextCallDate = Convert.ToDateTime("01/01/1900");
            RFQop.TentativeOppClosureDate = Convert.ToDateTime("01/01/1900");
            /*RFQop.TentativeStartDate = DateTime.ParseExact(rfqInitial.ExpectedClosureDate.ToString(), "MM/dd/yyyy", CultureInfo.InvariantCulture);*/ //Convert.ToDateTime("01/01/1900");
            RFQop.TentativeStartDate = rfqInitial.ExpectedClosureDate;
            RFQop.TentativeEndDate = Convert.ToDateTime("01/01/1900");

            RFQop.ExpectedNoResource = 0;
            RFQop.Duration = "/0";
            RFQop.TotalProjectHrs = 0;
            RFQop.Currency = 0;
            RFQop.Rate = Convert.ToDouble(0);
            RFQop.TotalValue = 0;

            RFQop.TimeTakenEstimate = "/0";
            if (rfqInitial.ConfidenceLevel == 0)
                RFQop.Confidence = "0";
            else
                RFQop.Confidence = (rfqInitial.ConfidenceLevel).ToString();

            RFQop.IsProject = false;

            //    RFQop.Status = ddlStatus.SelectedItem.Text.Trim();
            RFQop.Status = rfqInitial.StatusId.ToString();
            RFQop.PlaningPriority = Convert.ToDouble(0.50);

            DateTime.TryParseExact(rfqInitial.ExpectedClosureDate.ToString(), "dd/MM/yyyy", CultureInfo.InvariantCulture, DateTimeStyles.AssumeLocal, out DateGet);
            RFQop.ClosureDate = DateTime.Now;
            if (rfqInitial.Remark == null) { RFQop.OtherComments = ""; }
            else { RFQop.OtherComments = rfqInitial.Remark.Trim(); }
            
            RFQop.CreatedName = 0;
            RFQop.CreatedOn = DateTime.Now;
            RFQop.IsDeleted = false;
            SaveOpportunity(RFQop);

        }

        public string GetMaxOpportunity()
        {
            try
            {
                string objEntityToReturn = string.Empty;
                using (base.objSqlCommand.Connection)
                {
                    if (objSqlCommand.Connection.ConnectionString == null || objSqlCommand.Connection.ConnectionString == "")
                    {
                        base.objSqlCommand.Connection.ConnectionString = ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString;
                    }
                    base.objSqlCommand.Parameters.Clear();
                    base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                    base.objSqlCommand.CommandText = RFQInitialBaseConstant.const_Field_GetMaxOpportunityId;
                   
                    if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                    {
                        base.objSqlCommand.Connection.Open();
                    }

                    SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                    DataTable dt = new DataTable();
                    dt.Clear();
                    da.Fill(dt);
                    objEntityToReturn = dt.Rows[0][0].ToString();
                }
                return objEntityToReturn;
            }
            catch (Exception exc)
            {
                return "";
            }

         
        }

        public string GetTechnology(List<long> tech)
        {
            string ReturnObj = string.Empty;
            foreach (var item in tech)
            {
                if (item != 0)
                {
                    ReturnObj = ReturnObj + item.ToString() + ',';
                }

            }

            return ReturnObj;
        }
        public string GetUser(List<long> user)
        {
            string ReturnObj = string.Empty;
            foreach (var item in user)
            {
                if (item != 0)
                {
                    ReturnObj = ReturnObj + item.ToString() + ',';
                }

            }

            return ReturnObj;
        }
        public string SaveOpportunity(RFQOpportunity entityObject)
        {
            try
            {
                if (objSqlCommand.Connection.ConnectionString == null || objSqlCommand.Connection.ConnectionString == "")
                {
                    base.objSqlCommand.Connection.ConnectionString = ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString;
                }


                int intAffectedRecords;
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = RFQOpportunityConstant.const_Field_SaveOpportunity;

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(RFQOpportunityConstant.const_Field_Solution, entityObject.Solution);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(RFQOpportunityConstant.const_Field_BDHead, entityObject.BDHead);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(RFQOpportunityConstant.const_Field_BDManager, entityObject.BDManager);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(RFQOpportunityConstant.const_Field_DateOfInitiation, entityObject.DateOfInitiation);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(RFQOpportunityConstant.const_Field_ProspectId, entityObject.ProspectId);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(RFQOpportunityConstant.const_Field_BillingClient, entityObject.BillingClient);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(RFQOpportunityConstant.const_Field_BussinessType, entityObject.BussinessType);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(RFQOpportunityConstant.const_Field_BussTechArea, entityObject.BussTechArea);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(RFQOpportunityConstant.const_Field_OpportunityName, entityObject.OpportunityName);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(RFQOpportunityConstant.const_Field_ProjectType, entityObject.ProjectType);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(RFQOpportunityConstant.const_Field_Industry, entityObject.Industry);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(RFQOpportunityConstant.const_Field_serviceOffering, entityObject.serviceOffering);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(RFQOpportunityConstant.const_Field_TechBody, entityObject.TechBody);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(RFQOpportunityConstant.const_Field_EstimationDoneBy, entityObject.EstimationDoneBy);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(RFQOpportunityConstant.const_Field_ExactTech, entityObject.ExactTech);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(RFQOpportunityConstant.const_Field_NextCallDate, entityObject.NextCallDate);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(RFQOpportunityConstant.const_Field_TentativeOppClosureDate, entityObject.TentativeOppClosureDate);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(RFQOpportunityConstant.const_Field_TentativeStartDate, entityObject.TentativeStartDate);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(RFQOpportunityConstant.const_Field_TentativeEndDate, entityObject.TentativeEndDate);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(RFQOpportunityConstant.const_Field_ExpectedNoResource, entityObject.ExpectedNoResource);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(RFQOpportunityConstant.const_Field_Duration, entityObject.Duration);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(RFQOpportunityConstant.const_Field_TotalProjectHrs, entityObject.TotalProjectHrs);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(RFQOpportunityConstant.const_Field_Currency, entityObject.Currency);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(RFQOpportunityConstant.const_Field_Rate, entityObject.Rate);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(RFQOpportunityConstant.const_Field_TotalValue, entityObject.TotalValue);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(RFQOpportunityConstant.const_Field_TimeTakenEstimate, entityObject.TimeTakenEstimate);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(RFQOpportunityConstant.const_Field_Confidence, entityObject.Confidence);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(RFQOpportunityConstant.const_Field_Status, entityObject.Status);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(RFQOpportunityConstant.const_Field_PlaningPriority, entityObject.PlaningPriority);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(RFQOpportunityConstant.const_Field_ClosureDate, entityObject.ClosureDate);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(RFQOpportunityConstant.const_Field_OtherComments, entityObject.OtherComments);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(RFQOpportunityConstant.const_Field_IsProject, entityObject.IsProject);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(RFQOpportunityConstant.const_Field_ProjectId, entityObject.ProjectId);
                //objVISDbCommand.objSqlCommand.Parameters.AddWithValue(RFQOpportunityConstant.const_Field_IsDeleted, entityObject.IsDeleted);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_CreatedBy, entityObject.CreatedBy);
                //if (!objVISDbCommand.objSqlCommand.Parameters.Contains(VISBaseEntityConstants.const_Field_EntityMessage))
                //{
                //    objVISDbCommand.objSqlCommand.Parameters.Add(AddEntityMessageParameter());
                //}

                if (objVISDbCommand.objSqlCommand.Connection.State == ConnectionState.Closed)
                {
                    objVISDbCommand.objSqlCommand.Connection.Open();
                }
                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                objSqlCommand.Connection.Close();
            }
            catch (Exception ex) { }
            return "";
        }

        public string GetCompanyId(string Comapny)
        {
            try
            {
                string objEntityToReturn = string.Empty;
                using (base.objSqlCommand.Connection)
                {
                    if (objSqlCommand.Connection.ConnectionString == null || objSqlCommand.Connection.ConnectionString == "")
                    {
                        base.objSqlCommand.Connection.ConnectionString = ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString;
                    }

                    base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                    base.objSqlCommand.CommandText = RFQConstants.const_Field_GetCompanyByClientProspect;
                    base.objSqlCommand.Parameters.AddWithValue(RFQConstants.const_Field_Company, Comapny);
                    if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                    {
                        base.objSqlCommand.Connection.Open();
                    }

                    SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                    DataTable dt = new DataTable();
                    dt.Clear();
                    da.Fill(dt);
                    objEntityToReturn = dt.Rows[0][0].ToString();
                }
                return objEntityToReturn;
            }
            catch (Exception exc)
            {
                return "";
            }
        }
        
        public List<ProspectClient> GetProspectClient(ProspectClient prospectClient, SessionValues entityObject)
        {
            try
            {
                List<ProspectClient> objListToReturn = new List<ProspectClient>();
                if (objSqlCommand.Connection.ConnectionString == null || objSqlCommand.Connection.ConnectionString == "")
                {
                    base.objSqlCommand.Connection.ConnectionString = ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString;
                }
                using (base.objSqlCommand.Connection)
                {
                    base.objSqlCommand.Parameters.Clear();
                    base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                    base.objSqlCommand.CommandText = ProspectClientConstant.const_Field_GetProspectClientPopUp;
                    base.objSqlCommand.Parameters.AddWithValue(SessionValuesConstant.const_Field_UserType, entityObject.UserType);
                    base.objSqlCommand.Parameters.AddWithValue(ProspectClientConstant.const_Field_FilterRadioButton, prospectClient.FilterRadioButton);
                    base.objSqlCommand.Parameters.AddWithValue(SessionValuesConstant.const_Field_UserId, entityObject.UserId);
                    if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                    {
                        base.objSqlCommand.Connection.Open();
                    }
                    SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                    DataTable dt = new DataTable();
                    da.Fill(dt);
                    objListToReturn = VISAutoMapper.ConvertDataTable<ProspectClient>(dt);
                }
                return objListToReturn;
            }
            catch (Exception ex)
            {

                throw;
            }
           
        }
    }
}
