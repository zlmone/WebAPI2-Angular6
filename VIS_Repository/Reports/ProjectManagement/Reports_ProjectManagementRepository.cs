using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VIS_Repository.Reports.ProjectManagement
{
    public class Reports_ProjectManagementRepository : VISDbCommand
    {
        private static Reports_ProjectManagementRepository instance = new Reports_ProjectManagementRepository(string.Empty);
        private Reports_ProjectManagementRepository(string _connectionstring) : base(_connectionstring) { }
        public static Reports_ProjectManagementRepository getInstance()
        {
            return instance;
        }
    }
}
