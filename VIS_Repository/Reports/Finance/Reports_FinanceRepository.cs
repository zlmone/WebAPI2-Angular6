using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VIS_Repository.Reports.Finance
{
    public class Reports_FinanceRepository : VISDbCommand
    {
        private static Reports_FinanceRepository instance = new Reports_FinanceRepository(string.Empty);
        private Reports_FinanceRepository(string _connectionstring) : base(_connectionstring) { }
        public static Reports_FinanceRepository getInstance()
        {
            return instance;
        }
    }
}
