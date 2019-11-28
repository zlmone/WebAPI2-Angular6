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
var EmployeeFeedback_service_1 = require("../../../Service/HumanResource/Attendance/EmployeeFeedback.service");
var forms_1 = require("@angular/forms");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var enum_1 = require("../../../Shared/enum");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw"); // fixed typo
var global_1 = require("../../../Shared/global");
var pager_index_1 = require("../../../Shared/pager.index");
var EmployeeFeedbackComponent = (function () {
    function EmployeeFeedbackComponent(fb, _EmployeeFeedbackService, pagerService) {
        this.fb = fb;
        this._EmployeeFeedbackService = _EmployeeFeedbackService;
        this.pagerService = pagerService;
        this.indLoading = false;
        this.isDesc = false;
        this.column = '';
        this.CurrentRecordsPerPage = 10;
        // pager object
        this.pager = {};
        //Variables for Filter
        this.ShowHideSearch = false;
        this.ShowHideSearchNew = false;
        this.Status = "MyFeedback";
    }
    EmployeeFeedbackComponent.prototype.ngOnInit = function () {
        this.EmployeeFeedbackFrm = this.fb.group({
            CompanyId: [''],
            Id: [''],
            mode: [''],
            UserID: [''],
            Remarks: [''],
            IsLike: [''],
            CreatedOn: [''],
            EmployeeName: [''],
            EmployeeId: [''],
            SenderName: [''],
            Employee_Name: [''],
            TeamEmployeeId: [''],
        });
        this.LoadEmployeeFeedbacks(21);
    };
    EmployeeFeedbackComponent.prototype.clearSearch = function () {
        this.EmployeeFeedbacks = null;
    };
    EmployeeFeedbackComponent.prototype.FilterByStatus = function (event) {
        if (event.target.value == "MyTeam") {
            $("#MyFeedback").hide();
            $("#MyTeam").show();
            $("#TeamMember").show();
            $("#MYPending").hide();
            this.clearSearch();
            this.LoadEmployeeteamWise(21);
            this.LoadEmployeeList(21);
        }
        else if (event.target.value == "Pending") {
            $("#MyFeedback").hide();
            $("#MyTeam").hide();
            $("#TeamMember").hide();
            $("#MYPending").show();
            this.clearSearch();
            this.LoadEmployeependingList(21);
        }
        else {
            $("#MyFeedback").show();
            $("#MyTeam").hide();
            $("#TeamMember").hide();
            $("#MYPending").hide();
            this.clearSearch();
            this.LoadEmployeeFeedbacks(21);
        }
    };
    EmployeeFeedbackComponent.prototype.LoadEmployeeList = function (UserId) {
        var _this = this;
        this.indLoading = true;
        this._EmployeeFeedbackService.getEmployeeList(global_1.Global.BASE_EmployeeFeedback_ENDPOINT, UserId)
            .subscribe(function (data) {
            _this.employeelist = data;
            _this.indLoading = false;
        });
    };
    EmployeeFeedbackComponent.prototype.EmployeeFeedbackFilterCriteriaChange = function (value) {
        if (value != '[object Event]')
            this.EmployeeFeedbackFilter = value;
    };
    EmployeeFeedbackComponent.prototype.EmployeeFeedbackSort = function (property) {
        if (!this.ShowHideSearch) {
            this.isDesc = !this.isDesc;
            this.column = property;
            this.direction = this.isDesc ? 1 : -1;
        }
    };
    EmployeeFeedbackComponent.prototype.LoadEmployeeteamwisedata = function (event, UserId) {
        var _this = this;
        debugger;
        this.indLoading = true;
        this._EmployeeFeedbackService.GetEmployeewiseSelect(global_1.Global.BASE_EmployeeFeedback_ENDPOINT, event.target.value, 21)
            .subscribe(function (EmployeeFeedbacks) {
            _this.EmployeeFeedbacks = EmployeeFeedbacks;
            //Logic for searching - start
            if (_this.ShowHideSearch) {
                _this.searchRemarks = document.getElementById("searchRemarks").value;
                if (_this.searchRemarks != '') {
                    _this.searchRemarks = _this.searchRemarks.toLocaleLowerCase();
                    _this.EmployeeFeedbacks = _this.EmployeeFeedbacks.filter(function (x) { return x.Remarks != null && x.Remarks.toLocaleLowerCase().indexOf(_this.searchRemarks) != -1; });
                }
            }
            if (_this.ShowHideSearch) {
                _this.searchEmployeeName = document.getElementById("searchEmployeeName").value;
                if (_this.searchEmployeeName != '') {
                    _this.searchEmployeeName = _this.searchEmployeeName.toLocaleLowerCase();
                    _this.EmployeeFeedbacks = _this.EmployeeFeedbacks.filter(function (x) { return x.EmployeeName != null && x.EmployeeName.toLocaleLowerCase().indexOf(_this.searchEmployeeName) != -1; });
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
    EmployeeFeedbackComponent.prototype.LoadEmployeeFeedbacks = function (UserId) {
        var _this = this;
        $("#MyFeedback").show();
        $("#MyTeam").hide();
        $("#TeamMember").hide();
        $("#MYPending").hide();
        this.indLoading = true;
        this._EmployeeFeedbackService.GetEmployeeFeedback(global_1.Global.BASE_EmployeeFeedback_ENDPOINT, UserId)
            .subscribe(function (EmployeeFeedbacks) {
            _this.EmployeeFeedbacks = EmployeeFeedbacks;
            //Logic for searching - start
            if (_this.ShowHideSearch) {
                _this.searchRemarks = document.getElementById("searchRemarks").value;
                if (_this.searchRemarks != '') {
                    _this.searchRemarks = _this.searchRemarks.toLocaleLowerCase();
                    _this.EmployeeFeedbacks = _this.EmployeeFeedbacks.filter(function (x) { return x.Remarks != null && x.Remarks.toLocaleLowerCase().indexOf(_this.searchRemarks) != -1; });
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
    EmployeeFeedbackComponent.prototype.LoadEmployeeteamWise = function (UserId) {
        var _this = this;
        this.indLoading = true;
        this._EmployeeFeedbackService.GetMyTeam(global_1.Global.BASE_EmployeeFeedback_ENDPOINT, UserId)
            .subscribe(function (EmployeeFeedbacks) {
            _this.EmployeeFeedbacks = EmployeeFeedbacks;
            //Logic for searching - start
            if (_this.ShowHideSearch) {
                _this.searchRemarks = document.getElementById("searchRemarks").value;
                if (_this.searchRemarks != '') {
                    _this.searchRemarks = _this.searchRemarks.toLocaleLowerCase();
                    _this.EmployeeFeedbacks = _this.EmployeeFeedbacks.filter(function (x) { return x.Remarks != null && x.Remarks.toLocaleLowerCase().indexOf(_this.searchRemarks) != -1; });
                }
            }
            if (_this.ShowHideSearch) {
                _this.searchEmployeeName = document.getElementById("searchEmployeeName").value;
                if (_this.searchEmployeeName != '') {
                    _this.searchEmployeeName = _this.searchEmployeeName.toLocaleLowerCase();
                    _this.EmployeeFeedbacks = _this.EmployeeFeedbacks.filter(function (x) { return x.EmployeeName != null && x.EmployeeName.toLocaleLowerCase().indexOf(_this.searchEmployeeName) != -1; });
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
    EmployeeFeedbackComponent.prototype.LoadEmployeependingList = function (UserId) {
        var _this = this;
        this.indLoading = true;
        this._EmployeeFeedbackService.GetPendingListEmployee(global_1.Global.BASE_EmployeeFeedback_ENDPOINT, UserId)
            .subscribe(function (EmployeeFeedbacks) {
            _this.EmployeeFeedbacks = EmployeeFeedbacks;
            //Logic for searching - start
            //if (this.ShowHideSearch) {
            //    this.searchRemarks = (<HTMLInputElement>document.getElementById("searchRemarks")).value;
            //    if (this.searchRemarks != '') {
            //        this.searchRemarks = this.searchRemarks.toLocaleLowerCase();
            //        this.EmployeeFeedbacks = this.EmployeeFeedbacks.filter(
            //            x => x.Remarks != null && x.Remarks.toLocaleLowerCase().indexOf(this.searchRemarks) != -1);
            //    }
            //    this.searchEmployeeName = (<HTMLInputElement>document.getElementById("searchEmployeeName")).value;
            //    if (this.searchEmployeeName != '') {
            //        this.searchEmployeeName = this.searchEmployeeName.toLocaleLowerCase();
            //        this.EmployeeFeedbacks = this.EmployeeFeedbacks.filter(
            //            x => x.EmployeeName != null && x.EmployeeName.toLocaleLowerCase().indexOf(this.searchEmployeeName) != -1);
            //    }
            //    this.searchSenderName = (<HTMLInputElement>document.getElementById("searchSenderName")).value;
            //    if (this.searchSenderName != '') {
            //        this.searchSenderName = this.searchSenderName.toLocaleLowerCase();
            //        this.EmployeeFeedbacks = this.EmployeeFeedbacks.filter(
            //            x => x.SenderName != null && x.SenderName.toLocaleLowerCase().indexOf(this.searchSenderName) != -1);
            //    }
            //}
            //Logic for searching - End
            _this.indLoading = false;
            // initialize to page 1
            _this.JumpOnPage(1);
        }
        //,error => this.msg = <any>error
        );
    };
    EmployeeFeedbackComponent.prototype.addEmployeeFeedback = function () {
        this.dbops = enum_1.DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New EmployeeFeedback";
        this.modalBtnTitle = "Add";
        this.EmployeeFeedbackFrm.reset();
        this.modal.open();
    };
    EmployeeFeedbackComponent.prototype.editEmployeeFeedback = function (Id) {
        debugger;
        var msg1 = "Are you sure you want to approve this feedback?";
        if (confirm(msg1) == true) {
            this.getupdateEmplyeeFedback(Id);
            this.LoadEmployeependingList(21);
        }
        else {
            this.LoadEmployeependingList(21);
        }
        //   this.getupdateEmplyeeFedback(id);
    };
    EmployeeFeedbackComponent.prototype.RejectEmployeeFeedback = function (Id) {
        debugger;
        var msg1 = "Are you sure you want to reject this feedback?";
        if (confirm(msg1) == true) {
            this.getrejectEmplyeeFedback(Id);
            this.indLoading = true;
            this.LoadEmployeependingList(21);
        }
        else {
            this.indLoading = true;
            this.LoadEmployeependingList(21);
        }
        //   this.getupdateEmplyeeFedback(id);
    };
    EmployeeFeedbackComponent.prototype.getrejectEmplyeeFedback = function (Id) {
        var _this = this;
        debugger;
        this.indLoading = true;
        this._EmployeeFeedbackService.RejectFeedback(global_1.Global.BASE_EmployeeFeedback_ENDPOINT, Id, 21)
            .subscribe(function (EmployeeFeedbacks) {
            _this.EmployeeFeedbacks = EmployeeFeedbacks;
            //Logic for searching - End
            _this.indLoading = false;
            // initialize to page 1
            _this.JumpOnPage(1);
        }
        //,error => this.msg = <any>error
        );
    };
    EmployeeFeedbackComponent.prototype.getupdateEmplyeeFedback = function (Id) {
        var _this = this;
        debugger;
        this.indLoading = true;
        this._EmployeeFeedbackService.UpdateFeedback(global_1.Global.BASE_EmployeeFeedback_ENDPOINT, Id, 21)
            .subscribe(function (EmployeeFeedbacks) {
            _this.EmployeeFeedbacks = EmployeeFeedbacks;
            //Logic for searching - End
            _this.indLoading = false;
            // initialize to page 1
            _this.JumpOnPage(1);
        }
        //,error => this.msg = <any>error
        );
    };
    EmployeeFeedbackComponent.prototype.getApprovedFeedback = function (UserId) {
        var _this = this;
        debugger;
        this.indLoading = true;
        this._EmployeeFeedbackService.GetPendingListEmployee(global_1.Global.BASE_EmployeeFeedback_ENDPOINT, UserId)
            .subscribe(function (EmployeeFeedbacks) {
            _this.EmployeeFeedbacks = EmployeeFeedbacks;
            //Logic for searching - End
            _this.indLoading = false;
            // initialize to page 1
            _this.JumpOnPage(1);
        }
        //,error => this.msg = <any>error
        );
    };
    EmployeeFeedbackComponent.prototype.deleteEmployeeFeedback = function (id, status) {
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
        this.EmployeeFeedbackFrm.setValue(this.EmployeeFeedback);
        this.modal.open();
    };
    EmployeeFeedbackComponent.prototype.SetControlsState = function (isEnable) {
        isEnable ? this.EmployeeFeedbackFrm.enable() : this.EmployeeFeedbackFrm.disable();
    };
    EmployeeFeedbackComponent.prototype.ChangeRecordsPerPage = function (RecordsPerPage) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    };
    EmployeeFeedbackComponent.prototype.JumpOnPage = function (PageNumber) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.EmployeeFeedbacks);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;
    };
    EmployeeFeedbackComponent.prototype.ShowHideSearchControls = function () {
        this.ShowHideSearch = !this.ShowHideSearch;
    };
    EmployeeFeedbackComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        this.msg = "";
        switch (this.dbops) {
            case enum_1.DBOperation.create:
                this._EmployeeFeedbackService.post(global_1.Global.BASE_EmployeeFeedback_ENDPOINT, formData._value).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = data;
                        _this.LoadEmployeeFeedbacks(21);
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
                debugger;
                this._EmployeeFeedbackService.UpdateFeedback(global_1.Global.BASE_EmployeeFeedback_ENDPOINT, formData._value.Id, formData._value).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = data;
                        _this.LoadEmployeeFeedbacks(21);
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
                this._EmployeeFeedbackService.delete(global_1.Global.BASE_EmployeeFeedback_ENDPOINT, formData._value.Id).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = data;
                        _this.LoadEmployeeFeedbacks(21);
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
    ], EmployeeFeedbackComponent.prototype, "modal", void 0);
    EmployeeFeedbackComponent = __decorate([
        core_1.Component({
            providers: [EmployeeFeedback_service_1.EmployeeFeedbackService],
            templateUrl: 'app/Components/HumanResource/Attendance/EmployeeFeedback.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, EmployeeFeedback_service_1.EmployeeFeedbackService, pager_index_1.PagerService])
    ], EmployeeFeedbackComponent);
    return EmployeeFeedbackComponent;
}());
exports.EmployeeFeedbackComponent = EmployeeFeedbackComponent;
