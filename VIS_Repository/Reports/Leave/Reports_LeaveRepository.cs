using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VIS_Repository.Reports.Leave
{
    public class Reports_LeaveRepository : VISDbCommand
    {
        private static Reports_LeaveRepository instance = new Reports_LeaveRepository(string.Empty);
        private Reports_LeaveRepository (string _connectionstring) : base(_connectionstring) { }
        public static Reports_LeaveRepository getInstance()
        {
            return instance;
        }
    }
}
