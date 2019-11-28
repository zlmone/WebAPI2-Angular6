using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VIS_Repository.Reports.Opinion
{
    public class Reports_OpinionRepository : VISDbCommand
    {
        private static Reports_OpinionRepository instance = new Reports_OpinionRepository(string.Empty);
        private Reports_OpinionRepository(string _connectionstring) : base(_connectionstring) { }
        public static Reports_OpinionRepository getInstance()
        {
            return instance;
        }
    }
}
