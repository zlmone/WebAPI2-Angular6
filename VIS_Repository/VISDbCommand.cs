using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VIS_Domain;
namespace VIS_Repository
{
    public class VISDbCommand : VISDbConnection
    {
        public string CommandName { get; set; }
        public Int32 Timeout { get; set; }
        public SqlCommand objSqlCommand { get; set; }
        public VISDbCommand(string _connectionstring) : base(_connectionstring)
        {
            objSqlCommand = new SqlCommand();
            objSqlCommand.Connection = base.DatabaseConnection;
            objSqlCommand.Connection.ConnectionString = _connectionstring;
            objSqlCommand.CommandTimeout = 24000;
        }

        public SqlParameter AddEntityMessageParameter()
        {
            SqlParameter objSqlEntityMessageParameter = new SqlParameter();
            objSqlEntityMessageParameter.SqlDbType = System.Data.SqlDbType.VarChar;
            objSqlEntityMessageParameter.Size = 1000;
            objSqlEntityMessageParameter.Direction = System.Data.ParameterDirection.Output;
            objSqlEntityMessageParameter.ParameterName = VISBaseEntityConstants.const_Field_EntityMessage;
            objSqlEntityMessageParameter.Value = String.Empty;
            return objSqlEntityMessageParameter;
        }

    }
}
