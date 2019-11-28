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
var TicketListOpen_service_1 = require("../../service/Notification/TicketListOpen.service");
var forms_1 = require("@angular/forms");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var enum_1 = require("../../Shared/enum");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw"); // fixed typo
var global_1 = require("../../Shared/global");
var pager_index_1 = require("../../Shared/pager.index");
var TicketListOpenComponent = (function () {
    function TicketListOpenComponent(fb, _TicketListOpenService, pagerService) {
        this.fb = fb;
        this._TicketListOpenService = _TicketListOpenService;
        this.pagerService = pagerService;
        this.indLoading = false;
        this.isDesc = false;
        this.column = 'Subject';
        this.CurrentRecordsPerPage = 10;
        // pager object
        this.pager = {};
        //Variables for Filter
        this.ShowHideSearch = false;
    }
    TicketListOpenComponent.prototype.ngOnInit = function () {
        this.TicketListOpenFrm = this.fb.group({
            CompanyId: [''],
            Id: 0,
            Subject: [''],
            Message: [''],
            Remarks: [''],
            AddressToGroup: [''],
            AssignTo: [''],
            CreatedByName: [''],
            UpdatedByName: [''],
            Priority: [''],
            Status: [''],
            CreatedOn: [''],
            CreatedBy: [''],
            UpdatedOn: [''],
            UpdatedBy: [''],
            IsActive: [''],
            Mode: [''],
            HelpTicketId: [''],
            FileName: [''],
            UserType: [''],
            RoleType: [''],
            EntityMessage: ['']
        });
        this.LoadGetTicketDetailUser(21);
    };
    TicketListOpenComponent.prototype.TicketListOpenFilterCriteriaChange = function (value) {
        if (value != '[object Event]')
            this.TicketListOpenFilter = value;
    };
    TicketListOpenComponent.prototype.TicketListOpenSort = function (property) {
        if (!this.ShowHideSearch) {
            this.isDesc = !this.isDesc;
            this.column = property;
            this.direction = this.isDesc ? 1 : -1;
        }
    };
    TicketListOpenComponent.prototype.loadcount = function () {
        this.OpenTicketCount = this.TicketListOpens.filter(function (x) { return x.Status.toLowerCase() == "open"; }).length;
        this.UnderReviewTicketCount = this.TicketListOpens.filter(function (x) { return x.Status.toLowerCase() == "underReview"; }).length;
        this.SuspendedTicketCount = this.TicketListOpens.filter(function (x) { return x.Status.toLowerCase() == "suspended"; }).length;
        this.ResolvedTicketCount = this.TicketListOpens.filter(function (x) { return x.Status.toLowerCase() == "resolved"; }).length;
    };
    TicketListOpenComponent.prototype.FilterByStatus = function (event) {
        if (event.target.value == 'TicketAddressedToMe') {
            this.LoadGetTicketDetailUser(21);
        }
        else if (event.target.value == 'AllTicket') {
            this.LoadGetTicketDetailAdminAllTicket();
        }
    };
    TicketListOpenComponent.prototype.LoadGetTicketDetailUser = function (UserId) {
        var _this = this;
        this.indLoading = true;
        this._TicketListOpenService.getTicketuser(global_1.Global.BASE_MyTicketListOpen_ENDPOINT, UserId)
            .subscribe(function (data) {
            // console.log(data)
            _this.TicketListOpens = data;
            //Logic for searching - start
            if (_this.ShowHideSearch) {
                _this.strSearchSubject = document.getElementById("searchSubject").value;
                if (_this.strSearchSubject != '') {
                    _this.strSearchSubject = _this.strSearchSubject.toLocaleLowerCase();
                    _this.TicketListOpens = _this.TicketListOpens.filter(function (x) { return x.Subject != null && x.Subject.toLocaleLowerCase().indexOf(_this.strSearchSubject) != -1; });
                }
            }
            if (_this.ShowHideSearch) {
                _this.strSearchAddressToGroup = document.getElementById("searchAddressToGroup").value;
                if (_this.strSearchAddressToGroup != '') {
                    _this.strSearchAddressToGroup = _this.strSearchAddressToGroup.toLocaleLowerCase();
                    _this.TicketListOpens = _this.TicketListOpens.filter(function (x) { return x.AddressToGroup != null && x.AddressToGroup.toLocaleLowerCase().indexOf(_this.strSearchAddressToGroup) != -1; });
                }
            }
            if (_this.ShowHideSearch) {
                _this.strSearchAssignTo = document.getElementById("searchAssignTo").value;
                if (_this.strSearchAssignTo != '') {
                    _this.strSearchAssignTo = _this.strSearchAssignTo.toLocaleLowerCase();
                    _this.TicketListOpens = _this.TicketListOpens.filter(function (x) { return x.AssignTo != null && x.AssignTo.toLocaleLowerCase().indexOf(_this.strSearchAssignTo) != -1; });
                }
                if (_this.ShowHideSearch) {
                    _this.strSearchPriority = document.getElementById("searchPriority").value;
                    if (_this.strSearchPriority != '') {
                        _this.strSearchPriority = _this.strSearchPriority.toLocaleLowerCase();
                        _this.TicketListOpens = _this.TicketListOpens.filter(function (x) { return x.Priority != null && x.Priority.toLocaleLowerCase().indexOf(_this.strSearchPriority) != -1; });
                    }
                }
                if (_this.ShowHideSearch) {
                    _this.strSearchStatus = document.getElementById("searchStatus").value;
                    if (_this.strSearchStatus != '') {
                        _this.strSearchStatus = _this.strSearchStatus.toLocaleLowerCase();
                        _this.TicketListOpens = _this.TicketListOpens.filter(function (x) { return x.Status != null && x.Status.toLocaleLowerCase().indexOf(_this.strSearchStatus) != -1; });
                    }
                }
            }
            //Logic for searching - End
            _this.OpenTicketCount = _this.TicketListOpens.filter(function (x) { return x.Status.toLowerCase() == "open"; }).length;
            _this.UnderReviewTicketCount = _this.TicketListOpens.filter(function (x) { return x.Status.toLowerCase() == "underReview"; }).length;
            _this.SuspendedTicketCount = _this.TicketListOpens.filter(function (x) { return x.Status.toLowerCase() == "suspended"; }).length;
            _this.ResolvedTicketCount = _this.TicketListOpens.filter(function (x) { return x.Status.toLowerCase() == "resolved"; }).length;
            _this.indLoading = false;
            _this.JumpOnPage(1);
        });
    };
    TicketListOpenComponent.prototype.LoadGetTicketDetail = function (id) {
        var _this = this;
        this.indLoading = true;
        this._TicketListOpenService.getTicketDetail(global_1.Global.BASE_MyTicketListOpen_ENDPOINT, id)
            .subscribe(function (DATADP) {
            _this.GetDetail = DATADP;
        });
    };
    TicketListOpenComponent.prototype.LoadGetTicketDetailAdminAllTicket = function () {
        var _this = this;
        this.indLoading = true;
        this._TicketListOpenService.getTicketAdmin(global_1.Global.BASE_MyTicketListOpen_ENDPOINT)
            .subscribe(function (data) {
            // console.log(data)
            _this.TicketListOpens = data;
            //Logic for searching - start
            if (_this.ShowHideSearch) {
                _this.strSearchSubject = document.getElementById("searchSubject").value;
                if (_this.strSearchSubject != '') {
                    _this.strSearchSubject = _this.strSearchSubject.toLocaleLowerCase();
                    _this.TicketListOpens = _this.TicketListOpens.filter(function (x) { return x.Subject != null && x.Subject.toLocaleLowerCase().indexOf(_this.strSearchSubject) != -1; });
                }
            }
            if (_this.ShowHideSearch) {
                _this.strSearchAddressToGroup = document.getElementById("searchAddressToGroup").value;
                if (_this.strSearchAddressToGroup != '') {
                    _this.strSearchAddressToGroup = _this.strSearchAddressToGroup.toLocaleLowerCase();
                    _this.TicketListOpens = _this.TicketListOpens.filter(function (x) { return x.AddressToGroup != null && x.AddressToGroup.toLocaleLowerCase().indexOf(_this.strSearchAddressToGroup) != -1; });
                }
            }
            if (_this.ShowHideSearch) {
                _this.strSearchAssignTo = document.getElementById("searchAssignTo").value;
                if (_this.strSearchAssignTo != '') {
                    _this.strSearchAssignTo = _this.strSearchAssignTo.toLocaleLowerCase();
                    _this.TicketListOpens = _this.TicketListOpens.filter(function (x) { return x.AssignTo != null && x.AssignTo.toLocaleLowerCase().indexOf(_this.strSearchAssignTo) != -1; });
                }
                if (_this.ShowHideSearch) {
                    _this.strSearchPriority = document.getElementById("searchPriority").value;
                    if (_this.strSearchPriority != '') {
                        _this.strSearchPriority = _this.strSearchPriority.toLocaleLowerCase();
                        _this.TicketListOpens = _this.TicketListOpens.filter(function (x) { return x.Priority != null && x.Priority.toLocaleLowerCase().indexOf(_this.strSearchPriority) != -1; });
                    }
                }
                if (_this.ShowHideSearch) {
                    _this.strSearchStatus = document.getElementById("searchStatus").value;
                    if (_this.strSearchStatus != '') {
                        _this.strSearchStatus = _this.strSearchStatus.toLocaleLowerCase();
                        _this.TicketListOpens = _this.TicketListOpens.filter(function (x) { return x.Status != null && x.Status.toLocaleLowerCase().indexOf(_this.strSearchStatus) != -1; });
                    }
                }
            }
            //Logic for searching - End
            _this.OpenTicketCount = _this.TicketListOpens.filter(function (x) { return x.Status.toLowerCase() == "open"; }).length;
            _this.UnderReviewTicketCount = _this.TicketListOpens.filter(function (x) { return x.Status.toLowerCase() == "underReview"; }).length;
            _this.SuspendedTicketCount = _this.TicketListOpens.filter(function (x) { return x.Status.toLowerCase() == "suspended"; }).length;
            _this.ResolvedTicketCount = _this.TicketListOpens.filter(function (x) { return x.Status.toLowerCase() == "resolved"; }).length;
            _this.indLoading = false;
            _this.JumpOnPage(1);
        });
    };
    TicketListOpenComponent.prototype.addTicketListOpen = function () {
        this.dbops = enum_1.DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New News";
        this.modalBtnTitle = "Add";
        this.TicketListOpenFrm.reset();
        this.modal.open();
    };
    TicketListOpenComponent.prototype.editTicketListOpen = function (id) {
        this.dbops = enum_1.DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit News";
        this.modalBtnTitle = "Update";
        this.TicketListOpen = this.TicketListOpens.filter(function (x) { return x.Id == id; })[0];
        this.TicketListOpenFrm.setValue(this.TicketListOpen);
        this.modal.open();
        this.LoadGetTicketDetail(id);
    };
    TicketListOpenComponent.prototype.ViewTicketListOpen = function (id) {
        this.dbops = enum_1.DBOperation.View;
        this.SetControlsState(true);
        this.modalTitle = "Conversation Ticket";
        this.TicketListOpen = this.TicketListOpens.filter(function (x) { return x.Id == id; })[0];
        this.TicketListOpenFrm.setValue(this.TicketListOpen);
        this.LoadViwHistory(id);
        this.modal1.open();
        this.modal.dismiss();
    };
    TicketListOpenComponent.prototype.deleteTicketListOpen = function (id, status) {
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
        this.TicketListOpen = this.TicketListOpens.filter(function (x) { return x.Id == id; })[0];
        this.TicketListOpenFrm.setValue(this.TicketListOpen);
        this.modal.open();
    };
    TicketListOpenComponent.prototype.SetControlsState = function (isEnable) {
        isEnable ? this.TicketListOpenFrm.enable() : this.TicketListOpenFrm.disable();
    };
    TicketListOpenComponent.prototype.ChangeRecordsPerPage = function (RecordsPerPage) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    };
    TicketListOpenComponent.prototype.JumpOnPage = function (PageNumber) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.TicketListOpens);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;
    };
    TicketListOpenComponent.prototype.ShowHideSearchControls = function () {
        this.ShowHideSearch = !this.ShowHideSearch;
    };
    TicketListOpenComponent.prototype.LoadViwHistory = function (id) {
        var _this = this;
        this.indLoading = true;
        this._TicketListOpenService.getViewHistory(global_1.Global.BASE_MyTicket_ENDPOINT, id)
            .subscribe(function (DATADP) {
            _this.ViewHistory = DATADP;
        });
    };
    TicketListOpenComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        this.msg = "";
        switch (this.dbops) {
            case enum_1.DBOperation.create:
                this._TicketListOpenService.post(global_1.Global.BASE_MyTicketListOpen_ENDPOINT, formData._value).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = data;
                        _this.LoadGetTicketDetailUser(21);
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
                this._TicketListOpenService.put(global_1.Global.BASE_MyTicketListOpen_ENDPOINT, formData._value.Id, formData._value).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = data;
                        _this.LoadGetTicketDetailUser(21);
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
                this._TicketListOpenService.delete(global_1.Global.BASE_MyTicketListOpen_ENDPOINT, formData._value.Id).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = "TicketListOpen status changed successfully.";
                        _this.LoadGetTicketDetailUser(21);
                    }
                    else {
                        _this.msg = "Error has occurred while changing status of existing TicketListOpen!";
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
    ], TicketListOpenComponent.prototype, "modal", void 0);
    __decorate([
        core_1.ViewChild('modal1'),
        __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
    ], TicketListOpenComponent.prototype, "modal1", void 0);
    TicketListOpenComponent = __decorate([
        core_1.Component({
            providers: [TicketListOpen_service_1.TicketListOpenService],
            templateUrl: 'app/Components/Notification/TicketListOpen.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, TicketListOpen_service_1.TicketListOpenService, pager_index_1.PagerService])
    ], TicketListOpenComponent);
    return TicketListOpenComponent;
}());
exports.TicketListOpenComponent = TicketListOpenComponent;
