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
var RFQ_service_1 = require("../../Service/RFQ/RFQ.service");
var forms_1 = require("@angular/forms");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var router_1 = require("@angular/router");
var Rx_1 = require("rxjs/Rx");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw"); // fixed typo
var global_1 = require("../../Shared/global");
var pager_index_1 = require("../../Shared/pager.index");
var http_1 = require("@angular/http");
var AddRFQComponent = (function () {
    function AddRFQComponent(fb, _RFQService, router, pagerService, http) {
        this.fb = fb;
        this._RFQService = _RFQService;
        this.router = router;
        this.pagerService = pagerService;
        this.http = http;
        this.MultiTechnology = [];
        this.Technology = [];
        this.Employee = [];
        this.RFQDocList = [];
        this.RFQDocEntityList = [];
        this.RFQLinkList = [];
        this.RFQLinkEntityList = [];
        this.fileListForAPI = [];
        this.indLoading = false;
        this.CurrentRecordsPerPage = 10;
        this.pager = {};
        this.MultiTechnology.id = null;
        this.MultiTechnology.name = null;
        this.i = 0;
    }
    AddRFQComponent.prototype.fileChangeDoc = function (event) {
        this.fileList = event.target.files;
        this.fileListForAPI[this.i] = this.fileList;
        this.i = this.i + 1;
    };
    AddRFQComponent.prototype.addClient = function () {
        debugger;
        this.modal.open();
        this.ProspectHelper = false;
    };
    AddRFQComponent.prototype.ngOnInit = function () {
        this.CPFrm = this.fb.group({
            Id: [''],
            CompanyName: [''],
            Country: [''],
            FilterRadioButton: ['']
        });
        this.RFQs = ({
            Id: 0,
            BusinessHeadId: 0,
            BusinessManagerId: 0,
            Employee_Name: '',
            BusinessTypeId: 0,
            BusinessType: '',
            ProjectTypeId: 0,
            ProjectType: '',
            IndustryId: 0,
            Industries: '',
            SolutionId: 0,
            Solution: '',
            ServiceOfferingId: 0,
            ServiceOffering: '',
            TechnologyIdList: 0,
            TechnologyId: 0,
            TechnologyName: '',
            Remark: '',
            ResponseRequiredBy: null,
            SupportedBy: '',
            ConfidenceLevel: 0,
            OpportunityStatus: '',
            StatusId: 0,
            RFQStatus: '',
            ExpectedClosureDate: null,
            Source: '',
            Title: '',
            ProspectClient: '',
            DateOfInitiation: null,
            UserIdList: 0,
            UserId: 0,
            ResponseRequiredFrom: 0,
            CreatedOn: null,
            CreatedBy: 0,
            UpdatedBy: 0,
            UpdatedDate: null,
        });
        this.RFQDoc = ({
            FileTypeID: 0,
            FileType: '',
            FileName: '',
            AuthorId: 0,
            Author: '',
            RemarkDoc: ''
        });
        this.RFQDocEntity = ({
            FileTypeId: 0,
            FileType: '',
            FileName: '',
            AuthorId: 0,
            Author: '',
            RemarkDoc: ''
        });
        this.RFQLink = ({
            RemarkLink: '',
            UserId: 0,
            Password: '',
            URL: ''
        });
        this.forSessionData = ({
            SessionId: 0
        });
        this.prospectClient = ({
            Id: 0,
            CompanyName: "",
            Country: "",
            FilterRadioButton: ""
        });
        this.sessionValues = ({
            UserType: "",
            UserId: 0
        });
        this.GetEmployee();
        this.GetTechnology();
        this.LoadFillBusinessHead();
        this.GetBusinessManager();
        this.GetBusinessType();
        this.GetProjectType();
        this.GetIndustries();
        this.GetSolution();
        this.GetServiceOffering();
        this.GetFileType();
        this.GetAuthor();
        this.GetRFQStatus();
        this.GetProspectClient();
        this.ProspectHelper = true;
        this.SourceVal = false;
    };
    AddRFQComponent.prototype.LoadFillBusinessHead = function () {
        var _this = this;
        this.indLoading = true;
        this._RFQService.FillBusinessHead(global_1.Global.BASE_RFQ_ENDPOINT)
            .subscribe(function (RFQs) {
            _this.BusinessHeadDDL = RFQs;
            _this.indLoading = false;
        });
    };
    AddRFQComponent.prototype.GetBusinessManager = function () {
        var _this = this;
        var UserName = sessionStorage.getItem('VISUsername');
        var UserType = sessionStorage.getItem('UserType');
        this.indLoading = true;
        this._RFQService.GetBusinessManager(global_1.Global.BASE_RFQ_ENDPOINT, UserName)
            .subscribe(function (RFQs) {
            _this.BusinessManagerDDL = RFQs;
            _this.indLoading = false;
        });
    };
    AddRFQComponent.prototype.GetBusinessType = function () {
        var _this = this;
        this.indLoading = true;
        this._RFQService.GetBusinessType(global_1.Global.BASE_RFQ_ENDPOINT)
            .subscribe(function (RFQs) {
            _this.BusinessTypeDDL = RFQs;
            _this.indLoading = false;
        });
    };
    AddRFQComponent.prototype.GetProjectType = function () {
        var _this = this;
        this.indLoading = true;
        this._RFQService.GetProjectType(global_1.Global.BASE_RFQ_ENDPOINT)
            .subscribe(function (RFQs) {
            _this.ProjectTypeDDL = RFQs;
            _this.indLoading = false;
        });
    };
    AddRFQComponent.prototype.GetIndustries = function () {
        var _this = this;
        this.indLoading = true;
        this._RFQService.GetIndustries(global_1.Global.BASE_RFQ_ENDPOINT)
            .subscribe(function (RFQs) {
            _this.IndustriesDDL = RFQs;
            _this.indLoading = false;
        });
    };
    AddRFQComponent.prototype.GetSolution = function () {
        var _this = this;
        this.indLoading = true;
        this._RFQService.GetSolution(global_1.Global.BASE_RFQ_ENDPOINT)
            .subscribe(function (RFQs) {
            _this.SolutionDDL = RFQs;
            _this.indLoading = false;
        });
    };
    AddRFQComponent.prototype.GetServiceOffering = function () {
        var _this = this;
        this.indLoading = true;
        this._RFQService.GetServiceOffering(global_1.Global.BASE_RFQ_ENDPOINT)
            .subscribe(function (RFQs) {
            _this.ServiceOfferingDDL = RFQs;
            _this.indLoading = false;
        });
    };
    AddRFQComponent.prototype.GetFileType = function () {
        var _this = this;
        this.indLoading = true;
        this._RFQService.GetFileType(global_1.Global.BASE_RFQ_ENDPOINT)
            .subscribe(function (RFQs) {
            _this.FileTypeDDL = RFQs;
            _this.indLoading = false;
        });
    };
    AddRFQComponent.prototype.GetAuthor = function () {
        var _this = this;
        this.indLoading = true;
        this._RFQService.GetAuthor(global_1.Global.BASE_RFQ_ENDPOINT)
            .subscribe(function (RFQs) {
            _this.AuthorDDL = RFQs;
            _this.indLoading = false;
        });
    };
    AddRFQComponent.prototype.GetRFQStatus = function () {
        var _this = this;
        this.indLoading = true;
        this._RFQService.GetRFQStatus(global_1.Global.BASE_RFQ_ENDPOINT)
            .subscribe(function (RFQs) {
            _this.RFQStatusDDL = RFQs;
            _this.indLoading = false;
        });
    };
    AddRFQComponent.prototype.GetTechnology = function () {
        var _this = this;
        this.indLoading = true;
        this._RFQService.GetTechnology(global_1.Global.BASE_RFQ_ENDPOINT)
            .subscribe(function (Technology) {
            _this.Technology = Technology;
            _this.myOptions = [];
            for (var _i = 0, _a = _this.Technology; _i < _a.length; _i++) {
                var item = _a[_i];
                _this.myOptions.push({ id: item.TechnologyId, name: item.TechnologyName });
            }
            _this.indLoading = false;
        });
    };
    AddRFQComponent.prototype.GetEmployee = function () {
        var _this = this;
        this.indLoading = true;
        this._RFQService.GetEmployee(global_1.Global.BASE_RFQ_ENDPOINT)
            .subscribe(function (Emp) {
            _this.Employee = Emp;
            debugger;
            _this.myOptionsEmp = [];
            for (var _i = 0, _a = _this.Employee; _i < _a.length; _i++) {
                var item = _a[_i];
                _this.myOptionsEmp.push({ id: item.UserId, name: item.Employee_Name });
            }
            debugger;
            _this.indLoading = false;
        });
    };
    AddRFQComponent.prototype.GetProspectClient = function () {
        var _this = this;
        this.sessionvar = sessionStorage.getItem('IsAdmin');
        this.sessionValues.UserId = +sessionStorage.getItem('Id'); // + is used for casting string to number 
        if (this.sessionvar == "true") {
            this.sessionValues.UserType = "admin";
        }
        this.sessionValues.UserType = "admin";
        this.prospectClient.FilterRadioButton = "Client";
        var SuperProspectClient = {
            ProspectClient: this.prospectClient,
            SessionValues: this.sessionValues
        };
        this._RFQService.GetProspectClient(global_1.Global.BASE_RFQ_ENDPOINT, SuperProspectClient).subscribe(function (data) {
            _this.prospectClientList = data;
            debugger;
            // initialize to page 1
            _this.JumpOnPage(1);
        }, function (error) {
            _this.msg = error;
        });
    };
    AddRFQComponent.prototype.onRFQInitialSubmit = function (formData) {
        var _this = this;
        if (this.ProspectHelper == true) {
            this.forSessionData.SessionId = +sessionStorage.getItem('Id'); // + is used for casting string to number
            var MainRFQInitial = {
                SessionData: this.forSessionData,
                RFQInitial: formData,
                RFQDoc: this.RFQDocEntityList,
                RFQLink: this.RFQLinkEntityList
                //  RFQDoc: this.RFQDocList,
                //RFQLink: this.RFQLinkList
            };
            this._RFQService.post(global_1.Global.BASE_RFQ_ENDPOINT, MainRFQInitial).subscribe(function (data) {
                if (data.startsWith("Success:")) {
                    _this.msg = data;
                    if (_this.fileListForAPI.length > 0) {
                        var k = 0;
                        for (var _i = 0, _a = _this.fileListForAPI; _i < _a.length; _i++) {
                            var fileToBeUpload = _a[_i];
                            var file = fileToBeUpload[0];
                            var formData_1 = new FormData();
                            formData_1.append('uploadFile', file, file.name);
                            var headers = new http_1.Headers();
                            var options = new http_1.RequestOptions({ headers: headers });
                            var apiUrl1 = "/api/RFQAPI/UploadRFQDoc";
                            _this.http.post(apiUrl1, formData_1, options)
                                .map(function (res) { return res.json(); })
                                .catch(function (error) { return Rx_1.Observable.throw(error); })
                                .subscribe(function (data) { return console.log('success'); }, function (error) { return console.log(error); });
                            file = null;
                            formData_1 = null;
                            headers = null;
                            options = null;
                            k = k + 1;
                        }
                        _this.fileListForAPI = null;
                    }
                    _this.router.navigate(['/MyRFQ']);
                }
                else {
                    alert(data);
                }
            }, function (error) {
                _this.msg = error;
            });
        }
        else {
            this.ProspectHelper = true;
        }
    };
    AddRFQComponent.prototype.onDocSubmit = function (formDocData) {
        if (this.fileList != null) {
            this.RFQDocEntity = formDocData;
            this.RFQDocEntity.FileName = this.fileList.item(0).name;
            this.RFQDocEntityList.push(this.RFQDocEntity);
            this.clearDoc();
        }
        else {
            alert('please select Any document file');
        }
    };
    AddRFQComponent.prototype.deleteRFQDoc = function (FileName) {
        var elementPos = this.RFQDocList.map(function (x) { return x.FileName; }).indexOf(FileName);
        this.RFQDocEntityList.splice(elementPos, 1);
    };
    AddRFQComponent.prototype.onLinkSubmit = function (formLinkData) {
        this.RFQLinkEntity = formLinkData;
        this.RFQLinkEntityList.push(this.RFQLinkEntity);
        this.clearLink();
    };
    AddRFQComponent.prototype.deleteRFQLink = function (UserId) {
        var elementPos = this.RFQLinkList.map(function (x) { return x.UserId; }).indexOf(UserId);
        this.RFQLinkEntityList.splice(elementPos, 1);
    };
    AddRFQComponent.prototype.clearDoc = function () {
        this.RFQDoc.Author = "";
        this.RFQDoc.AuthorId = 0;
        this.RFQDoc.FileName = "";
        this.RFQDoc.FileType = "";
        this.RFQDoc.RemarkDoc = "";
    };
    AddRFQComponent.prototype.clearLink = function () {
        this.RFQLink.Password = "";
        this.RFQLink.RemarkLink = "";
        this.RFQLink.URL = "";
        this.RFQLink.UserId = 0;
    };
    AddRFQComponent.prototype.ProspectClientFilterCriteriaChange = function (value) {
        if (value != '[object Event]')
            this.ProspectClientFilter = value;
    };
    AddRFQComponent.prototype.JumpOnPage = function (PageNumber) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.prospectClientList);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;
    };
    AddRFQComponent.prototype.ChangeRecordsPerPage = function (RecordsPerPage) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    };
    AddRFQComponent.prototype.addClientInForm = function (Id, CompanyName, Country) {
        this.RFQs.ProspectClient = CompanyName;
        this.SourceVal = true;
        this.modal.dismiss();
    };
    AddRFQComponent.prototype.ClearClient = function () {
        this.RFQs.ProspectClient = "";
        this.ProspectHelper = false;
        this.SourceVal = false;
    };
    __decorate([
        core_1.ViewChild('modal'),
        __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
    ], AddRFQComponent.prototype, "modal", void 0);
    AddRFQComponent = __decorate([
        core_1.Component({
            providers: [RFQ_service_1.RFQService],
            templateUrl: 'app/Components/RFQ/AddRFQ.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, RFQ_service_1.RFQService, router_1.Router, pager_index_1.PagerService, http_1.Http])
    ], AddRFQComponent);
    return AddRFQComponent;
}());
exports.AddRFQComponent = AddRFQComponent;
