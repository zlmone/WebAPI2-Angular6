using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VIS_Domain;
using VIS_Domain.Master;
using VIS_Domain.Master.Configuration;
using VIS_Repository.Masters;

namespace VIS_Repository.Masters.Configuration
{
    public class CommonConfigurationRepository : VISDbCommand, VISIBaseRepository<CommonConfiguration>
    {

        public Int32 intAffectedRecords { get; set; }

        public CommonConfigurationRepository(string _connectionstring) : base(_connectionstring)
        {

        }

        public CommonConfiguration GetCommonConfiguration()
        {
            CommonConfiguration objEntityToReturn = new CommonConfiguration();

            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = CommonConfigurationConstant.const_procCommonConfiguration_SelectAll;
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objEntityToReturn = VISAutoMapper.ConvertDataRow<CommonConfiguration>(dt.Rows[0]);
            }
            return objEntityToReturn;
        }

        public string DeleteEntity(Int64 Id)
        {

            try
            {
                string UpdatedBy = string.Empty;

                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText =CommonConfigurationConstant.const_procCommonConfiguration_ActiveInActive;
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_Id, Id);

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

        public CommonConfiguration GetEntityByID(Int64 Id)
        {
            CommonConfiguration objEntityToReturn = new CommonConfiguration();

            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = CommonConfigurationConstant.const_procCommonConfiguration_SelectById;
                base.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_Id, Id);
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objEntityToReturn = VISAutoMapper.ConvertDataRow<CommonConfiguration>(dt.Rows[0]);
            }
            return objEntityToReturn;
        }

        public IEnumerable<CommonConfiguration> GetEntityList()
        {
            List<CommonConfiguration> objListToReturn = new List<CommonConfiguration>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = CommonConfigurationConstant.const_procCommonConfiguration_SelectAll;
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<CommonConfiguration>(dt);
            }
            return objListToReturn;
        }

        public string AddEntity(CommonConfiguration entityObject)
        {
            try
            {
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = CommonConfigurationConstant.const_procCommonConfiguration_Add;

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

        public string UpdateEntity(CommonConfiguration entityObject)
        {
            try
            {
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = CommonConfigurationConstant.const_procCommonConfiguration_Update; ;

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_Id, entityObject.Id);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CommonConfigurationConstant.const_URLLocal,entityObject.URLLocal);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CommonConfigurationConstant.const_URLLive, entityObject.URLLive);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CommonConfigurationConstant.const_MinimumLunchBreak, entityObject.MinimumLunchBreak);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CommonConfigurationConstant.const_MinimumOtherBreak, entityObject.MinimumOtherBreak);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CommonConfigurationConstant.const_MouseMinutes, entityObject.MouseMinutes);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CommonConfigurationConstant.const_PlusMouseMinutes, entityObject.PlusMouseMinutes);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CommonConfigurationConstant.const_MouseTracking, entityObject.MouseTracking);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CommonConfigurationConstant.const_ProductivityTracker, entityObject.ProductivityTracker);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CommonConfigurationConstant.const_WorksheetPrompt, entityObject.WorksheetPrompt);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CommonConfigurationConstant.const_MinimumPunchoutInterval, entityObject.MinimumPunchoutInterval);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CommonConfigurationConstant.const_InTimeMondayToFridayHH, entityObject.InTimeMondayToFridayHH);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CommonConfigurationConstant.const_InTimeMondayToFridayMM, entityObject.InTimeMondayToFridayMM);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CommonConfigurationConstant.const_OutTimeMondayToFridayHH, entityObject.OutTimeMondayToFridayHH);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CommonConfigurationConstant.const_OutTimeMondayToFridayMM, entityObject.OutTimeMondayToFridayMM);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CommonConfigurationConstant.const_InTimeSaturdayHH, entityObject.InTimeSaturdayHH);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CommonConfigurationConstant.const_InTimeSaturdayMM, entityObject.InTimeSaturdayMM);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CommonConfigurationConstant.const_OutTimeSaturdayHH, entityObject.OutTimeSaturdayHH);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CommonConfigurationConstant.const_OutTimeSaturdayMM, entityObject.OutTimeSaturdayMM);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CommonConfigurationConstant.const_ShiftDurationHH, entityObject.ShiftDurationHH);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CommonConfigurationConstant.const_ShiftDurationMM, entityObject.ShiftDurationMM);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CommonConfigurationConstant.const_TDSMenuHideOrShow, entityObject.TDSMenuHideOrShow);

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

        //TODO: override a finalizer only if Dispose(bool disposing) above has code to free unmanaged resources.
        // ~CurrencyRepository()
        //{
        //    // Do not change this code. Put cleanup code in Dispose(bool disposing) above.
        //    Dispose(false);
        //}

        //This code added to correctly implement the disposable pattern.
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
