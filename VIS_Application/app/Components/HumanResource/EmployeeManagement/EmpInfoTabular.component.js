"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var EmpInfoTabular_service_1 = require("../../../Service/HumanResource/EmployeeManagement/EmpInfoTabular.service");
var forms_1 = require("@angular/forms");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var enum_1 = require("../../../Shared/enum");
var Rx_1 = require("rxjs/Rx");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw"); // fixed typo
var global_1 = require("../../../Shared/global");
var pager_index_1 = require("../../../Shared/pager.index");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var EmpInfoTabularComponent = (function () {
    function EmpInfoTabularComponent(fb, _EmpInfoTabularService, pagerService, http, activatedRoute) {
        this.fb = fb;
        this._EmpInfoTabularService = _EmpInfoTabularService;
        this.pagerService = pagerService;
        this.http = http;
        this.activatedRoute = activatedRoute;
        this.indLoading = false;
        this.isDesc = false;
        this.column = '';
        this.CurrentRecordsPerPage = 10;
        // pager object
        this.pager = {};
        //Variables for Filter
        this.ShowHideSearch = false;
        this.ShowHideSearchNew = false;
        //declare id 
        this.tempUserId = 21;
        this.tempUSertype = "Admin";
        this.Age = null;
        this.parment = null;
        // this.EmployeeCode = null
        this.IsSLASigned = "Yes";
        debugger;
        this.EditEmployeeid = this.activatedRoute.snapshot.queryParams["UserId"];
        var mode = this.activatedRoute.snapshot.queryParams["mode"];
        this.Editmode = mode;
        this.EditEmployeeid = this.EditEmployeeid;
        alert(this.Editmode);
        alert(this.EditEmployeeid);
    }
    EmpInfoTabularComponent.prototype.ngOnInit = function () {
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
            });
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
            });
        this.MySkillFrm =
            ({
                EditEmployeeid: this.EditEmployeeid,
                Editmode: this.Editmode,
                Name: '',
                lookupSkilId: 0,
                SkillName: '',
                id: 0,
            });
        this.GetSkill();
        this.checkMaritalStatus(event);
        this.LoadGetRole();
        this.LoadGetTechnology();
        this.LoadGetCompany();
        this.LoadGetWorking();
        this.LoadGetJoiningDesignation();
        this.LoadGetDepartmentname();
        this.LoadGetPositionName();
        this.LoadGetEmployeeGrade();
        this.LoadGetEducationType();
        this.LoadGetUserRole();
        this.LoadGetLinemanager(this.tempUSertype, this.tempUserId);
        this.FillEmployee();
        this.GetNonWorking();
        this.GetInTimeOutTimeSelected();
        this.GetRoleAdd();
        this.GetIncrementType();
        this.GetIncrementList();
        // this.GetOfferdeatils(parseInt(this.EditEmployeeid))
        debugger;
        if (this.EditEmployeeid != null && this.Editmode) {
            this.GetPendingList(this.EditEmployeeid);
            this.GetFeedbackList(this.EditEmployeeid);
            this.GetOfferdeatils(parseInt(this.EditEmployeeid));
            this.GetAdustmentleave(parseInt(this.EditEmployeeid));
            this.GetEmployeeDeatils(parseInt(this.EditEmployeeid));
            this.FillPassingYear(this.EditEmployeeid, this.Editmode);
        }
        this.GetLeaveType();
        this.FillLeaveDeatil();
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
    };
    EmpInfoTabularComponent.prototype.fileRelieving = function (event) {
        this.Relieving = event.target.files;
    };
    EmpInfoTabularComponent.prototype.fileExperience = function (event) {
        this.Experience = event.target.files;
    };
    EmpInfoTabularComponent.prototype.fileLastSalarySlip = function (event) {
        this.LastSalarySlip = event.target.files;
    };
    EmpInfoTabularComponent.prototype.fileDegreeCertificate = function (event) {
        this.DegreeCertificate = event.target.files;
    };
    EmpInfoTabularComponent.prototype.fileLastMarksheet = function (event) {
        this.LastMarksheet = event.target.files;
    };
    EmpInfoTabularComponent.prototype.filePassport = function (event) {
        this.Passport = event.target.files;
    };
    EmpInfoTabularComponent.prototype.fileDrivingLicense = function (event) {
        this.DrivingLicense = event.target.files;
    };
    EmpInfoTabularComponent.prototype.filePANCard = function (event) {
        this.PANCard = event.target.files;
    };
    EmpInfoTabularComponent.prototype.fileCurriculamVitae = function (event) {
        this.CurriculamVitae = event.target.files;
    };
    EmpInfoTabularComponent.prototype.fileOther = function (event) {
        this.Other = event.target.files;
    };
    EmpInfoTabularComponent.prototype.fileOther0 = function (event) {
        this.Other0 = event.target.files;
    };
    EmpInfoTabularComponent.prototype.fileOther1 = function (event) {
        this.Other1 = event.target.files;
    };
    EmpInfoTabularComponent.prototype.moveItems = function (origin, dest) {
        $(origin).find(':selected').appendTo(dest);
    };
    EmpInfoTabularComponent.prototype.moveAllItems = function (origin, dest) {
        $(origin).children().appendTo(dest);
    };
    EmpInfoTabularComponent.prototype.moveRightAll = function (origin, dest) {
        this.moveAllItems("#ddlTechnical1", "#ddlTechnical2");
    };
    EmpInfoTabularComponent.prototype.moveLeftAll = function (origin, dest) {
        this.moveAllItems("#ddlTechnical2", "#ddlTechnical1");
    };
    EmpInfoTabularComponent.prototype.moveRight = function (origin, dest) {
        this.moveItems("#ddlTechnical1", "#ddlTechnical2");
    };
    EmpInfoTabularComponent.prototype.moveLeft = function (origin, dest) {
        this.moveItems("#ddlTechnical2", "#ddlTechnical1");
    };
    EmpInfoTabularComponent.prototype.checkMaritalStatus = function (event) {
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
    };
    EmpInfoTabularComponent.prototype.Resigned = function (e) {
        if (e.target.checked) {
            $("#Resigned").show();
        }
        else {
            $("#Resigned").hide();
        }
    };
    EmpInfoTabularComponent.prototype.chMd = function (event) {
        if (event.target.value == 'No') {
            var SlASigned = document.getElementById("SLASigned").value;
            this.SlASigned = 0;
            $("#SLASigned").attr("disabled", "disabled");
        }
        else {
            $("#SLASigned").removeAttr("disabled");
            this.SlASigned = null;
        }
    };
    EmpInfoTabularComponent.prototype.copyaddress = function (e) {
        if (e.target.checked) {
            var Communiction = document.getElementById("txtpermenantaddress").value;
            var parment = document.getElementById("txtCommunicationaddress").value;
            this.parment = Communiction;
            $("#txtCommunicationaddress").attr("disabled", "disabled");
        }
        else {
            var parment = document.getElementById("txtCommunicationaddress").value;
            this.parment = null;
            $("#txtCommunicationaddress").removeAttr("disabled");
        }
    };
    EmpInfoTabularComponent.prototype.JoinDiv = function (e) {
        if (e.target.checked) {
            $("#divJoining").show();
        }
        else {
            $("#divJoining").hide();
        }
    };
    EmpInfoTabularComponent.prototype.Confirmed = function (e) {
        if (e.target.checked) {
            $("#pnlConfirmationDate").show();
        }
        else {
            $("#pnlConfirmationDate").hide();
        }
    };
    EmpInfoTabularComponent.prototype.calAge = function () {
        $("#Age").attr("disabled", "disabled");
        var birthDay = $("#date").val();
        var now = new Date();
        var b_split = birthDay.split('-');
        if (b_split.length == 3) {
            var birthDate = new Date(b_split[0], b_split[1] * 1 - 1, b_split[2]);
            var years = Math.floor((now.getTime() - birthDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
            this.Age = years;
        }
    };
    EmpInfoTabularComponent.prototype.calEmailId = function () {
        var FirstName = $("#FirstName").val();
        var Email = FirstName + "@vervesys.local";
        this.Email = Email;
    };
    EmpInfoTabularComponent.prototype.CalEmployeecode = function (event) {
        var x = ($('input[name="Type"]:checked').val());
        if (x == "E%") {
            //$("#DemoEmployee").hide();
            //$("#Employeecode").show();
            this.GetEmployeeTime(event.target.value);
        }
        else {
        }
    };
    EmpInfoTabularComponent.prototype.GetEmployeeTime = function (CompanyId) {
        var _this = this;
        this.indLoading = true;
        this._EmpInfoTabularService.GetEmployeeTime(global_1.Global.BASE_EmpInfoTabular_ENDPOINT, CompanyId)
            .subscribe(function (data) {
            _this.Forstrcode = data[0];
            var Employeecode = _this.Forstrcode.strCode;
            _this.EmployeeCodes = Employeecode;
            alert(_this.EmployeeCodes);
            _this.indLoading = false;
        });
    };
    EmpInfoTabularComponent.prototype.FillPassingYear = function (EditEmployeeid, Editmode) {
        var _this = this;
        ;
        this.indLoading = true;
        this._EmpInfoTabularService.FillPassingYear(global_1.Global.BASE_EmpInfoTabular_ENDPOINT, EditEmployeeid, Editmode)
            .subscribe(function (data) {
            _this.Year = data;
        });
    };
    EmpInfoTabularComponent.prototype.PfChange = function (e) {
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
    };
    EmpInfoTabularComponent.prototype.calSalary = function (e) {
        if (e.target.click) {
            var Salary = $("#Salary").val();
            $("#SalaryBreakupDemo").hide();
            $("#showSalaryBreakup").show();
            this.GetSalaryRangeDropDown(Salary);
        }
        else {
            $("#showSalaryBreakup").hide();
            $("#SalaryBreakup").hide();
            $("#SalaryBreakupDemo").show();
        }
    };
    EmpInfoTabularComponent.prototype.calSalarychange = function () {
        var salarychange = $("#salarychange").val();
        if ((salarychange != null && salarychange != "")) {
            $("#SalaryBreakupchange").show();
            $("#SalaryBreakupDemochange").hide();
            $("#Errormsg").hide();
            $("#Errormsgdemo").show();
            this.GetSalaryRangechangedropdown(salarychange);
        }
        else {
            this.Errormsg = "Salary must be Enterd";
            $("#Errormsgdemo").hide();
        }
    };
    EmpInfoTabularComponent.prototype.ChkTotalSalaryClick = function () {
        debugger;
        alert('test');
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
    };
    EmpInfoTabularComponent.prototype.SameJoiiningSalary = function () {
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
    };
    EmpInfoTabularComponent.prototype.calRelevingDate = function () {
        var RelevingDate = $("#Salary").val();
        if (RelevingDate != null) {
            $("#pnlRelevingInformation").show();
        }
        else {
            $("#pnlRelevingInformation").hide();
        }
    };
    EmpInfoTabularComponent.prototype.LoadGetRole = function () {
        var _this = this;
        this.indLoading = true;
        this._EmpInfoTabularService.GetRole(global_1.Global.BASE_EmpInfoTabular_ENDPOINT)
            .subscribe(function (data) {
            _this.Roles = data;
            _this.indLoading = false;
        });
    };
    EmpInfoTabularComponent.prototype.LoadGetTechnology = function () {
        var _this = this;
        this.indLoading = true;
        this._EmpInfoTabularService.GetTechnology(global_1.Global.BASE_EmpInfoTabular_ENDPOINT)
            .subscribe(function (data) {
            _this.Technologs = data;
            _this.indLoading = false;
        });
    };
    EmpInfoTabularComponent.prototype.LoadGetCompany = function () {
        var _this = this;
        this.indLoading = true;
        this._EmpInfoTabularService.GetCompany(global_1.Global.BASE_EmpInfoTabular_ENDPOINT)
            .subscribe(function (data) {
            _this.Companys = data;
            _this.indLoading = false;
        });
    };
    EmpInfoTabularComponent.prototype.LoadGetWorking = function () {
        var _this = this;
        this.indLoading = true;
        this._EmpInfoTabularService.GetWorking(global_1.Global.BASE_EmpInfoTabular_ENDPOINT)
            .subscribe(function (data) {
            _this.Workings = data;
            _this.indLoading = false;
        });
    };
    EmpInfoTabularComponent.prototype.LoadGetJoiningDesignation = function () {
        var _this = this;
        this.indLoading = true;
        this._EmpInfoTabularService.GetJoiningDesignation(global_1.Global.BASE_EmpInfoTabular_ENDPOINT)
            .subscribe(function (data) {
            _this.JoiningDesignations = data;
            _this.indLoading = false;
        });
    };
    EmpInfoTabularComponent.prototype.LoadGetDepartmentname = function () {
        var _this = this;
        this.indLoading = true;
        this._EmpInfoTabularService.GetDepartmentname(global_1.Global.BASE_EmpInfoTabular_ENDPOINT)
            .subscribe(function (data) {
            _this.Departmentnames = data;
            _this.indLoading = false;
        });
    };
    EmpInfoTabularComponent.prototype.LoadGetPositionName = function () {
        var _this = this;
        this.indLoading = true;
        this._EmpInfoTabularService.GetPositionName(global_1.Global.BASE_EmpInfoTabular_ENDPOINT)
            .subscribe(function (data) {
            _this.PositionNames = data;
            _this.indLoading = false;
        });
    };
    EmpInfoTabularComponent.prototype.LoadGetEmployeeGrade = function () {
        var _this = this;
        this.indLoading = true;
        this._EmpInfoTabularService.GetEmployeeGrade(global_1.Global.BASE_EmpInfoTabular_ENDPOINT)
            .subscribe(function (data) {
            _this.EmployeeGrades = data;
            _this.indLoading = false;
        });
    };
    EmpInfoTabularComponent.prototype.LoadGetUserRole = function () {
        var _this = this;
        this.indLoading = true;
        this._EmpInfoTabularService.GetUserRole(global_1.Global.BASE_EmpInfoTabular_ENDPOINT)
            .subscribe(function (data) {
            _this.UserRoles = data;
            _this.indLoading = false;
        });
    };
    EmpInfoTabularComponent.prototype.LoadGetLinemanager = function (Usertype, UserId) {
        var _this = this;
        this.indLoading = true;
        this._EmpInfoTabularService.GetLinemanager(global_1.Global.BASE_EmpInfoTabular_ENDPOINT, Usertype, UserId)
            .subscribe(function (data) {
            _this.Linemanagers = data;
            _this.indLoading = false;
        });
    };
    EmpInfoTabularComponent.prototype.LoadGetEducationType = function () {
        var _this = this;
        this.indLoading = true;
        this._EmpInfoTabularService.GetEducationType(global_1.Global.BASE_EmpInfoTabular_ENDPOINT)
            .subscribe(function (data) {
            _this.EducationTypes = data;
            _this.indLoading = false;
        });
    };
    EmpInfoTabularComponent.prototype.GetNonWorking = function () {
        var _this = this;
        this.indLoading = true;
        this._EmpInfoTabularService.GetNonWorking(global_1.Global.BASE_EmpInfoTabular_ENDPOINT)
            .subscribe(function (data) {
            _this.Nwds = data;
            _this.indLoading = false;
        });
    };
    EmpInfoTabularComponent.prototype.GetSalaryRangeDropDown = function (Salary) {
        var _this = this;
        $("#SalaryBreakup").show();
        this.indLoading = true;
        this._EmpInfoTabularService.GetSalaryRangeDropDown(global_1.Global.BASE_EmpInfoTabular_ENDPOINT, Salary)
            .subscribe(function (data) {
            _this.Salarys = data;
            _this.indLoading = false;
        });
    };
    EmpInfoTabularComponent.prototype.GetSalaryRangechangedropdown = function (Salary) {
        var _this = this;
        $("#SalaryBreakupchange").show();
        this.indLoading = true;
        this._EmpInfoTabularService.GetSalaryRangeDropDown(global_1.Global.BASE_EmpInfoTabular_ENDPOINT, Salary)
            .subscribe(function (data) {
            _this.Salarys = data;
            _this.indLoading = false;
        });
    };
    EmpInfoTabularComponent.prototype.GetIncrementType = function () {
        var _this = this;
        this.indLoading = true;
        this._EmpInfoTabularService.GetIncrementType(global_1.Global.BASE_EmpInfoTabular_ENDPOINT)
            .subscribe(function (data) {
            _this.Increments = data;
            _this.indLoading = false;
        });
    };
    EmpInfoTabularComponent.prototype.GetIncrementList = function () {
        var _this = this;
        this.indLoading = true;
        this._EmpInfoTabularService.GetIncrementList(global_1.Global.BASE_EmpInfoTabular_ENDPOINT)
            .subscribe(function (data) {
            _this.IncrementLists = data;
            _this.indLoading = false;
        });
    };
    EmpInfoTabularComponent.prototype.FillEmployee = function () {
        var _this = this;
        this.indLoading = true;
        this._EmpInfoTabularService.FillEmployee(global_1.Global.BASE_EmpInfoTabular_ENDPOINT)
            .subscribe(function (data) {
            _this.Employees = data;
            _this.indLoading = false;
        });
    };
    //Project Get
    EmpInfoTabularComponent.prototype.FillProjectDeatil = function (ProjectInfoFrm) {
        var _this = this;
        $("#lblNonwbsprojects").show();
        $("#GVNonwbsprojects").show();
        $("#lblwbsprojects").show();
        $("#gvwbsprojects").show();
        ProjectInfoFrm.UserId = parseInt(this.EditEmployeeid);
        ProjectInfoFrm.EditEmployeeid = this.EditEmployeeid;
        ProjectInfoFrm.Editmode = this.Editmode;
        this.indLoading = true;
        this._EmpInfoTabularService.FillProjectDetail(global_1.Global.BASE_EmpInfoTabular_ENDPOINT, ProjectInfoFrm.FromDate, ProjectInfoFrm.ToDate, ProjectInfoFrm.UserId)
            .subscribe(function (data) {
            _this.ProjectWBSs = data;
            _this.indLoading = false;
        });
        this._EmpInfoTabularService.FillProjectDetailWbs(global_1.Global.BASE_EmpInfoTabular_ENDPOINT, ProjectInfoFrm.FromDate, ProjectInfoFrm.ToDate, ProjectInfoFrm.UserId)
            .subscribe(function (data) {
            _this.Projects = data;
            _this.indLoading = false;
        });
    };
    EmpInfoTabularComponent.prototype.JoingAggrimentDownload = function () {
        alert("joingAggrent");
    };
    EmpInfoTabularComponent.prototype.GetSalaryBrakup = function (event) {
        var _this = this;
        this.indLoading = true;
        this._EmpInfoTabularService.GetSalaryBrakup(global_1.Global.BASE_EmpInfoTabular_ENDPOINT, event.target.value)
            .subscribe(function (data) {
            _this.SalaryBreakups = data;
            _this.indLoading = false;
        });
    };
    EmpInfoTabularComponent.prototype.GetOfferdeatils = function (UserId) {
        var _this = this;
        this.indLoading = true;
        this._EmpInfoTabularService.GetOfferdeatils(global_1.Global.BASE_EmpInfoTabular_ENDPOINT, parseInt(this.EditEmployeeid))
            .subscribe(function (data) {
            _this.Joingoffers = data;
            console.log(_this.Joingoffers);
            _this.indLoading = false;
        });
    };
    EmpInfoTabularComponent.prototype.GetAdustmentleave = function (UserId) {
        var _this = this;
        this.indLoading = true;
        this._EmpInfoTabularService.GetAdustmentleave(global_1.Global.BASE_EmpInfoTabular_ENDPOINT, parseInt(this.EditEmployeeid))
            .subscribe(function (data) {
            _this.AdjustmentLeaveDeatils = data;
            _this.indLoading = false;
        });
    };
    EmpInfoTabularComponent.prototype.GetEmployeeDeatils = function (UserId) {
        var _this = this;
        debugger;
        this.indLoading = true;
        this._EmpInfoTabularService.GetEmployeeDeatils(global_1.Global.BASE_EmpInfoTabular_ENDPOINT, this.EditEmployeeid)
            .subscribe(function (data) {
            _this.EmployeeDetails = data;
            _this.indLoading = false;
        });
    };
    EmpInfoTabularComponent.prototype.FillLeaveDeatil = function () {
        var _this = this;
        debugger;
        this.indLoading = true;
        this._EmpInfoTabularService.FillLeaveDeatil(global_1.Global.BASE_EmpInfoTabular_ENDPOINT)
            .subscribe(function (data) {
            _this.LeaveDeatil = data;
            _this.leavestartdate = _this.LeaveDeatil[0].leavestartdate;
            _this.leaveenddate = _this.LeaveDeatil[0].leaveenddate;
            console.log(_this.leaveenddate);
            console.log(_this.leavestartdate);
            _this.indLoading = false;
        });
    };
    EmpInfoTabularComponent.prototype.GetPendingList = function (UserId) {
        var _this = this;
        this.indLoading = true;
        this._EmpInfoTabularService.GetPendingList(global_1.Global.BASE_EmpInfoTabular_ENDPOINT, UserId)
            .subscribe(function (data) {
            _this.PendingTasks = data;
            _this.indLoading = false;
        });
    };
    EmpInfoTabularComponent.prototype.GetFeedbackList = function (UserId) {
        var _this = this;
        debugger;
        this.indLoading = true;
        this._EmpInfoTabularService.GetFeedbackList(global_1.Global.BASE_EmpInfoTabular_ENDPOINT, UserId)
            .subscribe(function (data) {
            _this.Feedbacks = data;
            console.log(_this.Feedbacks);
            _this.indLoading = false;
        });
    };
    EmpInfoTabularComponent.prototype.GetInTimeOutTimeSelected = function () {
        var _this = this;
        this.indLoading = true;
        this._EmpInfoTabularService.GetInTimeOutTimeSelected(global_1.Global.BASE_EmpInfoTabular_ENDPOINT)
            .subscribe(function (data) {
            _this.INTimeOutTimes = data;
            _this.indLoading = false;
        });
    };
    EmpInfoTabularComponent.prototype.GetLeaveType = function () {
        var _this = this;
        this.indLoading = true;
        this._EmpInfoTabularService.GetLeaveType(global_1.Global.BASE_EmpInfoTabular_ENDPOINT)
            .subscribe(function (data) {
            _this.LeaveTypes = data;
            _this.indLoading = false;
        });
    };
    EmpInfoTabularComponent.prototype.SaveUserType = function () {
        debugger;
        var slvals = [];
        $('input:checkbox[name=UserRole]:checked').each(function () {
            var usertype = slvals.push($(this).val());
            this.usetype = usertype;
        });
    };
    EmpInfoTabularComponent.prototype.SaveEmployee = function (EmpInfoTabular) {
        var _this = this;
        this.SaveUserType();
        EmpInfoTabular.Employeecode = this.EmployeeCodes;
        EmpInfoTabular.Email = this.Email;
        EmpInfoTabular.UserType = this.usetype;
        if ($("#JoingDiv").prop("checked")) {
            EmpInfoTabular.JoiningDate;
        }
        else {
            EmpInfoTabular.JoiningDate = null;
        }
        if (EmpInfoTabular.RelevingDate != null) {
            EmpInfoTabular.RelevingDate = EmpInfoTabular.RelevingDate;
        }
        else {
            EmpInfoTabular.RelevingDate = null;
        }
        if ($("#Male").prop("checked")) {
            EmpInfoTabular.Gender = true;
        }
        else {
            EmpInfoTabular.Gender = false;
        }
        if ($("#isActive").prop("checked")) {
            EmpInfoTabular.Active = true;
        }
        else {
            EmpInfoTabular.Active = false;
        }
        if ($("#ScreenCapture").prop("checked")) {
            EmpInfoTabular.AllowScreenCapture = true;
        }
        else {
            EmpInfoTabular.AllowScreenCapture = false;
        }
        if ($("#IsWorksheetFill").prop("checked")) {
            EmpInfoTabular.IsWorksheetFill = true;
        }
        else {
            EmpInfoTabular.IsWorksheetFill = false;
        }
        if ($("#isScreenCaptureRemarks").prop("checked")) {
            EmpInfoTabular.IsScreenCaptureRemarks = true;
        }
        else {
            EmpInfoTabular.IsScreenCaptureRemarks = false;
        }
        if ($("#MouseMovement").prop("checked")) {
            EmpInfoTabular.AllowScreenCapture = true;
        }
        else {
            EmpInfoTabular.AllowScreenCapture = false;
        }
        if ($("#IsProductivityTracker").prop("checked")) {
            EmpInfoTabular.IsProductivityTracker = true;
        }
        else {
            EmpInfoTabular.IsProductivityTracker = false;
        }
        if ($("#IsSLASigned").prop("checked")) {
            EmpInfoTabular.IsSLASigned = true;
            EmpInfoTabular.SLAYear = this.SlASigned;
        }
        else {
            EmpInfoTabular.IsSLASigned = false;
            EmpInfoTabular.SLAYear = this.SlASigned;
        }
        if ($("#IsHost").prop("checked")) {
            EmpInfoTabular.IsHost = true;
        }
        else {
            EmpInfoTabular.IsHost = false;
        }
        if ($("#IsHostForEmpMaster").prop("checked")) {
            EmpInfoTabular.IsHost = true;
        }
        else {
            EmpInfoTabular.IsHost = false;
        }
        if ($("#WorksheetThruWeb").prop("checked")) {
            EmpInfoTabular.WorksheetThruWeb = true;
        }
        else {
            EmpInfoTabular.WorksheetThruWeb = false;
        }
        if ($("#WorksheetThruWeb").prop("checked")) {
            EmpInfoTabular.WorksheetThruWeb = true;
        }
        else {
            EmpInfoTabular.WorksheetThruWeb = false;
        }
        if ($("#IsSwitchUser").prop("checked")) {
            EmpInfoTabular.IsSwitchUser = true;
        }
        else {
            EmpInfoTabular.IsSwitchUser = false;
        }
        if ($("#ValidForLogin").prop("checked")) {
            EmpInfoTabular.ValidForLogin = true;
        }
        else {
            EmpInfoTabular.ValidForLogin = false;
        }
        if ($("#IsMouseTracking").prop("checked")) {
            EmpInfoTabular.IsMouseTracking = true;
        }
        else {
            EmpInfoTabular.IsMouseTracking = false;
        }
        if ($("#WorkFromHome").prop("checked")) {
            EmpInfoTabular.WorkFromHome = true;
        }
        else {
            EmpInfoTabular.WorkFromHome = false;
        }
        this._EmpInfoTabularService.SaveMain(global_1.Global.BASE_EmpInfoTabular_ENDPOINT, EmpInfoTabular).subscribe(function (data) {
            if (data.startsWith("Success: ")) {
                _this.msg = data;
            }
            else {
                alert(data);
            }
        });
    };
    EmpInfoTabularComponent.prototype.SavePersonalData = function (PersonalInformation) {
        var _this = this;
        debugger;
        PersonalInformation.Age = this.Age;
        PersonalInformation.Caddress = $("#txtCommunicationaddress").val();
        PersonalInformation.EditEmployeeid = this.EditEmployeeid;
        PersonalInformation.Editmode = this.Editmode;
        if ($("#Engaged").prop("checked")) {
            PersonalInformation.Status = "Engaged";
        }
        else if ($("#Married").prop("checked")) {
            PersonalInformation.Status = "Married";
        }
        else if ($("#Divorced").prop("checked")) {
            PersonalInformation.Status = "Divorced";
        }
        else if ($("#Widow").prop("checked")) {
            PersonalInformation.Status = "Widow";
        }
        else {
            PersonalInformation.Status = "Unmarried";
        }
        //  PersonalInformation.AnniversaryDate = $("#AniversayDate").val();
        this._EmpInfoTabularService.SavePersonal(global_1.Global.BASE_EmpInfoTabular_ENDPOINT, PersonalInformation).subscribe(function (data) {
            if (data.startsWith("Success: ")) {
                _this.msg = data;
            }
            else {
                alert(data);
            }
        });
        this.FillPassingYear(PersonalInformation.EditEmployeeid, PersonalInformation.Editmode);
    };
    EmpInfoTabularComponent.prototype.SaveEducation = function (EducationInformation) {
        var _this = this;
        this.lblError = "";
        var School1 = $("#School1").val();
        var School2 = $("#School2").val();
        var School3 = $("#School3").val();
        var School4 = $("#School4").val();
        var School5 = $("#School5").val();
        var School6 = $("#School6").val();
        var School7 = $("#School7").val();
        var School8 = $("#School8").val();
        var Eduid = $("#Education").val();
        debugger;
        if (Eduid == "Select" || Eduid == "" || Eduid == null) {
            this.lblError = "Plese select Any Education type";
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
                    this.lblError += "Please Enter Medium ";
                }
                if ($("#Passingyear1").val() != null || $("#Passingyear1").val() != "") {
                    EducationInformation.Passingyear = $("#Passingyear1").val();
                }
                else {
                    this.lblError = "";
                    this.lblError += "Please Enter Passingyear ";
                }
                if ($("#Board1").val() != null || $("#Board1").val() != "") {
                    EducationInformation.Boarduniversity = $("#Board1").val();
                }
                else {
                    this.lblError = "";
                    this.lblError += "Please Enter Board/University Name  ";
                }
                if ($("#Percentage1").val() != null || $("#Percentage1").val() != "") {
                    EducationInformation.Percentage = $("#Percentage1").val();
                }
                else {
                    this.lblError = "";
                    this.lblError += "Please Enter Percentage";
                }
                this._EmpInfoTabularService.SaveEducation(global_1.Global.BASE_EmpInfoTabular_ENDPOINT, EducationInformation).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = data;
                    }
                    else {
                        alert(data);
                    }
                });
            }
            else {
                this.lblError = "";
                this.lblError += "Please Enter School/Institute Name";
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
                this._EmpInfoTabularService.SaveEducation(global_1.Global.BASE_EmpInfoTabular_ENDPOINT, EducationInformation).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = data;
                    }
                    else {
                        alert(data);
                    }
                });
            }
            else {
                this.lblError = "";
                this.lblError = "Please Enter School/Institute Name";
            }
            if (School3 != null && School3 != "") {
                if ($("#rbnHighesteducation3").prop("checked")) {
                    EducationInformation.HighestEducation = true;
                }
                else {
                    EducationInformation.HighestEducation = false;
                }
                EducationInformation.ClassDegree = $("#Class3").val();
                ;
                EducationInformation.Schoolinstitute = School2;
                EducationInformation.Medium = $("#Medium3").val();
                EducationInformation.Passingyear = $("#Passingyear3").val();
                EducationInformation.Boarduniversity = $("#Board3").val();
                EducationInformation.Percentage = $("#Percentage3").val();
                this._EmpInfoTabularService.SaveEducation(global_1.Global.BASE_EmpInfoTabular_ENDPOINT, EducationInformation).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = data;
                    }
                    else {
                        alert(data);
                    }
                });
            }
            else {
                this.lblError = "";
                this.lblError = "Please Enter School/Institute Name";
            }
            if (School4 != null && School4 != "") {
                if ($("#rbnHighesteducation4").prop("checked")) {
                    EducationInformation.HighestEducation = true;
                }
                else {
                    EducationInformation.HighestEducation = false;
                }
                EducationInformation.ClassDegree = $("#Class4").val();
                ;
                EducationInformation.Schoolinstitute = School2;
                EducationInformation.Medium = $("#Medium4").val();
                EducationInformation.Passingyear = $("#Passingyear4").val();
                EducationInformation.Boarduniversity = $("#Board4").val();
                EducationInformation.Percentage = $("#Percentage4").val();
                this._EmpInfoTabularService.SaveEducation(global_1.Global.BASE_EmpInfoTabular_ENDPOINT, EducationInformation).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = data;
                    }
                    else {
                        alert(data);
                    }
                });
            }
            else {
                this.lblError = "";
                this.lblError = "Please Enter School/Institute Name";
            }
            if (School5 != null && School5 != "") {
                if ($("#rbnHighesteducation5").prop("checked")) {
                    EducationInformation.HighestEducation = true;
                }
                else {
                    EducationInformation.HighestEducation = false;
                }
                EducationInformation.ClassDegree = $("#Class5").val();
                ;
                EducationInformation.Schoolinstitute = School2;
                EducationInformation.Medium = $("#Medium5").val();
                EducationInformation.Passingyear = $("#Passingyear5").val();
                EducationInformation.Boarduniversity = $("#Board5").val();
                EducationInformation.Percentage = $("#Percentage5").val();
                this._EmpInfoTabularService.SaveEducation(global_1.Global.BASE_EmpInfoTabular_ENDPOINT, EducationInformation).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = data;
                    }
                    else {
                        alert(data);
                    }
                });
            }
            else {
                this.lblError = "";
                this.lblError = "Please Enter School/Institute Name";
            }
            if (School6 != null && School6 != "") {
                if ($("#rbnHighesteducation6").prop("checked")) {
                    EducationInformation.HighestEducation = true;
                }
                else {
                    EducationInformation.HighestEducation = false;
                }
                EducationInformation.ClassDegree = $("#Class6").val();
                ;
                EducationInformation.Schoolinstitute = School2;
                EducationInformation.Medium = $("#Medium6").val();
                EducationInformation.Passingyear = $("#Passingyear6").val();
                EducationInformation.Boarduniversity = $("#Board6").val();
                EducationInformation.Percentage = $("#Percentage6").val();
                this._EmpInfoTabularService.SaveEducation(global_1.Global.BASE_EmpInfoTabular_ENDPOINT, EducationInformation).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = data;
                    }
                    else {
                        alert(data);
                    }
                });
            }
            else {
                this.lblError = "";
                this.lblError = "Please Enter School/Institute Name";
            }
            if (School7 != null && School7 != "") {
                if ($("#rbnHighesteducation7").prop("checked")) {
                    EducationInformation.HighestEducation = true;
                }
                else {
                    EducationInformation.HighestEducation = false;
                }
                EducationInformation.ClassDegree = $("#Class7").val();
                ;
                EducationInformation.Schoolinstitute = School2;
                EducationInformation.Medium = $("#Medium7").val();
                EducationInformation.Passingyear = $("#Passingyear7").val();
                EducationInformation.Boarduniversity = $("#Board7").val();
                EducationInformation.Percentage = $("#Percentage7").val();
                this._EmpInfoTabularService.SaveEducation(global_1.Global.BASE_EmpInfoTabular_ENDPOINT, EducationInformation).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = data;
                    }
                    else {
                        alert(data);
                    }
                });
            }
            else {
                this.lblError = "";
                this.lblError = "Please Enter School/Institute Name";
            }
            if (School8 != null && School8 != "") {
                if ($("#rbnHighesteducation8").prop("checked")) {
                    EducationInformation.HighestEducation = true;
                }
                else {
                    EducationInformation.HighestEducation = false;
                }
                EducationInformation.ClassDegree = $("#Class8").val();
                ;
                EducationInformation.Schoolinstitute = School2;
                EducationInformation.Medium = $("#Medium8").val();
                EducationInformation.Passingyear = $("#Passingyear8").val();
                EducationInformation.Boarduniversity = $("#Board8").val();
                EducationInformation.Percentage = $("#Percentage8").val();
                this._EmpInfoTabularService.SaveEducation(global_1.Global.BASE_EmpInfoTabular_ENDPOINT, EducationInformation).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = data;
                    }
                    else {
                        alert(data);
                    }
                });
            }
            else {
                this.lblError = "";
                this.lblError = "Please Enter School/Institute Name";
            }
        }
    };
    EmpInfoTabularComponent.prototype.SaveNextEducation = function () {
        alert('NexttabEducation');
    };
    EmpInfoTabularComponent.prototype.SaveSalary = function (SalaryInformation) {
        var _this = this;
        SalaryInformation.EditEmployeeid = this.EditEmployeeid;
        SalaryInformation.Editmode = this.Editmode;
        if (SalaryInformation.Accountno != null && SalaryInformation.Accountno != "") {
            this.indLoading = true;
            this._EmpInfoTabularService.GetAccountNo(global_1.Global.BASE_EmpInfoTabular_ENDPOINT, SalaryInformation.Accountno, this.EditEmployeeid)
                .subscribe(function (data) {
                _this.SalaryAccount = data;
                _this.Type = _this.SalaryAccount[0].Type;
                alert(_this.SalaryAccount);
                alert(_this.Type);
                if (_this.Type == "false") {
                    debugger;
                    var msg1 = "You have already linked Account Number to inactive User :- " + _this.SalaryAccount[0].Employee_Name + "";
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
                        _this._EmpInfoTabularService.SaveSalary(global_1.Global.BASE_EmpInfoTabular_ENDPOINT, SalaryInformation).subscribe(function (data) {
                            if (data.startsWith("Success: ")) {
                                _this.msg = data;
                            }
                            else {
                                alert(data);
                            }
                        });
                    }
                    else {
                    }
                }
                else if (_this.Type == "NotAccount") {
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
                    _this._EmpInfoTabularService.SaveSalary(global_1.Global.BASE_EmpInfoTabular_ENDPOINT, SalaryInformation).subscribe(function (data) {
                        if (data.startsWith("Success: ")) {
                            _this.msg = data;
                        }
                        else {
                            alert(data);
                        }
                    });
                }
                else {
                    alert("Account Number is already linked.");
                }
            });
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
    };
    EmpInfoTabularComponent.prototype.SaveAttendance = function (AttendanceInformation) {
        var _this = this;
        AttendanceInformation.EditEmployeeid = this.EditEmployeeid;
        AttendanceInformation.Editmode = this.Editmode;
        AttendanceInformation.UserId = parseInt(this.EditEmployeeid);
        if (AttendanceInformation.AccessCardId == 0) {
            var selectedValues = $("#nwdday").val();
            var commaSeparated = selectedValues.join(',');
            alert(commaSeparated);
            AttendanceInformation.Nwdday = commaSeparated;
            AttendanceInformation.Intime = $("#IntimeHH").val() + ':' + $("#IntimeMM").val();
            AttendanceInformation.Outitme = $("#OutitmeHH").val() + ':' + $("#OutitmeMM").val();
            AttendanceInformation.Intimesat = $("#IntimesatHH").val() + ':' + $("#IntimesatMM").val();
            AttendanceInformation.Outtimesat = $("#OuttimesatHH").val() + ':' + $("#OuttimesatMM").val();
            this._EmpInfoTabularService.SaveAttendance(global_1.Global.BASE_EmpInfoTabular_ENDPOINT, AttendanceInformation).subscribe(function (data) {
                if (data.startsWith("Success: ")) {
                    _this.msg = data;
                }
                else {
                    alert(data);
                }
            });
        }
        else {
            this.indLoading = true;
            this._EmpInfoTabularService.GetAttendanceDetail(global_1.Global.BASE_EmpInfoTabular_ENDPOINT, AttendanceInformation.AccessCardId, AttendanceInformation.UserId)
                .subscribe(function (data) {
                _this.GetAttendance = data;
                _this.indLoading = false;
                _this.Output = _this.GetAttendance[0].Output;
                alert(_this.Output);
                if (_this.Output == "true") {
                    alert("This access card id as already used.");
                }
                else if (_this.Output == "Null") {
                    alert("Something went wrong while adding details. <br> Please try again.");
                }
                else {
                    var selectedValues = $("#nwdday").val();
                    var commaSeparated = selectedValues.join(',');
                    alert(commaSeparated);
                    AttendanceInformation.Nwdday = commaSeparated;
                    AttendanceInformation.Intime = $("#IntimeHH").val() + ':' + $("#IntimeMM").val();
                    AttendanceInformation.Outitme = $("#OutitmeHH").val() + ':' + $("#OutitmeMM").val();
                    AttendanceInformation.Intimesat = $("#IntimesatHH").val() + ':' + $("#IntimesatMM").val();
                    AttendanceInformation.Outtimesat = $("#OuttimesatHH").val() + ':' + $("#OuttimesatMM").val();
                    _this._EmpInfoTabularService.SaveAttendance(global_1.Global.BASE_EmpInfoTabular_ENDPOINT, AttendanceInformation).subscribe(function (data) {
                        if (data.startsWith("Success: ")) {
                            _this.msg = data;
                        }
                        else {
                            alert(data);
                        }
                    });
                }
            });
        }
    };
    EmpInfoTabularComponent.prototype.SaveJoining = function (JoiningInformation) {
        var _this = this;
        JoiningInformation.EditEmployeeid = this.EditEmployeeid;
        JoiningInformation.Editmode = this.Editmode;
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
                JoiningInformation.RelievingLetterFileName = null;
            }
            if (this.Experience != null) {
                JoiningInformation.ExperienceLetterFileName = this.Experience.item(0).name;
            }
            else {
                JoiningInformation.ExperienceLetterFileName = null;
            }
            if (this.LastSalarySlip != null) {
                JoiningInformation.LastSalarySlipFileName = this.LastSalarySlip.item(0).name;
            }
            else {
                JoiningInformation.LastSalarySlipFileName = null;
            }
            if (this.DegreeCertificate != null) {
                JoiningInformation.DegreeCertificateFileName = this.DegreeCertificate.item(0).name;
            }
            else {
                JoiningInformation.DegreeCertificateFileName = null;
            }
            if (this.LastMarksheet != null) {
                JoiningInformation.LastMarksheetFileName = this.LastMarksheet.item(0).name;
            }
            else {
                JoiningInformation.LastMarksheetFileName = null;
            }
            if (this.Passport != null) {
                JoiningInformation.PassportFileName = this.Passport.item(0).name;
            }
            else {
                JoiningInformation.PassportFileName = null;
            }
            if (this.DrivingLicense != null) {
                JoiningInformation.DrivingLicenseFileName = this.DrivingLicense.item(0).name;
            }
            else {
                JoiningInformation.DrivingLicenseFileName = null;
            }
            if (this.PANCard != null) {
                JoiningInformation.PANCardFileName = this.PANCard.item(0).name;
            }
            else {
                JoiningInformation.PANCardFileName = null;
            }
            if (this.CurriculamVitae != null) {
                JoiningInformation.CurriculamVitaeFilName = this.CurriculamVitae.item(0).name;
            }
            else {
                JoiningInformation.CurriculamVitaeFilName = null;
            }
            if (this.Other != null) {
                JoiningInformation.OtherFileName = this.Other.item(0).name;
            }
            else {
                JoiningInformation.OtherFileName = null;
            }
            if (this.Other0 != null) {
                JoiningInformation.OtherFileName0 = this.Other0.item(0).name;
            }
            else {
                JoiningInformation.OtherFileName0 = null;
            }
            if (this.Other1 != null) {
                JoiningInformation.OtherFileName1 = this.Other1.item(0).name;
            }
            else {
                JoiningInformation.OtherFileName1 = null;
            }
            this._EmpInfoTabularService.SaveJoining(global_1.Global.BASE_EmpInfoTabular_ENDPOINT, JoiningInformation).subscribe(function (data) {
                if (data.startsWith("Success: ")) {
                    if (_this.Relieving != null) {
                        if (_this.Relieving.length > 0) {
                            _this.Relieving.item(0).name;
                            var file = _this.Relieving[0];
                            var formData = new FormData();
                            formData.append('uploadFile', file, file.name);
                            var headers = new http_1.Headers();
                            var options = new http_1.RequestOptions({ headers: headers });
                            var apiUrl1 = "/api/EmpInfoTabularAPI/UploadJsonFile";
                            _this.http.post(apiUrl1, formData, options)
                                .map(function (res) { return res.json(); })
                                .catch(function (error) { return Rx_1.Observable.throw(error); })
                                .subscribe(function (data) { return console.log('success'); }, function (error) { return console.log(error); });
                        }
                    }
                    else {
                        JoiningInformation.RelievingLetterFileName = null;
                    }
                    if (_this.Experience != null) {
                        if (_this.Experience.length > 0) {
                            _this.Experience.item(0).name;
                            var file = _this.Experience[0];
                            var formData = new FormData();
                            formData.append('uploadFile', file, file.name);
                            var headers = new http_1.Headers();
                            var options = new http_1.RequestOptions({ headers: headers });
                            var apiUrl1 = "/api/EmpInfoTabularAPI/UploadJsonFile";
                            _this.http.post(apiUrl1, formData, options)
                                .map(function (res) { return res.json(); })
                                .catch(function (error) { return Rx_1.Observable.throw(error); })
                                .subscribe(function (data) { return console.log('success'); }, function (error) { return console.log(error); });
                        }
                    }
                    else {
                        JoiningInformation.ExperienceLetterFileName = null;
                    }
                    if (_this.LastSalarySlip != null) {
                        if (_this.LastSalarySlip.length > 0) {
                            _this.LastSalarySlip.item(0).name;
                            var file = _this.LastSalarySlip[0];
                            var formData = new FormData();
                            formData.append('uploadFile', file, file.name);
                            var headers = new http_1.Headers();
                            var options = new http_1.RequestOptions({ headers: headers });
                            var apiUrl1 = "/api/EmpInfoTabularAPI/UploadJsonFile";
                            _this.http.post(apiUrl1, formData, options)
                                .map(function (res) { return res.json(); })
                                .catch(function (error) { return Rx_1.Observable.throw(error); })
                                .subscribe(function (data) { return console.log('success'); }, function (error) { return console.log(error); });
                        }
                    }
                    else {
                        JoiningInformation.LastSalarySlipFileName = null;
                    }
                    if (_this.DegreeCertificate != null) {
                        if (_this.DegreeCertificate.length > 0) {
                            _this.DegreeCertificate.item(0).name;
                            var file = _this.DegreeCertificate[0];
                            var formData = new FormData();
                            formData.append('uploadFile', file, file.name);
                            var headers = new http_1.Headers();
                            var options = new http_1.RequestOptions({ headers: headers });
                            var apiUrl1 = "/api/EmpInfoTabularAPI/UploadJsonFile";
                            _this.http.post(apiUrl1, formData, options)
                                .map(function (res) { return res.json(); })
                                .catch(function (error) { return Rx_1.Observable.throw(error); })
                                .subscribe(function (data) { return console.log('success'); }, function (error) { return console.log(error); });
                        }
                    }
                    else {
                        JoiningInformation.DegreeCertificateFileName = null;
                    }
                    if (_this.LastMarksheet != null) {
                        if (_this.LastMarksheet.length > 0) {
                            _this.LastMarksheet.item(0).name;
                            var file = _this.LastMarksheet[0];
                            var formData = new FormData();
                            formData.append('uploadFile', file, file.name);
                            var headers = new http_1.Headers();
                            var options = new http_1.RequestOptions({ headers: headers });
                            var apiUrl1 = "/api/EmpInfoTabularAPI/UploadJsonFile";
                            _this.http.post(apiUrl1, formData, options)
                                .map(function (res) { return res.json(); })
                                .catch(function (error) { return Rx_1.Observable.throw(error); })
                                .subscribe(function (data) { return console.log('success'); }, function (error) { return console.log(error); });
                        }
                    }
                    else {
                        JoiningInformation.LastMarksheetFileName = null;
                    }
                    if (_this.Passport != null) {
                        if (_this.Passport.length > 0) {
                            _this.Passport.item(0).name;
                            var file = _this.Passport[0];
                            var formData = new FormData();
                            formData.append('uploadFile', file, file.name);
                            var headers = new http_1.Headers();
                            var options = new http_1.RequestOptions({ headers: headers });
                            var apiUrl1 = "/api/EmpInfoTabularAPI/UploadJsonFile";
                            _this.http.post(apiUrl1, formData, options)
                                .map(function (res) { return res.json(); })
                                .catch(function (error) { return Rx_1.Observable.throw(error); })
                                .subscribe(function (data) { return console.log('success'); }, function (error) { return console.log(error); });
                        }
                    }
                    else {
                        JoiningInformation.PassportFileName = null;
                    }
                    if (_this.DrivingLicense != null) {
                        if (_this.DrivingLicense.length > 0) {
                            _this.DrivingLicense.item(0).name;
                            var file = _this.DrivingLicense[0];
                            var formData = new FormData();
                            formData.append('uploadFile', file, file.name);
                            var headers = new http_1.Headers();
                            var options = new http_1.RequestOptions({ headers: headers });
                            var apiUrl1 = "/api/EmpInfoTabularAPI/UploadJsonFile";
                            _this.http.post(apiUrl1, formData, options)
                                .map(function (res) { return res.json(); })
                                .catch(function (error) { return Rx_1.Observable.throw(error); })
                                .subscribe(function (data) { return console.log('success'); }, function (error) { return console.log(error); });
                        }
                    }
                    else {
                        JoiningInformation.DrivingLicenseFileName = null;
                    }
                    if (_this.PANCard != null) {
                        if (_this.PANCard.length > 0) {
                            _this.PANCard.item(0).name;
                            var file = _this.PANCard[0];
                            var formData = new FormData();
                            formData.append('uploadFile', file, file.name);
                            var headers = new http_1.Headers();
                            var options = new http_1.RequestOptions({ headers: headers });
                            var apiUrl1 = "/api/EmpInfoTabularAPI/UploadJsonFile";
                            _this.http.post(apiUrl1, formData, options)
                                .map(function (res) { return res.json(); })
                                .catch(function (error) { return Rx_1.Observable.throw(error); })
                                .subscribe(function (data) { return console.log('success'); }, function (error) { return console.log(error); });
                        }
                    }
                    else {
                        JoiningInformation.PANCardFileName = null;
                    }
                    if (_this.CurriculamVitae != null) {
                        if (_this.CurriculamVitae.length > 0) {
                            _this.CurriculamVitae.item(0).name;
                            var file = _this.CurriculamVitae[0];
                            var formData = new FormData();
                            formData.append('uploadFile', file, file.name);
                            var headers = new http_1.Headers();
                            var options = new http_1.RequestOptions({ headers: headers });
                            var apiUrl1 = "/api/EmpInfoTabularAPI/UploadJsonFile";
                            _this.http.post(apiUrl1, formData, options)
                                .map(function (res) { return res.json(); })
                                .catch(function (error) { return Rx_1.Observable.throw(error); })
                                .subscribe(function (data) { return console.log('success'); }, function (error) { return console.log(error); });
                        }
                    }
                    else {
                        JoiningInformation.CurriculamVitaeFilName = null;
                    }
                    if (_this.Other != null) {
                        if (_this.Other.length > 0) {
                            _this.Other.item(0).name;
                            var file = _this.Other[0];
                            var formData = new FormData();
                            formData.append('uploadFile', file, file.name);
                            var headers = new http_1.Headers();
                            var options = new http_1.RequestOptions({ headers: headers });
                            var apiUrl1 = "/api/EmpInfoTabularAPI/UploadJsonFile";
                            _this.http.post(apiUrl1, formData, options)
                                .map(function (res) { return res.json(); })
                                .catch(function (error) { return Rx_1.Observable.throw(error); })
                                .subscribe(function (data) { return console.log('success'); }, function (error) { return console.log(error); });
                        }
                    }
                    else {
                        JoiningInformation.OtherFileName = null;
                    }
                    if (_this.Other0 != null) {
                        if (_this.Other0.length > 0) {
                            _this.Other0.item(0).name;
                            var file = _this.Other0[0];
                            var formData = new FormData();
                            formData.append('uploadFile', file, file.name);
                            var headers = new http_1.Headers();
                            var options = new http_1.RequestOptions({ headers: headers });
                            var apiUrl1 = "/api/EmpInfoTabularAPI/UploadJsonFile";
                            _this.http.post(apiUrl1, formData, options)
                                .map(function (res) { return res.json(); })
                                .catch(function (error) { return Rx_1.Observable.throw(error); })
                                .subscribe(function (data) { return console.log('success'); }, function (error) { return console.log(error); });
                        }
                    }
                    else {
                        JoiningInformation.OtherFileName0 = null;
                    }
                    if (_this.Other1 != null) {
                        if (_this.Other1.length > 0) {
                            _this.Other1.item(0).name;
                            var file = _this.Other1[0];
                            var formData = new FormData();
                            formData.append('uploadFile', file, file.name);
                            var headers = new http_1.Headers();
                            var options = new http_1.RequestOptions({ headers: headers });
                            var apiUrl1 = "/api/EmpInfoTabularAPI/UploadJsonFile";
                            _this.http.post(apiUrl1, formData, options)
                                .map(function (res) { return res.json(); })
                                .catch(function (error) { return Rx_1.Observable.throw(error); })
                                .subscribe(function (data) { return console.log('success'); }, function (error) { return console.log(error); });
                        }
                    }
                    else {
                        JoiningInformation.Other1 = null;
                    }
                    _this.msg = data;
                }
                else {
                    alert(data);
                }
            });
        }
    };
    EmpInfoTabularComponent.prototype.SaveIncrement = function (Incrementformation) {
        var _this = this;
        Incrementformation.EditEmployeeid = this.EditEmployeeid;
        Incrementformation.Editmode =
            this.Validation = "";
        var joinigtype = $("#DesignationChange").val();
        var incrmenttype = $("#incrmenttype").val();
        var salarychange = $("#salarychange").val();
        var salarychangebreakup = $("#salarychangebreakup").val();
        Incrementformation.SalaryRangeId = salarychangebreakup;
        var currentTime = new Date();
        var displayDate = currentTime.getFullYear();
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
            this.Validation = "";
            if ($("#chkIncrementType").prop("checked") && $("#chkIncrementSalary").prop("checked")) {
                this.Validation = "Both Designation & Salary can't be unchanged !";
            }
            else {
                this._EmpInfoTabularService.SaveIncrement(global_1.Global.BASE_EmpInfoTabular_ENDPOINT, Incrementformation).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = data;
                    }
                    else {
                        alert(data);
                    }
                });
            }
        }
    };
    EmpInfoTabularComponent.prototype.SaveOfficial = function (OfficialInformation) {
        var _this = this;
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
        if (OfficialInformation.Othersitename == null && OfficialInformation.Otherid == null && OfficialInformation.Othersitename == null) { }
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
            this._EmpInfoTabularService.SaveOfficial(global_1.Global.BASE_EmpInfoTabular_ENDPOINT, OfficialInformation).subscribe(function (data) {
                if (data.startsWith("Success: ")) {
                    _this.msg = data;
                }
                else {
                    alert(data);
                }
            });
        }
        else {
        }
    };
    EmpInfoTabularComponent.prototype.SavePastExperience = function (ExperienceInformation) {
        var _this = this;
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
        this._EmpInfoTabularService.btnAddExp(global_1.Global.BASE_EmpInfoTabular_ENDPOINT, ExperienceInformation).subscribe(function (data) {
            if (data.startsWith("Success: ")) {
                _this.msg = data;
            }
            else {
                alert(data);
            }
        });
    };
    EmpInfoTabularComponent.prototype.AddLeave = function (LeaveInfoFrm) {
        var _this = this;
        LeaveInfoFrm.EditEmployeeid = this.EditEmployeeid;
        LeaveInfoFrm.Editmode = this.Editmode;
        var intvalue = LeaveInfoFrm.AdjustedValue;
        var adjvalue = $("#txtAdjustLeave").val();
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
                    this._EmpInfoTabularService.AddLeave(global_1.Global.BASE_EmpInfoTabular_ENDPOINT, LeaveInfoFrm).subscribe(function (data) {
                        if (data.startsWith("Success: ")) {
                            _this.msg = data;
                            _this.GetAdustmentleave(parseInt(LeaveInfoFrm.EditEmployeeid));
                        }
                        else {
                            alert(data);
                        }
                    });
                }
            }
        }
    };
    EmpInfoTabularComponent.prototype.EmpInfoTabularFilterCriteriaChange = function (value) {
        if (value != '[object Event]')
            this.EmpInfoTabularFilter = value;
    };
    EmpInfoTabularComponent.prototype.EmpInfoTabularSort = function (property) {
        if (!this.ShowHideSearch) {
            this.isDesc = !this.isDesc;
            this.column = property;
            this.direction = this.isDesc ? 1 : -1;
        }
    };
    EmpInfoTabularComponent.prototype.addEmpInfoTabular = function () {
        //  this.SetControlsState(true)
        this.modalTitle = "Add New EmpInfoTabular";
        this.modalBtnTitle = "Add";
        this.EmpInfoTabularFrm.reset();
        this.modal.open();
    };
    EmpInfoTabularComponent.prototype.editEmpInfoTabular = function (id) {
        this.dbops = enum_1.DBOperation.update;
        /// this.SetControlsState(true)
        this.modalTitle = "Edit News";
        this.modalBtnTitle = "Update";
        //his.EmpInfoTabular = this.EmpInfoTabulars.filter(x => x.Id == id)[0]
        this.EmpInfoTabularFrm.setValue(this.EmpInfoTabular);
        this.modal.open();
    };
    EmpInfoTabularComponent.prototype.AddRole = function (ExperienceInformation) {
        var _this = this;
        this.InLoading = true;
        this._EmpInfoTabularService.AddRole(global_1.Global.BASE_EmpInfoTabular_ENDPOINT, ExperienceInformation).subscribe(function (data) {
            if (data.startsWith("Success: ")) {
                _this.msg = data;
            }
            else {
                alert(data);
            }
        });
        this.indLoading = true;
    };
    EmpInfoTabularComponent.prototype.GetRoleAdd = function () {
        var _this = this;
        this.indLoading = true;
        this._EmpInfoTabularService.GetRoleAdd(global_1.Global.BASE_EmpInfoTabular_ENDPOINT)
            .subscribe(function (data) {
            _this.RoleAdds = data;
            _this.indLoading = false;
        });
    };
    EmpInfoTabularComponent.prototype.editRoles = function (ExpRoleId) {
        //this.SetControlsState(true)
        this.ExperienceInformation = this.RoleAdds.filter(function (x) { return x.ExpRoleId == ExpRoleId; })[0];
        //  this.ExperienceInfoFrm.setValue(this.ExperienceInformation)
    };
    EmpInfoTabularComponent.prototype.deleteRoles = function (id) {
        var _this = this;
        this.indLoading = true;
        this._EmpInfoTabularService.delete(global_1.Global.BASE_EmpInfoTabular_ENDPOINT, id)
            .subscribe(function (Data) {
            if (Data.startsWith("Success: ")) {
                _this.msg = Data;
                _this.GetRoleAdd();
            }
            else {
                alert(Data);
            }
            _this.indLoading = false;
        });
    };
    EmpInfoTabularComponent.prototype.OpenSkill = function () {
        alert('Skill');
        this.modal.open();
    };
    EmpInfoTabularComponent.prototype.GetSkill = function () {
        var _this = this;
        this.indLoading = true;
        this._EmpInfoTabularService.GetSkill(global_1.Global.BASE_EmpInfoTabular_ENDPOINT)
            .subscribe(function (data) {
            _this.MySkillFrms = data;
            console.log(_this.MySkillFrms);
            _this.indLoading = false;
        });
    };
    EmpInfoTabularComponent.prototype.GetPopupSkill = function (event) {
        var _this = this;
        alert(event.target.value);
        this.indLoading = true;
        this._EmpInfoTabularService.GetPopupSkill(global_1.Global.BASE_EmpInfoTabular_ENDPOINT, event.target.value)
            .subscribe(function (data) {
            _this.Secondlists = data;
            _this.indLoading = false;
        });
    };
    EmpInfoTabularComponent.prototype.GetGridViewList = function (UserId) {
        var _this = this;
        this.indLoading = true;
        this._EmpInfoTabularService.GetPopupSkill(global_1.Global.BASE_EmpInfoTabular_ENDPOINT, UserId)
            .subscribe(function (data) {
            _this.Secondlists = data;
            _this.indLoading = false;
        });
    };
    EmpInfoTabularComponent.prototype.Saveskill = function (MySkillFrm) {
        var _this = this;
        debugger;
        MySkillFrm.EditEmployeeid = this.EditEmployeeid;
        MySkillFrm.Editmode = this.Editmode;
        this._EmpInfoTabularService.Saveskill(global_1.Global.BASE_EmpInfoTabular_ENDPOINT, MySkillFrm).subscribe(function (data) {
            if (data.startsWith("Success: ")) {
                _this.msg = data;
            }
            else {
                alert(data);
            }
        });
    };
    //SetControlsState(isEnable: boolean) {
    //    isEnable ? this.ExperienceInfoFrm.enable() : this.ExperienceInfoFrm.disable()
    //}
    EmpInfoTabularComponent.prototype.ChangeRecordsPerPage = function (RecordsPerPage) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    };
    EmpInfoTabularComponent.prototype.JumpOnPage = function (PageNumber) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.PendingTasks);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;
        alert(this.pagedItems);
    };
    EmpInfoTabularComponent.prototype.ShowHideSearchControls = function () {
        this.ShowHideSearch = !this.ShowHideSearch;
    };
    EmpInfoTabularComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        this.msg = "";
        switch (this.dbops) {
            case enum_1.DBOperation.create:
                this._EmpInfoTabularService.post(global_1.Global.BASE_EmpInfoTabular_ENDPOINT, formData._value).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = data;
                        _this.modal.dismiss();
                    }
                    else {
                        alert(data);
                    }
                }, function (error) {
                    _this.msg = error;
                });
                break;
            case enum_1.DBOperation.update:
                this._EmpInfoTabularService.put(global_1.Global.BASE_EmpInfoTabular_ENDPOINT, formData.Id, formData._value).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = data;
                        _this.modal.dismiss();
                    }
                    else {
                        alert(data);
                    }
                }, function (error) {
                    _this.msg = error;
                });
                break;
            case enum_1.DBOperation.delete:
                this._EmpInfoTabularService.delete(global_1.Global.BASE_EmpInfoTabular_ENDPOINT, formData.Id).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = data;
                        _this.modal.dismiss();
                    }
                    else {
                        alert(data);
                    }
                }, function (error) {
                    _this.msg = error;
                });
                break;
        }
    };
    __decorate([
        core_1.ViewChild('modal'),
        __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
    ], EmpInfoTabularComponent.prototype, "modal", void 0);
    EmpInfoTabularComponent = __decorate([
        core_1.Component({
            providers: [EmpInfoTabular_service_1.EmpInfoTabularService],
            templateUrl: 'app/Components/HumanResource/EmployeeManagement/EmpInfoTabular.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, EmpInfoTabular_service_1.EmpInfoTabularService, pager_index_1.PagerService, http_1.Http, router_1.ActivatedRoute])
    ], EmpInfoTabularComponent);
    return EmpInfoTabularComponent;
}());
exports.EmpInfoTabularComponent = EmpInfoTabularComponent;
