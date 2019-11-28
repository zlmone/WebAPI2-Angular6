using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VIS_Domain.RFQ
{
    public class RFQGeneral
    {
        public class RFQDoc : VISBaseEntity
        {
            public long FileTypeID { get; set; }
            public string FileType { get; set; }
            public string FileName { get; set; }
            public long AuthorId { get; set; }
            public string Author { get; set; }
            public string RemarkDoc { get; set; }

            public string Remark { get; set; }
            public int RFQ_DocumentID { get; set; }
            public long ReferenceID { get; set; }
            public string OriginalFileName { get; set; }
            public string PopUp { get; set; }
            public Boolean IsResponse { get; set; }

        }
        public static class RFQDocConstant
        {
            /// <summary>
            /// Database table field Name Constants.Industries
            /// </summary>
            /// 
            public const string const_Field_FileTypeID = "FileTypeID";
            public const string const_Field_FileType = "FileType";
            public const string const_Field_FileName = "FileName";
            public const string const_Field_AuthorId = "AuthorId";

            public const string const_Field_Author = "Author";
            public const string const_Field_RemarkDoc = "RemarkDoc";
            public const string const_Field_Remark = "Remark";
            public const string const_Field_RFQ_DocumentID = "RFQ_DocumentID";
            public const string const_Field_ReferenceID = "ReferenceID";
            public const string const_Field_OriginalFileName = "OriginalFileName";
            public const string const_Field_PopUp = "PopUp";
            public const string const_Field_IsResponse = "IsResponse";


            /// <summary>
            /// Procedure
            /// </summary>
            public const string const_Field_procRFQDocument_Add = "procRFQDocument_Add";
        }
        public class RFQLink : VISBaseEntity
        {
            public string RemarkLink { get; set; }
            public string URL { get; set; }
            public long UserId { get; set; }
            public string Password { get; set; }

            public int RFQ_LinkID { get; set; }
            public long ReferenceID { get; set; }
            public string Remark { get; set; }
            public string PopUp { get; set; }
            public Boolean IsResponse { get; set; }


        }
        public static class RFQLinkConstant
        {
            /// <summary>
            /// Database table field Name Constants.Industries
            /// </summary>
            /// 
            public const string const_Field_RemarkLink = "RemarkLink";
            public const string const_Field_URL = "URL";
            public const string const_Field_UserId = "UserId";
            public const string const_Field_Password = "Password";

            public const string const_Field_RFQ_LinkID = "RFQ_LinkID";
            public const string const_Field_ReferenceID = "ReferenceID";
            public const string const_Field_Remark = "Remark";
            public const string const_Field_RFQ_DocumentID = "RFQ_DocumentID";
            public const string const_Field_PopUp = "PopUp";
            public const string const_Field_IsResponse = "IsResponse";

            /// <summary>
            ///procedure
            /// </summary>
            /// 
            public const string const_Field_RFQLink_Add = "procRFQLink_Add";

        }
    }
}
