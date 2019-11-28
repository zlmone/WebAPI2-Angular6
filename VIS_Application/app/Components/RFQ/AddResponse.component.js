"use strict";
//Saurabh
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
var RFQResponse_service_1 = require("../../Service/RFQ/RFQResponse.service");
var RFQ_service_1 = require("../../Service/RFQ/RFQ.service");
var forms_1 = require("@angular/forms");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var router_1 = require("@angular/router");
var Rx_1 = require("rxjs/Rx");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw"); // fixed typo
var global_1 = require("../../Shared/global");
//import * as _ from 'underscore';
var pager_index_1 = require("../../Shared/pager.index");
var http_1 = require("@angular/http");
var AddRFQResponsecomponent = (function () {
    function AddRFQResponsecomponent(fb, _RFQResponseService, _RFQService, router, pagerService, route, http) {
        this.fb = fb;
        this._RFQResponseService = _RFQResponseService;
        this._RFQService = _RFQService;
        this.router = router;
        this.pagerService = pagerService;
        this.route = route;
        this.http = http;
        this.indLoading = false;
        this.isDesc = false;
        this.Technology = [];
        this.Access = true;
        this.RFQDocList = [];
        this.RFQDocEntityList = [];
        this.RFQLinkList = [];
        this.RFQLinkEntityList = [];
        this.fileListForAPI = [];
    }
    AddRFQResponsecomponent.prototype.fileChangeDoc = function (event) {
        this.fileList = event.target.files;
        this.fileListForAPI[this.i] = this.fileList;
        this.i = this.i + 1;
    };
    AddRFQResponsecomponent.prototype.ngOnInit = function () {
        this.addRFQResponse = ({
            RFQ_InitialID: 0,
            IsEstimateReady: false,
            IsChangeToAction: false,
            Hours: 0,
            Timeline: 0,
            Timeline_Unit: '',
            Leadtime: 0,
            Leadtime_Unit: '',
            Technology: '',
            TechnologyIdList: 0,
            Description: '',
            ActionRequestedBy: 0,
            ActionByDate: null,
            EmployeeName: '',
            hdnEmployee: '',
            CurruntDate: null,
            hdnEmployeeId: 0,
            EmpId: 0
        });
        this.forRFQId = ({
            RFQId: 0
        });
        this.forSessionData = ({
            SessionId: 0
        });
        this.actionTakenBy = ({
            EmpId: 0,
            Employee_Name: ''
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
            UserId: '',
            Password: '',
            URL: ''
        });
        this.forSessionData.SessionId = +sessionStorage.getItem('Id');
        this.LoadActionTaken();
        this.GetTechnology();
        this.LoadData();
        this.GetFileType();
        this.GetAuthor();
    };
    AddRFQResponsecomponent.prototype.LoadActionTaken = function () {
        var _this = this;
        this.indLoading = true;
        this._RFQResponseService.GetActionTaken(global_1.Global.BASE_RFQResponse_ENDPOINT, this.forSessionData.SessionId, this.Access)
            .subscribe(function (RFQs) {
            _this.actionTakenByList = RFQs;
        }
        //,error => this.msg = <any>error
        );
    };
    AddRFQResponsecomponent.prototype.LoadData = function () {
        var _this = this;
        this._RFQResponseService.GetOnLoadData(global_1.Global.BASE_RFQResponse_ENDPOINT, this.forSessionData.SessionId, 21) //21==rfqid
            .subscribe(function (RFQs) {
            _this.hiddenValue = RFQs;
            _this.addRFQResponse.EmployeeName = _this.hiddenValue.hdnEmployee;
            _this.addRFQResponse.hdnEmployeeId = _this.hiddenValue.hdnEmployeeId;
            debugger;
            _this.addRFQResponse.CurruntDate = new Date();
        }
        //,error => this.msg = <any>error
        );
    };
    AddRFQResponsecomponent.prototype.GetTechnology = function () {
        var _this = this;
        this.indLoading = true;
        this._RFQResponseService.GetTechnology(global_1.Global.BASE_RFQ_ENDPOINT)
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
    AddRFQResponsecomponent.prototype.GetFileType = function () {
        var _this = this;
        this.indLoading = true;
        this._RFQService.GetFileType(global_1.Global.BASE_RFQ_ENDPOINT)
            .subscribe(function (RFQs) {
            _this.FileTypeDDL = RFQs;
            _this.indLoading = false;
        });
    };
    AddRFQResponsecomponent.prototype.GetAuthor = function () {
        var _this = this;
        this.indLoading = true;
        this._RFQService.GetAuthor(global_1.Global.BASE_RFQ_ENDPOINT)
            .subscribe(function (RFQs) {
            _this.AuthorDDL = RFQs;
            _this.indLoading = false;
        });
    };
    AddRFQResponsecomponent.prototype.onAddRFQSubmit = function (formData) {
        var _this = this;
        debugger;
        this.forRFQId.RFQId = 21;
        debugger;
        var MainAddResponse = {
            SessionData: this.forSessionData,
            RFQResponse: formData,
            RFQDoc: this.RFQDocEntityList,
            RFQLink: this.RFQLinkEntityList,
            RFQId: this.forRFQId.RFQId
            //  RFQDoc: this.RFQDocList,
            //RFQLink: this.RFQLinkList
        };
        this._RFQResponseService.post(global_1.Global.BASE_RFQResponse_ENDPOINT, MainAddResponse).subscribe(function (data) {
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
                alert('Record Added Successfully.');
                _this.router.navigate(['/MyRFQ']);
            }
            else {
                alert(data);
            }
        }, function (error) {
            _this.msg = error;
        });
    };
    AddRFQResponsecomponent.prototype.onDocSubmit = function (formDocData) {
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
    AddRFQResponsecomponent.prototype.deleteRFQDoc = function (FileName) {
        var elementPos = this.RFQDocList.map(function (x) { return x.FileName; }).indexOf(FileName);
        this.RFQDocEntityList.splice(elementPos, 1);
    };
    AddRFQResponsecomponent.prototype.onLinkSubmit = function (formLinkData) {
        this.RFQLinkEntity = formLinkData;
        this.RFQLinkEntityList.push(this.RFQLinkEntity);
        this.clearLink();
    };
    AddRFQResponsecomponent.prototype.deleteRFQLink = function (UserId) {
        var elementPos = this.RFQLinkList.map(function (x) { return x.UserId; }).indexOf(UserId);
        this.RFQLinkEntityList.splice(elementPos, 1);
    };
    AddRFQResponsecomponent.prototype.clearDoc = function () {
        this.RFQDoc.Author = "";
        this.RFQDoc.AuthorId = 0;
        this.RFQDoc.FileName = "";
        this.RFQDoc.FileType = "";
        this.RFQDoc.RemarkDoc = "";
    };
    AddRFQResponsecomponent.prototype.clearLink = function () {
        this.RFQLink.Password = "";
        this.RFQLink.RemarkLink = "";
        this.RFQLink.URL = "";
        this.RFQLink.UserId = '';
    };
    AddRFQResponsecomponent.prototype.SetControlsState = function (isEnable) {
        isEnable ? this.RFQFrm.enable() : this.RFQFrm.disable();
    };
    __decorate([
        core_1.ViewChild('modal'),
        __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
    ], AddRFQResponsecomponent.prototype, "modal", void 0);
    AddRFQResponsecomponent = __decorate([
        core_1.Component({
            providers: [RFQResponse_service_1.RFQResponseService, RFQ_service_1.RFQService],
            templateUrl: 'app/Components/RFQ/AddResponse.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, RFQResponse_service_1.RFQResponseService, RFQ_service_1.RFQService, router_1.Router, pager_index_1.PagerService, router_1.ActivatedRoute, http_1.Http])
    ], AddRFQResponsecomponent);
    return AddRFQResponsecomponent;
}());
exports.AddRFQResponsecomponent = AddRFQResponsecomponent;
