using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VIS_Repository.Reports.EmployeeLevels
{
    public class Reports_EmployeeLevelsRepository : VISDbCommand
    {
        private static Reports_EmployeeLevelsRepository instance = new Reports_EmployeeLevelsRepository(string.Empty);
        private Reports_EmployeeLevelsRepository(string _connectionstring) : base(_connectionstring) { }
        public static Reports_EmployeeLevelsRepository getInstance()
        {
            return instance;
        }
    }
}
