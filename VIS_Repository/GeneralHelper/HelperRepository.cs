using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VIS_Domain.Masters.EmployeeLevels;
using VIS_Domain.Master;
using VIS_Domain.Master.CompanyRelated;
using VIS_Repository.Masters;
using VIS_Domain;
using System.Configuration;
using VIS_Domain.RFQ;

namespace VIS_Repository.GeneralHelper
{
    public class HelperRepository : VISDbCommand
    {

        public Int32 intAffectedRecords { get; set; }


        public HelperRepository(string _connectionstring) : base(_connectionstring)
        {

        }
        public string GetEmpIdByCommunicationId(string CommunicationId)
        {
            string objEntityToReturn = string.Empty;
            try
            {
                    if (objSqlCommand.Connection.ConnectionString == null || objSqlCommand.Connection.ConnectionString == "")
                    {
                        base.objSqlCommand.Connection.ConnectionString = ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString;
                    }
                    objSqlCommand.Parameters.Clear();
                    objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                    objSqlCommand.CommandText = RFQConstants.const_Field_GetEmployeeIdByCommunicationId;
                    objSqlCommand.Parameters.AddWithValue(RFQConstants.const_Field_CommunicationId, CommunicationId);
                    if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                    {
                        base.objSqlCommand.Connection.Open();
                    }
                    string objListToReturn;
                    SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                    DataTable dt = new DataTable();
                    dt.Clear();
                    da.Fill(dt);
                    objListToReturn = dt.Rows[0][0].ToString();
                    objSqlCommand.Connection.Close();
                    return objListToReturn;
            }
            
            catch (Exception ex)
            {

            }
            return objEntityToReturn;
        }
    }
}
