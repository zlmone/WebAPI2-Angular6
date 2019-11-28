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
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw"); // fixed typo
var global_1 = require("../../../Shared/global");
var pager_index_1 = require("../../../Shared/pager.index");
var CommonHelper_service_1 = require("../../../Shared/CommonHelper.service");
var SkillComponent = (function () {
    function SkillComponent(fb, _SkillService, pagerService, _CommonHelperService) {
        this.fb = fb;
        this._SkillService = _SkillService;
        this.pagerService = pagerService;
        this._CommonHelperService = _CommonHelperService;
        this.indLoading = false;
        this.isDesc = false;
        this.column = 'SkillName';
        // pager object
        this.pager = {};
        this.CurrentRecordsPerPage = 10;
        //Variables for Filter
        this.ShowHideSearch = false;
    }
    SkillComponent.prototype.ResetModel = function () {
        this.skill =
            {
                CreatedBy: '',
                CreatedOn: null,
                Description: '',
                Id: 0,
                IsActive: false,
                Level: [],
                RatingGroup: '',
                SkillGroupID: 0,
                SkillGroupName: '',
                SkillName: '',
                Status: false,
                UpdatedBy: '',
                UpdatedOn: null,
            };
        this.IMultiSelectOption =
            [
                {
                    id: 0,
                    name: '0'
                },
                {
                    id: 1,
                    name: '1'
                },
                {
                    id: 2,
                    name: '2'
                },
                {
                    id: 3,
                    name: '3'
                },
                {
                    id: 4,
                    name: '4'
                },
                {
                    id: 5,
                    name: '5'
                },
                {
                    id: 6,
                    name: '6'
                },
                {
                    id: 7,
                    name: '7'
                },
                {
                    id: 8,
                    name: '8'
                },
                {
                    id: 9,
                    name: '9'
                },
                {
                    id: 10,
                    name: '10'
                },
            ];
    };
    SkillComponent.prototype.ngOnInit = function () {
        this._CommonHelperService.ToogleMenu();
        this.LoadSkill();
        this.LoadSkillGroup();
        this.ResetModel();
    };
    SkillComponent.prototype.SkillFilterCriteriaChange = function (value) {
        if (value != '[object Event]')
            this.SkillFilter = value;
    };
    SkillComponent.prototype.SkillSort = function (property) {
        if (!this.ShowHideSearch) {
            this.isDesc = !this.isDesc;
            this.column = property;
            this.direction = this.isDesc ? 1 : -1;
        }
    };
    ;
    SkillComponent.prototype.LoadSkill = function () {
        var _this = this;
        this.indLoading = true;
        this._SkillService.get(global_1.Global.BASE_SKILL_ENDPOINT)
            .subscribe(function (skills) {
            _this.skills = skills;
            //Logic for searching - start
            if (_this.ShowHideSearch) {
                _this.strSearchSkillName = document.getElementById("searchSkillName").value;
                if (_this.strSearchSkillName != '') {
                    _this.strSearchSkillName = _this.strSearchSkillName.toLocaleLowerCase();
                    _this.skills = _this.skills.filter(function (x) { return x.SkillName != null && x.SkillName.toLocaleLowerCase().indexOf(_this.strSearchSkillName) != -1; });
                }
                _this.strSearchSkillGroupName = document.getElementById("searchSkillGroupName").value;
                if (_this.strSearchSkillGroupName != '') {
                    _this.strSearchSkillGroupName = _this.strSearchSkillGroupName.toLocaleLowerCase();
                    _this.skills = _this.skills.filter(function (x) { return x.SkillGroupName != null && x.SkillGroupName.toLocaleLowerCase().indexOf(_this.strSearchSkillGroupName) != -1; });
                }
                _this.strSearchDescription = document.getElementById("searchDescription").value;
                if (_this.strSearchDescription != '') {
                    _this.strSearchDescription = _this.strSearchDescription.toLocaleLowerCase();
                    _this.skills = _this.skills.filter(function (x) { return x.Description != null && x.Description.toLocaleLowerCase().indexOf(_this.strSearchDescription) != -1; });
                }
            }
            //Logic for searching - End
            _this.indLoading = false;
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
        this.skill.SkillName = '';
        this.skill.SkillGroupID = 0;
        this.skill.Description = '';
        this.skill.Level = [];
        this.skill.Status = false;
        this.dbops = enum_1.DBOperation.create;
        this.modalTitle = "Add New Skill";
        this.modalBtnTitle = "Add";
        this.SetControlsState(false);
        this.modal.open();
    };
    SkillComponent.prototype.EditSkill = function (id) {
        this.dbops = enum_1.DBOperation.update;
        this.modalTitle = "Edit Skill";
        this.modalBtnTitle = "Update";
        this.skill.Id = id;
        this.skill.SkillName = this.skills.filter(function (x) { return x.Id == id; })[0].SkillName;
        this.skill.SkillGroupID = this.skills.filter(function (x) { return x.Id == id; })[0].SkillGroupID;
        this.skill.Description = this.skills.filter(function (x) { return x.Id == id; })[0].Description;
        this.skill.Status = this.skills.filter(function (x) { return x.Id == id; })[0].Status;
        this.TempLevel = this.skills.filter(function (x) { return x.Id == id; })[0].Level.toString().split(',');
        this.skill.Level = [];
        for (var _i = 0, _a = this.TempLevel; _i < _a.length; _i++) {
            var item = _a[_i];
            this.skill.Level.push(Number(item));
        }
        this.modal.open();
    };
    SkillComponent.prototype.DeleteSkill = function (id, status) {
        this.dbops = enum_1.DBOperation.delete;
        if (status == true) {
            this.modalTitle = "Confirm to Delete?";
            this.modalBtnTitle = "Delete";
        }
        else {
            this.modalTitle = "Confirm to Undo Delete?";
            this.modalBtnTitle = "Undo Delete";
        }
        this.skill.Id = id;
        this.skill.SkillName = this.skills.filter(function (x) { return x.Id == id; })[0].SkillName;
        this.skill.SkillGroupID = this.skills.filter(function (x) { return x.Id == id; })[0].SkillGroupID;
        this.skill.Description = this.skills.filter(function (x) { return x.Id == id; })[0].Description;
        this.skill.Status = this.skills.filter(function (x) { return x.Id == id; })[0].Status;
        this.TempLevel = this.skills.filter(function (x) { return x.Id == id; })[0].Level.toString().split(',');
        this.skill.Level = [];
        for (var _i = 0, _a = this.TempLevel; _i < _a.length; _i++) {
            var item = _a[_i];
            this.skill.Level.push(Number(item));
        }
        this.SetControlsState(true);
        this.modal.open();
    };
    SkillComponent.prototype.SetControlsState = function (isEnable) {
        isEnable ? this.ControlIsDisable = true : this.ControlIsDisable = false;
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
            //this.JumpOnPage(1);
            //this.pager = this.pagerService.pager;
            //this.pagedItems = this.pagerService.pagedItems;
        }
        //,error => this.msg = <any>error
        );
    };
    SkillComponent.prototype.ShowHideSearchControls = function () {
        this.ShowHideSearch = !this.ShowHideSearch;
    };
    SkillComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        this.msg = "";
        if (formData.SkillGroupID != 0 && formData.Level.length > 0) {
            switch (this.dbops) {
                case enum_1.DBOperation.create:
                    this._SkillService.post(global_1.Global.BASE_SKILL_ENDPOINT, formData).subscribe(function (data) {
                        if (data.startsWith("Success: ")) {
                            _this.msg = data;
                            _this.ResetModel();
                            _this.LoadSkill();
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
                    this._SkillService.put(global_1.Global.BASE_SKILL_ENDPOINT, formData.Id, formData).subscribe(function (data) {
                        if (data.startsWith("Success: ")) {
                            _this.msg = data;
                            _this.LoadSkill();
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
                    this._SkillService.delete(global_1.Global.BASE_SKILL_ENDPOINT, formData.Id).subscribe(function (data) {
                        if (data.startsWith("Success: ")) {
                            _this.LoadSkill();
                            _this.msg = "Skill status changed successfully.";
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
        __metadata("design:paramtypes", [forms_1.FormBuilder, Skill_service_1.SkillService, pager_index_1.PagerService, CommonHelper_service_1.CommonHelperService])
    ], SkillComponent);
    return SkillComponent;
}());
exports.SkillComponent = SkillComponent;
