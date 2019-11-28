using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VIS_Domain.GeneralHelper
{
    public class SessionValues
    {
        public string UserType { get; set; }
        public long UserId{ get; set; }
    }
    public static class SessionValuesConstant
    {
      
        public const string const_Field_UserType = "UserType";
        public const string const_Field_UserId = "UserId";
    }
}
