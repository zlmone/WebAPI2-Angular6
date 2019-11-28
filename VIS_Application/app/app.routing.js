"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var currency_component_1 = require("./components/Masters/CurrencyRelated/currency.component");
var levels_component_1 = require("./components/Masters/EmployeeLevels/levels.component");
var home_component_1 = require("./components/home.component");
var login_component_1 = require("./components/UserManagement/login.component");
var auth_gaurd_1 = require("./Shared/auth.gaurd");
var ContactMaster_component_1 = require("./components/Masters/CompanyRelated/ContactMaster.component");
var BankMaster_component_1 = require("./components/Masters/CompanyRelated/BankMaster.component");
var RatingType_component_1 = require("./components/Masters/VacancyRelated/RatingType.component");
var LookupType_component_1 = require("./components/Masters/CompanyRelated/LookupType.component");
var Lookup_component_1 = require("./components/Masters/CompanyRelated/Lookup.component");
var SkillGroup_component_1 = require("./components/Masters/VacancyRelated/SkillGroup.component");
var Skill_component_1 = require("./components/Masters/VacancyRelated/Skill.component");
var Position_component_1 = require("./components/Masters/VacancyRelated/Position.component");
var TechnologyMaster_component_1 = require("./components/Masters/VacancyRelated/TechnologyMaster.component");
var CompanyMaster_Component_1 = require("./components/Masters/CompanyRelated/CompanyMaster.Component");
var MacIdConfiguration_component_1 = require("./components/Masters/Configuration/MacIdConfiguration.component");
var SecurityKey_component_1 = require("./components/Masters/Configuration/SecurityKey.component");
var FinancialYear_component_1 = require("./components/Masters/CompanyRelated/FinancialYear.component");
var EventCountDown_component_1 = require("./components/Masters/Configuration/EventCountDown.component");
var dashboard_component_1 = require("./components/Dashboard/dashboard.component");
var CommonConfiguration_component_1 = require("./components/Masters/Configuration/CommonConfiguration.component");
var LevelConfiguration_component_1 = require("./components/Masters/EmployeeLevels/LevelConfiguration.component");
var policy_component_1 = require("./components/Notification/policy.component");
var ConfigureWorkSheet_component_1 = require("./components/Masters/Configuration/ConfigureWorkSheet.component");
var News_component_1 = require("./components/Notification/News.component");
var LevelCriteriaSetup_component_1 = require("./Components/Masters/EmployeeLevels/LevelCriteriaSetup.component");
var ConfigureTicket_component_1 = require("./Components/Masters/Configuration/ConfigureTicket.component");
var HomePageImage_component_1 = require("./Components/Masters/CompanyRelated/HomePageImage.component");
var HelpTicketAdd_component_1 = require("./Components/Notification/HelpTicketAdd.component");
var MyTicket_component_1 = require("./Components/Notification/MyTicket.component");
var ChangePassword_component_1 = require("./Components/HumanResource/ProfileAttendance/ChangePassword.component");
var TicketListOpen_component_1 = require("./Components/Notification/TicketListOpen.component");
var TicketListClosed_component_1 = require("./Components/Notification/TicketListClosed.component");
var MyProfiles_component_1 = require("./Components/HumanResource/ProfileAttendance/MyProfiles.component");
var LeaveType_component_1 = require("./components/Masters/CompanyRelated/LeaveType.component");
var GroupName_component_1 = require("./components/Masters/CompanyRelated/GroupName.component");
var DailyEntrysheet_component_1 = require("./components/Report/Attendance/DailyEntrysheet.component");
var AttendanceReport_component_1 = require("./Components/Report/Attendance/AttendanceReport.component");
var OutReport_component_1 = require("./components/Report/Attendance/OutReport.component");
var WorkSheet_component_1 = require("./components/HumanResource/Attendance/WorkSheet.component");
var MySkill_component_1 = require("./components/HumanResource/Attendance/MySkill.component");
var MyTeam_component_1 = require("./components/HumanResource/Attendance/MyTeam.component");
var EmployeeFeedback_component_1 = require("./components/HumanResource/Attendance/EmployeeFeedback.component");
var Levels_Achievement_component_1 = require("./Components/Masters/EmployeeLevels/Levels_Achievement.component");
var AttendanceEntry_component_1 = require("./Components/UserManagement/AttendanceEntry.component");
var EmployeeScreenCapture_component_1 = require("./components/Report/Attendance/EmployeeScreenCapture.component");
var EmployeeDashboardHeartBeatReport_component_1 = require("./components/Report/Attendance/EmployeeDashboardHeartBeatReport.component");
var AttendanceAccessCardComparisionReport_component_1 = require("./components/Report/Attendance/AttendanceAccessCardComparisionReport.component");
var EmployeeList_component_1 = require("./components/HumanResource/EmployeeManagement/EmployeeList.component");
var EmpInfoTabular_component_1 = require("./components/HumanResource/EmployeeManagement/EmpInfoTabular.component");
var ManualPointEntry_component_1 = require("./components/Masters/EmployeeLevels/ManualPointEntry.component");
var LateEarlyReport_component_1 = require("./components/Report/Attendance/LateEarlyReport.component");
var UserRole_component_1 = require("./components/Masters/CompanyRelated/UserRole.component");
var EducationType_component_1 = require("./components/Masters/CompanyRelated/EducationType.component");
var SalaryBreakupType_component_1 = require("./components/Masters/CompanyRelated/SalaryBreakupType.component");
var AddEmployeeRecord_component_1 = require("./Components/Report/Attendance/AddEmployeeRecord.component");
var AttendanceReportNew_component_1 = require("./Components/Report/Attendance/AttendanceReportNew.component");
var OfficialWorkReport_component_1 = require("./Components/Report/Attendance/OfficialWorkReport.component");
var ProductivityTrackerReport_component_1 = require("./Components/Report/Attendance/ProductivityTrackerReport.component");
var ConfigureSurvey_component_1 = require("./Components/Opinion/ConfigureSurvey.component");
var RFQEstimateListing_component_1 = require("./components/RFQ/RFQEstimateListing.component");
var AddRFQ_component_1 = require("./components/RFQ/AddRFQ.component");
var RFQEstimateAllRFQ_component_1 = require("./components/RFQ/RFQEstimateAllRFQ.component");
var ResponceRequestedRFQ_component_1 = require("./components/RFQ/ResponceRequestedRFQ.component");
var MyWatchListRFQ_component_1 = require("./components/RFQ/MyWatchListRFQ.component");
var MyActionRFQ_component_1 = require("./components/RFQ/MyActionRFQ.component");
var CurrencyHistory_component_1 = require("./components/Masters/CurrencyRelated/CurrencyHistory.component");
var SalaryGrievance_component_1 = require("./Components/HumanResource/Grievance/SalaryGrievance.component");
var DocumentTemplate_component_1 = require("./Components/DocCenter/DocumentTemplate.component");
var AddResponse_component_1 = require("./Components/RFQ/AddResponse.component");
var ViewResponse_component_1 = require("./Components/RFQ/ViewResponse.component");
var appRoutes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'home', component: home_component_1.HomeComponent, canActivate: [auth_gaurd_1.AuthGuard] },
    { path: 'currency', component: currency_component_1.CurrencyComponent, canActivate: [auth_gaurd_1.AuthGuard] },
    { path: 'levels', component: levels_component_1.LevelsComponent, canActivate: [auth_gaurd_1.AuthGuard] },
    { path: 'ContactMaster', component: ContactMaster_component_1.ContactMasterComponent, canActivate: [auth_gaurd_1.AuthGuard] },
    { path: 'BankMaster', component: BankMaster_component_1.BankMasterComponent, canActivate: [auth_gaurd_1.AuthGuard] },
    { path: 'LookupType', component: LookupType_component_1.LookupTypeComponent, canActivate: [auth_gaurd_1.AuthGuard] },
    { path: 'Lookup', component: Lookup_component_1.LookupComponent, canActivate: [auth_gaurd_1.AuthGuard] },
    { path: 'skillgroup', component: SkillGroup_component_1.SkillGroupComponent, canActivate: [auth_gaurd_1.AuthGuard] },
    { path: 'skill', component: Skill_component_1.SkillComponent, canActivate: [auth_gaurd_1.AuthGuard] },
    { path: 'position', component: Position_component_1.PositionComponent, canActivate: [auth_gaurd_1.AuthGuard] },
    { path: 'TechnologyMaster', component: TechnologyMaster_component_1.TechnologyMasterComponent, canActivate: [auth_gaurd_1.AuthGuard] },
    { path: 'CompanyMaster', component: CompanyMaster_Component_1.CompanyMasterComponent, canActivate: [auth_gaurd_1.AuthGuard] },
    { path: 'macid', component: MacIdConfiguration_component_1.MacIdConfigurationComponent, canActivate: [auth_gaurd_1.AuthGuard] },
    { path: 'securitykey', component: SecurityKey_component_1.SecurityKeyComponent, canActivate: [auth_gaurd_1.AuthGuard] },
    { path: 'FinancialYear', component: FinancialYear_component_1.FinancialYearComponent, canActivate: [auth_gaurd_1.AuthGuard] },
    { path: 'eventcountdown', component: EventCountDown_component_1.EventCountDownComponent, canActivate: [auth_gaurd_1.AuthGuard] },
    { path: 'dashboard', component: dashboard_component_1.DashboardComponent, canActivate: [auth_gaurd_1.AuthGuard] },
    { path: 'commonconfiguration', component: CommonConfiguration_component_1.CommonConfigurationComponent, canActivate: [auth_gaurd_1.AuthGuard] },
    { path: 'LevelConfiguration', component: LevelConfiguration_component_1.LevelConfigurationComponent, canActivate: [auth_gaurd_1.AuthGuard] },
    { path: 'policy', component: policy_component_1.PolicyComponent, canActivate: [auth_gaurd_1.AuthGuard] },
    { path: 'configureworksheet', component: ConfigureWorkSheet_component_1.ConfigureWorkSheetComponent, canActivate: [auth_gaurd_1.AuthGuard] },
    { path: 'News', component: News_component_1.NewsComponent, canActivate: [auth_gaurd_1.AuthGuard] },
    { path: 'LevelCriteriaSetup', component: LevelCriteriaSetup_component_1.LevelCriteriaSetupComponent, canActivate: [auth_gaurd_1.AuthGuard] },
    { path: 'configureticket', component: ConfigureTicket_component_1.ConfigureTicketComponent, canActivate: [auth_gaurd_1.AuthGuard] },
    { path: 'HelpTicketAdd', component: HelpTicketAdd_component_1.HelpTicketAddComponent, canActivate: [auth_gaurd_1.AuthGuard] },
    { path: 'MyTicket', component: MyTicket_component_1.MyTicketComponent, canActivate: [auth_gaurd_1.AuthGuard] },
    { path: 'homepageimage', component: HomePageImage_component_1.HomePageImageComponent, canActivate: [auth_gaurd_1.AuthGuard] },
    { path: 'ChangePassword', component: ChangePassword_component_1.ChangePasswordComponent, canActivate: [auth_gaurd_1.AuthGuard] },
    { path: 'TicketListOpen', component: TicketListOpen_component_1.TicketListOpenComponent, canActivate: [auth_gaurd_1.AuthGuard] },
    { path: 'TicketListClosed', component: TicketListClosed_component_1.TicketListClosedComponent, canActivate: [auth_gaurd_1.AuthGuard] },
    { path: 'MyProFiles', component: MyProfiles_component_1.MyProfilesComponent, canActivate: [auth_gaurd_1.AuthGuard] },
    { path: 'LeaveType', component: LeaveType_component_1.LeaveTypeComponent, canActivate: [auth_gaurd_1.AuthGuard] },
    { path: 'GroupName', component: GroupName_component_1.GroupNameComponent, canActivate: [auth_gaurd_1.AuthGuard] },
    { path: 'DailyEntryReport', component: DailyEntrysheet_component_1.DailyEntrysheetComponent, canActivate: [auth_gaurd_1.AuthGuard] },
    { path: 'AttendanceReport', component: AttendanceReport_component_1.AttendanceReportComponent, canActivate: [auth_gaurd_1.AuthGuard] },
    { path: 'outreport', component: OutReport_component_1.OutReportComponent, canActivate: [auth_gaurd_1.AuthGuard] },
    { path: 'WorkSheet', component: WorkSheet_component_1.WorkSheetComponent, canActivate: [auth_gaurd_1.AuthGuard] },
    { path: 'MySkill', component: MySkill_component_1.MySkillComponent, canActivate: [auth_gaurd_1.AuthGuard] },
    { path: 'MyTeam', component: MyTeam_component_1.MyTeamComponent, canActivate: [auth_gaurd_1.AuthGuard] },
    { path: 'EmployeeFeedBack', component: EmployeeFeedback_component_1.EmployeeFeedbackComponent, canActivate: [auth_gaurd_1.AuthGuard] },
    { path: 'RatingType', component: RatingType_component_1.RatingTypeComponent, canActivate: [auth_gaurd_1.AuthGuard] },
    { path: 'Levels_Achievement', component: Levels_Achievement_component_1.Levels_AchievementComponent, canActivate: [auth_gaurd_1.AuthGuard] },
    { path: 'AttendanceEntry', component: AttendanceEntry_component_1.AttendanceEntryComponent, canActivate: [auth_gaurd_1.AuthGuard] },
    { path: 'EmployeeScreenCaptureReportComponent', component: EmployeeScreenCapture_component_1.EmployeeScreenCaptureReportComponent, canActivate: [auth_gaurd_1.AuthGuard] },
    { path: 'EmployeeDashboardHeartBeatReportComponent', component: EmployeeDashboardHeartBeatReport_component_1.EmployeeDashboardHeartBeatReportComponent, canActivate: [auth_gaurd_1.AuthGuard] },
    { path: 'AttendanceAccessCardComparisionReportComponent', component: AttendanceAccessCardComparisionReport_component_1.AttendanceAccessCardComparisionReportComponent, canActivate: [auth_gaurd_1.AuthGuard] },
    { path: 'EmployeeList', component: EmployeeList_component_1.EmployeeListComponent, canActivate: [auth_gaurd_1.AuthGuard] },
    { path: 'EmpInfoTabular', component: EmpInfoTabular_component_1.EmpInfoTabularComponent, canActivate: [auth_gaurd_1.AuthGuard] },
    { path: 'ManualPointEntry', component: ManualPointEntry_component_1.ManualPointEntryComponent, canActivate: [auth_gaurd_1.AuthGuard] },
    { path: 'LateEarlyReport', component: LateEarlyReport_component_1.LateEarlyReportComponent, canActivate: [auth_gaurd_1.AuthGuard] },
    { path: 'UserRole', component: UserRole_component_1.UserRoleComponent, canActivate: [auth_gaurd_1.AuthGuard] },
    { path: 'EducationType', component: EducationType_component_1.EducationTypeComponent, canActivate: [auth_gaurd_1.AuthGuard] },
    { path: 'SalaryBreakupType', component: SalaryBreakupType_component_1.SalaryBreakupTypeComponent, canActivate: [auth_gaurd_1.AuthGuard] },
    { path: 'AddEmployeeRecord', component: AddEmployeeRecord_component_1.AddEmployeeRecordcomponent, canActivate: [auth_gaurd_1.AuthGuard] },
    { path: 'AttendanceReportNew', component: AttendanceReportNew_component_1.AttendanceReportNewcomponent, canActivate: [auth_gaurd_1.AuthGuard] },
    { path: 'OfficialWorkReport', component: OfficialWorkReport_component_1.OfficialWorkReportComponent, canActivate: [auth_gaurd_1.AuthGuard] },
    { path: 'ProductivityTracker', component: ProductivityTrackerReport_component_1.ProductivityTrackerReportcomponent, canActivate: [auth_gaurd_1.AuthGuard] },
    { path: 'Opinion_List', component: ConfigureSurvey_component_1.ConfigureSurveycomponent, canActivate: [auth_gaurd_1.AuthGuard] },
    { path: 'MyRFQ', component: RFQEstimateListing_component_1.RFQComponent, canActivate: [auth_gaurd_1.AuthGuard] },
    { path: 'AllRFQ', component: RFQEstimateAllRFQ_component_1.AllRFQComponent, canActivate: [auth_gaurd_1.AuthGuard] },
    { path: 'RFQResponceRequested', component: ResponceRequestedRFQ_component_1.ResponceRequestedRFQcomponent, canActivate: [auth_gaurd_1.AuthGuard] },
    // { path: 'RFQ/:param', component: RFQComponent, canActivate: [AuthGuard] },
    { path: 'AddRFQ', component: AddRFQ_component_1.AddRFQComponent, canActivate: [auth_gaurd_1.AuthGuard] },
    { path: 'MyWatchList', component: MyWatchListRFQ_component_1.MyWatchListRFQComponent, canActivate: [auth_gaurd_1.AuthGuard] },
    { path: 'MyAction', component: MyActionRFQ_component_1.MyActionRFQcomponent, canActivate: [auth_gaurd_1.AuthGuard] },
    { path: 'CurrencyHistory', component: CurrencyHistory_component_1.CurrencyHistoryComponent, canActivate: [auth_gaurd_1.AuthGuard] },
    { path: 'SalaryGrievance', component: SalaryGrievance_component_1.SalaryGrievanceComponent, canActivate: [auth_gaurd_1.AuthGuard] },
    { path: 'DocumentTemplateComponent', component: DocumentTemplate_component_1.DocumentTemplateComponent, canActivate: [auth_gaurd_1.AuthGuard] },
    { path: 'AddRFQResponsecomponent', component: AddResponse_component_1.AddRFQResponsecomponent, canActivate: [auth_gaurd_1.AuthGuard] },
    { path: 'ViewRFQResponsecomponent', component: ViewResponse_component_1.ViewRFQResponsecomponent, canActivate: [auth_gaurd_1.AuthGuard] }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
