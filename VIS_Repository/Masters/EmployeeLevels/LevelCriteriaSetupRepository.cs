using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VIS_Domain.Masters.EmployeeLevels;
using VIS_Domain.Master;
using VIS_Domain.Master.CompanyRelated;
using VIS_Repository.Masters;
using VIS_Domain;
using VIS_Domain.Masters.EmployeeLevelCriteriaSetup;
using System.Configuration;
using VIS_Domain.Master.EmployeeManualPointEntry;

namespace VIS_Repository.Masters.EmployeeLevels
{
    public class LevelCriteriaSetupRepository : VISDbCommand, VISIBaseRepository<LevelCriteriaSetup>
    {
        public int iSetupID = 0;
        public Int32 intAffectedRecords { get; set; }


        public LevelCriteriaSetupRepository(string _connectionstring) : base(_connectionstring)
        {
        }
        public IEnumerable<LevelCriteriaSetup> GetCriteria()
        {
            List<LevelCriteriaSetup> objListToReturn = new List<LevelCriteriaSetup>();
            VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
            using (objVISDbCommand.objSqlCommand.Connection)
            {
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = LevelCriteriaSetupConstants.const_procLevelCriteriaSetup_ForSelectCriteria;
                if (objVISDbCommand.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    objVISDbCommand.objSqlCommand.Connection.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter(objVISDbCommand.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<LevelCriteriaSetup>(dt);
            }
            return objListToReturn;

        }
        //
        public string GetSetupIdForAchievement(int CriteriaId)
        {
            string i;
             List<Levels_Achievement> objListToReturn = new List<Levels_Achievement>();
            using (base.objSqlCommand.Connection)
            {
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = Levels_AchievementConstants.const_procLevels_Achievement_GetLevelSetupId;
                base.objSqlCommand.Parameters.AddWithValue(Levels_AchievementConstants.const_Field_CriteriaId, CriteriaId);
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                i=dt.Rows[0][0].ToString();
                
            }
            return i;
        }
        public IEnumerable<LevelCriteriaSetup> GetCalculatedOn()
        {
            List<LevelCriteriaSetup> objListToReturn = new List<LevelCriteriaSetup>();
            VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
            using (objVISDbCommand.objSqlCommand.Connection)
            {
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = LevelCriteriaSetupConstants.const_procLevelCriteriaSetup_ForSelectCalculatedOn;
                if (objVISDbCommand.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    objVISDbCommand.objSqlCommand.Connection.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter(objVISDbCommand.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<LevelCriteriaSetup>(dt);
            }
            return objListToReturn;

        }
        public IEnumerable<LevelCriteriaSetup> GetCategory()
        {
            List<LevelCriteriaSetup> objListToReturn = new List<LevelCriteriaSetup>();
            VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
            using (objVISDbCommand.objSqlCommand.Connection)
            {
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = LevelCriteriaSetupConstants.const_procLevelCriteriaSetup_ForSelectCategory;
                if (objVISDbCommand.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    objVISDbCommand.objSqlCommand.Connection.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter(objVISDbCommand.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<LevelCriteriaSetup>(dt);
            }
            return objListToReturn;

        }

        public string DeleteEntity(Int64 Id)
        {
            try
            {
                string UpdatedBy = string.Empty;
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = LevelCriteriaSetupConstants.const_procLevelCriteriaSetup_ActiveInActive;
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_Id, Id);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_UpdatedBy, UpdatedBy);
                if (!objVISDbCommand.objSqlCommand.Parameters.Contains(VISBaseEntityConstants.const_Field_EntityMessage))
                {
                    objVISDbCommand.objSqlCommand.Parameters.Add(AddEntityMessageParameter());
                }

                objVISDbCommand.objSqlCommand.Connection.Open();
                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                objSqlCommand.Connection.Close();
                string strRetValue = intAffectedRecords >= 1 ? VISBaseEntityConstants.const_Result_Success : VISBaseEntityConstants.const_Result_Failure;
                return strRetValue + objVISDbCommand.objSqlCommand.Parameters[VISBaseEntityConstants.const_Field_EntityMessage].Value.ToString();
            }
            catch (Exception ex)
            {
                return ex.Message + Environment.NewLine + ex.StackTrace;
            }

            //try
            //{
            //    string UpdatedBy = string.Empty;
            //    VISDbCommand objVISDbCommand.objSqlCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
            //    objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
            //    objVISDbCommand.objSqlCommand.CommandText = LevelCriteriaSetupConstants.const_procLevelCriteriaSetups_ActiveInActive;
            //    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_Id, Id);
            //    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_UpdatedBy, UpdatedBy);
            //    if (!objVISDbCommand.objSqlCommand.Parameters.Contains(VISBaseEntityConstants.const_Field_EntityMessage))
            //    {
            //        objVISDbCommand.objSqlCommand.Parameters.Add(AddEntityMessageParameter());
            //    }

            //    objVISDbCommand.objSqlCommand.Connection.Open();
            //    intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
            //    objSqlCommand.Connection.Close();
            //    string strRetValue = intAffectedRecords >= 1 ? VISBaseEntityConstants.const_Result_Success : VISBaseEntityConstants.const_Result_Failure; 
            //    return  strRetValue  + objVISDbCommand.objSqlCommand.Parameters[VISBaseEntityConstants.const_Field_EntityMessage].Value.ToString();
            //}
            //catch (Exception ex)
            //{
            //    return ex.Message + Environment.NewLine + ex.StackTrace;
            //}
          
        }

        public LevelCriteriaSetup GetEntityByID(Int64 entityId)
        {
            LevelCriteriaSetup objEntityToReturn = new LevelCriteriaSetup();
            //using (objVISDbCommand.objSqlCommand.Connection)
            //{
            //    objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
            //    objVISDbCommand.objSqlCommand.CommandText = LevelCriteriaSetupConstants.const_procLevelCriteriaSetups_SelectById;
            //    if (objVISDbCommand.objSqlCommand.Connection.State != ConnectionState.Open)
            //    {
            //        objVISDbCommand.objSqlCommand.Connection.Open();
            //    }

            //    SqlDataAdapter da = new SqlDataAdapter(objVISDbCommand.objSqlCommand);
            //    DataTable dt = new DataTable();
            //    da.Fill(dt);
            //    objEntityToReturn = VISAutoMapper.ConvertDataRow<LevelCriteriaSetup>(dt.Rows[0]);
            //}
            //return objEntityToReturn;
            return objEntityToReturn;
        }

        public IEnumerable<LevelCriteriaSetup> GetEntityList()
        {
            List<LevelCriteriaSetup> objListToReturn = new List<LevelCriteriaSetup>();
            VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
            using (objVISDbCommand.objSqlCommand.Connection)
            {
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = LevelCriteriaSetupConstants.const_procLevelCriteriaSetup_SelectAll;
                if (objVISDbCommand.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    objVISDbCommand.objSqlCommand.Connection.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter(objVISDbCommand.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<LevelCriteriaSetup>(dt);
            }
            return objListToReturn;

        }

        public string AddEntity(LevelCriteriaSetup levelcriteriasetup)
        {
            
            
            try
            {
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);

                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = LevelCriteriaSetupConstants.const_procLevelCriteriaSetup_Add;

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(LevelCriteriaSetupConstants.const_Field_CriteriaID, levelcriteriasetup.CriteriaID);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(LevelCriteriaSetupConstants.const_Field_IsRange, levelcriteriasetup.IsRange);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(LevelCriteriaSetupConstants.const_Field_FromLimit, levelcriteriasetup.FromLimit);

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(LevelCriteriaSetupConstants.const_Field_ToLimit, levelcriteriasetup.ToLimit);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(LevelCriteriaSetupConstants.const_Field_IsRepeated, levelcriteriasetup.IsRepeated);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(LevelCriteriaSetupConstants.const_Field_Units, levelcriteriasetup.Units);

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(LevelCriteriaSetupConstants.const_Field_IsOnce, levelcriteriasetup.IsOnce);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(LevelCriteriaSetupConstants.const_Field_IsPerformanceBadge, levelcriteriasetup.IsPerformanceBased);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(LevelCriteriaSetupConstants.const_Field_IsPercentage, levelcriteriasetup.IsPercentage);

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(LevelCriteriaSetupConstants.const_Field_Point, levelcriteriasetup.Point);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(LevelCriteriaSetupConstants.const_Field_Active, levelcriteriasetup.Active);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(LevelCriteriaSetupConstants.const_Field_IsProgressive, levelcriteriasetup.IsProgressive);

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(LevelCriteriaSetupConstants.const_Field_ProgressiveDays, levelcriteriasetup.ProgressiveDays);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(LevelCriteriaSetupConstants.const_Field_ProgressivePoints, levelcriteriasetup.ProgressivePoints);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_CreatedBy, levelcriteriasetup.CreatedBy);

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(LevelCriteriaSetupConstants.const_Field_AliasName, levelcriteriasetup.AliasName);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(LevelCriteriaSetupConstants.const_Field_Name, levelcriteriasetup.Name);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(LevelCriteriaSetupConstants.const_Field_CategoryID, levelcriteriasetup.CategoryID);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(LevelCriteriaSetupConstants.const_Field_IsAutomatic, levelcriteriasetup.IsAutomatic);
                
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(LevelCriteriaSetupConstants.const_Field_reference, levelcriteriasetup.reference);


                if (!objVISDbCommand.objSqlCommand.Parameters.Contains(VISBaseEntityConstants.const_Field_EntityMessage))
                {
                    objVISDbCommand.objSqlCommand.Parameters.Add(AddEntityMessageParameter());
                }
                objVISDbCommand.objSqlCommand.Connection.Open();
                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                objSqlCommand.Connection.Close();
                string strRetValue = intAffectedRecords >= 1 ? VISBaseEntityConstants.const_Result_Success : VISBaseEntityConstants.const_Result_Failure;
                return  strRetValue  + objVISDbCommand.objSqlCommand.Parameters[VISBaseEntityConstants.const_Field_EntityMessage].Value.ToString();
            }
            catch (Exception ex)
            {
                // return ex.Message + Environment.NewLine + ex.StackTrace;
            }


            //SaveLevelCerteriaSetUp(entityObject);

           

            //if (entityObject.rbCSYes == "")
            //{
            //    //bool bFromYes = false, bToYes = false, bBothYes = false, bBothNo = false;
            //    //DateTime dtFromDate = DateTime.Now.Date;
            //    //DateTime dtToDate = DateTime.Now.Date;

            //    //if (txtFromDate.Text != "")
            //    //{
            //    //    dtFromDate = DateTime.Parse(txtFromDate.Text);
            //    //}
            //    //if (txtToDate.Text != "")
            //    //{
            //    //    dtToDate = DateTime.Parse(txtToDate.Text);
            //    //}

            //    //if (txtFromDate.Text != "" && txtToDate.Text != "")
            //    //{
            //    //    bBothYes = true;
            //    //}
            //    //else if (txtFromDate.Text == "" && txtToDate.Text != "")
            //    //{
            //    //    bToYes = true;
            //    //}
            //    //else if (txtFromDate.Text != "" && txtToDate.Text == "")
            //    //{
            //    //    bFromYes = true;
            //    //}
            //    //else
            //    //{
            //    //    bBothNo = true;
            //    //}
            //    //levelsBAL.CascadingEffect(Convert.ToInt32(ddlCriteria.SelectedItem.Value), Convert.ToInt32(txtPoints.Text), dtFromDate, dtToDate, bBothYes, bBothNo, bFromYes, bToYes);
            //}
            return "1";
        }

        public void LevelsPointLogEntry(LevelCriteriaSetup levelcriteriasetup)
        {
            try
            {  
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);

                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = LevelCriteriaSetupConstants.const_procLevelCriteriaSetup_LogEntry;

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(LevelCriteriaSetupConstants.const_Field_CriteriaID, levelcriteriasetup.CriteriaID);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(LevelCriteriaSetupConstants.const_Field_Point, levelcriteriasetup.Point);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(LevelCriteriaSetupConstants.const_Field_FromDate, levelcriteriasetup.dtFromDate);

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(LevelCriteriaSetupConstants.const_Field_ToDate, levelcriteriasetup.dtToDate);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(LevelCriteriaSetupConstants.const_Field_bBothYes, levelcriteriasetup.bBothYes);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(LevelCriteriaSetupConstants.const_Field_bBothNo, levelcriteriasetup.bBothNo);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(LevelCriteriaSetupConstants.const_Field_bFromYes, levelcriteriasetup.bFromYes);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(LevelCriteriaSetupConstants.const_Field_bToYes, levelcriteriasetup.bToYes);

                objVISDbCommand.objSqlCommand.Connection.Open();
                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                objSqlCommand.Connection.Close();
            }
            catch (Exception Ex)
            {

            }

        }

        public string UpdateEntity(LevelCriteriaSetup levelcriteriasetup)
        {
            try
            {
              VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
            objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
            objVISDbCommand.objSqlCommand.CommandText = LevelCriteriaSetupConstants.const_procLevelCriteriaSetup_Update;
            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_Id, levelcriteriasetup.Id);
            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(LevelCriteriaSetupConstants.const_Field_CriteriaID, levelcriteriasetup.CriteriaID);
            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(LevelCriteriaSetupConstants.const_Field_IsRange, levelcriteriasetup.IsRange);
            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(LevelCriteriaSetupConstants.const_Field_FromLimit, levelcriteriasetup.FromLimit);

            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(LevelCriteriaSetupConstants.const_Field_ToLimit, levelcriteriasetup.ToLimit);
            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(LevelCriteriaSetupConstants.const_Field_IsRepeated, levelcriteriasetup.IsRepeated);
            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(LevelCriteriaSetupConstants.const_Field_Units, levelcriteriasetup.Units);

            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(LevelCriteriaSetupConstants.const_Field_IsOnce, levelcriteriasetup.IsOnce);
            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(LevelCriteriaSetupConstants.const_Field_IsPerformanceBadge, levelcriteriasetup.IsPerformanceBased);
            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(LevelCriteriaSetupConstants.const_Field_IsPercentage, levelcriteriasetup.IsPercentage);

            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(LevelCriteriaSetupConstants.const_Field_Point, levelcriteriasetup.Point);
            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(LevelCriteriaSetupConstants.const_Field_Active, levelcriteriasetup.Active);
            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(LevelCriteriaSetupConstants.const_Field_IsProgressive, levelcriteriasetup.IsProgressive);

            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(LevelCriteriaSetupConstants.const_Field_ProgressiveDays, levelcriteriasetup.ProgressiveDays);
            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(LevelCriteriaSetupConstants.const_Field_ProgressivePoints, levelcriteriasetup.ProgressivePoints);
            //objVISDbCommand.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_CreatedBy, levelcriteriasetup.CreatedBy);

            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(LevelCriteriaSetupConstants.const_Field_AliasName, levelcriteriasetup.AliasName);
            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(LevelCriteriaSetupConstants.const_Field_Name, levelcriteriasetup.Name);
            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(LevelCriteriaSetupConstants.const_Field_CategoryID, levelcriteriasetup.CategoryID);
            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(LevelCriteriaSetupConstants.const_Field_IsAutomatic, levelcriteriasetup.IsAutomatic);

            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(LevelCriteriaSetupConstants.const_Field_reference, levelcriteriasetup.reference);
            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_UpdatedBy, levelcriteriasetup.UpdatedBy);

            if (!objVISDbCommand.objSqlCommand.Parameters.Contains(VISBaseEntityConstants.const_Field_EntityMessage))
            {
                objVISDbCommand.objSqlCommand.Parameters.Add(AddEntityMessageParameter());
            }
            objVISDbCommand.objSqlCommand.Connection.Open();
            intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
            objSqlCommand.Connection.Close();
            string strRetValue = intAffectedRecords >= 1 ? VISBaseEntityConstants.const_Result_Success : VISBaseEntityConstants.const_Result_Failure;
            return strRetValue + objVISDbCommand.objSqlCommand.Parameters[VISBaseEntityConstants.const_Field_EntityMessage].Value.ToString();
               
            }
            catch (Exception ex)
            {
                return "error";
            }
}

        public LevelCriteriaSetup GetLevelCriteriaSetupByCriteriaId(int CriteriaId)
        {
            LevelCriteriaSetup objEntityToReturn = new LevelCriteriaSetup();

            using (base.objSqlCommand.Connection)
            {
                if (objSqlCommand.Connection.ConnectionString == null || objSqlCommand.Connection.ConnectionString == "")
                {
                    base.objSqlCommand.Connection.ConnectionString = ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString;
                }
                base.objSqlCommand.Parameters.Clear();
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = ManualPointEntryConstants.const_procManualPointEntry_GetLevelCriteriaSetupByCriteriaId;
                base.objSqlCommand.Parameters.AddWithValue(ManualPointEntryConstants.const_Field_CriteriaId, CriteriaId);
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objEntityToReturn = VISAutoMapper.ConvertDataRow<LevelCriteriaSetup>(dt.Rows[0]);

            }
            return objEntityToReturn;
        }

        #region IDisposable Support
        private bool disposedValue = false; // To detect redundant calls

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    // TODO: dispose managed state (managed objects).
                }

