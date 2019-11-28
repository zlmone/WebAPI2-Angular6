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
var MyTeam_service_1 = require("../../../Service/HumanResource/Attendance/MyTeam.service");
var forms_1 = require("@angular/forms");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var enum_1 = require("../../../Shared/enum");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw"); // fixed typo
var global_1 = require("../../../Shared/global");
var pager_index_1 = require("../../../Shared/pager.index");
var MyTeamComponent = (function () {
    function MyTeamComponent(fb, _MyTeamService, pagerService) {
        this.fb = fb;
        this._MyTeamService = _MyTeamService;
        this.pagerService = pagerService;
        this.indLoading = false;
        this.isDesc = false;
        this.column = 'SkillName';
        this.CurrentRecordsPerPage = 10;
        // pager object
        this.pager = {};
        //Variables for Filter
        this.ShowHideSearch = false;
        this.ShowHideSearchNew = false;
    }
    MyTeamComponent.prototype.ngOnInit = function () {
        this.MyTeamFrm = this.fb.group({
            CompanyId: [''],
            mode: [''],
            UserID: [''],
            Name: [''],
            NumberOfSkill: [''],
            NumberToBeApproved: [''],
            SkillName: [''],
            SkillGroup: [''],
            leavel: [''],
            SkillID: [''],
            id: [''],
            IsApproved: [''],
            Status: [''],
        });
        this.LoadMyTeams(21);
    };
    MyTeamComponent.prototype.MyTeamFilterCriteriaChange = function (value) {
        if (value != '[object Event]')
            this.MyTeamFilter = value;
    };
    MyTeamComponent.prototype.MyTeamSort = function (property) {
        if (!this.ShowHideSearch) {
            this.isDesc = !this.isDesc;
            this.column = property;
            this.direction = this.isDesc ? 1 : -1;
        }
    };
    MyTeamComponent.prototype.MyTeamSortNew = function (property) {
        if (!this.ShowHideSearchNew) {
            this.isDesc = !this.isDesc;
            this.column = property;
            this.direction = this.isDesc ? 1 : -1;
        }
    };
    MyTeamComponent.prototype.MouseHover = function (id) {
        var _this = this;
        //this.LoadhoverPopup(event.target.value);
        this.indLoading = true;
        this._MyTeamService.GetHoverPopup(global_1.Global.BASE_MyTeam_ENDPOINT, id)
            .subscribe(function (data) {
            _this.HoverList = data;
            console.log(data);
            //Logic for searching - End
            _this.indLoading = false;
            // initialize to page 1
            _this.JumpOnPage(1);
        }
        //,error => this.msg = <any>error
        );
    };
    MyTeamComponent.prototype.LoadMyTeams = function (UserId) {
        var _this = this;
        this.indLoading = true;
        this._MyTeamService.GetMyTeam(global_1.Global.BASE_MyTeam_ENDPOINT, UserId)
            .subscribe(function (MyTeams) {
            _this.MyTeams = MyTeams;
            console.log(MyTeams);
            //Logic for searching - start
            if (_this.ShowHideSearch) {
                _this.searchName = document.getElementById("searchName").value;
                if (_this.searchName != '') {
                    _this.searchName = _this.searchName.toLocaleLowerCase();
                    _this.MyTeams = _this.MyTeams.filter(function (x) { return x.Name != null && x.Name.toLocaleLowerCase().indexOf(_this.searchName) != -1; });
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
    MyTeamComponent.prototype.addMyTeam = function () {
        this.dbops = enum_1.DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New MyTeam";
        this.modalBtnTitle = "Add";
        this.MyTeamFrm.reset();
        this.modal.open();
    };
    MyTeamComponent.prototype.editMyTeam = function (id) {
        var _this = this;
        debugger;
        this.dbops = enum_1.DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit MyTeam";
        this.modalBtnTitle = "Update";
        this.indLoading = true;
        this._MyTeamService.GetLinemanager(global_1.Global.BASE_MyTeam_ENDPOINT, id)
            .subscribe(function (Linemangers) {
            _this.Linemangers = Linemangers;
            //Logic for searching - start
            if (_this.ShowHideSearchNew) {
                _this.searchSkillName = document.getElementById("searchSkillName").value;
                if (_this.searchSkillName != '') {
                    _this.searchSkillName = _this.searchSkillName.toLocaleLowerCase();
                    _this.Linemangers = _this.Linemangers.filter(function (x) { return x.SkillName != null && x.SkillName.toLocaleLowerCase().indexOf(_this.searchName) != -1; });
                }
                _this.searchSkillGroup = document.getElementById("searchSkillGroup").value;
                if (_this.searchSkillGroup != '') {
                    _this.searchSkillGroup = _this.searchSkillGroup.toLocaleLowerCase();
                    _this.Linemangers = _this.Linemangers.filter(function (x) { return x.SkillGroup != null && x.SkillGroup.toLocaleLowerCase().indexOf(_this.searchSkillGroup) != -1; });
                }
            }
            //Logic for searching - End
            _this.indLoading = false;
            // initialize to page 1
        }
        //,error => this.msg = <any>error
        );
        this.modal.open();
    };
    MyTeamComponent.prototype.GetSkillOrderLeavel = function (SkillId) {
        var _this = this;
        if (SkillId != null) {
            this._MyTeamService.GetSkill(global_1.Global.BASE_MyTeam_ENDPOINT, SkillId)
                .subscribe(function (Skillleavels) {
                _this.Skillleavels = Skillleavels;
                //Logic for searching - End
                _this.indLoading = false;
                // initialize to page 1
            }
            //,error => this.msg = <any>error
            );
        }
        else {
            alert(SkillId);
        }
    };
    MyTeamComponent.prototype.deleteMyTeam = function (id, status) {
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
        this.MyTeamFrm.setValue(this.MyTeam);
        this.modal.open();
    };
    MyTeamComponent.prototype.SetControlsState = function (isEnable) {
        isEnable ? this.MyTeamFrm.enable() : this.MyTeamFrm.disable();
    };
    MyTeamComponent.prototype.ChangeRecordsPerPage = function (RecordsPerPage) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    };
    MyTeamComponent.prototype.JumpOnPage = function (PageNumber) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.MyTeams);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;
    };
    MyTeamComponent.prototype.ShowHideSearchControls = function () {
        this.ShowHideSearch = !this.ShowHideSearch;
    };
    MyTeamComponent.prototype.ShowHideSearchControlsNew = function () {
        this.ShowHideSearchNew = !this.ShowHideSearchNew;
    };
    MyTeamComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        this.msg = "";
        switch (this.dbops) {
            case enum_1.DBOperation.create:
                this._MyTeamService.post(global_1.Global.BASE_MyTeam_ENDPOINT, formData._value).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = data;
                        _this.LoadMyTeams(21);
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
                this._MyTeamService.put(global_1.Global.BASE_MyTeam_ENDPOINT, formData._value.Id, formData._value).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = data;
                        _this.LoadMyTeams(21);
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
                this._MyTeamService.delete(global_1.Global.BASE_MyTeam_ENDPOINT, formData._value.Id).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = data;
                        _this.LoadMyTeams(21);
                        _this.modal.dismiss();
                    }
                    else {
                        alert(data);
                    }
                }, function (error) {
                    _this.msg = error;
                });
                break;
        }
    };
    __decorate([
        core_1.ViewChild('modal'),
        __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
    ], MyTeamComponent.prototype, "modal", void 0);
    MyTeamComponent = __decorate([
        core_1.Component({
            providers: [MyTeam_service_1.MyTeamService],
            templateUrl: 'app/Components/HumanResource/Attendance/MyTeam.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, MyTeam_service_1.MyTeamService, pager_index_1.PagerService])
    ], MyTeamComponent);
    return MyTeamComponent;
}());
exports.MyTeamComponent = MyTeamComponent;
