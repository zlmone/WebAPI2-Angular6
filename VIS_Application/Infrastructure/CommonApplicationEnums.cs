using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VIS_App.Infrastructure
{
    public class CommonApplicationEnums
    {
        public enum ArbManualType
        {
            PerformanceBased = 0,
            Manual = 1
        }

        public enum ArbSubType
        {
            Range = 0,
            Repeated = 1,
            Once
        }
    }
}