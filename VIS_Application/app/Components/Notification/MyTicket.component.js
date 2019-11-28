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
var MyTicket_service_1 = require("../../service/Notification/MyTicket.service");
var forms_1 = require("@angular/forms");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var http_1 = require("@angular/http");
var enum_1 = require("../../Shared/enum");
var Rx_1 = require("rxjs/Rx");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw"); // fixed typo
var global_1 = require("../../Shared/global");
var pager_index_1 = require("../../Shared/pager.index");
var MyTicketComponent = (function () {
    function MyTicketComponent(fb, _MyTicketService, pagerService, http) {
        this.fb = fb;
        this._MyTicketService = _MyTicketService;
        this.pagerService = pagerService;
        this.http = http;
        this.indLoading = false;
        this.isDesc = false;
        this.column = 'Subject';
        this.CurrentRecordsPerPage = 10;
        // pager object
        this.pager = {};
        //Variables for Filter
        this.ShowHideSearch = false;
    }
    //file upload event  
    MyTicketComponent.prototype.fileChange1 = function (event) {
        this.fileList1 = event.target.files;
    };
    MyTicketComponent.prototype.fileChange2 = function (event) {
        this.fileList2 = event.target.files;
    };
    MyTicketComponent.prototype.fileChange3 = function (event) {
        this.fileList3 = event.target.files;
    };
    MyTicketComponent.prototype.ngOnInit = function () {
        this.MyTicketFrm = this.fb.group({
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
            CreatedId: 0,
            CreatedOn: [''],
            CreatedBy: [''],
            UpdatedOn: [''],
            UpdatedBy: [''],
            IsActive: [''],
            RecordCreatedOn: [''],
            RecordCreatedBy: [''],
            HelpTicketId: [''],
            FileName: [''],
            FileName1: [''],
            FileName2: [''],
            DepartmentHelpTicketDll: [''],
            SuggestionAlie: [''],
            SuggestionId: [''],
            RoleType: [''],
            EntityMessage: ['']
        });
        //
        this.LoadGetChildGroup(21);
        // this.LoadOpenTicket(21);
    };
    MyTicketComponent.prototype.MyTicketFilterCriteriaChange = function (value) {
        if (value != '[object Event]')
            this.MyTicketFilter = value;
    };
    MyTicketComponent.prototype.MyTicketSort = function (property) {
        if (!this.ShowHideSearch) {
            this.isDesc = !this.isDesc;
            this.column = property;
            this.direction = this.isDesc ? 1 : -1;
        }
    };
    //LoadMyTickets(): void {
    //    this.indLoading = true;
    //    this._MyTicketService.get(Global.BASE_MyTicket_ENDPOINT)
    //        .subscribe(MyTickets => {
    //            this.MyTickets = MyTickets;
    //            //Logic for searching - start
    //            if (this.ShowHideSearch) {
    //                this.strSearchMyTicket_Name = (<HTMLInputElement>document.getElementById("searchMyTicket_Name")).value;
    //                if (this.strSearchMyTicket_Name != '') {
    //                    this.strSearchMyTicket_Name = this.strSearchMyTicket_Name.toLocaleLowerCase();
    //                    this.MyTickets = this.MyTickets.filter(
    //                        x => x.Subject != null && x.Subject.toLocaleLowerCase().indexOf(this.strSearchMyTicket_Name) != -1);
    //                }
    //            }
    //            //Logic for searching - End
    //            this.indLoading = false;
    //            // initialize to page 1
    //            this.JumpOnPage(1);
    //        }
    //        //,error => this.msg = <any>error
    //        );
    //}
    MyTicketComponent.prototype.LoadGetChildGroup = function (CreatedId) {
        var _this = this;
        this.indLoading = true;
        this._MyTicketService.getchildgroup(global_1.Global.BASE_MyTicket_ENDPOINT, CreatedId)
            .subscribe(function (data) {
            _this.MyTickets = data;
            //Logic for searching - start
            if (_this.ShowHideSearch) {
                _this.strSearchSubject = document.getElementById("searchSubject").value;
                if (_this.strSearchSubject != '') {
                    _this.strSearchSubject = _this.strSearchSubject.toLocaleLowerCase();
                    _this.MyTickets = _this.MyTickets.filter(function (x) { return x.Subject != null && x.Subject.toLocaleLowerCase().indexOf(_this.strSearchSubject) != -1; });
                }
            }
            if (_this.ShowHideSearch) {
                _this.strSearchAddressToGroup = document.getElementById("searchAddressToGroup").value;
                if (_this.strSearchAddressToGroup != '') {
                    _this.strSearchAddressToGroup = _this.strSearchAddressToGroup.toLocaleLowerCase();
                    _this.MyTickets = _this.MyTickets.filter(function (x) { return x.AddressToGroup != null && x.AddressToGroup.toLocaleLowerCase().indexOf(_this.strSearchAddressToGroup) != -1; });
                }
            }
            if (_this.ShowHideSearch) {
                _this.strSearchAssignTo = document.getElementById("searchAssignTo").value;
                if (_this.strSearchAssignTo != '') {
                    _this.strSearchAssignTo = _this.strSearchAssignTo.toLocaleLowerCase();
                    _this.MyTickets = _this.MyTickets.filter(function (x) { return x.AssignTo != null && x.AssignTo.toLocaleLowerCase().indexOf(_this.strSearchAssignTo) != -1; });
                }
                if (_this.ShowHideSearch) {
                    _this.strSearchUpdatebyName = document.getElementById("searchUpdatedByName").value;
                    if (_this.strSearchUpdatebyName != '') {
                        _this.strSearchUpdatebyName = _this.strSearchUpdatebyName.toLocaleLowerCase();
                        _this.MyTickets = _this.MyTickets.filter(function (x) { return x.UpdatedByName != null && x.UpdatedByName.toLocaleLowerCase().indexOf(_this.strSearchUpdatebyName) != -1; });
                    }
                }
                if (_this.ShowHideSearch) {
                    _this.strSearchPriority = document.getElementById("searchPriority").value;
                    if (_this.strSearchPriority != '') {
                        _this.strSearchPriority = _this.strSearchPriority.toLocaleLowerCase();
                        _this.MyTickets = _this.MyTickets.filter(function (x) { return x.Priority != null && x.Priority.toLocaleLowerCase().indexOf(_this.strSearchPriority) != -1; });
                    }
                }
                if (_this.ShowHideSearch) {
                    _this.strSearchStatus = document.getElementById("searchStatus").value;
                    if (_this.strSearchStatus != '') {
                        _this.strSearchStatus = _this.strSearchStatus.toLocaleLowerCase();
                        _this.MyTickets = _this.MyTickets.filter(function (x) { return x.Priority != null && x.Priority.toLocaleLowerCase().indexOf(_this.strSearchStatus) != -1; });
                    }
                }
            }
            //Logic for searching - End
            _this.indLoading = false;
            _this.JumpOnPage(1);
        });
    };
    MyTicketComponent.prototype.FilterByStatus = function (event) {
        if (event.target.value == 'Open') {
            this.MyTickets = this.MyTickets.filter(function (x) { return x.Status == 'Open'; });
            this.JumpOnPage(1);
        }
        else if (event.target.value == 'Closed') {
            this.MyTickets = this.MyTickets.filter(function (x) { return x.Status == 'Closed'; });
            this.JumpOnPage(1);
        }
        // this.LoadGetChildGroup(21);
    };
    MyTicketComponent.prototype.LoadDp = function () {
        var _this = this;
        this.indLoading = true;
        this._MyTicketService.getDp(global_1.Global.BASE_MyTicket_ENDPOINT)
            .subscribe(function (DATADP) {
            _this.Oraganization = DATADP;
        });
    };
    MyTicketComponent.prototype.LoadViwHistory = function (id) {
        var _this = this;
        this.indLoading = true;
        this._MyTicketService.getViewHistory(global_1.Global.BASE_MyTicket_ENDPOINT, id)
            .subscribe(function (DATADP) {
            _this.ViewHistory = DATADP;
        });
    };
    MyTicketComponent.prototype.LoadGetTicketDetail = function (id) {
        var _this = this;
        this.indLoading = true;
        this._MyTicketService.getTicketDetail(global_1.Global.BASE_MyTicket_ENDPOINT, id)
            .subscribe(function (DATADP) {
            _this.GetDetail = DATADP;
        });
    };
    MyTicketComponent.prototype.addMyTicket = function () {
        this.LoadDp();
        this.dbops = enum_1.DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New MyTicket";
        this.modalBtnTitle = "Add";
        this.MyTicketFrm.reset();
        this.modal.open();
    };
    MyTicketComponent.prototype.editMyTicket = function (Id) {
        this.LoadDp();
        this.dbops = enum_1.DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit MyTicket";
        this.modalBtnTitle = "Update";
        this.MyTicket = this.MyTickets.filter(function (x) { return x.Id == Id; })[0];
        this.MyTicketFrm.setValue(this.MyTicket);
        this.LoadGetTicketDetail(Id);
        this.modal3.open();
    };
    MyTicketComponent.prototype.ViewMyTicket = function (Id) {
        this.dbops = enum_1.DBOperation.View;
        this.SetControlsState(true);
        this.modalTitle = "Conversation Ticket";
        this.MyTicket = this.MyTickets.filter(function (x) { return x.Id == Id; })[0];
        this.MyTicketFrm.setValue(this.MyTicket);
        this.LoadViwHistory(Id);
        this.modal1.open();
        this.modal3.dismiss();
    };
    MyTicketComponent.prototype.deleteMyTicket = function (id, status) {
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
        this.MyTicket = this.MyTickets.filter(function (x) { return x.Id == id; })[0];
        this.MyTicketFrm.setValue(this.MyTicket);
        this.modal.open();
    };
    MyTicketComponent.prototype.SetControlsState = function (isEnable) {
        isEnable ? this.MyTicketFrm.enable() : this.MyTicketFrm.disable();
    };
    MyTicketComponent.prototype.ChangeRecordsPerPage = function (RecordsPerPage) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    };
    MyTicketComponent.prototype.JumpOnPage = function (PageNumber) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.MyTickets);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;
    };
    MyTicketComponent.prototype.ShowHideSearchControls = function () {
        this.ShowHideSearch = !this.ShowHideSearch;
    };
    MyTicketComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        this.msg = "";
        switch (this.dbops) {
            case enum_1.DBOperation.create:
                if (this.fileList1 != null) {
                    formData._value.FileName = this.fileList1.item(0).name;
                }
                else {
                    formData._value.FileName = null;
                }
                if (this.fileList2 != null) {
                    formData._value.FileName1 = this.fileList2.item(0).name;
                }
                else {
                    formData._value.FileName1 = null;
                }
                if (this.fileList3 != null) {
                    formData._value.FileName2 = this.fileList3.item(0).name;
                }
                else {
                    formData._value.FileName2 = null;
                }
                //formData._value.FileName = this.fileList2.item(0).name;
                //formData._value.FileName = this.fileList3.item(0).name;
                this._MyTicketService.post(global_1.Global.BASE_MyTicket_ENDPOINT, formData._value).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        if (_this.fileList1 != null) {
                            if (_this.fileList1.length > 0) {
                                _this.fileList1.item(0).name;
                                var file = _this.fileList1[0];
                                var formData_1 = new FormData();
                                formData_1.append('uploadFile', file, file.name);
                                var headers = new http_1.Headers();
                                var options = new http_1.RequestOptions({ headers: headers });
                                var apiUrl1 = "/api/MyTicketapi/UploadJsonFile";
                                _this.http.post(apiUrl1, formData_1, options)
                                    .map(function (res) { return res.json(); })
                                    .catch(function (error) { return Rx_1.Observable.throw(error); })
                                    .subscribe(function (data) { return console.log('success'); }, function (error) { return console.log(error); });
                            }
                        }
                        else {
                            formData._value.FileName = null;
                        }
                        if (_this.fileList2 != null) {
                            if (_this.fileList2.length > 0) {
                                _this.fileList2.item(0).name;
                                var file = _this.fileList2[0];
                                var formData_2 = new FormData();
                                formData_2.append('uploadFile', file, file.name);
                                var headers = new http_1.Headers();
                                var options = new http_1.RequestOptions({ headers: headers });
                                var apiUrl1 = "/api/MyTicketapi/UploadJsonFile";
                                _this.http.post(apiUrl1, formData_2, options)
                                    .map(function (res) { return res.json(); })
                                    .catch(function (error) { return Rx_1.Observable.throw(error); })
                                    .subscribe(function (data) { return console.log('success'); }, function (error) { return console.log(error); });
                            }
                        }
                        else {
                            formData._value.FileName2 = null;
                        }
                        if (_this.fileList3 != null) {
                            if (_this.fileList3.length > 0) {
                                _this.fileList3.item(0).name;
                                var file = _this.fileList3[0];
                                var formData_3 = new FormData();
                                formData_3.append('uploadFile', file, file.name);
                                var headers = new http_1.Headers();
                                var options = new http_1.RequestOptions({ headers: headers });
                                var apiUrl1 = "/api/MyTicketapi/UploadJsonFile";
                                _this.http.post(apiUrl1, formData_3, options)
                                    .map(function (res) { return res.json(); })
                                    .catch(function (error) { return Rx_1.Observable.throw(error); })
                                    .subscribe(function (data) { return console.log('success'); }, function (error) { return console.log(error); });
                            }
                        }
                        else {
                            formData._value.FileName3 = null;
                        }
                        _this.msg = data;
                        _this.LoadGetChildGroup(21);
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
                this._MyTicketService.put(global_1.Global.BASE_MyTicket_ENDPOINT, formData._value.Id, formData._value).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = data;
                        _this.LoadGetChildGroup(21);
                        //  this.LoadMyTickets();
                        _this.modal3.dismiss();
                    }
                    else {
                        //alert(data);
                        _this.msg = "Error has occurred while changing status of existing MyTicket!.";
                    }
                }, function (error) {
                    _this.msg = error;
                });
                break;
            case enum_1.DBOperation.delete:
                this._MyTicketService.delete(global_1.Global.BASE_MyTicket_ENDPOINT, formData._value.Id).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = "MyTicket status changed successfully.";
                        _this.LoadGetChildGroup(21);
                        // this.LoadMyTickets();
                    }
                    else {
                        _this.msg = "Error has occurred while changing status of existing MyTicket!";
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
    ], MyTicketComponent.prototype, "modal", void 0);
    __decorate([
        core_1.ViewChild('modal1'),
        __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
    ], MyTicketComponent.prototype, "modal1", void 0);
    __decorate([
        core_1.ViewChild('modal3'),
        __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
    ], MyTicketComponent.prototype, "modal3", void 0);
    MyTicketComponent = __decorate([
        core_1.Component({
            providers: [MyTicket_service_1.MyTicketService],
            templateUrl: 'app/Components/Notification/MyTicket.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, MyTicket_service_1.MyTicketService, pager_index_1.PagerService, http_1.Http])
    ], MyTicketComponent);
    return MyTicketComponent;
}());
exports.MyTicketComponent = MyTicketComponent;
