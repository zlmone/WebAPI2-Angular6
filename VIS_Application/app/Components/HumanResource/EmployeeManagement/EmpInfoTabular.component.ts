import { Component, OnInit, ViewChild } from '@angular/core'
import { EmpInfoTabularService } from '../../../Service/HumanResource/EmployeeManagement/EmpInfoTabular.service'
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms'
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal'
import { IEmpInfoTabular } from '../../../Model/HumanResource/EmployeeManagement/EmpInfoTabular'
import { IPersonalInformation } from '../../../Model/HumanResource/EmployeeManagement/EmpInfoTabular'
import { IEducationInformation } from '../../../Model/HumanResource/EmployeeManagement/EmpInfoTabular'
import { IExperienceInformation } from '../../../Model/HumanResource/EmployeeManagement/EmpInfoTabular'
import { ISalaryInformation } from '../../../Model/HumanResource/EmployeeManagement/EmpInfoTabular'
import { IAttendanceInformation } from '../../../Model/HumanResource/EmployeeManagement/EmpInfoTabular'
import { IJoiningInformation } from '../../../Model/HumanResource/EmployeeManagement/EmpInfoTabular'
import { IIncrementformation } from '../../../Model/HumanResource/EmployeeManagement/EmpInfoTabular'
import { IOfficialInformation } from '../../../Model/HumanResource/EmployeeManagement/EmpInfoTabular'
import { IProjectInfoFrm } from '../../../Model/HumanResource/EmployeeManagement/EmpInfoTabular'
import { ILeaveInfoFrm } from '../../../Model/HumanResource/EmployeeManagement/EmpInfoTabular'
import { IMySkillFrm } from '../../../Model/HumanResource/EmployeeManagement/EmpInfoTabular'

import { DBOperation } from '../../../Shared/enum'
import { Observable } from 'rxjs/Rx'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw' // fixed typo
import { Global } from '../../../Shared/global'
import { PagerService } from '../../../Shared/pager.index'
import { Router, ActivatedRoute, Params } from '@angular/router'
import { Http, RequestOptions, Headers, Response } from '@angular/http';
@Component({
    providers: [EmpInfoTabularService],
    templateUrl: 'app/Components/HumanResource/EmployeeManagement/EmpInfoTabular.component.html'
})

export class EmpInfoTabularComponent implements OnInit {
    @ViewChild('modal') modal: ModalComponent

    EmpInfoTabulars: IEmpInfoTabular[]
    EmpInfoTabular: IEmpInfoTabular

    PersonalInformations: IPersonalInformation[]
    PersonalInformation: IPersonalInformation


    EducationInformations: IEducationInformation[]
    EducationInformation: IEducationInformation




    ExperienceInformations: IExperienceInformation[]
    ExperienceInformation: IExperienceInformation


    SalaryInformations: ISalaryInformation[]
    SalaryInformation: ISalaryInformation

    SalaryAccounts: ISalaryInformation[]
    SalaryAccount: ISalaryInformation


    AttendanceInformations: IAttendanceInformation[]
    AttendanceInformation: IAttendanceInformation


    GetAttendances: IAttendanceInformation[]
    GetAttendance: IAttendanceInformation

    JoiningInformations: IJoiningInformation[]
    JoiningInformation: IJoiningInformation

    Incrementformations: IIncrementformation[]
    Incrementformation: IIncrementformation



    Increments: IIncrementformation[]
    Increment: IIncrementformation

    IncrementLists: IIncrementformation[]
    IncrementList: IIncrementformation

    OfficialInformations: IOfficialInformation[]
    OfficialInformation: IOfficialInformation


    ProjectInfoFrms: IProjectInfoFrm[]
    ProjectInfoFrm: IProjectInfoFrm

    Projects: IProjectInfoFrm[]
    Project: IProjectInfoFrm

    ProjectWBSs: IProjectInfoFrm[]
    ProjectWBS: IProjectInfoFrm


    LeaveInfoFrms: ILeaveInfoFrm[]
    LeaveInfoFrm: ILeaveInfoFrm

    LeaveDeatils: ILeaveInfoFrm[]
    LeaveDeatil: ILeaveInfoFrm


    AdjustmentLeaveDeatils: ILeaveInfoFrm[]
    AdjustmentLeaveDeatil: ILeaveInfoFrm

    Joingoffers: IEmpInfoTabular[]
    Joingoffer: IEmpInfoTabular;

    PendingTasks: IEmpInfoTabular[]
    PendingTask: IEmpInfoTabular;

    Feedbacks: IEmpInfoTabular[]
    Feedback: IEmpInfoTabular;

    Companys: IEmpInfoTabular[]
    Company: IEmpInfoTabular

    Linemanagers: IEmpInfoTabular[]
    Linemanager: IEmpInfoTabular
    Workings: IEmpInfoTabular[]
    Working: IEmpInfoTabular
    JoiningDesignations: IEmpInfoTabular[]
    JoiningDesignation: IEmpInfoTabular
    Departmentnames: IEmpInfoTabular[]
    Departmentname: IEmpInfoTabular
    PositionNames: IEmpInfoTabular[]
    PositionName: IEmpInfoTabular
    EmployeeGrades: IEmpInfoTabular[]
    EmployeeGrade: IEmpInfoTabular

    UserRoles: IEmpInfoTabular[]
    UserRole: IEmpInfoTabular

    EducationTypes: IEmpInfoTabular[]
    EducationType: IEmpInfoTabular

    Technologs: IEmpInfoTabular[]
    Technolog: IEmpInfoTabular

    Roles: IEmpInfoTabular[]
    Role: IEmpInfoTabular

    RoleAdds: IExperienceInformation[]
    RoleAdd: IExperienceInformation


    Salarys: IEmpInfoTabular[]
    Salary: IEmpInfoTabular;


    SalaryBreakups: IEmpInfoTabular[]
    SalaryBreakup: IEmpInfoTabular


    Employees: IEmpInfoTabular[]
    Employee: IEmpInfoTabular

    EmployeeDetails: IEmpInfoTabular[]
    EmployeeDetail: IEmpInfoTabular

    Nwds: IEmpInfoTabular[]
    Nwd: IEmpInfoTabular

    LeaveTypes: IEmpInfoTabular[]
    LeaveType: IEmpInfoTabular

    INTimeOutTimes: IEmpInfoTabular[]
    INTimeOutTime: IEmpInfoTabular


    //skill
    MySkillFrms: IMySkillFrm[]
    MySkillFrm: IMySkillFrm

    Secondlists: IMySkillFrm[]
    Secondlist: IMySkillFrm

    GetViews: IMySkillFrm[]
    GetView: IMySkillFrm

    Forstrcode: IEmpInfoTabular;

    msg: string

    indLoading: boolean = false
    ExperienceInfoFrm: FormGroup
    EmpInfoTabularFrm: FormGroup
    dbops: DBOperation
    InLoading: boolean;
    modalTitle: string
    modalBtnTitle: string
    EmpInfoTabularFilter: string
    isDesc: boolean = false
    column: any = ''
    direction: number
    CurrentRecordsPerPage: number = 10

    Joingdate: string;
    Age: number
    EmployeeCodes: string
    Email: string
    usetype: string
    NwdDaySelect: any[]
    Year: string
    // pager object
    pager: any = {}

    // paged items
    pagedItems: any[]
    PagerInformation: string
    Status: number
    Type: string;
    Output: string;
    SlA: string;
    MaritalStatus: string;
    //Variables for Filter
    ShowHideSearch: boolean = false
    ShowHideSearchNew: boolean = false
    parment: string;
    SlASigned: number;
    //second table
    searchID: string
    searchCompanyName: string
    searchEmployeeName: string
    searchEmail: string
    searchDepartment: string
    searchTotalExp: string
    searchJoiningDate: string
    searchRelevingDate: string
    searchGrace: string
    searchSL_CL: string
    numbers: number;
    //declare id 
    tempUserId: number = 21
    tempUSertype: string = "Admin"

    item: number;

    IsSLASigned: string;
    Errormsg: string;
    Validation: string;
    strError: string;
    JoiningstrError: string;
    leaveerror: string;
    lblError: string;
    curentyear: string;
    //File Add
    Relieving: FileList;
    Experience: FileList;
    LastSalarySlip: FileList;
    DegreeCertificate: FileList;
    LastMarksheet: FileList;
    Passport: FileList;
    DrivingLicense: FileList;
    PANCard: FileList;
    CurriculamVitae: FileList;
    Other: FileList;
    Other0: FileList;
    Other1: FileList;
    UserId: number;
    leavestartdate: string;
    leaveenddate: string;
    Editmode: string;
    EditEmployeeid: string;
    constructor(private fb: FormBuilder, private _EmpInfoTabularService: EmpInfoTabularService, private pagerService: PagerService, private http: Http, private activatedRoute: ActivatedRoute) {

        this.Age = null
        this.parment = null;
        // this.EmployeeCode = null

        this.IsSLASigned = "Yes";
        debugger;
        this.EditEmployeeid = this.activatedRoute.snapshot.queryParams["UserId"];
        let mode = this.activatedRoute.snapshot.queryParams["mode"];
        this.Editmode = mode
        this.EditEmployeeid = this.EditEmployeeid
        alert(this.Editmode)
        alert(this.EditEmployeeid)
    }

