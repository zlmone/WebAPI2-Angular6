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
    public class MyTeamRepository : VISDbCommand, VISIBaseRepository<MyTeam>
    {


        public Int32 intAffectedRecords { get; set; }


        public MyTeamRepository(string _connectionstring) : base(_connectionstring)
        {
        }

        public string DeleteEntity(Int64 Id)
        {
            return null;

        }

        public MyTeam GetEntityByID(Int64 entityId)
        {
            return null;
        }



        public IEnumerable<MyTeam> GetEntityList()
        {
            return null;

        }

        public string AddEntity(MyTeam entityObject)
        {
            try
            {
                return null;
                //VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                //objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                //objVISDbCommand.objSqlCommand.CommandText = MyTeamConstants.const_procSkillUser_Add;

                //objVISDbCommand.objSqlCommand.Parameters.AddWithValue(MyTeamConstants.const_Field_UserId, 21);
                //objVISDbCommand.objSqlCommand.Parameters.AddWithValue(MyTeamConstants.const_Field_SkillID, entityObject.id);



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

        public string UpdateEntity(MyTeam entityObject)
        {
            return null;
        }




        public IEnumerable<MyTeam> GetMyTeamList(long UserId)
        {
            List<MyTeam> objListToReturn = new List<MyTeam>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = MyTeamConstants.const_procGetMyTeam_List;

                base.objSqlCommand.Parameters.AddWithValue(MyTeamConstants.const_Field_mode,"MyTeam");


                base.objSqlCommand.Parameters.AddWithValue(MyTeamConstants.const_Field_UserId, UserId);
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();

                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<MyTeam>(dt);

            }

            return objListToReturn;

        }

        public IEnumerable<MyTeam> GetHoverPopup(long UserId)
        {
            List<MyTeam> objListToReturn = new List<MyTeam>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = MyTeamConstants.const_procGetMyTeam_List;

                base.objSqlCommand.Parameters.AddWithValue(MyTeamConstants.const_Field_mode, "HoverPopUpSkill");


                base.objSqlCommand.Parameters.AddWithValue(MyTeamConstants.const_Field_UserId, UserId);
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();

                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<MyTeam>(dt);

            }

            return objListToReturn;

        }

        public IEnumerable<MyTeam> GetLinemanager(long id)
        {
            List<MyTeam> objListToReturn = new List<MyTeam>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = MyTeamConstants.const_procgetLinemanager;

                base.objSqlCommand.Parameters.AddWithValue(MyTeamConstants.const_Field_mode, "ApprovedSkill");


                base.objSqlCommand.Parameters.AddWithValue(MyTeamConstants.const_Field_UserId, id);
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();

                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<MyTeam>(dt);

            }

            return objListToReturn;

        }

        public IEnumerable<MyTeam> GetSkill(long SkillID)
        {
            List<MyTeam> objListToReturn = new List<MyTeam>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

                base.objSqlCommand.CommandText = MyTeamConstants.const_procSkillLeavel;

                base.objSqlCommand.Parameters.AddWithValue(MyTeamConstants.const_Field_SkillID, SkillID);



                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();

                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<MyTeam>(dt);

            }

            return objListToReturn;

        }
        public string DeleteSkill(int SkillID, long UserId)
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
        // ~MyTeamRepository() {
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
