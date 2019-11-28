using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VIS_Domain;
using VIS_Domain.RFQ;

namespace VIS_Repository.RFQ
{
   public class RFQResponseRepository :VISDbCommand
    {
        public RFQResponseRepository(string _connectionstring) : base(_connectionstring) { }

        public List<ActionTakenBy> GetActionTaken(string UserId, bool Access)
        {
            List<ActionTakenBy> objListToReturn = new List<ActionTakenBy>();
            if (objSqlCommand.Connection.ConnectionString == null || objSqlCommand.Connection.ConnectionString == "")
            {
                base.objSqlCommand.Connection.ConnectionString = ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString;
            }
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.Parameters.Clear();
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = ActionTakenByConstatnt.const_Field_GetActionTaken;
                base.objSqlCommand.Parameters.AddWithValue(RFQResponseConstant.const_Field_UserId, UserId);
                base.objSqlCommand.Parameters.AddWithValue(RFQResponseConstant.const_Field_Access, Access);
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<ActionTakenBy>(dt);
            }
            return objListToReturn;
        }

        public HiddenValue GetOnLoadData(string UserId,  long RFQId)
        {
            HiddenValue hdnValue = new HiddenValue();
            try
            {
                string str = string.Empty;
                long Id;
                if (objSqlCommand.Connection.ConnectionString == null || objSqlCommand.Connection.ConnectionString == "")
                {
                    base.objSqlCommand.Connection.ConnectionString = ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString;
                }
                using (base.objSqlCommand.Connection)
                {
                    base.objSqlCommand.Parameters.Clear();
                    base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                    base.objSqlCommand.CommandText = RFQResponseConstant.const_Field_GetEmployeeActionId;
                    base.objSqlCommand.Parameters.AddWithValue(RFQResponseConstant.const_Field_UserId, UserId);
                    base.objSqlCommand.Parameters.AddWithValue(RFQResponseConstant.const_Field_RFQId, RFQId);
                    if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                    {
                        base.objSqlCommand.Connection.Open();
                    }
                    SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                    DataTable dt = new DataTable();
                    da.Fill(dt);
                    Id = Convert.ToInt64(dt.Rows[0][0].ToString());
                    hdnValue.hdnEmployeeId = Id;
                }

                if (objSqlCommand.Connection.ConnectionString == null || objSqlCommand.Connection.ConnectionString == "")
                {
                    base.objSqlCommand.Connection.ConnectionString = ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString;
                }
                using (base.objSqlCommand.Connection)
                {
                    base.objSqlCommand.Parameters.Clear();
                    base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                    base.objSqlCommand.CommandText = RFQResponseConstant.const_Field_GetEmployeeNameById;
                    base.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_Id, Id);
                    if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                    {
                        base.objSqlCommand.Connection.Open();
                    }
                    SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                    DataTable dt = new DataTable();
                    da.Fill(dt);
                    str = dt.Rows[0][0].ToString();
                    hdnValue.hdnEmployee = str;
                }

                return hdnValue;
            }
            catch (Exception ex)
            {

                throw;
            }
            
        }

       

        public void SaveAddResponse(RFQResponse RFQRes, SessionData sessionValue, long RFQId)
        {
            RFQRes.RFQ_InitialID = RFQId;
           
            if (RFQRes.IsEstimateReady == false)
            {
                RFQRes.Technology = GetTechnology(RFQRes.TechnologyIdList).ToString();
                RFQRes.Timeline_Unit = RFQRes.Timeline_Unit.Substring(0, 1);
                RFQRes.Leadtime_Unit = RFQRes.Leadtime_Unit.Substring(0, 1);
            }
            if (RFQRes.IsChangeToAction == true)
            {
                RFQRes.ActionRequestedBy = Convert.ToInt64(RFQRes.hdnEmployeeId);
                RFQRes.ActionByDate = DateTime.ParseExact(RFQRes.ActionByDate.ToString(), "dd/MM/yyyy", CultureInfo.InvariantCulture);
            }
            else
            {
                RFQRes.ActionRequestedBy = Convert.ToInt32(RFQRes.EmpId);
                RFQRes.ActionByDate = DateTime.Now; //DateTime.ParseExact(txtCurrentActionDate.Text.Trim(), "dd/MM/yyyy", CultureInfo.InvariantCulture);
            }
            RFQRes.CreatedBy = sessionValue.SessionId;
            InsertResponse(RFQRes);
            AddToPoints(RFQRes.RFQ_InitialID, RFQRes.IsEstimateReady, RFQRes.CreatedBy, GetMaxResponse());
        }
        public void InsertResponse(RFQResponse entityObject)
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
                objVISDbCommand.objSqlCommand.CommandText = RFQResponseConstant.const_Field_RFQResponse_Add;

                objVISDbCommand.objSqlCommand.Parameters.Clear();
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(RFQResponseConstant.const_Field_RFQ_InitialID, entityObject.RFQ_InitialID);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(RFQResponseConstant.const_Field_IsEstimateReady, entityObject.IsEstimateReady);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(RFQResponseConstant.const_Field_Hours, entityObject.Hours);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(RFQResponseConstant.const_Field_Timeline, entityObject.Timeline);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(RFQResponseConstant.const_Field_Timeline_Unit, entityObject.Timeline_Unit);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(RFQResponseConstant.const_Field_Leadtime, entityObject.Leadtime);

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(RFQResponseConstant.const_Field_Leadtime_Unit, entityObject.Leadtime_Unit);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(RFQResponseConstant.const_Field_Technology, entityObject.Technology);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(RFQResponseConstant.const_Field_Description, entityObject.Description);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(RFQResponseConstant.const_Field_ActionRequestedBy, entityObject.ActionRequestedBy);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(RFQResponseConstant.const_Field_ActionByDate, entityObject.ActionByDate);

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
        //////Helper Method
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
        public void AddToPoints(long iRFQ_InitialID, bool bIsEstimateReady, long iCreatedBy, long iResponeId)
        {
            try
            {
               // EmployeeLevelsBAL levelsBAL = new EmployeeLevelsBAL();
                if (!bIsEstimateReady)
                {
                    AddCriteria(iCreatedBy, "RFQ Response with Estimate", iResponeId.ToString());
                }
                RFQInitialBase rfqInitial = GetRFQDetail(iRFQ_InitialID);
                if (rfqInitial != null)
                {
                    if (DateTime.Now.Date <= rfqInitial.SubmittedOn.Date)
                    {
                        AddCriteria(iCreatedBy, "RFQ Response within Time", iResponeId.ToString());
                    }
                }
            }
            catch (Exception ex)
            {
                
            }
        }
        public void AddCriteria(long iEmpId, string sCriteria, string sData, decimal iRange = 0, bool isTodo = false)
        {
            try
            {
               // EmployeeLevelsBAL levelsBAL = new EmployeeLevelsBAL();
                if (iRange > 0)
                {
                    InsertAutomaticPoints(iEmpId, sCriteria, sData, iRange, false);
                }
                else
                {
                    if (isTodo)
                    {
                        InsertAutomaticPoints(iEmpId,  sCriteria, sData, iRange, true);
                    }
                    else
                    {
                        InsertAutomaticPoints(iEmpId,  sCriteria, sData, 0, false);
                    }
                }
            }
            catch (Exception ex)
            {
                
            }
            finally
            {

            }
        }
        public void InsertAutomaticPoints(long empId ,string criteria ,string forWhichData , decimal rangeCount,bool isTodo )
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
                objVISDbCommand.objSqlCommand.CommandText = AutoPointAddConstant.const_Field_Levels_AutomaticPointsEntry;

                objVISDbCommand.objSqlCommand.Parameters.Clear();
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AutoPointAddConstant.const_Field_empId, empId);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AutoPointAddConstant.const_Field_criteria, criteria);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AutoPointAddConstant.const_Field_forWhichData, forWhichData);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AutoPointAddConstant.const_Field_rangeCount, rangeCount);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AutoPointAddConstant.const_Field_isTodo, isTodo);
                if (objVISDbCommand.objSqlCommand.Connection.State == ConnectionState.Closed)
                {
                    objVISDbCommand.objSqlCommand.Connection.Open();
                }
                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                objSqlCommand.Connection.Close();
            }
            catch (Exception ex) { }

        }
        public long GetMaxResponse()
        {
            try
            {
                long objEntityToReturn;
                using (base.objSqlCommand.Connection)
                {
                    if (objSqlCommand.Connection.ConnectionString == null || objSqlCommand.Connection.ConnectionString == "")
                    {
                        base.objSqlCommand.Connection.ConnectionString = ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString;
                    }
                    base.objSqlCommand.Parameters.Clear();
                    base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                    base.objSqlCommand.CommandText = RFQResponseConstant.const_Field_GetMaxResponseId;

                    if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                    {
                        base.objSqlCommand.Connection.Open();
                    }

                    SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                    DataTable dt = new DataTable();
                    dt.Clear();
                    da.Fill(dt);
                    objEntityToReturn = Convert.ToInt64(dt.Rows[0][0].ToString());
                }
                return objEntityToReturn;
            }
            catch (Exception exc)
            {
                throw;
            }


        }

        public RFQInitialBase GetRFQDetail(long Id)
        {
           
            try
            {
                RFQInitialBase objEntityToReturn = new RFQInitialBase();
                using (base.objSqlCommand.Connection)
                {
                    if (objSqlCommand.Connection.ConnectionString == null || objSqlCommand.Connection.ConnectionString == "")
                    {
                        base.objSqlCommand.Connection.ConnectionString = ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString;
                    }
                    base.objSqlCommand.Parameters.Clear();
                    base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                    base.objSqlCommand.CommandText = RFQResponseConstant.const_Field_GetRFQDetailByRFQInitialId;
                    base.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_Id, Id);
                    if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                    {
                        base.objSqlCommand.Connection.Open();
                    }
                    SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                    DataTable dt = new DataTable();
                    dt.Clear();
                    da.Fill(dt);
                    objEntityToReturn = VISAutoMapper.ConvertDataTable<RFQInitialBase>(dt)[0];
                }
                return objEntityToReturn;
            }
            catch (Exception exc)
            {
                throw;
            }

        }
        public RFQResponse GetViewRFQResponseById(long Id)
        {
            RFQHelperRepository helper = new RFQHelperRepository(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
            try
            {
                RFQResponse objEntityToReturn = new RFQResponse();
                using (base.objSqlCommand.Connection)
                {
                    if (objSqlCommand.Connection.ConnectionString == null || objSqlCommand.Connection.ConnectionString == "")
                    {
                        base.objSqlCommand.Connection.ConnectionString = ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString;
                    }
                    base.objSqlCommand.Parameters.Clear();
                    base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                    base.objSqlCommand.CommandText = RFQResponseConstant.const_Field_GetRFQResponseByResponseId;
                    base.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_Id, Id);
                    if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                    {
                        base.objSqlCommand.Connection.Open();
                    }
                    SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                    DataTable dt = new DataTable();
                    dt.Clear();
                    da.Fill(dt);
                    objEntityToReturn = VISAutoMapper.ConvertDataTable<RFQResponse>(dt)[0];
                }
               
                objEntityToReturn.EmployeeName = helper.GetEmployeeNameById(objEntityToReturn.ActionRequestedBy);
                string[] str = objEntityToReturn.Technology.Split(',');
                objEntityToReturn.Technology = string.Empty;
                foreach (var item in str)
                {
                    objEntityToReturn.Technology = objEntityToReturn.Technology+ ',' + helper.GetTechnology(item);
                }
              
                objEntityToReturn.Technology.Remove(0, 1);
               // objEntityToReturn.Technology = helper.GetTechnology(str);
                return objEntityToReturn;
            }
            catch (Exception exc)
            {
                throw;
            }

        }


    }
}
