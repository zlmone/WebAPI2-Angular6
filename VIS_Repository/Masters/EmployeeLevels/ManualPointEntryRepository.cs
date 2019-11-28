using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VIS_Domain;
using VIS_Domain.Master;
using VIS_Domain.Master.EmployeeManualPointEntry;
using VIS_Domain.Masters.EmployeeLevelCriteriaSetup;
using VIS_Domain.Masters.EmployeeLevels;

namespace VIS_Repository.Masters.EmployeeLevels
{
    public class ManualPointEntryRepository : VISDbCommand, VISIBaseRepository<ManualPointEntry>
    {
        public Int32 intAffectedRecords { get; set; }


        public ManualPointEntryRepository(string _connectionstring) : base(_connectionstring)
        {
        }

        public string DeleteEntity(Int64 Id)
        {

            try
            {
                string UpdatedBy = string.Empty;
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = ManualPointEntryConstants.const_procManualPointEntry_ActiveInActive;
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
        }

        public ManualPointEntry GetEntityByID(Int64 entityId)
        {
            ManualPointEntry objEntityToReturn = new ManualPointEntry();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = ManualPointEntryConstants.const_procManualPointEntry_SelectById;
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objEntityToReturn = VISAutoMapper.ConvertDataRow<ManualPointEntry>(dt.Rows[0]);
            }
            return objEntityToReturn;
        }
     
        public IEnumerable<ManualPointEntry> GetEntityList()
        {
            List<ManualPointEntry> objListToReturn = new List<ManualPointEntry>();
            try
            {
                using (base.objSqlCommand.Connection)
                {
                    base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                    base.objSqlCommand.CommandText = ManualPointEntryConstants.const_procManualPointEntry_SelectAll;
                    if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                    {
                        base.objSqlCommand.Connection.Open();
                    }

                    SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                    DataTable dt = new DataTable();
                    da.Fill(dt);
                    objListToReturn = VISAutoMapper.ConvertDataTable<ManualPointEntry>(dt);
                }
                return objListToReturn;
            }
            catch (Exception ex)
            {
                return objListToReturn;
            }
        }

        public DataTable GetEmployeeList()
        {
            //List<ManualPointEntry> objListToReturn = new List<ManualPointEntry>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = ManualPointEntryConstants.const_procManualPointEntry_SelectEmployee;
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                //objListToReturn = VISAutoMapper.ConvertDataTable<ManualPointEntry>(dt);
                return dt;
            }

        }
        public string AddEntity(ManualPointEntry entityObject)
        {
            try
            {
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = ManualPointEntryConstants.const_procManualPointEntry_Add;

                //objVISDbCommand.objSqlCommand.Parameters.AddWithValue(ManualPointEntryConstants.const_Field_EndPoint, entityObject.EndPoint);
                //objVISDbCommand.objSqlCommand.Parameters.AddWithValue(ManualPointEntryConstants.const_Field_LevelIcon, entityObject.LevelIcon);
                //objVISDbCommand.objSqlCommand.Parameters.AddWithValue(ManualPointEntryConstants.const_Field_LevelName, entityObject.LevelName);
                //objVISDbCommand.objSqlCommand.Parameters.AddWithValue(ManualPointEntryConstants.const_Field_LevelNumber, entityObject.LevelNumber);
                //objVISDbCommand.objSqlCommand.Parameters.AddWithValue(ManualPointEntryConstants.const_Field_StartPoint, entityObject.StartPoint);
                //objVISDbCommand.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_CreatedBy, entityObject.CreatedBy);

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

        }

        public string UpdateEntity(ManualPointEntry entityObject)
        {
            try
            {
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = ManualPointEntryConstants.const_procManualPointEntry_Update;
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_Id, entityObject.Id);

                //objVISDbCommand.objSqlCommand.Parameters.AddWithValue(ManualPointEntryConstants.const_Field_EndPoint, entityObject.EndPoint);
                //objVISDbCommand.objSqlCommand.Parameters.AddWithValue(ManualPointEntryConstants.const_Field_LevelIcon, entityObject.LevelIcon);
                //objVISDbCommand.objSqlCommand.Parameters.AddWithValue(ManualPointEntryConstants.const_Field_LevelName, entityObject.LevelName);
                //objVISDbCommand.objSqlCommand.Parameters.AddWithValue(ManualPointEntryConstants.const_Field_LevelNumber, entityObject.LevelNumber);
                //objVISDbCommand.objSqlCommand.Parameters.AddWithValue(ManualPointEntryConstants.const_Field_StartPoint, entityObject.StartPoint);
                //objVISDbCommand.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_UpdatedBy, entityObject.UpdatedBy);

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
        }

        public IEnumerable<ManualPointEntry> GetCriteria()
        {
            List<ManualPointEntry> objListToReturn = new List<ManualPointEntry>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = ManualPointEntryConstants.const_procManualPointEntry_GetCriteria;
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<ManualPointEntry>(dt);
            }
            return objListToReturn;

        }

