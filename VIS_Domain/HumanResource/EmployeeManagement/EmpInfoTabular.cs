using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VIS_Domain.HumanResource.EmployeeManagement
{
    public class EmpInfoTabular : VISBaseEntity
    {
        //store procedure pass parameter

        public string EditEmployeeid { get; set; }
        public string Editmode { get; set; }
        public Int64 ExpRoleId { get; set; }
        public Int64 returnid { get; set; }

        public string mode { get; set; }
        public Int64 id { get; set; }
        public string Usertype { get; set; }

        public Int64 URoleId { get; set; }
        public Int64 RoleId { get; set; }
        public Int64 Parentid { get; set; }
        public Int64 PositionId { get; set; }
        public Int64 DepartmentID { get; set; }
        public Int64 PID { get; set; }
        public Int64 EID { get; set; }
        public Int64 WID { get; set; }
        public Int64 EducationID { get; set; }
        public Int64 TechnologyID { get; set; }
        public Int64 EmployeeID { get; set; }
        public string RoleName { get; set; }
        public string technologyName { get; set; }
        public string CompanyName { get; set; }
        public string Employee_Name { get; set; }
        public string Name { get; set; }
        public string positionName { get; set; }
        public string Department_name { get; set; }
        public string Remarks { get; set; }
        public Int64 Efficiency { get; set; }
        public string UserId { get; set; }
        public int SalaryRangeId { get; set; }
        public Int64 Salary { get; set; }
        public Int64 Sar { get; set; }
        public string salaryrangetitle { get; set; }
        public decimal Value { get; set; }
        public string NonWorkingDay { get; set; }
        public Int64 NWID { get; set; }
        public Int64 IntimeMondayToFridayHH { get; set; }
        public Int64 IntimeMondayToFridayMM { get; set; }
        public Int64 IntimeSaturdayHH { get; set; }
        public Int64 IntimeSaturdayMM { get; set; }
        public Int64 OutTimeMondayToFridayHH { get; set; }
        public Int64 OutTimeMondayToFridayMM { get; set; }
        public Int64 OutTimeSaturdayHH { get; set; }
        public Int64 OutTimeSaturdayMM { get; set; }
        public string strCode { get; set; }
        public string EmployeeName { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Active { get; set; }
        public string UserType { get; set; }
        public string JoiningDate { get; set; }
        public string RelevingDate { get; set; }
        public string ResignedDate { get; set; }
        public string TotalCL { get; set; }
        public string TotalSl { get; set; }
        public bool AdditionalRights { get; set; }
        public bool ValidForLogin { get; set; }
        public string Employeecode { get; set; }
        public string ProbationTill { get; set; }
        public bool ActivityId { get; set; }
        public bool Gender { get; set; }
        public bool IsConfirmed { get; set; }
        public string JoiningSalary { get; set; }
        public string JoiningDesignation { get; set; }
        public string PhotographFileName { get; set; }
        public string SalaryAfterRevision { get; set; }
        public bool IsSLASigned { get; set; }
        public string ConfirmationDate { get; set; }
        public string AppraisalDate { get; set; }
        public bool IsAppraisalRequired { get; set; }
        public string SLAYear { get; set; }
        public string Technology { get; set; }
        public string OtherTechnology { get; set; }
        public string LineManagerID { get; set; }
        public string WorkingLocation { get; set; }
        public string WorkingLocationAddress { get; set; }
        public string CommunicationID { get; set; }
        public string OtherRemark { get; set; }
        public bool IsWebAccess { get; set; }
        public bool WorksheetThruWeb { get; set; }
        public bool IsSwitchUser { get; set; }
        public bool AllowScreenCapture { get; set; }
        public bool IsWorksheetFill { get; set; }
        public bool IsConfirmationLeave { get; set; }
        public string EmployeeGradeID { get; set; }
        public bool IsResigned { get; set; }
        public bool isMailAlert { get; set; }
        public bool IsAllowMouseMovement { get; set; }
        public string CreatedDateTime { get; set; }
        public bool IsMouseTracking { get; set; }
        public bool IsScreenCaptureRemarks { get; set; }
        public bool IsHost { get; set; }
        public bool IsHostForEmpMaster { get; set; }
        public bool IsProductivityTracker { get; set; }
        public bool WorkFromHome { get; set; }
        public bool IsWorksheetWeb { get; set; }
        public bool isInvisibleUser { get; set; }

        public string FatherName { get; set; }
        public string Birthdate { get; set; }
        public string Paddress { get; set; }
        public string Caddress { get; set; }
        public string Landlineno { get; set; }
        public string Mobileno { get; set; }
        public string Emergencyno { get; set; }
        public Int64 Age { get; set; }
        public string Bloodgroup { get; set; }
        public string Status { get; set; }
        public string Spouse { get; set; }
        public string ofchild { get; set; }
        public string Childname { get; set; }
        public DateTime AnniversaryDate { get; set; }
        public string Grandfathername { get; set; }
        public string Spousedob { get; set; }
        public string MotherName { get; set; }
        public string BrotherName { get; set; }
        public string SisterName { get; set; }
        public string FatherOccupation { get; set; }
        public string MotherOccupation { get; set; }
        public string BrotherOccupation { get; set; }
        public string SisterOccupation { get; set; }
        public string SpouseOccupation { get; set; }
        public string YearEducation { get; set; }
        public int Numberofchild { get; set; }

        public Int64 Education { get; set; }
        public Int64 Eduid { get; set; }
        public bool HighestEducation { get; set; }
        public string ClassDegree { get; set; }
        public string Schoolinstitute { get; set; }
        public string Medium { get; set; }
        public Int64 Passingyear { get; set; }
        public string Boarduniversity { get; set; }
        public Int64 Percentage { get; set; }




        public Int64 Expid { get; set; }
        public string Skills { get; set; }
        public  string Totalexp { get; set; }
        public string Org { get; set; }
        public string Url { get; set; }
        public string Designation { get; set; }
        public string Joiningdate { get; set; }
        public string Relievingdate { get; set; }
        public string Reportingto { get; set; }
        public string Contactno { get; set; }
        public string Reason { get; set; }
        public Int64 Lastsalary { get; set; }



        public string Bankname { get; set; }
        public string Accountno { get; set; }
        public string PFAccountNo { get; set; }
        public string CurrentDesignation { get; set; }
        public bool ISPFApplicable { get; set; }
        public Int64 AdharNumber { get; set; }
        public Int64 UANNumber { get; set; }


        public string Intime { get; set; }
        public string Outitme { get; set; }
        public string Intimesat { get; set; }
        public string Outtimesat { get; set; }
        public Int64 Grace { get; set; }
        public Int64 Leaveapproveby { get; set; }
        public Int64 SatGrace { get; set; }
        public bool IsAlertRequired { get; set; }
        public int AccessCardId { get; set; }
        public string AttendancePolicy { get; set; }

        public DateTime strNow { get; set; }
        public DateTime strEnd { get; set; }
        public string strDay { get; set; }
        public int nwdId { get; set; }
        public DateTime dtFromNon { get; set; }
        public string strDuration { get; set; }
        public string Nwdday { get; set; }




        public string Panno { get; set; }
        public string Passportno { get; set; }
        public string Placeofissue { get; set; }
        public DateTime Issuedate { get; set; }
        public DateTime Expirydate { get; set; }
        public bool Isrelevingletter { get; set; }
        public bool Isexperienceletter { get; set; }
        public bool Issalaryslip { get; set; }
        public bool IsDegreeCertificate { get; set; }
        public bool IsMarkSheet { get; set; }
        public bool IsPassport { get; set; }
        public bool Isdrivinglicense { get; set; }
        public bool Ispancard { get; set; }
        public bool Iscv { get; set; }
        public bool Isother { get; set; }
        public string Other { get; set; }
        public string RelievingLetterFileName { get; set; }
        public string ExperienceLetterFileName { get; set; }
        public string LastSalarySlipFileName { get; set; }
        public string DegreeCertificateFileName { get; set; }
        public string LastMarksheetFileName { get; set; }
        public string PassportFileName { get; set; }
        public string DrivingLicenseFileName { get; set; }
        public string PANCardFileName { get; set; }
        public string CurriculamVitaeFilName { get; set; }
        public string OtherFileName { get; set; }
        public string OtherFileName0 { get; set; }
        public string OtherFileName1 { get; set; }
        public string Other0 { get; set; }
        public string Other1 { get; set; }
        public string HR_Remark { get; set; }
        public string Isother0 { get; set; }
        public string Isother1 { get; set; }

        public string Incrementdate { get; set; }
        public Int64 Designationchange { get; set; }
        public string Increment { get; set; }
        public Int64 Salarychange { get; set; }
        public bool Isfirst { get; set; }
        public Int64 Incrementid { get; set; }
        public Int64 CurrentSalaryId { get; set; }

        public string Verveemail { get; set; }
        public string Vervepassword { get; set; }
        public string Gmail { get; set; }
        public string Gmailpassword { get; set; }
        public string Yahoo { get; set; }
        public string Yahoopassword { get; set; }
        public string Skype { get; set; }
        public string Skypepassword { get; set; }
        public string Othersitename { get; set; }
        public string Otherid { get; set; }
        public string Otherpassword { get; set; }

        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string ProjectName { get; set; }
        public string ProJectManagerName { get; set; }

        public decimal Workinghrs { get; set; }
        public string TechnologyName { get; set; }
        public int TotalUser { get; set; }
        public string Duration { get; set; }
        public decimal AllocatedPer { get; set; }
        public decimal EstimatedHours { get; set; }
        public decimal PlannedHours { get; set; }
        public decimal ActualHours { get; set; }
        public int TeamSize { get; set; }
        public decimal AllocationWeight { get; set; }
        public decimal PlannedEff { get; set; }
        public decimal ActualEff { get; set; }
        public int Allocated { get; set; }
        public int Completed { get; set; }
        public int SignedOff { get; set; }
        public int Incomplete { get; set; }
        public int Extended { get; set; }
        public decimal AvgRating { get; set; }



        public string TaskName { get; set; }
        public string ModuleName { get; set; }
        public DateTime PlStartDate { get; set; }
        public DateTime PlEndDate { get; set; }
        public int PlHrs { get; set; }
        public DateTime AcStartDate { get; set; }
        public DateTime AcEndDate { get; set; }
        public string AcHrs { get; set; }
        public int PercentComplete { get; set; }
        public string StatusTask { get; set; }

        public bool IsLike { get; set; }


        public string Leavetype { get; set; }
        public float Balance { get; set; }
        public string Transactiontype { get; set; }
        public bool Isadjusted { get; set; }
        public float AdjustedValue { get; set; }
        public string Lastyear { get; set; }
        public float UUPLBalance { get; set; }
        public DateTime Leavedate { get; set; }
        public DateTime Createddate { get; set; }
        public string Leavename { get; set; }
        public bool Isaupl { get; set; }

        public Int64 LeaveTypeid { get; set; }
        public string LeaveTypeName { get; set; }
        public string CarryForwardSL { get; set; }
        public string CarryForwardCL { get; set; }
        public string OpeningSL { get; set; }
        public string OpeningCL { get; set; }

        public string AccuredUSL { get; set; }
        public string accuredUCL { get; set; }
        public string AccuredCSL { get; set; }
        public string AccuredCCL { get; set; }
        public string TotalSL { get; set; }
        public string AvailableSL { get; set; }
        public string AvailableCL { get; set; }
        public string AvailAUPLSL { get; set; }
        public string AvailAUPLCL { get; set; }
        public string AvailPLSL { get; set; }
        public string AvailPLCL { get; set; }
        public string AdjustmentSL { get; set; }
        public string AdjustmentCL { get; set; }
        public string ExpireLeaveSL { get; set; }
        public string ExpireLeaveCL { get; set; }
        public string BalanceCurSL { get; set; }
        public string BalanceCurCL { get; set; }
 
        
        public string ConfirmationDateJoin { get; set; }
        public string joingdate { get; set; }
        public string SalaryAfter { get; set; }
        public string SLASigned { get; set; }


        public string experiencesummary { get; set; }
        public string skills { get; set; }
        public string ProjectHandled { get; set; }
        public string RelevanceExp { get; set; }
        public int    expyear { get; set; }
        public int    expmonth { get; set; }
        public string relevanceExpYear { get; set; }
        public string relevanceExpMonth { get; set; }
        public string hdnProjectsToSave { get; set; }
        public string Type { get; set; }
        public string AccountNumber { get; set; }
        public string Output { get; set; }

        //skill
        
        public Int64 lookupSkilId { get; set; }
        public int  SkillID { get; set; }
        public string  SkillName{get;set;}

    }

    public static class EmpInfoTabularConstants
    {


        public const string const_Table_EmployeeMaster = "Employee_Master";

        //store procedure pass parameter cons
        public const string const_Field_EditEmployeeid = "EditEmployeeid";
        public const string const_Field_Editmode = "Editmode";

        public const string const_Field_ExpRoleId = "ExpRoleId";
        public const string const_Field_returnid = "returnid";
        public const string const_Field_mode = "mode";
        public const string const_Field_UserId = "UserId";
        public const string const_Field_Usertype = "Usertype";
        public const string const_Field_RoleId = "RoleId";
        public const string const_Field_Efficiency = "Efficiency";
        public const string const_Field_URoleId = "URoleId";
        public const string const_Field_RoleName = "RoleName";
        public const string const_Field_PositionId = "PositionId";
        public const string const_Field_DepartmentID = "DepartmentID";
        public const string const_Field_PID = "PID";
        public const string const_Field_EID = "EID";
        public const string const_Field_WID = "WID";
        public const string const_Field_EmployeeID = "EmployeeID";
        public const string const_Field_TechnologyID = "TechnologyID";
        public const string const_Field_technologyName = "technologyName";
        public const string const_Field_CompanyName = "CompanyName";
        public const string const_Field_Employee_Name = "Employee_Name";
        public const string const_Field_Name = "Name";
        public const string const_Field_positionName = "positionName";
        public const string const_Field_Department_name = "Department_name";
        public const string const_Field_Remarks = "Remarks";
        public const string const_Field_SalaryRangeId = "SalaryRangeId";
        public const string const_Field_Salary = "Salary";
        public const string const_Field_Sar = "Sar";
        public const string const_Field_salaryrangetitle = "salaryrangetitle";
        public const string const_Field_Value = "Value";
        public const string const_Field_Parentid = "Parentid";
        public const string const_Field_NonWorkingDay = "NonWorkingDay";
        public const string const_Field_IsWorksheetWeb = "IsWorksheetWeb";
        public const string const_Field_NWID = "NWID";
        public const string const_Field_OutTimeMondayToFridayHH = "OutTimeMondayToFridayHH";
        public const string const_Field_IntimeMondayToFridayMM = "IntimeMondayToFridayMM";
        public const string const_Field_IntimeSaturdayHH = "IntimeSaturdayHH";
        public const string const_Field_IntimeSaturdayMM = "IntimeSaturdayMM";
        public const string const_Field_IntimeMondayToFridayHH = "IntimeMondayToFridayHH";
        public const string const_Field_OutTimeMondayToFridayMM = "OutTimeMondayToFridayMM";
        public const string const_Field_OutTimeSaturdayHH = "OutTimeSaturdayHH";
        public const string const_Field_OutTimeSaturdayMM = "OutTimeSaturdayMM";
        public const string const_Field_strCode = "strCode";
        public const string const_Field_EmployeeName = "EmployeeName";
        public const string const_Field_FirstName = "FirstName ";
        public const string const_Field_MiddleName = "MiddleName";
        public const string const_Field_LastName = "LastName";
        public const string const_Field_Password = "Password";
        public const string const_Field_Email = "Email";
        public const string const_Field_Active = "Active";
        public const string const_Field_UserType = "UserType";
        public const string const_Field_JoiningDate = "JoiningDate";
        public const string const_Field_RelevingDate = "RelevingDate";
        public const string const_Field_ResignedDate = "ResignedDate";
        public const string const_Field_TotalCL = "TotalCL";
        public const string const_Field_TotalSL = "TotalSL";
        public const string const_Field_AdditionalRights = "AdditionalRights";
        public const string const_Field_ValidForLogin = "ValidForLogin";
        public const string const_Field_Employeecode = "Employeecode";
        public const string const_Field_ProbationTill = "ProbationTill";
        public const string const_Field_ActivityId = "ActivityId";
        public const string const_Field_Gender = "Gender";
        public const string const_Field_IsConfirmed = "IsConfirmed ";
        public const string const_Field_JoiningSalary = "JoiningSalary";
        public const string const_Field_JoiningDesignation = "JoiningDesignation";
        public const string const_Field_PhotographFileName = "PhotographFileName ";
        public const string const_Field_SalaryAfterRevision = "SalaryAfterRevision ";
        public const string const_Field_IsSLASigned = "IsSLASigned";
        public const string const_Field_ConfirmationDate = "ConfirmationDate";
        public const string const_Field_AppraisalDate = "AppraisalDate";
        public const string const_Field_IsAppraisalRequired = "IsAppraisalRequired ";
        public const string const_Field_SLAYear = "SLAYear";
        public const string const_Field_Technology = "Technology";
        public const string const_Field_OtherTechnology = "OtherTechnology";
        public const string const_Field_LineManagerID = "LineManagerID";
        public const string const_Field_WorkingLocation = "WorkingLocation";
        public const string const_Field_WorkingLocationAddress = "WorkingLocationAddress";
        public const string const_Field_CommunicationID = "CommunicationID";
        public const string const_Field_OtherRemark = "OtherRemark";
        public const string const_Field_IsWebAccess = "IsWebAccess ";
        public const string const_Field_WorksheetThruWeb = "WorksheetThruWeb";
        public const string const_Field_IsSwitchUser = "IsSwitchUser";
        public const string const_Field_AllowScreenCapture = "AllowScreenCapture";
        public const string const_Field_IsWorksheetFill = "IsWorksheetFill";
        public const string const_Field_IsConfirmationLeave = "IsConfirmationLeave";
        public const string const_Field_EmployeeGradeID = "EmployeeGradeID ";
        public const string const_Field_IsResigned = "IsResigned ";
        public const string const_Field_isMailAlert = "isMailAlert";
        public const string const_Field_IsAllowMouseMovement = "IsAllowMouseMovement";
        public const string const_Field_CreatedDateTime = "CreatedDateTime";
        public const string const_Field_IsMouseTracking = "IsMouseTracking";
        public const string const_Field_IsScreenCaptureRemar = "IsScreenCaptureRemarks";
        public const string const_Field_IsHost = "IsHost";
        public const string const_Field_IsHostForEmpMaster = "IsHostForEmpMaster";
        public const string const_Field_IsProductivityTracker = "IsProductivityTracker";
        public const string const_Field_WorkFromHome = "WorkFromHome";
        public const string const_Field_isInvisibleUser = "isInvisibleUser";
        public const string const_Field_Numberofchild = "Numberofchild";

        public const string const_Field_Education = "Education";

        public const string const_Field_FatherName = "FatherName";
        public const string const_Field_Birthdate = "Birthdate";
        public const string const_Field_Paddress = "Paddress";
        public const string const_Field_Caddress = "Caddress";
        public const string const_Field_Landlineno = "Landlineno";
        public const string const_Field_Mobileno = "Mobileno";
        public const string const_Field_Emergencyno = "Emergencyno";
        public const string const_Field_Age = "Age";
        public const string const_Field_Bloodgroup = "Bloodgroup";
        public const string const_Field_Status = "Status";
        public const string const_Field_Spouse = "Spouse";
        public const string const_Field_ofchild = "ofchild";
        public const string const_Field_Childname = "Childname";
        public const string const_Field_AnniversaryDate = "AnniversaryDate";
        public const string const_Field_Grandfathername = "Grandfathername";
        public const string const_Field_Spousedob = "Spousedob";
        public const string const_Field_MotherName = "MotherName";
        public const string const_Field_BrotherName = "BrotherName";
        public const string const_Field_SisterName = "SisterName";
        public const string const_Field_FatherOccupation = "FatherOccupation";
        public const string const_Field_MotherOccupation = "MotherOccupation";
        public const string const_Field_BrotherOccupation = "BrotherOccupation";
        public const string const_Field_SisterOccupation = "SisterOccupation";
        public const string const_Field_SpouseOccupation = "SpouseOccupation";
        public const string const_Field_YearEducation = "YearEducation";


        public const string const_Field_Eduid = "Eduid";
        public const string const_Field_HighestEducation = "HighestEducation";
        public const string const_Field_ClassDegree = "ClassDegree";
        public const string const_Field_Schoolinstitute = "Schoolinstitute";
        public const string const_Field_Medium = "Medium";
        public const string const_Field_Passingyear = "Passingyear";
        public const string const_Field_Boarduniversity = "Boarduniversity";
        public const string const_Field_Percentage = "Percentage";

        public const string const_Field_Expid = "Expid";
        public const string const_Field_Skills = "Skills";
        public const string const_Field_Totalexp = "Totalexp";
        public const string const_Field_Org = "Org";
        public const string const_Field_Url = "Url";
        public const string const_Field_Designation = "Designation";
        public const string const_Field_Joiningdate = "Joiningdate";
        public const string const_Field_Relievingdate = "Relievingdate";
        public const string const_Field_Reportingto = "Reportingto";
        public const string const_Field_Contactno = "Contactno";
        public const string const_Field_Reason = "Reason";
        public const string const_Field_Lastsalary = "Lastsalary";


        public const string const_Field_Bankname = "Bankname";
        public const string const_Field_Accountno = "Accountno";
        public const string const_Field_AccountNumber = "AccountNumber";

        public const string const_Field_PFAccountNo = "PFAccountNo";
        public const string const_Field_CurrentDesignation = "CurrentDesignation";
        public const string const_Field_ISPFApplicable = "ISPFApplicable";
        public const string const_Field_AdharNumber = "AdharNumber";
        public const string const_Field_UANNumber = "UANNumber";

        public const string const_Field_Intime = "Intime";
        public const string const_Field_Outitme = "Outitme";
        public const string const_Field_Intimesat = "Intimesat";
        public const string const_Field_Outtimesat = "Outtimesat";
        public const string const_Field_Grace = "Grace";
        public const string const_Field_Leaveapproveby = "Leaveapproveby";
        public const string const_Field_SatGrace = "SatGrace";
        public const string const_Field_IsAlertRequired = "IsAlertRequired";
        public const string const_Field_AccessCardId = "AccessCardId";
        public const string const_Field_AttendancePolicy = "AttendancePolicy";


        public const string const_Field_strNow = "strNow ";
        public const string const_Field_strEnd = "strEnd ";
        public const string const_Field_strDay = "strDay ";
        public const string const_Field_nwdId = "nwdId";
        public const string const_Field_dtFromNon = "dtFromNon";
        public const string const_Field_strDuration = "strDuration";



        public const string const_Field_Panno = "Panno";
        public const string const_Field_Passportno = "Passportno";
        public const string const_Field_Placeofissue = "Placeofissue";
        public const string const_Field_Issuedate = "Issuedate";
        public const string const_Field_Expirydate = "Expirydate";
        public const string const_Field_Isrelevingletter = "Isrelevingletter";
        public const string const_Field_Isexperienceletter = "Isexperienceletter";
        public const string const_Field_Issalaryslip = "Issalaryslip";
        public const string const_Field_IsDegreeCertificate = "IsDegreeCertificate";
        public const string const_Field_IsMarkSheet = "IsMarkSheet";
        public const string const_Field_IsPassport = "IsPassport ";
        public const string const_Field_Isdrivinglicense = "Isdrivinglicense";
        public const string const_Field_Ispancard = "Ispancard";
        public const string const_Field_Iscv = "Iscv";
        public const string const_Field_Isother = "Isother";
        public const string const_Field_Other = "Other";
        public const string const_Field_RelievingLetterFileName = "RelievingLetterFileName";
        public const string const_Field_ExperienceLetterFileName = "ExperienceLetterFileName ";
        public const string const_Field_LastSalarySlipFileName = "LastSalarySlipFileName";
        public const string const_Field_DegreeCertificateFileName = "DegreeCertificateFileName";
        public const string const_Field_LastMarksheetFileName = "LastMarksheetFileName";
        public const string const_Field_PassportFileName = "PassportFileName";
        public const string const_Field_DrivingLicenseFileName = "DrivingLicenseFileName";
        public const string const_Field_PANCardFileName = "PANCardFileName";
        public const string const_Field_CurriculamVitaeFilName = "CurriculamVitaeFilName";
        public const string const_Field_OtherFileName = "OtherFileName";
        public const string const_Field_OtherFileName0 = "OtherFileName0";
        public const string const_Field_OtherFileName1 = "OtherFileName1";
        public const string const_Field_Other0 = "Other0";
        public const string const_Field_Other1 = "Other1";
        public const string const_Field_HR_Remark = "HR_Remark";
        public const string const_Field_Isother0 = "Isother0";
        public const string const_Field_Isother1 = " Isother1";




        public const string const_Field_Incrementdate = "Incrementdate";
        public const string const_Field_Designationchange = "Designationchange";
        public const string const_Field_Increment = "Increment";
        public const string const_Field_Salarychange = "Salarychange";
        public const string const_Field_Isfirst = "Isfirst";
        public const string const_Field_Incrementid = "Incrementid";
        public const string const_Field_CurrentSalaryId = "CurrentSalaryId";


        public const string const_Field_Verveemail = "Verveemail";
        public const string const_Field_Vervepassword = "Vervepassword ";
        public const string const_Field_Gmail = "Gmail";
        public const string const_Field_Gmailpassword = "Gmailpassword";
        public const string const_Field_Yahoo = "Yahoo";
        public const string const_Field_Yahoopassword = "Yahoopassword";
        public const string const_Field_Skype = "Skype";
        public const string const_Field_Skypepassword = "Skypepassword";
        public const string const_Field_Othersitename = "Othersitename";
        public const string const_Field_Otherid = "Otherid";
        public const string const_Field_Otherpassword = "Otherpassword";


        public const string const_Field_FromDate = "FromDate";
        public const string const_Field_ToDate = "ToDate";




        public const string const_Field_Leavetype = "Leavetype";
        public const string const_Field_Balance = "Balance";
        public const string const_Field_Transactiontype = "Transactiontype";
        public const string const_Field_Isadjusted = "Isadjusted";
        public const string const_Field_AdjustedValue = "AdjustedValue";
        public const string const_Field_Lastyear = "Lastyear";
        public const string const_Field_UUPLBalance = "UUPLBalance";
        public const string const_Field_Leavedate = "Leavedate";
        public const string const_Field_Createddate = "Createddate";
        public const string const_Field_Leavename = "Leavename";
        public const string const_Field_Isaupl = "Isaupl";


        public const string const_Field_experiencesummary = "experiencesummary";
        public const string const_Field_skills = "skills";
        public const string const_Field_ProjectHandled = "ProjectHandled";
        public const string const_Field_RelevanceExp = "RelevanceExp";
        public const string const_Field_skillgroupid = "skillgroupid";

        public const string const_Field_SkillID = "SkillID";

        /// <summary>
        /// Database Procedure and fucntion constants.
        /// </summary>
        /// 

        public const string const_procEmployeedropdownbind = "procEmployeedropdownbind";
        public const string const_procEmployeeDropDown = "procEmployeeDropDown";
        public const string const_procEmployeeEducation = "procEmployeeEducation";
        public const string const_procTechnologyListboxbind = "procTechnologyListboxbind";
        public const string const_procRoleBind = "procRoleBind";
        public const string const_procExperienceRoleAdd = "procExperienceRoleAdd";
        public const string const_procSalaryRange = "procSalaryRange";
        public const string const_procSalaryBreakUpSalaryRangeWise = "procSalaryBreakUpSalaryRangeWise";
        public const string const_procEmployeeListAttandancetabBind = "procEmployeeListAttandancetabBind";
        public const string const_procNonWorking = "procNonWorking";
        public const string const_procIntimeSelected = "procIntimeSelected";
        public const string const_procGetEmployeeCodeComapanyWise = "procGetEmployeeCodeComapanyWise";

        public const string const_Field_procNewEmployeeAdd = "procNewEmployeeAdd";
        public const string const_Field_procPersonalInformation_Add = "procPersonalInformation_Add";
        public const string const_Field_procGetEducationYear = "procGetEducationYear";
        public const string const_Field_ProcEducation = "ProcEducation";
        public const string const_Field_procEducationAdd = "procEducationAdd";
        public const string const_Field_procExperience_Add = "procExperience_Add";
        public const string const_Field_procCheckExperience = "procCheckExperience";
        public const string const_Field_procCurrentSalary_Add = "procCurrentSalary_Add";
        public const string const_Field_procManagesalary = "procManagesalary";
        public const string const_Field_procAttendance_Add = "procAttendance_Add";
        public const string const_Field_procNowworkingcheck = "procNowworkingcheck";
        public const string const_Field_procFunctioncallNwd = "procFunctioncallNwd";
        public const string const_Field_procJoiningDocument_Add = "procJoiningDocument_Add";
        public const string const_Field_procIncrementHistoryMaster_Add = "procIncrementHistoryMaster_Add";
        public const string const_Field_procIncrementtype = "procIncrementtype";
        public const string const_Field_procOfficialDetail_Add = "procOfficialDetail_Add";
        public const string const_Field_procprojectListGet = "procprojectListGet";
        public const string const_Field_procOfferdeatils = "procOfferdeatils";
        public const string const_Field_procEmployeeMasterGet = "procEmployeeMasterGet";
        public const string const_Field_procPendingTask = "procPendingTask";
        public const string const_Field_procEmployeeFeedback = "procEmployeeFeedback";
        public const string const_Field_procAdjustedLeaveAdd = "procAdjustedLeaveAdd";
        public const string const_Field_procLeaveDeatilMaster = "procLeaveDeatilMaster";
        public const string const_Field_procExperienceProjectGet = "procExperienceProjectGet";
        public const string const_Field_procSalarySAccountNo = "procSalarySAccountNo";

        public const string const_Field_procAttencessdeatilcheck = "procAttencessdeatilcheck";
        public const string const_Field_procGetMySkill = "procGetMySkill";
        public const string const_Field_procSkillAddtab = "procSkillAddtab";




    }
}
