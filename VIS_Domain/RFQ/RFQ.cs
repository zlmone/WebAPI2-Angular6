using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VIS_Domain.GeneralHelper;

namespace VIS_Domain.RFQ
{
    public class RFQList : VISBaseEntity
    {
        public long RFQInitialId { get; set; }
        public long OpportunityId { get; set; }
        public string Title { get; set; }
        public string InitiatedBy { get; set; }
        public DateTime DateOfInitiation { get; set; }
        public string EstimateBy { get; set; }
        public DateTime SubmittedOn { get; set; }
        public string LastResponseBy { get; set; }
        public Nullable<DateTime> LastResponseDate { get; set; }
        public string ActionRequestedBy { get; set; }
        public string Status { get; set; }
        public string rfqStatus { get; set; }
        public string OtherComments { get; set; }
        public string CommunicationId { get; set; }
        public string CreatedByName { get; set; }
        public long EmpId { get; set; }
        public string Mode { get; set; }
        public string Industries { get; set; }

    }
    public class RFQOpportunity : VISBaseEntity
    {
        public long BDHead { get; set; }
        public long BDManager { get; set; }
        public DateTime DateOfInitiation { get; set; }
        public int ProspectId { get; set; }
        public int BillingClient { get; set; }
        public int BussinessType { get; set; }
        public int BussTechArea { get; set; }
        public string OpportunityName { get; set; }
        public int ProjectType { get; set; }
        public int Industry { get; set; }
        public int serviceOffering { get; set; }
        public int Solution { get; set; }
        public int TechBody { get; set; }
        public int EstimationDoneBy { get; set; }
        public string ExactTech { get; set; }
        public DateTime NextCallDate { get; set; }
        public DateTime TentativeOppClosureDate { get; set; }
        public DateTime TentativeStartDate { get; set; }
        public DateTime TentativeEndDate { get; set; }
        public double ExpectedNoResource { get; set; }
        public string Duration { get; set; }
        public float TotalProjectHrs { get; set; }
        public int Currency { get; set; }
        public double Rate { get; set; }
        public int TotalValue { get; set; }
        public string TimeTakenEstimate { get; set; }
        public string Confidence { get; set; }
        public string Status { get; set; }
        public double PlaningPriority { get; set; }
        public DateTime ClosureDate { get; set; }
        public string OtherComments { get; set; }
        public Boolean IsProject { get; set; }
        public int CreatedName { get; set; }
        public int UpdatedName { get; set; }
        public Boolean IsDeleted { get; set; }
        public int ProjectId { get; set; }
    }
    public static class RFQOpportunityConstant
    {
        public const string const_Field_BDHead = "BDHead";
        public const string const_Field_BDManager = "BDManager";
        public const string const_Field_DateOfInitiation = "DateOfInitiation";
        public const string const_Field_ProspectId = "ProspectId";
        public const string const_Field_BillingClient = "BillingClient";
        public const string const_Field_BussinessType = "BussinessType";
        public const string const_Field_BussTechArea = "BussTechArea";
        public const string const_Field_OpportunityName = "OpportunityName";
        public const string const_Field_ProjectType = "ProjectType";
        public const string const_Field_Industry = "Industry";
        public const string const_Field_serviceOffering = "serviceOffering";
        public const string const_Field_Solution = "Solution";
        public const string const_Field_TechBody = "TechBody";
        public const string const_Field_EstimationDoneBy = "EstimationDoneBy";
        public const string const_Field_ExactTech = "ExactTech";
        public const string const_Field_NextCallDate = "NextCallDate";
        public const string const_Field_TentativeOppClosureDate = "TentativeOppClosureDate";
        public const string const_Field_TentativeStartDate = "TentativeStartDate";
        public const string const_Field_TentativeEndDate = "TentativeEndDate";
        public const string const_Field_ExpectedNoResource = "ExpectedNoResource";
        public const string const_Field_Duration = "Duration";
        public const string const_Field_TotalProjectHrs = "TotalProjectHrs";
        public const string const_Field_Currency = "Currency";
        public const string const_Field_Rate = "Rate";
        public const string const_Field_TotalValue = "TotalValue";
        public const string const_Field_TimeTakenEstimate = "TimeTakenEstimate";
        public const string const_Field_Confidence = "Confidence";
        public const string const_Field_Status = "Status";
        public const string const_Field_PlaningPriority = "PlaningPriority";
        public const string const_Field_ClosureDate = "ClosureDate";
        public const string const_Field_OtherComments = "OtherComments";
        public const string const_Field_IsProject = "IsProject";
        public const string const_Field_CreatedName = "CreatedName";
        public const string const_Field_UpdatedName = "UpdatedName";
        public const string const_Field_IsDeleted = "IsDeleted";
        public const string const_Field_ProjectId = "ProjectId";

