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
var Position_service_1 = require("../../../service/Masters/VacancyRelated/Position.service");
var Skill_service_1 = require("../../../service/Masters/VacancyRelated/Skill.service");
var forms_1 = require("@angular/forms");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var enum_1 = require("../../../Shared/enum");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw"); // fixed typo
var global_1 = require("../../../Shared/global");
var pager_index_1 = require("../../../Shared/pager.index");
var CommonHelper_service_1 = require("../../../Shared/CommonHelper.service");
var PositionComponent = (function () {
    function PositionComponent(fb, _PositionService, pagerService, _SkillService, _CommonHelperService) {
        this.fb = fb;
        this._PositionService = _PositionService;
        this.pagerService = pagerService;
        this._SkillService = _SkillService;
        this._CommonHelperService = _CommonHelperService;
        this.indLoading = false;
        this.isDesc = false;
        this.column = 'PositionName';
        // pager object
        this.pager = {};
        this.CurrentRecordsPerPage = 10;
        //Variables for Filter
        this.ShowHideSearch = false;
    }
    PositionComponent.prototype.ngOnInit = function () {
        this._CommonHelperService.ToogleMenu();
        this.LoadPosition();
        this.LoadSkills();
        this.ModelReset();
    };
    PositionComponent.prototype.ModelReset = function () {
        this.position =
            {
                SkillsId: "",
                SkillName: "",
                CreatedBy: "",
                CreatedOn: null,
                Id: 0,
                IsActive: false,
                Status: false,
                PositionName: "",
                Remarks: "",
                UpdatedBy: "",
                UpdatedOn: null,
                SkillId: null
            };
    };
    PositionComponent.prototype.TestMultidll = function () {
        this.myOptions = [
            { id: 6, name: 'Option 1' },
            { id: 7, name: 'Option 2' },
            { id: 8, name: 'Option 3' }
        ];
    };
    PositionComponent.prototype.LoadSkills = function () {
        var _this = this;
        this._PositionService.getskills(global_1.Global.BASE_POSITION_ENDPOINT)
            .subscribe(function (skilllist) {
            _this.IMultiSelectOption = skilllist;
        });
    };
    PositionComponent.prototype.PositionFilterCriteriaChange = function (value) {
        if (value != '[object Event]')
            this.PositionFilter = value;
    };
    PositionComponent.prototype.PositionSort = function (property) {
        if (!this.ShowHideSearch) {
            this.isDesc = !this.isDesc;
            this.column = property;
            this.direction = this.isDesc ? 1 : -1;
        }
    };
    ;
    PositionComponent.prototype.LoadPosition = function () {
        var _this = this;
        this.indLoading = true;
        this._PositionService.get(global_1.Global.BASE_POSITION_ENDPOINT)
            .subscribe(function (positions) {
            _this.positions = positions;
            //Logic for searching - start
            if (_this.ShowHideSearch) {
                _this.strSearchPositionName = document.getElementById("searchPositionName").value;
                if (_this.strSearchPositionName != '') {
                    _this.strSearchPositionName = _this.strSearchPositionName.toLocaleLowerCase();
                    _this.positions = _this.positions.filter(function (x) { return x.PositionName != null && x.PositionName.toLocaleLowerCase().indexOf(_this.strSearchPositionName) != -1; });
                }
                _this.strSearchRemarks = document.getElementById("searchRemarks").value;
                if (_this.strSearchRemarks != '') {
                    _this.strSearchRemarks = _this.strSearchRemarks.toLocaleLowerCase();
                    _this.positions = _this.positions.filter(function (x) { return x.Remarks != null && x.Remarks.toLocaleLowerCase().indexOf(_this.strSearchRemarks) != -1; });
                }
            }
            //Logic for searching - End
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
        this.modalTitle = "Add New Position";
        this.modalBtnTitle = "Add";
        this.ModelReset();
        this.modal.open();
    };
    PositionComponent.prototype.EditPosition = function (id) {
        this.dbops = enum_1.DBOperation.update;
        this.modalTitle = "Edit Position";
        this.modalBtnTitle = "Update";
        this.position = this.positions.filter(function (x) { return x.Id == id; })[0];
        this.TempSkillId = this.position.SkillsId.split(',');
        this.position.SkillId = [];
        for (var _i = 0, _a = this.TempSkillId; _i < _a.length; _i++) {
            var item = _a[_i];
            this.position.SkillId.push(Number(item));
        }
        this.modal.open();
    };
    PositionComponent.prototype.DeletePosition = function (id, status) {
        this.dbops = enum_1.DBOperation.delete;
        if (status == true) {
            this.modalTitle = "Confirm to Delete?";
            this.modalBtnTitle = "Delete";
        }
        else {
            this.modalTitle = "Confirm to Undo Delete?";
            this.modalBtnTitle = "Undo Delete";
        }
        this.position = this.positions.filter(function (x) { return x.Id == id; })[0];
        this.TempSkillId = this.position.SkillsId.split(',');
        this.position.SkillId = [];
        for (var _i = 0, _a = this.TempSkillId; _i < _a.length; _i++) {
            var item = _a[_i];
            this.position.SkillId.push(Number(item));
        }
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
    PositionComponent.prototype.ShowHideSearchControls = function () {
        this.ShowHideSearch = !this.ShowHideSearch;
    };
    PositionComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        this.msg = "";
        if (formData.SkillId == null) {
            formData.SkillId = [0];
        }
        switch (this.dbops) {
            case enum_1.DBOperation.create:
                this._PositionService.post(global_1.Global.BASE_POSITION_ENDPOINT, formData).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = data;
                        _this.LoadPosition();
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
                this._PositionService.put(global_1.Global.BASE_POSITION_ENDPOINT, formData.Id, formData).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = data;
                        _this.LoadPosition();
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
                this._PositionService.delete(global_1.Global.BASE_POSITION_ENDPOINT, formData.Id).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
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
            providers: [Position_service_1.PositionService, Skill_service_1.SkillService],
            templateUrl: 'app/Components/Masters/VacancyRelated/Position.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, Position_service_1.PositionService, pager_index_1.PagerService, Skill_service_1.SkillService, CommonHelper_service_1.CommonHelperService])
    ], PositionComponent);
    return PositionComponent;
}());
exports.PositionComponent = PositionComponent;