    ngOnInit(): void {

        this.EmpInfoTabular =
            ({
                EditEmployeeid: this.EditEmployeeid,
                Editmode: this.Editmode,
                returnid: 0,
                mode: '',
                id: 0,
                URoleId: 0,
                PositionId: 0,
                DepartmentID: 0,
                PID: 0,
                EID: 0,
                EducationID: 0,
                EmployeeID: 0,
                CompanyName: '',
                Employee_Name: '',
                Name: '',
                positionName: '',
                Department_name: '',
                Remarks: '',
                UserId: 0,
                SalaryRangeId: 0,
                Salary: 0,
                salaryrangetitle: '',
                Parentid: 0,
                Value: 0,
                TechnologyID: 0,
                technologyName: '',
                NWID: 0,
                NonWorkingDay: '',
                IntimeMondayToFridayHH: 0,
                IntimeMondayToFridayMM: 0,
                IntimeSaturdayHH: 0,
                IntimeSaturdayMM: 0,
                OutTimeMondayToFridayHH: 0,
                OutTimeMondayToFridayMM: 0,
                OutTimeSaturdayHH: 0,
                OutTimeSaturdayMM: 0,
                CompanyId: 0,
                strCode: '',
                EmployeeName: ' ',
                FirstName: ' ',
                MiddleName: ' ',
                LastName: ' ',
                Password: ' ',
                Email: ' ',
                Active: true,
                UserType: ' ',
                JoiningDate: null,
                RelevingDate: null,
                ResignedDate: null,
                TotalCL: 0,
                TotalSl: 0,
                AdditionalRights: 0,
                ValidForLogin: false,
                Employeecode: '',
                ProbationTill: null,
                ActivityId: 0,
                Gender: true,
                IsConfirmed: false,
                JoiningSalary: 0,
                JoiningDesignation: 0,
                PhotographFileName: '',
                SalaryAfterRevision: 0,
                IsSLASigned: false,
                ConfirmationDate: null,
                AppraisalDate: null,
                IsAppraisalRequired: false,
                SLAYear: 0,
                Technology: ' ',
                OtherTechnology: ' ',
                LineManagerID: 0,
                WorkingLocation: 0,
                WorkingLocationAddress: ' ',
                CommunicationID: ' ',
                OtherRemark: ' ',
                IsWebAccess: false,
                WorksheetThruWeb: false,
                IsSwitchUser: false,
                AllowScreenCapture: true,
                IsWorksheetFill: true,
                IsConfirmationLeave: false,
                EmployeeGradeID: 0,
                IsResigned: false,
                isMailAlert: false,
                IsAllowMouseMovement: true,
                CreatedDateTime: null,
                IsMouseTracking: false,
                IsScreenCaptureRemarks: true,
                IsHost: false,
                IsHostForEmpMaster: false,
                IsProductivityTracker: true,
                WorkFromHome: false,
                Sar: 0,
                YearEducation: '',
                joingdate: '',
                Designation: '',
                SLASigned: '',
                Department: '',

            });

        this.PersonalInformation =
            ({
                EditEmployeeid: this.EditEmployeeid,
                Editmode: this.Editmode,
                FatherName: ' ',
                Birthdate: null,
                Paddress: ' ',
                Caddress: ' ',
                Landlineno: ' ',
                Mobileno: ' ',
                Emergencyno: ' ',
                Age: 0,
                Bloodgroup: ' ',
                Status: ' ',
                Spouse: ' ',
                Numberofchild: 0,
                Childname: ' ',
                AnniversaryDate: null,
                Grandfathername: ' ',
                Spousedob: ' ',
                MotherName: ' ',
                BrotherName: ' ',
                SisterName: ' ',
                FatherOccupation: ' ',
                MotherOccupation: ' ',
                BrotherOccupation: ' ',
                SisterOccupation: ' ',
                SpouseOccupation: ' ',
            });

        this.EducationInformation =
            ({
                EditEmployeeid: this.EditEmployeeid,
                Editmode: this.Editmode,
                Eduid: 0,
                UserId: 0,
                HighestEducation: false,
                ClassDegree: '',
                Schoolinstitute: '',
                Medium: '',
                Passingyear: 0,
                Boarduniversity: '',
                Percentage: 0,
                mode: '',
            });
        this.ExperienceInformation =
            ({
                EditEmployeeid: this.EditEmployeeid,
                Editmode: this.Editmode,
                Efficiency: 0,
                RoleId: 0,
                RoleName: '',
                ExpRoleId: 0,
                Expid: 0,
                Skills: '',
                Totalexp: '',
                Org: '',
                Url: '',
                Designation: '',
                Joiningdate: '',
                Relievingdate: '',
                Reportingto: '',
                Contactno: '',
                Reason: '',
                Lastsalary: '',
                experiencesummary: '',
                skills: '',
                ProjectHandled: '',
                RelevanceExp: '',
                expyear: 0,
                expmonth: 0,
                relevanceExpYear: '',
                relevanceExpMonth: '',
                hdnProjectsToSave: '',
            });
        this.SalaryInformation =
            ({
                EditEmployeeid: this.EditEmployeeid,
                Editmode: this.Editmode,
                UserId: 0,
                Salary: 0,
                Bankname: '',
                Accountno: '',
                PFAccountNo: '',
                CurrentDesignation: '',
                ISPFApplicable: true,
                AdharNumber: 0,
                UANNumber: 0,
                Employee_Name: '',
                Type: '',

            });



        this.AttendanceInformation =
            ({
                EditEmployeeid: this.EditEmployeeid,
                Editmode: this.Editmode,
                UserId: 0,
                Intime: '',
                Outitme: '',
                Intimesat: '',
                Outtimesat: '',
                Grace: 0,
                Leaveapproveby: 0,
                SatGrace: 0,
                IsAlertRequired: false,
                AccessCardId: 0,
                UpdatedBy: 0,
                AttendancePolicy: '',
                Nwdday: '',
                NWID: 0,
                Output: '',

            });
        this.JoiningInformation =
            ({
                EditEmployeeid: this.EditEmployeeid,
                Editmode: this.Editmode,
                Panno: ' ',
                Passportno: ' ',
                Placeofissue: ' ',
                Issuedate: null,
                Expirydate: null,
                Isrelevingletter: false,
                Isexperienceletter: false,
                Issalaryslip: false,
                IsDegreeCertificate: false,
                IsMarkSheet: false,
                IsPassport: false,
                Isdrivinglicense: false,
                Ispancard: false,
                Iscv: false,
                Isother: false,
                Other: ' ',
                RelievingLetterFileName: ' ',
                ExperienceLetterFileName: ' ',
                LastSalarySlipFileName: ' ',
                DegreeCertificateFileName: ' ',
                LastMarksheetFileName: ' ',
                PassportFileName: ' ',
                DrivingLicenseFileName: ' ',
                PANCardFileName: ' ',
                CurriculamVitaeFilName: ' ',
                OtherFileName: ' ',
                OtherFileName0: ' ',
                OtherFileName1: ' ',
                Other0: ' ',
                Other1: ' ',
                HR_Remark: ' ',
                Isother0: false,
                Isother1: false,

            });
        this.Incrementformation =

            ({
                EditEmployeeid: this.EditEmployeeid,
                Editmode: this.Editmode,
                AppraisalDate: null,
                Incrementdate: null,
                Designationchange: 0,
                Increment: 0,
                Salarychange: 0,
                Isfirst: false,
                Incrementid: 0,
                SalaryRangeId: 0,
            });

        this.OfficialInformation =
            ({

                EditEmployeeid: this.EditEmployeeid,
                Editmode: this.Editmode,
                Verveemail: '',
                Vervepassword: '',
                Gmail: '',
                Gmailpassword: '',
                Yahoo: '',
                Yahoopassword: '',
                Skype: '',
                Skypepassword: '',
                Othersitename: '',
                Otherid: '',
                Otherpassword: '',

            });
        this.ProjectInfoFrm =
            ({
                EditEmployeeid: this.EditEmployeeid,
                Editmode: this.Editmode,
                FromDate: null,
                ToDate: null,
                UserId: 0,
            })
        this.LeaveInfoFrm =
            ({
                EditEmployeeid: this.EditEmployeeid,
                Editmode: this.Editmode,
                Leavetype: '',
                Balance: 0,
                Transactiontype: '',
                Isadjusted: false,
                AdjustedValue: 0,
                Lastyear: '',
                UUPLBalance: 0,
                Leavedate: null,
                Createddate: null,
                Remarks: '',
                Leavename: '',
                Isaupl: false,
                leavestartdate: '',
                leaveenddate: '',
            })

        this.MySkillFrm =
            ({
            EditEmployeeid: this.EditEmployeeid,
            Editmode: this.Editmode,
              Name :'',
              lookupSkilId: 0,
              SkillName: '',
              id:0,
            
            })
        this.GetSkill();
        this.checkMaritalStatus(event)
        this.LoadGetRole()
        this.LoadGetTechnology()
        this.LoadGetCompany()
        this.LoadGetWorking()
        this.LoadGetJoiningDesignation()
        this.LoadGetDepartmentname()
        this.LoadGetPositionName()
        this.LoadGetEmployeeGrade()
        this.LoadGetEducationType()
        this.LoadGetUserRole()
        this.LoadGetLinemanager(this.tempUSertype, this.tempUserId)
        this.FillEmployee()
        this.GetNonWorking()
        this.GetInTimeOutTimeSelected()

        this.GetRoleAdd()
        this.GetIncrementType()
        this.GetIncrementList()
       // this.GetOfferdeatils(parseInt(this.EditEmployeeid))
        debugger;
        if (this.EditEmployeeid != null && this.Editmode) {
            this.GetPendingList(this.EditEmployeeid)
            this.GetFeedbackList(this.EditEmployeeid)
            this.GetOfferdeatils(parseInt(this.EditEmployeeid))
            this.GetAdustmentleave(parseInt(this.EditEmployeeid))
            this.GetEmployeeDeatils(parseInt(this.EditEmployeeid))
            this.FillPassingYear(this.EditEmployeeid, this.Editmode)
        }

        this.GetLeaveType()

        this.FillLeaveDeatil()



        $("#Age").attr("disabled", "disabled");
        $("#showSalaryBreakup").hide();
        $("#SalaryBreakup").hide();
        $("#SpouseName").attr("disabled", "disabled");
        $("#Spouseoccupation").attr("disabled", "disabled");
        $("#SpouseDateofBirth").attr("disabled", "disabled");
        $("#RemoveSpouse").attr("disabled", "disabled");
        $("#AniversayDate").attr("disabled", "disabled");
        $("#NumberOfChild").attr("disabled", "disabled");
        $("#ChildName").attr("disabled", "disabled");
        //$("#DemoEmployee").show();
        //$("#Employeecode").hide();
        $("#pnlRelevingInformation").hide();
        $("#pnlConfirmationDate").hide();
        $("#Resigned").hide();
        $("#SalaryBreakupchange").hide();
        $("#SalaryBreakupDemochange").show();
        $("#Errormsgdemo").show();
        $("#lblNonwbsprojects").hide();
        $("#GVNonwbsprojects").hide();
        $("#lblwbsprojects").hide();
        $("#gvwbsprojects").hide();
    }


    fileRelieving(event) {

        this.Relieving = event.target.files;
    }

    fileExperience(event) {
        this.Experience = event.target.files;
    }
    fileLastSalarySlip(event) {
        this.LastSalarySlip = event.target.files;
    }
    fileDegreeCertificate(event) {
        this.DegreeCertificate = event.target.files;

    }
    fileLastMarksheet(event) {
        this.LastMarksheet = event.target.files;
    }
    filePassport(event) {

        this.Passport = event.target.files;
    }
    fileDrivingLicense(event) {
        this.DrivingLicense = event.target.files;
    }
    filePANCard(event) {
        this.PANCard = event.target.files;
    }
    fileCurriculamVitae(event) {

        this.CurriculamVitae = event.target.files;
    }
    fileOther(event) {

        this.Other = event.target.files;
    }
    fileOther0(event) {

        this.Other0 = event.target.files;
    }
    fileOther1(event) {

        this.Other1 = event.target.files;
    }

    moveItems(origin, dest) {
        $(origin).find(':selected').appendTo(dest);
    }

    moveAllItems(origin, dest) {
        $(origin).children().appendTo(dest);
    }

    moveRightAll(origin, dest) {
        this.moveAllItems("#ddlTechnical1", "#ddlTechnical2");
    }

    moveLeftAll(origin, dest) {
        this.moveAllItems("#ddlTechnical2", "#ddlTechnical1");
    }

    moveRight(origin, dest) {
        this.moveItems("#ddlTechnical1", "#ddlTechnical2");
    }

