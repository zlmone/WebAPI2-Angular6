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
var ConfigureWorksheet_service_1 = require("../../../service/Masters/Configuration/ConfigureWorksheet.service");
var forms_1 = require("@angular/forms");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var enum_1 = require("../../../Shared/enum");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw"); // fixed typo
var global_1 = require("../../../Shared/global");
var CommonHelper_service_1 = require("../../../Shared/CommonHelper.service");
var pager_index_1 = require("../../../Shared/pager.index");
var ConfigureWorkSheetComponent = (function () {
    function ConfigureWorkSheetComponent(fb, _ConfigureWorksheetService, pagerService, _CommonHelperService) {
        this.fb = fb;
        this._ConfigureWorksheetService = _ConfigureWorksheetService;
        this.pagerService = pagerService;
        this._CommonHelperService = _CommonHelperService;
        this.indLoading = false;
        this.isDesc = false;
        this.column = 'EventName';
        // pager object
        this.pager = {};
        this.CurrentRecordsPerPage = 10;
    }
    ConfigureWorkSheetComponent.prototype.ngOnInit = function () {
        this._CommonHelperService.ToogleMenu();
        this.LoadConfigureWorkSheet();
        this.configureworksheet =
            ({
                Id: 0,
                SrNo: '',
                Fromm: 0,
                Too: 0,
                HexadecimalValue: '',
                CreatedOn: null,
                CreatedBy: '',
                UpdatedOn: null,
                UpdatedBy: '',
                IsActive: false
            });
    };
    ConfigureWorkSheetComponent.prototype.LoadConfigureWorkSheet = function () {
        var _this = this;
        this.indLoading = true;
        this._ConfigureWorksheetService.get(global_1.Global.BASE_CONFIGUREWORKSHEET_ENDPOINT)
            .subscribe(function (data) {
            _this.configureworksheets = data;
            _this.indLoading = false;
        }
        //,error => this.msg = <any>error
        );
    };
    ConfigureWorkSheetComponent.prototype.SetControlsState = function (isEnable) {
        isEnable ? this.ConfigureWorksheetFrm.enable() : this.ConfigureWorksheetFrm.disable();
    };
    ConfigureWorkSheetComponent.prototype.EditConfigureWorksheet = function (id) {
        this.dbops = enum_1.DBOperation.update;
        this.modalTitle = "Edit Configure Worksheet";
        this.modalBtnTitle = "Update";
        this.configureworksheet = this.configureworksheets.filter(function (x) { return x.Id == id; })[0];
        this.modal.open();
    };
    ConfigureWorkSheetComponent.prototype.CancelConfig = function () {
        this.modal.dismiss();
        this.configureworksheet.HexadecimalValue = this.configureworksheet.HexadecimalValue;
    };
    ConfigureWorkSheetComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        debugger;
        this.msg = "";
        this._ConfigureWorksheetService.put(global_1.Global.BASE_CONFIGUREWORKSHEET_ENDPOINT, formData.Id, formData).subscribe(function (data) {
            //if (data == "Success")
            if (data.startsWith("Success: ")) {
                _this.msg = data;
                _this.LoadConfigureWorkSheet();
                _this.modal.dismiss();
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
    ], ConfigureWorkSheetComponent.prototype, "modal", void 0);
    ConfigureWorkSheetComponent = __decorate([
        core_1.Component({
            providers: [ConfigureWorksheet_service_1.ConfigureWorksheetService],
            templateUrl: 'app/Components/Masters/Configuration/ConfigureWorkSheet.component.html',
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, ConfigureWorksheet_service_1.ConfigureWorksheetService, pager_index_1.PagerService, CommonHelper_service_1.CommonHelperService])
    ], ConfigureWorkSheetComponent);
    return ConfigureWorkSheetComponent;
}());
exports.ConfigureWorkSheetComponent = ConfigureWorkSheetComponent;
