using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VIS_Repository.Reports.Payroll
{
    public class Reports_PayrollRepository : VISDbCommand
    {
        private static Reports_PayrollRepository instance = new Reports_PayrollRepository(string.Empty);
        private Reports_PayrollRepository(string _connectionstring) : base(_connectionstring) { }
        public static Reports_PayrollRepository getInstance()
        {
            return instance;
        }
    }
}