        /////
        ///Stored Procedure
        ////
        public const string const_Field_SaveOpportunity = "procOpportunity_Add";
    }
    public class RFQInitial : VISBaseEntity
    {
        /// <summary>
        /// /RFQ initial
        /// </summary>
        /// 
        public long BusinessManagerId { get; set; }
        public long BusinessHeadId { get; set; }
        public string Employee_Name { get; set; }
        public long BusinessTypeId { get; set; }
        public string BusinessType { get; set; }
        public long ProjectTypeId { get; set; }
        public string ProjectType { get; set; }
        public long ServiceOfferingId { get; set; }
        public string ServiceOffering { get; set; }
        public long SolutionId { get; set; }
        public string Solution { get; set; }
        public long FileTypeId { get; set; }
        public string FileType { get; set; }
        public long IndustryId { get; set; }
        public string Industries { get; set; }
        public long AuthorId { get; set; }
        public string Author { get; set; }
        public long TechnologyId { get; set; }
        public List<long> TechnologyIdList { get; set; }
        public string TechnologyName { get; set; }
        public string Remark { get; set; }
        public DateTime ResponseRequiredBy { get; set; }
        public long ResponseRequiredFrom { get; set; }
        public string SupportedBy { get; set; }
        public int ConfidenceLevel { get; set; }
        public string OpportunityStatus { get; set; }
        public long StatusId { get; set; }
        public string RFQStatus { get; set; }
        public DateTime ExpectedClosureDate { get; set; }
        public long UserId { get; set; }
        public List<long> UserIdList { get; set; }
        public string ProspectClient { get; set; }
        public int MyProperty { get; set; }
        public string Company { get; set; }
        public string Title { get; set; }
        public string Source { get; set; }
        public DateTime DateOfInitiation { get; set; }

        /////
        ///Stored Procedure
        ////
        public const string const_Field_SaveOpportunity = "procOpportunity_Add";
    }
    public class RFQInitialBase : VISBaseEntity
    {
        public int RFQID { get; set; }
        public int OpportunityID { get; set; }
        public DateTime SubmittedOn { get; set; }
        public string WatchBy { get; set; }
        public string ResponseRequired { get; set; }
        public int Source { get; set; }
        public long Status { get; set; }

    }
    public static class RFQInitialBaseConstant
    {
        public const string const_Field_RFQID = "RFQID";
        public const string const_Field_OpportunityID = "OpportunityID";
        public const string const_Field_SubmittedOn = "SubmittedOn";
        public const string const_Field_WatchBy = "WatchBy";
        public const string const_Field_ResReq = "ResponseRequired";
        public const string const_Field_Source = "Source";
        public const string const_Field_Status = "Status";

