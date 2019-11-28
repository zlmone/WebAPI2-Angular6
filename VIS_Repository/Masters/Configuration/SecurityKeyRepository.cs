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
    public class SecurityKeyRepository : VISDbCommand, VISIBaseRepository<SecurityKey>
    {

        public Int32 intAffectedRecords { get; set; }


        public SecurityKeyRepository(string _connectionstring) : base(_connectionstring)
        {

        }

        public string DeleteEntity(Int64 Id)
        {

            try
            {
                string UpdatedBy = string.Empty;

                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = SecurityKeyConstant.const_procSecurityKey_ActiveInActive;
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_Id, Id);

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

        public SecurityKey GetEntityByID(Int64 Id)
        {
            SecurityKey objEntityToReturn = new SecurityKey();

            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = SecurityKeyConstant.const_procSecurityKey_SelectById;
                base.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_Id, Id);
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objEntityToReturn = VISAutoMapper.ConvertDataRow<SecurityKey>(dt.Rows[0]);
            }
            return objEntityToReturn;
        }

        public IEnumerable<SecurityKey> GetEntityList()
        {
            List<SecurityKey> objListToReturn = new List<SecurityKey>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = SecurityKeyConstant.const_procSecurityKey_SelectAll;
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<SecurityKey>(dt);
            }
            return objListToReturn;
        }

        public string AddEntity(SecurityKey entityObject)
        {
            try
            {
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = SecurityKeyConstant.const_procSecurityKey_Add;

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(SecurityKeyConstant.const_Key1,entityObject.Key1);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(SecurityKeyConstant.const_Key2, entityObject.Key2);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(SecurityKeyConstant.const_Key3, entityObject.Key3);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(SecurityKeyConstant.const_Key4, entityObject.Key4);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(SecurityKeyConstant.const_Key5, entityObject.Key5);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(SecurityKeyConstant.const_UniqueKey, entityObject.UniqueKey);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(SecurityKeyConstant.const_Active,entityObject.Active);

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

        public string UpdateEntity(SecurityKey entityObject)
        {
            try
            {
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = SecurityKeyConstant.const_procSecurityKey_Update;

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_Id, entityObject.Id);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(SecurityKeyConstant.const_Key1, entityObject.Key1);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(SecurityKeyConstant.const_Key2, entityObject.Key2);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(SecurityKeyConstant.const_Key3, entityObject.Key3);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(SecurityKeyConstant.const_Key4, entityObject.Key4);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(SecurityKeyConstant.const_Key5, entityObject.Key5);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(SecurityKeyConstant.const_UniqueKey, entityObject.UniqueKey);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(SecurityKeyConstant.const_Active, entityObject.Active);

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
