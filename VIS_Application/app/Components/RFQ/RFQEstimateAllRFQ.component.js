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
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw"); // fixed typo
var global_1 = require("../../Shared/global");
//import * as _ from 'underscore';
var pager_index_1 = require("../../Shared/pager.index");
var AllRFQComponent = (function () {
    function AllRFQComponent(fb, _RFQService, router, pagerService, route) {
        //this.route.params.subscribe(params => {
        //    this.Parameter = params['param'];
        //    this.LoadRFQs(this.Parameter);
        this.fb = fb;
        this._RFQService = _RFQService;
        this.router = router;
        this.pagerService = pagerService;
        this.route = route;
        this.indLoading = false;
        this.isDesc = false;
        this.column = 'Full_Name';
        // pager object
        this.pager = {};
        this.CurrentRecordsPerPage = 10;
        //Variables for Filter
        this.ShowHideSearch = false;
        //});
    }
    AllRFQComponent.prototype.ngOnInit = function () {
        debugger;
        ////////////////
        //this.sub = this.route
        //    .queryParams
        //    .subscribe(params => {
        //        // Defaults to 0 if no query param provided.
        //        this.Mode = +params['Mode'] || 0;
        //    });
        //if (this.Mode == 1) {
        //    this.Param = "myrfq";
        //}
        //else if (this.Mode == 2) {
        //    this.Param = "allrfq"
        //}
        //else if (this.Mode == 3) {
        //    this.Param = "estimateby"
        //}
        //else if (this.Mode == 4) {
        //    this.Param = "mywatch"
        //}
        //else {
        //    this.Param = "myaction"
        //}
        //////////////////////
        this.RFQFrm = this.fb.group({
            RFQInitialId: [''],
            OpportunityId: [''],
            Title: [''],
            InitiatedBy: [''],
            DateOfInitiation: [''],
            EstimateBy: [''],
            SubmittedOn: [''],
            LastResponseBy: [''],
            LastResponseDate: [''],
            ActionRequestedBy: [''],
            Status: [''],
            rfqStatus: [''],
            OtherComments: [''],
            CreatedBy: ['']
        });
        this.LoadRFQs();
    };
    AllRFQComponent.prototype.RFQFilterCriteriaChange = function (value) {
        if (value != '[object Event]')
            this.RFQFilter = value;
    };
    AllRFQComponent.prototype.RFQSort = function (property) {
        if (!this.ShowHideSearch) {
            this.isDesc = !this.isDesc;
            this.column = property;
            this.direction = this.isDesc ? 1 : -1;
        }
    };
    ;
    AllRFQComponent.prototype.LoadRFQs = function () {
        var _this = this;
        debugger;
        var UserName = sessionStorage.getItem('VISUsername');
        var UserType = sessionStorage.getItem('UserType');
        this.indLoading = true;
        this._RFQService.getAllRFQ(global_1.Global.BASE_RFQ_ENDPOINT, UserName)
            .subscribe(function (RFQs) {
            _this.RFQs = RFQs;
            //Logic for searching - start
            if (_this.ShowHideSearch) {
                //////////
                _this.strsearchTitle = document.getElementById("searchTitle").value;
                if (_this.strsearchTitle != '') {
                    _this.strsearchTitle = _this.strsearchTitle.toLocaleLowerCase();
                    _this.RFQs = _this.RFQs.filter(function (x) { return x.Title != null && x.Title.toLocaleLowerCase().indexOf(_this.strsearchTitle) != -1; });
                }
                /////////
                _this.strsearchInitiatedBy = document.getElementById("searchInitiatedBy").value;
                if (_this.strsearchInitiatedBy != '') {
                    _this.strsearchInitiatedBy = _this.strsearchInitiatedBy.toLocaleLowerCase();
                    _this.RFQs = _this.RFQs.filter(function (x) { return x.InitiatedBy != null && x.InitiatedBy.toLocaleLowerCase().indexOf(_this.strsearchInitiatedBy) != -1; });
                }
                //////////
                //this.strsearchDateOfInitiation = (<HTMLInputElement>document.getElementById("searchName")).value;
                //if (this.strsearchDateOfInitiation != '') {
                //    this.strsearchDateOfInitiation = this.strsearchDateOfInitiation.toLocaleLowerCase();
                //    this.RFQs = this.RFQs.filter(
                //        x => x.DateOfInitiation != null && x.DateOfInitiation.toLocaleLowerCase().indexOf(this.strsearchDateOfInitiation) != -1);
                //}
                /////////
                _this.strsearchEstimateBy = document.getElementById("searchEstimateBy").value;
                if (_this.strsearchEstimateBy != '') {
                    _this.strsearchEstimateBy = _this.strsearchEstimateBy.toLocaleLowerCase();
                    _this.RFQs = _this.RFQs.filter(function (x) { return x.EstimateBy != null && x.EstimateBy.toLocaleLowerCase().indexOf(_this.strsearchEstimateBy) != -1; });
                }
                //////////
                //this.strSearchName = (<HTMLInputElement>document.getElementById("searchName")).value;
                //if (this.strSearchName != '') {
                //    this.strSearchName = this.strSearchName.toLocaleLowerCase();
                //    this.RFQs = this.RFQs.filter(
                //        x => x.Name != null && x.Name.toLocaleLowerCase().indexOf(this.strSearchName) != -1);
                //}
                /////////
                _this.strsearchStatus = document.getElementById("searchStatus").value;
                if (_this.strsearchStatus != '') {
                    _this.strsearchStatus = _this.strsearchStatus.toLocaleLowerCase();
                    _this.RFQs = _this.RFQs.filter(function (x) { return x.Status != null && x.Status.toLocaleLowerCase().indexOf(_this.strsearchStatus) != -1; });
                }
                //////////
                _this.strsearchrfqStatus = document.getElementById("searchrfqStatus").value;
                if (_this.strsearchrfqStatus != '') {
                    _this.strsearchrfqStatus = _this.strsearchrfqStatus.toLocaleLowerCase();
                    _this.RFQs = _this.RFQs.filter(function (x) { return x.rfqStatus != null && x.rfqStatus.toLocaleLowerCase().indexOf(_this.strsearchrfqStatus) != -1; });
                }
                /////////
                _this.strsearchLastResponseBy = document.getElementById("searchLastResponseBy").value;
                if (_this.strsearchLastResponseBy != '') {
                    _this.strsearchLastResponseBy = _this.strsearchLastResponseBy.toLocaleLowerCase();
                    _this.RFQs = _this.RFQs.filter(function (x) { return x.LastResponseBy != null && x.LastResponseBy.toLocaleLowerCase().indexOf(_this.strsearchLastResponseBy) != -1; });
                }
                //////////
                //this.strSearchName = (<HTMLInputElement>document.getElementById("searchName")).value;
                //if (this.strSearchName != '') {
                //    this.strSearchName = this.strSearchName.toLocaleLowerCase();
                //    this.RFQs = this.RFQs.filter(
                //        x => x.Name != null && x.Name.toLocaleLowerCase().indexOf(this.strSearchName) != -1);
                //}
                /////////
                //this.strsearchActionRequestedBy = (<HTMLInputElement>document.getElementById("searchDesignation")).value;
                //if (this.strsearchActionRequestedBy != '') {
                //    this.strsearchActionRequestedBy = this.strsearchActionRequestedBy.toLocaleLowerCase();
                //    this.RFQs = this.RFQs.filter(
                //        x => x.ActionRequestedBy != null && x.ActionRequestedBy.toLocaleLowerCase().indexOf(this.strsearchActionRequestedBy) != -1);
                //}
                //////////searchLastResponseBy
            }
            //Logic for searching - End
            _this.indLoading = false;
            // initialize to page 1
            _this.JumpOnPage(1);
        }
        //,error => this.msg = <any>error
        );
    };
    AllRFQComponent.prototype.addRFQ = function () {
        this.router.navigate(['/AddRFQ']);
    };
    AllRFQComponent.prototype.deleteRFQ = function (id, status) {
        //this.dbops = DBOperation.delete;
        //this.SetControlsState(false);
        //if (status == true) {
        //    this.modalTitle = "Confirm to Delete?";
        //    this.modalBtnTitle = "Delete";
        //}
        //else {
        //    this.modalTitle = "Confirm to Undo Delete?";
        //    this.modalBtnTitle = "Undo Delete";
        //}
        //this.RFQ = this.RFQs.filter(x => x.Id == id)[0];
        //this.RFQFrm.setValue(this.RFQ);
        //this.modal.open();
    };
    AllRFQComponent.prototype.SetControlsState = function (isEnable) {
        isEnable ? this.RFQFrm.enable() : this.RFQFrm.disable();
    };
    AllRFQComponent.prototype.ChangeRecordsPerPage = function (RecordsPerPage) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    };
    AllRFQComponent.prototype.JumpOnPage = function (PageNumber) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.RFQs);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;
    };
    AllRFQComponent.prototype.ShowHideSearchControls = function () {
        this.ShowHideSearch = !this.ShowHideSearch;
    };
    __decorate([
        core_1.ViewChild('modal'),
        __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
    ], AllRFQComponent.prototype, "modal", void 0);
    AllRFQComponent = __decorate([
        core_1.Component({
            providers: [RFQ_service_1.RFQService],
            templateUrl: 'app/Components/RFQ/RFQEstimateAllRFQ.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, RFQ_service_1.RFQService, router_1.Router, pager_index_1.PagerService, router_1.ActivatedRoute])
    ], AllRFQComponent);
    return AllRFQComponent;
}());
exports.AllRFQComponent = AllRFQComponent;
