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

namespace VIS_Repository.Masters.CompanyRelated
{
    public class LevelConfigurationRepository : VISDbCommand, VISIBaseRepository<LevelConfiguration>
    {
        public Int32 intAffectedRecords { get; set; }


        public LevelConfigurationRepository(string _connectionstring) : base(_connectionstring)
        {
        }

        public string DeleteEntity(Int64 Id)
        {

            try
            {
                string UpdatedBy = string.Empty;
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = LevelConfigurationConstants.const_procLevelConfigurations_ActiveInActive;
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
                return  strRetValue  + objVISDbCommand.objSqlCommand.Parameters[VISBaseEntityConstants.const_Field_EntityMessage].Value.ToString();
            }
            catch (Exception ex)
            {
                return ex.Message + Environment.NewLine + ex.StackTrace;
            }
        }

        public LevelConfiguration GetEntityByID(Int64 entityId)
        {
            LevelConfiguration objEntityToReturn = new LevelConfiguration();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = LevelConfigurationConstants.const_procLevelConfigurations_SelectById;
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objEntityToReturn = VISAutoMapper.ConvertDataRow<LevelConfiguration>(dt.Rows[0]);
                objEntityToReturn.StartMonth = objEntityToReturn.StartDate.Month;
                objEntityToReturn.StartYear = objEntityToReturn.StartDate.Year;
            }
            return objEntityToReturn;
        }

        public IEnumerable<LevelConfiguration> GetEntityList()
        {
            List<LevelConfiguration> objListToReturn = new List<LevelConfiguration>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = LevelConfigurationConstants.const_procLevelConfigurations_SelectAll;
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<LevelConfiguration>(dt);
                for(int intCount = 0; intCount<= objListToReturn.Count - 1; intCount++)
                {
                    objListToReturn[intCount].StartMonth = objListToReturn[intCount].StartDate.Month;
                    objListToReturn[intCount].StartYear = objListToReturn[intCount].StartDate.Year;
                }
                
            }
            return objListToReturn;

        }

        public string AddEntity(LevelConfiguration entityObject)
        {
            try
            {
                DateTime dStartDate = DateTime.Parse("1/" + entityObject.StartMonth + "/" + entityObject.StartYear).Date;
                entityObject.StartDate = dStartDate;
                entityObject.EndDate= dStartDate.AddMonths(entityObject.Period).AddDays(-1).Date;

                if (entityObject.Period == 1)
                {
                    entityObject.PeriodName = "Monthly";
                }
               else if (entityObject.Period == 3)
                {
                    entityObject.PeriodName = "Quarterly";
                }
               else if (entityObject.Period == 6)
                {
                    entityObject.PeriodName = "Bi-Annually";
                }
                else if (entityObject.Period == 12)
                {
                    entityObject.PeriodName = "Annually";
                }
                else if (entityObject.Period == 24)
                {
                    entityObject.PeriodName = "Once In 2 Year";
                }
                
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = LevelConfigurationConstants.const_procLevelConfigurations_Add;

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(LevelConfigurationConstants.const_Field_Period, entityObject.Period);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(LevelConfigurationConstants.const_Field_PeriodName, entityObject.PeriodName);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(LevelConfigurationConstants.const_Field_StartDate, entityObject.StartDate);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(LevelConfigurationConstants.const_Field_EndDate, entityObject.EndDate);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(LevelConfigurationConstants.const_Field_Active, entityObject.Active);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_CreatedBy, entityObject.CreatedBy);
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
                return ex.Message + Environment.NewLine + ex.StackTrace;
            }

        }

        public string UpdateEntity(LevelConfiguration entityObject)
        {
            try
            {
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = LevelConfigurationConstants.const_procLevelConfigurations_Update;
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_Id, entityObject.Id);

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(LevelConfigurationConstants.const_Field_Period, entityObject.Period);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(LevelConfigurationConstants.const_Field_PeriodName, entityObject.PeriodName);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(LevelConfigurationConstants.const_Field_StartDate, entityObject.StartDate);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(LevelConfigurationConstants.const_Field_EndDate, entityObject.EndDate);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(LevelConfigurationConstants.const_Field_Active, entityObject.Active);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(LevelConfigurationConstants.const_Field_IsCurrentPeriod, entityObject.IsCurrentPeriod);

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_UpdatedBy, entityObject.UpdatedBy);
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
                return ex.Message + Environment.NewLine + ex.StackTrace;
            }
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
        // ~LevelConfigurationRepository() {
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
