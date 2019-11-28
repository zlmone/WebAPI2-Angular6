using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VIS_Repository
{
    public class VISDbConnection 
    {
        protected SqlConnection DatabaseConnection { get; set; }
        
        public VISDbConnection(String _connectionstring)
        {
            try
            {
                DatabaseConnection = new SqlConnection(_connectionstring);
                
            }
            catch
            {
                throw;
            }
        }
        
        //~VISDbConnection()
        //{
        //    SqlConnection.ClearPool(DatabaseConnection);
           
            
            
        //}
    }
}