        /////
        ///procedure
        ////
        public const string const_Field_GetMaxOpportunityId = "GetMaxOpportunityId";
        public const string const_Field_RFQInitial_Add = "procRFQInitial_Add";

    }
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
        public const string const_Field_procGetRFQDocument = "procGetRFQDocument";
    }
    public class RFQLink : VISBaseEntity
    {
        public string RemarkLink { get; set; }
        public string URL { get; set; }
        public string UserId { get; set; }
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
        public const string const_Field_GetRFQLink = "procGetRFQLink";

    }
    public class SessionData
    {
        public long SessionId { get; set; }
    }
    public class MainRFQInitial
    {
        public SessionData SessionData { get; set; }
        public RFQInitial RFQInitial { get; set; }
        public List<RFQDoc> RFQDoc { get; set; }
        public List<RFQLink> RFQLink { get; set; }
    }
    public static class RFQConstants
    {
        /// <summary>
        /// Database table field Name Constants.Industries
        /// </summary>
        /// 
        public const string const_Field_Company = "Company";
        public const string const_Field_RFQInitialId = "RFQInitialId";
        public const string const_Field_OpportunityId = "OpportunityId";
        public const string const_Field_Title = "Title";
        public const string const_Field_InitiatedBy = "InitiatedBy";
        public const string const_Field_DateOfInitiation = "DateOfInitiation";
        public const string const_Field_EstimateBy = "EstimateBy";
        public const string const_Field_SubmittedOn = "SubmittedOn";
        public const string const_Field_LastResponseBy = "LastResponseBy";
        public const string const_Field_LastResponseDate = "LastResponseDate";
        public const string const_Field_ActionRequestedBy = "ActionRequestedBy";
        public const string const_Field_Status = "Status";
        public const string const_Field_rfqStatus = "rfqStatus";
        public const string const_Field_OtherComments = "OtherComments";
        public const string const_Field_CommunicationId = "CommunicationId";
        public const string const_Field_EmpId = "EmpId";
        public const string const_Field_Mode = "Mode";

        public const string const_Field_BusinessManagerId = "BusinessManagerId";
        public const string const_Field_BusinessHeadId = "Employee_Name";
        public const string const_Field_Employee_Name = "Employee_Name";
        public const string const_Field_BusinessType = "BusinessType";
        public const string const_Field_ProjectType = "ProjectType";
        public const string const_Field_Industries = "Industries";
        public const string const_Field_FileType = "FileType";
        public const string const_Field_Author = "Author";


        public const string const_Field_Employee_FileName = "FileName";

        public const string const_Field_RemarkDoc = "RemarkDoc";
        public const string const_Field_RemarkLink = "RemarkLink";
        public const string const_Field_URL = "URL";
        public const string const_Field_UserId = "UserId";
        public const string const_Field_Password = "Password";





        /// <summary>
        /// Database Procedure and fucntion constants
        /// </summary>
        /// 
        public const string const_Field_RFQEstimateList = "procRFQEstimateListingPerPage";
        public const string const_Field_GetEmployeeIdByCommunicationId = "procGetEmployeeIdByCommunicationId";

        /////
        ///RFQ inital
        /////
        public const string const_Field_FillBusinessHead = "procFillBusinessHead";
        public const string const_Field_GetBusinessManager = "procGetBusinessManager";
        public const string const_Field_GetBusinessType = "procGetBusinessType";
        public const string const_Field_GetProjectType = "procGetProjectType";
        public const string const_Field_GetIndustries = "procGetIndustries";
        public const string const_Field_GetSolution = "procGetSolution";
        public const string const_Field_GetServiceOffering = "procGetServiceOffering";
        public const string const_Field_GetFileType = "procGetFileType";
        public const string const_Field_GetAuthor = "procGetAuthor";
        public const string const_Field_Technology = "procGetTechnology";
        public const string const_Field_GetRFQStatus = "procGetStatus";
        public const string const_Field_GetEmployee = "procGetEmployeeList";

        public const string const_Field_GetCompanyByClientProspect = "procGetCompanyByClientProspect";

        /////
        ///RFQ Doc 
        /////
        public const string const_Field_GetAuthorIdByAuthorName = "procGetAuthorIdByAuthorName";
        public const string const_Field_GetFileTypeIdByFileTypeName = "procGetFileTypeIdByFileTypeName";
        public const string const_Field_GetMaxRFQInitialId = "procGetMaxRFQInitialId";
        public const string const_Field_procRFQDocument_Add = "procRFQDocument_Add";
    }
    public class ProspectClient
    {
        public long Id { get; set; }
        public string CompanyName { get; set; }
        public string Country { get; set; }
        public string FilterRadioButton { get; set; }
    }
    public class SuperProspectClient
    {
        public ProspectClient ProspectClient { get; set; }
        public SessionValues SessionValues { get; set; }
    }

    public static class ProspectClientConstant
    {
        /// <summary>
        /// Database table field Name Constants.Industries
        /// </summary>
        /// 
        public const string const_Field_Id = "Id";
        public const string const_Field_CountryName = "CountryName";
        public const string const_Field_Country = "Country";
        public const string const_Field_FilterRadioButton = "FilterRadioButton";

        public const string const_Field_GetProspectClientPopUp = "procGetProspectClientPopUp";

    }
}
