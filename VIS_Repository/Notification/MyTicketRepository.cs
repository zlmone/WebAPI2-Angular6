using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using VIS_Domain;
using VIS_Domain.Notification;

namespace VIS_Repository.Notification
{

    public class MyTicketRepository : VISDbCommand, VISIBaseRepository<MyTicket>
    {

        public Int32 intAffectedRecords { get; set; }


        public MyTicketRepository(string _connectionstring) : base(_connectionstring)
        {

        }




        public string DeleteEntity(Int64 Id)
        {

            try
            {
                string UpdatedBy = string.Empty;
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = MyTicketConstants.const_procHelpTicket_ActiveInActive;
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

        public MyTicket GetEntityByID(Int64 Id)
        {
            MyTicket objEntityToReturn = new MyTicket();

            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = MyTicketConstants.const_procHelpTicketDetailByUser;
                base.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_Id, Id);
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objEntityToReturn = VISAutoMapper.ConvertDataRow<MyTicket>(dt.Rows[0]);
            }
            return objEntityToReturn;
        }

        public IEnumerable<MyTicket> GetEntityList()
        {
            List<MyTicket> objListToReturn = new List<MyTicket>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = MyTicketConstants.const_procHelpTicket_selectAll;
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<MyTicket>(dt);
            }
            return objListToReturn;
        }

        public string AddEntity(MyTicket entityObject)
        {

            try
            {


                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);

                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = MyTicketConstants.const_procHelpTicket_Add;
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(MyTicketConstants.const_Field_Subject, entityObject.Subject);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(MyTicketConstants.const_Field_Message, entityObject.Message);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(MyTicketConstants.const_Field_Remarks, entityObject.Message);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(MyTicketConstants.const_Field_AddressToGroup, entityObject.AddressToGroup);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(MyTicketConstants.const_Field_Priority, entityObject.Priority);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(MyTicketConstants.const_Field_Status, entityObject.Status);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_CreatedBy, 21);


                base.objSqlCommand.CommandType = CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = MyTicketConstants.const_procHelpTicket_ProcHelpTicketAssignToFind;
                base.objSqlCommand.Parameters.AddWithValue(MyTicketConstants.cons_Filed_Organization_id, entityObject.AddressToGroup);
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataSet ds = new DataSet();
                ds.Clear();
                da.Fill(ds);
                base.objSqlCommand.Connection.Close();


                if (ds.Tables[0].Rows.Count > 0 || ds != null)
                {
                    Int64 EmpId = Convert.ToInt64(ds.Tables[0].Rows[0][0]);
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(MyTicketConstants.const_Field_AssignTo, EmpId);
                }



                if (!objVISDbCommand.objSqlCommand.Parameters.Contains(VISBaseEntityConstants.const_Field_EntityMessage))
                {
                    objVISDbCommand.objSqlCommand.Parameters.Add(AddEntityMessageParameter());
                }
                objVISDbCommand.objSqlCommand.Parameters.Add("@HelpTicketId", SqlDbType.Int).Direction = ParameterDirection.Output;




                objVISDbCommand.objSqlCommand.Connection.Open();
                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                long Check = Convert.ToInt64(objVISDbCommand.objSqlCommand.Parameters["@HelpTicketId"].Value);

                
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(MyTicketConstants.cons_Filed_HelpTicketId, Check);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(MyTicketConstants.const_Field_Subject, entityObject.Subject);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(MyTicketConstants.const_Field_Message, entityObject.Message);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(MyTicketConstants.const_Field_Remarks, entityObject.Message);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(MyTicketConstants.const_Field_AddressToGroup, entityObject.AddressToGroup);

                base.objSqlCommand.Parameters.Clear();
                base.objSqlCommand.CommandType = CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = MyTicketConstants.const_procHelpTicket_ProcHelpTicketAssignToFind;
                base.objSqlCommand.Parameters.AddWithValue(MyTicketConstants.cons_Filed_Organization_id, entityObject.AddressToGroup);
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da1 = new SqlDataAdapter(base.objSqlCommand);
                DataSet ds1 = new DataSet();
                ds1.Clear();
                da1.Fill(ds1);
           


