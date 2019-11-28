using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VIS_Repository.Reports.Other
{
    public class Reports_OtherRepository : VISDbCommand
    {
        private static Reports_OtherRepository instance = new Reports_OtherRepository(string.Empty);
        private Reports_OtherRepository(string _connectionstring) : base(_connectionstring) { }
        public static Reports_OtherRepository getInstance()
        {
            return instance;
        }
    }
}
