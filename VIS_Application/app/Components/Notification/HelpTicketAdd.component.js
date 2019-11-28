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
var HelpTicketAdd_service_1 = require("../../service/Notification/HelpTicketAdd.service");
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
var HelpTicketAddComponent = (function () {
    function HelpTicketAddComponent(fb, _HelpAddTicketService, pagerService, http) {
        this.fb = fb;
        this._HelpAddTicketService = _HelpAddTicketService;
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
    HelpTicketAddComponent.prototype.ngOnInit = function () {
        this.HelpAddTicketFrm = this.fb.group({
            CompanyId: [''],
            Id: [''],
            Subject: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(3), forms_1.Validators.maxLength(50)])],
            Message: ['', forms_1.Validators.required],
            Remarks: [''],
            AssignTo: [''],
            AddressToGroup: [''],
            Priority: [''],
            Status: [''],
            CreatedOn: [''],
            CreatedBy: [''],
            UpdatedOn: [''],
            UpdatedBy: [''],
            IsActive: [''],
            FileName: [''],
            FileName1: [''],
            FileName2: [''],
            EntityMessage: ['']
        });
        // this.LoadHelpAddTickets()
        this.LoadDp();
    };
    //file upload event  
    HelpTicketAddComponent.prototype.fileChange1 = function (event) {
        this.fileList1 = event.target.files;
    };
    HelpTicketAddComponent.prototype.fileChange2 = function (event) {
        this.fileList2 = event.target.files;
    };
    HelpTicketAddComponent.prototype.fileChange3 = function (event) {
        this.fileList3 = event.target.files;
    };
    HelpTicketAddComponent.prototype.HelpAddTicketFilterCriteriaChange = function (value) {
        if (value != '[object Event]')
            this.HelpAddTicketFilter = value;
    };
    HelpTicketAddComponent.prototype.HelpAddTicketSort = function (property) {
        if (!this.ShowHideSearch) {
            this.isDesc = !this.isDesc;
            this.column = property;
            this.direction = this.isDesc ? 1 : -1;
        }
    };
    HelpTicketAddComponent.prototype.LoadDp = function () {
        var _this = this;
        this.indLoading = true;
        this._HelpAddTicketService.getDp(global_1.Global.BASE_HelpTicketAdd_ENDPOINT)
            .subscribe(function (DATADP) {
            _this.Oraganization = DATADP;
        }
        //,error => this.msg = <any>error
        );
    };
    HelpTicketAddComponent.prototype.LoadHelpAddTickets = function () {
        var _this = this;
        this.indLoading = true;
        this._HelpAddTicketService.get(global_1.Global.BASE_HelpTicketAdd_ENDPOINT)
            .subscribe(function (HelpAddTickets) {
            _this.HelpAddTickets = HelpAddTickets;
            //Logic for searching - start
            if (_this.ShowHideSearch) {
                _this.strSearchHelpAddTicket_Name = document.getElementById("searchMessage").value;
                if (_this.strSearchHelpAddTicket_Name != '') {
                    _this.strSearchHelpAddTicket_Name = _this.strSearchHelpAddTicket_Name.toLocaleLowerCase();
                    _this.HelpAddTickets = _this.HelpAddTickets.filter(function (x) { return x.Message != null && x.Message.toLocaleLowerCase().indexOf(_this.strSearchHelpAddTicket_Name) != -1; });
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
    HelpTicketAddComponent.prototype.addHelpAddTicket = function () {
        this.dbops = enum_1.DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New HelpAddTicket";
        this.modalBtnTitle = "Add";
        this.HelpAddTicketFrm.reset();
        this.modal.open();
    };
    HelpTicketAddComponent.prototype.editHelpAddTicket = function (id) {
        this.dbops = enum_1.DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit HelpAddTicket";
        this.modalBtnTitle = "Update";
        this.HelpAddTicket = this.HelpAddTickets.filter(function (x) { return x.Id == id; })[0];
        this.HelpAddTicketFrm.setValue(this.HelpAddTicket);
        this.modal.open();
    };
    HelpTicketAddComponent.prototype.deleteHelpAddTicket = function (id, status) {
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
        this.HelpAddTicket = this.HelpAddTickets.filter(function (x) { return x.Id == id; })[0];
        this.HelpAddTicketFrm.setValue(this.HelpAddTicket);
        this.modal.open();
    };
    HelpTicketAddComponent.prototype.SetControlsState = function (isEnable) {
        isEnable ? this.HelpAddTicketFrm.enable() : this.HelpAddTicketFrm.disable();
    };
    HelpTicketAddComponent.prototype.ChangeRecordsPerPage = function (RecordsPerPage) {
        this.CurrentRecordsPerPage = RecordsPerPage;
        if (RecordsPerPage >= 0) {
            this.JumpOnPage(1);
        }
    };
    HelpTicketAddComponent.prototype.JumpOnPage = function (PageNumber) {
        this.pagerService.setPage(PageNumber, this.CurrentRecordsPerPage, this.HelpAddTickets);
        this.pager = this.pagerService.pager;
        this.pagedItems = this.pagerService.pagedItems;
    };
    HelpTicketAddComponent.prototype.ShowHideSearchControls = function () {
        this.ShowHideSearch = !this.ShowHideSearch;
    };
    //onSubmit(formData: IHelpAddTicket) {
    //    this.msg = "";
    //    console.log(formData);
    //    this._HelpAddTicketService.put(Global.BASE_HelpTicketAdd_ENDPOINT, formData.Id, formData).subscribe(
    //        data => {
    //            if data.startsWith("Success: "){
    //                this.msg = "Common Configuration Save successfully.";
    //                this.LoadHelpAddTickets();
    //            }
    //            else {
    //                this.msg = "Error has occurred while modifying existing Common Configuration!"
    //            }
    //        },
    //        error => {
    //            this.msg = error;
    //        }
    //    );
    //}
    HelpTicketAddComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        console.log(formData);
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
                this._HelpAddTicketService.post(global_1.Global.BASE_HelpTicketAdd_ENDPOINT, formData._value).subscribe(function (data) {
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
                this._HelpAddTicketService.put(global_1.Global.BASE_HelpTicketAdd_ENDPOINT, formData._value.Id, formData._value).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = data;
                        _this.LoadHelpAddTickets();
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
                this._HelpAddTicketService.delete(global_1.Global.BASE_HelpTicketAdd_ENDPOINT, formData._value.Id).subscribe(function (data) {
                    if (data.startsWith("Success: ")) {
                        _this.msg = "HelpAddTicket status changed successfully.";
                        _this.LoadHelpAddTickets();
                    }
                    else {
                        _this.msg = "Error has occurred while changing status of existing HelpAddTicket!";
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
    ], HelpTicketAddComponent.prototype, "modal", void 0);
    HelpTicketAddComponent = __decorate([
        core_1.Component({
            providers: [HelpTicketAdd_service_1.HelpTicketAddService],
            templateUrl: 'app/Components/Notification/HelpTicketAdd.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, HelpTicketAdd_service_1.HelpTicketAddService, pager_index_1.PagerService, http_1.Http])
    ], HelpTicketAddComponent);
    return HelpTicketAddComponent;
}());
exports.HelpTicketAddComponent = HelpTicketAddComponent;
