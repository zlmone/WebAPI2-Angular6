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
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw"); // fixed typo
var global_1 = require("../../Shared/global");
//import * as _ from 'underscore';
var pager_index_1 = require("../../Shared/pager.index");
var http_1 = require("@angular/http");
var ViewRFQResponsecomponent = (function () {
    function ViewRFQResponsecomponent(fb, _RFQResponseService, _RFQService, router, pagerService, route, http) {
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
    ViewRFQResponsecomponent.prototype.ngOnInit = function () {
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
        this.GetRFQLink();
        this.GetRFQDocument();
    };
    ViewRFQResponsecomponent.prototype.GetRFQLink = function () {
        var _this = this;
        this._RFQResponseService.GetRFQLink(global_1.Global.BASE_RFQResponse_ENDPOINT)
            .subscribe(function (RFQs) {
            _this.RFQLink = RFQs;
        });
    };
    ViewRFQResponsecomponent.prototype.GetRFQDocument = function () {
        var _this = this;
        this._RFQResponseService.GetRFQDocument(global_1.Global.BASE_RFQResponse_ENDPOINT)
            .subscribe(function (RFQs) {
            _this.RFQDoc = RFQs;
        });
    };
    ViewRFQResponsecomponent.prototype.LoadActionTaken = function () {
        var _this = this;
        this.indLoading = true;
        this._RFQResponseService.GetActionTaken(global_1.Global.BASE_RFQResponse_ENDPOINT, this.forSessionData.SessionId, this.Access)
            .subscribe(function (RFQs) {
            _this.actionTakenByList = RFQs;
        }
        //,error => this.msg = <any>error
        );
    };
    ViewRFQResponsecomponent.prototype.LoadData = function () {
        var _this = this;
        this._RFQResponseService.GetViewRFQResponseById(global_1.Global.BASE_RFQResponse_ENDPOINT, 68) //68==rfqid
            .subscribe(function (RFQs) {
            _this.addRFQResponse = RFQs;
            debugger;
            if (_this.addRFQResponse.Timeline_Unit = 'D') {
                _this.addRFQResponse.Timeline_Unit = 'Days';
            }
            else if (_this.addRFQResponse.Timeline_Unit = 'W') {
                _this.addRFQResponse.Timeline_Unit = 'Week';
            }
            else if (_this.addRFQResponse.Timeline_Unit = 'M') {
                _this.addRFQResponse.Timeline_Unit = 'Month';
            }
            else {
                _this.addRFQResponse.Timeline_Unit = 'Year';
            }
            if (_this.addRFQResponse.Leadtime_Unit = 'D') {
                _this.addRFQResponse.Leadtime_Unit = 'Days';
            }
            else if (_this.addRFQResponse.Leadtime_Unit = 'W') {
                _this.addRFQResponse.Leadtime_Unit = 'Week';
            }
            else if (_this.addRFQResponse.Leadtime_Unit = 'M') {
                _this.addRFQResponse.Leadtime_Unit = 'Month';
            }
            else {
                _this.addRFQResponse.Timeline_Unit = 'Year';
            }
            debugger;
        }
        //,error => this.msg = <any>error
        );
    };
    ViewRFQResponsecomponent.prototype.GetTechnology = function () {
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
    __decorate([
        core_1.ViewChild('modal'),
        __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
    ], ViewRFQResponsecomponent.prototype, "modal", void 0);
    ViewRFQResponsecomponent = __decorate([
        core_1.Component({
            providers: [RFQResponse_service_1.RFQResponseService, RFQ_service_1.RFQService],
            templateUrl: 'app/Components/RFQ/ViewResponse.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, RFQResponse_service_1.RFQResponseService, RFQ_service_1.RFQService, router_1.Router, pager_index_1.PagerService, router_1.ActivatedRoute, http_1.Http])
    ], ViewRFQResponsecomponent);
    return ViewRFQResponsecomponent;
}());
exports.ViewRFQResponsecomponent = ViewRFQResponsecomponent;
