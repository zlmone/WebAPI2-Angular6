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
using VIS_Domain.Master.CompanyRelated;
using VIS_Repository.Masters;

namespace VIS_Repository.Masters.CompanyRelated
{
    public class CompanyMasterRepository : VISDbCommand, VISIBaseRepository<CompanyMaster>
    {
        public Int32 intAffectedRecords { get; set; }


        public CompanyMasterRepository(string _connectionstring) : base(_connectionstring)
        {
        }

        public string DeleteEntity(Int64 Id)
        {

            try
            {
                string UpdatedBy = string.Empty;
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = CompanyMasterConstants.const_procCompanyMaster_ActiveInActive;
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

        public CompanyMaster GetEntityByID(Int64 entityId)
        {
            CompanyMaster objEntityToReturn = new CompanyMaster();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = CompanyMasterConstants.const_procCompanyMaster_SelectById;
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objEntityToReturn = VISAutoMapper.ConvertDataRow<CompanyMaster>(dt.Rows[0]);
            }
            return objEntityToReturn;
        }

        public IEnumerable<CompanyMaster> GetEntityList()
        {
            List<CompanyMaster> objListToReturn = new List<CompanyMaster>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = CompanyMasterConstants.const_procCompanyMaster_SelectAll;
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

        public string AddEntity(CompanyMaster entityObject)
        {
            try
            {
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = CompanyMasterConstants.const_procCompanyMaster_Add;

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CompanyMasterConstants.const_Field_CompanyName, entityObject.CompanyName);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CompanyMasterConstants.const_Field_City, entityObject.City);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CompanyMasterConstants.const_Field_ZipCode, entityObject.ZipCode);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CompanyMasterConstants.const_Field_State, entityObject.State);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CompanyMasterConstants.const_Field_Country, entityObject.Country);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CompanyMasterConstants.const_Field_ContactNo, entityObject.ContactNo);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CompanyMasterConstants.const_Field_E_mail, entityObject.E_mail);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CompanyMasterConstants.const_Field_Fax, entityObject.Fax);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CompanyMasterConstants.const_Field_CompanyURL, entityObject.CompanyURL);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CompanyMasterConstants.const_Field_Address, entityObject.Address);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CompanyMasterConstants.const_Field_CompanyLogo, entityObject.CompanyLogo);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CompanyMasterConstants.const_Field_AccountHead, entityObject.AccountHead);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CompanyMasterConstants.const_Field_Designation, entityObject.Designation);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CompanyMasterConstants.const_Field_Signature, entityObject.Signature);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CompanyMasterConstants.const_Field_CompanyShortCode, entityObject.CompanyShortCode);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CompanyMasterConstants.const_Field_Address2, entityObject.Address2);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CompanyMasterConstants.const_Field_StartSeries, entityObject.StartSeries);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CompanyMasterConstants.const_Field_FinancialYear, entityObject.FinancialYear);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CompanyMasterConstants.const_Field_AccountHeadOther, entityObject.AccountHeadOther);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CompanyMasterConstants.const_Field_DesignationOther, entityObject.DesignationOther);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CompanyMasterConstants.const_Field_SignatureOther, entityObject.SignatureOther);

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_CreatedBy, entityObject.CreatedBy);
                if (!objVISDbCommand.objSqlCommand.Parameters.Contains(VISBaseEntityConstants.const_Field_EntityMessage))
                {
                    objVISDbCommand.objSqlCommand.Parameters.Add(AddEntityMessageParameter());
                }

                if (objVISDbCommand.objSqlCommand.Connection.State==ConnectionState.Closed)
                {
                    objVISDbCommand.objSqlCommand.Connection.Open();
                }
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

        public string UpdateEntity(CompanyMaster entityObject)
        {
            try
            {
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = CompanyMasterConstants.const_procCompanyMaster_Update;
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_Id, entityObject.Id);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CompanyMasterConstants.const_Field_CompanyName, entityObject.CompanyName);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CompanyMasterConstants.const_Field_City, entityObject.City);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CompanyMasterConstants.const_Field_ZipCode, entityObject.ZipCode);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CompanyMasterConstants.const_Field_State, entityObject.State);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CompanyMasterConstants.const_Field_Country, entityObject.Country);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CompanyMasterConstants.const_Field_ContactNo, entityObject.ContactNo);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CompanyMasterConstants.const_Field_E_mail, entityObject.E_mail);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CompanyMasterConstants.const_Field_Fax, entityObject.Fax);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CompanyMasterConstants.const_Field_CompanyURL, entityObject.CompanyURL);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CompanyMasterConstants.const_Field_Address, entityObject.Address);
                //objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CompanyMasterConstants.const_Field_CompanyLogo, entityObject.CompanyLogo);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CompanyMasterConstants.const_Field_AccountHead, entityObject.AccountHead);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CompanyMasterConstants.const_Field_Designation, entityObject.Designation);
                //objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CompanyMasterConstants.const_Field_Signature, entityObject.Signature);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CompanyMasterConstants.const_Field_CompanyShortCode, entityObject.CompanyShortCode);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CompanyMasterConstants.const_Field_Address2, entityObject.Address2);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CompanyMasterConstants.const_Field_StartSeries, entityObject.StartSeries);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CompanyMasterConstants.const_Field_FinancialYear, entityObject.FinancialYear);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CompanyMasterConstants.const_Field_AccountHeadOther, entityObject.AccountHeadOther);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CompanyMasterConstants.const_Field_DesignationOther, entityObject.DesignationOther);
                //objVISDbCommand.objSqlCommand.Parameters.AddWithValue(CompanyMasterConstants.const_Field_SignatureOther, entityObject.SignatureOther);

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
        
        public IEnumerable<CompanyMaster> GetDesignation()
        {
            List<CompanyMaster> objListToReturn = new List<CompanyMaster>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = CompanyMasterConstants.const_procCompanyMaster_ForPositiondll;
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

        public IEnumerable<CompanyMaster> GetCountry()
        {
            List<CompanyMaster> objListToReturn = new List<CompanyMaster>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = CompanyMasterConstants.const_procCompanyMaster_ForCountrydll;
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
        public IEnumerable<CompanyMaster> GetFinancialYear()
        {
            List<CompanyMaster> objListToReturn = new List<CompanyMaster>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = CompanyMasterConstants.const_procCompanyMaster_ForFinancialYeardll;
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

        public IEnumerable<CompanyMaster> GetHeaddll()
        {
            List<CompanyMaster> objListToReturn = new List<CompanyMaster>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = CompanyMasterConstants.const_procCompanyMaster_ForSelectHeaddll;
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
        // ~CompanyMasterRepository() {
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
