using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VIS_Domain
{
    public class VISBaseEntity
    {
        /// <summary>
        /// Base entity fields.
        /// </summary>
        public Int64 Id { get; set; }
        public Int64 CompanyId { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime UpdatedOn { get; set; }
        public Int64 CreatedBy { get; set; }
        public Int64 UpdatedBy { get; set; }        
        public bool IsActive { get; set; }
        public bool EntityMessage { get; set; }
    }
    public static class VISBaseEntityConstants 
    {
        /// <summary>
        /// Base Entity Constants.
        /// </summary>
        public const string const_Field_Id = "Id";
        public const string const_Field_IsActive = "IsActive";
        public const string const_Field_CreatedOn = "CreatedOn";
        public const string const_Field_UpdatedOn = "UpdatedOn";
        public const string const_Field_CompanyId = "CompanyId";
        public const string const_Field_CreatedBy = "CreatedBy";
        public const string const_Field_UpdatedBy = "UpdatedBy";
        public const string const_Field_EntityMessage = "EntityMessage";
        public const string const_Result_Success = "Success: ";
        public const string const_Result_Failure = "Failure: ";
       
    }
}
