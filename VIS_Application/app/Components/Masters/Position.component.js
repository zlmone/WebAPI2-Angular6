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
var Position_service_1 = require("../../Service/Masters/VacancyRelated/Position.service");
var forms_1 = require("@angular/forms");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var enum_1 = require("../../Shared/enum");
var global_1 = require("../../Shared/global");
var pager_index_1 = require("../../Shared/pager.index");
var PositionComponent = (function () {
    function PositionComponent(fb, _PositionService, pagerService) {
        this.fb = fb;
        this._PositionService = _PositionService;
        this.pagerService = pagerService;
        this.indLoading = false;
        this.isDesc = false;
        this.column = 'PositionName';
        // pager object
        this.pager = {};
        this.CurrentRecordsPerPage = 10;
    }
    PositionComponent.prototype.ngOnInit = function () {
        this.PositionFrm = this.fb.group({
            CompanyId: [''],
            Id: [''],
            PositionName: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(3), forms_1.Validators.maxLength(100)])],
            Remarks: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(3), forms_1.Validators.maxLength(100)])],
            CreatedOn: [''],
            UpdatedOn: [''],
            CreatedBy: [''],
            UpdatedBy: [''],
            EntityMessage: [''],
            IsActive: ['']
        });
        this.LoadPosition();
    };
    PositionComponent.prototype.PositionFilterCriteriaChange = function (value) {
        if (value != '[object Event]')
            this.PositionFilter = value;
    };
    PositionComponent.prototype.PositionSort = function (property) {
        this.isDesc = !this.isDesc;
        this.column = property;
        this.direction = this.isDesc ? 1 : -1;
    };
    ;
    PositionComponent.prototype.LoadPosition = function () {
        var _this = this;
        this.indLoading = true;
        this._PositionService.get(global_1.Global.BASE_POSITION_ENDPOINT)
            .subscribe(function (positions) {
            _this.positions = positions;
            _this.indLoading = false;
            // set items to json response
            // initialize to page 1
            _this.JumpOnPage(1);
            _this.pager = _this.pagerService.pager;
            _this.pagedItems = _this.pagerService.pagedItems;
        }
        //,error => this.msg = <any>error
        );
    };
    PositionComponent.prototype.AddPosition = function () {
        this.dbops = enum_1.DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New Position";
        this.modalBtnTitle = "Add";
        this.PositionFrm.reset();
        this.modal.open();
    };
    PositionComponent.prototype.EditPosition = function (id) {
        this.dbops = enum_1.DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit Position";
        this.modalBtnTitle = "Update";
        this.position = this.positions.filter(function (x) { return x.Id == id; })[0];
        this.PositionFrm.setValue(this.position);
        this.modal.open();
    };
    PositionComponent.prototype.DeletePosition = function (id, status) {
        debugger;
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
        this.position = this.positions.filter(function (x) { return x.Id == id; })[0];
        this.PositionFrm.setValue(this.position);
        this.modal.open();
    };
    PositionComponent.prototype.SetControlsState = function (isEnable) {
        isEnable ? this.PositionFrm.enable() : this.PositionFrm.disable();
    };
    PositionComponent.prototype.ChangeRecordsPerPage = function (RecordsPerPage) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    };
    PositionComponent.prototype.JumpOnPage = function (PageNumber) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.positions);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;
    };
    PositionComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        this.msg = "";
        switch (this.dbops) {
            case enum_1.DBOperation.create:
                this._PositionService.post(global_1.Global.BASE_POSITION_ENDPOINT, formData._value).subscribe(function (data) {
                    if (data == "Success") {
                        _this.msg = "Position added successfully.";
                        _this.LoadPosition();
                    }
                    else {
                        _this.msg = "Error has occurred while adding new Position!";
                    }
                    _this.modal.dismiss();
                }, function (error) {
                    _this.msg = error;
                });
                break;
            case enum_1.DBOperation.update:
                this._PositionService.put(global_1.Global.BASE_POSITION_ENDPOINT, formData._value.Id, formData._value).subscribe(function (data) {
                    if (data == "Success") {
                        _this.msg = "Position modified successfully.";
                        _this.LoadPosition();
                    }
                    else {
                        _this.msg = "Error has occurred while modifying existing Position!";
                    }
                    _this.modal.dismiss();
                }, function (error) {
                    _this.msg = error;
                });
                break;
            case enum_1.DBOperation.delete:
                this._PositionService.delete(global_1.Global.BASE_POSITION_ENDPOINT, formData._value.Id).subscribe(function (data) {
                    if (data == "Success") {
                        _this.msg = "Position status changed successfully.";
                        _this.LoadPosition();
                    }
                    else {
                        _this.msg = "Error has occurred while changing status of existing Position!";
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
    ], PositionComponent.prototype, "modal", void 0);
    PositionComponent = __decorate([
        core_1.Component({
            providers: [Position_service_1.PositionService],
            templateUrl: 'app/Components/Masters/Position.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, Position_service_1.PositionService, pager_index_1.PagerService])
    ], PositionComponent);
    return PositionComponent;
}());
exports.PositionComponent = PositionComponent;
