"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var ng2_ckeditor_1 = require("ng2-ckeditor");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var app_component_1 = require("./app.component");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var ng2_file_upload_1 = require("ng2-file-upload/ng2-file-upload");
var http_1 = require("@angular/http");
var ng2_tab_1 = require("ng2-tab");
var angular2_color_picker_1 = require("angular2-color-picker");
var app_routing_1 = require("./app.routing");
var errorhandler_1 = require("./Shared/errorhandler");
var search_component_1 = require("./Shared/search.component");
var orderby_pipe_1 = require("./Shared/orderby.pipe");
var sharedcontents_1 = require("./Shared/sharedcontents");
var auth_gaurd_1 = require("./Shared/auth.gaurd");
var user_auth_gaurd_1 = require("./Shared/user.auth.gaurd");
var login_component_1 = require("./components/UserManagement/login.component");
var login_Service_1 = require("./Service/UserManagement/login.Service");
var home_component_1 = require("./components/home.component");
var pager_index_1 = require("./Shared/pager.index");
var CommonHelper_service_1 = require("./Shared/CommonHelper.service");
var exportexcel_service_1 = require("./Shared/exportexcel.service");
var angular_2_dropdown_multiselect_1 = require("angular-2-dropdown-multiselect");
var currency_component_1 = require("./components/Masters/CurrencyRelated/currency.component");
var currency_service_1 = require("./Service/Masters/CurrencyRelated/currency.service");
var currency_pipe_1 = require("./filter/Masters/CurrencyRelated/currency.pipe");
var levels_component_1 = require("./components/Masters/EmployeeLevels/levels.component");
var levels_service_1 = require("./Service/Masters/EmployeeLevels/levels.service");
var levels_pipe_1 = require("./filter/Masters/EmployeeLevels/levels.pipe");
var ContactMaster_component_1 = require("./components/Masters/CompanyRelated/ContactMaster.component");
var ContactMaster_service_1 = require("./Service/Masters/CompanyRelated/ContactMaster.service");
var ContactMaster_pipe_1 = require("./filter/Masters/CompanyRelated/ContactMaster.pipe");
var BankMaster_component_1 = require("./components/Masters/CompanyRelated/BankMaster.component");
var BankMaster_service_1 = require("./Service/Masters/CompanyRelated/BankMaster.service");
var BankMaster_pipe_1 = require("./filter/Masters/CompanyRelated/BankMaster.pipe");
var RatingType_component_1 = require("./components/Masters/VacancyRelated/RatingType.component");
var RatingType_service_1 = require("./Service/Masters/VacancyRelated/RatingType.service");
var RatingType_pipe_1 = require("./Filter/Masters/VacancyRelated/RatingType.pipe");
var LookupType_component_1 = require("./components/Masters/CompanyRelated/LookupType.component");
var LookupType_service_1 = require("./Service/Masters/CompanyRelated/LookupType.service");
var LookupType_pipe_1 = require("./Filter/Masters/CompanyRelated/LookupType.pipe");
var Lookup_component_1 = require("./components/Masters/CompanyRelated/Lookup.component");
var Lookup_service_1 = require("./Service/Masters/CompanyRelated/Lookup.service");
var Lookup_pipe_1 = require("./filter/Masters/CompanyRelated/Lookup.pipe");
var SkillGroup_component_1 = require("./components/Masters/VacancyRelated/SkillGroup.component");
var SkillGroup_service_1 = require("./Service/Masters/VacancyRelated/SkillGroup.service");
var SkillGroup_pipe_1 = require("./filter/Masters/VacancyRelated/SkillGroup.pipe");
var Skill_component_1 = require("./components/Masters/VacancyRelated/Skill.component");
var Skill_service_1 = require("./Service/Masters/VacancyRelated/Skill.service");
var Skill_pipe_1 = require("./filter/Masters/VacancyRelated/Skill.pipe");
var Position_component_1 = require("./components/Masters/VacancyRelated/Position.component");
var Position_service_1 = require("./Service/Masters/VacancyRelated/Position.service");
var Position_pipe_1 = require("./filter/Masters/VacancyRelated/Position.pipe");
var TechnologyMaster_component_1 = require("./components/Masters/VacancyRelated/TechnologyMaster.component");
var TechnologyMaster_service_1 = require("./Service/Masters/VacancyRelated/TechnologyMaster.service");
var TechnologyMaster_pipe_1 = require("./filter/Masters/VacancyRelated/TechnologyMaster.pipe");
var CompanyMaster_Component_1 = require("./components/Masters/CompanyRelated/CompanyMaster.Component");
var CompanyMaster_service_1 = require("./Service/Masters/CompanyRelated/CompanyMaster.service");
var CompanyMaster_pipe_1 = require("./filter/Masters/CompanyRelated/CompanyMaster.pipe");
var MacIdConfiguration_component_1 = require("./components/Masters/Configuration/MacIdConfiguration.component");
var MacIdConfiguration_service_1 = require("./Service/Masters/Configuration/MacIdConfiguration.service");
var MacIdConfiguration_pipe_1 = require("./filter/Masters/Configuration/MacIdConfiguration.pipe");
var SecurityKey_component_1 = require("./components/Masters/Configuration/SecurityKey.component");
var SecurityKey_service_1 = require("./Service/Masters/Configuration/SecurityKey.service");
var SecurityKey_pipe_1 = require("./filter/Masters/Configuration/SecurityKey.pipe");
var FinancialYear_component_1 = require("./components/Masters/CompanyRelated/FinancialYear.component");
var FinancialYear_service_1 = require("./Service/Masters/CompanyRelated/FinancialYear.service");
var FinancialYear_pipe_1 = require("./filter/Masters/CompanyRelated/FinancialYear.pipe");
var EventCountDown_component_1 = require("./components/Masters/Configuration/EventCountDown.component");
var EventCountDown_service_1 = require("./Service/Masters/Configuration/EventCountDown.service");
var EventCountDown_pipe_1 = require("./filter/Masters/Configuration/EventCountDown.pipe");
var dashboard_component_1 = require("./components/Dashboard/dashboard.component");
var dashboard_service_1 = require("./Service/Dashboard/dashboard.service");
var CommonConfiguration_component_1 = require("./components/Masters/Configuration/CommonConfiguration.component");
var CommonConfiguration_service_1 = require("./Service/Masters/Configuration/CommonConfiguration.service");
var CommonConfiguration_pipe_1 = require("./filter/Masters/Configuration/CommonConfiguration.pipe");
var LevelConfiguration_component_1 = require("./components/Masters/EmployeeLevels/LevelConfiguration.component");
var LevelConfiguration_service_1 = require("./Service/Masters/EmployeeLevels/LevelConfiguration.service");
var LevelConfiguration_pipe_1 = require("./filter/Masters/EmployeeLevels/LevelConfiguration.pipe");
var policy_component_1 = require("./components/Notification/policy.component");
var policy_service_1 = require("./Service/Notification/policy.service");
var policy_pipe_1 = require("./filter/Notification/policy.pipe");
var ConfigureWorkSheet_component_1 = require("./components/Masters/Configuration/ConfigureWorkSheet.component");
var ConfigureWorksheet_service_1 = require("./Service/Masters/Configuration/ConfigureWorksheet.service");
var ConfigureWorksheet_pipe_1 = require("./filter/Masters/Configuration/ConfigureWorksheet.pipe");
var News_component_1 = require("./components/Notification/News.component");
var News_service_1 = require("./Service/Notification/News.service");
var News_pipe_1 = require("./filter/Notification/News.pipe");
var LevelCriteriaSetup_component_1 = require("./Components/Masters/EmployeeLevels/LevelCriteriaSetup.component");
var LevelCriteriaSetup_service_1 = require("./Service/Masters/EmployeeLevels/LevelCriteriaSetup.service");
var LevelCriteriaSetup_pipe_1 = require("./Filter/Masters/EmployeeLevels/LevelCriteriaSetup.pipe");
var ConfigureTicket_component_1 = require("./Components/Masters/Configuration/ConfigureTicket.component");
var ConfigureTicket_service_1 = require("./Service/Masters/Configuration/ConfigureTicket.service");
var ConfigureTicket_pipe_1 = require("./Filter/Masters/Configuration/ConfigureTicket.pipe");
var HomePageImage_component_1 = require("./Components/Masters/CompanyRelated/HomePageImage.component");
var HomePageImage_service_1 = require("./Service/Masters/CompanyRelated/HomePageImage.service");
var HomePageImage_pipe_1 = require("./Filter/Masters/CompanyRelated/HomePageImage.pipe");
var HelpTicketAdd_component_1 = require("./Components/Notification/HelpTicketAdd.component");
var HelpTicketAdd_service_1 = require("./Service/Notification/HelpTicketAdd.service");
var HelpTicketAdd_pipe_1 = require("./Filter/Notification/HelpTicketAdd.pipe");
var MyTicket_component_1 = require("./Components/Notification/MyTicket.component");
var MyTicket_service_1 = require("./Service/Notification/MyTicket.service");
var MyTicket_pipe_1 = require("./Filter/Notification/MyTicket.pipe");
var ChangePassword_component_1 = require("./Components/HumanResource/ProfileAttendance/ChangePassword.component");
var ChangePassword_service_1 = require("./Service/HumanResource/ProfileAttendance/ChangePassword.service");
var TicketListOpen_component_1 = require("./Components/Notification/TicketListOpen.component");
var TicketListOpen_service_1 = require("./Service/Notification/TicketListOpen.service");
var TicketListOpen_pipe_1 = require("./Filter/Notification/TicketListOpen.pipe");
var TicketListClosed_component_1 = require("./Components/Notification/TicketListClosed.component");
var TicketListClosed_service_1 = require("./Service/Notification/TicketListClosed.service");
var TicketListClosed_pipe_1 = require("./Filter/Notification/TicketListClosed.pipe");
var MyProfiles_component_1 = require("./Components/HumanResource/ProfileAttendance/MyProfiles.component");
var MyProfiles_service_1 = require("./Service/HumanResource/ProfileAttendance/MyProfiles.service");
var MyProfiles_pipe_1 = require("./Filter/HumanResource/ProfileAttendance/MyProfiles.pipe");
var LeaveType_component_1 = require("./components/Masters/CompanyRelated/LeaveType.component");
var LeaveType_service_1 = require("./Service/Masters/CompanyRelated/LeaveType.service");
var LeaveType_pipe_1 = require("./filter/Masters/CompanyRelated/LeaveType.pipe");
var GroupName_component_1 = require("./components/Masters/CompanyRelated/GroupName.component");
var GroupName_service_1 = require("./Service/Masters/CompanyRelated/GroupName.service");
var GroupName_pipe_1 = require("./filter/Masters/CompanyRelated/GroupName.pipe");
var DailyEntrysheet_component_1 = require("./components/Report/Attendance/DailyEntrysheet.component");
var DailyEntrysheet_service_1 = require("./Service/Report/Attendance/DailyEntrysheet.service");
var AttendanceReport_component_1 = require("./Components/Report/Attendance/AttendanceReport.component");
var AttendanceReport_Service_1 = require("./Service/Report/Attendance/AttendanceReport.Service");
var OutReport_component_1 = require("./components/Report/Attendance/OutReport.component");
var OutReport_service_1 = require("./Service/Report/Attendance/OutReport.service");
var WorkSheet_component_1 = require("./components/HumanResource/Attendance/WorkSheet.component");
var WorkSheet_service_1 = require("./Service/HumanResource/Attendance/WorkSheet.service");
var WorkSheet_pipe_1 = require("./filter/HumanResource/Attendance/WorkSheet.pipe");
var MySkill_component_1 = require("./components/HumanResource/Attendance/MySkill.component");
var MySkill_service_1 = require("./Service/HumanResource/Attendance/MySkill.service");
var MySkill_pipe_1 = require("./filter/HumanResource/Attendance/MySkill.pipe");
var MyTeam_component_1 = require("./components/HumanResource/Attendance/MyTeam.component");
var MyTeam_service_1 = require("./Service/HumanResource/Attendance/MyTeam.service");
var MyTeam_pipe_1 = require("./filter/HumanResource/Attendance/MyTeam.pipe");
var EmployeeFeedback_component_1 = require("./components/HumanResource/Attendance/EmployeeFeedback.component");
var EmployeeFeedback_service_1 = require("./Service/HumanResource/Attendance/EmployeeFeedback.service");
var EmployeeFeedback_pipe_1 = require("./filter/HumanResource/Attendance/EmployeeFeedback.pipe");
var Levels_Achievement_component_1 = require("./Components/Masters/EmployeeLevels/Levels_Achievement.component");
var Levels_Achievement_service_1 = require("./Service/Masters/EmployeeLevels/Levels_Achievement.service");
var Levels_Achievement_pipe_1 = require("./filter/Masters/EmployeeLevels/Levels_Achievement.pipe");
var AttendanceEntry_component_1 = require("./Components/UserManagement/AttendanceEntry.component");
var AttendanceEntry_Service_1 = require("./Service/UserManagement/AttendanceEntry.Service");
var EmployeeScreenCapture_component_1 = require("./components/Report/Attendance/EmployeeScreenCapture.component");
var EmployeeScreenCaptureReport_service_1 = require("./Service/Report/Attendance/EmployeeScreenCaptureReport.service");
var EmployeeDashboardHeartBeatReport_component_1 = require("./components/Report/Attendance/EmployeeDashboardHeartBeatReport.component");
var EmployeeDashboardHeartBeat_service_1 = require("./Service/Report/Attendance/EmployeeDashboardHeartBeat.service");
var AttendanceAccessCardComparisionReport_component_1 = require("./components/Report/Attendance/AttendanceAccessCardComparisionReport.component");
var AttendanceAccessCardComparisionReport_service_1 = require("./Service/Report/Attendance/AttendanceAccessCardComparisionReport.service");
var EmployeeList_component_1 = require("./components/HumanResource/EmployeeManagement/EmployeeList.component");
var EmployeeList_service_1 = require("./Service/HumanResource/EmployeeManagement/EmployeeList.service");
var EmployeeList_pipe_1 = require("./filter/HumanResource/EmployeeManagement/EmployeeList.pipe");
var EmpInfoTabular_component_1 = require("./components/HumanResource/EmployeeManagement/EmpInfoTabular.component");
var EmpInfoTabular_service_1 = require("./Service/HumanResource/EmployeeManagement/EmpInfoTabular.service");
var ManualPointEntry_component_1 = require("./components/Masters/EmployeeLevels/ManualPointEntry.component");
var ManualPointEntry_service_1 = require("./Service/Masters/EmployeeLevels/ManualPointEntry.service");
var ManualPointEntry_pipe_1 = require("./Filter/Masters/EmployeeLevels/ManualPointEntry.pipe");
var LateEarlyReport_component_1 = require("./components/Report/Attendance/LateEarlyReport.component");
var LateEarlyReport_pipe_1 = require("./Filter/Report/Attendance/LateEarlyReport.pipe");
var LateEarlyReport_service_1 = require("./Service/Report/Attendance/LateEarlyReport.service");
var UserRole_component_1 = require("./components/Masters/CompanyRelated/UserRole.component");
var UserRole_service_1 = require("./Service/Masters/CompanyRelated/UserRole.service");
var UserRole_pipe_1 = require("./Filter/Masters/CompanyRelated/UserRole.pipe");
var EducationType_component_1 = require("./components/Masters/CompanyRelated/EducationType.component");
var EducationType_service_1 = require("./Service/Masters/CompanyRelated/EducationType.service");
var EducationType_pipe_1 = require("./Filter/Masters/CompanyRelated/EducationType.pipe");
var SalaryBreakupType_component_1 = require("./components/Masters/CompanyRelated/SalaryBreakupType.component");
var SalaryBreakupType_service_1 = require("./Service/Masters/CompanyRelated/SalaryBreakupType.service");
var SalaryBreakupType_pipe_1 = require("./Filter/Masters/CompanyRelated/SalaryBreakupType.pipe");
var AddEmployeeRecord_component_1 = require("./Components/Report/Attendance/AddEmployeeRecord.component");
var AddEmployeeRecord_service_1 = require("./Service/Report/Attendance/AddEmployeeRecord.service");
var AttendanceReportNew_component_1 = require("./Components/Report/Attendance/AttendanceReportNew.component");
var AttendanceReportNew_service_1 = require("./Service/Report/Attendance/AttendanceReportNew.service");
var OfficialWorkReport_component_1 = require("./Components/Report/Attendance/OfficialWorkReport.component");
var OfficialWorkReport_pipe_1 = require("./Filter/Report/Attendance/OfficialWorkReport.pipe");
var OfficialWorkReport_service_1 = require("./Service/Report/Attendance/OfficialWorkReport.service");
var RFQEstimateListing_component_1 = require("./components/RFQ/RFQEstimateListing.component");
var RFQ_pipe_1 = require("./Filter/RFQ/RFQ.pipe");
var RFQ_service_1 = require("./Service/RFQ/RFQ.service");
var AddRFQ_component_1 = require("./components/RFQ/AddRFQ.component");
var RFQEstimateAllRFQ_component_1 = require("./components/RFQ/RFQEstimateAllRFQ.component");
var ResponceRequestedRFQ_component_1 = require("./components/RFQ/ResponceRequestedRFQ.component");
var MyWatchListRFQ_component_1 = require("./components/RFQ/MyWatchListRFQ.component");
var MyActionRFQ_component_1 = require("./components/RFQ/MyActionRFQ.component");
var RFQProspectClient_pipe_1 = require("./Filter/RFQ/RFQProspectClient.pipe");
var ng2_datepicker_1 = require("ng2-datepicker");
var ProductivityTrackerReport_component_1 = require("./Components/Report/Attendance/ProductivityTrackerReport.component");
var ProductivityTrackerReport_service_1 = require("./Service/Report/Attendance/ProductivityTrackerReport.service");
var ConfigureSurvey_component_1 = require("./Components/Opinion/ConfigureSurvey.component");
var ConfigureSurvey_service_1 = require("./Service/Opinion/ConfigureSurvey.service");
var ng2_tree_1 = require("ng2-tree");
var CurrencyHistory_component_1 = require("./components/Masters/CurrencyRelated/CurrencyHistory.component");
var CurrencyHistory_service_1 = require("./Service/Masters/CurrencyRelated/CurrencyHistory.service");
var SalaryGrievance_component_1 = require("./Components/HumanResource/Grievance/SalaryGrievance.component");
var SalaryGrievance_service_1 = require("./Service/HumanResource/Grievance/SalaryGrievance.service");
var DocumentTemplate_component_1 = require("./Components/DocCenter/DocumentTemplate.component");
var DocumentTemplate_service_1 = require("./Service/DocCenter/DocumentTemplate.service");
var AddResponse_component_1 = require("./Components/RFQ/AddResponse.component");
var RFQResponse_service_1 = require("./Service/RFQ/RFQResponse.service");
var ViewResponse_component_1 = require("./Components/RFQ/ViewResponse.component");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, forms_1.ReactiveFormsModule, http_1.HttpModule, app_routing_1.routing, ng2_bs3_modal_1.Ng2Bs3ModalModule, forms_1.FormsModule, angular2_color_picker_1.ColorPickerModule, ng2_ckeditor_1.CKEditorModule, ng2_tab_1.Ng2TabModule,
                angular_2_dropdown_multiselect_1.MultiselectDropdownModule, ng2_datepicker_1.NgDatepickerModule, ng2_tree_1.TreeModule],
            declarations: [app_component_1.AppComponent, search_component_1.SearchComponent, orderby_pipe_1.OrderrByPipe, login_component_1.LoginComponent, home_component_1.HomeComponent,
                currency_component_1.CurrencyComponent, currency_pipe_1.CurrencyFilterPipe, levels_component_1.LevelsComponent, levels_pipe_1.LevelsFilterPipe,
                ContactMaster_component_1.ContactMasterComponent, ContactMaster_pipe_1.ContactMasterFilterPipe, BankMaster_component_1.BankMasterComponent, BankMaster_pipe_1.BankMasterFilterPipe,
                RatingType_component_1.RatingTypeComponent, RatingType_pipe_1.RatingTypeFilterPipe, LookupType_component_1.LookupTypeComponent, LookupType_pipe_1.LookupTypeFilterPipe, Lookup_component_1.LookupComponent, Lookup_pipe_1.LookupFilterPipe,
                SkillGroup_component_1.SkillGroupComponent, SkillGroup_pipe_1.SkillGroupFilterPipe, Skill_component_1.SkillComponent, Skill_pipe_1.SkillFilterPipe,
                Position_component_1.PositionComponent, Position_pipe_1.PositionFilterPipe, TechnologyMaster_component_1.TechnologyMasterComponent, TechnologyMaster_pipe_1.TechnologyMasterFilterPipe,
                CompanyMaster_Component_1.CompanyMasterComponent, CompanyMaster_pipe_1.CompanyMasterFilterPipe, MacIdConfiguration_component_1.MacIdConfigurationComponent, MacIdConfiguration_pipe_1.MacIdConfigurationFilterPipe,
                ng2_file_upload_1.FileDropDirective, ng2_file_upload_1.FileSelectDirective, SecurityKey_component_1.SecurityKeyComponent, SecurityKey_pipe_1.SecurityKeyFilterPipe,
                FinancialYear_component_1.FinancialYearComponent, FinancialYear_pipe_1.FinancialYearFilterPipe, EventCountDown_component_1.EventCountDownComponent, EventCountDown_pipe_1.EventCountDownFilterPipe,
                dashboard_component_1.DashboardComponent, CommonConfiguration_component_1.CommonConfigurationComponent, CommonConfiguration_pipe_1.CommonConfigurationFilterPipe,
                LevelConfiguration_component_1.LevelConfigurationComponent, LevelConfiguration_pipe_1.LevelConfigurationFilterPipe, policy_component_1.PolicyComponent, policy_pipe_1.PolicyFilterPipe,
                ConfigureWorkSheet_component_1.ConfigureWorkSheetComponent, ConfigureWorksheet_pipe_1.ConfigureWorkSheetFilterPipe, News_component_1.NewsComponent, News_pipe_1.NewsFilterPipe,
                LevelCriteriaSetup_component_1.LevelCriteriaSetupComponent, LevelCriteriaSetup_pipe_1.LevelCriteriaSetupFilterPipe, ConfigureTicket_component_1.ConfigureTicketComponent, ConfigureTicket_pipe_1.ConfigureTicketFilterPipe,
                HelpTicketAdd_component_1.HelpTicketAddComponent, HelpTicketAdd_pipe_1.HelpTicketAddFilterPipe, MyTicket_component_1.MyTicketComponent, MyTicket_pipe_1.MyTicketFilterPipe,
                HomePageImage_component_1.HomePageImageComponent, HomePageImage_pipe_1.HomePageImageFilterPipe, ChangePassword_component_1.ChangePasswordComponent,
                TicketListOpen_component_1.TicketListOpenComponent, TicketListOpen_pipe_1.TicketListOpenFilterPipe, TicketListClosed_component_1.TicketListClosedComponent,
                TicketListClosed_pipe_1.TicketListClosedFilterPipe, MyProfiles_component_1.MyProfilesComponent, MyProfiles_pipe_1.MyProfilesFilterPipe, LeaveType_component_1.LeaveTypeComponent,
                LeaveType_pipe_1.LeaveTypeFilterPipe, GroupName_component_1.GroupNameComponent, GroupName_pipe_1.GroupNameFilterPipe, DailyEntrysheet_component_1.DailyEntrysheetComponent,
                AttendanceReport_component_1.AttendanceReportComponent, OutReport_component_1.OutReportComponent, WorkSheet_component_1.WorkSheetComponent, WorkSheet_pipe_1.WorkSheetFilterPipe, MySkill_component_1.MySkillComponent,
                MySkill_pipe_1.MySkillFilterPipe, MyTeam_component_1.MyTeamComponent, MyTeam_pipe_1.MyTeamFilterPipe, EmployeeFeedback_component_1.EmployeeFeedbackComponent, EmployeeFeedback_pipe_1.EmployeeFeedbackFilterPipe,
                Levels_Achievement_component_1.Levels_AchievementComponent, Levels_Achievement_pipe_1.Levels_AchievementFilterPipe, AttendanceEntry_component_1.AttendanceEntryComponent, EmployeeScreenCapture_component_1.EmployeeScreenCaptureReportComponent,
                EmployeeDashboardHeartBeatReport_component_1.EmployeeDashboardHeartBeatReportComponent, AttendanceAccessCardComparisionReport_component_1.AttendanceAccessCardComparisionReportComponent,
                EmployeeList_component_1.EmployeeListComponent, EmployeeList_pipe_1.EmployeeListFilterPipe, EmpInfoTabular_component_1.EmpInfoTabularComponent, ManualPointEntry_component_1.ManualPointEntryComponent,
                ManualPointEntry_pipe_1.ManualPointEntryFilterPipe, LateEarlyReport_component_1.LateEarlyReportComponent, LateEarlyReport_pipe_1.LateEarlyReportFilterPipe, UserRole_component_1.UserRoleComponent, UserRole_pipe_1.UserRoleFilterPipe,
                EducationType_component_1.EducationTypeComponent, EducationType_pipe_1.EducationTypeFilterPipe, SalaryBreakupType_component_1.SalaryBreakupTypeComponent, SalaryBreakupType_pipe_1.SalaryBreakupTypeFilterPipe,
                AddEmployeeRecord_component_1.AddEmployeeRecordcomponent, AttendanceReportNew_component_1.AttendanceReportNewcomponent, OfficialWorkReport_component_1.OfficialWorkReportComponent, OfficialWorkReport_pipe_1.OfficialWorkReporFilterPipe,
                ProductivityTrackerReport_component_1.ProductivityTrackerReportcomponent, ConfigureSurvey_component_1.ConfigureSurveycomponent, RFQEstimateListing_component_1.RFQComponent, RFQ_pipe_1.RFQFilterPipe, RFQProspectClient_pipe_1.ProspectClientFilterPipe, AddRFQ_component_1.AddRFQComponent, RFQEstimateAllRFQ_component_1.AllRFQComponent,
                ResponceRequestedRFQ_component_1.ResponceRequestedRFQcomponent, MyWatchListRFQ_component_1.MyWatchListRFQComponent, MyActionRFQ_component_1.MyActionRFQcomponent, CurrencyHistory_component_1.CurrencyHistoryComponent, SalaryGrievance_component_1.SalaryGrievanceComponent,
                DocumentTemplate_component_1.DocumentTemplateComponent, AddResponse_component_1.AddRFQResponsecomponent, ViewResponse_component_1.ViewRFQResponsecomponent],
            providers: [{ provide: core_1.ErrorHandler, useClass: errorhandler_1.default }, { provide: common_1.APP_BASE_HREF, useValue: '/' }, sharedcontents_1.SharedContents,
                auth_gaurd_1.AuthGuard, user_auth_gaurd_1.UserAuthGuard, login_Service_1.LoginService, currency_service_1.CurrencyService, levels_service_1.LevelsService, pager_index_1.PagerService, ContactMaster_service_1.ContactMasterService,
                BankMaster_service_1.BankMasterService, RatingType_service_1.RatingTypeService, Lookup_service_1.LookupService, LookupType_service_1.LookupTypeService, SkillGroup_service_1.SkillGroupService, Skill_service_1.SkillService, Position_service_1.PositionService,
                TechnologyMaster_service_1.TechnologyMasterService, CompanyMaster_service_1.CompanyMasterService, MacIdConfiguration_service_1.MacIdConfigurationService, SecurityKey_service_1.SecurityKeyService,
                FinancialYear_service_1.FinancialYearService, EventCountDown_service_1.EventCountDownService, dashboard_service_1.DashboardService, CommonConfiguration_service_1.CommonConfigurationService, LevelConfiguration_service_1.LevelConfigurationService,
                policy_service_1.PolicyService, ConfigureWorksheet_service_1.ConfigureWorksheetService, News_service_1.NewsService, LevelCriteriaSetup_service_1.LevelCriteriaSetupService, ConfigureTicket_service_1.ConfigureTicketService, HelpTicketAdd_service_1.HelpTicketAddService,
                MyTicket_service_1.MyTicketService, HomePageImage_service_1.HomePageImageService, ChangePassword_service_1.ChangePSWService, TicketListOpen_service_1.TicketListOpenService, TicketListClosed_service_1.TicketListClosedService, MyProfiles_service_1.MyProfilesService,
                LeaveType_service_1.LeaveTypeService, GroupName_service_1.GroupNameService, DailyEntrysheet_service_1.DailyEntrysheetService, AttendanceReport_Service_1.AttendanceReportService, OutReport_service_1.OutReportService, WorkSheet_service_1.WorkSheetService,
                MySkill_service_1.MySkillService, MyTeam_service_1.MyTeamService, EmployeeFeedback_service_1.EmployeeFeedbackService, Levels_Achievement_service_1.Levels_AchievementService, AttendanceEntry_Service_1.AttendanceEntryService,
                EmployeeScreenCaptureReport_service_1.EmployeeScreenCaptureReportService, EmployeeDashboardHeartBeat_service_1.EmployeeDashboardHeartBeatReportService, AttendanceAccessCardComparisionReport_service_1.AttendanceAccessCardComparisionReportService,
                EmployeeList_service_1.EmployeeListService, EmpInfoTabular_service_1.EmpInfoTabularService, ManualPointEntry_service_1.ManualPointEntryService, LateEarlyReport_service_1.LateEarlyReportService, UserRole_service_1.UserRoleService,
                EducationType_service_1.EducationTypeService, SalaryBreakupType_service_1.SalaryBreakupTypeService, AddEmployeeRecord_service_1.AddEmployeeRecordService, AttendanceReportNew_service_1.AttendanceReportNewService, OfficialWorkReport_service_1.OfficialWorkReportService,
                ProductivityTrackerReport_service_1.ProductivityTrackerReportService, ConfigureSurvey_service_1.ConfigureSurveyService, RFQ_service_1.RFQService, exportexcel_service_1.ExcelService, CommonHelper_service_1.CommonHelperService, CurrencyHistory_service_1.CurrencyHistoryService,
                SalaryGrievance_service_1.SalaryGrievanceService, DocumentTemplate_service_1.DocumentTemplateService, RFQResponse_service_1.RFQResponseService],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
