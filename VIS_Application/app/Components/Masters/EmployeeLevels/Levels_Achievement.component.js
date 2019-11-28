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
var Levels_Achievement_service_1 = require("../../../service/Masters/EmployeeLevels/Levels_Achievement.service");
var LevelCriteriaSetup_service_1 = require("../../../service/Masters/EmployeeLevels/LevelCriteriaSetup.service");
var forms_1 = require("@angular/forms");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var enum_1 = require("../../../Shared/enum");
var Rx_1 = require("rxjs/Rx");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw"); // fixed typo
var global_1 = require("../../../Shared/global");
var pager_index_1 = require("../../../Shared/pager.index");
var http_1 = require("@angular/http");
var Levels_AchievementComponent = (function () {
    function Levels_AchievementComponent(fb, _Levels_AchievementService, _LevelCriteriaSetupService, pagerService, http) {
        this.fb = fb;
        this._Levels_AchievementService = _Levels_AchievementService;
        this._LevelCriteriaSetupService = _LevelCriteriaSetupService;
        this.pagerService = pagerService;
        this.http = http;
        this.indLoading = false;
        this.isDesc = false;
        this.column = 'LevelName';
        // pager object
        this.pager = {};
        this.CurrentRecordsPerPage = 10;
        //Variables for Filter
        this.ShowHideSearch = false;
    }
    Levels_AchievementComponent.prototype.fileChange1 = function (event) {
        this.fileList1 = event.target.files;
    };
    Levels_AchievementComponent.prototype.ngOnInit = function () {
        this.Levels_AchievementFrm = this.fb.group({
            Id: [''],
            CompanyId: [''],
            Range: [''],
            CriteriaId: [''],
            CriteriaName: [''],
            CalculatedIn: [''],
            SelectActive: [''],
            AchievementName: [''],
            SetUpID: [''],
            IsCriteria: [''],
            AndAbove: [''],
            Description: [''],
            Help: [''],
            Calculated: [''],
            AchievedIn: [''],
            Points: [''],
            Image: [''],
            Active: [''],
            IsActive: [''],
            LevelSetupId: [''],
            CreatedBy: [''],
            CreatedOn: [''],
            UpdatedBy: [''],
            UpdatedOn: [''],
            EntityMessage: ['']
        });
        this.LoadLevels_Achievements();
        this.LoadCriteria();
    };
    Levels_AchievementComponent.prototype.Levels_AchievementSearchCriteriaChange = function (value) {
        if (value != '[object Event]')
            this.Levels_AchievementFilter = value;
    };
    Levels_AchievementComponent.prototype.Levels_AchievementSort = function (property) {
        if (!this.ShowHideSearch) {
            this.isDesc = !this.isDesc;
            this.column = property;
            this.direction = this.isDesc ? 1 : -1;
        }
    };
    Levels_AchievementComponent.prototype.ShowHideSearchControls = function () {
        this.ShowHideSearch = !this.ShowHideSearch;
    };
    Levels_AchievementComponent.prototype.LoadCriteria = function () {
        var _this = this;
        this.indLoading = true;
        this._LevelCriteriaSetupService.getCriteria(global_1.Global.BASE_LEVELCRITERIASETUP_ENDPOINT)
            .subscribe(function (DATA) {
            _this.LevelCriteriaSetupForDll = DATA;
        }
        //,error => this.msg = <any>error
        );
    };
    Levels_AchievementComponent.prototype.LoadLevels_Achievements = function () {
        var _this = this;
        this.VisibleCriteria = false;
        this.indLoading = true;
        this._Levels_AchievementService.get(global_1.Global.BASE_Levels_Achievement_ENDPOINT)
            .subscribe(function (Levels_Achievements) {
            debugger;
            _this.Levels_Achievements = Levels_Achievements;
            //Logic for searching - start
            if (_this.ShowHideSearch) {
                _this.strSearchAchievementName = document.getElementById("searchAchievementName").value;
                if (_this.strSearchAchievementName != '') {
                    _this.strSearchAchievementName = _this.strSearchAchievementName.toLocaleLowerCase();
                    _this.Levels_Achievements = _this.Levels_Achievements.filter(function (x) { return x.AchievementName != null && x.AchievementName.toLocaleLowerCase().indexOf(_this.strSearchAchievementName) != -1; });
                }
                _this.strSearchCriteriaName = document.getElementById("searchCriteriaName").value;
                if (_this.strSearchCriteriaName != '') {
                    _this.strSearchCriteriaName = _this.strSearchCriteriaName.toLocaleLowerCase();
                    _this.Levels_Achievements = _this.Levels_Achievements.filter(function (x) { return x.CriteriaName != null && x.CriteriaName.toLocaleLowerCase().indexOf(_this.strSearchCriteriaName) != -1; });
                }
                _this.strSearchCalculatedIn = document.getElementById("searchCalculatedIn").value;
                if (_this.strSearchCalculatedIn != '') {
                    _this.strSearchCalculatedIn = _this.strSearchCalculatedIn.toLocaleLowerCase();
                    _this.Levels_Achievements = _this.Levels_Achievements.filter(function (x) { return x.CalculatedIn != null && x.CalculatedIn.toLocaleLowerCase().indexOf(_this.strSearchCalculatedIn) != -1; });
                }
                _this.strSearchSelectActive = document.getElementById("searchActive").value;
                if (_this.strSearchSelectActive != '') {
                    _this.strSearchSelectActive = _this.strSearchSelectActive.toLocaleLowerCase();
                    _this.Levels_Achievements = _this.Levels_Achievements.filter(function (x) { return x.SelectActive != null && x.SelectActive.toLocaleLowerCase().indexOf(_this.strSearchSelectActive) != -1; });
                }
            }
            _this.indLoading = false;
            // initialize to page 1
            _this.JumpOnPage(1);
        }
        //,error => this.msg = <any>error
        );
    };
    Levels_AchievementComponent.prototype.ChangeCriteria = function (value) {
        var _this = this;
        this.VisibleCriteria = false;
        this.indLoading = true;
        this._Levels_AchievementService.getIsCriteria(global_1.Global.BASE_Levels_Achievement_ENDPOINT, value)
            .subscribe(function (Data) {
            _this.IsCriteriaList = Data;
            if (_this.IsCriteriaList.length > 1) {
                _this.VisibleCriteria = true;
            }
            else {
                _this.VisibleCriteria = false;
            }
        }
        //,error => this.msg = <any>error
        );
    };
    Levels_AchievementComponent.prototype.addLevels_Achievement = function () {
        this.imagePath = null;
        this.dbops = enum_1.DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New Achievement";
        this.modalBtnTitle = "Add";
        this.Levels_AchievementFrm.reset();
        this.modal.open();
    };
    Levels_AchievementComponent.prototype.editLevels_Achievement = function (id) {
        var _this = this;
        this.ImgGlobalPath = global_1.Global.WebAccessURL;
        this.dbops = enum_1.DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit Achievement";
        this.modalBtnTitle = "Update";
        this.Levels_Achievement = this.Levels_Achievements.filter(function (x) { return x.Id == id; })[0];
        this._Levels_AchievementService.GetDataOnEdit(global_1.Global.BASE_Levels_Achievement_ENDPOINT, this.Levels_Achievement.Id)
            .subscribe(function (Levels_Achieve) {
            _this.Levels_AchievementEdit = Levels_Achieve[0];
            _this.Levels_AchievementsForImage = _this.Levels_AchievementEdit;
            _this.imagePath = _this.Levels_AchievementEdit.Image;
            _this.Levels_AchievementEdit.Image = null;
            if (_this.Levels_AchievementEdit.IsCriteria) {
                _this.Levels_AchievementEdit.CriteriaId = _this.Levels_AchievementEdit.SetUpID;
                _this.VisibleCriteria = false;
            }
            else {
                _this.VisibleCriteria = true;
                _this.ChangeCriteria(_this.Levels_AchievementEdit.CriteriaId);
                _this.Levels_AchievementEdit.Range = _this.Levels_AchievementEdit.SetUpID;
            }
            _this.Levels_AchievementFrm.setValue(_this.Levels_AchievementEdit);
            _this.modal.open();
            _this.indLoading = false;
        }
        //,*error => this.msg = <any>error*/
        );
        // this.Levels_Achievement.Id = this.Levels_Achievement.AchievementID;
    };
    Levels_AchievementComponent.prototype.deleteLevels_Achievement = function (id, status) {
        debugger;
        this.dbops = enum_1.DBOperation.delete;
        this.SetControlsState(false);
        if (status == "Yes") {
            this.modalTitle = "Confirm to Delete?";
            this.modalBtnTitle = "Delete";
        }
        else {
            this.modalTitle = "Confirm to Undo Delete?";
            this.modalBtnTitle = "Undo Delete";
        }
        this.Levels_Achievement = this.Levels_Achievements.filter(function (x) { return x.Id == id; })[0];
        this.Levels_AchievementFrm.setValue(this.Levels_Achievement);
        this.modal.open();
    };
    Levels_AchievementComponent.prototype.SetControlsState = function (isEnable) {
        isEnable ? this.Levels_AchievementFrm.enable() : this.Levels_AchievementFrm.disable();
    };
    Levels_AchievementComponent.prototype.ChangeRecordsPerPage = function (RecordsPerPage) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    };
    Levels_AchievementComponent.prototype.JumpOnPage = function (PageNumber) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.Levels_Achievements);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;
    };
    Levels_AchievementComponent.prototype.GetSetupIdFromCriteriaId = function (CriteriaId) {
        var _this = this;
        this._LevelCriteriaSetupService.getLevelSetupId(global_1.Global.BASE_LEVELCRITERIASETUP_ENDPOINT, CriteriaId)
            .subscribe(function (Data) {
            _this.SetupId = Data;
        });
        return this.SetupId;
    };
    Levels_AchievementComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        this.msg = "";
        /////
        switch (this.dbops) {
            case enum_1.DBOperation.create:
                if (this.fileList1 != null) {
                    formData._value.Image = "/Upload/EmployeeLevels/" + this.fileList1.item(0).name;
                    if (this.VisibleCriteria == true) {
                        if (formData._value.Range > 0) {
                            formData._value.IsCriteria = false;
                            formData._value.SetUpID = formData._value.Range;
                            formData._value.AndAbove = true;
                            formData._value.LevelSetupId = formData._value.Range;
                        }
                        else {
                            formData._value.IsCriteria = true;
                            formData._value.SetUpID = formData._value.CriteriaId;
                            formData._value.AndAbove = false;
                            formData._value.LevelSetupId = this.GetSetupIdFromCriteriaId(formData._value.CriteriaId);
                        }
                    }
                    else {
                        formData._value.IsCriteria = true;
                        formData._value.SetUpID = formData._value.CriteriaId;
                        formData._value.AndAbove = false;
                        formData._value.LevelSetupId = this.GetSetupIdFromCriteriaId(formData._value.CriteriaId);
                    }
                    this._Levels_AchievementService.post(global_1.Global.BASE_Levels_Achievement_ENDPOINT, formData._value).subscribe(function (data) {
                        if (data.startsWith("Success: ")) {
                            if (_this.fileList1 != null) {
                                if (_this.fileList1.length > 0) {
                                    _this.fileList1.item(0).name;
                                    var file = _this.fileList1[0];
                                    var formData_1 = new FormData();
                                    formData_1.append('uploadFile', file, file.name);
                                    var headers = new http_1.Headers();
                                    var options = new http_1.RequestOptions({ headers: headers });
                                    var apiUrl1 = "/api/Levels_AchievementAPI/UploadJsonFile";
                                    _this.http.post(apiUrl1, formData_1, options)
                                        .map(function (res) { return res.json(); })
                                        .catch(function (error) { return Rx_1.Observable.throw(error); })
                                        .subscribe(function (data) { return console.log('success'); }, function (error) { return console.log(error); });
                                    _this.fileList1 = null;
                                }
                            }
                            _this.msg = data;
                            _this.LoadLevels_Achievements();
                            _this.modal.dismiss();
                        }
                        else {
                            alert(data);
                        }
                    }, function (error) {
                        _this.msg = error;
                    });
                }
                else {
                    alert('Please select Image file');
                }
                break;
            case enum_1.DBOperation.update:
                if (this.fileList1 != null) {
                    formData._value.Image = "/Upload/EmployeeLevels/" + this.fileList1.item(0).name;
                }
                if (this.VisibleCriteria == true) {
                    if (formData._value.Range > 0) {
                        formData._value.IsCriteria = false;
                        formData._value.SetUpID = formData._value.Range;
                        formData._value.AndAbove = true;
                        formData._value.LevelSetupId = formData._value.Range;
                    }
                    else {
                        formData._value.IsCriteria = true;
                        formData._value.SetUpID = formData._value.CriteriaId;
                        formData._value.AndAbove = false;
                        formData._value.LevelSetupId = this.GetSetupIdFromCriteriaId(formData._value.CriteriaId);
                    }
                }
                else {
                    formData._value.IsCriteria = true;
                    formData._value.SetUpID = formData._value.CriteriaId;
                    formData._value.AndAbove = false;
                    formData._value.LevelSetupId = this.GetSetupIdFromCriteriaId(formData._value.CriteriaId);
                }
                this._Levels_AchievementService.put(global_1.Global.BASE_Levels_Achievement_ENDPOINT, formData._value.Id, formData._value).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        if (_this.fileList1 != null) {
                            if (_this.fileList1.length > 0) {
                                _this.fileList1.item(0).name;
                                var file = _this.fileList1[0];
                                var formData_2 = new FormData();
                                formData_2.append('uploadFile', file, file.name);
                                var headers = new http_1.Headers();
                                var options = new http_1.RequestOptions({ headers: headers });
                                var apiUrl1 = "/api/Levels_AchievementAPI/UploadJsonFile";
                                _this.http.post(apiUrl1, formData_2, options)
                                    .map(function (res) { return res.json(); })
                                    .catch(function (error) { return Rx_1.Observable.throw(error); })
                                    .subscribe(function (data) { return console.log('success'); }, function (error) { return console.log(error); });
                                _this.fileList1 = null;
                            }
                        }
                        _this.msg = data;
                        _this.LoadLevels_Achievements();
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
                this._Levels_AchievementService.delete(global_1.Global.BASE_Levels_Achievement_ENDPOINT, formData._value.Id).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = "Levels_Achievement status changed successfully.";
                        _this.LoadLevels_Achievements();
                    }
                    else {
                        _this.msg = "Error has occurred while changing status of existing Levels_Achievement!";
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
    ], Levels_AchievementComponent.prototype, "modal", void 0);
    Levels_AchievementComponent = __decorate([
        core_1.Component({
            providers: [Levels_Achievement_service_1.Levels_AchievementService, LevelCriteriaSetup_service_1.LevelCriteriaSetupService],
            templateUrl: 'app/Components/Masters/EmployeeLevels/Levels_Achievement.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, Levels_Achievement_service_1.Levels_AchievementService, LevelCriteriaSetup_service_1.LevelCriteriaSetupService, pager_index_1.PagerService, http_1.Http])
    ], Levels_AchievementComponent);
    return Levels_AchievementComponent;
}());
exports.Levels_AchievementComponent = Levels_AchievementComponent;
