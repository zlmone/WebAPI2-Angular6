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
var SecurityKey_service_1 = require("../../../service/Masters/Configuration/SecurityKey.service");
var forms_1 = require("@angular/forms");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var enum_1 = require("../../../Shared/enum");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw"); // fixed typo
var global_1 = require("../../../Shared/global");
var pager_index_1 = require("../../../Shared/pager.index");
var CommonHelper_service_1 = require("../../../Shared/CommonHelper.service");
var SecurityKeyComponent = (function () {
    function SecurityKeyComponent(fb, _SecurityKeyService, pagerService, _CommonHelperService) {
        this.fb = fb;
        this._SecurityKeyService = _SecurityKeyService;
        this.pagerService = pagerService;
        this._CommonHelperService = _CommonHelperService;
        this.indLoading = false;
        this.isDesc = false;
        this.column = 'Key1';
        // pager object
        this.pager = {};
        this.CurrentRecordsPerPage = 10;
        //Variables for Filter
        this.ShowHideSearch = false;
    }
    SecurityKeyComponent.prototype.ngOnInit = function () {
        this._CommonHelperService.ToogleMenu();
        this.securitykey =
            ({
                Id: 0,
                Key1: '',
                Key2: '',
                Key3: '',
                Key4: '',
                Key5: '',
                UniqueKey: '',
                Active: false,
                IsActive: false,
                CreatedOn: null,
                UpdatedOn: null,
                CreatedBy: '',
                UpdatedBy: '',
            });
        this.LoadSecurityKey();
        this.InputNavigator();
    };
    SecurityKeyComponent.prototype.CancelModel = function () {
        this.modal.dismiss();
        this.securitykey =
            ({
                Id: 0,
                Key1: '',
                Key2: '',
                Key3: '',
                Key4: '',
                Key5: '',
                UniqueKey: '',
                Active: false,
                IsActive: false,
                CreatedOn: null,
                UpdatedOn: null,
                CreatedBy: '',
                UpdatedBy: '',
            });
    };
    SecurityKeyComponent.prototype.InputNavigator = function () {
        $(function () {
            $("#Key1").keyup(function () {
                if ($("#Key1").val().length == 4) {
                    $("#Key2").focus();
                }
            });
            $("#Key2").keyup(function () {
                if ($("#Key2").val().length == 4) {
                    $("#Key3").focus();
                }
            });
            $("#Key3").keyup(function () {
                if ($("#Key3").val().length == 4) {
                    $("#Key4").focus();
                }
            });
            $("#Key4").keyup(function () {
                if ($("#Key4").val().length == 4) {
                    $("#Key5").focus();
                }
            });
        });
    };
    SecurityKeyComponent.prototype.SecurityKeyFilterCriteriaChange = function (value) {
        if (value != '[object Event]')
            this.SecurityKeyFilter = value;
    };
    SecurityKeyComponent.prototype.SecurityKeySort = function (property) {
        if (!this.ShowHideSearch) {
            this.isDesc = !this.isDesc;
            this.column = property;
            this.direction = this.isDesc ? 1 : -1;
        }
    };
    ;
    SecurityKeyComponent.prototype.GenrateUniqueKey = function (formData) {
        var _this = this;
        if (formData.Key1.length == 4 && formData.Key2.length == 4 && formData.Key3.length == 4 && formData.Key4.length == 4 && formData.Key5.length == 4) {
            this._SecurityKeyService.GenrateSecurityKey(global_1.Global.BASE_SECURITYKEY_ENDPOINT, formData).subscribe(function (securitykeyunique) {
                _this.securitykey.UniqueKey = securitykeyunique;
            }, function (error) {
                _this.msg = error;
            });
        }
    };
    SecurityKeyComponent.prototype.LoadSecurityKey = function () {
        var _this = this;
        this.indLoading = true;
        this._SecurityKeyService.get(global_1.Global.BASE_SECURITYKEY_ENDPOINT)
            .subscribe(function (securitykeys) {
            _this.securitykeys = securitykeys;
            //Logic for searching - start
            if (_this.ShowHideSearch) {
                _this.strSearchKey1 = document.getElementById("searchKey1").value;
                if (_this.strSearchKey1 != '') {
                    _this.strSearchKey1 = _this.strSearchKey1.toLocaleLowerCase();
                    _this.securitykeys = _this.securitykeys.filter(function (x) { return x.Key1 != null && x.Key1.toLocaleLowerCase().indexOf(_this.strSearchKey1) != -1; });
                }
                _this.strSearchKey2 = document.getElementById("searchKey2").value;
                if (_this.strSearchKey2 != '') {
                    _this.strSearchKey2 = _this.strSearchKey2.toLocaleLowerCase();
                    _this.securitykeys = _this.securitykeys.filter(function (x) { return x.Key2 != null && x.Key2.toLocaleLowerCase().indexOf(_this.strSearchKey2) != -1; });
                }
                _this.strSearchKey3 = document.getElementById("searchKey3").value;
                if (_this.strSearchKey3 != '') {
                    _this.strSearchKey3 = _this.strSearchKey3.toLocaleLowerCase();
                    _this.securitykeys = _this.securitykeys.filter(function (x) { return x.Key3 != null && x.Key3.toLocaleLowerCase().indexOf(_this.strSearchKey3) != -1; });
                }
                _this.strSearchKey4 = document.getElementById("searchKey4").value;
                if (_this.strSearchKey4 != '') {
                    _this.strSearchKey4 = _this.strSearchKey4.toLocaleLowerCase();
                    _this.securitykeys = _this.securitykeys.filter(function (x) { return x.Key4 != null && x.Key4.toLocaleLowerCase().indexOf(_this.strSearchKey4) != -1; });
                }
                _this.strSearchKey5 = document.getElementById("searchKey5").value;
                if (_this.strSearchKey5 != '') {
                    _this.strSearchKey5 = _this.strSearchKey5.toLocaleLowerCase();
                    _this.securitykeys = _this.securitykeys.filter(function (x) { return x.Key5 != null && x.Key5.toLocaleLowerCase().indexOf(_this.strSearchKey5) != -1; });
                }
            }
            //Logic for searching - End
            _this.indLoading = false;
            _this.JumpOnPage(1);
        }
        //,error => this.msg = <any>error
        );
    };
    SecurityKeyComponent.prototype.AddSecurityKey = function () {
        this.dbops = enum_1.DBOperation.create;
        //this.SetControlsState(true);
        this.modalTitle = "Add New SecurityKey";
        this.modalBtnTitle = "Add";
        //this.SecurityKeyFrm.reset();
        this.modal.open();
    };
    SecurityKeyComponent.prototype.EditSecurityKey = function (id) {
        this.dbops = enum_1.DBOperation.update;
        //this.SetControlsState(true);
        this.modalTitle = "Edit SecurityKey";
        this.modalBtnTitle = "Update";
        this.securitykey = this.securitykeys.filter(function (x) { return x.Id == id; })[0];
        this.modal.open();
    };
    SecurityKeyComponent.prototype.DeleteSecurityKey = function (id, status) {
        this.dbops = enum_1.DBOperation.delete;
        if (status == true) {
            this.modalTitle = "Confirm to Delete?";
            this.modalBtnTitle = "Delete";
        }
        else {
            this.modalTitle = "Confirm to Undo Delete?";
            this.modalBtnTitle = "Undo Delete";
        }
        this.securitykey = this.securitykeys.filter(function (x) { return x.Id == id; })[0];
        //this.SecurityKeyFrm.setValue(this.securitykey);
        this.modal.open();
    };
    SecurityKeyComponent.prototype.SetControlsState = function () {
    };
    SecurityKeyComponent.prototype.ChangeRecordsPerPage = function (RecordsPerPage) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    };
    SecurityKeyComponent.prototype.JumpOnPage = function (PageNumber) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.securitykeys);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;
    };
    SecurityKeyComponent.prototype.ShowHideSearchControls = function () {
        this.ShowHideSearch = !this.ShowHideSearch;
    };
    SecurityKeyComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        this.msg = "";
        switch (this.dbops) {
            case enum_1.DBOperation.create:
                this._SecurityKeyService.post(global_1.Global.BASE_SECURITYKEY_ENDPOINT, formData).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.CancelModel();
                        _this.msg = data;
                        _this.LoadSecurityKey();
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
                this._SecurityKeyService.put(global_1.Global.BASE_SECURITYKEY_ENDPOINT, formData).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.CancelModel();
                        _this.msg = data;
                        _this.LoadSecurityKey();
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
                this._SecurityKeyService.delete(global_1.Global.BASE_SECURITYKEY_ENDPOINT, formData).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.CancelModel();
                        _this.msg = "SecurityKey status changed successfully.";
                        _this.LoadSecurityKey();
                    }
                    else {
                        _this.msg = "Error has occurred while changing status of existing SecurityKey!";
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
    ], SecurityKeyComponent.prototype, "modal", void 0);
    SecurityKeyComponent = __decorate([
        core_1.Component({
            providers: [SecurityKey_service_1.SecurityKeyService],
            templateUrl: 'app/Components/Masters/Configuration/SecurityKey.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, SecurityKey_service_1.SecurityKeyService, pager_index_1.PagerService, CommonHelper_service_1.CommonHelperService])
    ], SecurityKeyComponent);
    return SecurityKeyComponent;
}());
exports.SecurityKeyComponent = SecurityKeyComponent;
