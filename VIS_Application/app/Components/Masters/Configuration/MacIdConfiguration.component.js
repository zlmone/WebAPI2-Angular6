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
var MacIdConfiguration_service_1 = require("../../../service/Masters/Configuration/MacIdConfiguration.service");
var forms_1 = require("@angular/forms");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var enum_1 = require("../../../Shared/enum");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw"); // fixed typo
var global_1 = require("../../../Shared/global");
var CommonHelper_service_1 = require("../../../Shared/CommonHelper.service");
var pager_index_1 = require("../../../Shared/pager.index");
var MacIdConfigurationComponent = (function () {
    function MacIdConfigurationComponent(fb, _MacIdConfigurationService, pagerService, _CommonHelperService) {
        this.fb = fb;
        this._MacIdConfigurationService = _MacIdConfigurationService;
        this.pagerService = pagerService;
        this._CommonHelperService = _CommonHelperService;
        this.indLoading = false;
        this.isDesc = false;
        this.column = 'Employee_Name';
        // pager object
        this.pager = {};
        this.CurrentRecordsPerPage = 10;
        //Variables for Filter
        this.ShowHideSearch = false;
    }
    MacIdConfigurationComponent.prototype.ResetModel = function () {
        this.macidconfiguration = {
            Active: false,
            ApprovalDate: null,
            ApprovedBy: '',
            CreatedBy: '',
            CreatedOn: null,
            Description: '',
            EmployeeId: 0,
            Employee_Name: '',
            Id: 0,
            IP1: '',
            IP2: '',
            IP3: '',
            IP4: '',
            IPAddress: '',
            IsActive: false,
            MacID: '',
            MacID1: '',
            MacID2: '',
            MacID3: '',
            MacID4: '',
            MacID5: '',
            MacID6: '',
            OfficeMacId: false,
            RequestedDate: null,
            UpdatedBy: '',
            UpdatedOn: null,
            Version: '',
            Version1: '',
            Version2: '',
            Version3: ''
        };
    };
    MacIdConfigurationComponent.prototype.ngOnInit = function () {
        this._CommonHelperService.ToogleMenu();
        this.ResetModel();
        this.LoadMacIdConfiguration();
        this.LoadEmployees();
        this.InputNavigator();
    };
    MacIdConfigurationComponent.prototype.MacIdConfigurationFilterCriteriaChange = function (value) {
        if (value != '[object Event]')
            this.MacIdConfigurationFilter = value;
    };
    MacIdConfigurationComponent.prototype.MackIdConfigurationSort = function (property) {
        if (!this.ShowHideSearch) {
            this.isDesc = !this.isDesc;
            this.column = property;
            this.direction = this.isDesc ? 1 : -1;
        }
    };
    ;
    MacIdConfigurationComponent.prototype.GetActiveRecord = function () {
        if ($("#rbtactive").prop("checked")) {
            this.macidconfigurations = this.macidconfigurationsbackup;
            this.macidconfigurations = this.macidconfigurations.filter(function (x) { return x.Active === true; });
            this.JumpOnPage(1);
        }
        else if ($("#rbtinactive").prop("checked")) {
            this.macidconfigurations = this.macidconfigurationsbackup;
            this.macidconfigurations = this.macidconfigurations.filter(function (x) { return x.Active === false; });
            this.JumpOnPage(1);
        }
        else {
            this.macidconfigurations = this.macidconfigurationsbackup;
            this.isDesc = true;
            this.MackIdConfigurationSort("Active");
            this.JumpOnPage(1);
        }
    };
    MacIdConfigurationComponent.prototype.LoadMacIdConfiguration = function () {
        var _this = this;
        this.indLoading = true;
        this._MacIdConfigurationService.get(global_1.Global.BASE_MACIDCONFIGURATION_ENDPOINT)
            .subscribe(function (macidconfigurations) {
            _this.macidconfigurations = macidconfigurations;
            _this.macidconfigurationsbackup = macidconfigurations;
            //Logic for searching - start
            if (_this.ShowHideSearch) {
                _this.strSearchEmployee_Name = document.getElementById("searchEmployee_Name").value;
                if (_this.strSearchEmployee_Name != '') {
                    _this.strSearchEmployee_Name = _this.strSearchEmployee_Name.toLocaleLowerCase();
                    _this.macidconfigurations = _this.macidconfigurations.filter(function (x) { return x.Employee_Name != null && x.Employee_Name.toLocaleLowerCase().indexOf(_this.strSearchEmployee_Name) != -1; });
                }
                _this.strSearchMacID = document.getElementById("searchMacID").value;
                if (_this.strSearchMacID != '') {
                    _this.strSearchMacID = _this.strSearchMacID.toLocaleLowerCase();
                    _this.macidconfigurations = _this.macidconfigurations.filter(function (x) { return x.MacID != null && x.MacID.toLocaleLowerCase().indexOf(_this.strSearchMacID) != -1; });
                }
                _this.strSearchIPAddress = document.getElementById("searchIPAddress").value;
                if (_this.strSearchIPAddress != '') {
                    _this.strSearchIPAddress = _this.strSearchIPAddress.toLocaleLowerCase();
                    _this.macidconfigurations = _this.macidconfigurations.filter(function (x) { return x.IPAddress != null && x.IPAddress.toLocaleLowerCase().indexOf(_this.strSearchIPAddress) != -1; });
                }
                _this.strSearchVersion = document.getElementById("searchVersion").value;
                if (_this.strSearchVersion != '') {
                    _this.strSearchVersion = _this.strSearchVersion.toLocaleLowerCase();
                    _this.macidconfigurations = _this.macidconfigurations.filter(function (x) { return x.Version != null && x.Version.toLocaleLowerCase().indexOf(_this.strSearchVersion) != -1; });
                }
            }
            //Logic for searching - End
            _this.indLoading = false;
            _this.JumpOnPage(1);
        }
        //,error => this.msg = <any>error
        );
    };
    MacIdConfigurationComponent.prototype.LoadEmployees = function () {
        var _this = this;
        this.indLoading = true;
        this._MacIdConfigurationService.getallemployee(global_1.Global.BASE_MACIDCONFIGURATION_ENDPOINT)
            .subscribe(function (employee) {
            _this.employees = employee;
            _this.indLoading = false;
        }
        //,error => this.msg = <any>error
        );
    };
    MacIdConfigurationComponent.prototype.AddMackId = function () {
        this.dbops = enum_1.DBOperation.create;
        this.modalTitle = "Add New MackId";
        this.modalBtnTitle = "Add";
        this.ResetModel();
        this.modal.open();
    };
    MacIdConfigurationComponent.prototype.EditMackId = function (id) {
        this.dbops = enum_1.DBOperation.update;
        this.modalTitle = "Edit MackId";
        this.modalBtnTitle = "Update";
        this.macidconfiguration = this.macidconfigurations.filter(function (x) { return x.Id == id; })[0];
        this.modal.open();
    };
    MacIdConfigurationComponent.prototype.DeleteMacId = function (id, status) {
        this.dbops = enum_1.DBOperation.delete;
        var confimation = confirm("Are you sure ?");
        if (confimation == true) {
            this.macidconfiguration.Id = id;
            this.onSubmit(this.macidconfiguration);
        }
    };
    MacIdConfigurationComponent.prototype.SetControlsState = function (isEnable) {
        isEnable ? this.MacIdConfigurationFrm.enable() : this.MacIdConfigurationFrm.disable();
    };
    MacIdConfigurationComponent.prototype.ChangeRecordsPerPage = function (RecordsPerPage) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    };
    MacIdConfigurationComponent.prototype.JumpOnPage = function (PageNumber) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.macidconfigurations);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;
    };
    MacIdConfigurationComponent.prototype.ShowHideSearchControls = function () {
        this.ShowHideSearch = !this.ShowHideSearch;
    };
    MacIdConfigurationComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        Number(formData.ApprovedBy = '21');
        formData.MacID = formData.MacID1 + '-' + formData.MacID2 + '-' + formData.MacID3 + '-' + formData.MacID4 + '-' + formData.MacID5 + '-' + formData.MacID6;
        formData.IPAddress = formData.IP1 + '.' + formData.IP2 + '.' + formData.IP3 + '.' + formData.IP4;
        formData.Version = formData.Version1 + '.' + formData.Version2 + '.' + formData.Version3;
        this.msg = "";
        switch (this.dbops) {
            case enum_1.DBOperation.create:
                this._MacIdConfigurationService.post(global_1.Global.BASE_MACIDCONFIGURATION_ENDPOINT, formData).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = data;
                        _this.LoadMacIdConfiguration();
                    }
                    else {
                        alert(data);
                    }
                    _this.modal.dismiss();
                }, function (error) {
                    _this.msg = error;
                });
                break;
            case enum_1.DBOperation.update:
                this._MacIdConfigurationService.put(global_1.Global.BASE_MACIDCONFIGURATION_ENDPOINT, formData.Id, formData).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = data;
                        _this.LoadMacIdConfiguration();
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
                this._MacIdConfigurationService.delete(global_1.Global.BASE_MACIDCONFIGURATION_ENDPOINT, formData.Id).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = "MackId status changed successfully.";
                        _this.LoadMacIdConfiguration();
                    }
                    else {
                        _this.msg = "Error has occurred while changing status of existing MackId!";
                    }
                    _this.modal.dismiss();
                }, function (error) {
                    _this.msg = error;
                });
                break;
        }
    };
    MacIdConfigurationComponent.prototype.InputNavigator = function () {
        $(function () {
            $("#MacID1").keyup(function () {
                if ($("#MacID1").val().length == 2) {
                    $("#MacID2").focus();
                }
            });
            $("#MacID2").keyup(function () {
                if ($("#MacID2").val().length == 2) {
                    $("#MacID3").focus();
                }
            });
            $("#MacID3").keyup(function () {
                if ($("#MacID3").val().length == 2) {
                    $("#MacID4").focus();
                }
            });
            $("#MacID4").keyup(function () {
                if ($("#MacID4").val().length == 2) {
                    $("#MacID5").focus();
                }
            });
            $("#MacID5").keyup(function () {
                if ($("#MacID5").val().length == 2) {
                    $("#MacID6").focus();
                }
            });
            $("#MacID6").keyup(function () {
                if ($("#MacID6").val().length == 2) {
                    $("#IP1").focus();
                }
            });
            $("#IP1").keyup(function () {
                if ($("#IP1").val().length == 3) {
                    $("#IP2").focus();
                }
            });
            $("#IP2").keyup(function () {
                if ($("#IP2").val().length == 3) {
                    $("#IP3").focus();
                }
            });
            $("#IP3").keyup(function () {
                if ($("#IP3").val().length == 3) {
                    $("#IP4").focus();
                }
            });
            $("#IP4").keyup(function () {
                if ($("#IP4").val().length == 3) {
                    $("#Version1").focus();
                }
            });
            $("#Version1").keyup(function () {
                if ($("#Version1").val().length == 1) {
                    $("#Version2").focus();
                }
            });
            $("#Version2").keyup(function () {
                if ($("#Version2").val().length == 1) {
                    $("#Version3").focus();
                }
            });
        });
    };
    MacIdConfigurationComponent.prototype.ActivateDeactivateStatus = function (Id) {
        var _this = this;
        this._MacIdConfigurationService.activatedeactivatestatus(global_1.Global.BASE_MACIDCONFIGURATION_ENDPOINT, Id)
            .subscribe(function (data) {
            _this.LoadMacIdConfiguration();
            _this.GetActiveRecord();
        }, function (error) {
            _this.msg = error;
        }
        //,error => this.msg = <any>error
        );
    };
    __decorate([
        core_1.ViewChild('modal'),
        __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
    ], MacIdConfigurationComponent.prototype, "modal", void 0);
    MacIdConfigurationComponent = __decorate([
        core_1.Component({
            providers: [MacIdConfiguration_service_1.MacIdConfigurationService],
            templateUrl: 'app/Components/Masters/Configuration/MacIdConfiguration.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, MacIdConfiguration_service_1.MacIdConfigurationService, pager_index_1.PagerService, CommonHelper_service_1.CommonHelperService])
    ], MacIdConfigurationComponent);
    return MacIdConfigurationComponent;
}());
exports.MacIdConfigurationComponent = MacIdConfigurationComponent;