    moveLeft(origin, dest) {
        this.moveItems("#ddlTechnical2", "#ddlTechnical1");
    }
    checkMaritalStatus(event) {

        if (event.target.value == 'Unmarried') {
            $("#SpouseName").attr("disabled", "disabled");
            $("#Spouseoccupation").attr("disabled", "disabled");
            $("#SpouseDateofBirth").attr("disabled", "disabled");
            $("#RemoveSpouse").attr("disabled", "disabled");
            $("#AniversayDate").attr("disabled", "disabled");
            $("#NumberOfChild").attr("disabled", "disabled");
            $("#ChildName").attr("disabled", "disabled");
        }
        else if (event.target.value == 'Engaged') {
            $("#SpouseName").removeAttr("disabled");
            $("#Spouseoccupation").removeAttr("disabled");
            $("#SpouseDateofBirth").removeAttr("disabled");
            $("#RemoveSpouse").removeAttr("disabled");
            $("#AniversayDate").attr("disabled", "disabled");
            $("#NumberOfChild").attr("disabled", "disabled");
            $("#ChildName").attr("disabled", "disabled");
        }
        else if (event.target.value == 'Married') {
            $("#SpouseName").removeAttr("disabled");
            $("#Spouseoccupation").removeAttr("disabled");
            $("#SpouseDateofBirth").removeAttr("disabled");
            $("#RemoveSpouse").removeAttr("disabled");
            $("#AniversayDate").removeAttr("disabled");
            $("#NumberOfChild").removeAttr("disabled");
            $("#ChildName").removeAttr("disabled");
        }
        else if (event.target.value == 'Divorced') {
            $("#SpouseName").removeAttr("disabled");
            $("#Spouseoccupation").removeAttr("disabled");
            $("#SpouseDateofBirth").removeAttr("disabled");
            $("#RemoveSpouse").removeAttr("disabled");
            $("#AniversayDate").removeAttr("disabled");
            $("#NumberOfChild").removeAttr("disabled");
            $("#ChildName").removeAttr("disabled");
        }
        else {
            $("#SpouseName").removeAttr("disabled");
            $("#Spouseoccupation").removeAttr("disabled");
            $("#SpouseDateofBirth").removeAttr("disabled");
            $("#RemoveSpouse").removeAttr("disabled");
            $("#AniversayDate").removeAttr("disabled");
            $("#NumberOfChild").removeAttr("disabled");
            $("#ChildName").removeAttr("disabled");
        }

    }
    Resigned(e) {

        if (e.target.checked) {
            $("#Resigned").show();
        }
        else {
            $("#Resigned").hide();
        }
    }
    chMd(event) {

        if (event.target.value == 'No') {

            var SlASigned = (<HTMLInputElement>document.getElementById("SLASigned")).value;
            this.SlASigned = 0;
            $("#SLASigned").attr("disabled", "disabled");

        }
        else {
            $("#SLASigned").removeAttr("disabled");
            this.SlASigned = null;
        }

    }
    copyaddress(e) {

        if (e.target.checked) {
            var Communiction = (<HTMLInputElement>document.getElementById("txtpermenantaddress")).value;
            var parment = (<HTMLInputElement>document.getElementById("txtCommunicationaddress")).value;
            this.parment = Communiction

            $("#txtCommunicationaddress").attr("disabled", "disabled");
        }
        else {
            var parment = (<HTMLInputElement>document.getElementById("txtCommunicationaddress")).value;
            this.parment = null;
            $("#txtCommunicationaddress").removeAttr("disabled");
        }
    }
    JoinDiv(e) {

        if (e.target.checked) {
            $("#divJoining").show();
        }
        else {
            $("#divJoining").hide();
        }
    }
    Confirmed(e) {
        if (e.target.checked) {
            $("#pnlConfirmationDate").show();
        }
        else {
            $("#pnlConfirmationDate").hide();
        }
    }
    calAge() {

        $("#Age").attr("disabled", "disabled");
        var birthDay = $("#date").val()
        var now = new Date()
        var b_split = birthDay.split('-')
        if (b_split.length == 3) {
            var birthDate = new Date(b_split[0], b_split[1] * 1 - 1, b_split[2])
            var years = Math.floor((now.getTime() - birthDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000))
            this.Age = years

        }
    }
    calEmailId() {

        var FirstName = $("#FirstName").val()
        var Email = FirstName + "@vervesys.local"

        this.Email = Email

    }
    CalEmployeecode(event) {

        var x = ($('input[name="Type"]:checked').val());
        if (x == "E%") {
            //$("#DemoEmployee").hide();
            //$("#Employeecode").show();

            this.GetEmployeeTime(event.target.value)

        }
        else {

        }
    }
    GetEmployeeTime(CompanyId: number) {

        this.indLoading = true
        this._EmpInfoTabularService.GetEmployeeTime(Global.BASE_EmpInfoTabular_ENDPOINT, CompanyId)
            .subscribe(data => {

                this.Forstrcode = data[0]
                var Employeecode = this.Forstrcode.strCode
                this.EmployeeCodes = Employeecode;
                alert(this.EmployeeCodes);
                this.indLoading = false
            }

            )
    }
    FillPassingYear(EditEmployeeid: string, Editmode: string) {
        ;
        this.indLoading = true
        this._EmpInfoTabularService.FillPassingYear(Global.BASE_EmpInfoTabular_ENDPOINT, EditEmployeeid, Editmode)
            .subscribe(data => {

                this.Year = data


            }

            )
    }
    PfChange(e) {
        if (e.target.checked) {
            $("#PFNumber").removeAttr("disabled");
            $("#UANNumber").removeAttr("disabled");

        }
        else {
            $("#PFNumber").val("");
            $("#UANNumber").val("");
            $("#PFNumber").attr("disabled", "disabled");
            $("#UANNumber").attr("disabled", "disabled");
        }

    }
    calSalary(e) {

        if (e.target.click) {

            var Salary = $("#Salary").val()
            $("#SalaryBreakupDemo").hide();
            $("#showSalaryBreakup").show();
            this.GetSalaryRangeDropDown(Salary)
        }

        else {
            $("#showSalaryBreakup").hide();
            $("#SalaryBreakup").hide();
            $("#SalaryBreakupDemo").show();
        }


    }

    calSalarychange() {

        var salarychange = $("#salarychange").val()
        if ((salarychange != null && salarychange != "")) {
            $("#SalaryBreakupchange").show();
            $("#SalaryBreakupDemochange").hide();
            $("#Errormsg").hide();
            $("#Errormsgdemo").show();
            this.GetSalaryRangechangedropdown(salarychange)
        }
        else {
            this.Errormsg = "Salary must be Enterd"
            $("#Errormsgdemo").hide();
        }

    }

    ChkTotalSalaryClick() {
        debugger;
        alert('test')
        var totalsalary = $("#lblTotalSalaryPwd").val();

        if (($("#ChkTotalSalary").prop("checked"))) {
            var totalsal = $("#lblTotalSalary").val();
            var total = $("#txtSalary").val();
            total = "";
            var total = totalsal;
            $("#chkSAJoiningSalary").prop("checked", false);
        }
        else {


            $("#txtSalary").val("totalsalary");

        }

    }

    SameJoiiningSalary() {
        debugger;
        if (($("#chkSAJoiningSalary").prop("checked"))) {


            if ($("#ChkTotalSalary").prop("checked")) {
                var total = $("#txtSalary").val();
                var Joingsalary = $("#joiningsalary").val();
                total = Joingsalary;

                $("#ChkTotalSalary").prop("checked", false);
            }
            else {
                var total = $("#txtSalary").val();
                var lblMainJoiningSalary = $("#lblMainJoiningSalary").val();


            }
            $('#txtSalary').attr("readonly", 'true');
            $("#ChkTotalSalary").prop("checked", false);

        }
        else {

            $("#txtSalary").val(" ");
            $('#txtSalary').attr("readonly", 'false');

        }
    }


    calRelevingDate() {
        var RelevingDate = $("#Salary").val()
        if (RelevingDate != null) {
            $("#pnlRelevingInformation").show();

        }

        else {
            $("#pnlRelevingInformation").hide();

        }
    }

    LoadGetRole() {

        this.indLoading = true
        this._EmpInfoTabularService.GetRole(Global.BASE_EmpInfoTabular_ENDPOINT)
            .subscribe(data => {
                this.Roles = data

                this.indLoading = false
            }

            )
    }
    LoadGetTechnology() {

        this.indLoading = true
        this._EmpInfoTabularService.GetTechnology(Global.BASE_EmpInfoTabular_ENDPOINT)
            .subscribe(data => {
                this.Technologs = data

                this.indLoading = false
            }

            )
    }
    LoadGetCompany() {

        this.indLoading = true
        this._EmpInfoTabularService.GetCompany(Global.BASE_EmpInfoTabular_ENDPOINT)
            .subscribe(data => {
                this.Companys = data

                this.indLoading = false
            }

            )
    }
    LoadGetWorking() {

        this.indLoading = true
        this._EmpInfoTabularService.GetWorking(Global.BASE_EmpInfoTabular_ENDPOINT)
            .subscribe(data => {
                this.Workings = data

                this.indLoading = false
            }

            )
    }
    LoadGetJoiningDesignation() {

        this.indLoading = true
        this._EmpInfoTabularService.GetJoiningDesignation(Global.BASE_EmpInfoTabular_ENDPOINT)
            .subscribe(data => {
                this.JoiningDesignations = data

                this.indLoading = false
            }

            )
    }
    LoadGetDepartmentname() {

        this.indLoading = true
        this._EmpInfoTabularService.GetDepartmentname(Global.BASE_EmpInfoTabular_ENDPOINT)
            .subscribe(data => {
                this.Departmentnames = data

                this.indLoading = false
            }

            )
    }
    LoadGetPositionName() {

        this.indLoading = true
        this._EmpInfoTabularService.GetPositionName(Global.BASE_EmpInfoTabular_ENDPOINT)
            .subscribe(data => {
                this.PositionNames = data

                this.indLoading = false
            }

            )
    }
    LoadGetEmployeeGrade() {

        this.indLoading = true
        this._EmpInfoTabularService.GetEmployeeGrade(Global.BASE_EmpInfoTabular_ENDPOINT)
            .subscribe(data => {
                this.EmployeeGrades = data

                this.indLoading = false
            }

            )
    }
    LoadGetUserRole() {

        this.indLoading = true
        this._EmpInfoTabularService.GetUserRole(Global.BASE_EmpInfoTabular_ENDPOINT)
            .subscribe(data => {
                this.UserRoles = data

                this.indLoading = false
            }

            )
    }
    LoadGetLinemanager(Usertype: string, UserId: number) {

        this.indLoading = true
        this._EmpInfoTabularService.GetLinemanager(Global.BASE_EmpInfoTabular_ENDPOINT, Usertype, UserId)
            .subscribe(data => {
                this.Linemanagers = data

                this.indLoading = false
            }

            )
    }
    LoadGetEducationType() {

        this.indLoading = true
        this._EmpInfoTabularService.GetEducationType(Global.BASE_EmpInfoTabular_ENDPOINT)
            .subscribe(data => {
                this.EducationTypes = data

                this.indLoading = false
            }

            )
    }

