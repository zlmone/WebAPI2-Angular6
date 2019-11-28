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
    public class ContactMasterRepository : VISDbCommand, VISIBaseRepository<ContactMaster>
    {
        public Int32 intAffectedRecords { get; set; }


        public ContactMasterRepository(string _connectionstring) : base(_connectionstring)
        {
        }

        public string DeleteEntity(Int64 Id)
        {

            try
            {
                string UpdatedBy = string.Empty;
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = ContactMasterConstants.const_procContactMaster_ActiveInActive;
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

        public ContactMaster GetEntityByID(Int64 entityId)
        {
            ContactMaster objEntityToReturn = new ContactMaster();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = ContactMasterConstants.const_procContactMaster_SelectById;
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objEntityToReturn = VISAutoMapper.ConvertDataRow<ContactMaster>(dt.Rows[0]);
            }
            return objEntityToReturn;
        }

        public IEnumerable<ContactMaster> GetEntityList()
        {
            List<ContactMaster> objListToReturn = new List<ContactMaster>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = ContactMasterConstants.const_procContactMaster_SelectAll;
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<ContactMaster>(dt);
            }
            return objListToReturn;

        }

        public string AddEntity(ContactMaster entityObject)
        {
            try
            {
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = ContactMasterConstants.const_procContactMaster_Add;

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(ContactMasterConstants.const_Field_Name, entityObject.Name);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(ContactMasterConstants.const_Field_Designation, entityObject.Designation);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(ContactMasterConstants.const_Field_Email, entityObject.Email);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(ContactMasterConstants.const_Field_phone, entityObject.phone);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(ContactMasterConstants.const_Field_SkypeId, entityObject.SkypeId);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(ContactMasterConstants.const_Field_MsnId, entityObject.MsnId);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(ContactMasterConstants.const_Field_GtalkId, entityObject.GtalkId);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(ContactMasterConstants.const_Field_AolId, entityObject.AolId);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(ContactMasterConstants.const_Field_Other, entityObject.Other);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(ContactMasterConstants.const_Field_ProspectId, entityObject.ProspectId);
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

        public string UpdateEntity(ContactMaster entityObject)
        {
            try
            {
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = ContactMasterConstants.const_procContactMaster_Update;

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_Id, entityObject.Id);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(ContactMasterConstants.const_Field_Name, entityObject.Name);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(ContactMasterConstants.const_Field_Designation, entityObject.Designation);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(ContactMasterConstants.const_Field_Email, entityObject.Email);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(ContactMasterConstants.const_Field_phone, entityObject.phone);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(ContactMasterConstants.const_Field_SkypeId, entityObject.SkypeId);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(ContactMasterConstants.const_Field_MsnId, entityObject.MsnId);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(ContactMasterConstants.const_Field_GtalkId, entityObject.GtalkId);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(ContactMasterConstants.const_Field_AolId, entityObject.AolId);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(ContactMasterConstants.const_Field_Other, entityObject.Other);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(ContactMasterConstants.const_Field_ProspectId, entityObject.ProspectId);
                
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
        // ~ContactMasterRepository() {
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
