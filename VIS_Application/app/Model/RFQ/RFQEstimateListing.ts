export interface IRFQ
{
    RFQInitialId: number;
    OpportunityId: number;
    Title: string;
    InitiatedBy: string;
    DateOfInitiation: Date;
    EstimateBy: string;
    SubmittedOn: Date;
    LastResponseBy: string;
    LastResponseDate: Date;
    ActionRequestedBy: string;
    Status: string;
    rfqStatus: string;
    OtherComments: string;
    CreatedBy: number;
    
    
}
export interface IRFQInitial
{
    Id: number;
    BusinessHeadId: number;
    BusinessManagerId: number;
    UserIdList: number;
    UserId: number;
    Employee_Name: string;
    Source: string;
    ProspectClient: string;
    Title: string;
    DateOfInitiation: Date;
    BusinessTypeId: number;
    BusinessType: string;
    ProjectTypeId: number;
    ProjectType: string;
    IndustryId: number;
    Industries: string; 
    ServiceOfferingId: number;
    ServiceOffering: string;
    SolutionId: number;
    Solution: string;
    TechnologyIdList: number; 
    TechnologyId: number;
    TechnologyName: string;
    Remark: string;
    ResponseRequiredBy: Date;
    SupportedBy: string;
    ConfidenceLevel: number;
    OpportunityStatus: string;
    StatusId: number;
    RFQStatus: string;
    ExpectedClosureDate: Date;
    ResponseRequiredFrom: number;
    CreatedOn: Date;
    CreatedBy: number;
    UpdatedBy: number;
    UpdatedDate: Date;

  

}
export interface IRFQDoc
{
    FileTypeID: number;
    FileType: string;
    FileName: string;
    AuthorId: number;
    Author: string;
    RemarkDoc: string;
}
export interface IRFQDocEntity {
    FileTypeId: number;
    FileType: string;
    FileName: string;
    AuthorId: number;
    Author: string;
    RemarkDoc: string;
}
export interface IRFQLink
{
    RemarkLink: string;
    URL: string;
    UserId: number;
    Password: string;
}
export interface IRFQLinkEntity {
    RemarkLink: string;
    URL: string;
    UserId: number;
    Password: string;
}
export interface ITechnology
{
    TechnologyId: number;
    TechnologyName: string
}
export interface ITechMultiCheckBox
{
    id: number;
    name: string;

}
export interface IEmployee
{
    UserId: number;
    Employee_Name: string;
}
export interface ForSessionData
{
    SessionId: number;
}

export interface ProspectClient
{
    Id: number;
    CompanyName : string
    Country :string
    FilterRadioButton: string;
}
export interface SessionValues
{
    UserType: string;
    UserId: number;
}
