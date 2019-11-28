using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using VIS_Domain;
using VIS_Domain.Master.CurrencyRelated;

namespace VIS_Repository.Masters.CurrencyRelated
{
    public class CurrencyHistoryRepository : VISDbCommand
    {
        public Int32 intAffectedRecords { get; set; }


        public CurrencyHistoryRepository(string _connectionstring) : base(_connectionstring)
        {
        }

        public string DeleteEntity(Int64 Id)
        {

            try
            {
                string UpdatedBy = string.Empty;
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = CurrencyHistoryConstants.const_procCurrencyHistory_ActiveInActive;
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

        public string GetEntityByID(Int64 entityId)
        {
            string Default_ExchangeRate = "";

            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = CurrencyHistoryConstants.procCurrencyHistory_SelectById;
                base.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_Id, entityId);
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);

                if(dt.Rows.Count>0)
                {
                    Default_ExchangeRate = dt.Rows[0][0].ToString();
                }
            }

            return Default_ExchangeRate;
        }

        public List<CurrencyHistory> GetEntityList()
        {
            List<CurrencyHistory> objListToReturn = new List<CurrencyHistory>();
            List<CurrencyHistory> lstCurrencyHistory = new List<CurrencyHistory>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = CurrencyHistoryConstants.procCurrencyHistory_SelectAll;
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<CurrencyHistory>(dt);

                foreach (CurrencyHistory item in objListToReturn)
                {
                    CurrencyHistory objCurrencyHistory = new CurrencyHistory();
                    objCurrencyHistory.FromDate = new DateTime(Convert.ToInt32(item.Year_Entered), Convert.ToInt32(item.Month_Entered), 01);
                    objCurrencyHistory.ToDate = new DateTime(Convert.ToInt32(item.Year_Entered), Convert.ToInt32(item.Month_Entered), DateTime.DaysInMonth(Convert.ToInt32(item.Year_Entered), Convert.ToInt32(item.Month_Entered)));
                    objCurrencyHistory.Currency_Id = item.Currency_Id;
                    objCurrencyHistory.Default_Exch_Rate = item.Default_Exch_Rate;
                    objCurrencyHistory.Current_Exch_Rate = item.Current_Exch_Rate;
                    objCurrencyHistory.Month_Entered = item.Month_Entered;
                    objCurrencyHistory.Year_Entered = item.Year_Entered;
                    objCurrencyHistory.Date_Entered = item.Date_Entered;
                    objCurrencyHistory.IsActive = item.IsActive;
                    objCurrencyHistory.CreatedOn = item.CreatedOn;
                    objCurrencyHistory.CreatedBy = item.CreatedBy;
                    objCurrencyHistory.UpdatedOn = item.UpdatedOn;
                    objCurrencyHistory.UpdatedBy = item.UpdatedBy;
                    objCurrencyHistory.Id = item.Id;
                    lstCurrencyHistory.Add(objCurrencyHistory);
                }

            }
            return lstCurrencyHistory;

        }

        public string AddEntity(CurrencyHistory entityObject)
        {
            try
            {
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = CurrencyHistoryConstants.const_procCurrencyHistory_Add;
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CurrencyHistoryConstants.const_Field_Currency_Id, entityObject.Currency_Id);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CurrencyHistoryConstants.const_Field_Default_Exch_Rate, entityObject.Default_Exch_Rate);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CurrencyHistoryConstants.const_Field_Current_Exch_Rate, entityObject.Current_Exch_Rate);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CurrencyHistoryConstants.const_Field_Month_Entered, entityObject.Month_Entered);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CurrencyHistoryConstants.const_Field_Year_Entered, entityObject.Year_Entered);

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

        public string UpdateEntity(CurrencyHistory entityObject)
        {
            try
            {
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = CurrencyHistoryConstants.const_procCurrencyHistory_Update;
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_Id, entityObject.Id);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CurrencyHistoryConstants.const_Field_Currency_Id, entityObject.Currency_Id);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CurrencyHistoryConstants.const_Field_Default_Exch_Rate, entityObject.Default_Exch_Rate);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CurrencyHistoryConstants.const_Field_Current_Exch_Rate, entityObject.Current_Exch_Rate);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CurrencyHistoryConstants.const_Field_Month_Entered, entityObject.Month_Entered);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CurrencyHistoryConstants.const_Field_Year_Entered, entityObject.Year_Entered);
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

        //void IDisposable.Dispose()
        //{
        //    throw new NotImplementedException();
        //}

        // TODO: override a finalizer only if Dispose(bool disposing) above has code to free unmanaged resources.
        // ~CurrencyRepository() {
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