                if (ds1.Tables[0].Rows.Count > 0 || ds1 != null)
                {
                    Int64 EmpId = Convert.ToInt64(ds1.Tables[0].Rows[0][0]);
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(MyTicketConstants.const_Field_AssignTo, EmpId);
                }
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(MyTicketConstants.const_Field_Priority, entityObject.Priority);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(MyTicketConstants.const_Field_Status, entityObject.Status);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_CreatedBy, 21);






                if (entityObject.FileName != null)
                {
                  

                    objVISDbCommand.objSqlCommand.Parameters.Clear();
                    objVISDbCommand.objSqlCommand.CommandType = CommandType.StoredProcedure;
                    objVISDbCommand.objSqlCommand.CommandText = MyTicketConstants.const_procHelpTicketAttachement;
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(MyTicketConstants.cons_Filed_HelpTicketId, Check);
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(MyTicketConstants.cons_Filed_FileName, entityObject.FileName);

                    string FileExtension = Path.GetExtension(entityObject.FileName).ToLower();
            

                    Guid guid = Guid.NewGuid();
                    string[] phName = entityObject.FileName.Split('.');
                    string newFileName = guid.ToString().Replace("-", "").ToUpper() + FileExtension;

                    string sFilePath = "upload\\" + newFileName;

                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(MyTicketConstants.cons_Filed_OriginalFileName, newFileName);
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_CreatedBy, 21);

                    objVISDbCommand.objSqlCommand.ExecuteNonQuery();

                }

                if (entityObject.FileName1 != null)
                {
                    objVISDbCommand.objSqlCommand.Parameters.Clear();
                    objVISDbCommand.objSqlCommand.CommandType = CommandType.StoredProcedure;
                    objVISDbCommand.objSqlCommand.CommandText = MyTicketConstants.const_procHelpTicketAttachement;
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(MyTicketConstants.cons_Filed_HelpTicketId, Check);
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(MyTicketConstants.cons_Filed_FileName1, entityObject.FileName1);

                    string FileExtension = Path.GetExtension(entityObject.FileName1).ToLower();


                    Guid guid = Guid.NewGuid();
                    string[] phName = entityObject.FileName1.Split('.');
                    string newFileName = guid.ToString().Replace("-", "").ToUpper() + FileExtension;

                    string sFilePath = "upload\\" + newFileName;
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(MyTicketConstants.cons_Filed_OriginalFileName,newFileName);
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_CreatedBy, 21);

                    objVISDbCommand.objSqlCommand.ExecuteNonQuery();

                }

                if (entityObject.FileName2 != null)
                {
                    objVISDbCommand.objSqlCommand.Parameters.Clear();
                    objVISDbCommand.objSqlCommand.CommandType = CommandType.StoredProcedure;
                    objVISDbCommand.objSqlCommand.CommandText = MyTicketConstants.const_procHelpTicketAttachement;
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(MyTicketConstants.cons_Filed_HelpTicketId, Check);
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(MyTicketConstants.cons_Filed_FileName2, entityObject.FileName2);
                    string FileExtension = Path.GetExtension(entityObject.FileName2).ToLower();


                    Guid guid = Guid.NewGuid();
                    string[] phName = entityObject.FileName2.Split('.');
                    string newFileName = guid.ToString().Replace("-", "").ToUpper() + FileExtension;

                    string sFilePath = "upload\\" + newFileName;
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(MyTicketConstants.cons_Filed_OriginalFileName, newFileName);
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_CreatedBy, 21);

                    objVISDbCommand.objSqlCommand.ExecuteNonQuery();

                }
                //intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                objVISDbCommand.objSqlCommand.Connection.Close();
                return intAffectedRecords >= 1 ? VISBaseEntityConstants.const_Result_Success : VISBaseEntityConstants.const_Result_Failure;
                //string strRetValue = intAffectedRecords >= 1 ? VISBaseEntityConstants.const_Result_Success : VISBaseEntityConstants.const_Result_Failure;
                //return  strRetValue  + objVISDbCommand.objSqlCommand.Parameters[VISBaseEntityConstants.const_Field_EntityMessage].Value.ToString();
            }
            catch (Exception ex)
            {
                return ex.Message + Environment.NewLine + ex.StackTrace;
            }

        }

        public string UpdateEntity(MyTicket entityObject)
        {

            try
            {
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = MyTicketConstants.const_procHelpTicket_update;

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_Id, entityObject.Id);
         
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(MyTicketConstants.const_Field_Remarks,entityObject.Remarks);
              
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(MyTicketConstants.const_Field_Priority, entityObject.Priority);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(MyTicketConstants.const_Field_Status, entityObject.Status);

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
                objVISDbCommand.objSqlCommand.CommandText = MyTicketConstants.const_procHelpTicketMasterLog;
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(MyTicketConstants.cons_Filed_HelpTicketId, entityObject.Id);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(MyTicketConstants.const_Field_Subject, entityObject.Subject);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(MyTicketConstants.const_Field_Remarks, entityObject.Remarks);



                base.objSqlCommand.Parameters.Clear();
                base.objSqlCommand.CommandType = CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = MyTicketConstants.const_procHelpTicket_selectAll;
                base.objSqlCommand.Parameters.AddWithValue(MyTicketConstants.const_Field_Mode, "SelectID");
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
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(MyTicketConstants.const_Field_AssignTo, EmpId);

                    Int64 AdId = Convert.ToInt64(ds1.Tables[0].Rows[0][1]);
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(MyTicketConstants.const_Field_AddressToGroup, AdId);

                    string Message = ds1.Tables[0].Rows[0]["Message"].ToString();

                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(TicketListOpenConstants.const_Field_Message, Message);
                }
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(MyTicketConstants.const_Field_Priority, entityObject.Priority);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(MyTicketConstants.const_Field_Status, entityObject.Status);
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



        public IEnumerable<MyTicket> GetTicketByUser(int CreatedId)
        {
            List<MyTicket> objListToReturn = new List<MyTicket>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = MyTicketConstants.const_procHelpTicketDetailByUser;
                base.objSqlCommand.Parameters.AddWithValue(MyTicketConstants.const_Field_CreatedId, CreatedId);
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<MyTicket>(dt);
            }
            return objListToReturn;
        }




        public IEnumerable<MyTicket> GetDepartmentOrganization()
        {
            List<MyTicket> objListToReturn = new List<MyTicket>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = MyTicketConstants.const_procHelpTicketMaster_DepartmentHelpTicketDll;
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<MyTicket>(dt);
            }
            return objListToReturn;

        }


        public IEnumerable<MyTicket> GetViewHistory(Int64 Id)
        {
            List<MyTicket> objListToReturn = new List<MyTicket>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = MyTicketConstants.const_procHelpTicketHistory_History;
                base.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_Id, Id);

                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<MyTicket>(dt);
            }
            return objListToReturn;

        }


        public IEnumerable<MyTicket> GetTicketDetail(Int64 Id)
        {
            List<MyTicket> objListToReturn = new List<MyTicket>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = MyTicketConstants.const_procHelpTicket_SelectById;
                base.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_Id, Id);

                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<MyTicket>(dt);
            }
            return objListToReturn;

        }

        public SqlParameter AddHelpTicket()
        {
            SqlParameter objSqlIdparameter = new SqlParameter();
            objSqlIdparameter.SqlDbType = System.Data.SqlDbType.BigInt;

            objSqlIdparameter.Direction = System.Data.ParameterDirection.Output;
            objSqlIdparameter.ParameterName = MyTicketConstants.cons_Filed_HelpTicketId;
            objSqlIdparameter.Value = String.Empty;
            return objSqlIdparameter;
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
