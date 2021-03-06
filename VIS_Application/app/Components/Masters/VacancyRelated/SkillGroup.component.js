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
var SkillGroup_service_1 = require("../../../service/Masters/VacancyRelated/SkillGroup.service");
var forms_1 = require("@angular/forms");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var enum_1 = require("../../../Shared/enum");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw"); // fixed typo
var global_1 = require("../../../Shared/global");
var pager_index_1 = require("../../../Shared/pager.index");
var CommonHelper_service_1 = require("../../../Shared/CommonHelper.service");
var SkillGroupComponent = (function () {
    function SkillGroupComponent(fb, _SkillGroupService, pagerService, _CommonHelperService) {
        this.fb = fb;
        this._SkillGroupService = _SkillGroupService;
        this.pagerService = pagerService;
        this._CommonHelperService = _CommonHelperService;
        this.indLoading = false;
        this.isDesc = false;
        this.column = 'SkillGroupName';
        // pager object
        this.pager = {};
        this.CurrentRecordsPerPage = 10;
        //Variables for Filter
        this.ShowHideSearch = false;
    }
    SkillGroupComponent.prototype.ngOnInit = function () {
        this._CommonHelperService.ToogleMenu();
        this.SkillGroupFrm = this.fb.group({
            Id: [''],
            CompanyId: [''],
            SkillGroupID: [''],
            SkillGroupName: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(3), forms_1.Validators.maxLength(100)])],
            RatingGroup: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(3), forms_1.Validators.maxLength(100)])],
            IsActive: [''],
            CreatedOn: [''],
            UpdatedOn: [''],
            CreatedBy: [''],
            UpdatedBy: [''],
            EntityMessage: ['']
        });
        this.LoadSkillGroup();
    };
    SkillGroupComponent.prototype.SkillGroupFilterCriteriaChange = function (value) {
        if (value != '[object Event]')
            this.SkillGroupFilter = value;
    };
    SkillGroupComponent.prototype.SkillGroupSort = function (property) {
        if (!this.ShowHideSearch) {
            this.isDesc = !this.isDesc;
            this.column = property;
            this.direction = this.isDesc ? 1 : -1;
        }
    };
    ;
    SkillGroupComponent.prototype.LoadSkillGroup = function () {
        var _this = this;
        this.indLoading = true;
        this._SkillGroupService.get(global_1.Global.BASE_SKILLGROUP_ENDPOINT)
            .subscribe(function (skillgroups) {
            _this.skillgroups = skillgroups;
            //Logic for searching - start
            if (_this.ShowHideSearch) {
                _this.strSearchSkillGroupName = document.getElementById("searchSkillGroupName").value;
                if (_this.strSearchSkillGroupName != '') {
                    _this.strSearchSkillGroupName = _this.strSearchSkillGroupName.toLocaleLowerCase();
                    _this.skillgroups = _this.skillgroups.filter(function (x) { return x.SkillGroupName != null && x.SkillGroupName.toLocaleLowerCase().indexOf(_this.strSearchSkillGroupName) != -1; });
                }
                _this.strSearchRatingGroup = document.getElementById("searchRatingGroup").value;
                if (_this.strSearchRatingGroup != '') {
                    _this.strSearchRatingGroup = _this.strSearchRatingGroup.toLocaleLowerCase();
                    _this.skillgroups = _this.skillgroups.filter(function (x) { return x.RatingGroup != null && x.RatingGroup.toLocaleLowerCase().indexOf(_this.strSearchRatingGroup) != -1; });
                }
            }
            //Logic for searching - End
            _this.indLoading = false;
            // initialize to page 1
            _this.JumpOnPage(1);
        }
        //,error => this.msg = <any>error
        );
    };
    SkillGroupComponent.prototype.AddSkillGroup = function () {
        this.dbops = enum_1.DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New SkillGroup";
        this.modalBtnTitle = "Add";
        this.SkillGroupFrm.reset();
        this.modal.open();
    };
    SkillGroupComponent.prototype.EditSkillGroup = function (id) {
        this.dbops = enum_1.DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit SkillGroup";
        this.modalBtnTitle = "Update";
        this.skillgroup = this.skillgroups.filter(function (x) { return x.Id == id; })[0];
        this.SkillGroupFrm.setValue(this.skillgroup);
        this.modal.open();
    };
    SkillGroupComponent.prototype.DeleteSkillGroup = function (id, status) {
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
        this.skillgroup = this.skillgroups.filter(function (x) { return x.Id == id; })[0];
        this.SkillGroupFrm.setValue(this.skillgroup);
        this.modal.open();
    };
    SkillGroupComponent.prototype.SetControlsState = function (isEnable) {
        isEnable ? this.SkillGroupFrm.enable() : this.SkillGroupFrm.disable();
    };
    SkillGroupComponent.prototype.ChangeRecordsPerPage = function (RecordsPerPage) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    };
    SkillGroupComponent.prototype.JumpOnPage = function (PageNumber) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.skillgroups);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;
    };
    SkillGroupComponent.prototype.ShowHideSearchControls = function () {
        this.ShowHideSearch = !this.ShowHideSearch;
    };
    SkillGroupComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        this.msg = "";
        switch (this.dbops) {
            case enum_1.DBOperation.create:
                this._SkillGroupService.post(global_1.Global.BASE_SKILLGROUP_ENDPOINT, formData._value).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = data;
                        _this.LoadSkillGroup();
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
                this._SkillGroupService.put(global_1.Global.BASE_SKILLGROUP_ENDPOINT, formData._value.Id, formData._value).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = data;
                        _this.LoadSkillGroup();
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
                this._SkillGroupService.delete(global_1.Global.BASE_SKILLGROUP_ENDPOINT, formData._value.Id).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = "SkillGroup status changed successfully.";
                        _this.LoadSkillGroup();
                    }
                    else {
                        _this.msg = "Error has occurred while changing status of existing SkillGroup!";
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
    ], SkillGroupComponent.prototype, "modal", void 0);
    SkillGroupComponent = __decorate([
        core_1.Component({
            providers: [SkillGroup_service_1.SkillGroupService],
            templateUrl: 'app/Components/Masters/VacancyRelated/SkillGroup.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, SkillGroup_service_1.SkillGroupService, pager_index_1.PagerService, CommonHelper_service_1.CommonHelperService])
    ], SkillGroupComponent);
    return SkillGroupComponent;
}());
exports.SkillGroupComponent = SkillGroupComponent;
