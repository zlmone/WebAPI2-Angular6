import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, Params } from '@angular/router';

import { CurrencyComponent } from './components/Masters/CurrencyRelated/currency.component';
import { LevelsComponent } from './components/Masters/EmployeeLevels/levels.component';
import { HomeComponent } from './components/home.component';
import { LoginComponent } from './components/UserManagement/login.component';
import { AuthGuard } from './Shared/auth.gaurd';
import { UserAuthGuard } from './Shared/user.auth.gaurd';
import { ContactMasterComponent } from './components/Masters/CompanyRelated/ContactMaster.component';
import { BankMasterComponent } from './components/Masters/CompanyRelated/BankMaster.component';
import { RatingTypeComponent } from './components/Masters/VacancyRelated/RatingType.component';
import { LookupTypeComponent } from './components/Masters/CompanyRelated/LookupType.component';
import { LookupComponent } from './components/Masters/CompanyRelated/Lookup.component';
import { SkillGroupComponent } from './components/Masters/VacancyRelated/SkillGroup.component';
import { SkillComponent } from './components/Masters/VacancyRelated/Skill.component';
import { PositionComponent } from './components/Masters/VacancyRelated/Position.component';
import { TechnologyMasterComponent } from './components/Masters/VacancyRelated/TechnologyMaster.component';
import { CompanyMasterComponent } from './components/Masters/CompanyRelated/CompanyMaster.Component';
import { MacIdConfigurationComponent } from './components/Masters/Configuration/MacIdConfiguration.component';
import { SecurityKeyComponent } from './components/Masters/Configuration/SecurityKey.component';
import { FinancialYearComponent } from './components/Masters/CompanyRelated/FinancialYear.component';
import { EventCountDownComponent } from './components/Masters/Configuration/EventCountDown.component';
import { DashboardComponent } from './components/Dashboard/dashboard.component';
import { CommonConfigurationComponent } from './components/Masters/Configuration/CommonConfiguration.component';
import { LevelConfigurationComponent } from './components/Masters/EmployeeLevels/LevelConfiguration.component';
import { PolicyComponent } from './components/Notification/policy.component';
import { ConfigureWorkSheetComponent } from './components/Masters/Configuration/ConfigureWorkSheet.component';
import { NewsComponent } from './components/Notification/News.component';
import { LevelCriteriaSetupComponent } from './Components/Masters/EmployeeLevels/LevelCriteriaSetup.component';
import { ConfigureTicketComponent } from './Components/Masters/Configuration/ConfigureTicket.component';
import { HomePageImageComponent } from './Components/Masters/CompanyRelated/HomePageImage.component';
import { HelpTicketAddComponent } from './Components/Notification/HelpTicketAdd.component';
import { MyTicketComponent } from './Components/Notification/MyTicket.component';
import { ChangePasswordComponent } from './Components/HumanResource/ProfileAttendance/ChangePassword.component';
import { TicketListOpenComponent } from './Components/Notification/TicketListOpen.component';
import { TicketListClosedComponent } from './Components/Notification/TicketListClosed.component';
import { MyProfilesComponent } from './Components/HumanResource/ProfileAttendance/MyProfiles.component';
import { LeaveTypeComponent } from './components/Masters/CompanyRelated/LeaveType.component';
import { GroupNameComponent } from './components/Masters/CompanyRelated/GroupName.component';
import { DailyEntrysheetComponent } from './components/Report/Attendance/DailyEntrysheet.component';
import { AttendanceReportComponent } from './Components/Report/Attendance/AttendanceReport.component';
import { OutReportComponent } from './components/Report/Attendance/OutReport.component';
import { WorkSheetComponent } from './components/HumanResource/Attendance/WorkSheet.component';
import { MySkillComponent } from './components/HumanResource/Attendance/MySkill.component';
import { MyTeamComponent } from './components/HumanResource/Attendance/MyTeam.component';
import { EmployeeFeedbackComponent } from './components/HumanResource/Attendance/EmployeeFeedback.component';
import { Levels_AchievementComponent } from './Components/Masters/EmployeeLevels/Levels_Achievement.component';
import { AttendanceEntryComponent } from './Components/UserManagement/AttendanceEntry.component';
import { EmployeeScreenCaptureReportComponent } from './components/Report/Attendance/EmployeeScreenCapture.component';
import { EmployeeDashboardHeartBeatReportComponent } from './components/Report/Attendance/EmployeeDashboardHeartBeatReport.component';
import { AttendanceAccessCardComparisionReportComponent } from './components/Report/Attendance/AttendanceAccessCardComparisionReport.component';
import { EmployeeListComponent } from './components/HumanResource/EmployeeManagement/EmployeeList.component';
import { EmpInfoTabularComponent } from './components/HumanResource/EmployeeManagement/EmpInfoTabular.component';
import { ManualPointEntryComponent } from './components/Masters/EmployeeLevels/ManualPointEntry.component';
import { LateEarlyReportComponent } from './components/Report/Attendance/LateEarlyReport.component';
import { UserRoleComponent } from './components/Masters/CompanyRelated/UserRole.component';
import { EducationTypeComponent } from './components/Masters/CompanyRelated/EducationType.component';
import { SalaryBreakupTypeComponent } from './components/Masters/CompanyRelated/SalaryBreakupType.component';
import { AddEmployeeRecordcomponent } from './Components/Report/Attendance/AddEmployeeRecord.component';
import { AttendanceReportNewcomponent } from './Components/Report/Attendance/AttendanceReportNew.component';
import { OfficialWorkReportComponent } from './Components/Report/Attendance/OfficialWorkReport.component';
import { ProductivityTrackerReportcomponent } from './Components/Report/Attendance/ProductivityTrackerReport.component';
import { ConfigureSurveycomponent } from './Components/Opinion/ConfigureSurvey.component';
import { RFQComponent } from './components/RFQ/RFQEstimateListing.component';
import { AddRFQComponent } from './components/RFQ/AddRFQ.component';
import { AllRFQComponent } from './components/RFQ/RFQEstimateAllRFQ.component';
import { ResponceRequestedRFQcomponent } from './components/RFQ/ResponceRequestedRFQ.component';
import { MyWatchListRFQComponent } from './components/RFQ/MyWatchListRFQ.component';
import { MyActionRFQcomponent } from './components/RFQ/MyActionRFQ.component';
import { CurrencyHistoryComponent } from './components/Masters/CurrencyRelated/CurrencyHistory.component';
import { SalaryGrievanceComponent } from './Components/HumanResource/Grievance/SalaryGrievance.component';
import { DocumentTemplateComponent } from './Components/DocCenter/DocumentTemplate.component';
import { AddRFQResponsecomponent } from './Components/RFQ/AddResponse.component';
import { ViewRFQResponsecomponent } from './Components/RFQ/ViewResponse.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'currency', component: CurrencyComponent, canActivate: [AuthGuard] },
    { path: 'levels', component: LevelsComponent, canActivate: [AuthGuard] },
    { path: 'ContactMaster', component: ContactMasterComponent, canActivate: [AuthGuard] },
    { path: 'BankMaster', component: BankMasterComponent, canActivate: [AuthGuard] },
    { path: 'LookupType', component: LookupTypeComponent, canActivate: [AuthGuard] },
    { path: 'Lookup', component: LookupComponent, canActivate: [AuthGuard] },
    { path: 'skillgroup', component: SkillGroupComponent, canActivate: [AuthGuard] },
    { path: 'skill', component: SkillComponent, canActivate: [AuthGuard] },
    { path: 'position', component: PositionComponent, canActivate: [AuthGuard] },
    { path: 'TechnologyMaster', component: TechnologyMasterComponent, canActivate: [AuthGuard] },
    { path: 'CompanyMaster', component: CompanyMasterComponent, canActivate: [AuthGuard] },
    { path: 'macid', component: MacIdConfigurationComponent, canActivate: [AuthGuard] },
    { path: 'securitykey', component: SecurityKeyComponent, canActivate: [AuthGuard] },
    { path: 'FinancialYear', component: FinancialYearComponent, canActivate: [AuthGuard] },
    { path: 'eventcountdown', component: EventCountDownComponent, canActivate: [AuthGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'commonconfiguration', component: CommonConfigurationComponent, canActivate: [AuthGuard] },
    { path: 'LevelConfiguration', component: LevelConfigurationComponent, canActivate: [AuthGuard] },
    { path: 'policy', component: PolicyComponent, canActivate: [AuthGuard] },
    { path: 'configureworksheet', component: ConfigureWorkSheetComponent, canActivate: [AuthGuard] },
    { path: 'News', component: NewsComponent, canActivate: [AuthGuard] },
    { path: 'LevelCriteriaSetup', component: LevelCriteriaSetupComponent, canActivate: [AuthGuard] },
    { path: 'configureticket', component: ConfigureTicketComponent, canActivate: [AuthGuard] },
    { path: 'HelpTicketAdd', component: HelpTicketAddComponent, canActivate: [AuthGuard] },
    { path: 'MyTicket', component: MyTicketComponent, canActivate: [AuthGuard] },
    { path: 'homepageimage', component: HomePageImageComponent, canActivate: [AuthGuard] },
    { path: 'ChangePassword', component: ChangePasswordComponent, canActivate: [AuthGuard] },
    { path: 'TicketListOpen', component: TicketListOpenComponent, canActivate: [AuthGuard] },
    { path: 'TicketListClosed', component: TicketListClosedComponent, canActivate: [AuthGuard] },
    { path: 'MyProFiles', component: MyProfilesComponent, canActivate: [AuthGuard] },
    { path: 'LeaveType', component: LeaveTypeComponent, canActivate: [AuthGuard] },
    { path: 'GroupName', component: GroupNameComponent, canActivate: [AuthGuard] },
    { path: 'DailyEntryReport', component: DailyEntrysheetComponent, canActivate: [AuthGuard] },
    { path: 'AttendanceReport', component: AttendanceReportComponent, canActivate: [AuthGuard] },
    { path: 'outreport', component: OutReportComponent, canActivate: [AuthGuard] },
    { path: 'WorkSheet', component: WorkSheetComponent, canActivate: [AuthGuard] },
    { path: 'MySkill', component: MySkillComponent, canActivate: [AuthGuard] },
    { path: 'MyTeam', component: MyTeamComponent, canActivate: [AuthGuard] },
    { path: 'EmployeeFeedBack', component: EmployeeFeedbackComponent, canActivate: [AuthGuard] },
    { path: 'RatingType', component: RatingTypeComponent, canActivate: [AuthGuard] },
    { path: 'Levels_Achievement', component: Levels_AchievementComponent, canActivate: [AuthGuard] },
    { path: 'AttendanceEntry', component: AttendanceEntryComponent, canActivate: [AuthGuard] },
    { path: 'EmployeeScreenCaptureReportComponent', component: EmployeeScreenCaptureReportComponent, canActivate: [AuthGuard] },
    { path: 'EmployeeDashboardHeartBeatReportComponent', component: EmployeeDashboardHeartBeatReportComponent, canActivate: [AuthGuard] },
    { path: 'AttendanceAccessCardComparisionReportComponent', component: AttendanceAccessCardComparisionReportComponent, canActivate: [AuthGuard] },
    { path: 'EmployeeList', component: EmployeeListComponent, canActivate: [AuthGuard] },
    { path: 'EmpInfoTabular', component: EmpInfoTabularComponent, canActivate: [AuthGuard] },
    { path: 'ManualPointEntry', component: ManualPointEntryComponent, canActivate: [AuthGuard] },
    { path: 'LateEarlyReport', component: LateEarlyReportComponent, canActivate: [AuthGuard] },
    { path: 'UserRole', component: UserRoleComponent, canActivate: [AuthGuard] },
    { path: 'EducationType', component: EducationTypeComponent, canActivate: [AuthGuard] },
    { path: 'SalaryBreakupType', component: SalaryBreakupTypeComponent, canActivate: [AuthGuard] },
    { path: 'AddEmployeeRecord', component: AddEmployeeRecordcomponent, canActivate: [AuthGuard] },
    { path: 'AttendanceReportNew', component: AttendanceReportNewcomponent, canActivate: [AuthGuard] },
    { path: 'OfficialWorkReport', component: OfficialWorkReportComponent, canActivate: [AuthGuard] },
    { path: 'ProductivityTracker', component: ProductivityTrackerReportcomponent, canActivate: [AuthGuard] },
    { path: 'Opinion_List', component: ConfigureSurveycomponent, canActivate: [AuthGuard] },
    { path: 'MyRFQ', component: RFQComponent, canActivate: [AuthGuard] },
    { path: 'AllRFQ', component: AllRFQComponent, canActivate: [AuthGuard] },
    { path: 'RFQResponceRequested', component: ResponceRequestedRFQcomponent, canActivate: [AuthGuard] },
   // { path: 'RFQ/:param', component: RFQComponent, canActivate: [AuthGuard] },
    { path: 'AddRFQ', component: AddRFQComponent, canActivate: [AuthGuard] },
    { path: 'MyWatchList', component: MyWatchListRFQComponent, canActivate: [AuthGuard] },
    { path: 'MyAction', component: MyActionRFQcomponent, canActivate: [AuthGuard] },
    { path: 'CurrencyHistory', component: CurrencyHistoryComponent, canActivate: [AuthGuard] },
    { path: 'SalaryGrievance', component: SalaryGrievanceComponent, canActivate: [AuthGuard] },
    { path: 'DocumentTemplateComponent', component: DocumentTemplateComponent, canActivate: [AuthGuard] },
    { path: 'AddRFQResponsecomponent', component: AddRFQResponsecomponent, canActivate: [AuthGuard] },
    { path: 'ViewRFQResponsecomponent', component: ViewRFQResponsecomponent, canActivate: [AuthGuard] }
];

export const routing: ModuleWithProviders =
    RouterModule.forRoot(appRoutes);