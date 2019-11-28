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
var WorkSheet_service_1 = require("../../../Service/HumanResource/Attendance/WorkSheet.service");
var forms_1 = require("@angular/forms");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw"); // fixed typo
var global_1 = require("../../../Shared/global");
var pager_index_1 = require("../../../Shared/pager.index");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var WorkSheetComponent = (function () {
    function WorkSheetComponent(fb, _WorkSheetService, http, router, pagerService) {
        this.fb = fb;
        this._WorkSheetService = _WorkSheetService;
        this.http = http;
        this.router = router;
        this.pagerService = pagerService;
        this.indLoading = false;
        this.isDesc = false;
        this.CurrentRecordsPerPage = 10;
        this.tempUserId = 158;
        this.tempDate = '20150525';
        // pager object
        this.pager = {};
        this.toStr = JSON.stringify;
    }
    WorkSheetComponent.prototype.ngOnInit = function () {
        debugger;
        this.WorkSheetFrm = this.fb.group({
            ActivityId: [''],
            ActivityName: [''],
            SubActivityId: [''],
            SubActivityName: [''],
            Date: [''],
            UserId: [''],
            ProjectID: [''],
            ProjectName: [''],
            TaskId: [''],
            Description: [''],
            Hours: [''],
            FillDate: [''],
            WorkSheetID: [''],
        });
        //this.WorkSheet =
        //    ({
        //        ActivityId:0,
        //        ActivityName: '',
        //        SubActivityId:0,
        //        SubActivityName: '',
        //        Date: '',
        //        UserId: 0,
        //        ProjectID:0,
        //        ProjectName: '',
        //        TaskId: 0,
        //        Description: '',
        //        Hours: '',
        //        FillDate: '',
        //        WorkSheetID: 0,
        //        TaskName:''
        //    });
        this.LoadDeafultConfigure();
        this.LoadDate();
        this.LoadProjectList(this.tempUserId, this.tempDate);
    };
    WorkSheetComponent.prototype.OpenSave = function () {
        this.SetControlsState(true);
        this.modalTitle = "Task List For Date ()";
        this.modalBtnTitle = "Save";
        this.modal.open();
    };
    WorkSheetComponent.prototype.SetControlsState = function (isEnable) {
        isEnable ? this.WorkSheetFrm.enable() : this.WorkSheetFrm.disable();
    };
    WorkSheetComponent.prototype.GetDate = function (event) {
        debugger;
        this.objValue1 = event.target.Date;
    };
    WorkSheetComponent.prototype.ToogleMyProfile = function () {
        $("#myprofiledata").slideToggle(300);
    };
    WorkSheetComponent.prototype.CloseWidgetProfile = function () {
        $("#adminProfile").hide(300);
    };
    WorkSheetComponent.prototype.createRange = function (number) {
        var items = [];
        for (var i = 1; i <= number; i++) {
            items.push(i);
        }
        return items;
    };
    WorkSheetComponent.prototype.LoadDeafultConfigure = function () {
        var _this = this;
        this.indLoading = true;
        this._WorkSheetService.GetDropDownList(global_1.Global.BASE_WorkSheet_ENDPOINT)
            .subscribe(function (data) {
            _this.DefaulConfigure = data;
            _this.indLoading = false;
        });
    };
    WorkSheetComponent.prototype.LoadProjectList = function (UserId, Date) {
        var _this = this;
        debugger;
        this.indLoading = true;
        this._WorkSheetService.GetProjectList(global_1.Global.BASE_WorkSheet_ENDPOINT, UserId, Date)
            .subscribe(function (data) {
            _this.ProjectList = data;
            console.log(data);
            _this.indLoading = false;
        });
    };
    WorkSheetComponent.prototype.LoadChildTaskDroDown = function (event, UserId, Date) {
        var _this = this;
        debugger;
        if (event == 0) {
            $("#taskid").prop("disabled", true);
        }
        else {
            $("#taskid").prop("disabled", false);
        }
        this.indLoading = true;
        this._WorkSheetService.GetChildTaskDropdown(global_1.Global.BASE_WorkSheet_ENDPOINT, event.target.value, this.tempUserId, this.tempDate)
            .subscribe(function (data) {
            _this.ChildDropDown = data;
            _this.indLoading = false;
        });
    };
    WorkSheetComponent.prototype.LoadDate = function () {
        var _this = this;
        debugger;
        this.indLoading = true;
        this._WorkSheetService.GetDate(global_1.Global.BASE_WorkSheet_ENDPOINT)
            .subscribe(function (data) {
            _this.Date = data;
            _this.indLoading = false;
            _this.printValues();
        });
    };
    WorkSheetComponent.prototype.printValues = function () {
        console.log('objValue1', this.Date[0]);
        console.log('objValue2', this.Date[1]);
        console.log('objValue3', this.Date[2]);
        console.log('objValue4', this.Date[3]);
    };
    WorkSheetComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        debugger;
        console.log(formData);
        this._WorkSheetService.Savepost(global_1.Global.BASE_WorkSheet_ENDPOINT, formData._value).subscribe(function (data) {
            if (data == "Success") {
                _this.msg = "Worksheet Save successfully.";
            }
            else {
                _this.msg = "Worksheet has occurred while modifying existing Ticket Configuration!";
            }
        }, function (error) {
            _this.msg = error;
        });
        //this._WorkSheetService.Savepost(Global.BASE_WorkSheet_ENDPOINT, formData._value).subscribe(
        //    data => {
        //        if (data == "Success") {
        //            this.msg = "Worksheet Save successfully.";
        //        }
        //        else {
        //            this.msg = "Worksheet has occurred while modifying existing Ticket Configuration!"
        //        }
        //    },
        //    error => {
        //        this.msg = error;
        //    }
        //);
        // this.No++;
        ///}
    };
    __decorate([
        core_1.ViewChild('modal'),
        __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
    ], WorkSheetComponent.prototype, "modal", void 0);
    WorkSheetComponent = __decorate([
        core_1.Component({
            providers: [WorkSheet_service_1.WorkSheetService],
            templateUrl: 'app/Components/HumanResource/Attendance/WorkSheet.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, WorkSheet_service_1.WorkSheetService, http_1.Http, router_1.Router, pager_index_1.PagerService])
    ], WorkSheetComponent);
    return WorkSheetComponent;
}());
exports.WorkSheetComponent = WorkSheetComponent;
