using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VIS_Domain;
using VIS_Domain.Notification;

namespace VIS_Repository.Notification
{

    public class TicketListOpenRepository : VISDbCommand, VISIBaseRepository<TicketListOpen>
    {

        public Int32 intAffectedRecords { get; set; }


        public TicketListOpenRepository(string _connectionstring) : base(_connectionstring)
        {

        }




        public string DeleteEntity(Int64 Id)
        {

            try
            {
                string UpdatedBy = string.Empty;
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = TicketListOpenConstants.const_procHelpTicket_ActiveInActive;
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

        public TicketListOpen GetEntityByID(Int64 Id)
        {

            return null;
        }

        public IEnumerable<TicketListOpen> GetEntityList()
        {

              return null; ;
        }

        public string AddEntity(TicketListOpen entityObject)
        {

            return null;


        }

        public string UpdateEntity(TicketListOpen entityObject)
        {

            try
            {
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = TicketListOpenConstants.const_procHelpTicket_update;

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_Id, entityObject.Id);

              
               
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(TicketListOpenConstants.const_Field_Remarks, entityObject.Remarks);
               


                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(TicketListOpenConstants.const_Field_Priority, entityObject.Priority);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(TicketListOpenConstants.const_Field_Status, entityObject.Status);

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_UpdatedBy, entityObject.UpdatedBy);
                if (!objVISDbCommand.objSqlCommand.Parameters.Contains(VISBaseEntityConstants.const_Field_EntityMessage))
                {
                    objVISDbCommand.objSqlCommand.Parameters.Add(AddEntityMessageParameter());
                }


                objVISDbCommand.objSqlCommand.Connection.Open();
                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();

                #region helpTickeMsaterLog

                objVISDbCommand.objSqlCommand.Parameters.Clear();
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = TicketListOpenConstants.const_procHelpTicketMasterLog;
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(TicketListOpenConstants.cons_Filed_HelpTicketId, entityObject.Id);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(TicketListOpenConstants.const_Field_Subject, entityObject.Subject);


                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(TicketListOpenConstants.const_Field_Remarks, entityObject.Remarks);
                base.objSqlCommand.Parameters.Clear();
                base.objSqlCommand.CommandType = CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = TicketListOpenConstants.const_procHelpTicket_selectAll;
                base.objSqlCommand.Parameters.AddWithValue(TicketListOpenConstants.const_Field_Mode, "SelectID");
                base.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_Id, entityObject.Id);

                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da1 = new SqlDataAdapter(base.objSqlCommand);
                DataSet ds1 = new DataSet();
                ds1.Clear();
                da1.Fill(ds1);
                base.objSqlCommand.Connection.Close();
                base.objSqlCommand.Parameters.Clear();


                if (ds1.Tables[0].Rows.Count > 0 || ds1 != null)
                {
                    Int64 EmpId = Convert.ToInt64(ds1.Tables[0].Rows[0][0]);
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(TicketListOpenConstants.const_Field_AssignTo, EmpId);

                    Int64 AdId = Convert.ToInt64(ds1.Tables[0].Rows[0][1]);
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(TicketListOpenConstants.const_Field_AddressToGroup, AdId);

                    string Message =ds1.Tables[0].Rows[0]["Message"].ToString();

                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(TicketListOpenConstants.const_Field_Message, Message);
                }
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(TicketListOpenConstants.const_Field_Priority, entityObject.Priority);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(TicketListOpenConstants.const_Field_Status, entityObject.Status);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_UpdatedBy, 21);

                #endregion helpTickeMsaterLog

                base.objSqlCommand.Parameters.Clear();

                objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                objSqlCommand.Connection.Close();
                return intAffectedRecords >= 1 ? VISBaseEntityConstants.const_Result_Success : VISBaseEntityConstants.const_Result_Failure;
                //string strRetValue = intAffectedRecords >= 1 ? VISBaseEntityConstants.const_Result_Success : VISBaseEntityConstants.const_Result_Failure;
                //return  strRetValue  + objVISDbCommand.objSqlCommand.Parameters[VISBaseEntityConstants.const_Field_EntityMessage].Value.ToString();


            }
            catch (Exception ex)
            {
                return ex.Message + Environment.NewLine + ex.StackTrace;
            }
        }



        public IEnumerable<TicketListOpen> GetTicketByUserOpen(int UserId)
        {
            List<TicketListOpen> objListToReturn = new List<TicketListOpen>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = TicketListOpenConstants.const_procHelpTicketDetailByAssignToUser; 
                 base.objSqlCommand.Parameters.AddWithValue(TicketListOpenConstants.const_Field_Mode, "allAddressedOpen");
                base.objSqlCommand.Parameters.AddWithValue(TicketListOpenConstants.const_Field_UserId, UserId);
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
        
                da.Fill(dt);
                DataSet ds = new DataSet();
              

                objListToReturn = VISAutoMapper.ConvertDataTable<TicketListOpen>(dt);
         
            }

            return objListToReturn;
            
        }
        public IEnumerable<TicketListOpen> GetTicketByAllTicket()
        {
            List<TicketListOpen> objListToReturn = new List<TicketListOpen>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = TicketListOpenConstants.const_procHelpTicketDetailByAssignToUser;
                base.objSqlCommand.Parameters.AddWithValue(TicketListOpenConstants.const_Field_Mode, "allAdminOpen");
               
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();

                da.Fill(dt);
                DataSet ds = new DataSet();


                objListToReturn = VISAutoMapper.ConvertDataTable<TicketListOpen>(dt);

            }

            return objListToReturn;

        }

        public IEnumerable<TicketListOpen> GetViewHistory(Int64 Id)
        {
            List<TicketListOpen> objListToReturn = new List<TicketListOpen>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = TicketListOpenConstants.const_procHelpTicketHistory_History;
                base.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_Id, Id);

                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<TicketListOpen>(dt);
            }
            return objListToReturn;

        }


        public IEnumerable<TicketListOpen> GetTicketDetail(Int64 Id)
        {
            List<TicketListOpen> objListToReturn = new List<TicketListOpen>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = TicketListOpenConstants.const_procHelpTicket_SelectById;
                base.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_Id, Id);

                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<TicketListOpen>(dt);
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
