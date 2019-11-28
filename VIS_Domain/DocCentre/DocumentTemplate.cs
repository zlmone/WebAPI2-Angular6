using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VIS_Domain.DocCentre
{
    public class DocumentTemplateModel : VISBaseEntity
    {
            public Int64 DocTemplateId { get; set; }

            public string TemplateName { get; set; }

            public bool AddRecurrenceType { get; set; }

            public bool IsRecurrence { get; set; }

            public string DateFormat { get; set; }

            public string TemplateDescription { get; set; }

            public bool IsDownloadWord { get; set; }

            public bool IsDownloadPdf { get; set; }

            public bool IsDMSPdf { get; set; }

            public bool IsDMSWord { get; set; }

            public bool IsEmailPdf { get; set; }

            public bool IsEmailWord { get; set; }

            public string TemplateRightsData { get; set; }

            public bool IsPortrait { get; set; }

            public bool IsSelf { get; set; }

            public bool IsBehalf { get; set; }

            public string SharingVariableType { get; set; }

            public string StartingVariableRole { get; set; }

            public bool AllowHeader { get; set; }

            public bool AllowFooter { get; set; }

            public string HeaderContent { get; set; }

            public string FooterContent { get; set; }

            public Int64 OwnerId { get; set; }

            public string ContributorsId { get; set; }

            public bool IsApproved { get; set; }

            public DateTime? ApprovedOn { get; set; }

            public bool IsFinalSubmited { get; set; }

            public string ModuleId { get; set; }

            public string PublishDate { get; set; }

            public DateTime? stringDate { get; set; }

            public Int64 DocRightsId { get; set; }

            public string ModuleName { get; set; }

            public string EmployeeName { get; set; }

            public Int64 DocTemplateInProgressId { get; set; }

            public int EmployeeId { get; set; }
        
    }

    public class DocMasterFieldDataContract : VISBaseEntity
    {
        public string FieldName { get; set; }

        public string FieldDescription { get; set; }

        public string FieldType { get; set; }

        public string ListType { get; set; }

        public string DataSourceTable { get; set; }

        public string DataSourceColumn { get; set; }

        public string PageContent { get; set; }

        public string ImageName { get; set; }

        public Int32? ImageHeight { get; set; }

        public Int32? ImageWidth { get; set; }

        public string ImageAlign { get; set; }

        public string FieldId { get; set; }

        public bool? IsCustomField { get; set; }
        
        public Int64? DocTemplateId { get; set; }

        public string AttachmentList { get; set; }

        public bool? IsNew { get; set; }

        public bool? IsDelete { get; set; }

    }

    public class DocumentTemplateViewModel : VISBaseEntity
    {
        public Int64 DocTemplateId { get; set; }
        public string TemplateName { get; set; }
        public string OwnerName { get; set; }
        public string ModuleName { get; set; }
        public bool IsRecurrence { get; set; }
        public bool IsSelf { get; set; }
        public bool IsBehalf { get; set; }
        public string PublishDate { get; set; }
        public string ApprovedStatus { get; set; }
    }

    public class DocTemplateModule : VISBaseEntity
    {
        public Int64 ModuleId { get; set; }
        public string ModuleName { get; set; }
        public string ModuleValue { get; set; }
    }

    public static class DocumentTemplateViewModelConstant
    {
        /// <summary>
        /// Database table name constant.
        /// </summary>

        public const string const_DocTemplate_Table = "DocTemplate";
        public const string const_DocTemplateModule = "DocTemplateModule";

        //Constant For Add & Edit Paramter Step 1

        public const string const_Id = "Id";
        public const string const_mode = "mode";
        public const string const_DocTemplateId = "DocTemplateId";
        public const string const_TemplateName = "TemplateName";
        public const string const_TemplateDescription = "TemplateDescription";
        public const string const_ModuleId = "ModuleId";
        public const string const_IsRecurrence = "IsRecurrence";
        public const string const_IsSelf = "IsSelf";
        public const string const_IsBehalf = "IsBehalf";
        public const string const_SharingVariableType = "SharingVariableType";
        public const string const_StartingVariableRole = "StartingVariableRole";
        public const string const_IsDownloadWord = "IsDownloadWord";
        public const string const_IsDownloadPdf = "IsDownloadPdf";
        public const string const_IsDMSPdf = "IsDMSPdf";
        public const string const_IsDMSWord = "IsDMSWord";
        public const string const_IsEmailPdf = "IsEmailPdf";
        public const string const_IsEmailWord = "IsEmailWord";
        public const string const_DateFormat = "DateFormat";
        public const string const_IsPortrait = "IsPortrait";
        public const string const_IsApproved = "IsApproved";
        public const string const_ApprovedOn = "ApprovedOn";
        public const string const_IsFinalSubmited = "IsFinalSubmited";
        public const string const_OwnerId = "OwnerId";
        public const string const_CreatedBy = "CreatedBy";
        public const string const_UpdatedBy = "UpdatedBy";

        /// <summary>
        /// Store procedure Parameter Name Constants.
        /// </summary>
        /// 

            
        public const string const_PageIndex = "PageIndex";
        public const string const_PageSize = "PageSize";
        public const string const_SortBy = "SortBy";
        public const string const_SortOrder = "SortOrder";
        public const string const_SearchField = "SearchField";
        public const string const_SearchText = "SearchText";
        public const string const_IsShowAll = "IsShowAll";
        public const string const_EmployeeId = "EmployeeId";
        public const string const_EmployeeRole = "EmployeeRole";
        public const string const_ApprovedStatus = "ApprovedStatus";

        //Constant For Add & Edit Paramter Step 2

        public const string const_TableName = "TableName";

        /// <summary>
        /// Database Procedure and fucntion constants.
        /// </summary>

        public const string const_procDOC_GetAllDocumentTemplate = "procDOC_GetAllDocumentTemplate";
        public const string const_procGetAllModule = "procGetAllModule";
        public const string const_procDocumentTemplateAddEditStep1 = "procDocumentTemplateAddEditStep1";
        public const string const_procDocumentTemplateGetById = "procDocumentTemplateGetById";
        public const string const_procDocumentTemplateActiveInActive = "procDocumentTemplateActiveInActive";

        // Step 2 Store Procedures 

        public const string const_procDocMasterFieldAddEdit = "procDocMasterFieldAddEdit";
        public const string const_procDocMasterFieldActiveInActive = "procDocMasterFieldActiveInActive";
        public const string const_procDocMasterFieldSelectByDocTempId = "procDocMasterFieldSelectByDocTempId";
        public const string const_procDocMasterFieldSelectById = "procDocMasterFieldSelectById";
        public const string const_procGetMaxDocId = "procGetMaxDocId";
        public const string const_procDOC_GetCustomTokenList = "procDOC_GetCustomTokenList";
        public const string const_procGetDocTemplateModuleVariables = "procGetDocTemplateModuleVariables";




        // Step 2 Constant Parameter

        
        public const string const_FieldName = "FieldName";
        public const string const_FieldDescription = "FieldDescription";
        public const string const_FieldType = "FieldType";
        public const string const_ListType = "ListType";
        public const string const_DataSourceTable = "DataSourceTable";
        public const string const_DataSourceColumn = "DataSourceColumn";
        public const string const_PageContent = "PageContent";
        public const string const_ImageName = "ImageName";
        public const string const_ImageHeight = "ImageHeight";
        public const string const_ImageWidth = "ImageWidth";
        public const string const_ImageAlign = "ImageAlign";
        public const string const_FieldId = "FieldId";
        public const string const_IsCustomField = "IsCustomField";
        public const string const_AttachmentList = "AttachmentList";



        // Step 3 Constant For Parameter

        public const string const_MasterFieldId = "MasterFieldId";
        

        // Step 3 Store Proecedure

        public const string const_procDeleteDocMasterFieldByDocTempId = "procDeleteDocMasterFieldByDocTempId";
        public const string const_procDeleteDocFormBuilder = "procDeleteDocFormBuilder";
        public const string const_procDocFormBuilderAdd = "procDocFormBuilderAdd";
        public const string const_procDocMasterFieldPageLineBreakAdd = "procDocMasterFieldPageLineBreakAdd";
        public const string const_procBindDocumentContainer = "procBindDocumentContainer";
        


    }


}
