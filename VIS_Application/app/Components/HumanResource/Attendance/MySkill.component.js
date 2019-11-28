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
var MySkill_service_1 = require("../../../Service/HumanResource/Attendance/MySkill.service");
var forms_1 = require("@angular/forms");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var enum_1 = require("../../../Shared/enum");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw"); // fixed typo
var global_1 = require("../../../Shared/global");
var pager_index_1 = require("../../../Shared/pager.index");
var MySkillComponent = (function () {
    function MySkillComponent(fb, _MySkillService, pagerService) {
        this.fb = fb;
        this._MySkillService = _MySkillService;
        this.pagerService = pagerService;
        this.indLoading = false;
        this.isDesc = false;
        this.column = 'SkillName';
        this.CurrentRecordsPerPage = 10;
        // pager object
        this.pager = {};
        //Variables for Filter
        this.ShowHideSearch = false;
    }
    MySkillComponent.prototype.ngOnInit = function () {
        this.MySkillFrm = this.fb.group({
            CompanyId: [''],
            mode: [''],
            UserID: [''],
            SkillName: [''],
            SkillGroup: [''],
            Skilltext: [''],
            SkillID: [''],
            lookupSkilId: [''],
            Name: [''],
            status: [''],
            IsApproved: [''],
            id: [''],
        });
        this.LoadMySkills(21);
    };
    MySkillComponent.prototype.MySkillFilterCriteriaChange = function (value) {
        if (value != '[object Event]')
            this.MySkillFilter = value;
    };
    MySkillComponent.prototype.MySkillSort = function (property) {
        if (!this.ShowHideSearch) {
            this.isDesc = !this.isDesc;
            this.column = property;
            this.direction = this.isDesc ? 1 : -1;
        }
    };
    MySkillComponent.prototype.deleteNewSkill = function (SkillID, UserId) {
        var _this = this;
        this.indLoading = true;
        this._MySkillService.DeleteSkill(global_1.Global.BASE_MySkill_ENDPOINT, SkillID, 21)
            .subscribe(function (data) {
            if (data.startsWith("Success: ")) {
                _this.msg = data;
                _this.LoadMySkills(21);
            }
            else {
                alert(data);
            }
            _this.indLoading = false;
            // initialize to page 1
            //this.JumpOnPageNewSkill(1);
        }
        //,error => this.msg = <any>error
        );
    };
    MySkillComponent.prototype.LoadChildgrop = function () {
        var _this = this;
        this.indLoading = true;
        this._MySkillService.GetPopupChildSkill(global_1.Global.BASE_MySkill_ENDPOINT)
            .subscribe(function (data) {
            _this.Childdata = data;
            _this.indLoading = false;
        });
    };
    MySkillComponent.prototype.LoadSkillName = function (event) {
        var _this = this;
        this.indLoading = true;
        this._MySkillService.GetPopupSecondSkill(global_1.Global.BASE_MySkill_ENDPOINT, event.target.value)
            .subscribe(function (data) {
            _this.SecondData = data;
            _this.indLoading = false;
        });
    };
    MySkillComponent.prototype.LoadMySkills = function (UserId) {
        var _this = this;
        this.indLoading = true;
        this._MySkillService.GetMySkill(global_1.Global.BASE_MySkill_ENDPOINT, UserId)
            .subscribe(function (MySkills) {
            _this.MySkills = MySkills;
            console.log(MySkills);
            //Logic for searching - start
            if (_this.ShowHideSearch) {
                _this.searchSkillName = document.getElementById("searchSkillName").value;
                if (_this.searchSkillName != '') {
                    _this.searchSkillName = _this.searchSkillName.toLocaleLowerCase();
                    _this.MySkills = _this.MySkills.filter(function (x) { return x.SkillName != null && x.SkillName.toLocaleLowerCase().indexOf(_this.searchSkillName) != -1; });
                }
            }
            if (_this.ShowHideSearch) {
                _this.searchSkillGroupName = document.getElementById("searchSkillGroupName").value;
                if (_this.searchSkillGroupName != '') {
                    _this.searchSkillGroupName = _this.searchSkillGroupName.toLocaleLowerCase();
                    _this.MySkills = _this.MySkills.filter(function (x) { return x.SkillName != null && x.SkillName.toLocaleLowerCase().indexOf(_this.searchSkillGroupName) != -1; });
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
    MySkillComponent.prototype.addMySkill = function () {
        this.dbops = enum_1.DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New MySkill";
        this.modalBtnTitle = "Add";
        this.MySkillFrm.reset();
        this.modal.open();
        this.LoadChildgrop();
    };
    MySkillComponent.prototype.editMySkill = function (id) {
        this.dbops = enum_1.DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit MySkill";
        this.modalBtnTitle = "Update";
        this.MySkillFrm.setValue(this.MySkill);
        this.modal.open();
    };
    MySkillComponent.prototype.deleteMySkill = function (id, status) {
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
        this.MySkillFrm.setValue(this.MySkill);
        this.modal.open();
    };
    MySkillComponent.prototype.SetControlsState = function (isEnable) {
        isEnable ? this.MySkillFrm.enable() : this.MySkillFrm.disable();
    };
    MySkillComponent.prototype.ChangeRecordsPerPage = function (RecordsPerPage) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    };
    MySkillComponent.prototype.JumpOnPage = function (PageNumber) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.MySkills);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;
    };
    MySkillComponent.prototype.ShowHideSearchControls = function () {
        this.ShowHideSearch = !this.ShowHideSearch;
    };
    MySkillComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        this.msg = "";
        switch (this.dbops) {
            case enum_1.DBOperation.create:
                this._MySkillService.post(global_1.Global.BASE_MySkill_ENDPOINT, formData._value).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = data;
                        _this.LoadMySkills(21);
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
                this._MySkillService.put(global_1.Global.BASE_MySkill_ENDPOINT, formData._value.Id, formData._value).subscribe(function (data) {
                    if (data == "Success") {
                        _this.msg = "MySkill modified successfully.";
                    }
                    else {
                        _this.msg = "Error has occurred while modifying existing MySkill!";
                    }
                    _this.modal.dismiss();
                }, function (error) {
                    _this.msg = error;
                });
                break;
            case enum_1.DBOperation.delete:
                this._MySkillService.DeleteSkill(global_1.Global.BASE_MySkill_ENDPOINT, formData._value.UserId, formData._value.SkillID).subscribe(function (data) {
                    if (data == "Success") {
                        _this.msg = "MySkill status changed successfully.";
                    }
                    else {
                        _this.msg = "Error has occurred while changing status of existing MySkill!";
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
    ], MySkillComponent.prototype, "modal", void 0);
    MySkillComponent = __decorate([
        core_1.Component({
            providers: [MySkill_service_1.MySkillService],
            templateUrl: 'app/Components/HumanResource/Attendance/MySkill.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, MySkill_service_1.MySkillService, pager_index_1.PagerService])
    ], MySkillComponent);
    return MySkillComponent;
}());
exports.MySkillComponent = MySkillComponent;