    GetNonWorking() {

        this.indLoading = true
        this._EmpInfoTabularService.GetNonWorking(Global.BASE_EmpInfoTabular_ENDPOINT)
            .subscribe(data => {
                this.Nwds = data

                this.indLoading = false
            }

            )
    }
    GetSalaryRangeDropDown(Salary: number) {
        $("#SalaryBreakup").show();
        this.indLoading = true
        this._EmpInfoTabularService.GetSalaryRangeDropDown(Global.BASE_EmpInfoTabular_ENDPOINT, Salary)
            .subscribe(data => {
                this.Salarys = data

                this.indLoading = false
            }

            )
    }
    GetSalaryRangechangedropdown(Salary: number) {

        $("#SalaryBreakupchange").show();
        this.indLoading = true
        this._EmpInfoTabularService.GetSalaryRangeDropDown(Global.BASE_EmpInfoTabular_ENDPOINT, Salary)
            .subscribe(data => {
                this.Salarys = data

                this.indLoading = false
            }

            )
    }
    GetIncrementType() {

        this.indLoading = true
        this._EmpInfoTabularService.GetIncrementType(Global.BASE_EmpInfoTabular_ENDPOINT)
            .subscribe(data => {
                this.Increments = data

                this.indLoading = false
            }

            )
    }

    GetIncrementList() {

        this.indLoading = true
        this._EmpInfoTabularService.GetIncrementList(Global.BASE_EmpInfoTabular_ENDPOINT)
            .subscribe(data => {
                this.IncrementLists = data

                this.indLoading = false
            }

            )
    }
    FillEmployee() {

        this.indLoading = true
        this._EmpInfoTabularService.FillEmployee(Global.BASE_EmpInfoTabular_ENDPOINT)
            .subscribe(data => {
                this.Employees = data

                this.indLoading = false
            }

            )
    }
    //Project Get
    FillProjectDeatil(ProjectInfoFrm: IProjectInfoFrm) {
        $("#lblNonwbsprojects").show();
        $("#GVNonwbsprojects").show();
        $("#lblwbsprojects").show();
        $("#gvwbsprojects").show();
        ProjectInfoFrm.UserId = parseInt(this.EditEmployeeid);
        ProjectInfoFrm.EditEmployeeid = this.EditEmployeeid;
        ProjectInfoFrm.Editmode = this.Editmode;

        this.indLoading = true
        this._EmpInfoTabularService.FillProjectDetail(Global.BASE_EmpInfoTabular_ENDPOINT, ProjectInfoFrm.FromDate, ProjectInfoFrm.ToDate, ProjectInfoFrm.UserId)
            .subscribe(data => {
                this.ProjectWBSs = data

                this.indLoading = false
            }

            )
        this._EmpInfoTabularService.FillProjectDetailWbs(Global.BASE_EmpInfoTabular_ENDPOINT, ProjectInfoFrm.FromDate, ProjectInfoFrm.ToDate, ProjectInfoFrm.UserId)
            .subscribe(data => {
                this.Projects = data

                this.indLoading = false
            }

            )

    }

    JoingAggrimentDownload() {
        alert("joingAggrent")


    }

    GetSalaryBrakup(event) {

        this.indLoading = true
        this._EmpInfoTabularService.GetSalaryBrakup(Global.BASE_EmpInfoTabular_ENDPOINT, event.target.value)
            .subscribe(data => {
                this.SalaryBreakups = data

                this.indLoading = false
            }

            )
    }

    GetOfferdeatils(UserId: number) {

        this.indLoading = true
        this._EmpInfoTabularService.GetOfferdeatils(Global.BASE_EmpInfoTabular_ENDPOINT, parseInt(this.EditEmployeeid))
            .subscribe(data => {
                this.Joingoffers = data
                console.log(this.Joingoffers)
                this.indLoading = false
            }

            )
    }
    GetAdustmentleave(UserId: number) {

        this.indLoading = true
        this._EmpInfoTabularService.GetAdustmentleave(Global.BASE_EmpInfoTabular_ENDPOINT, parseInt(this.EditEmployeeid))
            .subscribe(data => {
                this.AdjustmentLeaveDeatils = data

                this.indLoading = false
            }

            )
    }

    GetEmployeeDeatils(UserId: number) {
        debugger;
        this.indLoading = true
        this._EmpInfoTabularService.GetEmployeeDeatils(Global.BASE_EmpInfoTabular_ENDPOINT, this.EditEmployeeid)
            .subscribe(data => {
                this.EmployeeDetails = data

                this.indLoading = false
            }

            )
    }

    FillLeaveDeatil() {
        debugger;
        this.indLoading = true
        this._EmpInfoTabularService.FillLeaveDeatil(Global.BASE_EmpInfoTabular_ENDPOINT)
            .subscribe(data => {
                this.LeaveDeatil = data
                this.leavestartdate = this.LeaveDeatil[0].leavestartdate;
                this.leaveenddate = this.LeaveDeatil[0].leaveenddate;
                console.log(this.leaveenddate)
                console.log(this.leavestartdate)
                this.indLoading = false
            }

            )
    }
    GetPendingList(UserId: string) {

        this.indLoading = true
        this._EmpInfoTabularService.GetPendingList(Global.BASE_EmpInfoTabular_ENDPOINT, UserId)
            .subscribe(data => {
                this.PendingTasks = data
                this.indLoading = false
            }

            )
    }

    GetFeedbackList(UserId: string) {
        debugger;

        this.indLoading = true
        this._EmpInfoTabularService.GetFeedbackList(Global.BASE_EmpInfoTabular_ENDPOINT, UserId)
            .subscribe(data => {
                this.Feedbacks = data
                console.log(this.Feedbacks)
                this.indLoading = false
            }

            )
    }

    GetInTimeOutTimeSelected() {

        this.indLoading = true
        this._EmpInfoTabularService.GetInTimeOutTimeSelected(Global.BASE_EmpInfoTabular_ENDPOINT)
            .subscribe(data => {
                this.INTimeOutTimes = data

                this.indLoading = false
            }

            )
    }

    GetLeaveType() {

        this.indLoading = true
        this._EmpInfoTabularService.GetLeaveType(Global.BASE_EmpInfoTabular_ENDPOINT)
            .subscribe(data => {
                this.LeaveTypes = data

                this.indLoading = false
            }

            )
    }

    SaveUserType() {
        debugger;
        var slvals = []
        $('input:checkbox[name=UserRole]:checked').each(function () {

            var usertype = slvals.push($(this).val())
            this.usetype = usertype

        })

    }

    SaveEmployee(EmpInfoTabular: IEmpInfoTabular) {

        this.SaveUserType();
        EmpInfoTabular.Employeecode = this.EmployeeCodes;
        EmpInfoTabular.Email = this.Email;
        EmpInfoTabular.UserType = this.usetype;

        if ($("#JoingDiv").prop("checked")) {

            EmpInfoTabular.JoiningDate;

        }
        else {
            EmpInfoTabular.JoiningDate = null

        }
        if (EmpInfoTabular.RelevingDate != null) {
            EmpInfoTabular.RelevingDate = EmpInfoTabular.RelevingDate
        }
        else {
            EmpInfoTabular.RelevingDate = null
        }
        if ($("#Male").prop("checked")) {
            EmpInfoTabular.Gender = true

        }
        else {
            EmpInfoTabular.Gender = false;
        }

        if ($("#isActive").prop("checked")) {

            EmpInfoTabular.Active = true

        }
        else {
            EmpInfoTabular.Active = false
        }
        if ($("#ScreenCapture").prop("checked")) {
            EmpInfoTabular.AllowScreenCapture = true

        }
        else {
            EmpInfoTabular.AllowScreenCapture = false;
        }
        if ($("#IsWorksheetFill").prop("checked")) {
            EmpInfoTabular.IsWorksheetFill = true

        }
        else {
            EmpInfoTabular.IsWorksheetFill = false;
        }
        if ($("#isScreenCaptureRemarks").prop("checked")) {

            EmpInfoTabular.IsScreenCaptureRemarks = true

        }
        else {
            EmpInfoTabular.IsScreenCaptureRemarks = false;
        }
        if ($("#MouseMovement").prop("checked")) {

            EmpInfoTabular.AllowScreenCapture = true

        }
        else {
            EmpInfoTabular.AllowScreenCapture = false;
        }
        if ($("#IsProductivityTracker").prop("checked")) {

            EmpInfoTabular.IsProductivityTracker = true

        }
        else {
            EmpInfoTabular.IsProductivityTracker = false;
        }
        if ($("#IsSLASigned").prop("checked")) {

            EmpInfoTabular.IsSLASigned = true
            EmpInfoTabular.SLAYear = this.SlASigned;
        }
        else {

            EmpInfoTabular.IsSLASigned = false;
            EmpInfoTabular.SLAYear = this.SlASigned;
        }
        if ($("#IsHost").prop("checked")) {
            EmpInfoTabular.IsHost = true

        }
        else {
            EmpInfoTabular.IsHost = false;
        }
        if ($("#IsHostForEmpMaster").prop("checked")) {
            EmpInfoTabular.IsHost = true

        }
        else {
            EmpInfoTabular.IsHost = false;
        }
        if ($("#WorksheetThruWeb").prop("checked")) {
            EmpInfoTabular.WorksheetThruWeb = true

        }
        else {
            EmpInfoTabular.WorksheetThruWeb = false;
        }
        if ($("#WorksheetThruWeb").prop("checked")) {
            EmpInfoTabular.WorksheetThruWeb = true

        }
        else {
            EmpInfoTabular.WorksheetThruWeb = false;
        }
        if ($("#IsSwitchUser").prop("checked")) {
            EmpInfoTabular.IsSwitchUser = true

        }
        else {
            EmpInfoTabular.IsSwitchUser = false;
        }
        if ($("#ValidForLogin").prop("checked")) {
            EmpInfoTabular.ValidForLogin = true

        }
        else {
            EmpInfoTabular.ValidForLogin = false;
        }
        if ($("#IsMouseTracking").prop("checked")) {
            EmpInfoTabular.IsMouseTracking = true

        }
        else {
            EmpInfoTabular.IsMouseTracking = false;
        }
        if ($("#WorkFromHome").prop("checked")) {
            EmpInfoTabular.WorkFromHome = true

        }
        else {
            EmpInfoTabular.WorkFromHome = false;
        }
        this._EmpInfoTabularService.SaveMain(Global.BASE_EmpInfoTabular_ENDPOINT, EmpInfoTabular).subscribe(
            data => {
                if (data.startsWith("Success: ")) //Success
                {
                    this.msg = data

                }
                else {
                    alert(data)
                }


            })

    }

