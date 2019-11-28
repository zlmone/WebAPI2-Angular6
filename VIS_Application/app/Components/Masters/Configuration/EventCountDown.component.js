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
var EventCountDown_service_1 = require("../../../service/Masters/Configuration/EventCountDown.service");
var forms_1 = require("@angular/forms");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var enum_1 = require("../../../Shared/enum");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw"); // fixed typo
var global_1 = require("../../../Shared/global");
var pager_index_1 = require("../../../Shared/pager.index");
var CommonHelper_service_1 = require("../../../Shared/CommonHelper.service");
var EventCountDownComponent = (function () {
    //Vaiable for For Loop No of Day
    //noday: number[] = new Array(200)
    function EventCountDownComponent(fb, _EventCountDownService, pagerService, _CommonHelperService) {
        this.fb = fb;
        this._EventCountDownService = _EventCountDownService;
        this.pagerService = pagerService;
        this._CommonHelperService = _CommonHelperService;
        this.indLoading = false;
        this.isDesc = false;
        this.column = 'EventName';
        // pager object
        this.pager = {};
        this.CurrentRecordsPerPage = 10;
        //Variables for Filter
        this.ShowHideSearch = false;
    }
    EventCountDownComponent.prototype.Resetmodel = function () {
        this.eventcountdown =
            {
                Active: false,
                CountDownDate: '',
                CountDownDateTime: null,
                CountDownText: '',
                CountDownTime: '0',
                CreatedBy: '',
                CreatedOn: null,
                EventName: '',
                Id: 0,
                IsActive: false,
                NoOfDay: 0,
                UpdatedBy: '',
                UpdatedOn: null,
                CompanyId: 0,
                EntityMessage: ''
            };
    };
    EventCountDownComponent.prototype.ngOnInit = function () {
        //for (var i = 1; i < this.noday.length ; i++)
        //{
        //    //this.noday.push(i);
        //}
        this._CommonHelperService.ToogleMenu();
        this.EventCountDownFrm = this.fb.group({
            Id: [''],
            EventName: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(3), forms_1.Validators.maxLength(100)])],
            CountDownText: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(3), forms_1.Validators.maxLength(100)])],
            CountDownDate: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(3), forms_1.Validators.maxLength(100)])],
            CountDownTime: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(3), forms_1.Validators.maxLength(100)])],
            CountDownDateTime: [''],
            NoOfDay: [0, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(1), forms_1.Validators.maxLength(100)])],
            Active: [''],
            IsActive: [''],
            CreatedOn: [''],
            UpdatedOn: [''],
            CreatedBy: [''],
            UpdatedBy: [''],
            CompanyId: [''],
            EntityMessage: ['']
        });
        this.LoadEventCountDown();
    };
    EventCountDownComponent.prototype.EventCountDownFilterCriteriaChange = function (value) {
        if (value != '[object Event]')
            this.EventCountDownFilter = value;
    };
    EventCountDownComponent.prototype.EventCountDownSort = function (property) {
        if (!this.ShowHideSearch) {
            this.isDesc = !this.isDesc;
            this.column = property;
            this.direction = this.isDesc ? 1 : -1;
        }
    };
    ;
    EventCountDownComponent.prototype.LoadEventCountDown = function () {
        var _this = this;
        this.indLoading = true;
        this._EventCountDownService.get(global_1.Global.BASE_EVENTCOUNTDOWN_ENDPOINT)
            .subscribe(function (eventcountdown) {
            _this.eventcountdowns = eventcountdown;
            //Logic for searching - start
            if (_this.ShowHideSearch) {
                _this.strEventName = document.getElementById("searchEventName").value;
                if (_this.strEventName != '') {
                    _this.strEventName = _this.strEventName.toLocaleLowerCase();
                    _this.eventcountdowns = _this.eventcountdowns.filter(function (x) { return x.EventName != null && x.EventName.toLocaleLowerCase().indexOf(_this.strEventName) != -1; });
                }
                _this.strCountDownText = document.getElementById("searchCountDownText").value;
                if (_this.strCountDownText != '') {
                    _this.strCountDownText = _this.strCountDownText.toLocaleLowerCase();
                    _this.eventcountdowns = _this.eventcountdowns.filter(function (x) { return x.CountDownText != null && x.CountDownText.toLocaleLowerCase().indexOf(_this.strCountDownText) != -1; });
                }
            }
            //Logic for searching - End
            _this.indLoading = false;
            _this.JumpOnPage(1);
        }
        //,error => this.msg = <any>error
        );
    };
    EventCountDownComponent.prototype.AddEventCountDown = function () {
        this.dbops = enum_1.DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New Event Count Down";
        this.modalBtnTitle = "Add";
        this.Resetmodel();
        this.EventCountDownFrm.setValue(this.eventcountdown);
        this.modal.open();
    };
    EventCountDownComponent.prototype.EditEventCountDown = function (id) {
        this.dbops = enum_1.DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit Event Count Down";
        this.modalBtnTitle = "Update";
        this.eventcountdown = this.eventcountdowns.filter(function (x) { return x.Id == id; })[0];
        this.eventcountdown.CountDownTime = this.eventcountdown.CountDownDateTime.substr(11, 9);
        this.eventcountdown.CountDownDate = this.eventcountdown.CountDownDateTime.substr(0, 10);
        this.EventCountDownFrm.setValue(this.eventcountdown);
        this.modal.open();
    };
    EventCountDownComponent.prototype.DeleteEventCountDown = function (id, status) {
        this.dbops = enum_1.DBOperation.delete;
        this.SetControlsState(false);
        if (status == true) {
            this.modalTitle = "Confirm to Delete?";
            this.modalBtnTitle = "Delete";
        }
        else {
            this.modalTitle = "Confirm to Undo Delete?";
            this.modalBtnTitle = "Undo Delete";
        }
        this.eventcountdown = this.eventcountdowns.filter(function (x) { return x.Id == id; })[0];
        this.eventcountdown.CountDownTime = this.eventcountdown.CountDownDateTime.substr(11, 9);
        this.eventcountdown.CountDownDate = this.eventcountdown.CountDownDateTime.substr(0, 10);
        this.EventCountDownFrm.setValue(this.eventcountdown);
        this.modal.open();
    };
    EventCountDownComponent.prototype.SetControlsState = function (isEnable) {
        isEnable ? this.EventCountDownFrm.enable() : this.EventCountDownFrm.disable();
    };
    EventCountDownComponent.prototype.ChangeRecordsPerPage = function (RecordsPerPage) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    };
    EventCountDownComponent.prototype.JumpOnPage = function (PageNumber) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.eventcountdowns);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;
    };
    EventCountDownComponent.prototype.ShowHideSearchControls = function () {
        this.ShowHideSearch = !this.ShowHideSearch;
    };
    EventCountDownComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        //this.eventcountdown.CountDownDateTime = this.eventcountdown.CountDownDate + this.eventcountdown.CountDownTime;
        console.log(formData);
        //
        this.msg = "";
        switch (this.dbops) {
            case enum_1.DBOperation.create:
                this._EventCountDownService.post(global_1.Global.BASE_EVENTCOUNTDOWN_ENDPOINT, formData._value).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = data;
                        _this.LoadEventCountDown();
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
                this._EventCountDownService.put(global_1.Global.BASE_EVENTCOUNTDOWN_ENDPOINT, formData._value.Id, formData._value).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = data;
                        _this.LoadEventCountDown();
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
                this._EventCountDownService.delete(global_1.Global.BASE_EVENTCOUNTDOWN_ENDPOINT, formData._value.Id).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = "EventCountDown status changed successfully.";
                        _this.LoadEventCountDown();
                    }
                    else {
                        _this.msg = "Error has occurred while changing status of existing EventCountDown!";
                    }
                    _this.modal.dismiss();
                }, function (error) {
                    _this.msg = error;
                });
                break;
        }
    };
    __decorate([
        core_1.ViewChild('modal'),
        __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
    ], EventCountDownComponent.prototype, "modal", void 0);
    EventCountDownComponent = __decorate([
        core_1.Component({
            providers: [EventCountDown_service_1.EventCountDownService],
            templateUrl: 'app/Components/Masters/Configuration/EventCountDown.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, EventCountDown_service_1.EventCountDownService, pager_index_1.PagerService, CommonHelper_service_1.CommonHelperService])
    ], EventCountDownComponent);
    return EventCountDownComponent;
}());
exports.EventCountDownComponent = EventCountDownComponent;