                // TODO: free unmanaged resources (unmanaged objects) and override a finalizer below.
                // TODO: set large fields to null.

                disposedValue = true;
            }
        }



        void IDisposable.Dispose()
        {
            throw new NotImplementedException();
        }

        // TODO: override a finalizer only if Dispose(bool disposing) above has code to free unmanaged resources.
        // ~LevelCriteriaSetupRepository() {
        //   // Do not change this code. Put cleanup code in Dispose(bool disposing) above.
        //   Dispose(false);
        // }

        // This code added to correctly implement the disposable pattern.
        //void IDisposable.Dispose()
        //{
        //    // Do not change this code. Put cleanup code in Dispose(bool disposing) above.
        //    Dispose(true);
        //    // TODO: uncomment the following line if the finalizer is overridden above.
        //    // GC.SuppressFinalize(this);
        //}



        #endregion

        #region supporting methods 
        LevelCriteriaSetup GetSetupDetails(int iSetupID)
        {
            LevelCriteriaSetup objEntityToReturn = new LevelCriteriaSetup();
            try
            {
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);

                using (objVISDbCommand.objSqlCommand.Connection)
                {
                    
                    objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                    objVISDbCommand.objSqlCommand.CommandText = LevelCriteriaSetupConstants.const_procLevelCriteriaSetup_GetSetupDetails;
                    //objVISDbCommand.objSqlCommand.Parameters.AddWithValue();
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(LevelCriteriaSetupConstants.const_Field_iSetupID, iSetupID);
                    if (objVISDbCommand.objSqlCommand.Connection.State != ConnectionState.Open)
                    {
                        objVISDbCommand.objSqlCommand.Connection.Open();
                    }

                    SqlDataAdapter da = new SqlDataAdapter(objVISDbCommand.objSqlCommand);
                    DataTable dt = new DataTable();
                    da.Fill(dt);
                    if (dt != null)
                    {
                        if (dt.Rows.Count > 0)
                        {
                            objEntityToReturn = VISAutoMapper.ConvertDataRow<LevelCriteriaSetup>(dt.Rows[0]);
                        }
                        else
                        {
                            objEntityToReturn = null;
                        }
                    }



                    //if (dt != null)
                    //{
                    //    objEntityToReturn = VISAutoMapper.ConvertDataRow<LevelCriteriaSetup>(dt.Rows[0]);
                    //}
                    //else
                    //{
                    //     objEntityToReturn = null;  
                    //}

                }
                //return objEntityToReturn;
            }
            catch (Exception Ex)
            {
                string error = Ex.ToString();
            }
            return objEntityToReturn;
            //return db.LevelCriteriaSetups.Where(x => x.SetupID == iSetupID && x.IsActive == true).FirstOrDefault();
        }
        
        #endregion
    }
}
