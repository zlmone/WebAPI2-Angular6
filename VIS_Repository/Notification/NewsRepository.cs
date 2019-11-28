using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using VIS_Domain;
using VIS_Domain.Notification;
using System.Net;
using System.Text.RegularExpressions;


namespace VIS_Repository.Notification
{
    public class NewsRepository : VISDbCommand, VISIBaseRepository<News>
    {
        public Int32 intAffectedRecords { get; set; }


        public NewsRepository(string _connectionstring) : base(_connectionstring)
        {
        }

        public string DeleteEntity(Int64 Id)
        {

            try
            {
                string UpdatedBy = string.Empty;
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = NewsConstants.const_procNews_ActiveInActive;
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

        public News GetEntityByID(Int64 entityId)
        {
            News objEntityToReturn = new News();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = NewsConstants.const_procNews_SelectById;
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objEntityToReturn = VISAutoMapper.ConvertDataRow<News>(dt.Rows[0]);
            }
            return objEntityToReturn;
        }



        public IEnumerable<News> GetEntityList()
        {
            List<News> objListToReturn = new List<News>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = NewsConstants.const_procNews_SelectAll;
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<News>(dt);
            }
            return objListToReturn;

        }

        public string AddEntity(News entityObject)
        {
            try
            {
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = NewsConstants.const_procNews_Add;

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(NewsConstants.const_Field_News_Name, entityObject.News_Name);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(NewsConstants.const_Field_Description, entityObject.Description);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(NewsConstants.const_Field_IsNew, entityObject.IsNew);

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

        public string UpdateEntity(News entityObject)
        {
            try
            {
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = NewsConstants.const_procNews_Update;

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_Id, entityObject.Id);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(NewsConstants.const_Field_News_Name, entityObject.News_Name);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(NewsConstants.const_Field_Description, entityObject.Description);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(NewsConstants.const_Field_IsNew, entityObject.IsNew);


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


        public IEnumerable<News> GetViewNews(Int64 Id)
        {
            List<News> objListToReturn = new List<News>();
            List<News> objListToReturn1 = new List<News>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = NewsConstants.const_procNews_View;
                base.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_Id, Id);

                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<News>(dt);
                foreach (var item in objListToReturn)
                {

                    System.Text.RegularExpressions.Regex rx = new System.Text.RegularExpressions.Regex("<[^>]*>");
                    string str = rx.Replace(item.Description, "");
                    System.Text.RegularExpressions.Regex rx1 = new System.Text.RegularExpressions.Regex("&nbsp;");
                    string str1 = rx1.Replace(str, "");
                    objListToReturn1.Add(new News { Description = str1, News_Name = item.News_Name });


                }



            }
            return objListToReturn1;

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
        // ~NewsRepository() {
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
