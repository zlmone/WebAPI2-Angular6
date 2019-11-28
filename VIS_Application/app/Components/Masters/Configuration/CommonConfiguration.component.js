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
var CommonConfiguration_service_1 = require("../../../service/Masters/Configuration/CommonConfiguration.service");
var forms_1 = require("@angular/forms");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw"); // fixed typo
var global_1 = require("../../../Shared/global");
var pager_index_1 = require("../../../Shared/pager.index");
var CommonHelper_service_1 = require("../../../Shared/CommonHelper.service");
var CommonConfigurationComponent = (function () {
    function CommonConfigurationComponent(fb, _CommonConfigurationService, pagerService, _CommonHelperService) {
        this.fb = fb;
        this._CommonConfigurationService = _CommonConfigurationService;
        this.pagerService = pagerService;
        this._CommonHelperService = _CommonHelperService;
        this.indLoading = false;
        this.isDesc = false;
        this.column = 'EventName';
        // pager object
        this.pager = {};
        this.CurrentRecordsPerPage = 10;
    }
    CommonConfigurationComponent.prototype.ngOnInit = function () {
        this._CommonHelperService.ToogleMenu();
        this.LoadCommonConfiguration();
        this.commonconfiguration =
            ({
                Id: 0,
                URLLocal: '',
                URLLive: '',
                MinimumLunchBreak: 0,
                MinimumOtherBreak: 0,
                MouseMinutes: 0,
                PlusMouseMinutes: 0,
                MouseTracking: 0,
                ProductivityTracker: 0,
                WorksheetPrompt: 0,
                MinimumPunchoutInterval: 0,
                InTimeMondayToFridayHH: 0,
                InTimeMondayToFridayMM: 0,
                OutTimeMondayToFridayHH: 0,
                OutTimeMondayToFridayMM: 0,
                InTimeSaturdayHH: 0,
                InTimeSaturdayMM: 0,
                OutTimeSaturdayHH: 0,
                OutTimeSaturdayMM: 0,
                ShiftDurationHH: 0,
                ShiftDurationMM: 0,
                TDSMenuHideOrShow: '',
                RoleMenu: '',
                CreatedOn: null,
                CreatedBy: '',
                UpdatedOn: null,
                UpdatedBy: '',
                IsActive: false
            });
    };
    CommonConfigurationComponent.prototype.LoadCommonConfiguration = function () {
        var _this = this;
        this.indLoading = true;
        this._CommonConfigurationService.getallconfiguration(global_1.Global.BASE_COMMONCONFIGURATION_ENDPOINT)
            .subscribe(function (data) {
            _this.commonconfiguration = data;
            _this.indLoading = false;
        }
        //,error => this.msg = <any>error
        );
    };
    CommonConfigurationComponent.prototype.SetControlsState = function (isEnable) {
        isEnable ? this.CommonConfigurationFrm.enable() : this.CommonConfigurationFrm.disable();
    };
    CommonConfigurationComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        this.msg = "";
        console.log(formData);
        this._CommonConfigurationService.put(global_1.Global.BASE_COMMONCONFIGURATION_ENDPOINT, formData.Id, formData).subscribe(function (data) {
            //if (data == "Success") {
            if (data.startsWith("Success: ")) {
                $("html, body").animate({ scrollTop: 590 }, 250);
                _this.msg = data;
                _this.LoadCommonConfiguration();
            }
            else {
                alert(data);
            }
        }, function (error) {
            _this.msg = error;
        });
    };
    __decorate([
        core_1.ViewChild('modal'),
        __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
    ], CommonConfigurationComponent.prototype, "modal", void 0);
    CommonConfigurationComponent = __decorate([
        core_1.Component({
            providers: [CommonConfiguration_service_1.CommonConfigurationService],
            templateUrl: 'app/Components/Masters/Configuration/CommonConfiguration.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, CommonConfiguration_service_1.CommonConfigurationService, pager_index_1.PagerService, CommonHelper_service_1.CommonHelperService])
    ], CommonConfigurationComponent);
    return CommonConfigurationComponent;
}());
exports.CommonConfigurationComponent = CommonConfigurationComponent;
