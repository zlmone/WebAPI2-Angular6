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
var Skill_service_1 = require("../../../service/Masters/VacancyRelated/Skill.service");
var forms_1 = require("@angular/forms");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var enum_1 = require("../../../Shared/enum");
var global_1 = require("../../../Shared/global");
var pager_index_1 = require("../../../Shared/pager.index");
var SkillComponent = (function () {
    function SkillComponent(fb, _SkillService, pagerService) {
        this.fb = fb;
        this._SkillService = _SkillService;
        this.pagerService = pagerService;
        this.indLoading = false;
        this.isDesc = false;
        this.column = 'SkillName';
        // pager object
        this.pager = {};
        this.CurrentRecordsPerPage = 10;
    }
    SkillComponent.prototype.someFunction = function (data) {
        alert(data);
    };
    SkillComponent.prototype.ngOnInit = function () {
        this.SkillFrm = this.fb.group({
            CompanyId: [''],
            Id: [''],
            SkillName: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(3), forms_1.Validators.maxLength(100)])],
            Description: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(3), forms_1.Validators.maxLength(100)])],
            SkillGroupID: [''],
            SkillGroupName: [''],
            RatingGroup: [''],
            IsActive: [''],
            CreatedOn: [''],
            UpdatedOn: [''],
            CreatedBy: [''],
            UpdatedBy: [''],
            EntityMessage: ['']
        });
        this.LoadSkill();
        this.LoadSkillGroup();
    };
    SkillComponent.prototype.SkillFilterCriteriaChange = function (value) {
        if (value != '[object Event]')
            this.SkillFilter = value;
    };
    SkillComponent.prototype.SkillSort = function (property) {
        this.isDesc = !this.isDesc;
        this.column = property;
        this.direction = this.isDesc ? 1 : -1;
    };
    ;
    SkillComponent.prototype.LoadSkill = function () {
        var _this = this;
        this.indLoading = true;
        this._SkillService.get(global_1.Global.BASE_SKILL_ENDPOINT)
            .subscribe(function (skills) {
            _this.skills = skills;
            _this.indLoading = false;
            console.log(skills);
            // initialize to page 1
            _this.JumpOnPage(1);
        }
        //,error => this.msg = <any>error
        );
        this.indLoading = true;
        this._SkillService.get(global_1.Global.BASE_SKILLGROUP_ENDPOINT)
            .subscribe(function (skillgroups) {
            _this.skillgroups = skillgroups;
            _this.indLoading = false;
        }
        //,error => this.msg = <any>error
        );
    };
    SkillComponent.prototype.AddSkill = function () {
        this.dbops = enum_1.DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New Skill";
        this.modalBtnTitle = "Add";
        this.SkillFrm.reset();
        this.modal.open();
    };
    SkillComponent.prototype.EditSkill = function (id) {
        this.dbops = enum_1.DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit Skill";
        this.modalBtnTitle = "Update";
        this.skill = this.skills.filter(function (x) { return x.Id == id; })[0];
        this.SkillFrm.setValue(this.skill);
        this.modal.open();
    };
    SkillComponent.prototype.DeleteSkill = function (id, status) {
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
        this.skill = this.skills.filter(function (x) { return x.Id == id; })[0];
        this.SkillFrm.setValue(this.skill);
        this.modal.open();
    };
    SkillComponent.prototype.SetControlsState = function (isEnable) {
        isEnable ? this.SkillFrm.enable() : this.SkillFrm.disable();
    };
    SkillComponent.prototype.ChangeRecordsPerPage = function (RecordsPerPage) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    };
    SkillComponent.prototype.JumpOnPage = function (PageNumber) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.skills);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;
    };
    SkillComponent.prototype.LoadSkillGroup = function () {
        var _this = this;
        this.indLoading = true;
        this._SkillService.get(global_1.Global.BASE_SKILLGROUP_ENDPOINT)
            .subscribe(function (skillgroups) {
            _this.skillgroups = skillgroups;
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
    SkillComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        this.msg = "";
        switch (this.dbops) {
            case enum_1.DBOperation.create:
                this._SkillService.post(global_1.Global.BASE_SKILL_ENDPOINT, formData._value).subscribe(function (data) {
                    if (data == "Success") {
                        _this.msg = "Skill added successfully.";
                        _this.LoadSkill();
                    }
                    else {
                        _this.msg = "Error has occurred while adding new Skill!";
                    }
                    _this.modal.dismiss();
                }, function (error) {
                    _this.msg = error;
                });
                break;
            case enum_1.DBOperation.update:
                this._SkillService.put(global_1.Global.BASE_SKILL_ENDPOINT, formData._value.Id, formData._value).subscribe(function (data) {
                    if (data == "Success") {
                        _this.msg = "Skill modified successfully.";
                        _this.LoadSkill();
                    }
                    else {
                        _this.msg = "Error has occurred while modifying existing Skill!";
                    }
                    _this.modal.dismiss();
                }, function (error) {
                    _this.msg = error;
                });
                break;
            case enum_1.DBOperation.delete:
                this._SkillService.delete(global_1.Global.BASE_SKILL_ENDPOINT, formData._value.Id).subscribe(function (data) {
                    if (data == "Success") {
                        _this.msg = "Skill status changed successfully.";
                        _this.LoadSkill();
                    }
                    else {
                        _this.msg = "Error has occurred while changing status of existing Skill!";
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
    ], SkillComponent.prototype, "modal", void 0);
    SkillComponent = __decorate([
        core_1.Component({
            providers: [Skill_service_1.SkillService],
            templateUrl: 'app/Components/Masters/VacancyRelated/Skill.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, Skill_service_1.SkillService, pager_index_1.PagerService])
    ], SkillComponent);
    return SkillComponent;
}());
exports.SkillComponent = SkillComponent;
