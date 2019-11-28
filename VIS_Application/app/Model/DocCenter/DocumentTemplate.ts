export interface IDocumentTemplateModel
{
    DocTemplateId: number;

    TemplateName: string;

    AddRecurrenceType: boolean;

    IsRecurrence: boolean;

    DateFormat: string;

    TemplateDescription: string;

    IsDownloadWord: boolean;

    IsDownloadPdf: boolean;

    IsDMSPdf: boolean;

    IsDMSWord: boolean;

    IsEmailPdf: boolean;

    IsEmailWord: boolean;

    TemplateRightsData: string;

    IsPortrait: boolean;

    IsSelf: boolean;

    IsBehalf: boolean;

    SharingVariableType: string;

    StartingVariableRole: string;

    AllowHeader: boolean;

    AllowFooter: boolean;

    HeaderContent: string;

    FooterContent: string;

    OwnerId: number;

    ContributorsId: string;

    IsApproved: boolean;

    ApprovedOn: Date;

    IsFinalSubmited: boolean;

    ModuleId: string;

    PublishDate: string;

    stringDate: Date;

    DocRightsId: number;

    ModuleName: string;

    EmployeeName: string;

    DocTemplateInProgressId: number;

    EmployeeId: number;

    CreatedBy: number;
}

export interface IDocumentTemplateViewModel
{
    DocTemplateId: number;
    TemplateName: string;
    OwnerName: string;
    ModuleName: string;
    IsRecurrence: boolean;
    IsSelf: boolean;
    IsBehalf: boolean;
    PublishDate: string;
    ApprovedStatus: string;
    CreatedOn: string;
    IsActive: boolean;
}

export interface IDocTemplateModule
{
    ModuleId: number;
    ModuleName: string;
    ModuleValue: string;
    IsActive: boolean;
}

export interface IDropdownCustomField
{
    TokenName: string;
    TokenValue: string;
    MasterFieldId: number;
}

export interface IDropdownTableField
{
    VariableId: number;
    VarName: string;
    TableName: string;
    FieldName: string;
    ModuleId: number;
    IsActive: boolean;
}




export interface IListItem
{
    value: string;
    text: string;
}

// Step 2 model

export interface IDocMasterFieldDataContract
{
    Id: number;
    FieldName: string;
    FieldDescription: string;
    FieldType: string;
    ListType: string;
    DataSourceTable: string;
    DataSourceColumn: string;
    DataSourceColumnForCustom: string;
    PageContent: string;
    ImageName: string;
    ImageHeight: number;
    ImageWidth: number;
    ImageAlign: string;
    FieldId: string;
    IsCustomField: boolean;
    DocTemplateId: number;
    AttachmentList: string;
    IsNew: boolean;
    IsDelete: boolean;
    CreatedOn: Date;
    CreatedBy: number;
    UpdatedOn: Date;
    UpdatedBy: number;
    IsActive: boolean;
}