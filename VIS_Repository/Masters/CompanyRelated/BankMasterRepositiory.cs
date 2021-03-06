﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VIS_Domain;
using VIS_Domain.Master;
using VIS_Domain.Master.CompanyRelated;
using VIS_Domain.Master.CurrencyRelated;
using VIS_Repository.Masters;

namespace VIS_Repository.Masters.CompanyRelated
{
    public class BankMasterRepositiory : VISDbCommand, VISIBaseRepository<BankMaster>
    {
        
        public Int32 intAffectedRecords { get; set; }


        public BankMasterRepositiory(string _connectionstring) : base(_connectionstring)
        {

        }

        public string DeleteEntity(Int64 Id)
        {

            try
            {
                string UpdatedBy = string.Empty;

                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = BankMasterConstant.const_procBankMaster_ActiveInActive;

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_Id, Id);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_UpdatedBy,UpdatedBy);

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

        public BankMaster GetEntityByID(Int64 entityId)
        {
            BankMaster objEntityToReturn = new BankMaster();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = BankMasterConstant.const_procBankMaster_SelectById;
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objEntityToReturn = VISAutoMapper.ConvertDataRow<BankMaster>(dt.Rows[0]);
            }
            return objEntityToReturn;
        }

        public IEnumerable<BankMaster> GetEntityList()
        {
            List<BankMaster> objListToReturn = new List<BankMaster>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = BankMasterConstant.const_procBankMaster_SelectAll;
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<BankMaster>(dt);
            }
            return objListToReturn;

        }

        public string AddEntity(BankMaster entityObject)
        {
            try
            {
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = BankMasterConstant.const_procBankMaster_Add;

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_CompanyId, entityObject.CompanyId);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(BankMasterConstant.const_CurrencyId, entityObject.CurrencyId);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(BankMasterConstant.const_BankAlias, entityObject.BankAlias);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(BankMasterConstant.const_BankName, entityObject.BankName);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(BankMasterConstant.const_BranchName, entityObject.BranchName);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(BankMasterConstant.const_BankAddress, entityObject.BankAddress);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(BankMasterConstant.const_BankDetail, entityObject.BankDetail);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(BankMasterConstant.const_AccountNumber, entityObject.AccountNumber);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(BankMasterConstant.const_Status, entityObject.Status);

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

        public string UpdateEntity(BankMaster entityObject)
        {
            try
            {
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = BankMasterConstant.const_procBankMaster_Update;

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_Id, entityObject.Id);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_CompanyId, entityObject.CompanyId);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(BankMasterConstant.const_CurrencyId, entityObject.CurrencyId);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(BankMasterConstant.const_BankAlias, entityObject.BankAlias);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(BankMasterConstant.const_BankName, entityObject.BankName);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(BankMasterConstant.const_BranchName, entityObject.BranchName);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(BankMasterConstant.const_BankAddress, entityObject.BankAddress);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(BankMasterConstant.const_BankDetail, entityObject.BankDetail);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(BankMasterConstant.const_AccountNumber, entityObject.AccountNumber);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(BankMasterConstant.const_Status, entityObject.Status);

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

        public IEnumerable<CompanyMaster> GetCompany()
        {
            List<CompanyMaster> objListToReturn = new List<CompanyMaster>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = BankMasterConstant.const_procGetCompanyMaster;
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<CompanyMaster>(dt);
            }
            return objListToReturn;

        }

        public IEnumerable<Currency> GetCurrency()
        {
            List<Currency> objListToReturn = new List<Currency>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = BankMasterConstant.const_procGetCurrency;
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
