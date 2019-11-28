import { NgModule, ErrorHandler } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { CKEditorModule } from 'ng2-ckeditor'
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { FileDropDirective, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { HttpModule } from '@angular/http';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { Ng2TabModule } from 'ng2-tab';

import { ColorPickerModule } from 'angular2-color-picker';
import { routing } from './app.routing';
import AppErrorHandler from './Shared/errorhandler';
import { SearchComponent } from './Shared/search.component';
import { OrderrByPipe } from './Shared/orderby.pipe';
import { SharedContents } from './Shared/sharedcontents';
import { AuthGuard } from './Shared/auth.gaurd';
import { UserAuthGuard } from './Shared/user.auth.gaurd';
import { LoginComponent } from './components/UserManagement/login.component';
import { LoginService } from './Service/UserManagement/login.Service';
import { HomeComponent } from './components/home.component';
import { PagerService } from './Shared/pager.index';
import { CommonHelperService } from './Shared/CommonHelper.service';
import { ExcelService } from './Shared/exportexcel.service';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';


import { CurrencyComponent } from './components/Masters/CurrencyRelated/currency.component';
import { CurrencyService } from './Service/Masters/CurrencyRelated/currency.service'
import { CurrencyFilterPipe } from './filter/Masters/CurrencyRelated/currency.pipe'

import { LevelsComponent } from './components/Masters/EmployeeLevels/levels.component';
import { LevelsService } from './Service/Masters/EmployeeLevels/levels.service'
import { LevelsFilterPipe } from './filter/Masters/EmployeeLevels/levels.pipe'

import { ContactMasterComponent } from './components/Masters/CompanyRelated/ContactMaster.component';
import { ContactMasterService } from './Service/Masters/CompanyRelated/ContactMaster.service';
import { ContactMasterFilterPipe } from './filter/Masters/CompanyRelated/ContactMaster.pipe';

import { BankMasterComponent } from './components/Masters/CompanyRelated/BankMaster.component';
import { BankMasterService } from './Service/Masters/CompanyRelated/BankMaster.service';
import { BankMasterFilterPipe } from './filter/Masters/CompanyRelated/BankMaster.pipe';

import { RatingTypeComponent } from './components/Masters/VacancyRelated/RatingType.component';
import { RatingTypeService } from './Service/Masters/VacancyRelated/RatingType.service';
import { RatingTypeFilterPipe } from './Filter/Masters/VacancyRelated/RatingType.pipe';

import { LookupTypeComponent } from './components/Masters/CompanyRelated/LookupType.component';
import { LookupTypeService } from './Service/Masters/CompanyRelated/LookupType.service';
import { LookupTypeFilterPipe } from './Filter/Masters/CompanyRelated/LookupType.pipe';


import { LookupComponent } from './components/Masters/CompanyRelated/Lookup.component';
import { LookupService } from './Service/Masters/CompanyRelated/Lookup.service';
import { LookupFilterPipe } from './filter/Masters/CompanyRelated/Lookup.pipe';

import { SkillGroupComponent } from './components/Masters/VacancyRelated/SkillGroup.component';
import { SkillGroupService } from './Service/Masters/VacancyRelated/SkillGroup.service';
import { SkillGroupFilterPipe } from './filter/Masters/VacancyRelated/SkillGroup.pipe';

import { SkillComponent } from './components/Masters/VacancyRelated/Skill.component';
import { SkillService } from './Service/Masters/VacancyRelated/Skill.service';
import { SkillFilterPipe } from './filter/Masters/VacancyRelated/Skill.pipe';

import { PositionComponent } from './components/Masters/VacancyRelated/Position.component';
import { PositionService } from './Service/Masters/VacancyRelated/Position.service';
import { PositionFilterPipe } from './filter/Masters/VacancyRelated/Position.pipe';

import { TechnologyMasterComponent } from './components/Masters/VacancyRelated/TechnologyMaster.component';
import { TechnologyMasterService } from './Service/Masters/VacancyRelated/TechnologyMaster.service';
import { TechnologyMasterFilterPipe } from './filter/Masters/VacancyRelated/TechnologyMaster.pipe';

import { CompanyMasterComponent } from './components/Masters/CompanyRelated/CompanyMaster.Component';
import { CompanyMasterService } from './Service/Masters/CompanyRelated/CompanyMaster.service';
import { CompanyMasterFilterPipe } from './filter/Masters/CompanyRelated/CompanyMaster.pipe';

import { MacIdConfigurationComponent } from './components/Masters/Configuration/MacIdConfiguration.component';
import { MacIdConfigurationService } from './Service/Masters/Configuration/MacIdConfiguration.service';
import { MacIdConfigurationFilterPipe } from './filter/Masters/Configuration/MacIdConfiguration.pipe';

import { SecurityKeyComponent } from './components/Masters/Configuration/SecurityKey.component';
import { SecurityKeyService } from './Service/Masters/Configuration/SecurityKey.service';
import { SecurityKeyFilterPipe } from './filter/Masters/Configuration/SecurityKey.pipe';

import { FinancialYearComponent  } from './components/Masters/CompanyRelated/FinancialYear.component';
import { FinancialYearService } from './Service/Masters/CompanyRelated/FinancialYear.service';
import { FinancialYearFilterPipe } from './filter/Masters/CompanyRelated/FinancialYear.pipe';

import { EventCountDownComponent } from './components/Masters/Configuration/EventCountDown.component';
import { EventCountDownService } from './Service/Masters/Configuration/EventCountDown.service';
import { EventCountDownFilterPipe } from './filter/Masters/Configuration/EventCountDown.pipe';
import { DashboardComponent } from './components/Dashboard/dashboard.component';
import { DashboardService } from './Service/Dashboard/dashboard.service';

import { CommonConfigurationComponent } from './components/Masters/Configuration/CommonConfiguration.component';
import { CommonConfigurationService } from './Service/Masters/Configuration/CommonConfiguration.service';
import { CommonConfigurationFilterPipe } from './filter/Masters/Configuration/CommonConfiguration.pipe';

import { LevelConfigurationComponent } from './components/Masters/EmployeeLevels/LevelConfiguration.component';
import { LevelConfigurationService } from './Service/Masters/EmployeeLevels/LevelConfiguration.service'
import { LevelConfigurationFilterPipe } from './filter/Masters/EmployeeLevels/LevelConfiguration.pipe'

import { PolicyComponent } from './components/Notification/policy.component';
import { PolicyService } from './Service/Notification/policy.service';
import { PolicyFilterPipe } from './filter/Notification/policy.pipe';

import { ConfigureWorkSheetComponent } from './components/Masters/Configuration/ConfigureWorkSheet.component';
import { ConfigureWorksheetService } from './Service/Masters/Configuration/ConfigureWorksheet.service';
import { ConfigureWorkSheetFilterPipe} from './filter/Masters/Configuration/ConfigureWorksheet.pipe';

import { NewsComponent } from './components/Notification/News.component';
import { NewsService } from './Service/Notification/News.service';
import { NewsFilterPipe } from './filter/Notification/News.pipe';

import { LevelCriteriaSetupComponent } from './Components/Masters/EmployeeLevels/LevelCriteriaSetup.component';
import { LevelCriteriaSetupService } from './Service/Masters/EmployeeLevels/LevelCriteriaSetup.service';
import { LevelCriteriaSetupFilterPipe } from './Filter/Masters/EmployeeLevels/LevelCriteriaSetup.pipe';

import { ConfigureTicketComponent } from './Components/Masters/Configuration/ConfigureTicket.component';
import { ConfigureTicketService } from './Service/Masters/Configuration/ConfigureTicket.service';
import { ConfigureTicketFilterPipe } from './Filter/Masters/Configuration/ConfigureTicket.pipe';

import { HomePageImageComponent } from './Components/Masters/CompanyRelated/HomePageImage.component';
import { HomePageImageService } from './Service/Masters/CompanyRelated/HomePageImage.service';
import { HomePageImageFilterPipe } from './Filter/Masters/CompanyRelated/HomePageImage.pipe';

import { HelpTicketAddComponent } from './Components/Notification/HelpTicketAdd.component';
import { HelpTicketAddService } from './Service/Notification/HelpTicketAdd.service';
import { HelpTicketAddFilterPipe } from './Filter/Notification/HelpTicketAdd.pipe';


import { MyTicketComponent } from './Components/Notification/MyTicket.component';
import { MyTicketService } from './Service/Notification/MyTicket.service';
import { MyTicketFilterPipe } from './Filter/Notification/MyTicket.pipe';

import { ChangePasswordComponent } from './Components/HumanResource/ProfileAttendance/ChangePassword.component';
import { ChangePSWService } from './Service/HumanResource/ProfileAttendance/ChangePassword.service';

import { TicketListOpenComponent } from './Components/Notification/TicketListOpen.component';
import { TicketListOpenService } from './Service/Notification/TicketListOpen.service';
import { TicketListOpenFilterPipe } from './Filter/Notification/TicketListOpen.pipe';

import { TicketListClosedComponent } from './Components/Notification/TicketListClosed.component';
import { TicketListClosedService } from './Service/Notification/TicketListClosed.service';
import { TicketListClosedFilterPipe } from './Filter/Notification/TicketListClosed.pipe';

import { MyProfilesComponent } from './Components/HumanResource/ProfileAttendance/MyProfiles.component';
import { MyProfilesService } from './Service/HumanResource/ProfileAttendance/MyProfiles.service';
import { MyProfilesFilterPipe } from './Filter/HumanResource/ProfileAttendance/MyProfiles.pipe';

import { LeaveTypeComponent } from './components/Masters/CompanyRelated/LeaveType.component';
import { LeaveTypeService } from './Service/Masters/CompanyRelated/LeaveType.service';
import { LeaveTypeFilterPipe } from './filter/Masters/CompanyRelated/LeaveType.pipe'

import { GroupNameComponent } from './components/Masters/CompanyRelated/GroupName.component';
import { GroupNameService } from './Service/Masters/CompanyRelated/GroupName.service';
import { GroupNameFilterPipe } from './filter/Masters/CompanyRelated/GroupName.pipe'

import { DailyEntrysheetComponent } from './components/Report/Attendance/DailyEntrysheet.component';
import { DailyEntrysheetService } from './Service/Report/Attendance/DailyEntrysheet.service';

import { AttendanceReportComponent } from './Components/Report/Attendance/AttendanceReport.component';
import { AttendanceReportService } from './Service/Report/Attendance/AttendanceReport.Service';

import { OutReportComponent } from './components/Report/Attendance/OutReport.component';
import { OutReportService } from './Service/Report/Attendance/OutReport.service';

import { WorkSheetComponent } from './components/HumanResource/Attendance/WorkSheet.component';
import { WorkSheetService } from './Service/HumanResource/Attendance/WorkSheet.service';
import { WorkSheetFilterPipe } from './filter/HumanResource/Attendance/WorkSheet.pipe';

import { MySkillComponent } from './components/HumanResource/Attendance/MySkill.component';
import { MySkillService } from './Service/HumanResource/Attendance/MySkill.service';
import { MySkillFilterPipe } from './filter/HumanResource/Attendance/MySkill.pipe';


import { MyTeamComponent } from './components/HumanResource/Attendance/MyTeam.component';
import { MyTeamService} from './Service/HumanResource/Attendance/MyTeam.service';
import { MyTeamFilterPipe} from './filter/HumanResource/Attendance/MyTeam.pipe';

import { EmployeeFeedbackComponent } from './components/HumanResource/Attendance/EmployeeFeedback.component';
import { EmployeeFeedbackService } from './Service/HumanResource/Attendance/EmployeeFeedback.service';
import { EmployeeFeedbackFilterPipe } from './filter/HumanResource/Attendance/EmployeeFeedback.pipe';

import { Levels_AchievementComponent } from './Components/Masters/EmployeeLevels/Levels_Achievement.component';
import { Levels_AchievementService } from './Service/Masters/EmployeeLevels/Levels_Achievement.service'
import { Levels_AchievementFilterPipe } from './filter/Masters/EmployeeLevels/Levels_Achievement.pipe'

import { AttendanceEntryComponent } from './Components/UserManagement/AttendanceEntry.component';
import { AttendanceEntryService } from './Service/UserManagement/AttendanceEntry.Service'; 

import { EmployeeScreenCaptureReportComponent } from './components/Report/Attendance/EmployeeScreenCapture.component';
import { EmployeeScreenCaptureReportService } from './Service/Report/Attendance/EmployeeScreenCaptureReport.service';

import { EmployeeDashboardHeartBeatReportComponent } from './components/Report/Attendance/EmployeeDashboardHeartBeatReport.component';
import { EmployeeDashboardHeartBeatReportService } from './Service/Report/Attendance/EmployeeDashboardHeartBeat.service';

import { AttendanceAccessCardComparisionReportComponent } from './components/Report/Attendance/AttendanceAccessCardComparisionReport.component';
import { AttendanceAccessCardComparisionReportService } from './Service/Report/Attendance/AttendanceAccessCardComparisionReport.service';


import { EmployeeListComponent } from './components/HumanResource/EmployeeManagement/EmployeeList.component';
import { EmployeeListService } from './Service/HumanResource/EmployeeManagement/EmployeeList.service';
import { EmployeeListFilterPipe } from './filter/HumanResource/EmployeeManagement/EmployeeList.pipe';


import { EmpInfoTabularComponent } from './components/HumanResource/EmployeeManagement/EmpInfoTabular.component';
import { EmpInfoTabularService } from './Service/HumanResource/EmployeeManagement/EmpInfoTabular.service';

import { ManualPointEntryComponent } from './components/Masters/EmployeeLevels/ManualPointEntry.component';
import { ManualPointEntryService } from './Service/Masters/EmployeeLevels/ManualPointEntry.service';
import { ManualPointEntryFilterPipe } from './Filter/Masters/EmployeeLevels/ManualPointEntry.pipe';

import { LateEarlyReportComponent } from './components/Report/Attendance/LateEarlyReport.component';
import { LateEarlyReportFilterPipe } from './Filter/Report/Attendance/LateEarlyReport.pipe';
import { LateEarlyReportService } from './Service/Report/Attendance/LateEarlyReport.service';


import { UserRoleComponent } from './components/Masters/CompanyRelated/UserRole.component';
import { UserRoleService } from './Service/Masters/CompanyRelated/UserRole.service';
import { UserRoleFilterPipe } from './Filter/Masters/CompanyRelated/UserRole.pipe';


import { EducationTypeComponent } from './components/Masters/CompanyRelated/EducationType.component';
import { EducationTypeService } from './Service/Masters/CompanyRelated/EducationType.service';
import { EducationTypeFilterPipe } from './Filter/Masters/CompanyRelated/EducationType.pipe';


import { SalaryBreakupTypeComponent } from './components/Masters/CompanyRelated/SalaryBreakupType.component';
import { SalaryBreakupTypeService } from './Service/Masters/CompanyRelated/SalaryBreakupType.service';
import { SalaryBreakupTypeFilterPipe } from './Filter/Masters/CompanyRelated/SalaryBreakupType.pipe';

import { AddEmployeeRecordcomponent } from './Components/Report/Attendance/AddEmployeeRecord.component';
import { AddEmployeeRecordService } from './Service/Report/Attendance/AddEmployeeRecord.service';

import { AttendanceReportNewcomponent } from './Components/Report/Attendance/AttendanceReportNew.component';
import { AttendanceReportNewService } from './Service/Report/Attendance/AttendanceReportNew.service';

import { OfficialWorkReportComponent } from './Components/Report/Attendance/OfficialWorkReport.component';
import { OfficialWorkReporFilterPipe } from './Filter/Report/Attendance/OfficialWorkReport.pipe';
import { OfficialWorkReportService } from './Service/Report/Attendance/OfficialWorkReport.service';

import { RFQComponent } from './components/RFQ/RFQEstimateListing.component';
import { RFQFilterPipe } from './Filter/RFQ/RFQ.pipe';
import { RFQService } from './Service/RFQ/RFQ.service';
import { AddRFQComponent } from './components/RFQ/AddRFQ.component';
import { AllRFQComponent } from './components/RFQ/RFQEstimateAllRFQ.component';
import { ResponceRequestedRFQcomponent } from './components/RFQ/ResponceRequestedRFQ.component';
import { MyWatchListRFQComponent } from './components/RFQ/MyWatchListRFQ.component';
import { MyActionRFQcomponent } from './components/RFQ/MyActionRFQ.component';
import { ProspectClientFilterPipe } from './Filter/RFQ/RFQProspectClient.pipe';


import { NgDatepickerModule } from 'ng2-datepicker';

import { ProductivityTrackerReportcomponent } from './Components/Report/Attendance/ProductivityTrackerReport.component';
import { ProductivityTrackerReportService } from './Service/Report/Attendance/ProductivityTrackerReport.service';

import { ConfigureSurveycomponent } from './Components/Opinion/ConfigureSurvey.component';
import { ConfigureSurveyService } from './Service/Opinion/ConfigureSurvey.service';

import { TreeModule } from 'ng2-tree';

import { CurrencyHistoryComponent } from './components/Masters/CurrencyRelated/CurrencyHistory.component';
import { CurrencyHistoryService } from './Service/Masters/CurrencyRelated/CurrencyHistory.service';

import { SalaryGrievanceComponent } from './Components/HumanResource/Grievance/SalaryGrievance.component';
import { SalaryGrievanceService } from './Service/HumanResource/Grievance/SalaryGrievance.service';

import { DocumentTemplateComponent } from './Components/DocCenter/DocumentTemplate.component';
import { DocumentTemplateService } from './Service/DocCenter/DocumentTemplate.service';

import { AddRFQResponsecomponent } from './Components/RFQ/AddResponse.component';
import { RFQResponseService } from './Service/RFQ/RFQResponse.service';
import { ViewRFQResponsecomponent} from './Components/RFQ/ViewResponse.component';

@NgModule({
    imports: [BrowserModule, ReactiveFormsModule, HttpModule, routing, Ng2Bs3ModalModule, FormsModule, ColorPickerModule, CKEditorModule, Ng2TabModule,
        MultiselectDropdownModule, NgDatepickerModule, TreeModule],

    declarations: [AppComponent, SearchComponent, OrderrByPipe, LoginComponent, HomeComponent,
        CurrencyComponent, CurrencyFilterPipe, LevelsComponent, LevelsFilterPipe,
        ContactMasterComponent, ContactMasterFilterPipe, BankMasterComponent, BankMasterFilterPipe,
        RatingTypeComponent, RatingTypeFilterPipe, LookupTypeComponent, LookupTypeFilterPipe, LookupComponent, LookupFilterPipe,
        SkillGroupComponent, SkillGroupFilterPipe, SkillComponent, SkillFilterPipe, 
        PositionComponent, PositionFilterPipe, TechnologyMasterComponent, TechnologyMasterFilterPipe, 
        CompanyMasterComponent, CompanyMasterFilterPipe, MacIdConfigurationComponent, MacIdConfigurationFilterPipe,
        FileDropDirective, FileSelectDirective, SecurityKeyComponent, SecurityKeyFilterPipe,
        FinancialYearComponent, FinancialYearFilterPipe, EventCountDownComponent, EventCountDownFilterPipe,
        DashboardComponent, CommonConfigurationComponent, CommonConfigurationFilterPipe, 
        LevelConfigurationComponent, LevelConfigurationFilterPipe, PolicyComponent, PolicyFilterPipe,
        ConfigureWorkSheetComponent, ConfigureWorkSheetFilterPipe, NewsComponent, NewsFilterPipe,
        LevelCriteriaSetupComponent, LevelCriteriaSetupFilterPipe, ConfigureTicketComponent, ConfigureTicketFilterPipe,
        HelpTicketAddComponent, HelpTicketAddFilterPipe, MyTicketComponent, MyTicketFilterPipe,
        HomePageImageComponent, HomePageImageFilterPipe, ChangePasswordComponent,
        TicketListOpenComponent, TicketListOpenFilterPipe, TicketListClosedComponent,
        TicketListClosedFilterPipe, MyProfilesComponent, MyProfilesFilterPipe, LeaveTypeComponent,
        LeaveTypeFilterPipe, GroupNameComponent, GroupNameFilterPipe, DailyEntrysheetComponent,
        AttendanceReportComponent, OutReportComponent, WorkSheetComponent, WorkSheetFilterPipe, MySkillComponent,
        MySkillFilterPipe, MyTeamComponent, MyTeamFilterPipe, EmployeeFeedbackComponent, EmployeeFeedbackFilterPipe,
        Levels_AchievementComponent, Levels_AchievementFilterPipe, AttendanceEntryComponent, EmployeeScreenCaptureReportComponent,
        EmployeeDashboardHeartBeatReportComponent, AttendanceAccessCardComparisionReportComponent
        , EmployeeListComponent, EmployeeListFilterPipe, EmpInfoTabularComponent, ManualPointEntryComponent,
        ManualPointEntryFilterPipe, LateEarlyReportComponent, LateEarlyReportFilterPipe, UserRoleComponent, UserRoleFilterPipe,
        EducationTypeComponent, EducationTypeFilterPipe, SalaryBreakupTypeComponent, SalaryBreakupTypeFilterPipe,
        AddEmployeeRecordcomponent, AttendanceReportNewcomponent, OfficialWorkReportComponent, OfficialWorkReporFilterPipe,
        ProductivityTrackerReportcomponent, ConfigureSurveycomponent, RFQComponent, RFQFilterPipe, ProspectClientFilterPipe, AddRFQComponent, AllRFQComponent,
        ResponceRequestedRFQcomponent, MyWatchListRFQComponent, MyActionRFQcomponent, CurrencyHistoryComponent, SalaryGrievanceComponent,
        DocumentTemplateComponent, AddRFQResponsecomponent, ViewRFQResponsecomponent ],
        

    providers: [{ provide: ErrorHandler, useClass: AppErrorHandler }, { provide: APP_BASE_HREF, useValue: '/' }, SharedContents,
        AuthGuard, UserAuthGuard, LoginService, CurrencyService, LevelsService, PagerService, ContactMasterService,
        BankMasterService, RatingTypeService, LookupService, LookupTypeService, SkillGroupService, SkillService, PositionService,
        TechnologyMasterService, CompanyMasterService, MacIdConfigurationService, SecurityKeyService,
        FinancialYearService, EventCountDownService, DashboardService, CommonConfigurationService, LevelConfigurationService,
        PolicyService, ConfigureWorksheetService, NewsService, LevelCriteriaSetupService, ConfigureTicketService, HelpTicketAddService,
        MyTicketService, HomePageImageService, ChangePSWService, TicketListOpenService, TicketListClosedService, MyProfilesService,
        LeaveTypeService, GroupNameService, DailyEntrysheetService, AttendanceReportService, OutReportService, WorkSheetService,
        MySkillService, MyTeamService, EmployeeFeedbackService, Levels_AchievementService, AttendanceEntryService,
        EmployeeScreenCaptureReportService, EmployeeDashboardHeartBeatReportService, AttendanceAccessCardComparisionReportService,
        EmployeeListService, EmpInfoTabularService, ManualPointEntryService, LateEarlyReportService, UserRoleService,
        EducationTypeService, SalaryBreakupTypeService, AddEmployeeRecordService, AttendanceReportNewService, OfficialWorkReportService,
        ProductivityTrackerReportService, ConfigureSurveyService, RFQService, ExcelService, CommonHelperService, CurrencyHistoryService,
        SalaryGrievanceService, DocumentTemplateService, RFQResponseService],
    bootstrap: [AppComponent]

})
export class AppModule { }