    SavePersonalData(PersonalInformation: IPersonalInformation) {
        debugger;
        PersonalInformation.Age = this.Age;
        PersonalInformation.Caddress = $("#txtCommunicationaddress").val();
        PersonalInformation.EditEmployeeid = this.EditEmployeeid;
        PersonalInformation.Editmode = this.Editmode;

        if ($("#Engaged").prop("checked")) {

            PersonalInformation.Status = "Engaged"

        }
        else if ($("#Married").prop("checked")) {
            PersonalInformation.Status = "Married"

        }
        else if ($("#Divorced").prop("checked")) {

            PersonalInformation.Status = "Divorced"

        }
        else if ($("#Widow").prop("checked")) {

            PersonalInformation.Status = "Widow"

        }
        else {
            PersonalInformation.Status = "Unmarried"
        }
        //  PersonalInformation.AnniversaryDate = $("#AniversayDate").val();

        this._EmpInfoTabularService.SavePersonal(Global.BASE_EmpInfoTabular_ENDPOINT, PersonalInformation).subscribe(
            data => {
                if (data.startsWith("Success: ")) //Success
                {
                    this.msg = data

                }
                else {
                    alert(data)
                }


            })

        this.FillPassingYear(PersonalInformation.EditEmployeeid, PersonalInformation.Editmode);

    }
    SaveEducation(EducationInformation: IEducationInformation) {
        this.lblError = "";
        var School1 = $("#School1").val()
        var School2 = $("#School2").val()
        var School3 = $("#School3").val()
        var School4 = $("#School4").val()
        var School5 = $("#School5").val()
        var School6 = $("#School6").val()
        var School7 = $("#School7").val()
        var School8 = $("#School8").val()

        var Eduid = $("#Education").val()
        debugger;
        if (Eduid == "Select" || Eduid == "" || Eduid == null) {
            this.lblError = "Plese select Any Education type"
        }

        else {



            if (School1 != null && School1 != "") {

                if ($("#rbnHighesteducation1").prop("checked")) {

                    EducationInformation.HighestEducation = true;


                }
                else {
                    EducationInformation.HighestEducation = false;
                }
                var label = $('#Class1');

                var month = label.attr('class');

                EducationInformation.ClassDegree = month;

                EducationInformation.Schoolinstitute = School1;

                if ($("#Medium1").val() != null || $("#Medium1").val() != "") {
                    EducationInformation.Medium = $("#Medium1").val();
                }
                else {
                    this.lblError = "";
                    this.lblError += "Please Enter Medium "
                }
                if ($("#Passingyear1").val() != null || $("#Passingyear1").val() != "") {
                    EducationInformation.Passingyear = $("#Passingyear1").val();
                }
                else {
                    this.lblError = "";
                    this.lblError += "Please Enter Passingyear "
                }

                if ($("#Board1").val() != null || $("#Board1").val() != "") {
                    EducationInformation.Boarduniversity = $("#Board1").val();
                }
                else {
                    this.lblError = "";
                    this.lblError += "Please Enter Board/University Name  "
                }

                if ($("#Percentage1").val() != null || $("#Percentage1").val() != "") {
                    EducationInformation.Percentage = $("#Percentage1").val();
                }
                else {
                    this.lblError = "";
                    this.lblError += "Please Enter Percentage"
                }

                this._EmpInfoTabularService.SaveEducation(Global.BASE_EmpInfoTabular_ENDPOINT, EducationInformation).subscribe(
                    data => {
                        if (data.startsWith("Success: ")) //Success
                        {
                            this.msg = data

                        }
                        else {
                            alert(data)
                        }


                    })
            }
            else {
                this.lblError = "";
                this.lblError += "Please Enter School/Institute Name"
            }

            if (School2 != null && School2 != "") {
                if ($("#rbnHighesteducation2").prop("checked")) {

                    EducationInformation.HighestEducation = true;
                }
                else {
                    EducationInformation.HighestEducation = false;
                }
                var label = $('#Class2');

                var classvalue = label.attr('class1');

                EducationInformation.ClassDegree = classvalue;
                EducationInformation.Schoolinstitute = School2;
                EducationInformation.Medium = $("#Medium2").val();
                EducationInformation.Passingyear = $("#Passingyear2").val();
                EducationInformation.Boarduniversity = $("#Board2").val();
                EducationInformation.Percentage = $("#Percentage2").val();

                this._EmpInfoTabularService.SaveEducation(Global.BASE_EmpInfoTabular_ENDPOINT, EducationInformation).subscribe(
                    data => {
                        if (data.startsWith("Success: ")) //Success
                        {
                            this.msg = data

                        }
                        else {
                            alert(data)
                        }


                    })
            }
            else {
                this.lblError = "";
                this.lblError = "Please Enter School/Institute Name"
            }
            if (School3 != null && School3 != "") {
                if ($("#rbnHighesteducation3").prop("checked")) {

                    EducationInformation.HighestEducation = true;
                }
                else {
                    EducationInformation.HighestEducation = false;
                }




                EducationInformation.ClassDegree = $("#Class3").val();;
                EducationInformation.Schoolinstitute = School2;
                EducationInformation.Medium = $("#Medium3").val();
                EducationInformation.Passingyear = $("#Passingyear3").val();
                EducationInformation.Boarduniversity = $("#Board3").val();
                EducationInformation.Percentage = $("#Percentage3").val();

                this._EmpInfoTabularService.SaveEducation(Global.BASE_EmpInfoTabular_ENDPOINT, EducationInformation).subscribe(
                    data => {
                        if (data.startsWith("Success: ")) //Success
                        {
                            this.msg = data

                        }
                        else {
                            alert(data)
                        }


                    })
            }
            else {
                this.lblError = "";
                this.lblError = "Please Enter School/Institute Name"
            }
            if (School4 != null && School4 != "") {
                if ($("#rbnHighesteducation4").prop("checked")) {

                    EducationInformation.HighestEducation = true;

                }
                else {
                    EducationInformation.HighestEducation = false;
                }



                EducationInformation.ClassDegree = $("#Class4").val();;
                EducationInformation.Schoolinstitute = School2;
                EducationInformation.Medium = $("#Medium4").val();
                EducationInformation.Passingyear = $("#Passingyear4").val();
                EducationInformation.Boarduniversity = $("#Board4").val();
                EducationInformation.Percentage = $("#Percentage4").val();

                this._EmpInfoTabularService.SaveEducation(Global.BASE_EmpInfoTabular_ENDPOINT, EducationInformation).subscribe(
                    data => {
                        if (data.startsWith("Success: ")) //Success
                        {
                            this.msg = data

                        }
                        else {
                            alert(data)
                        }


                    })
            }
            else {
                this.lblError = "";
                this.lblError = "Please Enter School/Institute Name"
            }
            if (School5 != null && School5 != "") {
                if ($("#rbnHighesteducation5").prop("checked")) {
                    EducationInformation.HighestEducation = true;

                }
                else {
                    EducationInformation.HighestEducation = false;

                }




                EducationInformation.ClassDegree = $("#Class5").val();;
                EducationInformation.Schoolinstitute = School2;
                EducationInformation.Medium = $("#Medium5").val();
                EducationInformation.Passingyear = $("#Passingyear5").val();
                EducationInformation.Boarduniversity = $("#Board5").val();
                EducationInformation.Percentage = $("#Percentage5").val();

                this._EmpInfoTabularService.SaveEducation(Global.BASE_EmpInfoTabular_ENDPOINT, EducationInformation).subscribe(
                    data => {
                        if (data.startsWith("Success: ")) //Success
                        {
                            this.msg = data

                        }
                        else {
                            alert(data)
                        }


                    })
            }
            else {
                this.lblError = "";
                this.lblError = "Please Enter School/Institute Name"
            }
            if (School6 != null && School6 != "") {
                if ($("#rbnHighesteducation6").prop("checked")) {

                    EducationInformation.HighestEducation = true;
                }
                else {
                    EducationInformation.HighestEducation = false;
                }




                EducationInformation.ClassDegree = $("#Class6").val();;
                EducationInformation.Schoolinstitute = School2;
                EducationInformation.Medium = $("#Medium6").val();
                EducationInformation.Passingyear = $("#Passingyear6").val();
                EducationInformation.Boarduniversity = $("#Board6").val();
                EducationInformation.Percentage = $("#Percentage6").val();

                this._EmpInfoTabularService.SaveEducation(Global.BASE_EmpInfoTabular_ENDPOINT, EducationInformation).subscribe(
                    data => {
                        if (data.startsWith("Success: ")) //Success
                        {
                            this.msg = data

                        }
                        else {
                            alert(data)
                        }


                    })
            }
            else {
                this.lblError = "";
                this.lblError = "Please Enter School/Institute Name"
            }
            if (School7 != null && School7 != "") {
                if ($("#rbnHighesteducation7").prop("checked")) {

                    EducationInformation.HighestEducation = true;
                }
                else {
                    EducationInformation.HighestEducation = false;
                }




                EducationInformation.ClassDegree = $("#Class7").val();;
                EducationInformation.Schoolinstitute = School2;
                EducationInformation.Medium = $("#Medium7").val();
                EducationInformation.Passingyear = $("#Passingyear7").val();
                EducationInformation.Boarduniversity = $("#Board7").val();
                EducationInformation.Percentage = $("#Percentage7").val();

                this._EmpInfoTabularService.SaveEducation(Global.BASE_EmpInfoTabular_ENDPOINT, EducationInformation).subscribe(
                    data => {
                        if (data.startsWith("Success: ")) //Success
                        {
                            this.msg = data

                        }
                        else {
                            alert(data)
                        }


                    })
            }
            else {
                this.lblError = "";
                this.lblError = "Please Enter School/Institute Name"
            }
            if (School8 != null && School8 != "") {
                if ($("#rbnHighesteducation8").prop("checked")) {

                    EducationInformation.HighestEducation = true;
                }
                else {
                    EducationInformation.HighestEducation = false;
                }




                EducationInformation.ClassDegree = $("#Class8").val();;
                EducationInformation.Schoolinstitute = School2;
                EducationInformation.Medium = $("#Medium8").val();
                EducationInformation.Passingyear = $("#Passingyear8").val();
                EducationInformation.Boarduniversity = $("#Board8").val();
                EducationInformation.Percentage = $("#Percentage8").val();

                this._EmpInfoTabularService.SaveEducation(Global.BASE_EmpInfoTabular_ENDPOINT, EducationInformation).subscribe(
                    data => {
                        if (data.startsWith("Success: ")) //Success
                        {
                            this.msg = data

                        }
                        else {
                            alert(data)
                        }


                    })
            }
            else {
                this.lblError = "";
                this.lblError = "Please Enter School/Institute Name"
            }

        }


    }
    SaveNextEducation() {
        alert('NexttabEducation')
    }

