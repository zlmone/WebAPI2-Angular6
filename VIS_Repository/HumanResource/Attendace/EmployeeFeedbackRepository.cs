using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VIS_Domain;
using VIS_Domain.HumanResource.Attendance;

namespace VIS_Repository.HumanResource.Attendace
{
    public class EmployeeFeedbackRepository : VISDbCommand, VISIBaseRepository<EmployeeFeedback>
    {


        public Int32 intAffectedRecords { get; set; }


        public EmployeeFeedbackRepository(string _connectionstring) : base(_connectionstring)
        {
        }

        public string DeleteEntity(Int64 Id)
        {
            return null;

        }

        public EmployeeFeedback GetEntityByID(Int64 entityId)
        {
            return null;
        }



        public IEnumerable<EmployeeFeedback> GetEntityList()
        {
            return null;

        }

        public string AddEntity(EmployeeFeedback entityObject)
        {
            try
            {
                return null;
                //VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                //objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                //objVISDbCommand.objSqlCommand.CommandText =EmployeeFeedbackConstants.const_procSkillUser_Add;

                //objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmployeeFeedbackConstants.const_Field_UserId, 21);
                //objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmployeeFeedbackConstants.const_Field_SkillID, entityObject.id);



                //if (!objVISDbCommand.objSqlCommand.Parameters.Contains(VISBaseEntityConstants.const_Field_EntityMessage))
                //{
                //    objVISDbCommand.objSqlCommand.Parameters.Add(AddEntityMessageParameter());
                //}
                //objVISDbCommand.objSqlCommand.Connection.Open();
                //intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                //objSqlCommand.Connection.Close();
                ////return intAffectedRecords >= 1 ? VISBaseEntityConstants.const_Result_Success : VISBaseEntityConstants.const_Result_Failure;
                //string strRetValue = intAffectedRecords >= 1 ? VISBaseEntityConstants.const_Result_Success : VISBaseEntityConstants.const_Result_Failure; return strRetValue + objVISDbCommand.objSqlCommand.Parameters[VISBaseEntityConstants.const_Field_EntityMessage].Value.ToString(); ;
            }
            catch (Exception ex)
            {
                return ex.Message + Environment.NewLine + ex.StackTrace;
            }

        }

        public string UpdateEntity(EmployeeFeedback entityObject)
        {
            return null;
        }
        public string UpdateFeedback(Int64 Id)
        {
            try
            {
                string UpdatedBy = string.Empty;
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = EmployeeFeedbackConstants.const_procEmployeeFeedbackAction;
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmployeeFeedbackConstants.const_Field_mode, "Approve");
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmployeeFeedbackConstants.const_Field_Id,Id);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmployeeFeedbackConstants.const_Field_UserId,21);
              
                objVISDbCommand.objSqlCommand.Connection.Open();
                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                objSqlCommand.Connection.Close();
                return intAffectedRecords >= 1 ? VISBaseEntityConstants.const_Result_Success : VISBaseEntityConstants.const_Result_Failure;
            }
            catch (Exception ex)
            {
                return ex.Message + Environment.NewLine + ex.StackTrace;
            }
          
        }


        public string RejectFeedback(Int64 Id)
        {
            try
            {
                string UpdatedBy = string.Empty;
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = EmployeeFeedbackConstants.const_procEmployeeFeedbackAction;
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmployeeFeedbackConstants.const_Field_mode, "Reject");
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmployeeFeedbackConstants.const_Field_Id, Id);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmployeeFeedbackConstants.const_Field_UserId, 21);

                objVISDbCommand.objSqlCommand.Connection.Open();
                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                objSqlCommand.Connection.Close();
                return intAffectedRecords >= 1 ? VISBaseEntityConstants.const_Result_Success : VISBaseEntityConstants.const_Result_Failure;
            }
            catch (Exception ex)
            {
                return ex.Message + Environment.NewLine + ex.StackTrace;
            }

        }
        public IEnumerable<EmployeeFeedback> GetEmployeeFeedbackList(long UserId)
        {
            List<EmployeeFeedback> objListToReturn = new List<EmployeeFeedback>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = EmployeeFeedbackConstants.const_procEmployeeFeedbackDetailUser;

       


                base.objSqlCommand.Parameters.AddWithValue(EmployeeFeedbackConstants.const_Field_UserId, UserId);
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();

               da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<EmployeeFeedback>(dt);

            }

            return objListToReturn;

        }


        public IEnumerable<EmployeeFeedback> GetMyTeam(long UserId)
        {
            List<EmployeeFeedback> objListToReturn = new List<EmployeeFeedback>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = EmployeeFeedbackConstants.const_procEmployeeFeedbackTeamWiseLm;

                base.objSqlCommand.Parameters.AddWithValue(EmployeeFeedbackConstants.const_Field_mode, "MyTeam");

                base.objSqlCommand.Parameters.AddWithValue(EmployeeFeedbackConstants.const_Field_UserId, UserId);
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();

                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<EmployeeFeedback>(dt);

            }

            return objListToReturn;

        }

        public IEnumerable<EmployeeFeedback> GetEmployeewiseSelect(long TeamEmployeeId , long UserId)
        {
            List<EmployeeFeedback> objListToReturn = new List<EmployeeFeedback>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = EmployeeFeedbackConstants.const_procEmployeeFeedbackTeamWiseLm;

                base.objSqlCommand.Parameters.AddWithValue(EmployeeFeedbackConstants.const_Field_mode,"EmployeeWisefilter");

                base.objSqlCommand.Parameters.AddWithValue(EmployeeFeedbackConstants.const_Field_UserId, UserId);

                base.objSqlCommand.Parameters.AddWithValue(EmployeeFeedbackConstants.const_Field_TeamEmployeeId, TeamEmployeeId);

                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();

                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<EmployeeFeedback>(dt);

            }

            return objListToReturn;

        }

        public IEnumerable<EmployeeFeedback> GetEmployeeList(long UserId)
        {
            List<EmployeeFeedback> objListToReturn = new List<EmployeeFeedback>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = EmployeeFeedbackConstants.const_procTeamMemberlist;

                base.objSqlCommand.Parameters.AddWithValue(EmployeeFeedbackConstants.const_Field_UserId, UserId);

                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();

                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<EmployeeFeedback>(dt);

            }

            return objListToReturn;

        }
        public IEnumerable<EmployeeFeedback> GetPendingListEmployee(long UserId)
        {
            List<EmployeeFeedback> objListToReturn = new List<EmployeeFeedback>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = EmployeeFeedbackConstants.const_procEmployeeFeedbackPending;

                base.objSqlCommand.Parameters.AddWithValue(EmployeeFeedbackConstants.const_Field_UserId, UserId);

                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();

                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<EmployeeFeedback>(dt);

            }

            return objListToReturn;

        }

        public string Delete()
        {
            try
            {

                return null;
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
        // ~EmployeeFeedbackRepository() {
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
