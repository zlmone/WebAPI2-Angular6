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
    public class MySkillRepository : VISDbCommand, VISIBaseRepository<MySkill>
    {


        public Int32 intAffectedRecords { get; set; }


        public MySkillRepository(string _connectionstring) : base(_connectionstring)
        {
        }

        public string DeleteEntity(Int64 Id)
        {
            return null;

        }

        public MySkill GetEntityByID(Int64 entityId)
        {
            return null;
        }



        public IEnumerable<MySkill> GetEntityList()
        {
            return null;

        }

        public string AddEntity(MySkill entityObject)
        {
            try
            {
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = MySkillConstants.const_procSkillUser_Add;

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(MySkillConstants.const_Field_UserId, 21);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(MySkillConstants.const_Field_SkillID, entityObject.id);



                if (!objVISDbCommand.objSqlCommand.Parameters.Contains(VISBaseEntityConstants.const_Field_EntityMessage))
                {
                    objVISDbCommand.objSqlCommand.Parameters.Add(AddEntityMessageParameter());
                }
                objVISDbCommand.objSqlCommand.Connection.Open();
                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                objSqlCommand.Connection.Close();
                //return intAffectedRecords >= 1 ? VISBaseEntityConstants.const_Result_Success : VISBaseEntityConstants.const_Result_Failure;
                string strRetValue = intAffectedRecords >= 1 ? VISBaseEntityConstants.const_Result_Success : VISBaseEntityConstants.const_Result_Failure; return strRetValue + objVISDbCommand.objSqlCommand.Parameters[VISBaseEntityConstants.const_Field_EntityMessage].Value.ToString(); ;
            }
            catch (Exception ex)
            {
                return ex.Message + Environment.NewLine + ex.StackTrace;
            }

        }

        public string UpdateEntity(MySkill entityObject)
        {
            return null;
        }




        public IEnumerable<MySkill> GetSkillUserWise(long UserId)
        {
            List<MySkill> objListToReturn = new List<MySkill>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = MySkillConstants.const_procGetMySkill;

                base.objSqlCommand.Parameters.AddWithValue(MySkillConstants.const_Field_mode, "SelectMySkills");


                base.objSqlCommand.Parameters.AddWithValue(MySkillConstants.const_Field_UserId, UserId);
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();

                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<MySkill>(dt);

            }

            return objListToReturn;

        }


        public IEnumerable<MySkill> GetAddNewSkill(long UserId)
        {
            List<MySkill> objListToReturn = new List<MySkill>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = MySkillConstants.const_procGetMySkill;

                base.objSqlCommand.Parameters.AddWithValue(MySkillConstants.const_Field_mode, "AddNewSkillInGrid");


                base.objSqlCommand.Parameters.AddWithValue(MySkillConstants.const_Field_UserId, UserId);
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();

                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<MySkill>(dt);

            }

            return objListToReturn;

        }

        public IEnumerable<MySkill> GetPopupChildSkill()
        {
            List<MySkill> objListToReturn = new List<MySkill>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = MySkillConstants.const_procGetMySkill;

                base.objSqlCommand.Parameters.AddWithValue(MySkillConstants.const_Field_mode, "dropdownGroupBind");



                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();

                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<MySkill>(dt);

            }
             
            return objListToReturn;

        }

        public IEnumerable<MySkill> GetPopupsecondSkill(long lookupSkilId)
        {
            List<MySkill> objListToReturn = new List<MySkill>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = MySkillConstants.const_procGetMySkill;

                base.objSqlCommand.Parameters.AddWithValue(MySkillConstants.const_Field_mode, "dropdownSkillNameBind");

                base.objSqlCommand.Parameters.AddWithValue(MySkillConstants.const_Field_skillgroupid, lookupSkilId);

                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();

                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<MySkill>(dt);

            }

            return objListToReturn;

        }

        public string DeleteSkill(int SkillID, long UserId)
        {
            try
            {
                string UpdatedBy = string.Empty;
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = MySkillConstants.const_procDeleteSkill;
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(MySkillConstants.const_Field_UserId, UserId);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(MySkillConstants.const_Field_SkillID, SkillID);
         
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
        // ~MySkillRepository() {
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