    SaveSalary(SalaryInformation: ISalaryInformation) {

        SalaryInformation.EditEmployeeid = this.EditEmployeeid;
        SalaryInformation.Editmode = this.Editmode;
        if (SalaryInformation.Accountno != null && SalaryInformation.Accountno != "") {
            this.indLoading = true
            this._EmpInfoTabularService.GetAccountNo(Global.BASE_EmpInfoTabular_ENDPOINT, SalaryInformation.Accountno, this.EditEmployeeid)
                .subscribe(data => {
                    this.SalaryAccount = data

                    this.Type = this.SalaryAccount[0].Type;


                    alert(this.SalaryAccount)
                    alert(this.Type)
                    if (this.Type == "false") {
                        debugger;
                        var msg1 = "You have already linked Account Number to inactive User :- " + this.SalaryAccount[0].Employee_Name + ""



                        if (confirm(msg1) == true) {


                            if ($("#ISPFApplicable").prop("checked")) {

                                SalaryInformation.ISPFApplicable = true;

                                if (SalaryInformation.UANNumber != null && SalaryInformation.PFAccountNo != null) {
                                    SalaryInformation.UANNumber = $("#UANNumber").val();
                                    SalaryInformation.PFAccountNo = $("#PFNumber").val();
                                    SalaryInformation.AdharNumber = $("#AdharNumber").val();
                                }
                                else {
                                    SalaryInformation.UANNumber = 0;
                                    SalaryInformation.PFAccountNo = null;
                                    SalaryInformation.AdharNumber = $("#AdharNumber").val();
                                    alert("UANNumber Number is Empty && PFAccount Number is Empty.");
                                }
                            }
                            else {
                                $("#UANNumber").val(0);
                                $("#PFNumber").val(0);
                                SalaryInformation.ISPFApplicable = false;
                                SalaryInformation.UANNumber = 0;
                                SalaryInformation.PFAccountNo = null;
                            }

                            this._EmpInfoTabularService.SaveSalary(Global.BASE_EmpInfoTabular_ENDPOINT, SalaryInformation).subscribe(
                                data => {
                                    if (data.startsWith("Success: ")) //Success
                                    {
                                        this.msg = data

                                    }
                                    else {
                                        alert(data)
                                    }


                                })


                        }

                        else {


                        }
                    }


                    else if (this.Type == "NotAccount") {


                        if ($("#ISPFApplicable").prop("checked")) {

                            SalaryInformation.ISPFApplicable = true;

                            if (SalaryInformation.UANNumber != null && SalaryInformation.PFAccountNo != null) {
                                SalaryInformation.UANNumber = $("#UANNumber").val();
                                SalaryInformation.PFAccountNo = $("#PFNumber").val();
                                SalaryInformation.AdharNumber = $("#AdharNumber").val();
                            }
                            else {
                                SalaryInformation.UANNumber = 0;
                                SalaryInformation.PFAccountNo = null;
                                SalaryInformation.AdharNumber = $("#AdharNumber").val();
                                alert("UANNumber Number is Empty && PFAccount Number is Empty.");
                            }
                        }
                        else {
                            SalaryInformation.ISPFApplicable = false;

                        }

                        this._EmpInfoTabularService.SaveSalary(Global.BASE_EmpInfoTabular_ENDPOINT, SalaryInformation).subscribe(
                            data => {
                                if (data.startsWith("Success: ")) //Success
                                {
                                    this.msg = data

                                }
                                else {
                                    alert(data)
                                }


                            })

                    }
                    else {
                        alert("Account Number is already linked.");


                    }
                })
        }



        //if ($("#ISPFApplicable").prop("checked")) {

        //    SalaryInformation.ISPFApplicable = true;

        //    if (SalaryInformation.UANNumber != null && SalaryInformation.PFAccountNo != null) {
        //        SalaryInformation.UANNumber = $("#UANNumber").val();
        //        SalaryInformation.PFAccountNo = $("#PFNumber").val();
        //        SalaryInformation.AdharNumber = $("#AdharNumber").val();
        //    }
        //    else {
        //        SalaryInformation.UANNumber = 0;
        //        SalaryInformation.PFAccountNo = null;
        //        SalaryInformation.AdharNumber = $("#AdharNumber").val();
        //        alert("UANNumber Number is Empty && PFAccount Number is Empty.");
        //    }
        //}
        //else {
        //    SalaryInformation.ISPFApplicable = false;

        //}

        //this._EmpInfoTabularService.SaveSalary(Global.BASE_EmpInfoTabular_ENDPOINT, SalaryInformation).subscribe(
        //    data => {
        //        if (data.startsWith("Success: ")) //Success
        //        {
        //            this.msg = data

        //        }
        //        else {
        //            alert(data)
        //        }


        //    })

    }
    SaveAttendance(AttendanceInformation: IAttendanceInformation) {


        AttendanceInformation.EditEmployeeid = this.EditEmployeeid
        AttendanceInformation.Editmode = this.Editmode;
        AttendanceInformation.UserId = parseInt(this.EditEmployeeid);
        if (AttendanceInformation.AccessCardId == 0) {
            var selectedValues = $("#nwdday").val();
            var commaSeparated = selectedValues.join(',')
            alert(commaSeparated)
            AttendanceInformation.Nwdday = commaSeparated;



            AttendanceInformation.Intime = $("#IntimeHH").val() + ':' + $("#IntimeMM").val();
            AttendanceInformation.Outitme = $("#OutitmeHH").val() + ':' + $("#OutitmeMM").val();
            AttendanceInformation.Intimesat = $("#IntimesatHH").val() + ':' + $("#IntimesatMM").val();
            AttendanceInformation.Outtimesat = $("#OuttimesatHH").val() + ':' + $("#OuttimesatMM").val();

            this._EmpInfoTabularService.SaveAttendance(Global.BASE_EmpInfoTabular_ENDPOINT, AttendanceInformation).subscribe(
                data => {
                    if (data.startsWith("Success: ")) //Success
                    {
                        this.msg = data

                    }
                    else {
                        alert(data)

                    }


                })
        }
        else {
            this.indLoading = true
            this._EmpInfoTabularService.GetAttendanceDetail(Global.BASE_EmpInfoTabular_ENDPOINT, AttendanceInformation.AccessCardId, AttendanceInformation.UserId)
                .subscribe(data => {
                    this.GetAttendance = data

                    this.indLoading = false
                    this.Output = this.GetAttendance[0].Output;
                    alert(this.Output)

                    if (this.Output == "true") {
                        alert("This access card id as already used.")
                    }
                    else if (this.Output == "Null") {
                        alert("Something went wrong while adding details. <br> Please try again.")
                    }
                    else {
                        var selectedValues = $("#nwdday").val();
                        var commaSeparated = selectedValues.join(',')
                        alert(commaSeparated)
                        AttendanceInformation.Nwdday = commaSeparated;



                        AttendanceInformation.Intime = $("#IntimeHH").val() + ':' + $("#IntimeMM").val();
                        AttendanceInformation.Outitme = $("#OutitmeHH").val() + ':' + $("#OutitmeMM").val();
                        AttendanceInformation.Intimesat = $("#IntimesatHH").val() + ':' + $("#IntimesatMM").val();
                        AttendanceInformation.Outtimesat = $("#OuttimesatHH").val() + ':' + $("#OuttimesatMM").val();

                        this._EmpInfoTabularService.SaveAttendance(Global.BASE_EmpInfoTabular_ENDPOINT, AttendanceInformation).subscribe(
                            data => {
                                if (data.startsWith("Success: ")) //Success
                                {
                                    this.msg = data

                                }
                                else {
                                    alert(data)

                                }


                            })
                    }


                }

                )
        }


    }


