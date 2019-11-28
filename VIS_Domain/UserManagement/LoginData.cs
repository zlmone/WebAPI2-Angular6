using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VIS_Domain.UserManagement
{
   public class LoginData
    {
        public string VISUsername { get; set; }
        public string VISPassword { get; set; }
        public string UserFullName { get; set; }
        public string LastName { get; set; }
        public Int64 Id { get; set; }
        public string Email { get; set; }
        public string UserType { get; set; }
        public string UserRoleTypeName { get; set; }
        public string[] ArrayUserType { get; set; }
        public bool IsAdmin { get; set; }
        public bool IsLineManager { get; set; }
        public string DepartmentId { get; set; }
        public bool IsOnStypend { get; set; }
        public bool IsFormerEmployee { get; set; }
        public bool IsWebAccess { get; set; }
        public bool validForLogin { get; set; }
        public string WebAccessURL { get; set; }
    }
}
