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
var TicketListClosed_service_1 = require("../../service/Notification/TicketListClosed.service");
var forms_1 = require("@angular/forms");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var enum_1 = require("../../Shared/enum");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw"); // fixed typo
var global_1 = require("../../Shared/global");
var pager_index_1 = require("../../Shared/pager.index");
var TicketListClosedComponent = (function () {
    function TicketListClosedComponent(fb, _TicketListClosedService, pagerService) {
        this.fb = fb;
        this._TicketListClosedService = _TicketListClosedService;
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
    TicketListClosedComponent.prototype.ngOnInit = function () {
        this.TicketListClosedFrm = this.fb.group({
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
            RoleType: [''],
            EntityMessage: ['']
        });
        this.LoadGetTicketDetailUser(21);
        //this.loadcount();
        //this.Loadstore();
        // this.LoadOpenTicket(21);
    };
    TicketListClosedComponent.prototype.TicketListClosedFilterCriteriaChange = function (value) {
        if (value != '[object Event]')
            this.TicketListClosedFilter = value;
    };
    TicketListClosedComponent.prototype.TicketListClosedSort = function (property) {
        if (!this.ShowHideSearch) {
            this.isDesc = !this.isDesc;
            this.column = property;
            this.direction = this.isDesc ? 1 : -1;
        }
    };
    //Loadstore() {
    //    
    //    this.TicketListCloseds = this.TicketListCloseds.filter(x => x.Status == "Open");
    //    this.JumpOnPage(1);
    //    for (var i = 0; i < this.TicketListCloseds.length; i++) {
    //        if (this.TicketListCloseds[i].Status == "Open")
    //            return this.TicketListCloseds[i];
    //    }
    //}
    TicketListClosedComponent.prototype.LoadCount = function () {
        this.ClosedTicketCount = this.TicketListCloseds.filter(function (x) { return x.Status.toLowerCase() == "closed"; }).length;
        this.TerminatedTicketCount = this.TicketListCloseds.filter(function (x) { return x.Status.toLowerCase() == "terminated"; }).length;
    };
    TicketListClosedComponent.prototype.LoadGetTicketDetailUser = function (UserId) {
        var _this = this;
        this.indLoading = true;
        this._TicketListClosedService.getTicketuser(global_1.Global.BASE_MyTicketListClosed_ENDPOINT, UserId)
            .subscribe(function (data) {
            // console.log(data)
            _this.TicketListCloseds = data;
            //Logic for searching - start
            if (_this.ShowHideSearch) {
                _this.strSearchSubject = document.getElementById("searchSubject").value;
                if (_this.strSearchSubject != '') {
                    _this.strSearchSubject = _this.strSearchSubject.toLocaleLowerCase();
                    _this.TicketListCloseds = _this.TicketListCloseds.filter(function (x) { return x.Subject != null && x.Subject.toLocaleLowerCase().indexOf(_this.strSearchSubject) != -1; });
                }
            }
            if (_this.ShowHideSearch) {
                _this.strSearchAddressToGroup = document.getElementById("searchAddressToGroup").value;
                if (_this.strSearchAddressToGroup != '') {
                    _this.strSearchAddressToGroup = _this.strSearchAddressToGroup.toLocaleLowerCase();
                    _this.TicketListCloseds = _this.TicketListCloseds.filter(function (x) { return x.AddressToGroup != null && x.AddressToGroup.toLocaleLowerCase().indexOf(_this.strSearchAddressToGroup) != -1; });
                }
            }
            if (_this.ShowHideSearch) {
                _this.strSearchAssignTo = document.getElementById("searchAssignTo").value;
                if (_this.strSearchAssignTo != '') {
                    _this.strSearchAssignTo = _this.strSearchAssignTo.toLocaleLowerCase();
                    _this.TicketListCloseds = _this.TicketListCloseds.filter(function (x) { return x.AssignTo != null && x.AssignTo.toLocaleLowerCase().indexOf(_this.strSearchAssignTo) != -1; });
                }
                if (_this.ShowHideSearch) {
                    _this.strSearchPriority = document.getElementById("searchPriority").value;
                    if (_this.strSearchPriority != '') {
                        _this.strSearchPriority = _this.strSearchPriority.toLocaleLowerCase();
                        _this.TicketListCloseds = _this.TicketListCloseds.filter(function (x) { return x.Priority != null && x.Priority.toLocaleLowerCase().indexOf(_this.strSearchPriority) != -1; });
                    }
                }
                if (_this.ShowHideSearch) {
                    _this.strSearchStatus = document.getElementById("searchStatus").value;
                    if (_this.strSearchStatus != '') {
                        _this.strSearchStatus = _this.strSearchStatus.toLocaleLowerCase();
                        _this.TicketListCloseds = _this.TicketListCloseds.filter(function (x) { return x.Status != null && x.Status.toLocaleLowerCase().indexOf(_this.strSearchStatus) != -1; });
                    }
                }
            }
            //Logic for searching - End
            _this.ClosedTicketCount = _this.TicketListCloseds.filter(function (x) { return x.Status.toLowerCase() == "closed"; }).length;
            _this.TerminatedTicketCount = _this.TicketListCloseds.filter(function (x) { return x.Status.toLowerCase() == "terminated"; }).length;
            _this.indLoading = false;
            _this.JumpOnPage(1);
        });
    };
    TicketListClosedComponent.prototype.LoadGetTicketDetail = function (id) {
        var _this = this;
        this.indLoading = true;
        this._TicketListClosedService.getTicketDetail(global_1.Global.BASE_MyTicketListClosed_ENDPOINT, id)
            .subscribe(function (DATADP) {
            _this.GetDetail = DATADP;
        });
    };
    TicketListClosedComponent.prototype.addTicketListClosed = function () {
        this.dbops = enum_1.DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New News";
        this.modalBtnTitle = "Add";
        this.TicketListClosedFrm.reset();
        this.modal.open();
    };
    TicketListClosedComponent.prototype.editTicketListClosed = function (id) {
        this.dbops = enum_1.DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit News";
        this.modalBtnTitle = "Update";
        this.TicketListClosed = this.TicketListCloseds.filter(function (x) { return x.Id == id; })[0];
        this.TicketListClosedFrm.setValue(this.TicketListClosed);
        this.modal.open();
        this.LoadGetTicketDetail(id);
    };
    TicketListClosedComponent.prototype.ViewTicketListClosed = function (id) {
        this.dbops = enum_1.DBOperation.View;
        this.SetControlsState(true);
        this.modalTitle = "Conversation Ticket";
        this.TicketListClosed = this.TicketListCloseds.filter(function (x) { return x.Id == id; })[0];
        this.TicketListClosedFrm.setValue(this.TicketListClosed);
        this.LoadViwHistory(id);
        this.modal1.open();
        this.modal.dismiss();
    };
    TicketListClosedComponent.prototype.deleteTicketListClosed = function (id, status) {
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
        this.TicketListClosed = this.TicketListCloseds.filter(function (x) { return x.Id == id; })[0];
        this.TicketListClosedFrm.setValue(this.TicketListClosed);
        this.modal.open();
    };
    TicketListClosedComponent.prototype.SetControlsState = function (isEnable) {
        isEnable ? this.TicketListClosedFrm.enable() : this.TicketListClosedFrm.disable();
    };
    TicketListClosedComponent.prototype.ChangeRecordsPerPage = function (RecordsPerPage) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    };
    TicketListClosedComponent.prototype.JumpOnPage = function (PageNumber) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.TicketListCloseds);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;
    };
    TicketListClosedComponent.prototype.ShowHideSearchControls = function () {
        this.ShowHideSearch = !this.ShowHideSearch;
    };
    TicketListClosedComponent.prototype.LoadViwHistory = function (id) {
        var _this = this;
        this.indLoading = true;
        this._TicketListClosedService.getViewHistory(global_1.Global.BASE_MyTicket_ENDPOINT, id)
            .subscribe(function (DATADP) {
            _this.ViewHistory = DATADP;
        });
    };
    TicketListClosedComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        this.msg = "";
        switch (this.dbops) {
            case enum_1.DBOperation.create:
                this._TicketListClosedService.post(global_1.Global.BASE_MyTicketListClosed_ENDPOINT, formData._value).subscribe(function (data) {
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
                this._TicketListClosedService.put(global_1.Global.BASE_MyTicketListClosed_ENDPOINT, formData._value.Id, formData._value).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = data;
                        _this.LoadGetTicketDetailUser(21);
                        //  this.LoadTicketListCloseds();
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
                this._TicketListClosedService.delete(global_1.Global.BASE_MyTicketListClosed_ENDPOINT, formData._value.Id).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = "TicketListClosed status changed successfully.";
                        _this.LoadGetTicketDetailUser(21);
                        // this.LoadTicketListCloseds();
                    }
                    else {
                        _this.msg = "Error has occurred while changing status of existing TicketListClosed!";
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
    ], TicketListClosedComponent.prototype, "modal", void 0);
    __decorate([
        core_1.ViewChild('modal1'),
        __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
    ], TicketListClosedComponent.prototype, "modal1", void 0);
    TicketListClosedComponent = __decorate([
        core_1.Component({
            providers: [TicketListClosed_service_1.TicketListClosedService],
            templateUrl: 'app/Components/Notification/TicketListClosed.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, TicketListClosed_service_1.TicketListClosedService, pager_index_1.PagerService])
    ], TicketListClosedComponent);
    return TicketListClosedComponent;
}());
exports.TicketListClosedComponent = TicketListClosedComponent;