    SaveJoining(JoiningInformation: IJoiningInformation) {

        JoiningInformation.EditEmployeeid = this.EditEmployeeid;
        JoiningInformation.Editmode = this.Editmode

        this.JoiningstrError = "";

        if (JoiningInformation.Passportno == null || JoiningInformation.Placeofissue == null || JoiningInformation.Issuedate == null || JoiningInformation.Expirydate == null) {
            if (JoiningInformation.Passportno == "" || JoiningInformation.Passportno == null) {
                this.JoiningstrError += "Please enter passport no ! <br/>";
            }
            if (JoiningInformation.Placeofissue == "" || JoiningInformation.Placeofissue == null) {
                this.JoiningstrError += "Please enter place of issue ! <br/>";
            }
            if (JoiningInformation.Issuedate == null) {
                this.JoiningstrError += "Please enter issue date ! <br/>";
            }
            if (JoiningInformation.Expirydate == null || JoiningInformation.Expirydate == null) {
                this.JoiningstrError += "Please enter expiry date ! <br/>";
            }
        }


        else {


            if (this.Relieving != null) {
                JoiningInformation.RelievingLetterFileName = this.Relieving.item(0).name;
            }
            else {
                JoiningInformation.RelievingLetterFileName = null
            }
            if (this.Experience != null) {
                JoiningInformation.ExperienceLetterFileName = this.Experience.item(0).name;
            }
            else {
                JoiningInformation.ExperienceLetterFileName = null
            }
            if (this.LastSalarySlip != null) {
                JoiningInformation.LastSalarySlipFileName = this.LastSalarySlip.item(0).name;
            }
            else {
                JoiningInformation.LastSalarySlipFileName = null
            }
            if (this.DegreeCertificate != null) {
                JoiningInformation.DegreeCertificateFileName = this.DegreeCertificate.item(0).name;
            }
            else {
                JoiningInformation.DegreeCertificateFileName = null
            }
            if (this.LastMarksheet != null) {
                JoiningInformation.LastMarksheetFileName = this.LastMarksheet.item(0).name;
            }
            else {
                JoiningInformation.LastMarksheetFileName = null
            }
            if (this.Passport != null) {
                JoiningInformation.PassportFileName = this.Passport.item(0).name;
            }
            else {
                JoiningInformation.PassportFileName = null
            }
            if (this.DrivingLicense != null) {
                JoiningInformation.DrivingLicenseFileName = this.DrivingLicense.item(0).name;
            }
            else {
                JoiningInformation.DrivingLicenseFileName = null
            }
            if (this.PANCard != null) {
                JoiningInformation.PANCardFileName = this.PANCard.item(0).name;
            }
            else {
                JoiningInformation.PANCardFileName = null
            }
            if (this.CurriculamVitae != null) {
                JoiningInformation.CurriculamVitaeFilName = this.CurriculamVitae.item(0).name;
            }
            else {
                JoiningInformation.CurriculamVitaeFilName = null
            }
            if (this.Other != null) {
                JoiningInformation.OtherFileName = this.Other.item(0).name;
            }
            else {
                JoiningInformation.OtherFileName = null
            }
            if (this.Other0 != null) {
                JoiningInformation.OtherFileName0 = this.Other0.item(0).name;
            }
            else {
                JoiningInformation.OtherFileName0 = null
            }
            if (this.Other1 != null) {
                JoiningInformation.OtherFileName1 = this.Other1.item(0).name;
            }
            else {
                JoiningInformation.OtherFileName1 = null
            }
            this._EmpInfoTabularService.SaveJoining(Global.BASE_EmpInfoTabular_ENDPOINT, JoiningInformation).subscribe(
                data => {
                    if (data.startsWith("Success: ")) //Success
                    {


                        if (this.Relieving != null) {
                            if (this.Relieving.length > 0) {

                                this.Relieving.item(0).name
                                let file: File = this.Relieving[0];
                                let formData: FormData = new FormData();
                                formData.append('uploadFile', file, file.name);
                                let headers = new Headers()
                                let options = new RequestOptions({ headers: headers });
                                let apiUrl1 = "/api/EmpInfoTabularAPI/UploadJsonFile";
                                this.http.post(apiUrl1, formData, options)
                                    .map(res => res.json())
                                    .catch(error => Observable.throw(error))
                                    .subscribe(
                                    data => console.log('success'),
                                    error => console.log(error)
                                    )
                            }
                        }
                        else {
                            JoiningInformation.RelievingLetterFileName = null
                        }
                        if (this.Experience != null) {
                            if (this.Experience.length > 0) {

                                this.Experience.item(0).name
                                let file: File = this.Experience[0];
                                let formData: FormData = new FormData();
                                formData.append('uploadFile', file, file.name);
                                let headers = new Headers()
                                let options = new RequestOptions({ headers: headers });
                                let apiUrl1 = "/api/EmpInfoTabularAPI/UploadJsonFile";
                                this.http.post(apiUrl1, formData, options)
                                    .map(res => res.json())
                                    .catch(error => Observable.throw(error))
                                    .subscribe(
                                    data => console.log('success'),
                                    error => console.log(error)
                                    )
                            }
                        }
                        else {
                            JoiningInformation.ExperienceLetterFileName = null
                        }
                        if (this.LastSalarySlip != null) {
                            if (this.LastSalarySlip.length > 0) {

                                this.LastSalarySlip.item(0).name
                                let file: File = this.LastSalarySlip[0];
                                let formData: FormData = new FormData();
                                formData.append('uploadFile', file, file.name);
                                let headers = new Headers()
                                let options = new RequestOptions({ headers: headers });
                                let apiUrl1 = "/api/EmpInfoTabularAPI/UploadJsonFile";
                                this.http.post(apiUrl1, formData, options)
                                    .map(res => res.json())
                                    .catch(error => Observable.throw(error))
                                    .subscribe(
                                    data => console.log('success'),
                                    error => console.log(error)
                                    )
                            }
                        }
                        else {
                            JoiningInformation.LastSalarySlipFileName = null
                        }
                        if (this.DegreeCertificate != null) {
                            if (this.DegreeCertificate.length > 0) {

                                this.DegreeCertificate.item(0).name
                                let file: File = this.DegreeCertificate[0];
                                let formData: FormData = new FormData();
                                formData.append('uploadFile', file, file.name);
                                let headers = new Headers()
                                let options = new RequestOptions({ headers: headers });
                                let apiUrl1 = "/api/EmpInfoTabularAPI/UploadJsonFile";
                                this.http.post(apiUrl1, formData, options)
                                    .map(res => res.json())
                                    .catch(error => Observable.throw(error))
                                    .subscribe(
                                    data => console.log('success'),
                                    error => console.log(error)
                                    )
                            }
                        }
                        else {
                            JoiningInformation.DegreeCertificateFileName = null
                        }
                        if (this.LastMarksheet != null) {
                            if (this.LastMarksheet.length > 0) {

                                this.LastMarksheet.item(0).name
                                let file: File = this.LastMarksheet[0];
                                let formData: FormData = new FormData();
                                formData.append('uploadFile', file, file.name);
                                let headers = new Headers()
                                let options = new RequestOptions({ headers: headers });
                                let apiUrl1 = "/api/EmpInfoTabularAPI/UploadJsonFile";
                                this.http.post(apiUrl1, formData, options)
                                    .map(res => res.json())
                                    .catch(error => Observable.throw(error))
                                    .subscribe(
                                    data => console.log('success'),
                                    error => console.log(error)
                                    )
                            }
                        }
                        else {
                            JoiningInformation.LastMarksheetFileName = null
                        }
                        if (this.Passport != null) {
                            if (this.Passport.length > 0) {

                                this.Passport.item(0).name
                                let file: File = this.Passport[0];
                                let formData: FormData = new FormData();
                                formData.append('uploadFile', file, file.name);
                                let headers = new Headers()
                                let options = new RequestOptions({ headers: headers });
                                let apiUrl1 = "/api/EmpInfoTabularAPI/UploadJsonFile";
                                this.http.post(apiUrl1, formData, options)
                                    .map(res => res.json())
                                    .catch(error => Observable.throw(error))
                                    .subscribe(
                                    data => console.log('success'),
                                    error => console.log(error)
                                    )
                            }
                        }
                        else {
                            JoiningInformation.PassportFileName = null
                        }
                        if (this.DrivingLicense != null) {
                            if (this.DrivingLicense.length > 0) {

                                this.DrivingLicense.item(0).name
                                let file: File = this.DrivingLicense[0];
                                let formData: FormData = new FormData();
                                formData.append('uploadFile', file, file.name);
                                let headers = new Headers()
                                let options = new RequestOptions({ headers: headers });
                                let apiUrl1 = "/api/EmpInfoTabularAPI/UploadJsonFile";
                                this.http.post(apiUrl1, formData, options)
                                    .map(res => res.json())
                                    .catch(error => Observable.throw(error))
                                    .subscribe(
                                    data => console.log('success'),
                                    error => console.log(error)
                                    )
                            }
                        }
                        else {
                            JoiningInformation.DrivingLicenseFileName = null
                        }
                        if (this.PANCard != null) {
                            if (this.PANCard.length > 0) {

                                this.PANCard.item(0).name
                                let file: File = this.PANCard[0];
                                let formData: FormData = new FormData();
                                formData.append('uploadFile', file, file.name);
                                let headers = new Headers()
                                let options = new RequestOptions({ headers: headers });
                                let apiUrl1 = "/api/EmpInfoTabularAPI/UploadJsonFile";
                                this.http.post(apiUrl1, formData, options)
                                    .map(res => res.json())
                                    .catch(error => Observable.throw(error))
                                    .subscribe(
                                    data => console.log('success'),
                                    error => console.log(error)
                                    )
                            }
                        }
                        else {
                            JoiningInformation.PANCardFileName = null
                        }
                        if (this.CurriculamVitae != null) {
                            if (this.CurriculamVitae.length > 0) {

                                this.CurriculamVitae.item(0).name
                                let file: File = this.CurriculamVitae[0];
                                let formData: FormData = new FormData();
                                formData.append('uploadFile', file, file.name);
                                let headers = new Headers()
                                let options = new RequestOptions({ headers: headers });
                                let apiUrl1 = "/api/EmpInfoTabularAPI/UploadJsonFile";
                                this.http.post(apiUrl1, formData, options)
                                    .map(res => res.json())
                                    .catch(error => Observable.throw(error))
                                    .subscribe(
                                    data => console.log('success'),
                                    error => console.log(error)
                                    )
                            }
                        }
                        else {
                            JoiningInformation.CurriculamVitaeFilName = null
                        }
                        if (this.Other != null) {
                            if (this.Other.length > 0) {

                                this.Other.item(0).name
                                let file: File = this.Other[0];
                                let formData: FormData = new FormData();
                                formData.append('uploadFile', file, file.name);
                                let headers = new Headers()
                                let options = new RequestOptions({ headers: headers });
                                let apiUrl1 = "/api/EmpInfoTabularAPI/UploadJsonFile";
                                this.http.post(apiUrl1, formData, options)
                                    .map(res => res.json())
                                    .catch(error => Observable.throw(error))
                                    .subscribe(
                                    data => console.log('success'),
                                    error => console.log(error)
                                    )
                            }
                        }
                        else {
                            JoiningInformation.OtherFileName = null
                        }
                        if (this.Other0 != null) {
                            if (this.Other0.length > 0) {

                                this.Other0.item(0).name
                                let file: File = this.Other0[0];
                                let formData: FormData = new FormData();
                                formData.append('uploadFile', file, file.name);
                                let headers = new Headers()
                                let options = new RequestOptions({ headers: headers });
                                let apiUrl1 = "/api/EmpInfoTabularAPI/UploadJsonFile";
                                this.http.post(apiUrl1, formData, options)
                                    .map(res => res.json())
                                    .catch(error => Observable.throw(error))
                                    .subscribe(
                                    data => console.log('success'),
                                    error => console.log(error)
                                    )
                            }
                        }
                        else {
                            JoiningInformation.OtherFileName0 = null
                        }
                        if (this.Other1 != null) {
                            if (this.Other1.length > 0) {

                                this.Other1.item(0).name
                                let file: File = this.Other1[0];
                                let formData: FormData = new FormData();
                                formData.append('uploadFile', file, file.name);
                                let headers = new Headers()
                                let options = new RequestOptions({ headers: headers });
                                let apiUrl1 = "/api/EmpInfoTabularAPI/UploadJsonFile";
                                this.http.post(apiUrl1, formData, options)
                                    .map(res => res.json())
                                    .catch(error => Observable.throw(error))
                                    .subscribe(
                                    data => console.log('success'),
                                    error => console.log(error)
                                    )
                            }
                        }
                        else {
                            JoiningInformation.Other1 = null
                        }


                        this.msg = data

                    }
                    else {
                        alert(data)
                    }


                })
        }
    }

    SaveIncrement(Incrementformation: IIncrementformation) {

        Incrementformation.EditEmployeeid = this.EditEmployeeid;
        Incrementformation.Editmode =
            this.Validation = "";
        var joinigtype = $("#DesignationChange").val();
        var incrmenttype = $("#incrmenttype").val();
        var salarychange = $("#salarychange").val();
        var salarychangebreakup = $("#salarychangebreakup").val();
        Incrementformation.SalaryRangeId = salarychangebreakup;
        var currentTime = new Date()
        var displayDate = currentTime.getFullYear()
        if (Incrementformation.AppraisalDate != null) {
            var tt = $("#AppraisalDate").val();
            var date = new Date(tt);


            var dd = date.getDate();
            var mm = date.getMonth() + 1;
            var y = date.getFullYear();
            var someFormattedDate = y;


        }

        Incrementformation.Designationchange = joinigtype;
        Incrementformation.Increment = incrmenttype;
        Incrementformation.Isfirst = false;
        Incrementformation.Salarychange = salarychange;

        if (Incrementformation.AppraisalDate == null || Incrementformation.Incrementdate == null || joinigtype == 0 || incrmenttype == 0 || salarychange == "") {
            if (Incrementformation.Incrementdate == null) {
                this.Validation = "Please Select Increment Date ! \n";
            }
            if (joinigtype == 0) {
                this.Validation += "Please Select Designation Change ! \n";
            }
            if (incrmenttype == 0) {
                this.Validation += "Please Select Increment Type ! \n";
            }
            if (salarychange == "") {
                this.msg += "Please Enter Salary Change ! \n";
            }
            if (salarychangebreakup == 0) {
                this.Validation += "Please Select Salary Slab ! \n";
            }
            if (Incrementformation.AppraisalDate == null) {
                this.Validation += "Please Select Next Appraisal Date ! \n";
            }
        }
        else if ((Incrementformation.AppraisalDate) <= (Incrementformation.Incrementdate)) {
            this.Validation = "Next Appraisal Date not Less than Increment Date ! \n ";
        }

        else if ((someFormattedDate) <= (displayDate)) {
            this.Validation = "Next Appraisal Date is not Past Date ! \n ";
        }
        if (this.Validation != "") {



        }
        else {
            this.Validation = ""
            if ($("#chkIncrementType").prop("checked") && $("#chkIncrementSalary").prop("checked")) {
                this.Validation = "Both Designation & Salary can't be unchanged !";
            }
            else {





                this._EmpInfoTabularService.SaveIncrement(Global.BASE_EmpInfoTabular_ENDPOINT, Incrementformation).subscribe(
                    data => {
                        if (data.startsWith("Success: ")) //Success
                        {
                            this.msg = data

                        }
                        else {
                            alert(data)
                        }


                    })



            }
        }
    }

