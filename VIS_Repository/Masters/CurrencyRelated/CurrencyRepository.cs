using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using VIS_Domain;
using VIS_Domain.Master.CurrencyRelated;

namespace VIS_Repository.Masters.CurrencyRelated
{
    public class CurrencyRepository : VISDbCommand, VISIBaseRepository<Currency>
    {
        public Int32 intAffectedRecords { get; set; }

        
        public CurrencyRepository(string _connectionstring) : base(_connectionstring)
        {      
        }
        
        public string DeleteEntity(Int64 Id)
        {

            try
            {
                string UpdatedBy = string.Empty;
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = CurrencyConstants.const_procCurrency_ActiveInActive;
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

        public Currency GetEntityByID(Int64 entityId)
        {
            Currency objEntityToReturn = new Currency();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = CurrencyConstants.const_procCurrency_SelectById;
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objEntityToReturn = VISAutoMapper.ConvertDataRow<Currency>(dt.Rows[0]);
            }
            return objEntityToReturn;
        }

        public IEnumerable<Currency> GetEntityList()
        {
            List<Currency> objListToReturn = new List<Currency>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = CurrencyConstants.const_procCurrency_SelectAll;
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<Currency>(dt);
            }
            return objListToReturn;

        }

        public string AddEntity(Currency entityObject)
        {
            try
            {
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = CurrencyConstants.const_procCurrency_Add;
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CurrencyConstants.const_Field_Default_Exchange, entityObject.Default_Exchange);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CurrencyConstants.const_Field_Full_Name, entityObject.Full_Name);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CurrencyConstants.const_Field_Is_Base_Currency, entityObject.Is_Base_Currency);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CurrencyConstants.const_Field_Short_Name, entityObject.Short_Name);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CurrencyConstants.const_Field_Sub_Unit, entityObject.Sub_Unit);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CurrencyConstants.const_Field_Symbol, entityObject.Symbol);
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
            catch(Exception ex)
            {
                return ex.Message + Environment.NewLine + ex.StackTrace;
            }
            
        }

        public string UpdateEntity(Currency entityObject)
        {
            try
            {
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = CurrencyConstants.const_procCurrency_Update;
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_Id, entityObject.Id);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CurrencyConstants.const_Field_Default_Exchange, entityObject.Default_Exchange);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CurrencyConstants.const_Field_Full_Name, entityObject.Full_Name);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CurrencyConstants.const_Field_Is_Base_Currency, entityObject.Is_Base_Currency);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CurrencyConstants.const_Field_Short_Name, entityObject.Short_Name);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CurrencyConstants.const_Field_Sub_Unit, entityObject.Sub_Unit);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CurrencyConstants.const_Field_Symbol, entityObject.Symbol);
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
