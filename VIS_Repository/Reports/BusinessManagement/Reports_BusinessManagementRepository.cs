using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VIS_Repository.Reports.BusinessManagement
{
    public class Reports_BusinessManagementRepository : VISDbCommand
    {
        public string ConnectionString { get; set; }
        private static Reports_BusinessManagementRepository instance = new Reports_BusinessManagementRepository(string.Empty);
        private Reports_BusinessManagementRepository(string _connectionstring) : base(_connectionstring)
        {
        }

        public static Reports_BusinessManagementRepository getInstance()
        {
            return instance;
        }
    }
}