    SaveOfficial(OfficialInformation: IOfficialInformation) {

        OfficialInformation.EditEmployeeid = this.EditEmployeeid,
            OfficialInformation.Editmode = this.Editmode,

            this.strError = "";

        if (OfficialInformation.Verveemail == null && OfficialInformation.Vervepassword == null) {
        }
        else {
            if (OfficialInformation.Vervepassword == null) {
                this.strError = "Please enter Company email id's password ! </n>";
            }
            if (OfficialInformation.Verveemail == null) {
                this.strError += "Please enter Company email id ! </n>";
            }
        }
        if (OfficialInformation.Gmail == null && OfficialInformation.Gmailpassword == null) {
        }

        else {
            if (OfficialInformation.Gmailpassword == null) {
                this.strError += "Please enter Gmail id's password ! </n>";
            }
            if (OfficialInformation.Gmail == null) {
                this.strError += "Please enter Gmail id ! </n>";
            }
        }
        if (OfficialInformation.Yahoo == null && OfficialInformation.Yahoopassword == null) {
        }
        else if (OfficialInformation.Yahoo == "" && OfficialInformation.Yahoopassword == "") {
        }
        else {
            if (OfficialInformation.Yahoopassword == null) {
                this.strError += "Please enter yahoo id's password ! </n>";
            }
            if (OfficialInformation.Yahoo == null) {
                this.strError += "Please enter yahoo id ! </n>";
            }
        }
        if (OfficialInformation.Skype == null && OfficialInformation.Skypepassword == null) {
        }
        else if (OfficialInformation.Skype == "" && OfficialInformation.Skypepassword == "") {
        }
        else {
            if (OfficialInformation.Skypepassword == null) {
                this.strError += "Please enter skype id's password ! </n>";
            }
            if (OfficialInformation.Skype == null) {
                this.strError += "Please enter skype id ! </n>";
            }
        }
        if (OfficialInformation.Othersitename == null && OfficialInformation.Otherid == null && OfficialInformation.Othersitename == null)
        { }
        else if (OfficialInformation.Othersitename == "" && OfficialInformation.Otherid == "" && OfficialInformation.Othersitename == "") {
        }
        else {
            if (OfficialInformation.Othersitename == null) {
                this.strError += "Please enter Other site's name ! </n>";
            }
            if (OfficialInformation.Otherid == null) {
                this.strError += "Please enter Other site's email id ! </n>";
            }
            if (OfficialInformation.Othersitename == null) {
                this.strError += "Please enter Other site's password ! </n>";
            }
        }
        if (this.strError == "") {

            this._EmpInfoTabularService.SaveOfficial(Global.BASE_EmpInfoTabular_ENDPOINT, OfficialInformation).subscribe(
                data => {
                    if (data.startsWith("Success: ")) //Success
                    {
                        this.msg = data

                    }
                    else {
                        alert(data)
                    }


                })
        }
        else {

        }


    }

    SavePastExperience(ExperienceInformation: IExperienceInformation) {

        ExperienceInformation.EditEmployeeid = this.EditEmployeeid;
        ExperienceInformation.Editmode = this.Editmode;

        var Totalexperience = $("#txtTotalexperience").val();
        var ExperienceMonth = $("#txtExperienceMonth").val();

        if (Totalexperience != "" && ExperienceMonth != "12") {

            if ((ExperienceMonth) < 9) {
                var expmonth = "0" + ExperienceMonth;
                ExperienceInformation.Totalexp = Totalexperience + "." + expmonth;
            }
            else {
                ExperienceInformation.Totalexp = Totalexperience + "." + ExperienceMonth;

            }
        }
        else {
            var year = Totalexperience;

            year = year + 1;
            ExperienceInformation.Totalexp = year;



        }


        this._EmpInfoTabularService.btnAddExp(Global.BASE_EmpInfoTabular_ENDPOINT, ExperienceInformation).subscribe(
            data => {
                if (data.startsWith("Success: ")) //Success
                {
                    this.msg = data

                }
                else {
                    alert(data)
                }


            })

    }
    AddLeave(LeaveInfoFrm: ILeaveInfoFrm) {


        LeaveInfoFrm.EditEmployeeid = this.EditEmployeeid;
        LeaveInfoFrm.Editmode = this.Editmode;

        var intvalue = LeaveInfoFrm.AdjustedValue;

        var adjvalue = $("#txtAdjustLeave").val()
        if (intvalue == 0) {
            alert('0 Leave can not be adjusted.');

        }
        else if (LeaveInfoFrm.Remarks == null) {
            this.leaveerror = "Remarks required !";
        }
        else {
            if ($("#chkLeaveAdjust").prop("checked")) {
                if (intvalue != 0) {
                    if (intvalue > 0) {
                        LeaveInfoFrm.Transactiontype = "Credit";
                    }
                    else {
                        LeaveInfoFrm.Transactiontype = "Debit";
                    }

                    LeaveInfoFrm.Isadjusted = true;
                    LeaveInfoFrm.AdjustedValue = adjvalue;

                    this._EmpInfoTabularService.AddLeave(Global.BASE_EmpInfoTabular_ENDPOINT, LeaveInfoFrm).subscribe(
                        data => {
                            if (data.startsWith("Success: ")) //Success
                            {
                                this.msg = data

                                this.GetAdustmentleave(parseInt(LeaveInfoFrm.EditEmployeeid))

                            }
                            else {
                                alert(data)
                            }


                        })

                }
            }

        }


    }
    EmpInfoTabularFilterCriteriaChange(value: string): void {
        if (value != '[object Event]')
            this.EmpInfoTabularFilter = value
    }
    EmpInfoTabularSort(property: any) {

        if (!this.ShowHideSearch) {
            this.isDesc = !this.isDesc
            this.column = property
            this.direction = this.isDesc ? 1 : -1
        }
    }

    addEmpInfoTabular() {
        //  this.SetControlsState(true)
        this.modalTitle = "Add New EmpInfoTabular"
        this.modalBtnTitle = "Add"
        this.EmpInfoTabularFrm.reset()
        this.modal.open()

    }

    editEmpInfoTabular(id: number) {
        this.dbops = DBOperation.update
        /// this.SetControlsState(true)
        this.modalTitle = "Edit News"
        this.modalBtnTitle = "Update"
        //his.EmpInfoTabular = this.EmpInfoTabulars.filter(x => x.Id == id)[0]
        this.EmpInfoTabularFrm.setValue(this.EmpInfoTabular)
        this.modal.open()
    }

    AddRole(ExperienceInformation: IExperienceInformation) {

        this.InLoading = true;

        this._EmpInfoTabularService.AddRole(Global.BASE_EmpInfoTabular_ENDPOINT, ExperienceInformation).subscribe(
            data => {
                if (data.startsWith("Success: ")) //Success
                {
                    this.msg = data

                }
                else {
                    alert(data)
                }


            })

        this.indLoading = true

    }
    GetRoleAdd() {

        this.indLoading = true
        this._EmpInfoTabularService.GetRoleAdd(Global.BASE_EmpInfoTabular_ENDPOINT)
            .subscribe(data => {
                this.RoleAdds = data

                this.indLoading = false
            }

            )
    }

    editRoles(ExpRoleId: number) {

        //this.SetControlsState(true)
        this.ExperienceInformation = this.RoleAdds.filter(x => x.ExpRoleId == ExpRoleId)[0]
        //  this.ExperienceInfoFrm.setValue(this.ExperienceInformation)

    }
    deleteRoles(id: number) {

        this.indLoading = true;
        this._EmpInfoTabularService.delete(Global.BASE_EmpInfoTabular_ENDPOINT, id)
            .subscribe(Data => {

                if (Data.startsWith("Success: ")) //Success
                {
                    this.msg = Data;
                    this.GetRoleAdd()

                }
                else {


                    alert(Data);
                }




                this.indLoading = false;


            }

            );



    }


    OpenSkill() {
        alert('Skill')
        this.modal.open();
        
    }
    GetSkill() {

        this.indLoading = true
        this._EmpInfoTabularService.GetSkill(Global.BASE_EmpInfoTabular_ENDPOINT)
            .subscribe(data => {
                this.MySkillFrms = data
                console.log(this.MySkillFrms)
                this.indLoading = false
            }

            )
    }
    GetPopupSkill(event)
    {
        alert(event.target.value)
        this.indLoading = true
        this._EmpInfoTabularService.GetPopupSkill(Global.BASE_EmpInfoTabular_ENDPOINT, event.target.value)
            .subscribe(data => {
                this.Secondlists = data

                this.indLoading = false
            }

            )
    }
    GetGridViewList(UserId:number) {


        this.indLoading = true
        this._EmpInfoTabularService.GetPopupSkill(Global.BASE_EmpInfoTabular_ENDPOINT, UserId)
            .subscribe(data => {
                this.Secondlists = data

                this.indLoading = false
            }

            )
    }

    Saveskill(MySkillFrm: IMySkillFrm)
    {
        debugger;
        MySkillFrm.EditEmployeeid = this.EditEmployeeid;
        MySkillFrm.Editmode = this.Editmode;
        this._EmpInfoTabularService.Saveskill(Global.BASE_EmpInfoTabular_ENDPOINT, MySkillFrm).subscribe(
            data => {
                if (data.startsWith("Success: ")) //Success
                {
                    this.msg = data

                }
                else {
                    alert(data)

                }


            })

    }
    //SetControlsState(isEnable: boolean) {
    //    isEnable ? this.ExperienceInfoFrm.enable() : this.ExperienceInfoFrm.disable()
    //}

    ChangeRecordsPerPage(RecordsPerPage: number) {
        this.CurrentRecordsPerPage = RecordsPerPage
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1)
        }
    }

    JumpOnPage(PageNumber: number) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.PendingTasks)
        this.pager = this.pagerService.pager
        this.pagedItems = this.pagerService.pagedItems
        alert(this.pagedItems)
    }

    ShowHideSearchControls() {
        this.ShowHideSearch = !this.ShowHideSearch
    }

    onSubmit(formData: any) {

        this.msg = ""

        switch (this.dbops) {
            case DBOperation.create:

                this._EmpInfoTabularService.post(Global.BASE_EmpInfoTabular_ENDPOINT, formData._value).subscribe(
                    data => {
                        if (data.startsWith("Success: ")) //Success
                        {
                            this.msg = data

                            this.modal.dismiss()
                        }
                        else {


                            alert(data)
                        }


                    },
                    error => {
                        this.msg = error
                    }
                )
                break
            case DBOperation.update:

                this._EmpInfoTabularService.put(Global.BASE_EmpInfoTabular_ENDPOINT, formData.Id, formData._value).subscribe(
                    data => {
                        if (data.startsWith("Success: ")) //Success
                        {
                            this.msg = data

                            this.modal.dismiss()
                        }
                        else {


                            alert(data)
                        }


                    },
                    error => {
                        this.msg = error
                    }
                )
                break
            case DBOperation.delete:

                this._EmpInfoTabularService.delete(Global.BASE_EmpInfoTabular_ENDPOINT, formData.Id).subscribe(
                    data => {
                        if (data.startsWith("Success: ")) //Success
                        {
                            this.msg = data

                            this.modal.dismiss()
                        }
                        else {


                            alert(data)
                        }
                    },
                    error => {
                        this.msg = error
                    }
                )
                break

        }
    }
}