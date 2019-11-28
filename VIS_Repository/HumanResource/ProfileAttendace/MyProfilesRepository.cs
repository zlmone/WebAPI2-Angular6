using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using VIS_Domain.HumanResource.MyProfiles;

namespace VIS_Repository.HumanResource.ProfileAttendace
{

    public class MyProfilesRepository : VISDbCommand, VISIBaseRepository<MyProfiles>
    {

        public Int32 intAffectedRecords { get; set; }
     

        public MyProfilesRepository(string _connectionstring) : base(_connectionstring)
        {

        }




        public string DeleteEntity(Int64 Id)
        {

            return null;
        }

        public MyProfiles GetEntityByID(Int64 Id)
        {

            return null;
        }

        public IEnumerable<MyProfiles> GetEntityList()
        {

            return null; ;
        }

        public string AddEntity(MyProfiles entityObject)
        {

            return null;


        }

        public string UpdateEntity(MyProfiles entityObject)
        {

            return null;
        }



        public IEnumerable<MyProfiles> GetProfileByUser(long UserId)
        {
            List<MyProfiles> objListToReturn = new List<MyProfiles>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = MyProfilesConstants.const_procGetUserProfile;
               
                base.objSqlCommand.Parameters.AddWithValue(MyProfilesConstants.const_Field_Mode, "ProFileUser");
                

                base.objSqlCommand.Parameters.AddWithValue(MyProfilesConstants.const_Field_UserId, UserId);
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();

                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<MyProfiles>(dt);

            }

            return objListToReturn;

        }


        public IEnumerable<MyProfiles> GetEducationUser(long UserId)
        {
            List<MyProfiles> objListToReturn = new List<MyProfiles>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = MyProfilesConstants.const_procGetUserProfile;

                base.objSqlCommand.Parameters.AddWithValue(MyProfilesConstants.const_Field_Mode, "EducationUser");


                base.objSqlCommand.Parameters.AddWithValue(MyProfilesConstants.const_Field_UserId, UserId);
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();

                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<MyProfiles>(dt);

            }

            return objListToReturn;

        }

        public IEnumerable<MyProfiles> GetEmployeeList()
        {
            List<MyProfiles> objListToReturn = new List<MyProfiles>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = MyProfilesConstants.const_procGetEmployeeList;


          
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();

                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<MyProfiles>(dt);

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
