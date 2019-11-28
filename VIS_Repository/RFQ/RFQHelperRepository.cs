using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VIS_Domain;
using VIS_Domain.RFQ;

namespace VIS_Repository.RFQ
{
   public class RFQHelperRepository : VISDbCommand
    {

        public RFQHelperRepository(string _connectionstring) : base(_connectionstring) { }
        public string GetAuther(string Author)
        {
            string objListToReturn;
            if (objSqlCommand.Connection.ConnectionString == null || objSqlCommand.Connection.ConnectionString == "")
            {
                base.objSqlCommand.Connection.ConnectionString = ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString;
            }
        
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.Parameters.Clear();
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = RFQConstants.const_Field_GetAuthorIdByAuthorName;
                base.objSqlCommand.Parameters.AddWithValue(RFQConstants.const_Field_Author, Author);
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = dt.Rows[0][0].ToString();
            }
            return objListToReturn;
        }
        public string GetFileType(string FileType)
        {
            string objListToReturn;
            if (objSqlCommand.Connection.ConnectionString == null || objSqlCommand.Connection.ConnectionString == "")
            {
                base.objSqlCommand.Connection.ConnectionString = ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString;
            }
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.Parameters.Clear();
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = RFQConstants.const_Field_GetFileTypeIdByFileTypeName;
                base.objSqlCommand.Parameters.AddWithValue(RFQConstants.const_Field_FileType, FileType);
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = dt.Rows[0][0].ToString();
            }
            return objListToReturn;
        }

        public string GetMaxRFQInitialId()
        {
            string objListToReturn;
            if (objSqlCommand.Connection.ConnectionString == null || objSqlCommand.Connection.ConnectionString == "")
            {
                base.objSqlCommand.Connection.ConnectionString = ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString;
            }
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.Parameters.Clear();
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = RFQConstants.const_Field_GetMaxRFQInitialId;
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = dt.Rows[0][0].ToString();
            }
            return objListToReturn;
        }

        public IEnumerable<RFQInitial> GetTechnology()
        {

            List<RFQInitial> objListToReturn = new List<RFQInitial>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = RFQConstants.const_Field_Technology;
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<RFQInitial>(dt);
            }
            return objListToReturn;

        }
        public IEnumerable<RFQInitial> GetFileType()
        {

            List<RFQInitial> objListToReturn = new List<RFQInitial>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = RFQConstants.const_Field_GetFileType;
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<RFQInitial>(dt);
            }
            return objListToReturn;

        }
        public IEnumerable<RFQInitial> GetAuthor()
        {

            List<RFQInitial> objListToReturn = new List<RFQInitial>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = RFQConstants.const_Field_GetAuthor;
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<RFQInitial>(dt);
            }
            return objListToReturn;

        }
        public IEnumerable<RFQDoc> GetRFQDocument()
        {
            List<RFQDoc> objListToReturn = new List<RFQDoc>();
            using (base.objSqlCommand.Connection)
            {
                if (objSqlCommand.Connection.ConnectionString == null || objSqlCommand.Connection.ConnectionString == "")
                {
                    base.objSqlCommand.Connection.ConnectionString = ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString;
                }
                base.objSqlCommand.Parameters.Clear();
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = RFQDocConstant.const_Field_procGetRFQDocument;
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<RFQDoc>(dt);
            }
            return objListToReturn;
        }
        public IEnumerable<RFQLink> GetRFQLink()
        {
            List<RFQLink> objListToReturn = new List<RFQLink>();
            using (base.objSqlCommand.Connection)
            {
                if (objSqlCommand.Connection.ConnectionString == null || objSqlCommand.Connection.ConnectionString == "")
                {
                    base.objSqlCommand.Connection.ConnectionString = ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString;
                }
                base.objSqlCommand.Parameters.Clear();
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = RFQLinkConstant.const_Field_GetRFQLink;
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<RFQLink>(dt);
            }
            return objListToReturn;
        }

        public string GetEmployeeNameById(long Id)
        {
           
            try
            {
                string str = string.Empty;
                if (objSqlCommand.Connection.ConnectionString == null || objSqlCommand.Connection.ConnectionString == "")
                {
                    base.objSqlCommand.Connection.ConnectionString = ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString;
                }
                using (base.objSqlCommand.Connection)
                {
                    base.objSqlCommand.Parameters.Clear();
                    base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                    base.objSqlCommand.CommandText = RFQResponseConstant.const_Field_GetEmployeeNameById;
                    base.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_Id, Id);
                    if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                    {
                        base.objSqlCommand.Connection.Open();
                    }
                    SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                    DataTable dt = new DataTable();
                    da.Fill(dt);
                    str = dt.Rows[0][0].ToString();
                    
                }

                return str;
            }
            catch (Exception ex)
            {

                throw;
            }

        }

        public string GetTechnology(string Id)
        {

            try
            {
                string str = string.Empty;
                if (objSqlCommand.Connection.ConnectionString == null || objSqlCommand.Connection.ConnectionString == "")
                {
                    base.objSqlCommand.Connection.ConnectionString = ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString;
                }
                using (base.objSqlCommand.Connection)
                {
                    base.objSqlCommand.Parameters.Clear();
                    base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                    base.objSqlCommand.CommandText = RFQResponseConstant.const_Field_GetTechnologyNameById;
                    base.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_Id, Id);
                    if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                    {
                        base.objSqlCommand.Connection.Open();
                    }
                    SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                    DataTable dt = new DataTable();
                    da.Fill(dt);
                    str = dt.Rows[0][0].ToString();

                }

                return str;
            }
            catch (Exception ex)
            {

                throw;
            }
        }

    }
}
