using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VIS_Repository.Reports.ContactManagement
{
    public class Reports_ContactManagementRepository : VISDbCommand
    {
        private static Reports_ContactManagementRepository instance = new Reports_ContactManagementRepository(string.Empty);
        private Reports_ContactManagementRepository(string _connectionstring) : base(_connectionstring) { }
        public static Reports_ContactManagementRepository getInstance()
        {
            return instance;
        }
    }
}