        //GetDataByCriteriaId
        public ManualPointEntry GetDataByCriteriaId(int CriteriaId)
        {
            ManualPointEntry objEntityToReturn = new ManualPointEntry();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = ManualPointEntryConstants.const_procManualPointEntry_GetDataByCriteriaId;
                base.objSqlCommand.Parameters.AddWithValue(ManualPointEntryConstants.const_Field_CriteriaId, CriteriaId);
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objEntityToReturn = VISAutoMapper.ConvertDataRow<ManualPointEntry>(dt.Rows[0]);
            }
            return objEntityToReturn;
        }

        public ManualPointEntry GetEmployeeById(int Id)
        {
            ManualPointEntry objEntityToReturn = new ManualPointEntry();

            using (base.objSqlCommand.Connection)
            {
                if (objSqlCommand.Connection.ConnectionString == null || objSqlCommand.Connection.ConnectionString == "")
                {
                    base.objSqlCommand.Connection.ConnectionString = ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString;
                }
                base.objSqlCommand.Parameters.Clear();
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = ManualPointEntryConstants.const_procManualPointEntry_GetEmployeeById;
                base.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_Id, Id);
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objEntityToReturn = VISAutoMapper.ConvertDataRow<ManualPointEntry>(dt.Rows[0]);

            }
            return objEntityToReturn;
        }


        public IEnumerable<ManualPointEntry> GetCategory()
        {
            List<ManualPointEntry> objListToReturn = new List<ManualPointEntry>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = ManualPointEntryConstants.const_procManualPointEntry_GetCategory;
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<ManualPointEntry>(dt);
            }
            return objListToReturn;

        }



        public string SaveLevelsPointLog(LevelsPointLog entityObject)
        {
            try
            {
                if (objSqlCommand.Connection.ConnectionString == null || objSqlCommand.Connection.ConnectionString == "")
                {
                    base.objSqlCommand.Connection.ConnectionString = ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString;
                }
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = ManualPointEntryConstants.const_procSaveLevelsPointLog;
                objVISDbCommand.objSqlCommand.Parameters.Clear();
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(LevelsPointLogConstants.const_Field_EmployeeID, entityObject.EmployeeID);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(LevelsPointLogConstants.const_Field_SetupID, entityObject.SetupID);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(LevelsPointLogConstants.const_Field_Date, entityObject.Date);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(LevelsPointLogConstants.const_Field_Points, entityObject.Points);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(LevelsPointLogConstants.const_Field_GroupID, entityObject.GroupID);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(LevelsPointLogConstants.const_Field_Remarks, entityObject.Remarks);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(LevelsPointLogConstants.const_Field_Count, entityObject.Count);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(LevelsPointLogConstants.const_Field_IsActive, entityObject.IsActive);

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

        }

       

        public string GetMaxGroupId()
        {
            string max;

            using (base.objSqlCommand.Connection)
            {
                if (objSqlCommand.Connection.ConnectionString == null || objSqlCommand.Connection.ConnectionString == "")
                {
                    base.objSqlCommand.Connection.ConnectionString = ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString;
                }

                using (SqlCommand cmd = new SqlCommand(ManualPointEntryConstants.const_procGetMaxGroupId, base.objSqlCommand.Connection))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.Add("@max", SqlDbType.VarChar, 30);
                    cmd.Parameters["@max"].Direction = ParameterDirection.Output;
                    if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                    {
                        base.objSqlCommand.Connection.Open();
                    }
                    cmd.ExecuteNonQuery();

                    max = cmd.Parameters["@Max"].Value.ToString();
                }
                //base.objSqlCommand.Parameters.Clear();
                //base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                //base.objSqlCommand.CommandText = ManualPointEntryConstants.const_procGetMaxGroupId;
                //if (!base.objSqlCommand.Parameters.Contains(ManualPointEntryConstants.const_Field_Max))
                //{
                //    base.objSqlCommand.Parameters.Add(AddEntityMaxParameter());
                //}
                //if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                //{
                //    base.objSqlCommand.Connection.Open();
                //}
                //SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                //max = (string)objSqlCommand.ExecuteScalar();
            }
            return max;
        }
        public string GetCriteriaFromSetupId(long iSetupId)
        {
            string AliasName;
            using (base.objSqlCommand.Connection)
            {
                if (objSqlCommand.Connection.ConnectionString == null || objSqlCommand.Connection.ConnectionString == "")
                {
                    base.objSqlCommand.Connection.ConnectionString = ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString;
                }
                using (SqlCommand cmd = new SqlCommand(ManualPointEntryConstants.const_GetCriteriaFromSetupId, base.objSqlCommand.Connection))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add("@AliasName", SqlDbType.VarChar, 30);
                    cmd.Parameters["@AliasName"].Direction = ParameterDirection.Output;
                    if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                    {
                        base.objSqlCommand.Connection.Open();
                    }
                    cmd.ExecuteNonQuery();
                    AliasName = cmd.Parameters["@AliasName"].Value.ToString();
                }
            }
            return AliasName;
        }

        public EmployeeData GetEmployeeByIdForMail(long Id)
        {
            EmployeeData objEntityToReturn = new EmployeeData();

            using (base.objSqlCommand.Connection)
            {
                if (objSqlCommand.Connection.ConnectionString == null || objSqlCommand.Connection.ConnectionString == "")
                {
                    base.objSqlCommand.Connection.ConnectionString = ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString;
                }
                base.objSqlCommand.Parameters.Clear();
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = ManualPointEntryConstants.const_procManualPointEntry_GetEmployeeById;
                base.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_Id, Id);
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objEntityToReturn = VISAutoMapper.ConvertDataRow<EmployeeData>(dt.Rows[0]);

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
        // ~ManualPointEntryRepository() {
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
    }
}
